# sfx/

Recorded sound effects used by the site. Most sounds are synthesised in the browser; these are the exceptions.

| File | What | Source and licence |
|---|---|---|
| `ah.ogg`, `swallow.ogg`, `sip.ogg` | The sip at his lips, the three gulps (the swallow, played at slightly different speeds) and the satisfied "ahh" in "The pour" (scene 1) | Cut from "Sip of coffee, swallow then \"ah\"" by odditonic, https://freesound.org/people/odditonic/sounds/194808/ , released under Creative Commons 0 (public domain), so no credit is required. We credit them anyway. We used the site's preview file, trimmed into three pieces with short fades and made mono. |

| `groan.ogg` | The groans in "That night" (scene 1) and the first groan after he drinks, played at slightly different speeds | "Groan" by Mike Koenig, https://soundbible.com/831-Groan.html , licensed under Creative Commons Attribution 3.0 (https://creativecommons.org/licenses/by/3.0/). **Credit is required**, and it is on the site's footer. Changes: we trimmed it, added short fades, made it mono, and play it at different speeds. |

If a file is missing or blocked, the site plays a synthesised version of that sound instead.

## Narration voice

Narration audio in `audio/` is synthesised with Chatterbox (Resemble AI, MIT licence), conditioned on a short clip of the Kokoro-82M voice `af_heart` (Apache-2.0 licence). Chatterbox embeds an inaudible watermark (Perth) marking the audio as AI-generated. Every line was transcribed with faster-whisper and checked against the script. Earlier versions used Kokoro alone, and before that Piper (en_US-joe-medium).

## Other languages

The language menu offers seven translations of the narration, each with recorded audio in `audio-<code>/`:

| Language | Engine | Voice | Licences |
|---|---|---|---|
| French, Spanish, Portuguese, Hindi, Mandarin, Japanese | Kokoro-82M (Apache-2.0), via kokoro-onnx | ff_siwis, ef_dora, pf_dora, hf_alpha, zf_xiaoxiao, jf_alpha | Mandarin and Japanese pronunciation by misaki (Apache-2.0); Japanese dictionary UniDic (BSD-3-Clause) |
| German | Chatterbox multilingual (Resemble AI, MIT) | conditioned on 13 seconds of Thorsten Müller's own recordings | Thorsten-Voice "TV-24kHz-2025.12-Neutral-FT-Mini", CC0-1.0 |

The translations in `i18n/` were made by AI from the English script and have not yet been reviewed by native speakers. Labels inside the pictures stay in English. Every recorded line was transcribed with faster-whisper and compared with its script; lines that came out wrong were re-recorded. Corrections from native speakers are welcome.
