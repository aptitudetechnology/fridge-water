# Verified evidence: oral exposure to bacteria and fungi in drinking water

Checked 3 Nov 2026 (updated later the same day with a second round of lookups). This replaces the study tables in `quick-resp-research_prompt_2.md` and `Dispenser-Water-Safety-Analysis.md`, which should not be cited (see the notice at the top of each).

## How this was built, and its limits

- Every entry below was found by searching PubMed and reading the **abstract** (PubMed record) of a real paper. I did not read any full texts.
- I report only what the abstract states. Where an abstract gives no number (for example an effect size), I say so.
- "Relevance" is my own judgement of how closely the exposure resembles a contaminated home point-of-use device (stagnant water in a household filter or tank, bacterial counts of roughly 10³ to 10⁵ CFU/mL, drunk daily for months). It is not a score from the source.
- A paper missing from PubMed does not prove it doesn't exist. But six studies named in both AI reports could not be found at all, and several others were found with a different title or content.

## The main finding

The closest real study to our question is a pair of papers by Pierre Payment's group in Quebec, and **it does not say what both AI reports said it did.** Both reports described a long-term trial in which people drinking water from carbon filters with high bacterial counts had no extra illness. The real papers are about reverse-osmosis units in households, and one of them found that **higher bacterial counts in the unit's water went with more reported stomach symptoms.**

That makes the honest picture less tidy than "nothing shows harm":

- **Two** papers from the same Quebec study report that, among families using the reverse-osmosis units, illness was significantly associated with bacterial counts at 35 °C on R2A agar (the 1991 AEM paper and the 1993 Water Science and Technology paper). The study followed about 300 RO households for 15 to 18 months (the sources give both figures). It is observational, from the early 1990s, and I haven't found a replication.
- Two large blinded trials of removing microbes from tap water gave mixed results (no effect in Iowa, a modest benefit in older adults in Sonoma).
- There is no trial of a fridge dispenser itself.

## Verified studies

### A. Humans: household point-of-use water

