# Colour edition

The same site in colour, using the classic **Macintosh II 16-colour system palette** (approximately), the way a 4-bit Mac screen worked: solid colours and two-colour dithers.

- Pictures: `color/fridge-water.html` (live at `/color/fridge-water`)
- Landing page: `color/index.html` (live at `/color/`)
- The black-and-white version stays the main one at the site root.

## How it's made

`color/build.py` reads the black-and-white pages and writes the colour ones. **Don't edit the files in this folder by hand.** Change the main site, then run:

```
python3 color/build.py
```

If the main site changes shape and one of the script's replacements no longer matches, the build stops and names it, so you never publish a half-coloured page. The audio is shared with the main site (`../audio/`), so there's nothing to regenerate.

## The look

- **Each act has its own colour family:** Act I (the fridge) cyan and blue, Act II (the body) pink and red, Act III (the life story) tan and purple, Act IV (lighting the corner) yellow and green.
- **Each evidence label has one colour,** in the legend, the chain strip above every picture, and on the pictures where a label is drawn: ESTABLISHED green, PLAUSIBLE cyan, UNTESTED yellow, ANECDOTE orange, REAL red. **The name is always printed too,** so colour is never the only cue.
- **A few pictures use colour for meaning:** the plate-count bars (tap cyan, fridge red), the chlorine bar (green), and the two bacterial groups in the pie charts (orange and purple).
- Canvases always use palette colours, whatever the page theme.

## Why 16 colours at 320 x 200

The Mac II's base video card showed 16 colours at 640 x 480; the pictures here are 320 x 200, the size of the VGA "mode 13h" screen, and are scaled up. The palette values are approximate.
