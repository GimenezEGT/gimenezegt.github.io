# Implementation Plan: Optimization & Launch

**Branch**: `007-optimization-launch` | **Date**: 2026-06-11 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/007-optimization-launch/spec.md`

## Summary

Harden, verify, document, and ship the completed theme. This sprint adds no
features: it wires up SEO/structured-data output, runs the launch gates
(Lighthouse ≥ 95, accessibility, responsive, cross-browser), applies performance
strategies (font hosting, image lazy-loading/WebP, cache-busting), writes the
README, and deploys to a static host on a custom domain over HTTPS. See
[quickstart.md](quickstart.md) for the deploy + verification runbook.

## Technical Context

**Language/Version**: Jekyll ~> 4.3, Liquid, SCSS, HTML; static-host config

**Primary Dependencies**: `jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-feed`
(declared Sprint 1); host platform (GitHub Pages / Netlify / Cloudflare Pages)

**Storage**: Site config + content from prior sprints; no new data

**Testing**: Lighthouse (mobile) on production build; axe-core; manual keyboard
pass; responsive check at five breakpoints; cross-browser smoke (Chrome, Firefox,
Safari, Edge); validators for sitemap/feed/JSON-LD

**Target Platform**: Static hosting + CDN, custom domain, HTTPS

**Project Type**: Static site (single project)

**Performance Goals**: Lighthouse Performance ≥ 95; CSS ≤ 30 KB, JS ≤ 10 KB
compressed; CLS < 0.1; FCP < 1.2 s

**Constraints**: Audits run against a production build; launch gated on budgets
and a11y; no server runtime

**Scale/Scope**: SEO/JSON-LD includes, default OG image, README, host config +
DNS, audit-and-fix loop

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Zero-Framework JS & Progressive Enhancement | ✅ Pass | No new runtime JS; this sprint verifies the JS-off baseline holds in production. |
| II. Performance Budget Is a Gate | ✅ Pass | This sprint *is* the budget gate — Lighthouse and size checks are launch blockers (FR-002, SC-002/003). |
| III. Accessibility by Default | ✅ Pass | Automated + manual a11y audit is a launch gate (FR-005, SC-004). |
| IV. Single-Source Dual-Palette Design System | ✅ Pass | No token changes; verifies both worlds render correctly in production. |
| V. Content-First & Data-Driven | ✅ Pass | Completes SEO/structured-data output per Principle V (FR-003/004). |

**Result**: PASS. This sprint enforces, rather than risks, the constitution.

## Project Structure

### Documentation (this feature)

```text
specs/007-optimization-launch/
├── plan.md
├── spec.md
└── quickstart.md          # Deploy + launch-verification runbook
```

### Source Code (repository root)

```text
_config.yml                      # SEO defaults, url, social, paginate, plugin config (FR-003/004)
_includes/shared/
├── seo.html                     # Final SEO/JSON-LD (Person + BlogPosting) (FR-003)
└── analytics.html              # Privacy-friendly analytics snippet (optional)
_layouts/base.html               # Ensure seo.html + canonical in <head>
404.html                         # Themed not-found page (FR-008)
assets/images/og-default.png     # Default Open Graph image (edge case)
assets/css/main.scss             # Confirm compressed output; critical-CSS strategy
assets/fonts/                    # Self-hosted fonts, font-display: swap (FR-010)
CNAME or host config             # Custom domain (FR-001)
README.md                        # Project documentation (FR-009)
.github/workflows/ or netlify.toml  # Deploy config for chosen host
```

**Structure Decision**: Lean on the declared plugins for the bulk of SEO,
sitemap, and feed output; add a `seo.html` include only for JSON-LD the plugins
do not emit, and a default OG image. Deployment config is host-specific (one of
GitHub Pages Actions / `netlify.toml` / Cloudflare Pages); the README documents
the chosen path.

## Implementation Phases

### Phase 0: Research & Decisions

- **Host choice** — Decision: pick one static host (GitHub Pages, Netlify, or
  Cloudflare Pages) based on the author's preference; all serve static Jekyll over
  HTTPS with custom domains. Document DNS records in quickstart.
- **SEO coverage** — Decision: `jekyll-seo-tag` handles title/description/OG/
  Twitter + canonical; add hand-written Person (homepage) and BlogPosting (posts)
  JSON-LD in `seo.html` where the plugin stops (FR-003).
- **Images** — Decision: `loading="lazy"` below the fold; provide WebP with a
  `<picture>` fallback; supply a default OG image for image-less pages (FR-010).
- **Fonts** — Decision: self-host woff2 with `font-display: swap`; preload the
  primary body font; subset if size warrants (FR-010).
- **Cache-busting** — Decision: fingerprint or version-query changed CSS/JS so
  updates invalidate cleanly (FR-010 edge case).
- **Audit method** — Decision: run Lighthouse + axe against a local production
  build (`JEKYLL_ENV=production`), then re-verify on the live URL (SC-002).

### Phase 1: Build, Verify, Ship

1. **SEO/structured data** — finalise `_config.yml` SEO fields; ensure
   `seo.html` (with Person/BlogPosting JSON-LD) and canonical are in `<head>`;
   add default OG image.
2. **Performance pass** — self-host/preload fonts; lazy-load + WebP images;
   confirm compressed CSS and deferred JS; apply cache-busting; inline critical
   CSS if it helps FCP.
3. **404 + routing** — themed `404.html`; verify permalinks resolve on the host.
4. **Audit-and-fix loop** — Lighthouse (mobile) and axe on homepage, blog index,
   and a post; fix until SC-002/SC-003/SC-004 pass.
5. **Responsive + cross-browser** — verify five breakpoints across Chrome,
   Firefox, Safari, Edge (FR-006/007).
6. **README** — install, serve, configure, add project/post (link the data-model
   schemas), and deploy steps (FR-009).
7. **Deploy** — configure the host + custom domain + HTTPS; ship; re-verify live
   (FR-001). Follow [quickstart.md](quickstart.md).
8. **Agent context** — update the SPECKIT block in `CLAUDE.md` to this plan.

### Phase 2 (handoff)

`/speckit-tasks` generates ordered tasks: SEO/JSON-LD → perf strategies → 404 →
audit-fix loop → responsive/cross-browser → README → deploy/verify.

## Verification

- Live custom-domain URL loads over HTTPS with a valid cert (SC-001, FR-001).
- Lighthouse (mobile) ≥ 95 across Performance/Accessibility/Best-Practices/SEO on
  homepage + a post (SC-002).
- Production build: CSS ≤ 30 KB, JS ≤ 10 KB compressed, CLS < 0.1 (SC-003).
- axe: zero critical violations + keyboard pass on three key pages (SC-004).
- `sitemap.xml` + `feed.xml` validate; shared links show rich previews (SC-005).
- Five breakpoints × four browsers render correctly, no overflow (SC-006).

## Complexity Tracking

No constitution violations. Table intentionally empty.