| # | Study | Design and exposure | What the abstract reports | Relevance to a home dispenser | Main limits |
|---|---|---|---|---|---|
| 1 | **Payment P (1989).** *Bacterial colonization of domestic reverse-osmosis water filtration units.* Can J Microbiol 35:1065–7. PMID 2611732. DOI 10.1139/m89-178 | Water from the storage reservoirs of **300** household RO units | Heterotrophic plate counts (R2A agar, 20 and 35 °C) ranged from **0 to 10⁷ CFU/mL**. Most reservoirs held **10⁴ to 10⁵ CFU/mL**. Genera: *Pseudomonas* (not *aeruginosa*), *Alcaligenes* or *Moraxella*, *Acinetobacter*, *Flavobacterium*, *Chromobacterium* | **High for dose.** Stagnant household point-of-use water at the counts we assumed. Not a fridge, and an RO tank is not a carbon filter | Counts only. No health outcome in this paper |
| 2 | **Payment P, Franco E, Richardson L, Siemiatycki J (1991).** *Gastrointestinal health effects associated with the consumption of drinking water produced by point-of-use domestic reverse-osmosis filtration units.* Appl Environ Microbiol 57:945–8. PMID 2059052. DOI 10.1128/aem.57.4.945-948.1991 | Part of the prospective study of families using RO units (the AJPH paper below gives 15 months) | "A correlation was demonstrated between the bacterial counts on R2A medium incubated at 35 °C and the reported gastrointestinal symptoms in families who used these units." The 20 °C correlation was confounded by the 35 °C counts. Family size and amount of water drunk were not independently explanatory. Authors: the results "raise concerns for the possibility of increased disease associated with certain point-of-use treatment devices... when high levels of bacterial growth occur." | **High for dose and duration.** The closest human evidence I found | **Full text now read (sources/aem00057-0063.pdf); see the section "Payment 1991 (AEM): what the full text says" below.** Observational correlation in 115 families, with the authors' own doubts |
| 3 | **Payment P et al. (1991).** *A randomized trial to evaluate the risk of gastrointestinal disease due to consumption of drinking water meeting current microbiological standards.* Am J Public Health 81:703–8. PMID 2029037. DOI 10.2105/ajph.81.6.703 | **299** households given RO filters vs **307** left on ordinary tap water; 15 months; tap water from sewage-impacted surface water meeting standards | Annual GI illness incidence **0.76 (tap) vs 0.50 (filtered)**, p < 0.01. Authors estimate 35% of illness in tap-water drinkers was water-related | **Low for our question.** It shows removing microbes helped, and says nothing about regrowth. The filters were RO and the tap water was from a polluted source | Not about biofilm or dispensers. This is the paper both AI reports described wrongly. **Read in full (sources/amjph00206-0033.pdf).** Unblinded, with no sham filter (the authors say a sham was not feasible). The "dose-response" in this paper is the **amount of tap water drunk at home** (more glasses a week, more illness), not bacterial counts. Treated water leaving the plant had no detectable indicator bacteria or enteric viruses and met regulations; raw river water was heavily contaminated with sewage. The authors say "bacterial growth was observed in the water filtration units as previously reported" and that their results raise questions about the quality of water "in the distribution system as well as in-house plumbing." They sampled heterotrophic plate counts weekly at 20 and 35 °C, but this paper does not report the counts or link them to illness |
| 4 | **Colford JM Jr et al. (2005).** Am J Epidemiol 161:472–82. PMID 15718483. DOI 10.1093/aje/kwi067 | Iowa; randomised, blinded crossover. Active device (1-µm ceramic filter plus UV) vs identical sham; **227 + 229 households** (646 + 650 people); 6 months per arm | Relative rate of highly credible GI illness (sham vs active) **0.98 (95% CI 0.86–1.10)**. "No reduction in gastrointestinal illness was detected" | Low. Tests removing microbes from tap water, not regrowth in a device | Healthy community; one site |
| 5 | **Colford JM Jr et al. (2009).** *The Sonoma water evaluation trial.* Am J Public Health 99:1988–95. PMID 19762663. DOI 10.2105/AJPH.2008.153619 | California; triple-blind crossover in **714 households (988 people)**, older adults, 6 months per arm | Incidence rate ratios (active vs sham) **0.88 (0.77–1.00)** and **0.85 (0.76–0.94)**. Authors: "reductions in population- and individual-level measures" with active filtration | Low. Same design as above | **Both AI reports said Sonoma found no effect (RR 1.05). The abstract says the opposite.** Result is borderline in one model |

| 3b | **Payment P, Franco E, Siemiatycki J (1993).** *Absence of relationship between health effects due to tap water consumption and drinking water quality parameters.* Water Sci Technol 27(3-4)? (Crossref confirms title, year 1993, first author Payment). DOI 10.2166/wst.1993.0336 | 18-month prospective study of **300 families on conventionally treated tap water and 300 on the same water after reverse osmosis** | RO group had about **30% fewer** GI illnesses. Coliform presence did not predict illness. In the tap-water analysis, HPC at 20 °C in the distribution system was weakly associated with symptom duration. **Among RO consumers, illness was significantly associated with the number of bacteria growing at 35 °C on R2A.** The authors argue that standard sampling, which flushes the tap, doesn't reflect the water people actually drink, and that regrowth in stagnant household water may contribute | **High for dose and duration.** Independent confirmation, from the same group's data, of the association in entry 2 | I read this abstract as reproduced on an aggregator page (oa.mg), through a summary, not on the journal site. The journal page is closed access, so I haven't seen the numbers behind "significantly associated". Same study population as entries 2 and 3 |

### B. Humans: reviews and risk assessments (no new measurements)

