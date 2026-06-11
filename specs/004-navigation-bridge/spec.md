# Feature Specification: Navigation & Bridge

**Feature Branch**: `004-navigation-bridge`

**Created**: 2026-06-11

**Status**: Draft

**Input**: Sprint 4 of DEVELOPMENT_PLAN.md (Phase 5): responsive navigation, the portfolio↔blog "bridge" (teaser, cross-links), palette switching, and smooth anchor scrolling.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Navigate the whole site from any page (Priority: P1)

As a visitor on any device, I can use a consistent navigation bar to move between
the portfolio sections, the blog, and the about page, including a usable menu on
mobile, so I never feel stuck.

**Why this priority**: Navigation connects everything built so far; without
responsive nav the site is unusable on phones.

**Independent Test**: On desktop and on a narrow viewport, the nav exposes all
primary destinations and they work; the mobile menu opens and closes.

**Acceptance Scenarios**:

1. **Given** any page on desktop, **When** it renders, **Then** horizontal nav
   links to Projects, Blog, and About are visible and functional.
2. **Given** a narrow viewport, **When** the visitor activates the menu button,
   **Then** a full-screen (or overlay) menu opens with all links; activating it
   again or selecting a link closes it.
3. **Given** the mobile menu is open, **When** a keyboard user tabs, **Then**
   focus is managed within the menu and Escape closes it.

### User Story 2 - Feel the shift between the two worlds (Priority: P1)

As a visitor moving from the portfolio to the blog, I perceive an intentional but
subtle shift — warmer background, serif headings, slightly brighter accent,
narrower layout — so the two worlds feel distinct yet clearly part of one site.

**Why this priority**: The dual-world identity is the signature concept of the
theme; the palette switch is what makes it real across navigation.

**Independent Test**: Navigate portfolio → blog; the palette and type visibly
shift via the page-type attribute, with a gentle background transition.

**Acceptance Scenarios**:

1. **Given** a portfolio page, **When** the visitor navigates to a blog page,
   **Then** the background warms, headings become serif, and the accent brightens.
2. **Given** the transition, **When** it occurs, **Then** a subtle background-
   colour transition makes it feel intentional (disabled under reduced-motion).
3. **Given** any blog page, **When** the nav renders, **Then** the "Blog" link is
   highlighted to indicate the current world.

### User Story 3 - Cross-link between work and writing (Priority: P2)

As a visitor, I can move naturally between a project and its write-up and between
the portfolio and the latest posts, so the work and the writing reinforce each
other.

**Why this priority**: The "bridge" turns two sections into one connected story,
increasing engagement; valuable but builds on the essentials above.

**Independent Test**: The homepage shows a blog teaser with the latest posts; a
project with a linked post shows a "read the write-up" link; a post shows a "back
to portfolio" link.

**Acceptance Scenarios**:

1. **Given** published posts, **When** the homepage renders, **Then** a "blog
   teaser" section shows the latest 2–3 posts as blog-styled cards linking to the
   blog.
2. **Given** a project with a linked post, **When** its card renders, **Then** a
   "read the write-up →" link points to that post.
3. **Given** a blog post, **When** it renders, **Then** a "back to portfolio"
   link returns the reader home.

### User Story 4 - Smooth in-page navigation (Priority: P3)

As a visitor clicking a nav anchor (e.g. "Projects"), the page scrolls smoothly
to that section rather than jumping, so navigation feels polished.

**Why this priority**: Pure polish; must degrade gracefully and never be required.

**Independent Test**: Clicking an in-page anchor scrolls smoothly; with reduced
motion or JS off it still lands on the section.

**Acceptance Scenarios**:

1. **Given** an in-page anchor, **When** activated, **Then** the page scrolls
   smoothly to the target.
2. **Given** `prefers-reduced-motion`, **When** the anchor is activated, **Then**
   it jumps directly without animation.

### Edge Cases

- What happens to the overlay nav if JavaScript is disabled? → The menu MUST
  still expose all links (e.g. a no-JS fallback that shows links, or a
  `:target`/`<details>` based toggle) so navigation is never lost.
- What happens when there are no published posts? → The homepage blog teaser is
  omitted or shows an empty state without breaking the page.
- How does the nav behave on scroll over the hero? → It starts semi-transparent
  over the hero and becomes solid on scroll (enhancement; solid fallback if no JS).
- What happens when a page declares neither world? → It defaults to the portfolio
  world (consistent with Sprint 1).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A single navigation component MUST appear on every page with links
  to the primary destinations sourced from `_data/navigation.yml`.
- **FR-002**: On narrow viewports the nav MUST collapse to a menu toggle that
  opens an accessible overlay/menu containing all links; it MUST be operable by
  keyboard (open, focus trap, Escape to close) and expose correct ARIA state.
- **FR-003**: With JavaScript disabled, all navigation links MUST remain reachable
  (no-JS fallback for the mobile menu).
- **FR-004**: The active world MUST be reflected by the nav (e.g. the Blog link is
  highlighted on blog pages) and by the `data-page-type` attribute driving the
  palette.
- **FR-005**: Navigating between worlds MUST apply the palette/type shift via
  `data-page-type`, with a subtle background-colour transition that is disabled
  under `prefers-reduced-motion`.
- **FR-006**: The homepage MUST include a "blog teaser" section showing the latest
  2–3 posts as blog-styled cards linking into the blog; omitted gracefully when
  no posts exist.
- **FR-007**: Project cards with a linked post MUST show a "read the write-up →"
  link; blog posts MUST show a "back to portfolio" link.
- **FR-008**: In-page anchor links MUST scroll smoothly where motion is allowed
  and jump directly under reduced motion, with no dependency on JS for landing on
  the target.
- **FR-009**: On portfolio pages the nav MUST overlay the hero (semi-transparent)
  and become solid on scroll, with a solid fallback when JS is unavailable.
- **FR-010**: All navigation and bridge elements MUST meet contrast and keyboard-
  operability requirements and stay within the JS budget.

### Key Entities *(include if feature involves data)*

- **Navigation item**: reused from Sprint 1 (`label`, `url`, order); may gain an
  optional `world` hint for active-state logic.
- **Teaser post**: the latest N posts (reuses the Post entity from Sprint 3) for
  the homepage teaser.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can reach every primary destination on both desktop and a
  360px-wide phone, including via keyboard only.
- **SC-002**: With JavaScript disabled, 100% of navigation links remain usable.
- **SC-003**: Moving portfolio → blog produces a visible palette/type shift and a
  background transition under a second; reduced-motion users see the shift with no
  animation.
- **SC-004**: The homepage teaser surfaces the latest posts and updates
  automatically as posts are added — no manual edits.
- **SC-005**: The mobile menu passes a keyboard audit: open, focus contained,
  Escape closes, focus returns to the toggle; ARIA `expanded` state is correct.

## Assumptions

- The mobile menu's open/close and the nav-on-scroll behaviour are progressive
  enhancements layered on a no-JS fallback (`<details>`/`:target` or visible
  links), keeping JS within budget and the site usable without it.
- The blog teaser reuses the Sprint 3 post-card component with blog styling.
- "About" is a simple page/section that exists or is stubbed; this sprint links to
  it rather than authoring its content.
- Palette tokens and the `data-page-type` mechanism exist from Sprint 1; this
  sprint wires navigation and the transition to them.
