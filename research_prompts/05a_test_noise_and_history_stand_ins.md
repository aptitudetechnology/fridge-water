# Prompt 5a: How noisy are the tests, and what can stand in for a missing history?

Paste everything below the line into a deep-research tool. Use the strongest model you have. (Run first of three follow-ups.)

---

## Role

You are a careful analyst in clinical biochemistry and laboratory medicine. The goal is to find out which tests are reliable enough for one person to repeat over time and which objective tests can stand in for a missing history, not to promote any test. Report evidence against as readily as evidence for.

## Context

An adult attends a clinic, the clinician suspects dysbiosis, and the patient can give **no history** (diet, medicines, lifestyle, environment, symptoms). A previous review found no validated dysbiosis biomarker. It established only faecal calprotectin (gut inflammation) and blood phosphatidylethanol (alcohol exposure) for adjacent questions. **It could not find the topics below. Do not repeat its findings; fill these gaps.** "Not found in these searches" means a gap in the search, not evidence that a test is useless, so never turn it into a recommendation against a test.

## Find

1. **Noise in one person.** For faecal calprotectin, high-sensitivity CRP, ferritin, GGT, ALT, mean cell volume and breath hydrogen and methane: within-person biological variation, analytical variation, **reference change value or minimal detectable change**, and how many repeats are needed to detect a real change.
2. **Objective stand-ins for missing history.** For tobacco and nicotine (cotinine), alcohol (phosphatidylethanol, carbohydrate-deficient transferrin), recent antibiotic use, acid-suppressing medicines (for example serum gastrin or chromogranin A), and dietary intake (for example carotenoids, omega-3 index, urinary markers): is there a validated objective test, its look-back window, sensitivity and specificity, and false positives.
3. **Distortion by what can't be asked.** Effects of antibiotics, proton pump inhibitors, NSAIDs, laxatives and recent illness on faecal calprotectin, breath tests and routine blood markers.
4. **First-line blood tests to exclude common mimics** of tiredness, bloating, flushing and puffiness when no history is available (for example full blood count, ferritin, B12, coeliac serology, thyroid, liver function, glucose or HbA1c, CRP): what guidelines recommend, and what each can miss.

## Rules

1. Rank sources by strength of evidence: systematic reviews, guidelines and consensus statements first, then diagnostic-accuracy and reliability studies, then cohorts, then everything else. **Anything that carries a conclusion needs a PMID, a DOI or, for guidelines and regulator documents, a stable URL, and you must have opened it.** Say whether you read the full text or only the abstract. Lower-ranked sources are leads only.
2. Copy titles, authors, year and journal from the record, never from memory. Quote the sentence for each key number. If you can't, mark it UNVERIFIED and leave it out of your conclusions.
3. State the study type and population. Vendor pages, laboratory marketing, blogs and AI summaries are leads, never evidence.
4. **Do not stretch.** A marker validated for one purpose is not validated for another. If you found nothing, write "not found in these searches".

## Output

1. **Direct answer** (150 words): what is **established**, **plausible** and **untested**.
2. **Noise table:** test | within-person variation | reference change value or minimal detectable change | repeats needed | source (identifier; full text or abstract).
3. **Stand-in table:** exposure | test | look-back window | sensitivity and specificity | false positives | source.
4. **Distortion table:** test | what distorts it | direction and size | source.
5. **First-line exclusion bloods:** what guidelines recommend and the limits of each.
6. **Verification table:** identifier | title | first author | year | full text or abstract.

Describe test performance and what guidelines say. Do not suggest diagnoses or treatments for any individual.
