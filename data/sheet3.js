(function () {
  "use strict";

  var diagram = JG.diagram, scaleDiagram = JG.scaleDiagram, pitchesOf = JG.pitchesOf, el = JG.el;

  /* ---------- PART I : substitutions ---------- */

  var SUBS = [
    {
      title: "Extend it",
      distance: 1,
      note: "The I chord cannot be altered the way a V can — bend the wrong note and it stops being home. What it takes happily is extension. All three of these are still plainly Cmaj7, just with more air above the root.",
      cards: [
        {
          name: "Cmaj9",
          equals: "add the 9th",
          why: "The smallest step away from a bare Cmaj7, and the one you can make without thinking. Drop the fifth, put <b>D</b> in the middle of the chord.",
          grips: [
            { label: "Comping grip", sub: "Em7 shape", shape: [null,null,2,4,3,3], degs: [null,null,"3","7","9","5"] },
            { label: "With the root", sub: "Cmaj9", shape: [null,3,2,4,3,null], degs: [null,"R","3","7","9"] }
          ]
        },
        {
          name: "C6/9",
          equals: "no 7th, no clash",
          why: "Take the B out entirely. Nothing sits a half step from the root, which is why this is what most players land on at the <b>end of a tune</b> rather than a maj7.",
          grips: [
            { label: "Comping grip", sub: "3 · 13 · 9", shape: [null,null,2,2,3,null], degs: [null,null,"3","13","9"] },
            { label: "With the root", sub: "C6/9", shape: [null,3,2,2,3,null], degs: [null,"R","3","13","9"] }
          ]
        },
        {
          name: "Cmaj13",
          equals: "the whole stack",
          why: "Root, 5th, 7th, 3rd, 13th — five notes, every one of them earning its place. Heavy for comping behind a soloist; ideal for a <b>held final chord</b>.",
          grips: [
            { label: "Comping grip", sub: "5 · 7 · 3 · 13", shape: [null,null,5,4,5,5], degs: [null,null,"5","7","3","13"] },
            { label: "With the root", sub: "Cmaj13", shape: [null,3,5,4,5,5], degs: [null,"R","5","7","3","13"] }
          ]
        }
      ]
    },
    {
      title: "Raise the fourth",
      distance: 2,
      note: "F is the one note in C major that fights Cmaj7 — a half step above the third, and the reason a plain C major scale sounds wrong over the chord it belongs to. Raise it to F♯ and the problem disappears. This is Lydian, and it is the single most useful colour for a I chord you have to sit on.",
      cards: [
        {
          name: "Cmaj7♯11",
          equals: "= D major triad over C",
          why: "There is no avoid note left anywhere in the scale. A <b>D major triad</b> over a C bass says the same thing in three notes — 9, ♯11, 13 in one grab.",
          grips: [
            { label: "Comping grip", sub: "♯11 · 7 · 9", shape: [null,null,4,4,3,null], degs: [null,null,"♯11","7","9"] },
            { label: "With the root", sub: "Cmaj9♯11", shape: [null,3,4,4,3,null], degs: [null,"R","♯11","7","9"] }
          ]
        },
        {
          name: "C6/9♯11",
          equals: "Lydian with no 7th at all",
          why: "The C6/9 grip with one finger added on top. Bright, completely stable, and it will hold under a soloist for as long as you like without ever asking to resolve.",
          grips: [
            { label: "Comping grip", sub: "3 · 13 · 9 · ♯11", shape: [null,null,2,2,3,2], degs: [null,null,"3","13","9","♯11"] },
            { label: "With the root", sub: "C6/9♯11", shape: [null,3,2,2,3,2], degs: [null,"R","3","13","9","♯11"] }
          ]
        }
      ]
    },
    {
      title: "Same notes, new name",
      distance: 3,
      note: "Two diatonic chords overlap Cmaj7 so heavily that playing them is playing the tonic. Nothing changes underneath — but the chord you are thinking about changes, and that alone gets you unstuck.",
      cards: [
        {
          name: "Em7",
          equals: "= Cmaj9 without the C",
          why: "E G B D. Three of those four notes are Cmaj7, and the fourth is the 9th. Comp <b>Em7</b> and let the bass supply the tonic — the iii chord is the oldest I substitute there is.",
          grips: [
            { label: "Comping grip", sub: "rootless", shape: [null,null,9,7,8,null], degs: [null,null,"5","♭7","♭3"] },
            { label: "With the root", sub: "Em7", shape: [null,7,9,7,8,null], degs: [null,"R","5","♭7","♭3"] }
          ]
        },
        {
          name: "Am7",
          equals: "= C6  ·  the same four notes",
          why: "A C E G is C6 spelled from the other end — not a substitute so much as the <b>same chord</b>. Which also makes it the softest possible deceptive resolution: the band hears vi, the listener hears home.",
          grips: [
            { label: "Comping grip", sub: "Am7", shape: [null,null,7,5,5,3], degs: [null,null,"R","♭3","5","♭7"] },
            { label: "With the root", sub: "Am7", shape: [5,null,5,5,5,null], degs: ["R",null,"♭7","♭3","5"] }
          ]
        },
        {
          name: "Cmaj7/G",
          equals: "second inversion",
          why: "Not one note has changed — only which one is lowest. Moving the bass through <b>C, E and G</b> across repeated bars keeps a static chord in motion without touching the harmony.",
          grips: [
            { label: "Comping grip", sub: "3 · 7 · R", shape: [null,null,2,4,1,null], degs: [null,null,"3","7","R"] },
            { label: "With G in the bass", sub: "Cmaj7/G", shape: [3,null,2,4,1,null], degs: ["5",null,"3","7","R"] }
          ]
        }
      ]
    },
    {
      title: "Land somewhere else",
      distance: 4,
      note: "The other way to stop repeating the I chord is to not arrive on it. All three of these take the G7 and put it somewhere the ear did not expect — and all three still leave you able to get back to C whenever you want.",
      cards: [
        {
          name: "A♭maj7",
          equals: "♭VI  ·  borrowed from C minor",
          why: "The classic surprise ending. G falls a half step to A♭ instead of resolving, and the C you were expecting is sitting right there inside the chord as the <b>3rd</b>. Add D on top for A♭maj7♯11.",
          grips: [
            { sp: "b", label: "Comping grip", sub: "7 · 3 · 5", shape: [null,null,5,5,4,null], degs: [null,null,"7","3","5"] },
            { sp: "b", label: "With the root", sub: "A♭maj7", shape: [4,null,5,5,4,null], degs: ["R",null,"7","3","5"] }
          ]
        },
        {
          name: "E♭maj7",
          equals: "♭III  ·  chromatic mediant",
          why: "Further out than ♭VI and it still contains a G. Play it where the tune would sit on Cmaj7 for a whole bar and slide back — this is the door into <b>Coltrane changes</b> if you want to keep going.",
          grips: [
            { sp: "b", startAt: 6, label: "Comping grip", sub: "5 · 7 · 3", shape: [null,null,8,7,8,null], degs: [null,null,"5","7","3"] },
            { sp: "b", label: "With the root", sub: "E♭maj7", shape: [null,6,8,7,8,null], degs: [null,"R","5","7","3"] }
          ]
        },
        {
          name: "C9",
          equals: "turn the tonic into a V",
          why: "Flatten the 7th and home becomes a dominant pointing at <b>F</b>. Every blues does this, and it is the cheapest way to make a repeated I chord lead somewhere instead of sitting.",
          grips: [
            { sp: "b", label: "Comping grip", sub: "3 · ♭7 · 9", shape: [null,null,2,3,3,null], degs: [null,null,"3","♭7","9"] },
            { sp: "b", label: "With the root", sub: "C9", shape: [null,3,2,3,3,null], degs: [null,"R","3","♭7","9"] }
          ]
        }
      ]
    },
    {
      title: "Two chords where there was one",
      distance: 5,
      note: "If the tune gives you a whole bar of Cmaj7 and you have run out of ideas, stop treating it as one chord. Half a bar of tonic and half a bar of something leaving is almost always better than a full bar of either.",
      cards: [
        {
          name: "Em7 – A7♭13",
          equals: "iii – VI7  ·  the turnaround engine",
          wide: true,
          why: "Em7 is the tonic in disguise; A7♭13 is the chord that makes Dm7 inevitable. Together they fill the I bar and hand the next one to the ii — which is where <b>every turnaround in Part Three</b> starts.",
          grips: [
            { label: "Comping grip", sub: "Em7", shape: [null,null,9,7,8,null], degs: [null,null,"5","♭7","♭3"] },
            { label: "With the root", sub: "Em7", shape: [null,7,9,7,8,null], degs: [null,"R","5","♭7","♭3"] },
            { label: "Comping grip", sub: "A7♭13", shape: [null,null,5,6,6,null], degs: [null,null,"♭7","3","♭13"] },
            { label: "With the root", sub: "A7♭13", shape: [5,null,5,6,6,null], degs: ["R",null,"♭7","3","♭13"] }
          ]
        }
      ]
    }
  ];

  /* ---------- PART II : chord melody ---------- */

  var WALKDOWN = {
    top: ["C", "B", "B♭", "A"],
    grips: [
      { sub: "C",      top: "C",  shape: [null,null,5,5,5,8], degs: [null,null,"5","R","3","R"] },
      { sub: "Cmaj7",  top: "B",  shape: [null,null,5,5,5,7], degs: [null,null,"5","R","3","7"] },
      { sub: "C7",     top: "B♭", sp: "b", shape: [null,null,5,5,5,6], degs: [null,null,"5","R","3","♭7"] },
      { sub: "C6",     top: "A",  shape: [null,null,5,5,5,5], degs: [null,null,"5","R","3","13"] }
    ]
  };

  var LOOKUP = [
    { top: "G",  sub: "Cmaj7",     shape: [null,null,2,4,1,3],    degs: [null,null,"3","7","R","5"] },
    { top: "A",  sub: "C6",        shape: [null,null,5,5,5,5],    degs: [null,null,"5","R","3","13"] },
    { top: "B",  sub: "Cmaj7",     shape: [null,null,5,5,5,7],    degs: [null,null,"5","R","3","7"] },
    { top: "C",  sub: "Cmaj7",     shape: [null,null,9,9,8,8],    degs: [null,null,"7","3","5","R"] },
    { top: "D",  sub: "Cmaj9",     shape: [null,null,10,9,8,10],  degs: [null,null,"R","3","5","9"] },
    { top: "E",  sub: "Cmaj7",     shape: [null,null,10,12,12,12],degs: [null,null,"R","5","7","3"] },
    { top: "F♯", sub: "Cmaj9♯11",  shape: [null,null,2,4,3,2],    degs: [null,null,"3","7","9","♯11"] }
  ];

  /* ---------- PART III : filling the time ---------- */

  var TURNAROUNDS = [
    { name: "I – VI – ii – V",   bars: ["Cmaj7", "A7♭13", "Dm7", "G7"],       note: "The default. A7♭13 rather than plain A7 — the F pulls down into Dm7's F." },
    { name: "iii – VI – ii – V", bars: ["Em7", "A7", "Dm7", "G7"],            note: "Same motion, but bar one never states the tonic. Smoother under a soloist." },
    { name: "Chromatic",         bars: ["Em7", "E♭7", "Dm7", "D♭7"],          note: "Tritone-sub every dominant. The bass walks E – E♭ – D – D♭ – C." },
    { name: "Deceptive",         bars: ["Cmaj7", "A♭maj7", "Dm7", "G7"],      note: "One bar of ♭VI before the ii–V rights the ship." },
    { name: "Backdoor loop",     bars: ["Cmaj7", "Fm7", "B♭7", "Cmaj7"],      note: "Leaves C major entirely and comes back through the side door." },
    { name: "Coltrane",          bars: ["Cmaj7", "E♭7", "A♭maj7", "B7"],      note: "Major thirds down. Resolves to Emaj7, then G7 brings you home." }
  ];

  var TRIADS = [
    { name: "C",  over: "R · 3 · 5",     shape: [null,null,10,9,8,null],  degs: [null,null,"R","3","5"] },
    { name: "Em", over: "3 · 5 · 7",     shape: [null,null,9,9,8,null],   degs: [null,null,"7","3","5"] },
    { name: "G",  over: "5 · 7 · 9",     shape: [null,null,12,12,12,null],degs: [null,null,"9","5","7"] },
    { name: "Am", over: "13 · R · 3",    shape: [null,null,7,5,5,null],   degs: [null,null,"13","R","3"] },
    { name: "Bm", over: "7 · 9 · ♯11",   shape: [null,null,9,7,7,null],   degs: [null,null,"7","9","♯11"] },
    { name: "D",  over: "9 · ♯11 · 13",  shape: [null,null,12,11,10,null],degs: [null,null,"9","♯11","13"] }
  ];

  /* ---------- PART IV : soloing ---------- */

  var BOXES = [
    {
      name: "C major pentatonic",
      over: "R · 9 · 3 · 5 · 13",
      why: "The safe one. No B, no F — nothing that can rub against anything. Also the plainest: it says the chord and stops there.",
      start: 5,
      rows: [
        [{f:5,d:"13"},{f:8,d:"R"}],
        [{f:5,d:"9"},{f:7,d:"3"}],
        [{f:5,d:"5"},{f:7,d:"13"}],
        [{f:5,d:"R"},{f:7,d:"9"}],
        [{f:5,d:"3"},{f:8,d:"5"}],
        [{f:5,d:"13"},{f:8,d:"R"}]
      ]
    },
    {
      name: "G major pentatonic",
      over: "5 · 13 · 7 · 9 · 3",
      why: "Same five-note shape, rooted a fifth up. Every note lands on a colour tone and the root never appears — which is exactly why it floats. This is the one to learn first.",
      start: 7,
      rows: [
        [{f:7,d:"7"},{f:10,d:"9"}],
        [{f:7,d:"3"},{f:10,d:"5"}],
        [{f:7,d:"13"},{f:9,d:"7"}],
        [{f:7,d:"9"},{f:9,d:"3"}],
        [{f:8,d:"5"},{f:10,d:"13"}],
        [{f:7,d:"7"},{f:10,d:"9"}]
      ]
    },
    {
      name: "D major pentatonic",
      over: "9 · 3 · ♯11 · 13 · 7",
      why: "One more fifth up and the F♯ arrives. Pure Lydian, no root, no fifth — the brightest thing you can play over Cmaj7 while still sounding like you meant it.",
      start: 9,
      rows: [
        [{f:10,d:"9"},{f:12,d:"3"}],
        [{f:9,d:"♯11"},{f:12,d:"13"}],
        [{f:9,d:"7"},{f:12,d:"9"}],
        [{f:9,d:"3"},{f:11,d:"♯11"}],
        [{f:10,d:"13"},{f:12,d:"7"}],
        [{f:10,d:"9"},{f:12,d:"3"}]
      ]
    }
  ];

  /* ---------- fretboard ---------- */

  /* ---------- dom helpers ---------- */

  function gripEl(g, topLabel) {
    var w = el("div", "grip");
    if (topLabel) w.appendChild(el("p", "topnote", topLabel + "<span>top note</span>"));
    w.appendChild(diagram(g.shape, g.degs, g.startAt));
    w.appendChild(el("p", "grip-label", "<b>" + g.sub + "</b>" + (g.label || "")));
    w.appendChild(el("p", "pitches", pitchesOf(g.shape, g.sp).join(" ")));
    return w;
  }

  /* ---------- part I ---------- */

  var subsRoot = document.getElementById("subs");

  SUBS.forEach(function (band) {
    var section = el("section", "band");
    var head = el("div", "band-head");
    head.appendChild(el("h3", null, band.title));

    var dist = el("div", "distance");
    dist.appendChild(el("span", null, "distance from Cmaj7"));
    var pips = el("span", "pips");
    for (var p = 1; p <= 5; p++) pips.appendChild(el("span", "pip" + (p <= band.distance ? " on" : "")));
    dist.appendChild(pips);
    head.appendChild(dist);
    head.appendChild(el("p", "band-note", band.note));
    section.appendChild(head);

    var cards = el("div", "cards");
    band.cards.forEach(function (card) {
      var c = el("article", "card" + (card.wide ? " wide" : ""));
      var ch = el("div", "card-head");
      ch.appendChild(el("h4", "chord-name", card.name));
      ch.appendChild(el("p", "equals", card.equals));
      c.appendChild(ch);
      c.appendChild(el("p", "why", card.why));
      var grips = el("div", "grips");
      card.grips.forEach(function (g) { grips.appendChild(gripEl(g)); });
      c.appendChild(grips);
      cards.appendChild(c);
    });
    section.appendChild(cards);
    subsRoot.appendChild(section);
  });

  /* ---------- part II ---------- */

  var walk = document.getElementById("walkdown");
  WALKDOWN.grips.forEach(function (g) { walk.appendChild(gripEl(g, g.top)); });

  var look = document.getElementById("lookup");
  LOOKUP.forEach(function (g) { look.appendChild(gripEl(g, g.top)); });

  /* ---------- part III ---------- */

  var tb = document.getElementById("turnarounds");
  TURNAROUNDS.forEach(function (t) {
    var tr = el("tr");
    tr.appendChild(el("td", "name", t.name));
    var td = el("td");
    var bars = el("div", "bars");
    t.bars.forEach(function (b) { bars.appendChild(el("span", "bar", b)); });
    td.appendChild(bars);
    tr.appendChild(td);
    tr.appendChild(el("td", null, t.note));
    tb.appendChild(tr);
  });

  var tri = document.getElementById("triads");
  TRIADS.forEach(function (t) {
    var m = el("div", "mini");
    m.appendChild(el("p", "mini-name", t.name));
    m.appendChild(diagram(t.shape, t.degs));
    m.appendChild(el("p", "pitches", t.over));
    tri.appendChild(m);
  });

  /* ---------- part IV ---------- */

  var boxRoot = document.getElementById("boxes");
  BOXES.forEach(function (b) {
    var wrap = el("div");
    wrap.style.display = "flex";
    wrap.style.flexDirection = "column";
    wrap.style.gap = "12px";

    var head = el("div", "box-head");
    head.appendChild(el("h4", null, b.name));
    head.appendChild(el("p", "pitches", "over C:  " + b.over));
    wrap.appendChild(head);

    var body = el("div", "box-body");
    body.appendChild(scaleDiagram(b.rows, b.start));
    wrap.appendChild(body);

    wrap.appendChild(el("p", null, b.why));
    wrap.lastChild.style.fontSize = "0.92rem";
    wrap.lastChild.style.color = "var(--ink-soft)";
    wrap.lastChild.style.margin = "0";

    boxRoot.appendChild(wrap);
  });
})();
