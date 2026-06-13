/*
 * Shared site JS — progressive enhancement only (Constitution Principle I).
 * Nothing here is required for content or navigation: the mobile menu has a
 * no-JS checkbox fallback and the nav is solid by default. Loaded with `defer`.
 *
 * Responsibilities:
 *   1. Mobile menu: upgrade the checkbox/label toggle to button semantics with
 *      aria-expanded, trap focus while open, close on Escape, return focus.
 *   2. Nav-on-scroll: add `.is-scrolled` past a small threshold; mark the header
 *      `.nav-enhanced` so the transparent-over-hero state only applies with JS.
 */
(function () {
  "use strict";

  // ---- Shared reduced-motion helper ---------------------------------------
  // Exposed for portfolio.js / blog.js (defer order guarantees main.js runs
  // first). One source of truth for the prefers-reduced-motion gate.
  var motionQuery = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;
  window.Site = window.Site || {};
  window.Site.prefersReducedMotion = function () {
    return !!(motionQuery && motionQuery.matches);
  };

  var header = document.querySelector("[data-header]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var checkbox = document.getElementById("nav-toggle");
  var nav = document.querySelector("[data-nav]");

  // ---- Mobile menu (focus-trapped overlay) --------------------------------
  if (toggle && checkbox && nav) {
    // With JS on, the label acts as the button; take the checkbox out of the
    // tab order so there is a single, labelled control.
    checkbox.setAttribute("tabindex", "-1");
    checkbox.setAttribute("aria-hidden", "true");
    toggle.setAttribute("role", "button");
    toggle.setAttribute("tabindex", "0");
    toggle.setAttribute("aria-controls", "primary-nav");
    toggle.setAttribute("aria-expanded", "false");

    var links = [].slice.call(nav.querySelectorAll("a"));

    function trap(e) {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.focus();
        return;
      }
      if (e.key !== "Tab") return;
      var chain = [toggle].concat(links);
      var first = chain[0];
      var last = chain[chain.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function setOpen(open) {
      checkbox.checked = open;
      toggle.setAttribute("aria-expanded", String(open));
      if (open) {
        if (links[0]) links[0].focus();
        document.addEventListener("keydown", trap);
      } else {
        document.removeEventListener("keydown", trap);
      }
    }

    toggle.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(!checkbox.checked);
      }
    });
    checkbox.addEventListener("change", function () {
      setOpen(checkbox.checked);
    });
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }

  // ---- Nav on scroll ------------------------------------------------------
  if (header) {
    header.classList.add("nav-enhanced");
    var ticking = false;
    function solidify() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    }
    solidify();
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(solidify);
        }
      },
      { passive: true }
    );
  }

  // ---- Scroll-to-top control (FR-005) -------------------------------------
  // The control is an anchor to #main-content (works with JS off). With JS we
  // reveal it past a threshold (transform/opacity → no CLS) and smooth-scroll,
  // honouring reduced motion, then move focus to the top for keyboard users.
  var scrollTop = document.querySelector("[data-scroll-top]");
  if (scrollTop) {
    var THRESHOLD = 600;
    var stTicking = false;
    function toggleScrollTop() {
      scrollTop.classList.toggle("is-visible", window.scrollY > THRESHOLD);
      stTicking = false;
    }
    toggleScrollTop();
    window.addEventListener(
      "scroll",
      function () {
        if (!stTicking) {
          stTicking = true;
          window.requestAnimationFrame(toggleScrollTop);
        }
      },
      { passive: true }
    );
    scrollTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: window.Site.prefersReducedMotion() ? "auto" : "smooth"
      });
      var main = document.getElementById("main-content");
      if (main) {
        main.setAttribute("tabindex", "-1");
        main.focus({ preventScroll: true });
      }
    });
  }
})();