| # | Study | What the abstract says | Notes |
|---|---|---|---|
| 6 | **Allen MJ, Edberg SC, Reasoner DJ (2004).** *Heterotrophic plate count bacteria: what is their significance in drinking water?* Int J Food Microbiol 92:265–74. PMID 15145585 | Reviews "the lack of clinical evidence that elevated populations or specific genera within the HPC flora pose an increased health risk to any segment of the population." "Finds no evidence to support health-based regulations of HPC concentrations." | This is the source behind the "HPC isn't a health indicator" consensus. It argues from absence of clinical evidence, and the first author's affiliation is the Awwa Research Foundation, a water-industry body. It predates much of the sequencing work |
| 7 | **Rusin PA, Rose JB, Haas CN, Gerba CP (1997).** *Risk assessment of opportunistic bacterial pathogens in drinking water.* Rev Environ Contam Toxicol 152:57–83. PMID 9297985 | "There is no clear-cut evidence that the HPC bacteria as a whole pose a public health risk. Only certain members are opportunistic pathogens." Does dose-response modelling for specific genera | I only read the first part of the abstract. The numeric dose-response results need the full paper |
| 8 | **Mena KD, Gerba CP (2009).** *Risk assessment of Pseudomonas aeruginosa in water.* Rev Environ Contam Toxicol 201:71–115. PMID 19484589 | In drinking water *P. aeruginosa* is usually found in 2% of samples or fewer, "at concentrations up to 2,300 mL⁻¹... or more often at 3-4 CFU/mL," and its occurrence "is probably related more to its ability to colonize biofilms in plumbing fixtures" | Useful context: *P. aeruginosa* specifically is usually at low counts even when total HPC is high |
| 9 | **Hafiz RA et al. (2018).** *The risk of community-acquired enteric infection in proton pump inhibitor therapy.* Ann Pharmacother 52:613–22. PMID 29457492 | 9 observational studies: PPI users had a pooled odds ratio of **4.28 (95% CI 3.01–6.08)** for community-acquired enteric infection. Salmonella OR 4.84 (2.75–8.54). Heterogeneity was high (I² = 85%) | Supports "acid suppression raises infection risk" for ordinary enteric pathogens. It does not give kill rates at different stomach pH, and it isn't about environmental water bacteria |

### C. Animals

| # | Study | Design and exposure | What the abstract reports | Relevance | Main limits |
|---|---|---|---|---|---|
| 10 | **Koh AY, Priebe GP, Pier GB (2005).** Infect Immun 73:2262–72. PMID 15784570. DOI 10.1128/IAI.73.4.2262-2272.2005 | Mice given streptomycin (2 mg/mL) and penicillin G (1,500 U/mL) in drinking water for 4 days, then **10⁷ CFU/mL *P. aeruginosa* in drinking water for 5 days**, then neutropenia induced | The bacteria colonised the gut, then spread to the spleen after cyclophosphamide or anti-neutrophil antibody | **Low to medium.** Shows drinking water alone can deliver *P. aeruginosa* to the gut, but at 100 to 10,000 times the assumed dispenser range and after antibiotics | Short (about 9 days). Antibiotic-primed and neutropenic. The abstract doesn't say whether unprimed mice colonised |
| 11 | **Ekenna O, Sherertz RJ (1987).** Infect Immun 55:1558–63. PMID 3596800 | Mice fed *Candida albicans* in drinking water for 3 days, then 3 to 4 weeks of no treatment, antibiotics, or immunosuppressants | Untreated mice averaged **10²·³ CFU/g of cecum** over the month. Antibiotic groups were higher, up to 10⁴·⁷ (clindamycin-gentamicin). Cyclophosphamide gave 10⁴·³. Cyclophosphamide plus antibiotics reached 10⁶·⁵ and spread more. "Colonization of the guts of mice by *C. albicans* can be facilitated by manipulating the aerobic, anaerobic, or both types of gut flora" | Medium. Shows the yeast can persist at a low level after 3 days in drinking water and grows when flora are disrupted | The abstract gives no water concentration. Short exposure. One strain |
| 12 | **Wu L et al. (2006).** *Chronic acid water feeding protects mice against lethal gut-derived sepsis due to Pseudomonas aeruginosa.* Curr Issues Intest Microbiol 7:19–28. PMID 16570696 | Mice on acidified water for 8 weeks vs tap water | Acid water protected against lethal gut-derived *P. aeruginosa* sepsis | Low. Not a dose study. Supports the idea that gut-side conditions change outcomes | Mechanism study |
| 13 | **Hermann LM, White WJ, Lang CM (1982).** Lab Anim Sci 32:603–8. PMID 7162128 | Outbred mice for **120 days** on water with hydrochloric acid, sodium hypochlorite or tetracycline | Tetracycline groups varied; the pH 2 acid group had reduced uncorrected clearance rates; "responses in other treatment groups were not significantly affected" | Low. Shows long-term water-treatment studies exist. It is about additives, not bacteria, and suggests chlorine in the water changed little | Immune readouts only |

