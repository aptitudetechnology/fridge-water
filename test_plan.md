# Testing the fridge dispenser ourselves

Written for: you and your household, to run with an accredited laboratory. It's built from the earlier review's test plan, tightened using what we verified about the Payment study and the Zmirou study.

For the wider research this could grow into (taste tests, blinded water swaps, a 100-fridge survey, a sham-controlled trial), see `research_agenda.md`.

## What testing can and can't tell us

**It can tell us:**
- Whether this fridge's water carries more bacteria, yeast or mould than the tap, and how much more.
- Whether that changes with filter age.
- Whether any of the organisms are ones clinicians worry about (for example *Pseudomonas aeruginosa*).
- Whether contamination is in the water or only at the nozzle.

**It can't tell us:**
- Whether the water caused anyone's symptoms. Counts describe *exposure*. The verified evidence says a high count is a weak, uncertain risk factor in healthy people.
- Anything about a different fridge or filter.

So a result is useful either way. A clean fridge rules this appliance out, which is a good result. A heavily contaminated one gives you a measured exposure, and the first real data point anyone has for a fridge.

## Stage 0: home agar plates, then the lab

You plan to start with home agar plates. That works well as a screen. Follow `agar_plate_protocol.md` for the method and, importantly, its safety rules (room-temperature incubation only, sealed plates, no opening after growth). Use the same sampling design below, and confirm anything interesting with an accredited lab, since home counts are rough.

## The key design choice: compare the same fridge, old filter against new

The comparison that matters is **the same fridge with its old filter (over 6 months) against the same fridge after a fresh filter**. That cancels out the building, the tap and the fridge model.

| Round | When | Filter state |
|---|---|---|
| A | Now, before touching anything | Old filter (over 6 months in use) |
| B | 1 week after fitting a genuine new filter, after flushing as the manual says | New filter |
| C | 4 to 6 weeks after fitting it | New filter, starting to age |
| D (optional) | 6 months after fitting it | Aging again |

Each round has **3 visits on different days** (at least 2 days apart, same time of day, so you can see day-to-day variation). Replacing the filter changes the exposure, so do round A completely before you change anything, and **don't clean or sanitise the dispenser first**.

If you notice a power cut, sample the next morning and note it. Don't create one on purpose; the evidence for outage effects is thin and it spoils food.

## What to collect at each visit

Use **sterile bottles from the lab**, not your own. Ask for bottles with sodium thiosulfate for the tap sample, because chlorine in tap water kills bacteria in the bottle before it reaches the lab. Fridge water has had the chlorine removed.

| Code | Sample | How |
|---|---|---|
| T | Kitchen cold tap | Run 2 minutes, then fill a thiosulfate bottle |
| F1 | Fridge, **first draw** | The first 250 mL after at least 8 hours without use (first thing in the morning). Hold the bottle near the nozzle without touching it |
| F2 | Fridge, **after flushing** | Dispense and discard 2 litres, then take 250 mL |
| N | **Nozzle swab** | Sterile swab, wet with the lab's sterile diluent, rotated around the inside rim of the outlet |
| I | Ice (optional) | Ice from the dispenser into a sterile bag, melted at room temperature in a clean place |
| B | **Field blank** | A sterile bottle opened and closed at the fridge, without filling. This shows whether sampling itself adds contamination |

F1 against F2 tells you whether bacteria sit in the stagnant line (F1 high, F2 low) or keep coming from the filter (both high). N against F2 separates a dirty outlet from dirty water.

Also test **chlorine at the tap and at the fridge on the spot** with a cheap DPD test kit or strips for free and total chlorine. The tap should show a residual and the fridge about none, which confirms the filter is stripping it.

## Tests to ask for

