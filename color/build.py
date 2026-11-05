#!/usr/bin/env python3
"""Build the colour edition of the site from the black-and-white main site.

Run from anywhere:  python3 color/build.py

It reads ../fridge-water.html and ../index.html and writes color/fridge-water.html and
color/index.html. Nothing in the main site is changed. Every replacement is checked: if the
main site changes shape and a replacement no longer matches exactly once, the build stops
and says which one, instead of producing a half-coloured page.

The look: the classic Macintosh II 16-colour system palette, used the way a 4-bit Mac
would: solid colours and two-colour dithers. Each act has its own colour family, and each
evidence label has a fixed colour (and always its name too, so colour is never the only cue).
"""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)


def read(path):
    with open(os.path.join(ROOT, path), encoding="utf-8") as f:
        return f.read()


def write(path, text):
    with open(os.path.join(HERE, path), "w", encoding="utf-8") as f:
        f.write(text)


def rep(text, old, new, count=1, what=""):
    n = text.count(old)
    if n != count:
        sys.exit(f"BUILD STOPPED: expected {count} match(es), found {n} for: {what or old[:70]!r}")
    return text.replace(old, new)


# ----------------------------------------------------------------------------------------
# JavaScript: palette, per-act colour families, label colours
# ----------------------------------------------------------------------------------------
PALETTE_JS = r'''/* ---------- colour edition: the Macintosh II 16-colour system palette, approximately ---------- */
const MAC16 = { W: "#FFFFFF", Y: "#FFFF00", O: "#FF6600", R: "#DD0000", M: "#FF0099", P: "#330099", B: "#0000DD", C: "#0099FF", G: "#00BB00", D: "#006600", N: "#663300", T: "#996633", L: "#C0C0C0", S: "#808080", K: "#404040", X: "#000000" };
// Each evidence label has one colour. The name is always printed as well.
const LC = { ESTABLISHED: MAC16.G, PLAUSIBLE: MAC16.C, UNTESTED: MAC16.Y, ANECDOTE: MAC16.O, REAL: MAC16.R };
// [background, dots] for each of the seven 1-bit patterns, by act. A 4-bit Mac made its tints by dithering two palette colours.
const FAMILY = {
  fridge: { g6: ["W", "C"], g12: ["W", "C"], g25: ["W", "C"], g50: ["C", "B"], g75: ["C", "B"], wood: ["T", "N"], vent: ["W", "S"] },
  body:   { g6: ["W", "M"], g12: ["W", "M"], g25: ["W", "M"], g50: ["M", "R"], g75: ["M", "R"], wood: ["T", "N"], vent: ["W", "S"] },
  room:   { g6: ["W", "T"], g12: ["W", "T"], g25: ["W", "P"], g50: ["T", "P"], g75: ["T", "P"], wood: ["T", "N"], vent: ["W", "S"] },
  lamp:   { g6: ["W", "Y"], g12: ["W", "Y"], g25: ["W", "G"], g50: ["G", "D"], g75: ["G", "D"], wood: ["T", "N"], vent: ["W", "S"] }
};
function patterns(c, ink, paper) {
  const act = ACT_OF[c.canvas.dataset.scene] || "fridge";
  if (c._pk === act) return c._pats;
  const out = {};
  for (const [k, rows] of Object.entries(PATS)) {
    const [bg, fg] = FAMILY[act][k];
    const o = document.createElement("canvas"); o.width = o.height = 8;
    const x = o.getContext("2d");
    x.fillStyle = MAC16[bg]; x.fillRect(0, 0, 8, 8); x.fillStyle = MAC16[fg];
    rows.forEach((r, y) => { for (let i = 0; i < 8; i++) if (r & (128 >> i)) x.fillRect(i, y, 1, 1); });
    out[k] = c.createPattern(o, "repeat");
  }
  c._pk = act; c._pats = out;
  return out;
}
'''

