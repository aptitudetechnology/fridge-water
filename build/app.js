"use strict";
(function () {
const PC = window.PlateCounter, PA = window.PlateAnalysis;
const $ = (id) => document.getElementById(id);
const STORE = "plate-counter-log-v1";

/* ---------- state ---------- */
const S = { rows: [], rgba: null, W: 0, H: 0, photo: "", result: null, removed: new Set(), added: [], plate: { cx: 450, cy: 450, r: 400 } };
try { const v = JSON.parse(localStorage.getItem(STORE) || "[]"); if (Array.isArray(v)) S.rows = v; } catch (e) { /* storage may be blocked */ }
const save = () => { try { localStorage.setItem(STORE, JSON.stringify(S.rows)); } catch (e) { /* ignore */ } };

/* ---------- tabs ---------- */
function showTab(name) {
  document.querySelectorAll(".tabs button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === name)));
  document.querySelectorAll(".panel").forEach((p) => { p.hidden = p.id !== "p-" + name; });
  if (name === "log") renderLog(); if (name === "analysis") renderAnalysis();
}
document.querySelectorAll(".tabs button").forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));

/* ---------- image loading and drawing ---------- */
const view = $("view"), ctx = view.getContext("2d");
function setImage(rgba, w, h, name) {
  S.rgba = rgba; S.W = w; S.H = h; S.photo = name || ""; S.removed = new Set(); S.added = [];
  view.width = w; view.height = h;
  $("cx").max = w; $("cy").max = h; $("cr").max = Math.round(Math.max(w, h) * 0.75); $("cr").min = Math.round(Math.min(w, h) * 0.1);
  const det = PC.detectPlate(rgba, w, h); setPlate(det.cx, det.cy, det.r); run();
}
function loadFile(file) {
  const img = new Image(), url = URL.createObjectURL(file);
  img.onload = () => {
    const s = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight)), w = Math.round(img.naturalWidth * s), h = Math.round(img.naturalHeight * s);
    const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d"); x.drawImage(img, 0, 0, w, h);
    URL.revokeObjectURL(url); setImage(x.getImageData(0, 0, w, h).data, w, h, file.name);
  };
  img.onerror = () => { $("breakdown").textContent = "That file couldn't be read as an image."; };
  img.src = url;
}
$("file").addEventListener("change", (e) => { if (e.target.files[0]) loadFile(e.target.files[0]); });
let demoSeed = 7;
$("demo").addEventListener("click", () => { const n = [12, 45, 90, 160, 240][demoSeed % 5], p = PC.makeSyntheticPlate(demoSeed++, n); setImage(p.rgba, p.w, p.h, "demo-plate-" + p.truth.count + "-true-colonies.png"); $("breakdown").textContent += "  (demo: the true number is " + p.truth.count + ")"; });

function setPlate(cx, cy, r) { S.plate = { cx, cy, r }; $("cx").value = cx; $("cy").value = cy; $("cr").value = r; }
["cx", "cy", "cr"].forEach((id) => $(id).addEventListener("input", () => { S.plate = { cx: +$("cx").value, cy: +$("cy").value, r: +$("cr").value }; debounceRun(); }));
$("pol").addEventListener("change", run); $("k").addEventListener("input", () => { $("kv").textContent = $("k").value; debounceRun(); });
$("auto").addEventListener("click", () => { if (!S.rgba) return; const d = PC.detectPlate(S.rgba, S.W, S.H); setPlate(d.cx, d.cy, d.r); run(); });
let timer = null; function debounceRun() { clearTimeout(timer); timer = setTimeout(run, 120); }

function run() {
  if (!S.rgba) return;
  S.result = PC.countColonies(S.rgba, S.W, S.H, { cx: S.plate.cx, cy: S.plate.cy, r: S.plate.r, polarity: $("pol").value, k: +$("k").value });
  S.removed = new Set(); S.added = []; render();
}
function finalCount() { const r = S.result; if (!r) return null; return r.items.reduce((a, it, i) => a + (S.removed.has(i) ? 0 : it.n), 0) + S.added.length; }

