/* Colony counter: works on plain RGBA pixel arrays, so it runs in the browser (canvas) and in Node (tests). */
(function (root) {
"use strict";

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function toGray(rgba, w, h) {
  const g = new Float32Array(w * h);
  for (let i = 0, j = 0; i < g.length; i++, j += 4) g[i] = 0.299 * rgba[j] + 0.587 * rgba[j + 1] + 0.114 * rgba[j + 2];
  return g;
}

function resize(gray, w, h, maxDim) {
  const s = Math.min(1, maxDim / Math.max(w, h));
  if (s >= 1) return { data: gray, w, h, sx: 1, sy: 1 };
  const nw = Math.max(1, Math.round(w * s)), nh = Math.max(1, Math.round(h * s));
  const out = new Float32Array(nw * nh), fx = w / nw, fy = h / nh;
  for (let y = 0; y < nh; y++) {
    const y0 = Math.floor(y * fy), y1 = Math.min(h, Math.max(y0 + 1, Math.floor((y + 1) * fy)));
    for (let x = 0; x < nw; x++) {
      const x0 = Math.floor(x * fx), x1 = Math.min(w, Math.max(x0 + 1, Math.floor((x + 1) * fx)));
      let sum = 0, c = 0;
      for (let yy = y0; yy < y1; yy++) { const row = yy * w; for (let xx = x0; xx < x1; xx++) { sum += gray[row + xx]; c++; } }
      out[y * nw + x] = sum / c;
    }
  }
  return { data: out, w: nw, h: nh, sx: nw / w, sy: nh / h };
}

function integral(a, w, h) {
  const W = w + 1, I = new Float64Array(W * (h + 1));
  for (let y = 0; y < h; y++) {
    let row = 0;
    for (let x = 0; x < w; x++) { row += a[y * w + x]; I[(y + 1) * W + x + 1] = I[y * W + x + 1] + row; }
  }
  return I;
}

function boxSum(I, w, h, x, y, r) {
  const W = w + 1, x0 = Math.max(0, x - r), x1 = Math.min(w, x + r + 1), y0 = Math.max(0, y - r), y1 = Math.min(h, y + r + 1);
  return I[y1 * W + x1] - I[y0 * W + x1] - I[y1 * W + x0] + I[y0 * W + x0];
}

function circleMask(w, h, cx, cy, r) {
  const m = new Uint8Array(w * h), r2 = r * r;
  for (let y = 0; y < h; y++) { const dy = y - cy; for (let x = 0; x < w; x++) { const dx = x - cx; m[y * w + x] = dx * dx + dy * dy <= r2 ? 1 : 0; } }
  return m;
}

function pct(sorted, p) { return sorted[Math.min(sorted.length - 1, Math.max(0, Math.floor(p * (sorted.length - 1))))]; }

/* Find the plate circle in a photo with a gradient-direction Hough transform. Returns centre and radius in original pixels. */
function detectPlate(rgba, w, h) {
  const ds = resize(toGray(rgba, w, h), w, h, 260), W = ds.w, H = ds.h, g = ds.data;
  const gx = new Float32Array(W * H), gy = new Float32Array(W * H), mag = new Float32Array(W * H);
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    const i = y * W + x;
    const a = g[i - W - 1], b = g[i - W], c = g[i - W + 1], d = g[i - 1], f = g[i + 1], j = g[i + W - 1], k = g[i + W], l = g[i + W + 1];
    gx[i] = (c + 2 * f + l) - (a + 2 * d + j); gy[i] = (j + 2 * k + l) - (a + 2 * b + c);
    mag[i] = Math.hypot(gx[i], gy[i]);
  }
  const sample = []; for (let i = 0; i < mag.length; i += 3) if (mag[i] > 0) sample.push(mag[i]);
  sample.sort((p, q) => p - q);
  const thr = sample.length ? pct(sample, 0.9) : 1, m = Math.min(W, H);
  const rmin = Math.round(0.25 * m), rmax = Math.round(0.5 * m), step = 2, nr = Math.floor((rmax - rmin) / step) + 1;
  const acc = new Float32Array(nr * W * H);
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    const i = y * W + x; if (mag[i] < thr) continue;
    const dx = gx[i] / mag[i], dy = gy[i] / mag[i];
    for (let ri = 0; ri < nr; ri++) {
      const r = rmin + ri * step;
      for (let s = -1; s <= 1; s += 2) {
        const px = Math.round(x + s * r * dx), py = Math.round(y + s * r * dy);
        if (px >= 0 && px < W && py >= 0 && py < H) acc[(ri * H + py) * W + px] += 1;
      }
    }
  }
  let best = -1, bx = W / 2, by = H / 2, br = 0.45 * m;
  for (let ri = 0; ri < nr; ri++) {
    const base = ri * H * W, r = rmin + ri * step;
    for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
      let s = 0;
      for (let yy = -1; yy <= 1; yy++) for (let xx = -1; xx <= 1; xx++) s += acc[base + (y + yy) * W + x + xx];
      const score = s / r;
      if (score > best) { best = score; bx = x; by = y; br = r; }
    }
  }
  // plates often show two concentric edges (agar edge and outer rim); prefer the inner one when it is nearly as strong
  let chosen = br;
  for (let ri = 0; ri < nr; ri++) {
    const r = rmin + ri * step; if (r >= chosen || r < 0.85 * br) continue;
    let sc = 0; for (let yy = -1; yy <= 1; yy++) for (let xx = -1; xx <= 1; xx++) sc += acc[ri * H * W + (by + yy) * W + bx + xx];
    if (sc / r >= 0.7 * best) { chosen = r; break; }
  }
  return { cx: bx / ds.sx, cy: by / ds.sy, r: chosen / ((ds.sx + ds.sy) / 2), score: best };
}

