# Feature Specification: Foundation & Skeleton

**Feature Branch**: `001-foundation-skeleton`

**Created**: 2026-06-11

**Status**: Draft

**Input**: Sprint 1 of DEVELOPMENT_PLAN.md (Phases 1–2): project scaffolding, design-token foundation, base layout, global styles, typography, and shared header/footer.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A buildable, servable site skeleton (Priority: P1)

As the site author, I can clone the repository, install dependencies, and run a
local server that produces a working (if sparse) site, so that every later
sprint has a stable foundation to build on.

**Why this priority**: Nothing else can be built, previewed, or tested until the
project builds and serves. This is the irreducible foundation.

**Independent Test**: Run the documented install + serve commands on a clean
machine; a local site loads in the browser with no build errors.

**Acceptance Scenarios**:

1. **Given** a fresh checkout, **When** the author runs the install command,
   **Then** all dependencies resolve without error.
2. **Given** installed dependencies, **When** the author runs the serve command,
   **Then** the site builds and is reachable in a browser with no errors in the
   build log.
3. **Given** the running server, **When** the author edits a source file,
   **Then** the change is reflected on reload.

### User Story 2 - Consistent visual foundation across every page (Priority: P1)

As a visitor, every page I land on shares the same base background, typography,
spacing rhythm, and theme colours, so the site feels like one coherent product
rather than disconnected pages.

**Why this priority**: The design-token system and global styles are the shared
language every component depends on. Building components before tokens exist
guarantees rework.

**Independent Test**: Load any two different routes; body text, headings,
background, link colour, and spacing are visually identical and driven by the
same tokens.

**Acceptance Scenarios**:

1. **Given** any page, **When** it renders, **Then** body text uses the defined
   base type size, line height, and colour from the token system.
2. **Given** a page tagged as the blog world, **When** it renders, **Then** the
   palette shifts (warmer background, brighter accent) without any component
   markup changing.
3. **Given** any page, **When** the author inspects styles, **Then** no
   component hard-codes a colour, font size, or spacing value outside the token
   system.

### User Story 3 - Shared chrome on every page (Priority: P2)

As a visitor, I see a consistent header (site name + primary links) and footer
(copyright + social) on every page, so I can always orient and navigate.

**Why this priority**: Header and footer frame all content; they are needed
before page-specific work but are simpler than the token system.

**Independent Test**: Load any page; the same header and footer appear with
working links.

**Acceptance Scenarios**:

1. **Given** any page, **When** it renders, **Then** the header shows the site
   name and the primary navigation links.
2. **Given** any page, **When** it renders, **Then** the footer shows copyright
   and social links sourced from data, not hard-coded markup.
3. **Given** a keyboard user, **When** they press Tab from the top of the page,
   **Then** a "skip to content" affordance is the first focusable element.

### Edge Cases

- What happens when a page declares no layout or page type? → It MUST fall back
  to the default (portfolio) palette and the base layout, still rendering valid
  HTML.
- How does the system handle a missing data file (e.g. social links)? → The
  affected region renders empty/omitted without breaking the build.
- What happens on a very narrow viewport (320px)? → Global type and spacing
  remain readable with no horizontal overflow.
- What happens for a `prefers-reduced-motion` user? → No global transitions or
  animations run; the static presentation is complete.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The project MUST build and serve locally from a documented set of
  commands with no errors on a clean checkout.
- **FR-002**: The system MUST define the full design-token set (colour, type
  scale, spacing unit, breakpoints) in a single source consumed by all styles.
- **FR-003**: The system MUST support two palettes — portfolio (default) and
  blog — switchable per page via a single page-type attribute, with no
  component markup duplication.
- **FR-004**: A root layout MUST provide the HTML skeleton (head, header,
  content slot, footer) that all other layouts extend.
- **FR-005**: Global styles MUST normalise browser defaults and apply base
  typography, background, link, selection, and scrollbar styling from tokens.
- **FR-006**: The header MUST display the site name and primary navigation links
  sourced from a data file.
- **FR-007**: The footer MUST display copyright and social links sourced from a
  data file, degrading gracefully if data is absent.
- **FR-008**: Every page MUST expose a skip-to-content link as the first
  focusable element and visible focus styles for keyboard users.
- **FR-009**: No component or page style may hard-code colours, font sizes, or
  spacing outside the token system.
- **FR-010**: All global motion MUST be disabled under `prefers-reduced-motion`.

### Key Entities *(include if feature involves data)*

- **Navigation item**: a labelled link in the primary nav (label, URL, order).
- **Social link**: an external profile (platform name, URL, icon reference).
- **Site metadata**: title, description, author, base URL, timezone — consumed
  globally for chrome and SEO.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new contributor can go from clone to a running local site in
  under 5 minutes following the documented steps.
- **SC-002**: Switching a page from the portfolio world to the blog world
  changes only the page-type attribute (zero component markup changes) and
  produces a visibly different palette.
- **SC-003**: 100% of global text meets a contrast ratio ≥ 4.5:1 against its
  background.
- **SC-004**: The skeleton build ships ≤ 30 KB compressed CSS and 0 KB
  blocking JavaScript.
- **SC-005**: Keyboard-only navigation can reach the skip link, all header
  links, and all footer links in logical order with visible focus.

## Assumptions

- The author uses a single name/title identity (Enrico Gimenez — Bioinformatics
  · Data Science · Molecular Biology) for site metadata defaults.
- Portfolio is the default world; pages opt into the blog world explicitly.
- Self-hosted fonts are acceptable; specific font files are finalised in this
  sprint or stubbed with system-font fallbacks until then.
- Sample/placeholder content is acceptable for header/footer data until later
  sprints supply real content.
- Light mode is out of scope for this sprint (token structure leaves room for it
  later).
