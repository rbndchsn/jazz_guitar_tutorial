(function () {
  "use strict";

  var diagram = JG.diagram, pitchesOf = JG.pitchesOf, el = JG.el;

  var VERSIONS = [
    {
      n: "Version one",
      name: "Let the Top String Sing",
      tag: "same chords · new melody",
      why: "Not one chord has changed. The high E string is unmuted and given a line: <b>E – F – G – G – A – G – F – F – E</b>, an arch that climbs to the 13th in bar five and walks back down through the cadence. Every note is diatonic and every grip is one you already play.",
      chart: [["Cmaj7"],["Fmaj7"],["Cmaj7"],["Fmaj7"],["Cmaj7"],["Fmaj7"],["Dm7","G7"],["Cmaj7"],["Em7","A7"],["Dm7","G7"],["Cmaj7"],["Dm7","G7"]],
      listen: "Bar 8 is the only structural change — the G7 now resolves, so the first half becomes a complete sentence. Notice that <b>Dm7 and G7 already have F on top</b> in the shapes you use, so the melody sits still across the whole cadence and then falls to E. That is a 4–3 suspension, the oldest resolution in music, and you get it for free.",
      grips: [
        { bar: 1, sub: "Cmaj7", top: "E", shape: [null,3,2,0,0,0], degs: [null,"R","3","5","7","3"] },
        { bar: 2, sub: "Fmaj7", top: "F", shape: [1,null,2,2,1,1], degs: ["R",null,"7","3","5","R"] },
        { bar: 3, sub: "Cmaj7", top: "G", shape: [null,3,2,0,0,3], degs: [null,"R","3","5","7","5"] },
        { bar: 4, sub: "Fmaj9", top: "G", shape: [1,null,2,2,1,3], degs: ["R",null,"7","3","5","9"] },
        { bar: 5, sub: "Cmaj13", top: "A", shape: [null,3,2,0,0,5], degs: [null,"R","3","5","7","13"] },
        { bar: 6, sub: "Fmaj9", top: "G", shape: [1,null,2,2,1,3], degs: ["R",null,"7","3","5","9"] },
        { bar: 7, sub: "Dm7", top: "F", shape: [null,null,0,2,1,1], degs: [null,null,"R","5","♭7","♭3"] },
        { bar: 7, sub: "G7", top: "F", shape: [3,null,0,0,0,1], degs: ["R",null,"5","R","3","♭7"] },
        { bar: 8, sub: "Cmaj7", top: "E", shape: [null,3,2,0,0,0], degs: [null,"R","3","5","7","3"] },
        { bar: 9, sub: "Em7", top: "G", shape: [0,2,0,0,0,3], degs: ["R","5","♭7","♭3","5","♭3"] },
        { bar: 9, sub: "A7", top: "G", shape: [null,0,2,0,2,3], degs: [null,"R","5","♭7","3","♭7"] },
        { bar: 10, sub: "Dm7", top: "F", shape: [null,null,0,2,1,1], degs: [null,null,"R","5","♭7","♭3"] },
        { bar: 10, sub: "G7", top: "F", shape: [3,null,0,0,0,1], degs: ["R",null,"5","R","3","♭7"] },
        { bar: 11, sub: "Cmaj7", top: "E", shape: [null,3,2,0,0,0], degs: [null,"R","3","5","7","3"] }
      ]
    },
    {
      n: "Version two",
      name: "Borrowed Light",
      tag: "one chord darker",
      why: "Bar six becomes <b>Fm7</b> — the minor iv, borrowed from C minor. From your Fmaj7 grip you drop strings four and three one fret each and it turns into a barre. The melody note above it is A♭, the darkest note on the page, arriving after five bars of unbroken major.",
      chart: [["Cmaj7"],["Fmaj7"],["Cmaj7"],["Fmaj7"],["Cmaj7"],["Fm7*"],["Dm7","G7"],["Cmaj7"],["Em7","A7♭13*"],["Dm7","G7"],["Cmaj7"],["Dm7","G7"]],
      listen: "The melody now falls from the start — A, G, G, F, G, A♭ — so the A♭ in bar six lands as the bottom of a descent rather than a shock. And the A7 in bar nine takes a ♭13, which is F: the same note you have been leaning on the whole time. Nothing new arrives, an old note just turns bitter.",
      grips: [
        { bar: 1, sub: "Cmaj13", top: "A", shape: [null,3,2,0,0,5], degs: [null,"R","3","5","7","13"] },
        { bar: 2, sub: "Fmaj9", top: "G", shape: [1,null,2,2,1,3], degs: ["R",null,"7","3","5","9"] },
        { bar: 3, sub: "Cmaj7", top: "G", shape: [null,3,2,0,0,3], degs: [null,"R","3","5","7","5"] },
        { bar: 4, sub: "Fmaj7", top: "F", shape: [1,null,2,2,1,1], degs: ["R",null,"7","3","5","R"] },
        { bar: 5, sub: "Cmaj7", top: "G", shape: [null,3,2,0,0,3], degs: [null,"R","3","5","7","5"] },
        { bar: 6, sub: "Fm7", top: "A♭", sp: "b", shape: [1,null,1,1,1,4], degs: ["R",null,"♭7","♭3","5","♭3"] },
        { bar: 7, sub: "Dm7", top: "F", shape: [null,null,0,2,1,1], degs: [null,null,"R","5","♭7","♭3"] },
        { bar: 7, sub: "G7", top: "F", shape: [3,null,0,0,0,1], degs: ["R",null,"5","R","3","♭7"] },
        { bar: 8, sub: "Cmaj7", top: "E", shape: [null,3,2,0,0,0], degs: [null,"R","3","5","7","3"] },
        { bar: 9, sub: "Em7", top: "G", shape: [0,2,0,0,0,3], degs: ["R","5","♭7","♭3","5","♭3"] },
        { bar: 9, sub: "A7♭13", top: "F", shape: [null,0,2,0,2,1], degs: [null,"R","5","♭7","3","♭13"] },
        { bar: 10, sub: "Dm7", top: "F", shape: [null,null,0,2,1,1], degs: [null,null,"R","5","♭7","♭3"] },
        { bar: 10, sub: "G7", top: "F", shape: [3,null,0,0,0,1], degs: ["R",null,"5","R","3","♭7"] },
        { bar: 11, sub: "Cmaj7", top: "E", shape: [null,3,2,0,0,0], degs: [null,"R","3","5","7","3"] }
      ]
    },
    {
      n: "Version three",
      name: "The Hand Walks Down",
      tag: "chromatic turnaround",
      why: "The first eight bars are version two. The turnaround is rebuilt from the tritone substitutions on sheet two: <b>Em7 – E♭7 – Dm7 – D♭7 – Cmaj7</b>. Every chord sits one fret below the last, so the whole turnaround is a single shape walking down the neck from the 7th fret to the 3rd.",
      chart: [["Cmaj7"],["Fmaj7"],["Cmaj7"],["Fmaj7"],["Cmaj7"],["Fm7*"],["Dm7","G7"],["Cmaj7"],["Em7","E♭7*"],["Dm7","D♭7*"],["Cmaj7"],["Dm7","G7"]],
      listen: "You do not have to invent the melody here — the walk-down produces it. The top note of those five shapes is G, G, F, F, E: the same guide-tone descent as version one, arriving automatically because each substitute shares its tritone with the chord it replaces. The bass walks E – E♭ – D – D♭ – C, all half steps, straight into the tonic.",
      grips: [
        { bar: 1, sub: "Cmaj7", top: "E", shape: [null,3,2,0,0,0], degs: [null,"R","3","5","7","3"] },
        { bar: 2, sub: "Fmaj7", top: "E", shape: [1,null,2,2,1,0], degs: ["R",null,"7","3","5","7"] },
        { bar: 3, sub: "Cmaj7", top: "G", shape: [null,3,2,0,0,3], degs: [null,"R","3","5","7","5"] },
        { bar: 4, sub: "Fmaj9", top: "G", shape: [1,null,2,2,1,3], degs: ["R",null,"7","3","5","9"] },
        { bar: 5, sub: "Cmaj13", top: "A", shape: [null,3,2,0,0,5], degs: [null,"R","3","5","7","13"] },
        { bar: 6, sub: "Fm7", top: "A♭", sp: "b", shape: [1,null,1,1,1,4], degs: ["R",null,"♭7","♭3","5","♭3"] },
        { bar: 7, sub: "Dm7", top: "F", shape: [null,null,0,2,1,1], degs: [null,null,"R","5","♭7","♭3"] },
        { bar: 7, sub: "G7", top: "F", shape: [3,null,0,0,0,1], degs: ["R",null,"5","R","3","♭7"] },
        { bar: 8, sub: "Cmaj7", top: "E", shape: [null,3,2,0,0,0], degs: [null,"R","3","5","7","3"] },
        { bar: 9, sub: "Em7", top: "G", shape: [null,7,9,7,8,null], degs: [null,"R","5","♭7","♭3",null] },
        { bar: 9, sub: "E♭7", top: "G", sp: "b", shape: [null,6,8,6,8,null], degs: [null,"R","5","♭7","3",null] },
        { bar: 10, sub: "Dm7", top: "F", shape: [null,5,7,5,6,null], degs: [null,"R","5","♭7","♭3",null] },
        { bar: 10, sub: "D♭7", top: "F", sp: "b", shape: [null,4,6,4,6,null], degs: [null,"R","5","♭7","3",null] },
        { bar: 11, sub: "Cmaj7", top: "E", shape: [null,3,5,4,5,null], degs: [null,"R","5","7","3",null] }
      ]
    }
  ];
  /* ---------- fretboard ---------- */

  /* ---------- dom helpers ---------- */

  function chart(bars) {
    var wrap = el("div", "chart");
    for (var r = 0; r < bars.length; r += 4) {
      var row = el("div", "chart-row");
      for (var i = r; i < Math.min(r + 4, bars.length); i++) {
        var changed = bars[i].some(function (c) { return c.slice(-1) === "*"; });
        var bar = el("div", "chart-bar" + (changed ? " new" : ""));
        bar.appendChild(el("span", "num", String(i + 1)));
        var cs = el("div", "chords");
        bars[i].forEach(function (c) {
          cs.appendChild(el("span", "ch", c.replace(/\*$/, "")));
        });
        bar.appendChild(cs);
        row.appendChild(bar);
      }
      wrap.appendChild(row);
    }
    return wrap;
  }

  function melodyStrip(grips) {
    var m = el("div", "mel");
    m.appendChild(el("span", "mel-label", "melody"));
    grips.forEach(function (g, i) {
      if (i && grips[i - 1].top === g.top) m.appendChild(el("span", "tie", "—"));
      m.appendChild(el("span", "note", g.top));
    });
    return m;
  }

  function gripEl(g) {
    var w = el("div", "grip");
    w.appendChild(el("p", "topnote", g.top + "<span>bar " + g.bar + "</span>"));
    w.appendChild(diagram(g.shape, g.degs, g.startAt));
    w.appendChild(el("p", "grip-label", "<b>" + g.sub + "</b>"));
    w.appendChild(el("p", "pitches", pitchesOf(g.shape, g.sp).join(" ")));
    return w;
  }

  /* ---------- render ---------- */

  var root = document.getElementById("versions");

  VERSIONS.forEach(function (v) {
    var sec = el("section", "section");

    var part = el("div", "part");
    part.appendChild(el("p", "part-q", v.n));
    part.appendChild(el("h2", "part-title", v.name));
    part.appendChild(el("p", "part-sum", v.why));
    sec.appendChild(part);

    var p1 = el("div", "panel");
    p1.appendChild(el("h4", null, "The chart"));
    p1.appendChild(el("p", "barlabel", v.tag));
    p1.appendChild(chart(v.chart));
    p1.appendChild(melodyStrip(v.grips));
    sec.appendChild(p1);

    var p2 = el("div", "panel");
    p2.appendChild(el("h4", null, "Bar by bar"));
    p2.appendChild(el("p", null, "Bar 12 is the turnaround — play bar 10 again."));
    var chain = el("div", "chain");
    v.grips.forEach(function (g) { chain.appendChild(gripEl(g)); });
    p2.appendChild(chain);
    p2.appendChild(el("p", null, v.listen));
    sec.appendChild(p2);

    root.appendChild(sec);
  });
})();
