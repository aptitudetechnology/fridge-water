# Replicate Swanson & He (2024) in your own kitchen

Written for: households who want to repeat the one study that has measured fridge-dispenser water, and share what they find. The goal is **ten homes**, the same size as the original, in different places.

This is a test, not a proof. If your fridge doesn't show the pattern, that's a result worth sharing as much as one that does. Safety rules for plating are in [agar_plate_protocol.md](agar_plate_protocol.md) and apply to every tier. Nothing here is medical advice.

## What the original did

| | Swanson & He, 2024 (*Am J Infect Control* 52:857-9) |
|---|---|
| Homes | 10, Knoxville, Tennessee, on public water disinfected with free chlorine |
| Fridges | In-fridge dispenser with a carbon-block filter |
| Samples | One litre from the dispenser and one from the cold tap of the same home, **early in the morning before any water was used** |
| Measured | Free chlorine (DPD method); heterotrophic plate count; 16S rRNA gene sequencing (V4 region) |
| Found | Fridge water averaged about 930 CFU/mL against about 0.2 in the tap, and no detectable chlorine against 0.84 ppm in the tap |
| Not reported | Filter age and brand; flushed samples; any health outcome |

## Three tiers. Do as many as you can.

| Tier | What | Needs |
|---|---|---|
| **1. Home** | Paired first-draw samples, a chlorine test, and a plate count | R2A plates and a chlorine kit (see the agar plate protocol) |
| **1b. ATP (optional)** | A quick reading of living biological material in the same samples, with no growing of anything at home | A **water-grade** ATP kit (see below), or a lab that offers ATP or flow cytometry |
| **2. Accredited lab** | A standard plate count, *Pseudomonas aeruginosa*, and coliform tests on the same pair | A local accredited water-testing lab |
| **3. Sequencing** | 16S rRNA sequencing of the pair, to see which bacteria are there | A university core facility or a commercial microbiome service. We haven't priced this, so ask for a quote |

Tier 3 is the only way to see *which* bacteria are present. Tier 1b is the quickest and needs no incubation, but it is **unvalidated for this use**, which is why the first job is to check it against plates (below). Plates count them but can't name them, and please **don't try to grow or identify mycobacteria at home**.

## Collect the pair (all tiers)

1. **The night before:** don't use the fridge dispenser or the cold kitchen tap overnight. Tell the household. Write down when each was last used. You want **8 or more hours** of non-use.
2. **In the morning, before anyone uses either:** wash your hands and wear gloves. **Do not clean or sanitise the spout first.** You want what a glass would get.
3. **Fridge first draw (F1):** fill a sterile bottle directly from the dispenser, without letting the bottle touch the spout. Tier 1 or 2 needs 250 mL. Tier 3 needs 1 litre, so check with the provider. Cap it.
4. **Tap first draw (T0):** the same, from the cold kitchen tap, **without letting it run first**.
5. **Chlorine test, at once, on both** (within a minute of collection, since chlorine fades). Use a DPD test kit or strips from a pool shop. **Ask your water utility whether it uses chlorine or chloramine.** With chloramine, a *free* chlorine test will read near zero even in the tap, so use the *total* chlorine reading for the comparison. Record which you used.
6. **Optional extras, labelled separately:** a flushed fridge sample (F2, after running 2 litres), a nozzle swab (N), a drip tray swab (D: across the grille and the surface under it, as found), and a blank (B: a sterile bottle opened and closed at the fridge, treated like a sample). The blank shows whether your handling adds bacteria.
7. Record the **fridge make and model, the filter type, the filter age in months (from the change date), and the household's last-use times.** The original didn't report filter age, and yours would be new information.

## Tier 1: plate it

Follow section 4 of the [agar plate protocol](agar_plate_protocol.md), within **2 hours** of collection, keeping the bottles cold. Notes for this study:

- The original's average was about 930 CFU/mL for the fridge, with a very wide spread, and about 0.2 for the tap. **For F1, plate 0.1 mL undiluted** (about 90 colonies if you match the average), **plus 1 mL undiluted and 0.1 mL of a 1-in-10 dilution**, because homes vary a lot. For the tap, plate **1 mL undiluted in duplicate**. A tap plate with no colonies is a result: record it as "below 1 CFU/mL", not as zero.
- Incubate **sealed, at room temperature only, and never open the plates.** Photograph them on days 3, 5 and 7.
- You can count them with the plate counter in `build/` (a browser page that works offline).

## Tier 1b: ATP (optional, and the aim is to validate it)

ATP bioluminescence reads in minutes and doesn't involve growing anything, which makes it the easiest test to ask people to do. It is only worth doing with the right kit, and its first job in this project is to be **checked against the plate counts**.

