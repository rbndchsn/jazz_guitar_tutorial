/* data/{{SLUG}}.js — the content of one sheet.
   Nothing here draws anything: fretboard.js draws, layout.js arranges,
   this file only says what the chords are. */
(function () {
  "use strict";

  /* everything shared lives on the JG namespace (assets/fretboard.js,
     assets/layout.js). Take what this sheet needs: */
  var renderBands = JG.renderBands;

  /* Each entry is a BAND — a family of substitutions, ordered by how far it
     strays from the original chord.

       title     the family name, as a heading
       distance  1..5, how far out it is; drawn as filled pips
       note      one sentence on what the family does
       cards     the substitutions themselves

     Each CARD is one substitution:

       name      the chord as you would write it on a chart, e.g. "Fmaj7#11"
       equals    what it is relative to the original, e.g. "= Dm7 with a 4th on top"
       why       a sentence or two; <b>...</b> is allowed
       wide      true to make the card span the full row (optional)
       grips     one or more voicings

     Each GRIP is one diagram:

       sub       the chord name printed under the diagram
       label     extra caption, e.g. " · comping" (may be "")
       shape     six frets, low string first. null = muted, 0 = open.
                 e.g. [null, 5, 7, 5, 6, null]
       degs      the scale degree printed inside each dot, same order as shape.
                 Use "R" for the root — it is the one that gets the accent colour.
                 null where the string is muted. e.g. [null,"R","5","♭7","♭3",null]
       sp        "b" to spell the sounding pitch names with flats, else omit
       startAt   force the starting fret when the grip is ambiguous (optional)

     The printed pitch names under each diagram are DERIVED from shape — they
     are not typed in, so they cannot disagree with the dots. The degrees ARE
     typed in, so check them at the instrument. That is the one thing this
     file cannot verify for you. */

  var DATA = [
    {
      title: "Name of the first family",
      distance: 1,
      note: "What this family of substitutions actually does to the sound.",
      cards: [
        {
          name: "Chordname",
          equals: "= what it is, relative to the original chord",
          why: "Why it works, and when to reach for it.",
          grips: [
            {
              sub: "Chordname",
              label: " · comping",
              shape: [null, 5, 7, 5, 6, null],
              degs:  [null, "R", "5", "♭7", "♭3", null]
            }
          ]
        }
      ]
    }
  ];

  renderBands("bands", DATA, { distanceLabel: "distance from {{CHORD}}" });
})();
