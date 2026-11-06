# print/

Sample printouts made by the **Print** button, so you can judge the layout without clicking through the site. Each was made by building the print page for one section and printing it to PDF with Chromium. A browser's own Print dialog gives the same page.

| File | Section | Frames |
|---|---|---|
| `example-scene-01-the-pour.pdf` | Scene 1 | The kitchen, plus a print-only card: the claim and what each label means |
| `example-scene-03-the-last-mile.pdf` | Scene 3 | The last mile, the study's method in three steps, its result plus a print-only table, and the three numbers pictures |
| `example-scene-08-bad-breath-colour.pdf` | Scene 8 | The routes picture, and the four steps of "how it could happen", in colour |
| `example-scene-17-the-shrug.pdf` | Scene 17 | The three common reactions, one frame each |
| `example-scene-22-the-test.pdf` | Scene 22 | The paired samples, a print-only sampling-day checklist, and the ATP pictures |
| `example-scene-25-what-you-can-do.pdf` | Scene 25 | The list of precautions, and the closing picture |

## Handouts (whole-page prints)

Four stand-alone pages, from the **Print pages** row on the site (`fridge-water#handouts`) and the landing page. They are built by `HANDOUTS` in `fridge-water.html`.

| File | Pages | What it is |
|---|---|---|
| `handout-1-the-argument-on-one-page.pdf` | 2 | The claim, the evidence table with its labels (including the findings that cut the other way), what to do, how we will find out, references |
| `handout-2-sampling-day-sheet.pdf` | 2 | A tick-off sheet and readings table for the paired first-draw samples |
| `handout-3-water-swap-protocol-and-diary.pdf` | 3 | The blinded water swap: protocol, a helper's key, and a weekly diary. Unvalidated; see a dentist first |
| `handout-4-questions-for-a-technician.pdf` | 2 | Eight polite questions with answer boxes. Leave out names of people and companies |

## How it works on the site

Click **Print** at the top right of any section. There is no chooser: the page is built straight away and the browser's print dialog opens. The frames are chosen by reasoning about each picture:

- **One frame** where the last frame holds the whole story (most pictures).
- **Several frames** where a picture builds in steps: the study's method, the three steps of the breath hypothesis, the spout before and after the UV light, the three reactions in "the shrug".
- **Print-only frames** where a purpose-made page says more than a snapshot: a card with the project's claim and the five labels (scene 1), a table of the 2024 study's averages (scene 3), and a tick-off sampling-day checklist (scene 22).

The page also has the numbered dialogue, the references and notes, and a footer with the address of the section, the print date and the licence. Colour follows the Colour switch, and the printed page is always black on white otherwise.

The plan for every picture is the `PRINT_PLAN` table in `fridge-water.html`, with the print-only frames in `PRINT_ONLY`. To change what a section prints, edit those two.

## Ideas for testing

- Print one section with Colour off and again with it on, and compare the ink.
- Check that each frame's caption matches the dialogue line beside it.
- Open the page in dark mode and print: the printed page should still be black on white.
- Try "Save as PDF" in your browser's print dialog.

This is a desktop page. The site isn't designed for phones.
