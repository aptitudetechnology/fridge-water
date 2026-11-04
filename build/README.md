# Plate counter and analysis

An offline web page that counts colonies on photographed agar plates, converts counts to CFU per mL, and applies the interpretation rules from `../test_plan.md` and `../agar_plate_protocol.md`.

## Run it

Open `index.html` in a browser (Chrome, Firefox or Edge). No install, no server, no internet. Photos are processed inside the page and never uploaded. Your log is stored in the browser's local storage; use **Export CSV** in the Log tab to keep a copy.

Try it first: **Count a plate → Try a demo plate** makes a computer-generated plate with a known number of colonies, and **Log → Load demo data** fills in invented numbers so you can see the Analysis tab. Demo rows are marked `DEMO DATA` in the notes column; clear them before real use.

## Files

| File | What it does |
|---|---|
| `index.html`, `app.js` | The page |
| `counter.js` | Finds the plate circle and counts colonies (pure functions, also used by the tests) |
| `analysis.js` | CFU/mL maths, qualifiers (`~` estimate, `>` at least, `<` below detection), the pass/fail rules, CSV |
| `tests/` | `run-all.sh` runs the analysis tests, the counter tests on synthetic plates, and a browser click-through |

## How counting works

1. Find the plate edge (a circle Hough transform; you can adjust it with the sliders).
2. Subtract a smooth local background (two passes, so large colonies don't hollow out and glare doesn't count).
3. Keep blobs that stand out from the noise, of colony size, with a clear peak.
4. Touching groups are counted by size relative to a typical single colony and shown in orange as `×n`.
5. You correct it: click a marker to remove it, click bare agar to add one.

## Measured accuracy (computer-made plates, `tests/counter.test.js`)

| Case | 30–280 colonies | Under 30 colonies |
|---|---|---|
| Light colonies, glare, noise | mean error 5%, worst 10% | up to 4 colonies off |
| Dark colonies | 6.5% mean, worst 12% | up to 3 off |
| Heavy noise, no glare | 3% mean, worst 7% | up to 3 off |
| Smaller image (600 px) | 6% mean, worst 14% | up to 4 off |
| A quarter of colonies touching | 14% mean (undercounts), worst 20% | up to 6 off |

The plate edge is located to within about 2% of its radius. The tests also check the CFU/mL arithmetic (including the worked example in the protocol), the 30–300 counting window, the pass/fail rules, and the rule that a growing sterility control or blank invalidates a visit.

## Limits you should know about

- **These are synthetic plates.** Real photos have condensation, bubbles, reflections, lids, colonies of similar colour to the agar, and overlapping growth. Expect worse. Before trusting the automatic numbers, count at least 10 real plates by hand as well and read the **Counter calibration** box in the Analysis tab. It compares the stored automatic count with your manual counts and shows the average error and bias.
- **It can't identify organisms** or tell bacteria, yeast and mould apart.
- **Counts show exposure, not harm.** Confirm anything important with an accredited lab before drawing conclusions or going public.
- **Confluent growth, swarming colonies and more than 300 colonies** are flagged as unreliable. Use a higher dilution.
- The rules in the Analysis tab are the ones written in `test_plan.md` before any results existed. Some thresholds (for example 10 times the tap) are judgement calls, not published standards.

## CSV columns

Same as `../plate_log_template.csv`, plus `auto_count_day7` at the end (the automatic count, kept separately from the manual counts for calibration). Controls (`sterility_control`, `air_control`) may have volume 0. A `fungal` medium row holds counts from the fungal plate.

## Tests

```
sh tests/run-all.sh
```
