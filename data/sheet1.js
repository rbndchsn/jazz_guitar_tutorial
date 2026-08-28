(function () {
  "use strict";

  var renderBands = JG.renderBands;

  // shape: strings low-E → high-E. null = muted, 0 = open, n = fret.
  // degs:  scale degree of each sounding note, relative to that chord's own root.
  var DATA = [
    {
      id: "upper",
      title: "Stack thirds on top and drop the root",
      distance: 1,
      note: "The least disruptive move there is. Keep climbing in diatonic thirds from D and every stop is still Dm7 — just with a taller extension on top. Over a D bass these are Dm9, Dm11 and Dm13.",
      cards: [
        {
          name: "Fmaj7",
          equals: "= Dm9  ·  over a D bass",
          why: "The first stop up. F A C E is Dm7 with the <b>9th</b> on top and the root left to the bass player.",
          grips: [
            { label: "Comping grip", sub: "Fmaj7", shape: [null,null,3,5,5,5], degs: [null,null,"R","5","7","3"] },
            { label: "With the root", sub: "Dm9", shape: [null,5,3,5,5,null], degs: [null,"R","♭3","♭7","9"] }
          ]
        },
        {
          name: "Am7",
          equals: "= Dm11  ·  over a D bass",
          why: "One stop further. A C E G over D is <b>Dm11</b> — no third in the voicing, so it floats.",
          grips: [
            { label: "Comping grip", sub: "Am7", shape: [null,null,7,5,5,3], degs: [null,null,"R","♭3","5","♭7"] },
            { label: "With the root", sub: "Dm11", shape: [null,5,5,5,5,null], degs: [null,"R","11","♭7","9"] }
          ]
        },
        {
          name: "Cmaj7",
          equals: "= Dm13  ·  over a D bass",
          why: "Third stop. The <b>B</b> is the Dorian 6th — the colour most players actually mean when they say “jazz minor”.",
          grips: [
            { label: "Comping grip", sub: "Cmaj7", shape: [null,3,5,4,5,null], degs: [null,"R","5","7","3"] },
            { label: "With the root", sub: "Dm6/9", shape: [null,5,3,4,5,null], degs: [null,"R","♭3","13","9"] }
          ]
        }
      ]
    },
    {
      id: "sus",
      title: "Blur the ii and the V into one chord",
      distance: 2,
      note: "Drop the third and the chord stops declaring itself. These carry ii and V at the same time, so you can hold one grip across both bars and only resolve on the I.",
      cards: [
        {
          name: "D9sus4",
          equals: "= C major triad over D",
          why: "A plain <b>C triad</b> with D underneath. Comp it for two full bars and let the melody decide when the V arrives.",
          grips: [
            { label: "Comping grip", sub: "C / G", shape: [null,null,5,5,5,null], degs: [null,null,"5","R","3"] },
            { label: "With the root", sub: "D9sus4", shape: [null,5,7,5,5,null], degs: [null,"R","5","♭7","9"] }
          ]
        },
        {
          name: "Quartal",
          equals: "D – G – C – F  ·  stacked fourths",
          why: "Four notes, all a fourth apart. No third anywhere, so it reads as ii, V or neither — the <b>McCoy Tyner</b> way out.",
          grips: [
            { label: "Comping grip", sub: "G – C – F", shape: [null,null,5,5,6,null], degs: [null,null,"11","♭7","♭3"] },
            { label: "With the root", sub: "Dm11 quartal", shape: [null,5,5,5,6,null], degs: [null,"R","11","♭7","♭3"] }
          ]
        }
      ]
    },
    {
      id: "minor",
      title: "Borrow it from C minor",
      distance: 3,
      note: "Same root, darker parent scale. Both of these pull the cadence toward minor, and both want a G7♭9 rather than a plain G7 after them.",
      cards: [
        {
          name: "Dm7♭5",
          equals: "= Fm6  ·  identical notes, new bass",
          why: "Flatten the fifth and you are in C minor. Note that the four pitches are also <b>Fm6</b> — same grip, two names, depending who plays the bass note.",
          grips: [
            { sp: "b", label: "Comping grip", sub: "Fm triad", shape: [null,null,3,1,1,null], degs: [null,null,"R","♭3","5"] },
            { sp: "b", label: "With the root", sub: "Dm7♭5", shape: [null,5,6,5,6,null], degs: [null,"R","♭5","♭7","♭3"] }
          ]
        },
        {
          name: "Dm(maj7)",
          equals: "the line cliché chord",
          why: "One voice walks <b>D – C♯ – C – B</b> while everything else holds. This is bar one of that descent; bar two is plain Dm7.",
          grips: [
            { label: "Comping grip", sub: "open position", shape: [null,null,0,2,2,1], degs: [null,null,"R","5","7","♭3"] },
            { label: "With the root", sub: "5th fret", shape: [null,5,7,6,6,null], degs: [null,"R","5","7","♭3"] }
          ]
        }
      ]
    },
    {
      id: "dominant",
      title: "Turn the ii into a dominant",
      distance: 4,
      note: "Raise the third and Dm7 becomes D7 — the V of the V. It stops being a resting chord and starts pushing into G7, which is exactly what you want under a busy line.",
      cards: [
        {
          name: "D7",
          equals: "V of V  ·  D7 → G7 → Cmaj7",
          why: "The plainest reharmonisation on the sheet, and the oldest. Every standard from the 1920s does this by default.",
          grips: [
            { label: "Comping grip", sub: "3rd · 5th · ♭7", shape: [null,null,4,2,1,null], degs: [null,null,"3","5","♭7"] },
            { label: "With the root", sub: "D7", shape: [null,5,7,5,7,null], degs: [null,"R","5","♭7","3"] }
          ]
        },
        {
          name: "D7♯9",
          equals: "and its cousin D7alt",
          why: "D7 with teeth: the <b>F</b> grinding against the F♯ is the entire point. For full-blown alt, move the A to A♭ — which lands you back on the Dm7♭5 grip, read a different way.",
          grips: [
            { label: "Comping grip", sub: "rootless", shape: [null,null,4,5,6,null], degs: [null,null,"3","♭7","♯9"] },
            { label: "With the root", sub: "D7♯9", shape: [null,5,4,5,6,null], degs: [null,"R","3","♭7","♯9"] }
          ]
        }
      ]
    },
    {
      id: "outside",
      title: "Leave the key entirely",
      distance: 5,
      note: "The last band moves the bass note off D. These are the substitutions people notice — use them where the arrangement can carry a surprise, not on every chorus.",
      cards: [
        {
          name: "A♭13",
          equals: "tritone sub of D7",
          why: "Compare the two comping grips in this card and the one in D7♯9: <b>they are the same shape</b>. The tritone F♯/G♭–C belongs to both chords, so only the bass note tells them apart. Bass walks A♭ – G – C.",
          grips: [
            { sp: "b", label: "Comping grip", sub: "♭7 · 3 · 13", shape: [null,null,4,5,6,null], degs: [null,null,"♭7","3","13"] },
            { sp: "b", label: "With the root", sub: "A♭13", shape: [4,null,4,5,6,null], degs: ["R",null,"♭7","3","13"] }
          ]
        },
        {
          name: "E♭m7",
          equals: "chromatic side-slip",
          why: "A half-step above the target. Play it for two beats and slide the whole grip down one fret into Dm7 — or hold it the full bar if you trust the band.",
          grips: [
            { sp: "b", label: "Comping grip", sub: "rootless", shape: [null,null,8,6,7,null], degs: [null,null,"5","♭7","♭3"] },
            { sp: "b", label: "With the root", sub: "E♭m7", shape: [null,6,8,6,7,null], degs: [null,"R","5","♭7","♭3"] }
          ]
        },
        {
          name: "A♭m7 – D♭7",
          equals: "sub the whole ii–V cell",
          wide: true,
          why: "Tritone-substitute both chords and the cell relocates a tritone away, still resolving to Cmaj7. The bass line becomes <b>A♭ – D♭ – C</b>, which lands on the tonic by half step from above.",
          grips: [
            { sp: "b", label: "Comping grip", sub: "A♭m7", shape: [null,null,4,4,4,null], degs: [null,null,"♭7","♭3","5"] },
            { sp: "b", label: "With the root", sub: "A♭m7", shape: [4,null,4,4,4,null], degs: ["R",null,"♭7","♭3","5"] },
            { sp: "b", label: "Comping grip", sub: "D♭7", shape: [null,null,6,4,6,null], degs: [null,null,"5","♭7","3"] },
            { sp: "b", label: "With the root", sub: "D♭7", shape: [null,4,6,4,6,null], degs: [null,"R","5","♭7","3"] }
          ]
        }
      ]
    }
  ];

  /* ---------- fretboard maths (also used to print pitch names) ---------- */

  /* ---------- render ---------- */

  renderBands("bands", DATA, { distanceLabel: "distance from Dm7" });
})();
