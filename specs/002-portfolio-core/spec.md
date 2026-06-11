# Feature Specification: Portfolio Core

**Feature Branch**: `002-portfolio-core`

**Created**: 2026-06-11

**Status**: Draft

**Input**: Sprint 2 of DEVELOPMENT_PLAN.md (Phase 3): the portfolio homepage — hero, about, projects grid, skills, and contact — driven by `_data` files.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - First impression: who this is and what they do (Priority: P1)

As a recruiter or collaborator landing on the homepage, I immediately see the
author's name, role/tagline, and clear calls to action ("View Projects",
"Read the Blog"), so I can decide within seconds whether to dig deeper.

**Why this priority**: The hero is the highest-traffic, highest-impact section.
Without it the homepage has no entry point or value proposition.

**Independent Test**: Load the homepage; the hero shows name, tagline, and two
working CTAs above the fold on desktop and mobile.

**Acceptance Scenarios**:

1. **Given** the homepage, **When** it loads, **Then** the author's name and a
   one-line role tagline are visible above the fold.
2. **Given** the hero, **When** the visitor clicks "Explore Projects", **Then**
   the page scrolls to the projects section.
3. **Given** the hero, **When** the visitor clicks "Read the Blog", **Then** they
   navigate to the blog index.

### User Story 2 - Browse the work (Priority: P1)

As a visitor evaluating the author, I can scan a grid of project cards showing
title, description, tech tags, and links to repo/demo, so I can assess the depth
and relevance of their work.

**Why this priority**: Projects are the core evidence of competence — the reason
a portfolio exists. Tied with the hero as the must-have.

**Independent Test**: Add entries to the projects data file; the grid renders one
card per entry with all fields and working links.

**Acceptance Scenarios**:

1. **Given** project entries in data, **When** the homepage renders, **Then**
   each entry becomes a card with title, description, and tech tags.
2. **Given** a card with a repo link, **When** the visitor activates it, **Then**
   the repository opens in a new tab.
3. **Given** a card with no demo link, **When** it renders, **Then** the demo
   action is omitted (not shown broken/empty).
4. **Given** a project flagged `featured`, **When** the grid renders, **Then** it
   is visually emphasised or ordered ahead of non-featured projects.

### User Story 3 - Understand the person and skills (Priority: P2)

As a visitor, I can read a short about section and scan a grouped skills/tech
stack, so I understand the author's background and capabilities at a glance.

**Why this priority**: Adds context and credibility around the projects; valuable
but secondary to hero and projects.

**Independent Test**: About text renders with its layout; skills data renders
grouped by category.

**Acceptance Scenarios**:

1. **Given** the about section, **When** it renders, **Then** it shows the
   author bio and a styled "key facts" panel.
2. **Given** skills grouped by category in data, **When** the skills section
   renders, **Then** skills appear under their category headings.

### User Story 4 - Make contact (Priority: P2)

As an interested visitor, I can find how to reach the author (email + social),
so I can start a conversation.

**Why this priority**: Conversion point — but only matters after the visitor is
convinced by hero/projects.

**Independent Test**: Contact section renders email and social links from data;
links work.

**Acceptance Scenarios**:

1. **Given** the contact section, **When** it renders, **Then** an email action
   and social links are present and functional.

### Edge Cases

- What happens when the projects data file is empty? → The projects section shows
  a tasteful empty state or is omitted; the page still renders.
- What happens when a project has no image? → A placeholder or text-only card is
  shown without layout breakage.
- How are long descriptions or many tags handled? → Text truncates/wraps and tags
  wrap without overflowing the card.
- What happens on mobile? → The grid collapses to a single column; the hero
  tagline scales down and remains readable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The homepage MUST present, in order, hero → about → projects →
  skills → contact sections.
- **FR-002**: The hero MUST display the author name, a role tagline, and two CTAs
  ("Explore Projects" scrolls to projects; "Read the Blog" links to the blog).
- **FR-003**: The projects grid MUST render one card per entry in the projects
  data file, showing title, description, and tech tags.
- **FR-004**: Project cards MUST conditionally render repo and demo links only
  when those fields are present; external links open in a new tab with safe
  `rel`.
- **FR-005**: Featured projects MUST be visually distinguished or ordered ahead
  of others.
- **FR-006**: The about section MUST render author bio content plus a styled
  "key facts" panel.
- **FR-007**: The skills section MUST render skills grouped by category from the
  skills data file.
- **FR-008**: The contact section MUST render an email action and social links
  from data.
- **FR-009**: All sections MUST be responsive: 3-column projects grid on desktop,
  2 on tablet, 1 on mobile; section padding scales per breakpoint.
- **FR-010**: All portfolio content (projects, skills, social, bio facts) MUST be
  sourced from `_data`/front matter, not hard-coded in templates.
- **FR-011**: The homepage MUST use the portfolio palette and pass contrast and
  keyboard-operability requirements.

### Key Entities *(include if feature involves data)*

- **Project**: a portfolio work item — title, description, image, tech tags,
  repo URL, demo URL, featured flag, optional linked blog post.
- **Skill group**: a named category (e.g. Languages, Tools, Wet Lab) containing a
  list of skills, each with an optional proficiency indicator.
- **Profile facts**: short key/value facts for the about panel (e.g. location,
  focus, current role).

See [data-model.md](data-model.md) for full schemas.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can identify the author's name and role within 5 seconds
  of the homepage loading (content is above the fold).
- **SC-002**: Adding a new project requires editing only the projects data file —
  zero template changes — and the card appears on next build.
- **SC-003**: The projects grid renders correctly at 3/2/1 columns across the
  desktop/tablet/mobile breakpoints with no horizontal overflow.
- **SC-004**: 100% of homepage text meets contrast ≥ 4.5:1; all interactive
  elements are keyboard-reachable with visible focus.
- **SC-005**: The homepage adds no blocking JavaScript (smooth-scroll and any
  hover polish are enhancement-only and degrade gracefully).

## Assumptions

- Sample project, skill, and profile data is acceptable for this sprint; real
  content can be filled in later by editing data files.
- Hero animation (typing effect) and project-card hover/particle effects are out
  of scope here and handled in Sprint 5 and Sprint 6; this sprint ships static,
  working versions.
- The publications section (optional in the plan) is deferred unless data is
  provided.
- The blog teaser section on the homepage is delivered in Sprint 4 (Bridge), not
  here.