function render() {
  const img = ctx.createImageData(S.W, S.H); img.data.set(S.rgba); ctx.putImageData(img, 0, 0);
  const r = S.result; if (!r) return;
  ctx.lineWidth = Math.max(2, S.W / 450); ctx.font = Math.round(S.W / 38) + "px sans-serif";
  ctx.strokeStyle = "#ff3"; ctx.beginPath(); ctx.arc(S.plate.cx, S.plate.cy, S.plate.r, 0, 7); ctx.stroke();
  const rad = Math.max(7, S.W / 90);
  r.items.forEach((it, i) => {
    ctx.beginPath(); ctx.arc(it.x, it.y, rad * (it.n > 1 ? 1.5 : 1), 0, 7);
    if (S.removed.has(i)) { ctx.strokeStyle = "#f55"; ctx.stroke(); ctx.beginPath(); ctx.moveTo(it.x - rad, it.y - rad); ctx.lineTo(it.x + rad, it.y + rad); ctx.moveTo(it.x + rad, it.y - rad); ctx.lineTo(it.x - rad, it.y + rad); ctx.stroke(); return; }
    ctx.strokeStyle = it.n > 1 ? "#ffa31a" : "#37e07a"; ctx.stroke();
    if (it.n > 1) { ctx.fillStyle = "#ffa31a"; ctx.fillText("×" + it.n, it.x + rad * 1.6, it.y - rad); }
  });
  ctx.strokeStyle = "#4da3ff"; S.added.forEach((p) => { ctx.beginPath(); ctx.arc(p.x, p.y, rad, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(p.x - rad / 2, p.y); ctx.lineTo(p.x + rad / 2, p.y); ctx.moveTo(p.x, p.y - rad / 2); ctx.lineTo(p.x, p.y + rad / 2); ctx.stroke(); });
  const fc = finalCount(), removed = [...S.removed].reduce((a, i) => a + r.items[i].n, 0);
  $("total").textContent = fc;
  $("breakdown").textContent = `auto ${r.count} − removed ${removed} + added ${S.added.length}. Colonies read as ${r.polarity > 0 ? "lighter" : "darker"} than the agar.`;
  $("warns").innerHTML = ""; const w = r.warnings.slice(); if (fc > 300 && !w.some((x) => /300/.test(x))) w.unshift("More than 300 colonies: too crowded to count reliably. Use the next dilution.");
  w.forEach((t) => { const d = document.createElement("div"); d.className = "warn"; d.textContent = "⚠ " + t; $("warns").appendChild(d); });
}
view.addEventListener("click", (e) => {
  if (!S.result) return;
  const b = view.getBoundingClientRect(), x = (e.clientX - b.left) * (S.W / b.width), y = (e.clientY - b.top) * (S.H / b.height), reach = Math.max(14, S.W / 55);
  const ai = S.added.findIndex((p) => Math.hypot(p.x - x, p.y - y) < reach); if (ai >= 0) { S.added.splice(ai, 1); return render(); }
  let best = -1, bd = reach * 1.6; S.result.items.forEach((it, i) => { const d = Math.hypot(it.x - x, it.y - y); if (d < bd) { bd = d; best = i; } });
  if (best >= 0) { if (S.removed.has(best)) S.removed.delete(best); else S.removed.add(best); } else S.added.push({ x, y });
  render();
});

/* ---------- log ---------- */
$("m-date").valueAsDate = new Date();
$("addlog").addEventListener("click", () => {
  const fc = finalCount(); if (fc === null) { $("addmsg").textContent = "Load a plate first."; return; }
  const key = { round: $("m-round").value, visit: $("m-visit").value, sample_code: $("m-code").value, medium: $("m-medium").value, volume_plated_mL: $("m-vol").value.trim(), dilution_factor: $("m-df").value.trim() };
  let row = S.rows.find((r) => Object.keys(key).every((k) => String(r[k]) === key[k]));
  if (!row) { row = Object.assign({}, key); PA.COLUMNS.forEach((c) => { if (!(c in row)) row[c] = ""; }); S.rows.push(row); }
  row.date = $("m-date").value; row.photo_filename = S.photo;
  const day = $("m-day").value, ctr = $("m-counter").value;
  if (day === "7") { row["day7_colonies_counter" + ctr] = String(fc); row.auto_count_day7 = String(S.result.count); } else row["day" + day + "_colonies"] = String(fc);
  recalc(row); save();
  $("addmsg").textContent = `Saved ${fc} for ${key.sample_code}, round ${key.round} visit ${key.visit}, day ${day}, counter ${ctr}.`;
});
function recalc(row) {
  const v = +row.volume_plated_mL, df = +row.dilution_factor || 1, a = row.day7_colonies_counter1 === "" ? null : +row.day7_colonies_counter1, b = row.day7_colonies_counter2 === "" ? null : +row.day7_colonies_counter2;
  const c = a !== null && b !== null ? (a + b) / 2 : a !== null ? a : b;
  row.cfu_per_mL_calculated = c !== null && v > 0 ? String(Math.round(PA.cfuPerMl(c, v, df) * 10) / 10) : "";
}
function renderLog() {
  const t = $("logtable"), cols = PA.COLUMNS; t.innerHTML = "";
  const head = t.createTHead().insertRow(); head.appendChild(document.createElement("th")); cols.forEach((c) => { const th = document.createElement("th"); th.textContent = c; head.appendChild(th); });
  const body = t.createTBody();
  S.rows.forEach((row, ri) => {
    const tr = body.insertRow(), del = tr.insertCell(), btn = document.createElement("button"); btn.className = "b"; btn.textContent = "✕"; btn.title = "Delete row"; btn.addEventListener("click", () => { S.rows.splice(ri, 1); save(); renderLog(); }); del.appendChild(btn);
    cols.forEach((c) => {
      const td = tr.insertCell(), inp = document.createElement("input"); inp.value = row[c] === undefined ? "" : row[c]; if (/^(round|visit|day|volume|dilution|cfu|sample|medium|fuzzy|room|auto)/.test(c)) inp.className = "narrow";
      if (c === "cfu_per_mL_calculated") inp.readOnly = true;
      inp.addEventListener("change", () => { row[c] = inp.value.trim(); recalc(row); save(); if (/colonies|volume|dilution/.test(c)) renderLog(); });
      td.appendChild(inp);
    });
  });
}
$("addrow").addEventListener("click", () => { const r = {}; PA.COLUMNS.forEach((c) => { r[c] = ""; }); r.round = "A"; r.visit = "1"; r.medium = "R2A"; r.volume_plated_mL = "1"; r.dilution_factor = "1"; S.rows.push(r); save(); renderLog(); });
$("export").addEventListener("click", () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([PA.toCsv(S.rows)], { type: "text/csv" })); a.download = "plate_log.csv"; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); });
$("import").addEventListener("change", (e) => { const f = e.target.files[0]; if (!f) return; const rd = new FileReader(); rd.onload = () => { const rows = PA.parseCsv(String(rd.result)); rows.forEach((r) => { PA.COLUMNS.forEach((c) => { if (!(c in r)) r[c] = ""; }); }); S.rows = rows; save(); renderLog(); }; rd.readAsText(f); e.target.value = ""; });
$("clear").addEventListener("click", () => { if (confirm("Delete every row in the log? Export a CSV first if you want a copy.")) { S.rows = []; save(); renderLog(); } });
$("loaddemo").addEventListener("click", () => { S.rows = demoRows(); save(); renderLog(); });