**The sensitivity problem.** From Hammes et al. (2010), a bacterial cell holds about 1.75 × 10⁻¹⁰ nmol of ATP, so 10⁴ cells/mL is about 0.002 nM and 10⁵ cells/mL is about 0.02 nM (our arithmetic; see [test_plan.md](test_plan.md) and [atp_luminometer_checklist.md](atp_luminometer_checklist.md)). One laboratory study put a handheld luminometer's limit near 0.01 nM. **Read directly, such a meter can't see tap water.** The fix is to **concentrate the sample**: filter about 100 mL so the cells are caught on a filter, then burst them into about 0.1 mL of reagent. By our arithmetic that packs roughly a thousand times more ATP into the reading (0.002 nM becomes about 2 nM), which lifts even tap water above that floor. Whether a given kit and meter really recover enough, with a low enough background, is **untested, and is exactly what the validation checks.**

**What to use:** a kit **designed for water** that filters or concentrates the sample, separates bacterial ATP from free ATP, and says how to neutralise chlorine (a thiosulfate sample bottle for the tap). Ask the supplier, in writing, for the **detection limit in nM** and the repeatability at low levels, and compare with the table above. Don't buy a surface-hygiene meter for this. Alternatively, ask the lab whether it offers ATP or flow cytometry (total cells per mL) on drinking water.

**How to run it:** on the same first-draw bottles, and the blank, **before** you pour anything for plating. Take at least three readings per sample and record the kit, the reagent lot and the temperature. Record the **raw reading in the units the kit gives** (RLU, or pg/mL, or nM), not a pass or fail.

**How to read it.** Compare the fridge reading with the **blank**, not only with the tap, because the tap may sit at the floor. "The fridge is clearly above the blank and the tap isn't" is a legitimate result. A ratio to the tap is only meaningful if the tap reading is itself above the blank.

**The validation step (the useful part).** In every home that does both Tier 1 and Tier 1b, we'll compare the ATP reading with the plate count on the same samples. If ATP rises and falls with the colony counts across homes, it can become a quick screen with some evidence behind it. If it doesn't, we'll say so. Please record both, even if one reads at the floor.

## Tier 2: send it to a lab

Use the same first-draw pair. Ask for a heterotrophic plate count on R2A, *P. aeruginosa*, total coliforms and *E. coli*. Keep the bottles cold and deliver them the same day. [test_plan.md](test_plan.md) has the details of what to request, how to talk to the lab, and how to read the numbers.

## Tier 3: sequencing

Ask the provider what they need. A common route is filtering the litre of water through a membrane, and the lab extracting the DNA. Request **16S rRNA gene amplicon sequencing of the V4 region** (the same region as the original) on **both samples and a blank**. Please deposit the raw reads in a public archive and share the accession number, so others can re-use them. The original's reads are public (BioProject PRJNA916064), so yours can be compared directly.

## Decide how you'll judge it before you look

These are **our suggestions, not a published standard**. Write down your own before you see the numbers.

- **Matches the original** if the fridge first draw is at least 100 CFU/mL **and** at least 10 times the tap (or the tap is below detection), **and** the fridge's chlorine reading is lower than the tap's.
- **Doesn't match** if the fridge is not clearly above the tap, or both are high, or the fridge still has chlorine.
- **Check your blank.** If it grew, your handling added bacteria, and the result is unreliable. The same goes for an ATP blank that reads high.
- **ATP (Tier 1b)** is judged separately: the fridge first draw should read clearly above the blank, and above the tap if the tap is itself above the blank. We'll report whether it tracks the plate counts before anyone relies on it.
- One home shows only that home. A pattern across homes is what counts.

## Share your results

1. Fill in [replication_results_template.csv](replication_results_template.csv), one row per sample, **good or bad results alike**.
2. On GitHub, open an issue using the **Replication results** form at github.com/aptitudetechnology/fridge-water/issues, and paste the rows or attach the file.
3. **Privacy:** give your region (state or country) only. No address, no names, and no photos showing your home or street. Use an anonymous home code.

## What this can and can't show

- It tests whether the original's main finding (far more bacteria, and no chlorine, in fridge first-draw water) shows up in other kitchens.
- It says nothing about health effects, bad breath, or whether the bacteria are harmful.
- ATP counts living biological material, not colonies, and it can't tell harmless from harmful bacteria. It can't be compared directly with plate counts until the validation is done.
- First-draw water is the worst case, the water that sat overnight. A flushed sample shows what a regular drinker gets after running the dispenser.
- A mix of homes, filters and water supplies is the point, and it also adds noise. We'll report all of it.