CSS_EXTRA = r'''
/* ---------- colour edition: label colours (always shown with the label's name) ---------- */
.legend .t-est,.chain .t-est{ background:#00BB00; color:#000 }
.legend .t-pla,.chain .t-pla{ background:#0099FF; color:#000 }
.legend .t-unt,.chain .t-unt{ background:#FFFF00; color:#000 }
.legend .t-ane,.chain .t-ane{ background:#FF6600; color:#000 }
.legend .t-real,.chain .t-real{ background:#DD0000; color:#fff }
.chain .on{ outline:3px solid #000; outline-offset:-3px; box-shadow:none }
.chain span{ box-shadow:none }
.legend .t-unt{ border-style:dashed }
'''


def build_page():
    t = read("fridge-water.html")

    # 1. the pattern kit becomes the colour kit
    a = t.index("function patterns(c, ink, paper) {")
    b = t.index("function painter(cv, ink, paper) {")
    t = t[:a] + PALETTE_JS + t[b:]
    # canvases are always painted in palette colours, whatever the page theme
    t = rep(t, 'const readColors = () => { INK = tok("--ink"); PAPER = tok("--paper"); };',
            'const readColors = () => { INK = "#000000"; PAPER = "#FFFFFF"; };', what="readColors")

    # 2. the evidence labels, drawn on the pictures
    t = rep(t, 'p.fill(x, 22, 96, 14, p.ink); ctext(p, h, x + 48, 26, 1, p.paper);',
            'p.fill(x, 22, 96, 14, LC[h]); ctext(p, h, x + 48, 26, 1, p.ink);', what="tiers header")
    t = rep(t, 'p.box(x, y, w, 12, i === 2 ? P.g12 : p.paper); p.fill(x + 2, y + 2, w - 4, 8, p.paper); ctext(p, l, x + w / 2, y + 3);',
            'p.box(x, y, w, 12, LC[l]); ctext(p, l, x + w / 2, y + 3, 1, l === "REAL" ? p.paper : p.ink);', what="kitchen legend")
    t = rep(t, 'if (kind === "s") { p.box(208, y, 104, 22, p.paper); p.frame(210, y + 2, 100, 18); }',
            'if (kind === "s") p.box(208, y, 104, 22, LC.ESTABLISHED);', what="lifecourse established")
    t = rep(t, 'else if (kind === "u") p.box(208, y, 104, 22, P.g25);', 'else if (kind === "u") p.box(208, y, 104, 22, LC.UNTESTED);', what="lifecourse untested")
    t = rep(t, 'else if (kind === "r") p.box(208, y, 104, 22, p.ink);', 'else if (kind === "r") p.box(208, y, 104, 22, LC.REAL);', what="lifecourse real")
    t = rep(t, 'if (kind === "u") p.fill(212, y + 3, 96, 16, p.paper);\n', '', what="lifecourse untested inner box")

    # 3. a few pictures where colour carries meaning
    t = rep(t, 'p.box(64, 138 - th, 28, th, P.g50); p.box(124, 138 - fh, 28, fh, p.ink);',
            'p.box(64, 138 - th, 28, th, MAC16.C); p.box(124, 138 - fh, 28, fh, MAC16.R);', what="swanson2 plate bars")
    t = rep(t, 'p.box(212, 138 - 80 * c1, 28, 80 * c1, P.g50);', 'p.box(212, 138 - 80 * c1, 28, 80 * c1, MAC16.G);', what="swanson2 chlorine bar")
    t = rep(t, 'if (T >= 9.5) { p.box(44, 70, 76, 12, p.ink); ctext(p, "ESTABLISHED", 82, 74, 1, p.paper); }',
            'if (T >= 9.5) { p.box(44, 70, 76, 12, LC.ESTABLISHED); ctext(p, "ESTABLISHED", 82, 74, 1, p.ink); }', what="swanson2 established tag")
    t = rep(t, 'const tap = [[0.0919, P.g50], [0.1097, p.ink], [0.7984, p.paper]], fr = [[0.0668, P.g50], [0.0004, p.ink], [0.9328, p.paper]];',
            'const tap = [[0.0919, MAC16.O], [0.1097, MAC16.P], [0.7984, p.paper]], fr = [[0.0668, MAC16.O], [0.0004, MAC16.P], [0.9328, p.paper]];', what="swanson3 pies")
    t = rep(t, 'p.fill(8, 146, 8, 6, P.g50); p.frame(8, 146, 8, 6);', 'p.fill(8, 146, 8, 6, MAC16.O); p.frame(8, 146, 8, 6);', what="swanson3 legend swatch 1")
    t = rep(t, 'p.fill(168, 146, 8, 6, p.ink);', 'p.fill(168, 146, 8, 6, MAC16.P);', what="swanson3 legend swatch 2")

    t = rep(t, 'if (k === 1) p.oval(x + 48, 142, 14, 14, P.g50);', 'if (k === 1) p.oval(x + 48, 142, 14, 14, LC.PLAUSIBLE);', what="tiers plausible circle")
    t = rep(t, 'p.box(214, 146 - Math.abs(h1), 28, Math.abs(h1), P.g50); p.box(262, 146 - Math.abs(h2), 28, Math.abs(h2), p.ink);',
            'p.box(214, 146 - Math.abs(h1), 28, Math.abs(h1), MAC16.L); p.box(262, 146 - Math.abs(h2), 28, Math.abs(h2), LC.UNTESTED);', what="atp2 bars")

    # 4. the page: label colours in the legend and the chain strip, paths, titles
    t = rep(t, "footer{ padding-block:2rem 3rem; color:var(--mute); font-size:.9rem }",
            "footer{ padding-block:2rem 3rem; color:var(--mute); font-size:.9rem }" + CSS_EXTRA, what="css anchor")
    t = rep(t, '<li>ESTABLISHED</li><li>PLAUSIBLE</li><li class="dark">UNTESTED</li><li>ANECDOTE</li><li>REAL</li>',
            '<li class="t-est">ESTABLISHED</li><li class="t-pla">PLAUSIBLE</li><li class="t-unt">UNTESTED</li><li class="t-ane">ANECDOTE</li><li class="t-real">REAL</li>', what="legend html")
    t = rep(t, '<span class="${i === act ? "on" : (tag === "ESTABLISHED" || tag === "REAL") ? "" : "dark"}">',
            '<span class="${{ ESTABLISHED: "t-est", PLAUSIBLE: "t-pla", UNTESTED: "t-unt", REAL: "t-real" }[tag]}${i === act ? " on" : ""}">', what="chain strip classes")
    t = rep(t, "Shaded links are still in the dark.", "Yellow links are still in the dark.", what="legend note")
    t = rep(t, "audio/${scene}-${i}.ogg?v=${AUDIO_VERSION}", "../audio/${scene}-${i}.ogg?v=${AUDIO_VERSION}", what="audio path")
    t = rep(t, "<title>The Hygiene Trap</title>", "<title>The Hygiene Trap (colour)</title>", what="title")
    t = rep(t, '<div class="eyebrow">Version 2 · twenty-five scenes · <a href="color/fridge-water">colour edition</a></div>',
            '<div class="eyebrow">Colour edition · Macintosh II 16 colours · <a href="../fridge-water">black and white</a></div>', what="eyebrow")
    t = rep(t, "which is why", "which is why", 0, what="noop") if False else t
    write("fridge-water.html", t)
    return len(t)


def build_landing():
    t = read("index.html")
    t = rep(t, 'href="build/index.html"', 'href="../build/index.html"', what="plate counter link")
    t = rep(t, '<div class="eyebrow">A video essay in progress · version 2 · <a href="color/">colour edition</a></div>',
            '<div class="eyebrow">A video essay in progress · colour edition · <a href="../">black and white</a></div>', what="landing eyebrow")
    t = rep(t, "<title>The Hygiene Trap</title>", "<title>The Hygiene Trap (colour)</title>", what="landing title")
    t = rep(t, ".tiers li{ margin-bottom:.45rem }",
            ".tiers li{ margin-bottom:.45rem }\n.tiers > div:nth-child(1) h3{ background:#00BB00; padding:.1rem .45rem }\n.tiers > div:nth-child(2) h3{ background:#0099FF; padding:.1rem .45rem }\n.tiers > div:nth-child(3) h3{ background:#FFFF00; padding:.1rem .45rem; color:#000 }\n.tiers h3{ color:#000 }", what="tiers css")
    write("index.html", t)


if __name__ == "__main__":
    n = build_page()
    build_landing()
    print(f"built color/fridge-water.html ({n:,} characters) and color/index.html")
