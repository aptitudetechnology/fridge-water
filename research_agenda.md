# How the open questions could be researched

Written for: you, collaborators such as a university microbiology or public-health group or a community bio lab, and anyone who wants to turn the "unmeasured" parts of the story into data.

Most of the claims we've marked *unmeasured* are unmeasured because nobody has done the study, not because the study can't be done. This file turns each open question into a design: what to measure, who to compare, how to avoid fooling ourselves, roughly how many, and what a result would mean.

**Conventions.** Sample sizes come from standard formulas with the assumptions stated, so a statistician can check and replace them. Everything here is a plan to be reviewed, not a protocol approved by anyone. Any study involving other people needs ethical review first. Names of verified studies refer to `verified_evidence.md`.

## The ground rules (apply to every study)

1. **Pre-register** the question, outcome, comparison and decision rule before looking at data (for example on the Open Science Framework).
2. **Controls:** blanks, tap-water comparison, and same-fridge before/after wherever possible.
3. **Blind** whoever can be blinded: the lab, the counters, the people tasting or logging symptoms.
4. **State the result you'd accept as "no".** Publish it either way.
5. **Declare conflicts.** Researchers who believe they've been harmed have a stake; say so and let others analyse the data.
6. **Share raw data and code** (the `build/` tool already does counts and CFU/mL calculations).
7. **No substitute for medical care.** Anyone with persistent or alarming symptoms is assessed by a doctor first; none of this replaces that.

## Stage 0: this household (weeks)

| Question | Design | What would count as an answer |
|---|---|---|
| Is anything unusual in this fridge's water? | The sampling plan in `test_plan.md`: tap, first draw, flushed, nozzle, drip tray, blank; old filter, then new. Plates first, then an accredited lab (plate counts at 35 °C and 20–28 °C, coliforms and *E. coli*, *Pseudomonas aeruginosa*, yeast and mould; ATP or flow cytometry if available) | Fridge at least 10× the tap on at least two of three visits is a real difference; within about 3× is not |
| What do the line conditions look like? | Temperature probes taped on the outside of the dispenser line and nozzle, a plug-in mains-loss sensor, logging time between draws (see the logger idea) | Real numbers for stagnation, warming and power cuts, which no study has reported |
| Can anyone taste a difference? | Blind comparison of fridge water and a reference (bottled or tap), see Stage 1 | Share of correct picks above chance |
| Do symptoms follow the water? | Blinded water swap (the N-of-1 design below), with the symptom log | Pre-agreed pattern across randomised periods |

## Stage 1: small studies (months)

### 1. A blinded taste test (does the water taste different?)
- **Question:** can people tell fridge water from a reference, and does the difference grow with filter age?
- **Design:** triangle test (a standard sensory method): each person gets three identical cups, two the same and one different, and picks the odd one. Serve cold, in opaque cups, in random order. Compare old-filter water against a reference and, later, new-filter water against the same reference.
- **Size:** if chance is one in three and you want 80% power to detect that half of people pick correctly (one-sided α = 0.05), about **52 people** per comparison. (Calculation: n ≈ [(1.645·√(p₀q₀) + 0.84·√(p₁q₁)) / (p₁ − p₀)]² with p₀ = 1/3 and p₁ = 1/2.)
- **Means:** if people can tell, the taste story ("The slow change") has a measured basis. If they can't, drop it or keep it explicitly as a hypothesis.

### 2. A blinded water swap in one household (N-of-1 trials)
- **Question:** do this household's symptoms (night-time episodes, digestive symptoms, breath, flushing) follow the water?
- **Design:** a randomised, multi-period crossover. A helper who is not a participant fills identical opaque bottles, coded A and B, with fridge-dispenser water or a reference (bottled spring water, or tap water). Participants drink only the coded bottles, at home, for each period, and complete the same daily symptom log. The helper holds the key until the end.
- **Number of periods:** each pair is one period on each water, in random order. With only 4 pairs, the smallest possible p-value by a pair-level permutation test is 1/16 = 0.0625, which can never reach 0.05. Use **at least 6 pairs** (smallest p = 1/64 ≈ 0.016). One week per period with a 2-day washout means about 16 weeks.
- **Check the blinding:** at the end of each period ask "which water do you think this was?" If people guess right more often than chance, blinding failed and the result is weak.
- **Outcome:** choose one primary outcome in advance (for example the count of night-time episodes per week) and two or three secondary outcomes.
- **Limits:** one household, expectation effects, and any real difference in taste can unblind. It can show a pattern worth chasing; it can't show cause in anyone else.
- **Safety:** this runs alongside medical assessment. Anyone with a severe or frightening episode stops and seeks care.

