/* layout.js - page types shared by more than one sheet.

   renderBands(mountId, DATA, opts)
     The "bands of cards" page: sheets 1 and 2, and the shape any new
     substitution sheet should use. DATA is an array of bands:

       [{ title, distance: 1..5, note, cards: [
            { name, equals, why, wide?, grips: [
                { sub, label, shape, degs, sp?, startAt? } ] } ] }]

     opts.distanceLabel is the caption beside the distance pips,
     e.g. "distance from Dm7".

   Attaches itself to the JG namespace defined by fretboard.js, which must
   therefore load first.
*/

(function (JG) {
  "use strict";

  var diagram = JG.diagram, pitchesOf = JG.pitchesOf, el = JG.el;

  function renderBands(mountId, DATA, opts) {
    opts = opts || {};
      var root = document.getElementById(mountId);
      var bandsWrap = el("div");
      bandsWrap.style.display = "flex";
      bandsWrap.style.flexDirection = "column";
      bandsWrap.style.gap = "56px";

      DATA.forEach(function (band) {
        var section = el("section", "band");

        var head = el("div", "band-head");
        head.appendChild(el("h2", null, band.title));

        var dist = el("div", "distance");
        dist.appendChild(el("span", null, opts.distanceLabel));
        var pips = el("span", "pips");
        for (var p = 1; p <= 5; p++) {
          pips.appendChild(el("span", "pip" + (p <= band.distance ? " on" : "")));
        }
        dist.appendChild(pips);
        head.appendChild(dist);
        head.appendChild(el("p", "band-note", band.note));
        section.appendChild(head);

        var cards = el("div", "cards");

        band.cards.forEach(function (card) {
          var c = el("article", "card" + (card.wide ? " wide" : ""));
          var ch = el("div", "card-head");
          ch.appendChild(el("h3", "chord-name", card.name));
          ch.appendChild(el("p", "equals", card.equals));
          c.appendChild(ch);
          c.appendChild(el("p", "why", card.why));

          var grips = el("div", "grips");
          card.grips.forEach(function (g) {
            var wrapG = el("div", "grip");
            wrapG.appendChild(diagram(g.shape, g.degs, g.startAt));
            wrapG.appendChild(el("p", "grip-label", "<b>" + g.sub + "</b>" + g.label));
            wrapG.appendChild(el("p", "pitches", pitchesOf(g.shape, g.sp).join(" ")));
            grips.appendChild(wrapG);
          });
          c.appendChild(grips);
          cards.appendChild(c);
        });

        section.appendChild(cards);
        bandsWrap.appendChild(section);
      });

      root.appendChild(bandsWrap);
  }

  JG.renderBands = renderBands;
})(window.JG);