function demoRows() { // invented numbers, only for trying the tool
  const rows = [], add = (rd, v, code, vol, df, c1, c2, med) => { const r = {}; PA.COLUMNS.forEach((c) => { r[c] = ""; }); Object.assign(r, { round: rd, visit: String(v), date: "2026-11-05", sample_code: code, medium: med || "R2A", volume_plated_mL: String(vol), dilution_factor: String(df), day7_colonies_counter1: String(c1), day7_colonies_counter2: String(c2 === undefined ? c1 : c2), notes: "DEMO DATA" }); recalc(r); rows.push(r); };
  for (const v of [1, 2, 3]) {
    const j = v - 2;
    add("A", v, "T", 1, 1, 4 + j, 5 + j); add("A", v, "F1", 0.1, 1000, 140 + 12 * j, 150 + 12 * j); add("A", v, "F1", 0.1, 100, 410, 400); add("A", v, "F2", 0.1, 100, 66 + 6 * j, 70 + 6 * j); add("A", v, "F2", 0.1, 1000, 8, 7);
    add("A", v, "B", 1, 1, 0, 0); add("A", v, "sterility_control", 0, 1, 0, 0); add("A", v, "N", "swab", 1, 12, 14);
    add("A", v, "F2", 1, 1, 3, 2, "fungal"); add("A", v, "N", "swab", 1, 9, 9, "fungal");
    add("B", v, "T", 1, 1, 5 - j, 4 - j); add("B", v, "F1", 1, 1, 52 + 5 * j, 48 + 5 * j); add("B", v, "F2", 1, 1, 24 + 3 * j, 26 + 3 * j); add("B", v, "B", 1, 1, 0, 0); add("B", v, "sterility_control", 0, 1, 0, 0);
  }
  rows.forEach((r) => { if (r.volume_plated_mL === "swab") { r.volume_plated_mL = "1"; r.dilution_factor = "1"; } });
  return rows;
}

