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

  // ---- Project-card particle effect (FR-006) ------------------------------
  // Pure flourish: a tiny capped node-graph that plays on hover. Pointer devices
  // with motion only — never on touch or reduced motion; never affects content.
  var finePointer =
    window.matchMedia && window.matchMedia("(pointer: fine)").matches;
  if (finePointer && !reduced) {
    var accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-terminal")
        .trim() || "#4ade80";

    var cards = document.querySelectorAll(".projects__grid .card");
    Array.prototype.forEach.call(cards, function (card) {
      var canvas, ctx, raf, nodes;

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < nodes.length; i++) {
          var n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
          if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

          ctx.globalAlpha = 0.7;
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
          ctx.fill();

          for (var j = i + 1; j < nodes.length; j++) {
            var m = nodes[j];
            var dx = n.x - m.x;
            var dy = n.y - m.y;
            if (dx * dx + dy * dy < 3600) {
              ctx.globalAlpha = 0.16;
              ctx.strokeStyle = accent;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(m.x, m.y);
              ctx.stroke();
            }
          }
        }
        raf = window.requestAnimationFrame(draw);
      }

      function start() {
        if (canvas) return;
        var rect = card.getBoundingClientRect();
        canvas = document.createElement("canvas");
        canvas.className = "card__particles";
        canvas.setAttribute("aria-hidden", "true");
        canvas.width = rect.width;
        canvas.height = rect.height;
        card.appendChild(canvas);
        ctx = canvas.getContext("2d");
        nodes = [];
        for (var i = 0; i < 14; i++) {
          nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4
          });
        }
        draw();
      }

      function stop() {
        if (raf) window.cancelAnimationFrame(raf);
        if (canvas) {
          canvas.remove();
          canvas = null;
        }
      }

      card.addEventListener("pointerenter", start);
      card.addEventListener("pointerleave", stop);
    });
  }
})();