### D0. Opportunistic pathogens, outbreaks and dispensers (added after reading around your question)

| # | Study | What the abstract says | Relevance and limits |
|---|---|---|---|
| 17 | **Tischner Z et al. (2021).** *Mycological investigation of bottled water dispensers in healthcare facilities.* Pathogens 10:871. PMID 34358021. DOI 10.3390/pathogens10070871 | 36 bottled-water dispensers in Budapest. **Moulds and yeasts in 86.8% of samples; 56.76% highly contaminated.** Heterotrophic plate counts elevated in all samples compared with Hungarian drinking water, although all physical and chemical parameters met standards. Fungal concentrations rose with time since disinfection and other usage factors. Species included *Sarocladium kiliense* and *Acremonium* species (the abstract was cut off after that) | **The nearest verified study of fungi in a point-of-use dispenser.** Bottled-water dispensers, not fridge dispensers. The abstract gives no counts per mL and no health outcome |
| 18 | **Costa D et al. (2015).** *Nosocomial outbreak of Pseudomonas aeruginosa associated with a drinking water fountain.* J Hosp Infect 91:271-4. PMID 26341271. DOI 10.1016/j.jhin.2015.07.010 | Ten patients with suspected infection over four months. Only water from a drinking-water fountain carried *P. aeruginosa*, and the isolate matched three patients (seriously ill oncology patients fed through a gastrostomy tube). No new infections after a UV-treated fountain was installed | Documents the vulnerable-host pathway. A fountain in a hospital, not a home. Small outbreak |
| 19 | **LeChevallier MW, Prosser T, Stevens M (2024).** *Opportunistic pathogens in drinking water distribution systems: a review.* Microorganisms 12:916. PMID 38792751. DOI 10.3390/microorganisms12050916 | Opportunistic pathogens cause disease "in a host with a weakened immune system and rarely in a healthy host." They grow in biofilms, and "under appropriate conditions (e.g., warm water, stagnation, low disinfectant levels, etc.), these bacteria can amplify to levels that can pose a public health risk." The three main ones are *Legionella pneumophila*, *Mycobacterium avium* and *P. aeruginosa* | The best single support for the hypothesis's mechanism (warmth, stagnation, low disinfectant). Also states the limit: healthy hosts rarely get disease. A review, not new data |
| 20 | **Pavlov D et al. (2004).** Potentially pathogenic features of heterotrophic plate count bacteria isolated from treated and untreated drinking water. Int J Food Microbiol 92:275-87. PMID 15145586 | 339 colonies from South African water: **55.5% were haemolytic**, with many carrying enzymes linked to virulence (gelatinase in 62.2%, DNase in 60.6%, elastase in 33%) and high antibiotic resistance among the haemolytic isolates | Shows HPC isolates can carry virulence traits. A laboratory screen, not illness, and not fridge water |
| 21 | **Naumova EN et al. (2016).** Hospitalizations due to selected infections caused by opportunistic premise plumbing pathogens in the United States older adult population, 1991-2006. J Public Health Policy 37:500-13. PMID 28202928 | 617,291 cases of three selected infections in older adults over the study period, costing about $0.6 billion a year, probably underreported | Shows a large burden in older people. It doesn't establish what share came from drinking water or from any appliance |

### D1. Humans: communities drinking water that failed bacteriological standards

This is the kind of study you asked for. It is observational, since nobody can ethically randomise people to contaminated water, but it is prospective and uses real non-compliant water.

