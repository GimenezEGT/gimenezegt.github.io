# Feature Specification: Optimization & Launch

**Feature Branch**: `007-optimization-launch`

**Created**: 2026-06-11

**Status**: Draft

**Input**: Sprint 7 of DEVELOPMENT_PLAN.md (Phases 7–9): responsive verification, accessibility audit, performance + Lighthouse pass, SEO/structured data, cross-browser testing, README, and deployment with a custom domain and HTTPS.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - The site is publicly live, fast, and secure (Priority: P1)

As the author, I can deploy the finished theme to a static host so that anyone can
visit it at my custom domain over HTTPS, with fast load times, so the portfolio and
blog are actually usable by the world.

**Why this priority**: Launch is the point of the project; an unshipped site
delivers no value.

**Independent Test**: The production URL loads over HTTPS on the custom domain,
serves the homepage and a blog post, and passes a Lighthouse run above target.

**Acceptance Scenarios**:

1. **Given** a build, **When** it is deployed, **Then** the site is reachable at the
   custom domain over HTTPS with a valid certificate.
2. **Given** the live homepage, **When** Lighthouse runs (mobile), **Then**
   Performance ≥ 95 and the CSS/JS budgets hold.
3. **Given** the live site, **When** a post URL is visited directly, **Then** it
   loads correctly (permalinks and routing work in production).

### User Story 2 - The site is discoverable and shareable (Priority: P1)

As the author, every page and post emits correct SEO metadata, structured data,
a sitemap, and an RSS feed, so search engines index the site and shared links show
rich previews.

**Why this priority**: Discoverability is half the value of publishing; tied with
deployment as launch-critical.

**Independent Test**: Validate meta/OpenGraph/JSON-LD on a page and a post; confirm
`sitemap.xml` and `feed.xml` exist and validate; a shared link renders a rich
preview.

**Acceptance Scenarios**:

1. **Given** any page, **When** inspected, **Then** it has a canonical URL, title,
   description, Open Graph, and Twitter Card tags.
2. **Given** a blog post, **When** inspected, **Then** it includes BlogPosting
   JSON-LD; the homepage includes Person JSON-LD.
3. **Given** the deployed site, **When** requested, **Then** `sitemap.xml` and
   `feed.xml` are present and valid.

### User Story 3 - The site works for everyone, everywhere (Priority: P1)

As a visitor on any major browser, device size, or with assistive technology, the
site is fully usable, readable, and operable, so no audience is excluded.

**Why this priority**: Accessibility and cross-browser/responsive correctness are
constitutional requirements and must be verified before launch.

**Independent Test**: The site passes an automated a11y audit and a keyboard pass,
renders correctly across the defined breakpoints, and works in Chrome, Firefox,
Safari, and Edge.

**Acceptance Scenarios**:

1. **Given** an automated accessibility audit (e.g. axe-core), **When** run on key
   pages, **Then** there are no critical violations.
2. **Given** a keyboard-only user, **When** they traverse the site, **Then** all
   interactive elements are reachable and operable with visible focus, including the
   skip link.
3. **Given** the defined breakpoints (sm–xxl), **When** each is viewed, **Then**
   layouts are correct with no horizontal overflow.
4. **Given** Chrome, Firefox, Safari, and Edge, **When** the site is loaded,
   **Then** it renders and functions consistently.

### User Story 4 - A new contributor can run and understand the project (Priority: P2)

As a developer (or the author returning later), a README explains how to install,
run, configure, add content, and deploy the site, so the project is maintainable.

**Why this priority**: Maintainability and onboarding matter, but the site can
launch before docs are perfect.

**Independent Test**: Following only the README, a developer installs, serves,
adds a post/project, and understands the deploy path.

**Acceptance Scenarios**:

1. **Given** the README, **When** a developer follows setup, **Then** they reach a
   running local site without external help.
2. **Given** the README, **When** they want to add a project or post, **Then** the
   steps and data/front-matter schemas are documented.

