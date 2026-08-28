/* sitebar.js - the persistent bar, built from one list.
   To add a page to the whole site, add one line to NAV. Nothing else. */
(function () {
  "use strict";

  var NAV = [
    { href: "index.html",                     label: "Home",               deg: "index" },
    { href: "1iichordDm7substitutions.html",  label: "Dm7 substitutions",  deg: "ii" },
    { href: "2VchordG7substitutions.html",    label: "G7 substitutions",   deg: "V" },
    { href: "3IchordCmaj7strategies.html",    label: "Cmaj7 strategies",   deg: "I" },
    { href: "4threearrangements.html",        label: "Three arrangements", deg: "vamp" }
  ];

  var TITLE = 'Getting Out of <em>ii–V–I</em>';

  var LOGO =
    '<svg class="sitebar-logo" width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">' +
      '<g stroke="currentColor" stroke-opacity="0.85">' +
        '<line x1="4" y1="4" x2="18" y2="4" stroke-width="2"/>' +
        '<line x1="4" y1="10" x2="18" y2="10" stroke-width="1"/>' +
        '<line x1="4" y1="16" x2="18" y2="16" stroke-width="1"/>' +
        '<line x1="4" y1="4" x2="4" y2="16" stroke-width="1"/>' +
        '<line x1="11" y1="4" x2="11" y2="16" stroke-width="1"/>' +
        '<line x1="18" y1="4" x2="18" y2="16" stroke-width="1"/>' +
      '</g>' +
      '<circle cx="11" cy="13" r="3.2" fill="var(--accent)"/>' +
    '</svg>';

  var page = location.pathname.split("/").pop() || "index.html";

  var links = NAV.map(function (n) {
    return '<a href="' + n.href + '"' +
           (n.href === page ? ' aria-current="page"' : '') + '>' +
           n.label + ' <span class="sitebar-deg">' + n.deg + '</span></a>';
  }).join("");

  var bar = document.createElement("header");
  bar.className = "sitebar";
  bar.innerHTML =
    '<a class="sitebar-home" href="index.html" aria-label="Getting Out of ii–V–I — home">' +
      LOGO + '<span class="sitebar-title">' + TITLE + '</span>' +
    '</a>' +
    '<button class="sitebar-burger" id="sitebar-toggle" type="button" aria-expanded="false" ' +
      'aria-controls="sitebar-menu" aria-label="Menu"><span></span><span></span><span></span></button>' +
    '<nav class="sitebar-menu" id="sitebar-menu" aria-label="Site navigation">' + links + '</nav>';

  document.body.insertBefore(bar, document.body.firstChild);

  var toggle = document.getElementById("sitebar-toggle");
  var menu = document.getElementById("sitebar-menu");

  function close() {
    menu.classList.remove("sitebar-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = menu.classList.toggle("sitebar-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("click", function (e) { if (!menu.contains(e.target)) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();