| # | Study | Design and exposure | What the abstract reports | Relevance and limits |
|---|---|---|---|---|
| 22 | **Zmirou D, Ferley JP, Collin JF, Charrel M, Berlin J (1987).** *A follow-up study of gastro-intestinal diseases related to bacteriologically substandard drinking water.* Am J Public Health 77:582-4. PMID 3565651. DOI 10.2105/ajph.77.5.582 | **52 French alpine villages** supplied with **untreated groundwater**; **29,272 inhabitants**; one weekly water sample per village analysed for total plate count, total coliforms, thermotolerant (fecal) coliforms and fecal streptococci; cases of acute gastrointestinal disease reported by physicians, pharmacists and primary-school teachers | **Fecal streptococci were the best predictor** of illness, and fecal coliforms enhanced the effect. "**The total bacteria count and the total coliforms had no independent contributions.**" A threshold analysis "suggested that any level of indicator bacteria above zero was associated with an excess of AGID" | **Directly about water that doesn't meet standards.** Key limits: the contamination is *fecal*, not the environmental bacteria in a dispenser, and the plate count (the closest thing to environmental heterotrophs) did **not** predict illness independently. Cases came from reports to physicians, pharmacists and teachers, so they probably undercount mild illness. Observational. **Full text now read (sources/amjph00256-0048.pdf); see the section below** |
| 23 | **Ferley JP, Zmirou D, Collin JF, Charrel M (1986).** *Longitudinal study of the risks related to the consumption of water not conforming to bacteriological norms* (in French). Rev Epidemiol Sante Publique 34:89-99. PMID 3738071 | The same study, reported in full: 18 months in 1983 to 1984; 50 villages; 119 physicians, 52 pharmacists and 118 teachers | 1,950 cases among physicians' and pharmacists' reports over 1,873,303 person-weeks (about 1.06 per 1,000 person-weeks). Villages sorted into "good", "intermediate" and "bad" by share of substandard samples. **Relative risk "bad" vs "good": 3.5 (95% CI 2.5 to 4.8)** for the general population and **1.7 (1.5 to 1.9)** for schoolchildren as reported by teachers. The difference was "not constant across the 18 months." The authors conclude bacteriology standards are "a relevant indicator of a health hazard" | The same study as entry 22, so it is one study, not two. It supports the idea that failing standards matters, again for fecal indicators |

### D. Humans: ingestion challenge

| # | Study | Status |
|---|---|---|
| 14 | **Buck AC, Cooke EM (1969).** *The fate of ingested Pseudomonas aeruginosa in normal persons.* J Med Microbiol 2:521–5. PMID 4995575. DOI 10.1099/00222615-2-4-521 | **Real. PubMed and Europe PMC have no abstract, and the publisher page blocked me.** A web-search summary of the publisher's abstract says: three healthy adults swallowed *P. aeruginosa* grown in milk; organisms appeared in stool when roughly a million or more were ingested; shedding was lower than the amount swallowed and lasted no more than 6 days; colonisation took hold once, when ampicillin was also given. **I could not verify this independently, and three volunteers is a tiny study.** It is the likely origin of the AI reports' "Buck 1977" and "Picard 1984" entries |

### E. Other

| # | Study | What it says | Notes |
|---|---|---|---|
| 15 | **Swanson C (2022).** *Drinking Water Microbiome Dynamics within Premise Plumbing and Point-of-Use Filtration Systems.* PhD dissertation, University of Tennessee, Knoxville | The carbon filter was "the dominant source for the filtered water microbiome", with "significant bacterial growth" within the filter. The filtered water was more stable than tap water and was not affected by stagnation | A dissertation, not peer reviewed. The abstract has no cell counts, filter ages or health conclusions. The full text is embargoed until 2028 |
| 16 | **Bartram J et al., eds. (2003).** *Heterotrophic Plate Counts and Drinking-water Safety.* WHO/IWA. WHO page: who.int/publications/i/item/9241562269 | A chapter by P.R. Hunter covers "Epidemiological and risk assessment evidence of disease linked to HPC bacteria". The Australian Drinking Water Guidelines, citing the book, say there is no evidence that HPC alone indexes pathogens or directly relates to health risk through normal use by the general population | **I could not open the book (the host blocked me), so I have not read the chapter.** The Australian guideline is a secondary summary |

## Added 4 Nov 2026: gut microbiome and drinking water

A baseline PubMed search found more than I had expected, including a 2024 peer-reviewed report on in-refrigerator dispensers (Swanson & He), a 2022 case of tap-water bacteria colonising a person's gut (Lugli et al.), observational and trial studies of water source and chlorination against the gut microbiome, and none on inflammation or ageing markers. See `microbiome_evidence.md` for the entries, their limits, and what they change. This supersedes any statement elsewhere that "nobody has measured" these links; the supportable statement is that no study found has measured the whole chain.

