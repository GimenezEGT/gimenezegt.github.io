<!-- SPECKIT START -->
This project is planned with Spec Kit. Governing principles live in
`.specify/memory/constitution.md` (v1.0.0) and MUST be honoured by every change.

The work is split into 7 sprint features, each with a spec + implementation plan
under `specs/`. Read the relevant plan before implementing a sprint:

- `specs/001-foundation-skeleton/`   — Jekyll scaffold, design tokens, base layout, global styles
- `specs/002-portfolio-core/`        — homepage: hero, about, projects, skills, contact (+ data-model)
- `specs/003-blog-core/`             — blog index, post layout, terminal code blocks, syntax theme (+ data-model)
- `specs/004-navigation-bridge/`     — responsive nav, blog teaser, cross-links, palette switch
- `specs/005-interactivity-polish/`  — copy-to-clipboard, TOC, tag filter, hero typing, scroll-to-top
- `specs/006-motifs-identity/`       — DNA helix, terminal headers, hex skills grid, organic dividers
- `specs/007-optimization-launch/`   — SEO/JSON-LD, perf + a11y gates, README, deploy (+ quickstart)

Source of truth for scope: `DEVELOPMENT_PLAN.md`. Next step per sprint:
`/speckit-tasks` to generate `tasks.md`, then `/speckit-implement`.

Active plan: `specs/007-optimization-launch/plan.md` (Sprint 7 — Optimization &
Launch; automatable tasks complete). Hardened/documented the theme for launch:
`shared/seo.html` now calls `jekyll-seo-tag` (`{% seo %}`) for meta/OG/Twitter/
canonical plus hand-written **Person** (homepage) and **BlogPosting** (posts)
JSON-LD; `_config.yml` gained SEO/social fields and an `author` **hash** (so
`twitter:creator` is a handle — display consumers use `site.author.name`); a
default OG image (`assets/images/og-default.png`, generated 1200×630, emitted via
a `{% unless page.image %}` fallback so cards aren't affected); build-time
cache-busting (`?v=site.time`) on CSS/JS in `head.html` (manual canonical removed —
the plugin emits it); `decoding="async"` added to the already-lazy content images;
a GitHub Pages Actions workflow (`.github/workflows/deploy.yml`); and a rewritten
README. **Decisions:** host = GitHub Pages + `CNAME`; domain = placeholder (`url`
in `_config.yml` + a `CNAME` are the only two spots — no `CNAME` committed yet to
avoid breaking a live deploy); fonts = **system stack** (self-hosting deliberately
deferred). Budgets hold: CSS 4.9 KB gz, per-page JS ≈ 3.25 KB gz (≤ 30 / 10 KB).
Remaining = author-gated **[MANUAL]** tasks (`tasks.md` T010/T011/T017/T019–T022/
T028): live Lighthouse + axe + keyboard/responsive/cross-browser passes, the actual
GitHub Pages deploy + DNS, and rich-preview validation. This is the final sprint.
<!-- SPECKIT END -->
