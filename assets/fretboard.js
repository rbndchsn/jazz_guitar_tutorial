/* fretboard.js - shared chord-diagram renderer.
   Extracted verbatim from the original sheets; the drawing maths is unchanged.

   Everything is exposed on ONE global, JG - the only name this site puts on
   window. A consumer takes what it needs at the top of its own closure:

       var diagram = JG.diagram, el = JG.el;

   API: SHARP FLAT OPEN FRETS G_CHORD G_SCALE SW
        svgEl gridSvg dot diagram scaleDiagram pitchesOf el
        renderBands (added by layout.js) */

(function (global) {
  "use strict";

  var SHARP = ["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"];

  var FLAT  = ["C","D♭","D","E♭","E","F","G♭","G","A♭","A","B♭","B"];

  var OPEN = [4, 9, 2, 7, 11, 4];

  function pitchesOf(shape, sp) {
    var set = sp === "b" ? FLAT : SHARP, out = [];
    for (var i = 0; i < 6; i++) {
      if (shape[i] === null || shape[i] === undefined) continue;
      out.push(set[(OPEN[i] + shape[i]) % 12]);
    }
    return out;
  }

  var FRETS = 5;

  var G_CHORD = { sw: 20, fh: 24, padL: 30, padR: 10, padT: 23, padB: 4, r: 8.8 };

  var G_SCALE = { sw: 25, fh: 29, padL: 38, padR: 12, padT: 14, padB: 5, r: 9.2 };

  var SW = G_CHORD.sw, FH = G_CHORD.fh, PAD_T = G_CHORD.padT;

  function svgEl(name, attrs) {
    var e = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function gridSvg(showNut, start, g) {
    g = g || G_CHORD;
    var w = g.padL + g.sw * 5 + g.padR;
    var h = g.padT + g.fh * FRETS + g.padB;
    var svg = svgEl("svg", { width: w, height: h, viewBox: "0 0 " + w + " " + h, role: "img", "aria-hidden": "true" });
    var x = function (i) { return g.padL + i * g.sw; };
    var y = function (r) { return g.padT + r * g.fh; };

    for (var f = 0; f <= FRETS; f++) {
      svg.appendChild(svgEl("line", { x1: x(0), y1: y(f), x2: x(5), y2: y(f),
        stroke: "var(--grid)", "stroke-width": 1, "stroke-opacity": 0.55 }));
    }
    if (showNut) {
      svg.appendChild(svgEl("line", { x1: x(0) - 0.5, y1: y(0), x2: x(5) + 0.5, y2: y(0),
        stroke: "var(--nut)", "stroke-width": 4, "stroke-linecap": "square" }));
    } else {
      var pos = svgEl("text", { x: x(0) - 5, y: y(0) + g.fh / 2 + 3.5, "text-anchor": "end",
        fill: "var(--ink-faint)", "font-family": "'IBM Plex Mono', monospace", "font-size": 9.5 });
      pos.textContent = start + "fr";
      svg.appendChild(pos);
    }
    for (var i = 0; i < 6; i++) {
      svg.appendChild(svgEl("line", { x1: x(i), y1: y(0), x2: x(i), y2: y(FRETS),
        stroke: "var(--grid)", "stroke-width": i === 0 ? 1.5 : 1, "stroke-opacity": 0.7 }));
    }
    svg._x = x; svg._y = y; svg._g = g;
    return svg;
  }

  function dot(svg, sIdx, row, deg, isRoot) {
    var g = svg._g, r = g.r;
    var cx = svg._x(sIdx), cy = svg._y(row) + g.fh / 2;
    svg.appendChild(svgEl("circle", { cx: cx, cy: cy, r: r,
      fill: isRoot ? "var(--accent)" : "var(--grid)" }));
    var size = deg.length > 2 ? r * 0.80 : (deg.length > 1 ? r * 0.90 : r * 0.96);
    var t = svgEl("text", { x: cx, y: cy, "text-anchor": "middle", "dominant-baseline": "central",
      fill: "var(--dot-ink)", "font-family": "'IBM Plex Mono', monospace",
      "font-size": size.toFixed(1), "font-weight": 600 });
    t.textContent = deg;
    svg.appendChild(t);
  }

  function diagram(shape, degs, startAt) {
    var fretted = [];
    for (var i = 0; i < 6; i++) if (typeof shape[i] === "number" && shape[i] > 0) fretted.push(shape[i]);
    var minF = Math.min.apply(null, fretted), maxF = Math.max.apply(null, fretted);
    var showNut = minF <= 2 && maxF <= FRETS;
    var start = showNut ? 1 : minF;
    if (startAt && !showNut) start = startAt;

    var svg = gridSvg(showNut, start, G_CHORD);

    for (var j = 0; j < 6; j++) {
      var v = shape[j], deg = degs[j] || "", isRoot = deg === "R";
      if (v === null || v === undefined) {
        var m = svgEl("text", { x: svg._x(j), y: PAD_T - 7, "text-anchor": "middle",
          fill: "var(--ink-faint)", "font-family": "'IBM Plex Mono', monospace", "font-size": 12 });
        m.textContent = "\u00d7";
        svg.appendChild(m);
        continue;
      }
      if (v === 0) {
        svg.appendChild(svgEl("circle", { cx: svg._x(j), cy: PAD_T - 11.5, r: 6.4,
          fill: isRoot ? "var(--accent)" : "none",
          stroke: isRoot ? "var(--accent)" : "var(--grid)", "stroke-width": 1.4 }));
        var o = svgEl("text", { x: svg._x(j), y: PAD_T - 11.5, "text-anchor": "middle",
          fill: isRoot ? "var(--dot-ink)" : "var(--ink-soft)",
          "font-family": "'IBM Plex Mono', monospace",
          "font-size": deg.length > 1 ? 6.4 : 7.4, "font-weight": 600, "dominant-baseline": "central" });
        o.textContent = deg;
        svg.appendChild(o);
        continue;
      }
      dot(svg, j, v - start, deg, isRoot);
    }
    return svg;
  }

  function scaleDiagram(rows, start) {
    var svg = gridSvg(false, start, G_SCALE);
    for (var i = 0; i < 6; i++) {
      rows[i].forEach(function (n) { dot(svg, i, n.f - start, n.d, n.d === "R"); });
    }
    return svg;
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  /* the only global this site defines */
  global.JG = {
    SHARP: SHARP,
    FLAT: FLAT,
    OPEN: OPEN,
    FRETS: FRETS,
    G_CHORD: G_CHORD,
    G_SCALE: G_SCALE,
    SW: SW,
    svgEl: svgEl,
    gridSvg: gridSvg,
    dot: dot,
    diagram: diagram,
    scaleDiagram: scaleDiagram,
    pitchesOf: pitchesOf,
    el: el
  };
})(typeof window !== "undefined" ? window : globalThis);
