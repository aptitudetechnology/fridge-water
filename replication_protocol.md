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
| **2. Accredited lab** | A standard plate count, *Pseudomonas aeruginosa*, and coliform tests on the same pair | A local accredited water-testing lab |
| **3. Sequencing** | 16S rRNA sequencing of the pair, to see which bacteria are there | A university core facility or a commercial microbiome service. We haven't priced this, so ask for a quote |

Tier 3 is the only way to see *which* bacteria are present. Plates count them but can't name them, and please **don't try to grow or identify mycobacteria at home**.

## Collect the pair (all tiers)

1. **The night before:** don't use the fridge dispenser or the cold kitchen tap overnight. Tell the household. Write down when each was last used. You want **8 or more hours** of non-use.
2. **In the morning, before anyone uses either:** wash your hands and wear gloves. **Do not clean or sanitise the spout first.** You want what a glass would get.
3. **Fridge first draw (F1):** fill a sterile bottle directly from the dispenser, without letting the bottle touch the spout. Tier 1 or 2 needs 250 mL. Tier 3 needs 1 litre, so check with the provider. Cap it.
4. **Tap first draw (T0):** the same, from the cold kitchen tap, **without letting it run first**.
5. **Chlorine test, at once, on both** (within a minute of collection, since chlorine fades). Use a DPD test kit or strips from a pool shop. **Ask your water utility whether it uses chlorine or chloramine.** With chloramine, a *free* chlorine test will read near zero even in the tap, so use the *total* chlorine reading for the comparison. Record which you used.
6. **Optional extras, labelled separately:** a flushed fridge sample (F2, after running 2 litres), a nozzle swab (N), and a blank (B: a sterile bottle opened and closed at the fridge, treated like a sample). The blank shows whether your handling adds bacteria.
7. Record the **fridge make and model, the filter type, the filter age in months (from the change date), and the household's last-use times.** The original didn't report filter age, and yours would be new information.

## Tier 1: plate it

Follow section 4 of the [agar plate protocol](agar_plate_protocol.md), within **2 hours** of collection, keeping the bottles cold. Notes for this study:

- The original's average was about 930 CFU/mL for the fridge, with a very wide spread, and about 0.2 for the tap. **For F1, plate 0.1 mL undiluted** (about 90 colonies if you match the average), **plus 1 mL undiluted and 0.1 mL of a 1-in-10 dilution**, because homes vary a lot. For the tap, plate **1 mL undiluted in duplicate**. A tap plate with no colonies is a result: record it as "below 1 CFU/mL", not as zero.
- Incubate **sealed, at room temperature only, and never open the plates.** Photograph them on days 3, 5 and 7.
- You can count them with the plate counter in `build/` (a browser page that works offline).

## Tier 2: send it to a lab

Use the same first-draw pair. Ask for a heterotrophic plate count on R2A, *P. aeruginosa*, total coliforms and *E. coli*. Keep the bottles cold and deliver them the same day. [test_plan.md](test_plan.md) has the details of what to request, how to talk to the lab, and how to read the numbers.

## Tier 3: sequencing

Ask the provider what they need. A common route is filtering the litre of water through a membrane, and the lab extracting the DNA. Request **16S rRNA gene amplicon sequencing of the V4 region** (the same region as the original) on **both samples and a blank**. Please deposit the raw reads in a public archive and share the accession number, so others can re-use them. The original's reads are public (BioProject PRJNA916064), so yours can be compared directly.

## Decide how you'll judge it before you look

These are **our suggestions, not a published standard**. Write down your own before you see the numbers.

- **Matches the original** if the fridge first draw is at least 100 CFU/mL **and** at least 10 times the tap (or the tap is below detection), **and** the fridge's chlorine reading is lower than the tap's.
- **Doesn't match** if the fridge is not clearly above the tap, or both are high, or the fridge still has chlorine.
- **Check your blank.** If it grew, your handling added bacteria, and the result is unreliable.
- One home shows only that home. A pattern across homes is what counts.

## Share your results

1. Fill in [replication_results_template.csv](replication_results_template.csv), one row per sample, **good or bad results alike**.
2. On GitHub, open an issue using the **Replication results** form at github.com/aptitudetechnology/fridge-water/issues, and paste the rows or attach the file.
3. **Privacy:** give your region (state or country) only. No address, no names, and no photos showing your home or street. Use an anonymous home code.

## What this can and can't show

- It tests whether the original's main finding (far more bacteria, and no chlorine, in fridge first-draw water) shows up in other kitchens.
- It says nothing about health effects, bad breath, or whether the bacteria are harmful.
- First-draw water is the worst case, the water that sat overnight. A flushed sample shows what a regular drinker gets after running the dispenser.
- A mix of homes, filters and water supplies is the point, and it also adds noise. We'll report all of it.
