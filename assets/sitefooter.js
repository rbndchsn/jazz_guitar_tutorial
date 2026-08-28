/* sitefooter.js - the colophon, on every page.
   Site chrome, like sitebar.js: written once here, never in a page.
   It appends itself to the page's .wrap so it inherits that page's
   width and vertical rhythm. */
(function () {
  "use strict";

  var HTML =
    '<h2>How this site is made</h2>' +

    '<p><b>A partnership.</b> One guitarist and an AI language model, working together on a ' +
    'course of study that no book was going to fit — built around what this particular player ' +
    'already knows, what he keeps getting wrong, and what he wants to be able to do next. The ' +
    'sheets are a customised learning path, not a syllabus, and they are meant to scale and to ' +
    'keep evolving as the questions change.</p>' +

    '<p><b>The stack, in full.</b> Prompts typed by a human into a folder in VS Code, wired to ' +
    '<b>Claude Code</b>, which writes the pages. The folder is a free GitHub repository, ' +
    'published as-is by GitHub Pages. No build step, no framework, no database, no analytics, ' +
    'no accounts — static HTML pages over a handful of shared stylesheets and scripts. The only ' +
    'thing loaded from elsewhere is the typeface.</p>' +

    '<p><b>What it is not.</b> It is not a substitute for a teacher, for ear training, or for ' +
    'the hours. Nothing here replaces human proficiency and nothing here is trying to — an LLM ' +
    'can lay out the fretboard quickly and tirelessly, but it cannot practise for you, and it ' +
    'does not know what your hands can reach.</p>' +

    '<p class="fineprint">Free to read, free to copy, taken <em>as is</em>. Any error in the ' +
    'harmony is procedural — an artefact of how these pages are generated, not a claim anyone ' +
    'stands behind. Check it at the fretboard before you trust it. ' +
    'Take it or leave it. Such is the way.</p>';

  var footer = document.createElement("footer");
  footer.className = "colophon";
  footer.innerHTML = HTML;

  var host = document.querySelector(".wrap") || document.body;
  host.appendChild(footer);
})();
