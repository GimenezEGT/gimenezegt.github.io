/*
 * Blog-page JS — progressive enhancement only (Constitution Principle I).
 * Loaded `defer`, only on blog-world pages (see head.html). Adds three
 * behaviours, each with a no-JS fallback baked into the markup:
 *   1. Copy-to-clipboard on code blocks (FR-001).
 *   2. TOC active-section tracking — layered onto a server-rendered list (FR-002).
 *   3. Client-side tag filtering of the index (FR-003).
 */
(function () {
  "use strict";

  // ---- 1. Copy-to-clipboard (FR-001) --------------------------------------
  // Inject a button at runtime so JS-off pages have none and the code stays
  // selectable. Skip entirely when the Clipboard API is unavailable.
  if (navigator.clipboard && navigator.clipboard.writeText) {
    var blocks = document.querySelectorAll(".highlighter-rouge");
    Array.prototype.forEach.call(blocks, function (block) {
      var code = block.querySelector("code") || block.querySelector("pre");
      if (!code) return;

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-copy";
      btn.textContent = "Copy";
      btn.setAttribute("aria-label", "Copy code to clipboard");
      block.appendChild(btn);

      var resetTimer;
      btn.addEventListener("click", function () {
        navigator.clipboard.writeText(code.textContent).then(function () {
          btn.textContent = "Copied";
          btn.classList.add("is-copied");
          window.clearTimeout(resetTimer);
          resetTimer = window.setTimeout(function () {
            btn.textContent = "Copy";
            btn.classList.remove("is-copied");
          }, 2000);
        });
      });
    });
  }

  // ---- 2. TOC active-section tracking (FR-002) ----------------------------
  // The list is already server-rendered; we only highlight the section in view.
  var toc = document.querySelector("[data-toc]");
  if (toc && "IntersectionObserver" in window) {
    var links = Array.prototype.slice.call(toc.querySelectorAll("a[href^='#']"));
    if (links.length >= 2) {
      var byId = {};
      var headings = [];
      links.forEach(function (link) {
        var id = decodeURIComponent(link.getAttribute("href").slice(1));
        var el = document.getElementById(id);
        if (el) {
          byId[id] = link;
          headings.push(el);
        }
      });

      var current = null;
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var link = byId[entry.target.id];
            if (!link || link === current) return;
            if (current) current.removeAttribute("aria-current");
            link.setAttribute("aria-current", "true");
            current = link;
          });
        },
        { rootMargin: "0px 0px -70% 0px", threshold: 0 }
      );
      headings.forEach(function (h) {
        observer.observe(h);
      });
    }
  }

  // ---- 3. Tag filter (FR-003) ---------------------------------------------
  // Toggle visibility over the already-rendered card list — no reload.
  var filter = document.querySelector("[data-tag-filter]");
  var list = document.querySelector(".blog-index__list");
  if (filter && list) {
    var cards = Array.prototype.slice.call(list.querySelectorAll("[data-tags]"));
    var controls = Array.prototype.slice.call(
      filter.querySelectorAll("[data-tag]")
    );
    var empty = document.querySelector("[data-filter-empty]");

    function apply(tag) {
      var shown = 0;
      cards.forEach(function (card) {
        var tags = (card.getAttribute("data-tags") || "").split(" ");
        var match = !tag || tags.indexOf(tag) !== -1;
        card.hidden = !match;
        if (match) shown += 1;
      });
      controls.forEach(function (control) {
        var active = (control.getAttribute("data-tag") || "") === (tag || "");
        control.classList.toggle("is-active", active);
        if (active) {
          control.setAttribute("aria-current", "true");
        } else {
          control.removeAttribute("aria-current");
        }
      });
      if (empty) empty.hidden = shown !== 0;
    }

    filter.addEventListener("click", function (e) {
      var control = e.target.closest("[data-tag]");
      if (!control) return;
      e.preventDefault();
      apply(control.getAttribute("data-tag"));
    });
  }
})();
