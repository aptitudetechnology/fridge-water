# Choosing an ATP luminometer for water testing

Written for: you, before you spend any money. Short answer: most handheld "hygiene" meters are built for surfaces, not for low-level water, so check the numbers below first. The sensitivity figures in this file are my own arithmetic from Hammes et al. (2010) and are marked as such.

## What the water needs the device to read

| Intact cells per mL | ATP concentration (my arithmetic, using 1.75 × 10⁻¹⁰ nmol per cell from Hammes et al. 2010) |
|---|---|
| 10³ | about 0.0002 nM |
| 10⁴ | about 0.002 nM |
| 10⁵ | about 0.02 nM |

Plain tap water may sit near the bottom of that range. A device that can't read 0.002 nM or lower can't tell tap from a fridge with moderate contamination.

## Checklist

Ask the supplier for every one of these in writing. If they can't answer, don't buy.

1. **Detection limit for liquid samples**, stated in **nM, pg/mL or fmol per assay**, not just "RLU". Compare with the table. For a sample volume of, say, 100 µL, work out the ATP in the assay (volume × concentration). Reject anything whose limit is above 0.01 nM unless you only want to catch heavy contamination (a 0.01 nM limit corresponds to roughly 60,000 cells/mL by my arithmetic).
2. **Reagent designed for water**, ideally one that separates **microbial (cellular) ATP** from free (extracellular) ATP, which in water can be a large share of the total (Hammes et al. found microbial ATP ranged from 3% to 97% of total).
3. **Filtration or concentration step.** Low-level work usually needs the sample filtered through a 0.22 µm membrane to concentrate or separate the cells. Check whether the kit includes this and whether you'd need extra equipment.
4. **Calibration with an ATP standard** and a published **repeatability** (coefficient of variation) at low concentrations. You need to know how much replicate readings scatter, because your comparison depends on differences of 10 times.
5. **Chlorine handling.** Chlorine in tap water interferes. The kit should say how to neutralise it (for example thiosulfate bottles).
6. **Reagent storage and shelf life.** Many reagents need freezing and degrade after thawing. Check what happens to a kit you use only a few times.
7. **Temperature control.** The enzyme reaction is temperature sensitive, so ask whether readings must be taken at a set temperature.
8. **Method recognition.** There is a standard test method for ATP in water (ASTM D4012). A kit that follows it, or a published validation in drinking water, is better than one with no water data.
9. **Cost per test** and the minimum order, since you'd run only a few dozen samples.

## If you can't find a device that passes

Ask a lab to run ATP or **flow cytometry (total intact cell counts)** on the same samples. Flow cytometry is the research standard for the same question and reads in cells per mL, which compares directly with literature values (for example the Riga distribution-network study, which found 5 × 10³ to 4.7 × 10⁵ intact cells per mL).

## Sources

- Hammes F, Goldschmidt F, Vital M, Wang Y, Egli T (2010). Measurement and interpretation of microbial adenosine tri-phosphate (ATP) in aquatic environments. *Water Research* 44:3915-23. PMID 20605621. (Abstract read.)
- Manitoba Agriculture guide to luminometers (notes that models differ significantly in detection limits and reproducibility): https://manitoba.ca/agriculture/food-safety/education-resources/pubs/luminometers.pdf (found by search; not read in full).
- Reported luminometer limits of detection of about 0.01 nM and 0.03 nM in laboratory studies: https://iris.cnr.it/handle/20.500.14243/589662 (found by search; I read only the search summary).
- ASTM D4012, the standard test method for ATP content of microorganisms in water (named in a 2020 Dalhousie method paper, found by search): https://dalspace.library.dal.ca/handle/10222/80484