### 3a. Field knowledge: interviews and a short survey of the people who service and sell these
- **Why:** appliance technicians, filter makers and retailers may have seen the inside of many lines and filters, and heard what customers report. That is real-world evidence, and nobody has collected it systematically. It sits at the bottom of the evidence ladder, which is exactly where a hypothesis starts.
- **Design:** (a) 10 to 20 semi-structured interviews, continuing until new interviews stop turning up new themes; (b) a short anonymous survey of technicians and filter-company staff.
- **Questions:** how often do you find slime or discolouration in lines, housings or filters? How old is the filter when you find it? What do customers report about taste, smell or health? How often do customers actually change filters? What do you do about it, and what do customers do after you tell them? What would make it easier to avoid?
- **Size:** for the survey, about **96 responses** gives a margin of ±10 percentage points on a yes/no question (95% confidence, p = 0.5).
- **Handling:** record answers anonymously, code them by theme with two independent coders, and report counts, not quotations that identify anyone. Treat the results as hypothesis-generating, not as proof; they show what experienced people have seen, not how often it happens in all homes.
- **Tone:** these are colleagues, not suspects. A company or technician who warns about regrowth is giving useful information, and a commercial interest does not make a warning wrong.

### 3. A small number of fridges (a pilot survey)
- **Question:** how contaminated are fridges at all, as a function of filter age, use and power cuts?
- **Design:** 15–30 households (friends and family) sampled the same way, with a short questionnaire (filter age, fridge model, uses per day, power cuts, cleaning habits).
- **Size:** enough to check the method and see the spread, not to estimate prevalence. Use it to design the full survey.

## Stage 2: a proper survey and logger study (6–12 months)

### 4. A cross-sectional survey of home dispensers
- **Question:** what share of home fridge dispensers exceed benchmarks (for example 500 CFU/mL on R2A), and what predicts it?
- **Design:** one standardised sample set per fridge (tap, first draw, flushed, nozzle, drip tray, blank), a lab panel, and metadata. Recruit across brands, filter ages and regions.
- **Size:** to estimate a proportion to ±10 percentage points at 95% confidence when you know nothing in advance (p = 0.5), you need about **96 fridges** (n = 1.96² × 0.25 / 0.1²). For ±5 points, about 385.
- **Analysis:** report medians and 90th percentiles of CFU/mL, the share above each benchmark, and regression on filter age, uses per day and outage history. This also gives the dose range the research prompts only assumed.

### 5. Same-fridge before and after a filter change
- **Question:** does a new filter cut counts, and by how much?
- **Design:** sample the same fridge just before replacement and at set times afterwards (for example 1 week, 4 weeks, 12 weeks, 6 months).
- **Size:** for a paired comparison of log₁₀ counts, assume the spread of differences (σ) is about 0.7 (a guess, to be replaced by the pilot). To detect a drop of 1 log (10×) with 80% power at α = 0.05: about 4 fridges. For 0.5 log (3×): about 16. Use 20 to 30 to allow for losses.

### 6. A logger study (conditions inside the line)
- **Question:** how long does water sit, how warm does it get, and what do power cuts do?
- **Design:** low-cost loggers (temperature on the outside of the line and nozzle, a mains-loss sensor, timestamps for draws) in 20 to 50 homes for 3 to 12 months, matched to the water samples above.
- **Means:** gives the first real numbers on stagnation time and temperature excursions, which the script currently only describes as a mechanism.

## Stage 3: health studies (needs a partner and ethical approval)

