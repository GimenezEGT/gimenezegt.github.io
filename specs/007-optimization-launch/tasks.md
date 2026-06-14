---
description: "Task list for Sprint 7 — Optimization & Launch"
---

# Tasks: Optimization & Launch

**Input**: Design documents from `specs/007-optimization-launch/`
**Prerequisites**: plan.md, spec.md, quickstart.md
**Tests**: No automated unit tests for this sprint; verification is via Lighthouse,
axe-core, validators, and manual passes (recorded in the audit-and-fix loop).

**Sprint decisions (from author)**:
- **Host**: GitHub Pages via Actions workflow + `CNAME`.
- **Domain**: placeholder for now (`https://example.com` in `_config.yml`); the real
  domain is set in one place (`_config.yml url` + `CNAME`) before deploy.
- **Fonts**: keep the system-font stack — **no self-hosting** (FR-010 font clause
  intentionally deferred; documented as a decision, not a gap).

**Manual / author-gated tasks** are marked **[MANUAL]** — they need a browser,
external tools (Lighthouse/axe), a GitHub remote, or DNS access, and cannot be
completed from the build environment alone.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1–US4 per spec.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the production build path and asset baseline before optimising.

- [X] T001 Produce a production build and record baseline compressed asset sizes: run `$env:JEKYLL_ENV = "production"; bundle exec jekyll build`, then gzip-measure every file in `_site/assets/css/` and `_site/assets/js/` to confirm CSS ≤ 30 KB and JS ≤ 10 KB before changes (baseline for SC-003).
- [X] T002 [P] Inventory all `<img>` usages across `_includes/`, `_layouts/`, and `_posts/` and note which are below the fold (candidates for `loading="lazy"`) and which have/lack cover images (candidates for the default OG image).

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Configuration that every later task reads from. MUST complete first.

**⚠️ CRITICAL**: SEO/structured-data and OG tasks depend on these config fields.

- [X] T003 Add SEO/social fields to `_config.yml`: `logo` (or `image:` default social image path `assets/images/og-default.png`), `twitter:` (`username`, `card: summary_large_image`), `social:` (`name`, `links:` array for sameAs), and `lang: en`. Keep `url: "https://example.com"` placeholder with a clear TODO comment pointing to the single change needed before deploy.
- [X] T004 Confirm `_layouts/base.html` and `_includes/head.html` include exactly one SEO partial in `<head>` and that `{% feed_meta %}` / sitemap output is not duplicated; note where `shared/seo.html` is included so US2 can replace its body.

**Checkpoint**: Config is the single source for SEO/OG; head wiring is known.

---

## Phase 3: User Story 1 — Live, fast, secure (Priority: P1) 🎯 MVP

**Goal**: The production build is deploy-ready on GitHub Pages and holds the
performance budget; the live site serves over HTTPS on the custom domain.

**Independent Test**: Production URL loads over HTTPS on the custom domain, serves
homepage + a post, and passes Lighthouse ≥ 95 (mobile).

### Implementation for User Story 1

- [X] T005 [US1] Add cache-busting to changed assets: append a content/version query (e.g. `?v={{ site.github.build_revision | default: site.time | date: '%s' }}`) or fingerprint to the CSS/JS `<link>`/`<script>` references in `_includes/head.html` and any JS includes, so updates invalidate cleanly (FR-010 edge case, SC-003 returning-visitor check).
- [X] T006 [P] [US1] Add `loading="lazy"` (and `decoding="async"`) to below-the-fold `<img>` elements identified in T002, leaving above-the-fold/hero imagery eager to protect LCP/CLS.
- [X] T007 [US1] Create the GitHub Pages deploy workflow `.github/workflows/deploy.yml`: checkout, Ruby setup with bundler cache, `JEKYLL_ENV=production bundle exec jekyll build`, then `actions/upload-pages-artifact` + `actions/deploy-pages` on push to `main`. Include the required `permissions` (pages: write, id-token: write) and `concurrency` block.
- [X] T008 [US1] **(adjusted)** Documented the domain wiring in README instead of committing a live-breaking placeholder `CNAME`; literal `CNAME` deferred to the manual deploy (T010). Add a `CNAME` file at repo root containing the custom domain placeholder with a comment-free single line (GitHub Pages requires bare domain). Document in README that this and `_config.yml url` are the two spots to set the real domain. Ensure `CNAME` is not excluded from the build (add to `include:` if needed so it lands in `_site`).
- [X] T009 [US1] Verify the production build still holds budgets after T005–T008: rebuild and re-measure gzip CSS/JS against T001 baseline; confirm no regression past 30 KB / 10 KB.
- [ ] T010 [MANUAL] [US1] Push to the GitHub remote, enable Pages → "GitHub Actions" source, set the custom domain in Settings → Pages (or via `CNAME`), add the DNS `A`/`AAAA`/`CNAME` records per quickstart §6, and enable "Enforce HTTPS" once the cert provisions.
- [ ] T011 [MANUAL] [US1] Run Lighthouse (mobile) on the live `/`, `/blog/`, and one post; confirm Performance/Accessibility/Best-Practices/SEO ≥ 95 and CLS < 0.1, FCP < 1.2 s. Record results; if any < 95, fix the blocking resource and redeploy (audit-and-fix loop, FR-002).