function components(bin, w, h, val) {
  const lab = new Int32Array(w * h), stack = new Int32Array(w * h), comps = [];
  for (let i0 = 0; i0 < bin.length; i0++) {
    if (!bin[i0] || lab[i0]) continue;
    const id = comps.length + 1; let sp = 0, area = 0, sx = 0, sy = 0, x0 = w, x1 = 0, y0 = h, y1 = 0, peak = -1e9;
    stack[sp++] = i0; lab[i0] = id;
    while (sp) {
      const i = stack[--sp], x = i % w, y = (i - x) / w;
      area++; sx += x; sy += y; if (val && val[i] > peak) peak = val[i];
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      for (let yy = -1; yy <= 1; yy++) {
        const ny = y + yy; if (ny < 0 || ny >= h) continue;
        for (let xx = -1; xx <= 1; xx++) {
          const nx = x + xx; if (nx < 0 || nx >= w) continue;
          const j = ny * w + nx; if (bin[j] && !lab[j]) { lab[j] = id; stack[sp++] = j; }
        }
      }
    }
    const bw = x1 - x0 + 1, bh = y1 - y0 + 1;
    comps.push({ area, peak, x: sx / area, y: sy / area, bw, bh, aspect: Math.max(bw, bh) / Math.min(bw, bh), fill: area / (bw * bh) });
  }
  return comps;
}

