# Version 2: what changed and why

Version 2 is now the main version at the site root. Version 1 is archived in `sonnet_v1/` (live at `/sonnet_v1/`) so the two can be compared.

- Version 2 (main): `fridge-water.html` and `index.html` at the root
- Version 1 (archive): `sonnet_v1/fridge-water.html` and `sonnet_v1/index.html`

The individual scenes were already strong. The changes are about how the whole story reads.

## What wasn't working in v1

1. **The thesis arrived late.** Scene 1 promised a hypothesis but didn't state it; the concrete claim first appeared in scene 8.
2. **The voice contradicted itself.** Scenes 8 and 8b said "we stand by the hypothesis", while scenes around them said "for a typical drinker, mostly nothing", "this is who the warning is really for", "not shown, oral causes first" and "that's a big if". Labels mixed SUPPORTED, UNMEASURED, NOT SHOWN and UNTESTED.
3. **No through-line.** Nothing on screen showed where each scene sat in the argument.
4. **The spotlight idea was buried** in scene 18.
5. **No bookend.** The person in the kitchen and the person in the life story were different drawings, and the ending gave tips but no invitation.
6. **Repetition in Acts III and IV.** The dish scene repeated the incentives point and didn't match its picture.
7. **Pictures drifted from the words.** Most scenes looped on their own timers, so during narration the picture often showed the wrong moment.
8. **Long caption lines,** and a mix of "I" and "we".

## What v2 does

| Change | Where |
|---|---|
| **Thesis in the first 30 seconds:** what has been measured (ten homes, 2024: fridge water carried thousands of times more bacteria than the tap), then the hypothesis (over years that harms people; bad breath may be an early sign). Spoken, and shown on a card at the end of scene 1 with the five labels. | `kitchen` scene, page intro, scene 1 text |
| **One legend everywhere:** ESTABLISHED, PLAUSIBLE, UNTESTED, ANECDOTE, REAL. UNMEASURED and NOT SHOWN are gone. The causal links are labelled "untested: our hypothesis", with the fair alternative causes kept as an aside. | life story, evidence chart, ageing, captions, chapter text, landing page |
| **One voice:** "we" throughout, in the hypothesis voice, with factual claims unchanged. | all narration |
| **The chain strip:** a five-link strip above every picture: DISPENSER FOULS (established), WATER CARRIES IT IN (plausible), MOUTH, GUT CHANGE (untested), BAD BREATH (untested), JUDGED (real). The link a scene is about is highlighted. Untested links are dotted, "in the dark". In Act IV each link shows the test that would light it (plates, H2S strips, swap and swabs, breath meter). | every figure |
| **The spotlight as the spine:** Act I now ends on "the corner of the kitchen the light doesn't reach"; the last frame shows a lamp turned onto the fridge. | `months`, `doit` |
| **Bookend:** the person at the dispenser in scene 1 is the same figure as the life story, and the last frame returns to them pouring from a clean jug. | `kitchen`, `doit` |
| **Tighter ending:** the dish scene now matches its picture (a promise against a measurement: data over assumptions); the incentives point lives in the matrix scene; the last scene ends with "join in: test your fridge, share the results". | `dish`, `matrix`, `doit` |
| **Pictures follow the voice:** each line of narration sets the scene's clock (the `SYNC` table), and the picture holds at the right moment until the next line. | `narrate()`, tick loop |
| **Shorter lines:** one idea per line (32 words at most), so captions are readable and the voice pauses in the right places. 123 lines, about 15 minutes. | `NARR`, `audio/` |
| **A plain note under the intro:** the labels, how to read the strip, and "a hypothesis, not a diagnosis: for persistent bad breath or symptoms, see a dentist and a doctor". | page intro |

Unchanged on purpose: the "How it could happen" breath animation (already timed to its voice), the evidence itself, and the synthetic voice (Piper, en_US-joe-medium).

## Files

- `fridge-water.html`: the v2 page. Narration in `NARR`, timing in `SYNC`, chain strip in `LINKS` and `CHAIN`.
- `audio/`: all 123 narration lines, regenerated for v2.
- `narration.md`: the v2 voice-over, rebuilt from `NARR`.
- `script_v2.md`: the script, with a note that `narration.md` is the source for v2 voice-over.
- `index.html`: the landing page, pointing at v2.

## Sound effects (second pass)

Sound effects are off until you tick "Sound effects". What changed:

| Change | Why |
|---|---|
| **A sound for each label.** Established: a settled major chord. Plausible: an open fifth. Untested: a rising two-note question. Anecdote: a woodblock knock. Real: a low thud with a minor third. They play when a label appears (life story, evidence chart, ageing, breath scenes, watermelon), and all five play in order on the scene 1 legend card. | The ear learns the legend, so sound carries meaning, not just decoration. |
| **Ducking.** While the voice speaks, effects drop to about a third and the background to half, then come back. | Effects no longer compete with the narration. |
| **A quiet background bed for each act.** Act I: a fridge hum. Act II: a slow body pulse. Act III: room tone. Act IV: a lamp's mains buzz. They cross-fade as the scene on screen changes act. | It gives each act a place, and ties Act IV's sound to the lamp. |
| **Everyday sounds remade.** The dispenser paddle and a pour that rises in pitch as the glass fills, gulps, the glass set down, a power cut that winds down with a relay click (replacing a harsh sawtooth), the lamp switching on, a squelch for the watermelon, and an exhale for the breath scenes. | They sound like the things on screen. |
| **Cleaner output.** Every tone now has a soft fade-in (no clicks), there's a light room reverb, and a limiter on the output. | Smoother, and no harsh peaks. |
| **Timing fixes.** The kitchen and closing scenes run longer in v2, and their cues now follow the new timing (the thesis card, the legend, the lamp, the jug). | In the first v2 build these cues were still on the v1 timings. |