## What did not check out

Named in `quick-resp-research_prompt_2.md` and `Dispenser-Water-Safety-Analysis.md` but not found in PubMed searches or via the DOIs given:

- Rule et al. (1985), mouse *P. aeruginosa* drinking-water study
- Kohn et al. (1993), lifespan *P. aeruginosa* water study
- Barbeau et al. (1998), mice and dental-unit biofilm
- Buck et al. (1977), *Candida* volunteer study
- Picard et al. (1984), *Pseudomonas* volunteer study
- Borella et al. (2005), hospital *Pseudomonas* and *Legionella* water study
- Tancrede & Andremont (1985): a real paper, but about bacterial translocation in leukaemia patients, not mouse colonisation thresholds

Claims about the real studies that were wrong:

- Payment 1991: both reports said a carbon-filter arm showed no extra illness. There was no carbon-filter arm, and the abstract of the companion paper reports a correlation of bacterial counts with symptoms.
- Sonoma 2009: said to show no effect (rate ratio 1.05). It reports 0.85 to 0.88.
- Numbers such as "10⁶ CFU/mL continuous with no effect", "100× to 10,000× lower dose with acid suppression" and specific log-kill figures have no source I could find.

## Zmirou 1987 (AJPH): what the full text says

Read in full from `sources/amjph00256-0048.pdf` (3 pages). Quoted values are from the paper's prose; the relative-risk tables came out slightly garbled in extraction, so I report only what is clear.

**Design**
- 48 villages analysed (52 were available; 2 dropped for missing data and 2 because their groundwater began to be treated mid-study). Villages had 100 to 3,500 inhabitants, public systems on **untreated groundwater**, and were not tourist areas.
- Followed for 64 weeks (3,072 village-weeks) with one weekly water sample per village. **1,807 cases** of acute gastrointestinal disease were reported through 119 physicians, 52 pharmacists and 118 primary-school teachers, none of whom knew the water results.
- Bacteria measured: "standard plate count" (1 mL on standard agar, 24 hours at 37 °C), total coliforms, thermotolerant (fecal) coliforms and fecal streptococci (100 mL each).

**What it found**
- **The plate count did not predict illness.** When the water met the fecal standards (no fecal coliforms or streptococci), the illness rate was **3.44 per 10,000 person-weeks with at least one colony on the plate count and 3.43 with none.** Total coliforms: 3.74 vs 3.32.
- **Fecal streptococci predicted illness best,** and fecal coliforms made the effect larger. Risk rose with concentration. In small villages with fecal coliforms present the relative risks were about 4.3 to 5.1 (for example 5.05, 95% CI 2.8 to 9.0 at 11 or more streptococci per 100 mL). In larger villages, streptococci alone showed no clear risk.
- **No threshold other than zero could be identified** for fecal streptococci. The authors say the standard threshold of zero per 100 mL "cannot be disputed with these data."
- **Half of all cases happened when the water met the standards** (354 of 698 cases in the analysed window, 51%). The authors say background risk with all indicators absent was about a quarter of total cases.
- 42% of water samples failed the standards, yet there was only one recognised outbreak in the whole survey (about 50 cases). Most illness was sporadic. The authors describe the risk as "modest" but persistent.

**Limits the authors state, and others I see**
- Results "depend upon the ecological context and may not hold, for instance, in warm waters or treated waters."
- Each village-week was treated as independent, and the confidence intervals were approximated from crude tables because their software couldn't produce covariances.
- Only cases within a 3-day window around each sample were analysed, which removed 60% of the cases.
- **For our question the key limit is that the "total plate count" was only a yes-or-no variable (any colony in 1 mL, or none).** It doesn't test whether high counts of environmental bacteria (10³ to 10⁵ CFU/mL) matter, and the villages were mostly low-count groundwater. So "plate count had no predictive value" must **not** be read as "high bacterial counts are safe."

