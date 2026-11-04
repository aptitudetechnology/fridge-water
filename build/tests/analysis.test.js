const A = require("../analysis.js"); let fails = 0;
const eq = (name, got, want, tol) => { const ok = typeof want === "number" ? Math.abs(got - want) <= (tol || 1e-9) * Math.max(1, Math.abs(want)) : got === want; if (!ok) { fails++; console.log("FAIL", name, "got", got, "want", want); } else console.log("ok  ", name); };
eq("worked example in the protocol: 47 colonies, 0.1 mL of 1:100", A.cfuPerMl(47, 0.1, 100), 47000);
eq("classify 0", A.classify(0), "zero"); eq("classify 29", A.classify(29), "estimate"); eq("classify 30", A.classify(30), "countable"); eq("classify 300", A.classify(300), "countable"); eq("classify 301", A.classify(301), "toomany");
const row = (o) => Object.assign({ round: "A", visit: "1", medium: "R2A", volume_plated_mL: "1", dilution_factor: "1" }, o);
let s = A.summarise([row({ sample_code: "T", day7_colonies_counter1: "5", day7_colonies_counter2: "7" }), row({ sample_code: "T", day7_colonies_counter1: "6", day7_colonies_counter2: "6" })], "A", "1", "T", "r2a");
eq("tap duplicates 5/7 and 6/6 -> estimate mean 6 CFU/mL", s.value, 6); eq("  qualifier is estimate", s.q, "~");
s = A.summarise([row({ sample_code: "F2", volume_plated_mL: "1", day7_colonies_counter1: "400" }), row({ sample_code: "F2", volume_plated_mL: "0.1", dilution_factor: "100", day7_colonies_counter1: "80" }), row({ sample_code: "F2", volume_plated_mL: "0.1", dilution_factor: "1000", day7_colonies_counter1: "9" })], "A", "1", "F2", "r2a");
eq("only the 30-300 plate is used: 80 colonies, 0.1 mL of 1:100 -> 80,000", s.value, 80000); eq("  qualifier exact", s.q, "");
s = A.summarise([row({ sample_code: "F2", volume_plated_mL: "0.1", dilution_factor: "1000", day7_colonies_counter1: "500" })], "A", "1", "F2", "r2a");
eq("too many colonies -> lower bound", s.q, ">"); eq("  lower bound value", s.value, 5000000);
s = A.summarise([row({ sample_code: "T", day7_colonies_counter1: "0" })], "A", "1", "T", "r2a");
eq("zero colonies, 1 mL -> below 1 CFU/mL", s.q, "<"); eq("  detection limit", s.value, 1);
eq("ratio with a lower bound is 'atleast'", A.ratio({ value: 8000, q: "" }, { value: 1, q: "<" }).dir, "atleast");
eq("CSV round trip keeps a quoted comma", A.parseCsv(A.toCsv([{ round: "A", visit: "1", notes: 'a "q", b' }]))[0].notes, 'a "q", b');

// full scenario: old filter heavily contaminated, new filter clean
const mk = (rd, v, code, vol, df, c1, c2) => row({ round: rd, visit: String(v), sample_code: code, volume_plated_mL: String(vol), dilution_factor: String(df), day7_colonies_counter1: String(c1), day7_colonies_counter2: String(c2 === undefined ? c1 : c2) });
const rows = [];
for (const v of [1, 2, 3]) {
  rows.push(mk("A", v, "T", 1, 1, 4), mk("A", v, "F1", 0.1, 1000, 120), mk("A", v, "F2", 0.1, 100, 60), mk("A", v, "B", 1, 1, 0), mk("A", v, "sterility_control", 0, 1, 0));
  rows.push(mk("B", v, "T", 1, 1, 5), mk("B", v, "F1", 1, 1, 40), mk("B", v, "F2", 1, 1, 20), mk("B", v, "B", 1, 1, 0));
}
rows[3].volume_plated_mL = "1"; // blank row ok
const res = A.analyse(rows);
console.log(res.findings.map((f) => f.level.toUpperCase() + "  " + f.text).join("\n"));
eq("scenario: round A F2 flagged as >=10x tap", res.findings.some((f) => /Round A: fridge water after flushing/.test(f.text) && f.level === "warn"), true);
eq("scenario: filter change implicated", res.findings.some((f) => /points to the filter/.test(f.text)), true);
const bad = rows.concat([mk("C", 1, "T", 1, 1, 4), mk("C", 1, "F2", 1, 1, 4), mk("C", 1, "B", 1, 1, 3)]);
const ster = rows.concat([mk("D", 1, "T", 1, 1, 4), mk("D", 1, "F2", 1, 1, 4), mk("D", 1, "sterility_control", 0, 1, 2)]);
eq("a sterility control with volume 0 that grows invalidates the visit", A.analyse(ster).findings.some((f) => /Round D, visit 1: sterility control grew/.test(f.text)), true);
eq("a clean sterility control (0 colonies, volume 0) does not", A.analyse(rows).findings.some((f) => /sterility control grew/.test(f.text)), false);
eq("a blank that grows invalidates the visit", A.analyse(bad).findings.some((f) => /Round C, visit 1: field blank grew/.test(f.text)), true);
console.log(fails ? fails + " FAILED" : "all analysis tests passed"); process.exit(fails ? 1 : 0);