/*
  Count colonies inside the circle (cx, cy, r) given in original pixel coordinates.
  Method: subtract a local background, threshold at k times the noise level, label connected blobs, then
  estimate how many colonies are in each blob from its area and shape.
*/
function countColonies(rgba, w, h, opts) {
  const o = Object.assign({ cx: w / 2, cy: h / 2, r: 0.45 * Math.min(w, h), polarity: "auto", k: 4, edgeMargin: 0.06, maxDim: 900, minRadiusFrac: 0.004, maxSingleRadiusFrac: 0.09 }, opts || {});
  const ds = resize(toGray(rgba, w, h), w, h, o.maxDim), W = ds.w, H = ds.h, s = (ds.sx + ds.sy) / 2, g = ds.data;
  const cx = o.cx * ds.sx, cy = o.cy * ds.sy, R = o.r * s;
  const mask = circleMask(W, H, cx, cy, R * (1 - o.edgeMargin));

  const bgR = Math.max(8, Math.round(0.12 * R));
  function highpass(excl) {
    const gm = new Float64Array(W * H), mf = new Float64Array(W * H);
    for (let i = 0; i < gm.length; i++) { if (mask[i] && !(excl && excl[i])) { gm[i] = g[i]; mf[i] = 1; } }
    const Ig = integral(gm, W, H), Im = integral(mf, W, H), diff = new Float32Array(W * H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x; if (!mask[i]) continue;
      const m = boxSum(Im, W, H, x, y, bgR); diff[i] = g[i] - (m > 0 ? boxSum(Ig, W, H, x, y, bgR) / m : g[i]);
    }
    const Id = integral(diff, W, H), sm = new Float32Array(W * H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (mask[i]) sm[i] = boxSum(Id, W, H, x, y, 1) / 9; }
    const vals = []; for (let i = 0; i < sm.length; i += 3) if (mask[i]) vals.push(sm[i]);
    vals.sort((a, b) => a - b);
    const med = pct(vals, 0.5), dev = vals.map((v) => Math.abs(v - med)).sort((a, b) => a - b);
    return { sm, vals, med, sigma: Math.max(1.4826 * pct(dev, 0.5), 1.5) };
  }
  let hp = highpass(null);
  if (hp.vals.length < 100) return { count: 0, items: [], warnings: ["The plate circle is too small or outside the image."], plate: { cx: o.cx, cy: o.cy, r: o.r } };
  const minArea = Math.max(5, Math.PI * Math.pow(o.minRadiusFrac * R, 2)), maxSingle = Math.PI * Math.pow(o.maxSingleRadiusFrac * R, 2), confluent = 0.04 * Math.PI * R * R;
  // polarity: colonies are the polarity with more colony-sized blobs that stand clearly above the noise
  function polarityScore(p, hpx) {
    const t = o.k * hpx.sigma, b = new Uint8Array(W * H), v = new Float32Array(W * H);
    for (let i = 0; i < b.length; i++) if (mask[i]) { v[i] = p * (hpx.sm[i] - hpx.med); if (v[i] > t) b[i] = 1; }
    return components(b, W, H, v).filter((c) => c.area >= minArea && c.peak >= 1.6 * t).reduce((a, c) => a + Math.min(c.area, maxSingle), 0);
  }
  const pol = o.polarity === "light" ? 1 : o.polarity === "dark" ? -1 : (polarityScore(-1, hp) > polarityScore(1, hp) ? -1 : 1);
  // second pass: leave the first-pass detections out of the background so big colonies don't hollow out
  const excl = new Uint8Array(W * H), thr0 = o.k * hp.sigma;
  for (let i = 0; i < excl.length; i++) if (mask[i] && pol * (hp.sm[i] - hp.med) > thr0) excl[i] = 1;
  for (let pass = 0; pass < 3; pass++) { const nx = excl.slice(); for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) { const i = y * W + x; if (excl[i]) { nx[i - 1] = nx[i + 1] = nx[i - W] = nx[i + W] = 1; } } excl.set(nx); }
  hp = highpass(excl);
  const sm = hp.sm, med = hp.med, sigma = hp.sigma, thr = o.k * sigma;
  const sig = new Float32Array(W * H), bin = new Uint8Array(W * H);
  for (let i = 0; i < bin.length; i++) if (mask[i]) { sig[i] = pol * (sm[i] - med); if (sig[i] > thr) bin[i] = 1; }
  const comps = components(bin, W, H, sig).filter((c) => c.area >= minArea && c.peak >= 1.6 * thr);

  const round1 = comps.filter((c) => c.area <= maxSingle && c.aspect <= 1.4 && c.fill >= 0.6).map((c) => c.area).sort((a, b) => a - b);
  const A1 = round1.length >= 5 ? round1[Math.floor(round1.length / 2)] : Math.max(minArea, Math.PI * Math.pow(0.02 * R, 2));

  const items = []; let single = 0, merged = 0, conf = 0, total = 0;
  for (const c of comps) {
    let n = 1, isMerged = false, isConf = false;
    const looksSingle = c.aspect <= 1.4 && c.fill >= 0.6 && c.area <= maxSingle;
    if (!looksSingle && c.area > 1.6 * A1) { n = Math.min(40, Math.max(2, Math.round(c.area / A1))); isMerged = true; }
    if (c.area > confluent) { isConf = true; isMerged = true; n = Math.min(60, Math.max(2, Math.round(c.area / A1))); }
    total += n; if (isConf) conf++; else if (isMerged) merged++; else single++;
    items.push({ x: c.x / ds.sx, y: c.y / ds.sy, area: c.area, n, merged: isMerged, confluent: isConf });
  }
  const warnings = [];
  if (total > 300) warnings.push("More than 300 colonies: this plate is too crowded to count reliably. Use the next dilution.");
  else if (total < 30) warnings.push("Fewer than 30 colonies: treat this as an estimate.");
  if (conf) warnings.push(conf + " very large merged area" + (conf > 1 ? "s" : "") + " (possible confluent growth or swarming); the count there is a rough guess. Check by eye.");
  if (merged) warnings.push(merged + " touching group" + (merged > 1 ? "s" : "") + " counted by size; check them by eye.");
  return { count: total, singles: single, merged, confluent: conf, items, A1: A1 / (s * s), sigma, thr, polarity: pol, warnings, plate: { cx: o.cx, cy: o.cy, r: o.r } };
}

