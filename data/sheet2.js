(function () {
  "use strict";

  var renderBands = JG.renderBands;

  // shape: strings low-E → high-E. null = muted, 0 = open, n = fret.
  // degs:  scale degree of each sounding note, relative to that chord's own root.
  var DATA = [
    {
      id: "extend",
      title: "Extend it without leaving it",
      distance: 1,
      note: "The V is the one chord in the progression where almost anything is legal — it is leaving anyway. Start by adding notes rather than replacing them. All three of these still read unambiguously as G7.",
      cards: [
        {
          name: "G13",
          equals: "the working default",
          why: "Drop the fifth, put the <b>13th</b> on top. When a chart says G7 and you are in a combo, this is usually what everyone means.",
          grips: [
            { label: "Comping grip", sub: "♭7 · 3 · 13", shape: [null,null,3,4,5,null], degs: [null,null,"♭7","3","13"] },
            { label: "With the root", sub: "G13", shape: [3,null,3,4,5,null], degs: ["R",null,"♭7","3","13"] }
          ]
        },
        {
          name: "G9",
          equals: "= Bm7♭5 without the root",
          why: "Add the 9th. Strip the root and what is left is <b>Bm7♭5</b> — which is why the ii chord of G minor keeps turning up inside V-chord voicings.",
          grips: [
            { label: "Comping grip", sub: "Bm7♭5", shape: [null,null,3,4,3,5], degs: [null,null,"♭7","3","5","9"] },
            { label: "With the root", sub: "G9", shape: [3,null,3,4,3,5], degs: ["R",null,"♭7","3","5","9"] }
          ]
        },
        {
          name: "G7♭9",
          equals: "= B°7 without the root",
          sp: "b",
          why: "Flatten the 9th and the rootless grip becomes a <b>diminished 7th</b>. B°7, D°7, F°7 and A♭°7 are the same four notes, so every dim7 shape you already know is a G7♭9.",
          grips: [
            { sp: "b", label: "Comping grip", sub: "B°7", shape: [null,null,3,4,3,4], degs: [null,null,"♭7","3","5","♭9"] },
            { sp: "b", label: "With the root", sub: "G7♭9", shape: [3,null,3,4,3,4], degs: ["R",null,"♭7","3","5","♭9"] }
          ]
        }
      ]
    },
    {
      id: "suspend",
      title: "Suspend the third",
      distance: 2,
      note: "Take the B out and the leading tone stops pulling. Both of these postpone the resolution — comp one for the first half of the bar and let the third arrive late, or never resolve it at all.",
      cards: [
        {
          name: "G9sus4",
          equals: "= F triad over G  ·  or Dm7 over G",
          why: "No third, so nothing has committed yet. Think of it as an <b>F triad</b> sitting on a G, and you can find it anywhere on the neck.",
          grips: [
            { label: "Comping grip", sub: "F triad", shape: [null,null,10,10,10,null], degs: [null,null,"11","♭7","9"] },
            { label: "With the root", sub: "G9sus4", shape: [null,10,10,10,10,null], degs: [null,"R","11","♭7","9"] }
          ]
        },
        {
          name: "G7sus♭9",
          equals: "= A♭maj7 over G",
          why: "Phrygian rather than mixolydian. The darkest chord on this sheet that still functions as a plain V — and the one that most says <b>1980s piano trio</b>.",
          grips: [
            { sp: "b", startAt: 3, label: "Comping grip", sub: "A♭maj7", shape: [null,null,5,5,4,4], degs: [null,null,"R","11","♭13","♭9"] },
            { sp: "b", label: "With the root", sub: "G7sus♭9", shape: [3,null,5,5,4,4], degs: ["R",null,"R","11","♭13","♭9"] }
          ]
        }
      ]
    },
    {
      id: "alter",
      title: "Alter it",
      distance: 3,
      note: "Now bend the notes that are not guide tones. B and F stay put — they are what make it a G7 at all. Everything else is negotiable, and the further you bend it, the harder the chord pulls toward C.",
      cards: [
        {
          name: "G7♯11",
          equals: "Lydian dominant",
          why: "Raise the 11th. An <b>A major triad</b> over G says the same thing in one grab — 9, ♯11 and 13 stacked together.",
          grips: [
            { label: "Comping grip", sub: "♭7 · 3 · ♯11", shape: [null,null,3,4,2,0], degs: [null,null,"♭7","3","♯11","13"] },
            { label: "With the root", sub: "G13♯11", shape: [3,null,3,4,2,0], degs: ["R",null,"♭7","3","♯11","13"] }
          ]
        },
        {
          name: "G7♯9",
          equals: "B♭ against B natural",
          why: "The one everybody knows. It resolves so well because the two notes fighting each other go opposite ways: <b>B♭ falls to A, B rises to C</b>.",
          grips: [
            { sp: "b", label: "Comping grip", sub: "3 · ♭7 · ♯9", shape: [null,null,9,10,11,null], degs: [null,null,"3","♭7","♯9"] },
            { sp: "b", label: "With the root", sub: "G7♯9", shape: [null,10,9,10,11,null], degs: [null,"R","3","♭7","♯9"] }
          ]
        },
        {
          name: "G7alt",
          equals: "♯9 and ♭13 together",
          why: "Every note that can be altered has been. This is the altered scale compressed into four notes, and it will not sit still — play it late in the bar and land on Cmaj7 immediately.",
          grips: [
            { sp: "b", label: "Comping grip", sub: "rootless", shape: [null,null,9,10,11,11], degs: [null,null,"3","♭7","♯9","♭13"] },
            { sp: "b", label: "With the root", sub: "G7♯9♭13", shape: [null,10,9,10,11,11], degs: [null,"R","3","♭7","♯9","♭13"] }
          ]
        }
      ]
    },
    {
      id: "tritone",
      title: "Move the root a tritone",
      distance: 4,
      note: "D♭7 shares B and F with G7 — the tritone that defines them both. Swap the root and the bass walks D♭ down to C by half step instead of falling a fifth.",
      cards: [
        {
          name: "D♭13",
          equals: "tritone sub of G7",
          sp: "b",
          why: "Set this comping grip beside <b>G7♯9</b> two cards up: it is the same diagram. Only the bass note decides which of the two chords you are playing.",
          grips: [
            { sp: "b", label: "Comping grip", sub: "♭7 · 3 · 13", shape: [null,null,9,10,11,null], degs: [null,null,"♭7","3","13"] },
            { sp: "b", label: "With the root", sub: "D♭13", shape: [9,null,9,10,11,null], degs: ["R",null,"♭7","3","13"] }
          ]
        },
        {
          name: "D♭7♯11",
          equals: "the sub that keeps the G",
          why: "The ♯11 of D♭ is <b>G</b> — the root you just threw out. That is why this one sounds like both chords at once, and why it is the safest tritone sub to drop under an unfamiliar melody.",
          grips: [
            { sp: "b", label: "Comping grip", sub: "♭7 · 3 · ♯11", shape: [null,null,9,10,8,null], degs: [null,null,"♭7","3","♯11"] },
            { sp: "b", label: "With the root", sub: "D♭7♯11", shape: [9,null,9,10,8,null], degs: ["R",null,"♭7","3","♯11"] }
          ]
        }
      ]
    },
    {
      id: "elsewhere",
      title: "Get to C some other way",
      distance: 5,
      note: "Two cadences that reach the tonic with no G anywhere in them. Both turn up often enough in standards that a rhythm section will follow you into either one without being told.",
      cards: [
        {
          name: "B♭7",
          equals: "the backdoor  ·  ♭VII7 → I",
          why: "Borrowed from C minor. The <b>A♭ falls to G</b> and the D holds still, so it lands on Cmaj7 as convincingly as a real V. Approach it from Fm7 and the whole cadence rewrites itself.",
          grips: [
            { sp: "b", label: "Comping grip", sub: "♭7 · 3 · 5", shape: [null,null,6,7,6,null], degs: [null,null,"♭7","3","5"] },
            { sp: "b", label: "With the root", sub: "B♭7", shape: [6,null,6,7,6,null], degs: ["R",null,"♭7","3","5"] }
          ]
        },
        {
          name: "A♭m7 – D♭7",
          equals: "the ii–V of the tritone sub",
          wide: true,
          why: "Fill the whole G7 bar with the ii–V belonging to D♭. Two chords where there was one, and the bass line becomes <b>A♭ – D♭ – C</b>, arriving on the tonic by half step from above.",
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

  renderBands("bands", DATA, { distanceLabel: "distance from G7" });
})();