### Edge Cases

- What happens if Lighthouse falls below 95? → The blocking issue is identified and
  fixed (e.g. image weight, render-blocking resource) before launch; launch is
  gated on the budget.
- What happens to deep links and 404s in production? → Unknown URLs serve the themed
  404 page; valid permalinks resolve.
- How are social preview images handled when a page has no cover image? → A default
  Open Graph image is used.
- What happens if the custom domain certificate is not yet provisioned? → The site
  remains on the host default HTTPS URL until DNS/cert propagate; launch waits for a
  valid cert on the custom domain.
- How is caching handled for updated assets? → Asset references bust cache on change
  (fingerprint or query) so visitors get fresh CSS/JS.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The production site MUST be deployed to a static host and served over
  HTTPS at the configured custom domain with a valid certificate.
- **FR-002**: The live homepage MUST meet Lighthouse Performance ≥ 95 (mobile) and
  hold the CSS (≤ 30 KB) and JS (≤ 10 KB) compressed budgets and CLS < 0.1.
- **FR-003**: Every page and post MUST emit a canonical URL, title, description,
  Open Graph, and Twitter Card metadata; the homepage MUST emit Person JSON-LD and
  posts MUST emit BlogPosting JSON-LD.
- **FR-004**: The build MUST produce a valid `sitemap.xml` and RSS `feed.xml`.
- **FR-005**: Key pages MUST pass an automated accessibility audit with no critical
  violations and a manual keyboard pass (skip link, focus order, visible focus).
- **FR-006**: All layouts MUST be verified correct across the defined breakpoints
  (sm 576, md 768, lg 1024, xl 1280, xxl 1536) with no horizontal overflow.
- **FR-007**: The site MUST render and function consistently in current Chrome,
  Firefox, Safari, and Edge.
- **FR-008**: Unknown URLs MUST serve the themed 404 page; all permalinks MUST
  resolve in production.
- **FR-009**: A README MUST document install, local serve, configuration, adding
  projects/posts (with schemas), and the deploy process.
- **FR-010**: Performance strategies MUST be applied: self-hosted fonts with
  `font-display: swap`, lazy-loaded below-the-fold images with modern formats +
  fallback, critical-CSS/inlining where it helps, and cache-busting for changed
  assets.

### Key Entities *(include if feature involves data)*

- **Site metadata / SEO config**: title, description, author, URL, default social
  image, social handles — consumed by SEO tags and structured data.
- No new content entities; this sprint verifies and optimises existing content.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The live site is reachable at the custom domain over HTTPS with a
  valid certificate.
- **SC-002**: Lighthouse (mobile) Performance ≥ 95, Accessibility ≥ 95, Best
  Practices ≥ 95, SEO ≥ 95 on the homepage and a representative post.
- **SC-003**: Total CSS ≤ 30 KB and total JS ≤ 10 KB compressed in the production
  build; CLS < 0.1; FCP < 1.2 s on a representative connection.
- **SC-004**: An automated a11y audit reports zero critical violations on the
  homepage, blog index, and a post; keyboard pass succeeds on all three.
- **SC-005**: `sitemap.xml` and `feed.xml` validate; a shared homepage and post link
  render a rich preview with title, description, and image.
- **SC-006**: Layouts pass at all five breakpoints in all four target browsers with
  no overflow or broken components.

## Assumptions

- The author controls a custom domain and can set DNS records for the chosen host
  (GitHub Pages / Netlify / Cloudflare Pages).
- `jekyll-seo-tag`, `jekyll-sitemap`, and `jekyll-feed` (declared in Sprint 1)
  provide most SEO/sitemap/feed output; this sprint configures and verifies them
  and adds JSON-LD where the plugins do not.
- A default Open Graph image asset is provided for pages without a cover image.
- Performance/accessibility audits are run against a production build, not the dev
  server.
- The functional theme (Sprints 1–6) is complete before this sprint begins; this
  sprint hardens, verifies, documents, and ships it rather than adding features.
