/* Plate-count calculations and the interpretation rules from test_plan.md / agar_plate_protocol.md. Pure functions; no DOM. */
(function (root) {
"use strict";

const COLUMNS = ["round", "visit", "date", "sample_code", "medium", "volume_plated_mL", "dilution_factor", "day3_colonies", "day5_colonies", "day7_colonies_counter1", "day7_colonies_counter2", "cfu_per_mL_calculated", "fungal_colonies_day7", "fuzzy_mould_seen", "photo_filename", "room_temp_C", "notes", "auto_count_day7"];
const num = (v) => { if (v === null || v === undefined || String(v).trim() === "") return null; const n = Number(v); return Number.isFinite(n) ? n : null; };

/* CFU per mL = colonies / volume plated (mL) x dilution factor */
function cfuPerMl(count, volumeMl, dilutionFactor) { return (count / volumeMl) * dilutionFactor; }
function classify(count) { return count === 0 ? "zero" : count < 30 ? "estimate" : count <= 300 ? "countable" : "toomany"; }

function day7Count(row) {
  const a = num(row.day7_colonies_counter1), b = num(row.day7_colonies_counter2);
  if (a !== null && b !== null) return { count: (a + b) / 2, disagree: Math.max(a, b) >= 10 && Math.abs(a - b) / ((a + b) / 2) > 0.2, a, b };
  const v = a !== null ? a : b; return v === null ? null : { count: v, disagree: false, a, b };
}

/* One sample at one visit -> a single number with a qualifier: "" exact, "~" estimate, ">" at least, "<" below detection */
function summarise(rows, round, visit, code, medium) {
  const plates = [];
  for (const r of rows) {
    if (String(r.round) !== String(round) || String(r.visit) !== String(visit) || r.sample_code !== code || (r.medium || "R2A").toLowerCase() !== medium) continue;
    const isControl = code === "sterility_control" || code === "air_control", d = day7Count(r);
    const vol = isControl ? (num(r.volume_plated_mL) > 0 ? num(r.volume_plated_mL) : 1) : num(r.volume_plated_mL), df = num(r.dilution_factor) || 1;
    if (!d || !vol || vol <= 0) continue;
    plates.push({ count: d.count, vol, df, cfu: cfuPerMl(d.count, vol, df), status: classify(d.count), disagree: d.disagree });
  }
  if (!plates.length) return null;
  const countable = plates.filter((p) => p.status === "countable");
  if (countable.length) return { value: countable.reduce((a, p) => a + p.cfu, 0) / countable.length, q: "", plates };
  const est = plates.filter((p) => p.status === "estimate");
  if (est.length) {
    const best = est.reduce((a, p) => (p.count > a.count ? p : a)), same = est.filter((p) => p.vol === best.vol && p.df === best.df);
    return { value: same.reduce((a, p) => a + p.cfu, 0) / same.length, q: "~", plates };
  }
  const many = plates.filter((p) => p.status === "toomany");
  if (many.length) return { value: Math.min(...many.map((p) => p.cfu)), q: ">", plates };
  return { value: Math.min(...plates.map((p) => p.df / p.vol)), q: "<", plates };
}

function ratio(a, b) { // a / b with qualifiers -> {value, dir}: dir "exact", "atleast" or "atmost"
  if (!a || !b) return null;
  let dir = "exact";
  const qa = a.q === ">" ? "atleast" : a.q === "<" ? "atmost" : "exact", qb = b.q === ">" ? "atmost" : b.q === "<" ? "atleast" : "exact";
  if (qa === "atleast" && qb !== "atleast") dir = "atleast"; else if (qa === "atmost" && qb !== "atmost") dir = "atmost";
  else if (qb === "atleast" && qa !== "atleast") dir = "atleast"; else if (qb === "atmost" && qa !== "atmost") dir = "atmost";
  else if (qa !== "exact" && qb !== "exact") dir = "unknown";
  return { value: a.value / b.value, dir };
}
const atLeast = (r, x) => !!r && r.dir !== "unknown" && r.dir !== "atmost" && r.value >= x;
const atMost = (r, x) => !!r && r.dir !== "unknown" && r.dir !== "atleast" && r.value <= x;
const geomean = (xs) => Math.exp(xs.reduce((a, x) => a + Math.log(x), 0) / xs.length);
const median = (xs) => { const s = xs.slice().sort((a, b) => a - b), m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

function analyse(rows) {
  rows = rows.filter((r) => String(r.round || "").trim() !== "");
  const rounds = [...new Set(rows.map((r) => String(r.round)))].sort();
  const out = { rounds: [], findings: [], warnings: [] };
  for (const rd of rounds) {
    const visits = [...new Set(rows.filter((r) => String(r.round) === rd).map((r) => String(r.visit)))].sort((a, b) => a - b);
    const R = { round: rd, visits: [] };
    for (const v of visits) {
      const V = { visit: v, T: summarise(rows, rd, v, "T", "r2a"), F1: summarise(rows, rd, v, "F1", "r2a"), F2: summarise(rows, rd, v, "F2", "r2a"), N: summarise(rows, rd, v, "N", "r2a"), blank: summarise(rows, rd, v, "B", "r2a"), sterility: summarise(rows, rd, v, "sterility_control", "r2a"), air: summarise(rows, rd, v, "air_control", "r2a"), fungal: {} };
      for (const c of ["T", "F1", "F2", "N", "B"]) V.fungal[c] = summarise(rows, rd, v, c, "fungal");
      const issues = [];
      const grew = (s) => s && s.plates.some((p) => p.count > 0);
      if (grew(V.sterility)) issues.push("sterility control grew");
      if (grew(V.blank)) issues.push("field blank grew");
      if (grew(V.fungal.B)) issues.push("fungal blank grew");
      V.invalid = issues.length > 0; V.issues = issues;
      for (const k of ["T", "F1", "F2"]) if (V[k] && V[k].plates.some((p) => p.disagree)) V.issues.push(k + ": the two counters disagree by more than 20%");
      V.F1overT = ratio(V.F1, V.T); V.F2overT = ratio(V.F2, V.T); V.F1overF2 = ratio(V.F1, V.F2);
      R.visits.push(V);
    }
    out.rounds.push(R);
  }

  for (const R of out.rounds) {
    const valid = R.visits.filter((v) => !v.invalid && v.T && v.F2), n = valid.length, tag = "Round " + R.round;
    for (const v of R.visits) if (v.invalid) out.findings.push({ level: "bad", text: `${tag}, visit ${v.visit}: ${v.issues.join("; ")}. Discard this visit's results and repeat the session.` });
    else for (const i of v.issues) out.warnings.push(`${tag}, visit ${v.visit}: ${i}.`);
    if (n === 0) { out.findings.push({ level: "info", text: `${tag}: not enough valid visits with both tap (T) and fridge-flushed (F2) counts to compare.` }); continue; }
    const big = valid.filter((v) => atLeast(v.F2overT, 10)).length, near = valid.filter((v) => atMost(v.F2overT, 3)).length;
    const need = Math.min(2, n);
    if (big >= need && big >= 1) out.findings.push({ level: "warn", text: `${tag}: fridge water after flushing (F2) was at least 10 times the tap on ${big} of ${n} valid visit${n > 1 ? "s" : ""}. That is a real difference, so send fresh samples to an accredited lab.${n < 3 ? " (Fewer than 3 valid visits, so treat with extra caution.)" : ""}` });
    else if (near === n) out.findings.push({ level: "good", text: `${tag}: fridge water after flushing (F2) was within about 3 times the tap on every valid visit. No sign of regrowth in this fridge at this time.` });
    else out.findings.push({ level: "info", text: `${tag}: fridge water (F2) was between 3 and 10 times the tap, or inconsistent across visits. No clear conclusion; keep sampling.` });
    const stag = valid.filter((v) => atLeast(v.F1overF2, 10)).length;
    if (stag >= need && stag >= 1) out.findings.push({ level: "info", text: `${tag}: first-draw water (F1) was at least 10 times the flushed water (F2) on ${stag} of ${n} visits. That points to growth in the stagnant line; flushing before drinking helps.` });
    const f2fun = R.visits.filter((v) => !v.invalid && v.fungal.F2 && v.fungal.F2.plates.some((p) => p.count > 0)).length, nfun = R.visits.filter((v) => !v.invalid && v.fungal.N && v.fungal.N.plates.some((p) => p.count > 0)).length;
    const nSwab = R.visits.filter((v) => !v.invalid && v.N && v.N.plates.some((p) => p.count > 0)).length;
    if (f2fun >= 1) out.findings.push({ level: "warn", text: `${tag}: yeast or mould grew from the flushed fridge water on ${f2fun} visit${f2fun > 1 ? "s" : ""}. It is in the water itself, so have the lab identify it.` });
    else if (nfun >= 1) out.findings.push({ level: "info", text: `${tag}: fungal growth from the nozzle swab but none from the flushed water. That points to an outlet-surface problem; clean the nozzle.` });
    if (nSwab && !nfun && !f2fun) out.findings.push({ level: "info", text: `${tag}: bacterial growth from the nozzle swab (not quantifiable). Compare with the water counts.` });
  }

  const A = out.rounds.find((r) => r.round === "A"), later = out.rounds.filter((r) => r.round !== "A");
  if (A && later.length) {
    const vals = (R) => R.visits.filter((v) => !v.invalid && v.F2 && v.F2.q !== "<" && v.F2.q !== ">").map((v) => v.F2.value);
    const a = vals(A);
    for (const L of later) {
      const b = vals(L); if (!a.length || !b.length) continue;
      const rr = median(a) / median(b);
      if (rr >= 10) out.findings.push({ level: "warn", text: `Round A (old filter) against round ${L.round}: median flushed-fridge count fell ${rr.toFixed(0)} times after the filter change. That points to the filter as the source.` });
      else if (rr <= 3 && rr >= 1 / 3) out.findings.push({ level: "info", text: `Round A (old filter) against round ${L.round}: the flushed-fridge count changed by less than 3 times. The old filter doesn't look like the main source.` });
      else out.findings.push({ level: "info", text: `Round A (old filter) against round ${L.round}: the median flushed-fridge count changed ${rr >= 1 ? rr.toFixed(1) + " times lower" : (1 / rr).toFixed(1) + " times higher"}. Inconclusive.` });
    }
  }
  return out;
}


/* Compare the automatic counts with the manual day-7 counts, for plates that have both */
function calibration(rows) {
  const pairs = [];
  for (const r of rows) { const a = num(r.auto_count_day7), d = day7Count(r); if (a !== null && d && d.count >= 10 && (num(r.day7_colonies_counter1) !== null || num(r.day7_colonies_counter2) !== null)) pairs.push({ auto: a, manual: d.count }); }
  if (!pairs.length) return null;
  const errs = pairs.map((p) => (p.auto - p.manual) / p.manual);
  return { n: pairs.length, bias: errs.reduce((a, b) => a + b, 0) / errs.length, mae: errs.reduce((a, b) => a + Math.abs(b), 0) / errs.length };
}

/* CSV */
function toCsv(rows) {
  const esc = (v) => { const s = v === null || v === undefined ? "" : String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  return [COLUMNS.join(",")].concat(rows.map((r) => COLUMNS.map((c) => esc(r[c])).join(","))).join("\n") + "\n";
}
function parseCsv(text) {
  const rows = []; let row = [], f = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true; else if (c === ",") { row.push(f); f = ""; } else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(f); f = ""; if (row.some((x) => x !== "")) rows.push(row); row = []; } else f += c;
  }
  if (f !== "" || row.length) { row.push(f); if (row.some((x) => x !== "")) rows.push(row); }
  if (!rows.length) return [];
  const head = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => { const o = {}; head.forEach((h, i) => { o[h] = (r[i] || "").trim(); }); return o; });
}
function fmt(s) {
  if (!s) return "–"; const v = s.value, str = v >= 100000 ? v.toExponential(1).replace("e+", "e") : v >= 100 ? Math.round(v).toLocaleString("en") : v >= 10 ? v.toFixed(0) : v.toFixed(1);
  return (s.q === "~" ? "~" : s.q === ">" ? ">" : s.q === "<" ? "<" : "") + str;
}

const api = { calibration, COLUMNS, cfuPerMl, classify, summarise, ratio, analyse, toCsv, parseCsv, fmt, geomean, median };
if (typeof module !== "undefined" && module.exports) module.exports = api; else root.PlateAnalysis = api;
})(typeof self !== "undefined" ? self : this);
