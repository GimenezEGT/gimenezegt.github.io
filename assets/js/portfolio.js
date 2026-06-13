/*
 * Portfolio-page JS — progressive enhancement only (Constitution Principle I).
 * Loaded `defer`, only on portfolio-world pages (see head.html). Card hover is
 * pure CSS; this module adds the hero typing animation (FR-004), gated by
 * `prefers-reduced-motion` via the shared Site helper from main.js.
 */
(function () {
  "use strict";

  var reduced =
    window.Site && typeof window.Site.prefersReducedMotion === "function"
      ? window.Site.prefersReducedMotion()
      : false;

  // ---- Hero typing animation (FR-004) -------------------------------------
  // The full tagline is already in the markup, so it is the no-JS /
  // reduced-motion fallback. When motion is allowed, retype it
  // character-by-character behind a blinking caret (the caret is CSS).
  var target = document.querySelector("[data-typed]");
  if (target && !reduced) {
    var full = target.textContent;
    target.textContent = "";
    target.classList.add("is-typing");

    var i = 0;
    (function tick() {
      target.textContent = full.slice(0, i);
      if (i < full.length) {
        i += 1;
        window.setTimeout(tick, 45);
      } else {
        target.classList.remove("is-typing");
        target.classList.add("is-typed");
      }
    })();
  }
})();
