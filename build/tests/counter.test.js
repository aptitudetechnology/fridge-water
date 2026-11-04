const PC = require("../counter.js");
const cases = [
  { name: "default (light colonies, glare, noise 3)", opts: {}, tol: 0.08 },
  { name: "dark colonies on light agar", opts: { light: false }, tol: 0.08 },
  { name: "heavy noise (8), no glare", opts: { noise: 8, glare: false }, tol: 0.08 },
  { name: "many touching colonies (25%)", opts: { touching: 0.25 }, tol: 0.16, smallTol: 6 },
  { name: "smaller image (600 px)", opts: { size: 600 }, tol: 0.08 },
];
let fail = 0;
for (const c of cases) {
  const errs = [], absErrs = [], plateErrs = [];
  for (const n of [5, 20, 50, 100, 200, 280]) for (const seed of [11, 12, 13, 14]) {
    const p = PC.makeSyntheticPlate(seed, n, c.opts), t = p.truth;
    const r = PC.countColonies(p.rgba, p.w, p.h, t.plate);
    const det = PC.detectPlate(p.rgba, p.w, p.h);
    const r2 = PC.countColonies(p.rgba, p.w, p.h, { cx: det.cx, cy: det.cy, r: det.r });
    errs.push({ n: t.count, c: r.count, c2: r2.count });
    plateErrs.push(Math.hypot(det.cx - t.plate.cx, det.cy - t.plate.cy) / t.plate.r);
  }
  const rel = (k) => errs.filter((e) => e.n >= 30).map((e) => Math.abs(e[k] - e.n) / e.n);
  const small = (k) => Math.max(...errs.filter((e) => e.n < 30).map((e) => Math.abs(e[k] - e.n)));
  const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length, max = (a) => Math.max(...a);
  console.log(`${c.name}\n   n>=30  true circle: mean ${(mean(rel("c")) * 100).toFixed(1)}%  worst ${(max(rel("c")) * 100).toFixed(0)}%   auto circle: mean ${(mean(rel("c2")) * 100).toFixed(1)}%  worst ${(max(rel("c2")) * 100).toFixed(0)}%\n   n<30   worst absolute error: true circle ${small("c")}, auto circle ${small("c2")}   plate-centre error (fraction of radius): max ${max(plateErrs).toFixed(3)}`);
  if (mean(rel("c")) > c.tol || small("c") > (c.smallTol || 4) || max(plateErrs) > 0.03) fail++;
}
console.log(fail ? "SOME CASES OUTSIDE TARGET" : "all cases within target (mean error under 8%, or 16% when 25% of colonies touch, for n>=30; at most 4 colonies off for n<30; plate found to within 3% of its radius)");
process.exit(fail ? 1 : 0);