**Checkpoint**: Site is live on HTTPS at the custom domain and meets the budget.

---

## Phase 4: User Story 2 — Discoverable & shareable (Priority: P1)

**Goal**: Every page/post emits canonical + meta + OG + Twitter + JSON-LD; sitemap
and feed validate; shared links show rich previews.

**Independent Test**: Inspect a page and a post for meta/OG/JSON-LD; confirm
`sitemap.xml` and `feed.xml` validate; a shared link renders a rich preview.

### Implementation for User Story 2

- [X] T012 [US2] Replace the Sprint-1 stub body of `_includes/shared/seo.html` with the `jekyll-seo-tag` call `{% seo %}` (which emits title, description, canonical, OG, and Twitter Card from `_config.yml` + page front matter). Remove the now-redundant hand-rolled `<title>`/`<meta>`/`og:` lines so tags are not duplicated.
- [X] T013 [US2] Add Person JSON-LD to the homepage path: emit a `<script type="application/ld+json">` Person block (name, url, sameAs from `site.social.links`, jobTitle/description) gated to the portfolio/home page in `shared/seo.html` (e.g. `{% if page.url == '/' %}`).
- [X] T014 [US2] Add BlogPosting JSON-LD for posts: emit a `<script type="application/ld+json">` BlogPosting block (headline, datePublished from `page.date`, dateModified, author Person, image, mainEntityOfPage) gated to `{% if page.page_type == 'blog' or layout == 'post' %}` in `shared/seo.html`. Escape strings with `| jsonify` / `| escape` as appropriate.
- [X] T015 [P] [US2] Create the default Open Graph image `assets/images/og-default.png` (~1200×630) consistent with the portfolio palette, referenced by the `image:` default in `_config.yml` (T003) so image-less pages still get a preview (FR-003 edge case).
- [X] T016 [US2] Build and verify in `_site`: `sitemap.xml` and `feed.xml` are present and well-formed; view-source on `index.html` and a post in `_site` shows a single canonical, OG, Twitter, and the correct JSON-LD block; confirm no duplicate `<title>`/meta from the old stub.
- [ ] T017 [MANUAL] [US2] Validate JSON-LD with a structured-data testing tool and test a shared homepage + post link (rich-preview/OG debugger) once live; confirm the default OG image is used for image-less pages (SC-005).

**Checkpoint**: SEO/structured data complete and validated; feeds resolve.

---

## Phase 5: User Story 3 — Works for everyone, everywhere (Priority: P1)

**Goal**: No critical a11y violations; keyboard-operable; correct at all five
breakpoints across the four target browsers.

**Independent Test**: axe-core clean on three key pages; keyboard pass; correct at
sm–xxl; renders in Chrome/Firefox/Safari/Edge.

### Implementation for User Story 3

- [X] T018 [US3] Static a11y review of the built markup: confirm one `<h1>` per page and logical heading order, all `<img>` have `alt` (decorative ones `alt=""`/`aria-hidden`), interactive controls are real buttons/links with accessible names, and the skip link targets `#main-content`. Fix any gaps found in the relevant `_includes/`/`_layouts/` files.
- [ ] T019 [MANUAL] [US3] Run axe-core on `/`, `/blog/`, and a post (production build) — zero critical violations (SC-004). Fix and re-run until clean.
- [ ] T020 [MANUAL] [US3] Keyboard pass: skip link first, logical Tab order, visible focus on nav/mobile-menu/CTAs/cards/copy-button/scroll-to-top, Escape closes the mobile menu; verify `prefers-reduced-motion` hides/stops all motion with information intact.
- [ ] T021 [MANUAL] [US3] Responsive pass at sm 576 / md 768 / lg 1024 / xl 1280 / xxl 1536 — no horizontal overflow, grids reflow 3/2/1, mobile menu works (FR-006). Fix any overflow in the page/component SCSS.
- [ ] T022 [MANUAL] [US3] Cross-browser smoke in current Chrome, Firefox, Safari, Edge — consistent render/function (FR-007).