**My reading:** this supports the idea that **fecal** contamination, not harmless-looking environmental bacteria, drives illness in healthy communities drinking untreated water. It tells us nothing about the 10³ to 10⁵ range in a stagnant device. That range is where Payment's RO-unit study sits, and the two studies don't contradict each other.

## Payment 1991 (AEM): what the full text says

Read in full from `sources/aem00057-0063.pdf` (4 pages). Numbers below are from the paper's text and tables. Table layouts came out garbled in text extraction, so I only quote values the prose or the table rows state unambiguously; anything I calculated is marked as mine.

**Design**
- 115 families with complete health and water data, all using under-sink reverse-osmosis units installed in January and February 1988. The units had a sediment prefilter, an **activated charcoal filter**, an RO membrane and a **15-litre pressurised reservoir** under the sink.
- Health data from September 1988 to June 1989 (the paper says 10 months of surveillance), by a diary completed in two-week blocks with a nurse phoning every two weeks. The units had by then been in use for over 6 months.
- An episode of "highly credible gastrointestinal illness" (HCGI) meant vomiting or liquid diarrhoea, or nausea or soft diarrhoea with cramps, with at least 6 symptom-free days between episodes.
- One water sample per unit, taken in September 1988 after 7 to 9 months of use, plus 25 units monitored weekly for 18 months. The authors say that "once a device is contaminated, the level of bacterial contamination does not change over time."

**Exposure**
- "The water produced by most units contained **10³ to 10⁵ CFU/mL**." Bacteria were mostly Gram-negative rods or cocci, mainly *Pseudomonas*, *Acinetobacter*, *Flavobacterium*, *Chromobacterium*, *Alcaligenes* and *Moraxella*.
- Families drank on average **5.3 glasses a day, about 750 mL**, of the unmodified filtered water, and under 0.3 glasses of tap water. At 750 mL a day and 10³ to 10⁵ CFU/mL, that is roughly **7.5×10⁵ to 7.5×10⁷ CFU per person per day** (my arithmetic). That overlaps the "typical" and "bad" dose scenarios in the research prompts.
- The authors note the proposed US limit of 500 CFU/mL for finished water. The units' water was far above it.

**Results**
- Mean illness rate **0.48 episodes per person per year** and **0.89 days sick per person per year**.
- Univariate correlations: the illness rate correlated with plate counts at both 20 °C and 35 °C (both significant at the 5% level; the table gives r of about 0.21 and 0.22, P = 0.02 for each). Days sick correlated with the 35 °C count (r = 0.26, P = 0.005) but not the 20 °C count.
- Multiple regression (Table 2): the 20 °C count dropped out as confounded. In the final model the **35 °C count was the only count that explained illness**, with a coefficient of about **3.5×10⁻⁵ episodes per person per year per CFU/mL (P = 0.005)** on an intercept of 0.401. In the full model the P value was 0.056. Days sick (Table 3) showed the same 35 °C pattern (P = 0.004 to 0.008).
- **My calculation:** that slope is about +0.035 episodes per person per year for every additional 1,000 CFU/mL (35 °C), about 9% above the intercept. The mean illness rate and intercept imply a mean 35 °C count of roughly 2,300 CFU/mL (0.48 − 0.401, divided by 3.5×10⁻⁵). This assumes the straight-line fit holds. The paper doesn't give the range of 35 °C counts, so I wouldn't extend it far.
- Family size correlated negatively with the plate counts (r of about −0.17 to −0.20). The authors suggest heavier use dilutes the reservoir.

**The authors' own caveats (important)**
- **No dose-response in water consumed.** There was "no apparent correlation between the HCGI rate and the amount of water consumed, suggesting that the statistical correlation with bacterial density might be spurious." They then offer an alternative: with counts that high, "it was not possible to observe a dose-response relationship, the 100% infective dose already attained." That second explanation is speculation.
- They say the data "suggest that heterotrophic bacteria growing at 35 °C in drinking water are associated with **low numbers** of gastrointestinal illnesses," and that virulence factors are "probably limited to a few" of the species present.
- Their conclusion is hedged: the results "raise concerns about the safety of such point-of-use devices" and show the importance of controlling bacterial growth.