### 7. A sham-controlled household intervention trial
- **Question:** does cleaning the dispenser line and replacing the filter reduce symptoms?
- **Design:** model it on the published home-filter trials (Colford 2005 and 2009: blinded, with sham devices, crossover, 6 months each, 456 and 714 households). Every household gets a service visit; half get a real line sanitisation and new filter, half get a sham service (the technician visits, flushes, changes nothing). Swap after a set period. Check exposure with water counts so you know the real intervention changed something.
- **Outcome:** a validated gastrointestinal symptom scale plus a short daily diary, with the water counts as the exposure check.
- **Size:** a small pilot of about 60 households in crossover can detect a moderate effect (standardised difference d = 0.5) with 80% power: n ≈ (1.96 + 0.84)² / d² ≈ 31, so about **34** with allowances. A full trial for rarer outcomes would need hundreds.
- **Means:** the strongest design for "does the dispenser matter for symptoms" in ordinary households.

### 8. A case-control study of unexplained chronic symptoms
- **Question:** among people with persistent digestive or flushing symptoms and no explanation after a medical work-up, is dispenser use more common than in matched people without symptoms?
- **Design:** recruit cases through clinics after other causes have been looked for, and matched controls. Measure exposure objectively (water sampling at home, not only a questionnaire) to limit recall bias. Analyse with conditional logistic regression, adjusting for diet, housing dampness, medicines and alcohol (confirmed by blood tests).
- **Size:** to detect an odds ratio of 2 when 30% of controls are exposed, with 80% power at α = 0.05: about **141 cases and 141 controls**.
- **Caution:** associations here can come from many sources; the aim is to decide whether to run something bigger.

### 9. Breath and the mouth
- **Question:** does switching water change breath odour or oral bacteria in people with persistent bad breath that dental care hasn't explained?
- **Design:** first rule out oral causes with a dentist (gums, tongue coating, decay). Then a crossover: two periods on dispenser water and a reference water, with breath sulphur compounds measured by a breath monitor, tongue coating scored by trained blinded judges, and a swab of the tongue for sequencing.
- **Size:** a pilot of about 30 to 40 people, as in the crossover calculation above.
- **Means:** tests the "bad breath" arrow directly. Most bad breath is oral, so a null result is likely, and that's informative.

### 10. Objective evidence about alcohol, for people who are doubted
- **Question:** in people who are assumed to drink heavily and say they don't, can a test show what they drink?
- **Means:** ask a doctor about a blood test for alcohol intake over the previous weeks (phosphatidylethanol, PEth, is used for this) and standard liver tests. Where flushing and puffiness are unexplained, the earlier review also lists evaluations for rosacea, liver disease unrelated to alcohol, sleep apnoea, the alcohol-flush enzyme variant, and the rare gut-fermentation condition (a carbohydrate challenge with blood ethanol monitoring). I haven't checked which tests suit which situation; that's a decision for a doctor.
- **Why it matters here:** an objective result speaks louder than "almost never" to someone who has already decided.

## Stage 4: mechanism, regulation and social science

### 11. Animals
- **Question:** over months, does drinking water carrying a dispenser-type bacterial community at realistic doses change the gut, inflammation, permeability or the liver?
- **Design:** mice drinking water with a defined mixture of dispenser-type organisms (for example *Sphingomonas*, *Methylobacterium*, *Pseudomonas*, *Rhodotorula*) at 10³ to 10⁵ CFU/mL, against sterile water, for 6 to 12 months. Include groups with acid suppression or antibiotics (the vulnerable-host conditions). Measure gut microbiome sequencing, inflammatory markers, permeability tests and liver histology.
- **Size:** a typical start is about 10 to 12 animals per group; get a proper power calculation from a statistician.
- **Limits:** mice differ from people (coprophagy, higher stomach pH), as the translation caveats in `verified_evidence.md` say.

### 12. A laboratory regrowth test rig
- **Question:** under realistic use and power-cut conditions, how fast do counts rise in certified filters, by brand?
- **Design:** several certified filters on a bench rig with municipal water, a fixed pattern of draws (for example three a day), long stagnation, and warming episodes, sampled weekly for 6 months for plate counts and total cell counts. Include a control rig with a sanitising feature (for example UV at the outlet).
- **Means:** the kind of data a standards body or regulator would need to consider a regrowth test. This one could be run by a university or a testing lab.