**Checkpoint**: Accessibility, responsive, and cross-browser gates pass.

---

## Phase 6: User Story 4 — README for contributors (Priority: P2)

**Goal**: README documents install, serve, configure, add content, and deploy.

**Independent Test**: Following only the README, a developer installs, serves, adds
a post/project, and understands the deploy path.

### Implementation for User Story 4

- [X] T023 [US4] Rewrite `README.md`: update the status block from "Sprint 1" to the launched/complete state; keep prerequisites + local-serve; refresh the project-structure tree to current reality (components/, pages/, shared partials, motifs, `.github/workflows/`).
- [X] T024 [US4] Document configuration + deploy in `README.md`: the two domain spots (`_config.yml url` + `CNAME`), GitHub Pages Actions flow, DNS records, and "Enforce HTTPS"; link `specs/007-optimization-launch/quickstart.md` as the runbook. Note the system-font decision (fonts not self-hosted) so it reads as intentional.
- [X] T025 [P] [US4] Confirm the "Adding content" section links the live data-model schemas for posts (`specs/003-blog-core/data-model.md`) and projects (`specs/002-portfolio-core/data-model.md`) and that front-matter examples match current fields.

**Checkpoint**: A newcomer can go from clone to running site to deploy via README.

---

## Phase 7: Polish & Cross-Cutting Concerns

- [X] T026 Update the CLAUDE.md SPECKIT block: mark Sprint 7 active/complete and summarise the launch deliverables (SEO/JSON-LD, OG image, cache-busting, lazy images, GitHub Pages workflow, README), noting the system-font decision and placeholder-domain status.
- [X] T027 Final production build + budget confirmation: rebuild and re-measure gzip CSS/JS; confirm CSS ≤ 30 KB and JS ≤ 10 KB hold for launch (SC-003).
- [ ] T028 [MANUAL] Post-deploy verification gate (quickstart §7): live HTTPS cert valid, live Lighthouse ≥ 95, post deep-link + themed 404 resolve, `sitemap.xml`/`feed.xml` resolve live, asset cache-busting works for returning visitors. All boxes checked ⇒ shippable.

---

## Dependencies & Execution Order

- **Setup (T001–T002)**: no dependencies — start immediately.
- **Foundational (T003–T004)**: depends on Setup; **blocks US1/US2** (they read config).
- **US1 (T005–T011)**: after Foundational. T010–T011 are [MANUAL] and gated on a
  GitHub remote + DNS.
- **US2 (T012–T017)**: after Foundational. Independent of US1 build tasks; T017 [MANUAL]
  needs the live site.
- **US3 (T018–T022)**: after the site builds; best run against a production build.
  Mostly [MANUAL].
- **US4 (T023–T025)**: documentation; can proceed any time after US1 deploy path is
  decided (it is).
- **Polish (T026–T028)**: after the desired stories are complete.

### Parallel Opportunities

- T002 ∥ T001 review work; T006, T015, T025 are marked [P] (independent files).
- US2 (SEO) and US3 (a11y/responsive) can proceed in parallel once the build is green.

---

## Implementation Strategy

**MVP = US1 + US2** (both P1, launch-critical): a discoverable site that is live,
fast, and secure. US3 (P1) is the pre-launch quality gate. US4 (P2) can trail.

**Automatable now** (no browser/remote): T001–T009, T012–T016, T018, T023–T027.
**Author-gated** [MANUAL]: T010, T011, T017, T019–T022, T028.

---

## Notes

- Run all audits against a **production** build, never the dev server.
- The font self-hosting clause of FR-010 is deliberately deferred (system stack) —
  recorded as a decision in README + CLAUDE.md, not left as an open gap.
- Commit after each logical group; keep the launch on `main` per project workflow.