Ask the lab for each of these (some labs won't offer all; prioritise the first four):

1. **Heterotrophic plate count on R2A agar**, ideally at **35 °C for 2 days** (as in Payment's study, which found the link at that temperature) **and** at 20 to 28 °C for 5 to 7 days. Ask the lab to report CFU per mL, not "TNTC" or ">" (too numerous to count); if they can't count that high, ask for dilutions.
2. ***E. coli* and total coliforms (presence or count per 100 mL)**, to rule out sewage-type contamination.
3. ***Pseudomonas aeruginosa*** (membrane filtration on a selective agar) in 100 to 250 mL.
4. **Yeast and mould count**, in CFU per mL, with identification to genus if they can.
5. **Endotoxin** (LAL assay), in EU per mL. Fewer labs do this; ask a university or specialist lab.
6. **Legionella** (optional; cold fridge water is a less likely home for it).
7. **Total cell count by flow cytometry** (optional, research labs only).

For the nozzle swab ask for aerobic bacteria and yeast and mould, semi-quantitative.

If you can only afford a few tests, the minimum useful set is **HPC on R2A, *E. coli* and coliforms, *Pseudomonas aeruginosa*, and yeast and mould, on T, F1, F2 and N**, for rounds A and B.

## Optional extra: ATP (living biomass) screening

ATP bioluminescence gives a fast reading of how much living microbial material is in a water sample. It doesn't identify organisms and it doesn't replace plates or the lab tests. Use it, if at all, as a relative comparison: fridge against tap against blank.

**What the literature gives us** (Hammes et al. 2010, *Water Research*, abstract read):
- An optimised luminescence method detected ATP as low as 0.0001 nM.
- Across more than 100 water samples, microbial ATP tracked the number of intact cells (R² = 0.8), with an average of 1.75 × 10⁻¹⁰ nmol ATP per cell.

**What that implies (my arithmetic from that average):**

| Intact cells per mL | ATP |
|---|---|
| 10³ | about 0.0002 nM |
| 10⁴ | about 0.002 nM |
| 10⁵ | about 0.02 nM |

**The practical problem is sensitivity.** The Hammes work used a lab-grade method. Reported detection limits for other luminometers differ widely; one 2025 laboratory study gives 0.01 nM for a luminometer, which by the table above would only detect roughly 60,000 cells per mL. Handheld hygiene luminometers (the kind used on kitchen surfaces) are generally not designed for this. A Manitoba government guide notes that luminometer models "differ significantly" in detection limits and reproducibility. I haven't found a datasheet showing a consumer or hygiene meter that reaches typical drinking-water levels.

**Update:** a handheld meter can't read tap water directly, but concentrating the sample (filtering about 100 mL and bursting the cells into about 0.1 mL of reagent) packs roughly a thousand times more ATP into the reading, by our arithmetic. Whether a particular kit does this well enough is untested; see the validation step in `replication_protocol.md`.

**My earlier recommendation, for a meter used directly:** don't buy a luminometer for this. If you want ATP, **ask whether the lab offers it** (some environmental labs do ATP or flow cytometry for drinking water), and use it on the same samples (T, F1, F2, B). Collect the tap sample in a thiosulfate bottle, because chlorine interferes. See `atp_luminometer_checklist.md` if you decide to buy one anyway.

**How to read it:** the same way as the plate counts. Fridge F2 at least 10 times the tap, on at least two of three visits, is a real difference. Compare against the blank, which sets the floor.

## Optional extra: smell, sulphide strip and breath meter

These three cheap checks target the hydrogen sulfide idea (water that smells of rotten eggs, and breath that carries it). They sit beside the agar plates, not in place of them.

- **Blind sniff test.** A helper pours dispenser water and jug water into two coded glasses at the same temperature. Sniff and rate each from 0 (none) to 3 (strong). Repeat on several days. Record "sulphur / rotten egg", "musty / earthy", "chlorine" or "none".
- **Hydrogen sulfide strip test.** Paper-strip and bottle tests that turn black when sulphide-producing bacteria are present are a known low-cost field screen for drinking water. They were designed as a faecal-contamination screen, so a positive in a fridge is a flag, not a diagnosis. Papers on the method: Matwewe 2018 (*J Water Health*, PMID 29952325), Weppelmann 2014 (*Environ Monit Assess*, PMID 25182685), Islam 2017 (*Am J Trop Med Hyg*, PMID 29141754), Desmarchelier 1992 (*Trans R Soc Trop Med Hyg*, PMID 1440833). **Titles checked only; read the abstracts and the manufacturer's instructions before use.** Incubate sealed at room temperature, never opened.
- **Breath sulphide meter.** A handheld sulphide monitor (Halimeter-type) used during the blinded water swap. Measure at the same time each morning, before eating, drinking or brushing, and note anything that changes the reading (garlic, alcohol, a cold). Use the same device and the same person measuring each time.

Hydrogen sulfide is a gas. Collect water for the sniff and strip tests quickly and keep it covered, because the smell fades as it escapes.

## Choosing and instructing the lab

- Use a lab **accredited for water microbiology** (ISO/IEC 17025; in Australia, NATA).
- Ask which **methods and media** they use, and ask for the raw report with the detection limit and the incubation temperature and time.
- Ask how long samples can wait before arriving. HPC samples should reach the lab **within 24 hours, kept cold** (on ice, not frozen), and the lab should record the arrival temperature.
- Don't tell the lab which sample is which beyond the codes above. If you can, label the bottles with random codes yourself and keep the key.

## Decide how you'll read the results *before* you get them

Writing this down first stops us reading meaning into the numbers afterwards. These are my suggested rules, not published standards, except where marked.

| Result | What I'd conclude |
|---|---|
| *E. coli* or fecal coliforms present anywhere | A separate plumbing or supply problem; stop drinking that water and contact the water utility. Fecal contamination is the one clearly proven hazard in the evidence we verified |
| Fridge F2 HPC at or below tap level, or below about 100 CFU/mL | This fridge doesn't support the hypothesis |
| Fridge F2 HPC above about **500 CFU/mL** | Above the figure the US had proposed as a limit for finished water (cited in Payment 1991, AEM). Evidence of regrowth |
| Fridge F2 HPC **about 10³ CFU/mL or more** | In the range of Swanson & He's ten fridges (mean about 930 CFU/mL, first-draw) and the lower end of Payment's household units (10³ to 10⁵), where counts went with a modest rise in illness. Evidence of exposure, not of harm |
| F1 much higher than F2 | Stagnation in the line; flushing before drinking helps |
| F1 and F2 both high, and higher with the old filter than the new | The filter is the source |
| *P. aeruginosa* detected | Worth knowing, mainly for immunocompromised people in the home |
| Yeast or mould in N but not in F2 | An outlet-surface problem; clean the nozzle |
| Yeast or mould in F1 and F2 | In the water itself |
| Field blank B not clean | Sampling contamination; discard that visit's results |

Treat a ratio of **at least 10 times** between fridge and tap, seen on at least two of the three visits, as a real difference. With 3 visits per round you can't do meaningful statistics, so look at consistency, not p-values.

## Household health log (run alongside)

Use the symptom log in the earlier review (section 8) from before round A. It is a record, not a trial: you know which water you drank, so expectation effects are possible. If you later try an elimination period (boiled or bottled water only for a few weeks), record it the same way and treat the result cautiously.

None of this replaces seeing a doctor about the night-time episodes, whatever the water results show.

## If results are bad

- Replace the filter, then flush and sanitise the line following the manufacturer's manual, or get a technician to do it. Retest 1 to 2 weeks later to see whether it worked, since regrowth after cleaning has been reported within days to weeks.
- Until then, flush 2 litres before drinking, or use boiled or bottled water, especially for anyone immunocompromised, very young or elderly.

## Costs and practicalities

I can't give you prices; get quotes from at least two labs and compare per-sample prices for the minimum set. The main cost drivers are the number of sample types, the number of visits, and the specialist tests (endotoxin, flow cytometry).

## Using the results in the video

- Show the lab's own report on screen.
- Say exactly what was and wasn't tested, with the sample size (one fridge).
- State the result either way; the "Data over assumptions" line only works if we do.
- If you can persuade a few friends or family to test their fridges the same way, a handful of fridges is far more convincing than one.

## Where the evidence behind the thresholds comes from

- 500 CFU/mL: a figure the US proposed in 1989, as quoted in Payment et al. 1991 (AEM; `sources/aem00057-0063.pdf`).
- 10³ to 10⁵ CFU/mL and the 35 °C R2A measurement: Payment 1989 and 1991 (`verified_evidence.md`, entries 1 and 2).
- Fecal indicators as the proven hazard: Zmirou et al. 1987 (`sources/amjph00256-0048.pdf`).
- The other thresholds in the table (100 CFU/mL, the 10× rule) are my own judgement.