### 13. Do clinicians ask about household water?
- **Question:** is there a "halo" that keeps water off the list?
- **Design:** (a) a randomised vignette survey: doctors read identical case descriptions of unexplained digestive symptoms, with half told the patient uses a fridge dispenser; measure whether water appears in their differential; (b) a chart audit counting how often water source is recorded in gastroenterology work-ups.
- **Size:** about 200 clinicians gives a margin of about ±7 percentage points at 50%. An audit of 500 notes is a reasonable start.
- **Means:** turns "as far as I can tell" in the script into a number.

### 14. Social consequences
- **Question:** how much does perceived bad breath, or being taken for a heavy drinker, affect how people are judged at interview or socially?
- **Design:** an online randomised vignette experiment. Identical candidate descriptions, with one line varied (a neutral note, a note about noticeable breath odour, a note saying the interviewer assumed heavy drinking), and a hiring rating as the outcome.
- **Size:** to detect a standardised difference of 0.3 with 80% power: about **174 per group**.
- **Means:** puts evidence under the "REAL, whatever the cause" tag instead of leaving it to common sense.

### 15. Housing and mould as a confounder
- **Question:** if someone has both a dispenser and a damp home, which one tracks their symptoms?
- **Design:** in the survey and case-control studies, measure home dampness and mould (visual survey, humidity, spore or settle-plate sampling) and include it in the analysis. Where possible compare homes with and without dampness among dispenser users.

## Ageing-related outcomes worth adding to the group studies

The 2023 "Hallmarks of aging" paper lists chronic inflammation and dysbiosis among twelve hallmarks of ageing, and they are the two the hypothesis could touch. To test the "extra load" idea in the sham-controlled trial, the survey and the case-control study, add measures that can be taken in groups:

- **Inflammation:** blood CRP (high-sensitivity) and IL-6; stool calprotectin for gut inflammation.
- **Gut microbiome:** stool sequencing for diversity and composition, at baseline and after each period.
- **Gut barrier:** a validated permeability test, if the ethics body approves it.
- **Biological age (optional, costly):** an epigenetic clock from a blood sample. These measures are noisy for one person, so use them only for group averages, never for N-of-1 trials.
- **Everyday signs:** validated skin and sleep scales, so "looks tired" has a measurable counterpart.

All of these need adjusting for age, sex, smoking, sun, sleep, diet, medicines and housing dampness. The comparison that counts is real service against sham service in the same households.

## A staged plan and what would make us stop

| Stage | Cost scale | Output | Stop or change if… |
|---|---|---|---|
| 0: your fridge and household | low | First measured counts; a blinded swap | The fridge is clean and nothing follows the water: the fridge isn't the explanation here |
| 1: taste test, practitioner interviews, pilot of 15–30 fridges | low | Whether anyone can tell; the spread of counts | Nobody can tell, and counts look like the tap |
| 2: ~100-fridge survey, loggers, before/after | moderate | How common and how bad; what predicts it | Counts are low in almost all fridges |
| 3: sham-controlled trial, case-control, breath study | high; needs partners | Whether cleaning helps; whether there's an association | No symptom difference between real and sham service |
| 4: animals, test rig, clinician and social studies | high; needs institutions | Mechanism; regulatory data; the blind-spot and stigma numbers | Earlier stages already say no |

## What I'd do first

1. Finish Stage 0: the plates, then the lab, and the logger.
2. Run the blind taste test with whoever is willing. It is cheap and fast and answers a simple question.
3. If something shows up, approach a university group with the pre-registered protocol and your raw data.
4. Put the plan itself in the video, as the way out of the dark corner. It makes the case for funding the studies that haven't been done.

## Sources behind the designs

- Home-filter trial designs: Colford et al. 2005 and 2009 (`verified_evidence.md`, entries 4 and 5).
- Household counts and symptoms: Payment 1989, 1991 and 1993 (entries 1, 2 and 3b).
- Communities on non-compliant water: Zmirou et al. 1987 and Ferley et al. 1986 (entries 22 and 23).
- Animal drinking-water models: Koh et al. 2005 and Ekenna & Sherertz 1987 (entries 10 and 11).
- Open hardware for imaging and logging: see the earlier list (OpenFlexure, plate-imaging boxes, OpenCFU).
- Sample-size formulas are standard textbook ones; the assumptions are marked in each section.