/* ---------- analysis ---------- */
function renderAnalysis() {
  const res = PA.analyse(S.rows), F = $("findings"); F.innerHTML = "";
  if (!S.rows.length) F.innerHTML = '<div class="f info">No data yet. Add counts in the first tab, or load demo data in the Log tab.</div>';
  const icon = { good: "✔", warn: "⚠", bad: "✖", info: "ℹ" };
  res.findings.forEach((f) => { const d = document.createElement("div"); d.className = "f " + f.level; d.textContent = icon[f.level] + "  " + f.text; F.appendChild(d); });
  if (S.rows.length && !res.findings.length) F.innerHTML = '<div class="f info">Not enough complete data for any finding yet. You need tap (T) and flushed fridge (F2) counts for at least one visit.</div>';
  const wl = $("warnlist"); wl.innerHTML = res.warnings.length ? "<h2>Notes</h2>" + res.warnings.map((w) => '<div class="f info">' + w.replace(/</g, "&lt;") + "</div>").join("") : "";

  const t = $("summary"); t.innerHTML = "<thead><tr><th>Round</th><th>Visit</th><th>Tap T (CFU/mL)</th><th>Fridge first draw F1</th><th>Fridge flushed F2</th><th>F2 ÷ T</th><th>F1 ÷ F2</th><th>Valid?</th></tr></thead>";
  const body = t.createTBody(), rt = (x) => (x ? (x.dir === "atleast" ? "≥ " : x.dir === "atmost" ? "≤ " : "") + (x.value >= 100 ? x.value.toExponential(1).replace("e+", "e") : x.value.toFixed(1)) : "–");
  res.rounds.forEach((R) => R.visits.forEach((v) => { const tr = body.insertRow(); [R.round, v.visit, PA.fmt(v.T), PA.fmt(v.F1), PA.fmt(v.F2), rt(v.F2overT), rt(v.F1overF2), v.invalid ? "✖ " + v.issues.join("; ") : "✔"].forEach((x) => { tr.insertCell().textContent = x; }); }));
  drawChart(res);
  const cal = PA.calibration(S.rows);
  $("calib").textContent = cal ? `On ${cal.n} plates with 10 or more colonies, the automatic count differed from the manual count by ${(cal.mae * 100).toFixed(1)}% on average (bias ${cal.bias >= 0 ? "+" : ""}${(cal.bias * 100).toFixed(1)}%). ${cal.n < 10 ? "Fewer than 10 plates, so treat this as a rough guide." : ""}` : "No plates yet have both an automatic count and a manual count. Counts added from the first tab store the automatic count for day 7 automatically; enter the manual counts in the log to compare.";
}
function drawChart(res) {
  const cv = $("chart"), dpr = window.devicePixelRatio || 1, W = cv.clientWidth, H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr;
  const c = cv.getContext("2d"); c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H);
  const css = getComputedStyle(document.documentElement), fg = css.getPropertyValue("--fg").trim(), mute = css.getPropertyValue("--mute").trim(), line = css.getPropertyValue("--line").trim();
  const cols = { T: "#7f8c8d", F1: "#e0a030", F2: "#c0392b" };
  const L = 52, B = H - 40, T0 = 14, Rr = W - 12, lo = -1, hi = 7, y = (v) => B - ((Math.log10(Math.max(v, 0.1)) - lo) / (hi - lo)) * (B - T0);
  c.font = "12px system-ui"; c.fillStyle = mute; c.strokeStyle = line; c.textAlign = "right";
  for (let e = lo; e <= hi; e++) { const yy = y(Math.pow(10, e)); c.beginPath(); c.moveTo(L, yy); c.lineTo(Rr, yy); c.stroke(); c.fillText(e >= 0 ? "1e" + e : "0.1", L - 6, yy + 4); }
  c.save(); c.translate(12, (B + T0) / 2); c.rotate(-Math.PI / 2); c.textAlign = "center"; c.fillText("CFU per mL (log scale)", 0, 0); c.restore();
  const rounds = res.rounds; if (!rounds.length) { c.textAlign = "center"; c.fillStyle = mute; c.fillText("No data to chart yet", (L + Rr) / 2, (B + T0) / 2); return; }
  const gw = (Rr - L) / rounds.length, bw = Math.min(46, gw / 5);
  rounds.forEach((R, gi) => {
    const x0 = L + gi * gw + gw / 2; c.textAlign = "center"; c.fillStyle = fg; c.fillText("Round " + R.round, x0, B + 18);
    ["T", "F1", "F2"].forEach((k, ki) => {
      const vals = R.visits.filter((v) => !v.invalid && v[k]).map((v) => v[k].value); if (!vals.length) return;
      const gm = PA.geomean(vals), x = x0 + (ki - 1) * (bw + 6) - bw / 2; c.fillStyle = cols[k]; c.globalAlpha = 0.85; c.fillRect(x, y(gm), bw, B - y(gm)); c.globalAlpha = 1;
      c.fillStyle = fg; vals.forEach((v) => { c.beginPath(); c.arc(x + bw / 2 + (Math.random() - 0.5) * bw * 0.4, y(v), 3, 0, 7); c.fill(); });
    });
  });
  $("legend").innerHTML = ["T", "F1", "F2"].map((k, i) => `<span class="k" style="background:${cols[k]}"></span>${["Tap", "Fridge first draw", "Fridge flushed"][i]}`).join("") + " &nbsp; bars show the geometric mean of valid visits; dots are single visits";
}

/* ---------- test hooks and start-up ---------- */
window.__app = { S, run, showTab, demoRows, setImage, finalCount };
const q = new URLSearchParams(location.search);
if (q.get("demo")) { S.rows = demoRows(); const p = PC.makeSyntheticPlate(+q.get("demo") || 3, 85); setImage(p.rgba, p.w, p.h, "demo.png"); }
if (q.get("tab")) showTab(q.get("tab"));
})();
