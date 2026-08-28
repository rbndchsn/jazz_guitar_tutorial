# Getting Out of ii–V–I — shared-asset build

A jazz guitar reference for substituting every chord in a ii–V–I, worked in the key of C major. Four sheets, 140 chord diagrams, with scale degrees printed inside the dots.

This is the same content as the original site, restructured so that shared code lives in one place. Still no build step, no bundler, no dependencies — the only external request is Google Fonts.

## Layout

```
index.html                        the four sheets, described
1iichordDm7substitutions.html     ii  — Dm7
2VchordG7substitutions.html       V   — G7
3IchordCmaj7strategies.html       I   — Cmaj7
4threearrangements.html           the sheets put to work on one vamp
404.html

assets/
  tokens.css      every colour, defined once (light, system dark, forced dark)
  base.css        the 37 rules identical across all four sheets
  sitebar.css     the persistent bar
  sitefooter.css  the colophon
  index.css       index and 404 only
  sheet1..4.css   what each sheet adds or overrides
  fretboard.js    the chord-diagram renderer; defines the JG namespace
  layout.js       renderBands() - the "bands of cards" page type
  sitebar.js      builds the bar and its menu from one NAV array
  sitefooter.js   builds the colophon, appended to every page's .wrap

data/
  sheet1..4.js    the chord data for one sheet

_template/        sheet.html + sheet.js, copied by the generator
tools/
  new_sheet.py    scaffold a page, its data file, and its menu entry
  check.py        links, mount points, tags, menu, JS syntax
.vscode/          serve / check / new-sheet tasks
```

Each page is a shell: head, static prose, empty mount points, script tags. Everything that draws is in `assets/`; everything that is *this sheet's content* is in `data/`.

## Adding a sheet

```
python tools/new_sheet.py 5rhythmchanges "Rhythm Changes" --deg "I VI ii V" --chord Bb
```

That writes `5rhythmchanges.html` and `data/5rhythmchanges.js` from `_template/`, and adds one line to `NAV` in `assets/sitebar.js` — which is what puts the page in the menu **on every other page in the site**. Nothing else is touched.

Then write the chords in the new `data/` file (its comments document every field) and run:

```
python tools/check.py
```

which fails loudly on a broken link, a missing mount point, unbalanced tags, a page absent from the menu, or a JS syntax error.

In VS Code the same three things are tasks: **serve** (`python -m http.server 8080`), **check**, and **new sheet**.

Neither script is a build step — the site is served exactly as it sits on disk and never needs either one to have run. They exist so that adding a page is one command instead of five edits.

## Site chrome

The bar at the top and the colophon at the bottom belong to the site, not to any page. Both are built by script and appear everywhere — no page contains either as markup, so no page can be missed when one changes. `tools/check.py` fails if any page, or the template, stops loading them.

The menu is defined once, as data, in `assets/sitebar.js`:

```js
var NAV = [
  { href: "index.html", label: "Home", deg: "index" },
  ...
];
```

`sitebar.js` builds the header, logo, burger and menu on every page from that array, and marks the current page by comparing `location.pathname` — so the highlight is derived, never hand-maintained. The trade-off: with JavaScript off there is no menu. That costs nothing here, because the diagrams are drawn by JavaScript too.

## One namespace

The shared code puts exactly **one** name on `window`: `JG`. Everything else lives inside a closure. A consumer takes what it needs at the top of its own:

```js
(function () {
  "use strict";
  var renderBands = JG.renderBands;
  ...
})();
```

`JG` carries `SHARP FLAT OPEN FRETS G_CHORD G_SCALE SW svgEl gridSvg dot diagram scaleDiagram pitchesOf el`, plus `renderBands` which `layout.js` attaches — so `fretboard.js` must load before `layout.js`, and both before any `data/` file. `tools/check.py` fails if a data file stops going through `JG`.

Deliberately not ES modules: `import` does not work over `file://`, and being able to open a page straight off the disk is worth more here than module syntax.

## Diagram data

The renderer draws from arrays of `shape` (fret per string, `null` = muted) and `degs` (the scale degree printed in each dot). `pitchesOf()` derives the sounding note names from open-string pitch classes, so the printed pitches and the printed degrees come from the same source as the dots.

Everything is standard tuning (E A D G B E), low string at left. No open strings are load-bearing, so every grip transposes by sliding.

## Provenance

Ported mechanically from the original single-file pages: data arrays and page-assembly code were moved verbatim, never retyped. The port was verified by rendering every sheet twice — once with the original inline script, once with `fretboard.js` + `data/sheetN.js` — into a stub DOM and diffing the resulting element trees:

| sheet | nodes | differences |
|---|---|---|
| 1 | 832 | 41, all dot-label `font-size` |
| 2 | 838 | 50, all dot-label `font-size` |
| 3 | 1494 | none |
| 4 | 1480 | none |

Sheets 1 and 2 originally used a fixed label size (`8.4 / 7.4`); the shared renderer scales it off the dot radius (`8.4 / 7.9 / 7.0`), so two- and three-character labels such as ♭7 and ♭13 are slightly smaller — matching sheets 3 and 4. No dot moved and no label text changed.