**My reading**
- **What it supports:** in 115 households with stagnant point-of-use water at 10³ to 10⁵ CFU/mL, families with higher 35 °C counts reported somewhat more, and longer, stomach illness. The size is modest, about 0.035 episodes per person per year per 1,000 CFU/mL on a base of about 0.4 to 0.5.
- **What weakens it:** it's observational and from one community, with symptoms self-reported in diaries and only one water sample per unit. The authors themselves flag that the lack of a link to how much water people drank could mean the correlation is spurious. Family size could confound it (more children, more infections, and larger families have lower counts), and only family size and water consumption were adjusted for. No replication that I know of.
- **How it fits our question:** an RO tank is not a fridge filter. But it is stagnant, carbon-filtered, household point-of-use water with the same bacterial genera and about the dose range we assumed. It is the closest human study I've found, and it is weak-to-moderate evidence of a small association, not proof of harm.

## About trials of water that doesn't meet standards

Your instinct is right that Payment's trial is about the wrong kind of water. A trial that gives people water that fails microbiological standards on purpose can't be run: no ethics committee would approve it. The literature has other designs instead:

- **Prospective observational studies of communities on non-compliant water.** The French alpine villages study (entries 22 and 23) is the clearest: relative risk about 3.5 in villages with the worst bacteriology, and fecal indicators, not total plate counts, predicted illness.
- **Natural experiments and outbreaks,** nearly all involving fecal contamination or vulnerable hospital patients (entry 18).
- **Household water-treatment trials in low-income countries,** where the untreated water is contaminated. They measure fecal indicators like *E. coli*, so they say little about harmless-looking environmental bacteria.
- **Animal and volunteer feeding studies** with environmental bacteria (entries 10, 11, 14), mostly at doses well above dispenser levels.
- **Observational studies** that relate counts of environmental bacteria to illness, which is what Payment's RO-unit papers are (entries 2 and 3b).

One distinction matters for the video: water "not meeting standards" usually means sewage-type contamination, a different hazard from slow-growing environmental bacteria and fungi in a dispenser. The question isn't "is dirty water dangerous?" (yes, when it is fecal). It is "does low-grade environmental contamination, drunk daily for years, matter?" and that has not been tested. The one non-compliant-water study I've verified (entries 22 and 23) found that fecal indicators predicted illness and total plate counts did not.

## What can honestly be said

1. Household point-of-use devices can hold water at 10⁴ to 10⁵ CFU/mL (Payment 1989, 300 RO units).
2. In 115 families using such units (Payment 1991 AEM, full text read; 1993 WST abstract), illness was significantly associated with bacterial counts at 35 °C: about +0.035 episodes per person per year per 1,000 CFU/mL (my reading of the regression coefficient). Observational, small, and the authors flag that the association might be spurious because illness didn't track how much water people drank. Same study population as the 1993 paper.
3. Authoritative reviews find no clinical evidence that heterotrophic bacteria as a group harm healthy people. Those reviews are mostly about tap water, not point-of-use devices, and argue from absence of evidence.
4. Removing microbes from tap water didn't reduce illness in Iowa and modestly reduced it in older adults in Sonoma. Neither tested a device that adds bacteria.
5. Drinking-water delivery of *P. aeruginosa* to the mouse gut is documented, but at much higher concentrations and in antibiotic-primed animals.
6. Acid suppression is associated with higher risk of ordinary enteric infections (OR about 4).
7. I found no study of years of low-dose exposure at dispenser-type doses with subclinical endpoints.
8. Moulds and yeasts are common in point-of-use dispensers (86.8% of 36 bottled-water dispensers in one Budapest study), and a hospital outbreak has been traced to a drinking fountain. Both involve settings or hosts unlike a healthy person at home.

## Next reads (not yet done)

1. Payment 1993 WST full text (abstract only so far). The AEM 1991 and AJPH 1991 papers have been read in full (you downloaded them into `sources/`).
2. Buck & Cooke 1969 full text.
3. Rusin 1997 dose-response tables.
4. The WHO book's Hunter chapter (the PDF host blocked me).
5. Koh 2005 and Ekenna 1987 methods, for the water concentrations and whether unprimed mice were colonised.
6. A search for any replication of the Payment association, in other populations or with carbon filters. Two web searches found none, but they weren't exhaustive.
