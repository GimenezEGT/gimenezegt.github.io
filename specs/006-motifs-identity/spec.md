# Feature Specification: Motifs & Identity

**Feature Branch**: `006-motifs-identity`

**Created**: 2026-06-11

**Status**: Draft

**Input**: Sprint 6 of DEVELOPMENT_PLAN.md (Phase 0.4 motifs, realised): the bioinformatics/creative identity layer — DNA helix hero background, organic blog dividers, hexagonal skills grid, terminal section headers, and subtle project-card particle effects.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - The portfolio signals "technical and precise" (Priority: P1)

As a visitor on the portfolio, subtle technical motifs — a faint animated DNA
helix behind the hero, terminal-style section headers with a blinking cursor, and
a hexagonal arrangement of skills — communicate the author's bioinformatics and
data identity without shouting, so the design itself tells the story.

**Why this priority**: The motifs are the visual thesis of the whole theme; they
turn a generic dark portfolio into this author's portfolio.

**Independent Test**: On the homepage, the hero shows a low-opacity helix, section
headers show the terminal treatment, and skills render in a hex grid — all legible
and non-distracting.

**Acceptance Scenarios**:

1. **Given** the portfolio hero, **When** it renders with motion allowed, **Then**
   a low-opacity DNA helix animates slowly behind the content without reducing text
   legibility or contrast.
2. **Given** a portfolio section header, **When** it renders, **Then** it shows the
   terminal-style treatment (e.g. a `>_` blinking cursor) consistent with the
   theme.
3. **Given** the skills section on desktop, **When** it renders, **Then** skills
   are arranged in a hexagonal grid.

### User Story 2 - The blog whispers "and there's a creative mind here" (Priority: P2)

As a reader in the blog, organic, hand-drawn-style dividers and header art provide
a warmer, human counterpoint to the portfolio's precision, so the blog feels like a
distinct creative space.

**Why this priority**: Completes the dual-world identity by giving the blog its own
signature; secondary to the portfolio motifs but core to the concept.

**Independent Test**: Blog pages show organic SVG dividers/header art that read as
warmer and more hand-made than the portfolio's geometric motifs.

**Acceptance Scenarios**:

1. **Given** a blog page, **When** it renders, **Then** organic/botanical SVG
   dividers or header art appear, using the blog palette.
2. **Given** the two worlds side by side, **When** compared, **Then** the blog's
   motifs read as organic/warm and the portfolio's as geometric/technical.

### User Story 3 - Motifs never get in the way (Priority: P1)

As any visitor — including those who prefer reduced motion, use keyboards, or have
slower devices — the decorative motifs never block content, hurt readability, steal
focus, or tank performance.

**Why this priority**: Decoration that harms usability or performance violates the
project's core principles; this guardrail is as important as the motifs themselves.

**Independent Test**: With reduced motion, all motif animations are static; motifs
are decorative-only to assistive tech; performance budgets still pass.

**Acceptance Scenarios**:

1. **Given** `prefers-reduced-motion`, **When** any page loads, **Then** the helix,
   particles, and cursor are static (or hidden) while the layout is unchanged.
2. **Given** a screen-reader user, **When** they traverse the page, **Then** purely
   decorative motifs are hidden from the accessibility tree and do not appear in
   focus order.
3. **Given** the homepage with motifs, **When** measured, **Then** performance and
   layout-stability budgets still pass.

### User Story 4 - Project cards feel alive (Priority: P3)

As a visitor hovering a project card, a tiny data-scatter/node-graph particle
effect hints at the data-science theme, adding delight without distraction.

**Why this priority**: Pure flourish; lowest priority and first to be cut if it
threatens the performance budget.

**Independent Test**: Hovering a project card (pointer devices, motion allowed)
shows a subtle particle/scatter effect; it is absent under reduced motion and on
touch.

**Acceptance Scenarios**:

1. **Given** a project card on a pointer device with motion allowed, **When**
   hovered, **Then** a subtle particle/node effect plays.
2. **Given** reduced motion or a touch device, **When** the card is viewed, **Then**
   no particle effect runs and the card is otherwise complete.

### Edge Cases

- What happens to motifs with JavaScript disabled? → SVG/CSS motifs (helix,
  dividers, hex grid, cursor) still render; only JS-driven particle effects are
  absent, with no broken visuals.
- What happens if the helix would reduce hero text contrast? → Its opacity/blur is
  constrained so hero text always meets contrast; the motif yields to legibility.
- How does the hex skills grid behave on mobile? → It falls back to a simpler grid
  or tag list (per the responsive plan) rather than cramping.
- What happens on very low-end devices? → Animations stay lightweight (CSS/SVG,
  capped particle counts); they must not block scrolling or input.
- What happens if motifs push CSS/JS over budget? → The lowest-priority motif
  (particles) is removed first; budgets are not exceeded.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The portfolio hero MUST render a low-opacity DNA helix background
  (SVG/CSS) that animates slowly when motion is allowed and is static under
  `prefers-reduced-motion`, never reducing hero-text contrast below AA.
- **FR-002**: Designated portfolio section headers MUST render a terminal-style
  treatment (e.g. `>_` with a blinking cursor) consistent with the theme; the blink
  is disabled under reduced motion.
- **FR-003**: The skills section MUST render as a hexagonal grid on larger
  viewports, degrading to a simpler grid or tag list on smaller viewports.
- **FR-004**: Blog pages MUST render organic/botanical SVG dividers and/or header
  art in the blog palette, visually distinct from the portfolio's geometric motifs.
- **FR-005**: All purely decorative motifs MUST be hidden from assistive technology
  (e.g. `aria-hidden`/decorative roles) and MUST NOT appear in keyboard focus order.
- **FR-006**: Project cards MAY render a subtle particle/node-graph effect on hover
  for pointer devices with motion allowed; it MUST be absent under reduced motion
  and on touch, and its absence MUST not affect card content.
- **FR-007**: Every motif MUST respect `prefers-reduced-motion` by becoming static
  or hidden while preserving layout and information.
- **FR-008**: Motifs MUST NOT push the site beyond its CSS (≤ 30 KB) or JS (≤ 10 KB)
  compressed budgets, and MUST NOT introduce layout shift (reserve space).
- **FR-009**: Motifs MUST be implemented with tokens (colours/opacities) and remain
  consistent across the two palettes.

### Key Entities *(include if feature involves data)*

- No new persistent data. Visual/SVG assets and animation styles applied to
  existing sections (hero, section headers, skills, blog dividers, project cards).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Hero text over the DNA helix meets contrast ≥ 4.5:1 in both motion
  and reduced-motion states.
- **SC-002**: A visitor can identify the portfolio as "technical/data" and the blog
  as "organic/creative" from the motifs alone, without reading text.
- **SC-003**: With `prefers-reduced-motion`, no motif animates; all layouts and
  information are unchanged.
- **SC-004**: Screen-reader traversal encounters zero decorative motifs in focus or
  reading order.
- **SC-005**: After motifs are added, the site still meets its performance, CSS, and
  JS budgets and shows no new layout shift.

## Assumptions

- The hero, section headers, skills section, blog pages, and project cards exist
  from Sprints 2–5; this sprint layers visual identity onto them.
- SVG assets (helix, organic dividers, hex cells) are hand-authored or generated as
  static files in `assets/images/` and inlined where small enough.
- The hexagonal grid is primarily CSS (clip-path/transforms); particle effects, if
  kept, are a tiny capped vanilla-JS/canvas routine loaded only where needed.
- Particle effects (FR-006) are explicitly optional and the first thing cut if the
  performance budget is threatened.
- Cursor-blink styling may reuse the `_cursor-blink.scss` introduced in Sprint 5.