/* A synthetic plate with known colony count, used by the demo button and the tests. */
function makeSyntheticPlate(seed, nColonies, opts) {
  const o = Object.assign({ size: 900, noise: 3, touching: 0.08, glare: true, light: true }, opts || {});
  const rng = mulberry32(seed), w = o.size, h = o.size, R = 0.44 * w;
  const cx = w / 2 + (rng() - 0.5) * 30, cy = h / 2 + (rng() - 0.5) * 30;
  const gauss = () => Math.sqrt(-2 * Math.log(rng() + 1e-12)) * Math.cos(2 * Math.PI * rng());
  const cols = [];
  for (let tries = 0; cols.length < nColonies && tries < nColonies * 80; tries++) {
    const r = (w / 900) * (5 + rng() * 8); let x, y;
    if (cols.length && rng() < o.touching) {
      const p = cols[Math.floor(rng() * cols.length)], a = rng() * 2 * Math.PI, d = (p.r + r) * 0.95; x = p.x + d * Math.cos(a); y = p.y + d * Math.sin(a);
    } else { const a = rng() * 2 * Math.PI, d = Math.sqrt(rng()) * 0.86 * R; x = cx + d * Math.cos(a); y = cy + d * Math.sin(a); }
    if (Math.hypot(x - cx, y - cy) + r > 0.9 * R) continue;
    if (cols.some((c) => Math.hypot(c.x - x, c.y - y) < (c.r + r) * 0.8)) continue;
    cols.push({ x, y, r });
  }
  const specks = []; for (let i = 0; i < 6; i++) { const a = rng() * 2 * Math.PI, d = Math.sqrt(rng()) * 0.8 * R; specks.push({ x: cx + d * Math.cos(a), y: cy + d * Math.sin(a), r: 2 + rng() * 2 }); }
  const rgba = new Uint8ClampedArray(w * h * 4), sgn = o.light ? 1 : -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const d = Math.hypot(x - cx, y - cy); let r = 208, gg = 198, b = 150;
    const lit = 1 + 0.12 * (x - w / 2) / (w / 2) - 0.06 * (y - h / 2) / (h / 2);
    r *= lit; gg *= lit; b *= lit;
    if (o.glare) { const gd = Math.hypot(x - (cx - 0.4 * R), y - (cy - 0.45 * R)), add = 28 * Math.exp(-(gd * gd) / (2 * Math.pow(0.18 * R, 2))); r += add; gg += add; b += add; }
    if (d > R) { r = gg = b = 55; if (d < R * 1.04) { r = 95; gg = 90; b = 75; } }
    else if (d > R * 0.965) { r *= 0.62; gg *= 0.62; b *= 0.62; }
    const i = (y * w + x) * 4; rgba[i] = r; rgba[i + 1] = gg; rgba[i + 2] = b; rgba[i + 3] = 255;
  }
  const paint = (x0, y0, rad, dr, dg, db) => {
    const x1 = Math.max(0, Math.floor(x0 - rad - 3)), x2 = Math.min(w - 1, Math.ceil(x0 + rad + 3)), y1 = Math.max(0, Math.floor(y0 - rad - 3)), y2 = Math.min(h - 1, Math.ceil(y0 + rad + 3));
    for (let y = y1; y <= y2; y++) for (let x = x1; x <= x2; x++) {
      const d = Math.hypot(x - x0, y - y0), a = Math.max(0, Math.min(1, (rad + 1.2 - d) / 2.4)); if (!a) continue;
      const i = (y * w + x) * 4; rgba[i] += a * dr; rgba[i + 1] += a * dg; rgba[i + 2] += a * db;
    }
  };
  for (const c of cols) paint(c.x, c.y, c.r, sgn * 30, sgn * 34, sgn * 46);
  for (const s of specks) paint(s.x, s.y, s.r, -sgn * 9, -sgn * 9, -sgn * 9);
  for (let i = 0; i < w * h; i++) { const n = gauss() * o.noise; rgba[i * 4] += n; rgba[i * 4 + 1] += n; rgba[i * 4 + 2] += n; }
  return { rgba, w, h, truth: { count: cols.length, plate: { cx, cy, r: R } } };
}

const api = { countColonies, detectPlate, makeSyntheticPlate, mulberry32 };
if (typeof module !== "undefined" && module.exports) module.exports = api; else root.PlateCounter = api;
})(typeof self !== "undefined" ? self : this);
