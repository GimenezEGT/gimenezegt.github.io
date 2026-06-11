# Feature Specification: Interactivity & Polish

**Feature Branch**: `005-interactivity-polish`

**Created**: 2026-06-11

**Status**: Draft

**Input**: Sprint 5 of DEVELOPMENT_PLAN.md (Phase 6): the interactive layer — hero typing animation, cursor blink, table of contents, copy-to-clipboard, blog tag filtering, scroll-to-top, and project-card hover — all progressive enhancements.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Copy code with one click (Priority: P1)

As a reader following a tutorial, I can click a button on a code block to copy its
contents to my clipboard, so I can paste commands without manual selection.

**Why this priority**: For a technical blog, copyable code is the highest-value
interaction — it directly serves the core audience.

**Independent Test**: On a post with code blocks, each block shows a copy button
that copies the exact code and confirms the action.

**Acceptance Scenarios**:

1. **Given** a code block, **When** the reader clicks its copy button, **Then**
   the block's code is placed on the clipboard.
2. **Given** a successful copy, **When** it completes, **Then** the button shows a
   brief confirmation (e.g. "Copied").
3. **Given** JavaScript is disabled, **When** the post renders, **Then** the copy
   button is absent and the code remains fully selectable.

### User Story 2 - Find your way through a long post (Priority: P2)

As a reader of a long article with `toc: true`, I see a table of contents that
highlights the section I'm currently reading and lets me jump to any heading, so I
can orient and navigate within the post.

**Why this priority**: Improves long-form readability; valuable but only for posts
that opt in.

**Independent Test**: A long post with `toc: true` shows a TOC whose active item
updates as the reader scrolls and whose links jump to headings.

**Acceptance Scenarios**:

1. **Given** a post with `toc: true`, **When** it renders, **Then** a TOC of its
   headings appears (sticky on desktop, collapsible on smaller screens).
2. **Given** the reader scrolls, **When** a new section enters view, **Then** the
   corresponding TOC item becomes highlighted.
3. **Given** JavaScript is disabled, **When** the post renders, **Then** the TOC is
   still a usable list of anchor links (no active-tracking).

### User Story 3 - Filter the blog by topic (Priority: P2)

As a visitor browsing the blog index, I can click a tag to show only posts with
that tag, without a full page reload, so I can focus on topics I care about.

**Why this priority**: Aids discovery as the post count grows; enhancement over
the Sprint 3 static index.

**Independent Test**: On the blog index, selecting a tag filters the visible post
cards to that tag; clearing shows all.

**Acceptance Scenarios**:

1. **Given** the blog index, **When** the visitor selects a tag, **Then** only
   posts with that tag remain visible.
2. **Given** an active filter, **When** the visitor clears it, **Then** all posts
   are shown again.
3. **Given** JavaScript is disabled, **When** the index renders, **Then** all posts
   are shown and tags act as normal links (no broken state).

### User Story 4 - Animated hero and finishing touches (Priority: P3)

As a first-time visitor, the hero tagline types itself out with a blinking
terminal cursor, code-section headers show a blinking cursor, project cards react
on hover, and a "back to top" button appears after scrolling, so the site feels
alive and crafted.

**Why this priority**: Delight and personality; must never block content and must
respect reduced-motion.

**Independent Test**: The hero types its tagline; a scroll-to-top button appears
after scrolling and returns to top; cards respond on hover — all disabled/static
under reduced motion.

**Acceptance Scenarios**:

1. **Given** the homepage with motion allowed, **When** it loads, **Then** the
   hero tagline types out and ends with a blinking cursor.
2. **Given** `prefers-reduced-motion`, **When** the homepage loads, **Then** the
   full tagline is shown immediately with no typing animation.
3. **Given** the visitor has scrolled down, **When** they look for it, **Then** a
   scroll-to-top control is available and returns them to the top.
4. **Given** a project card, **When** hovered (pointer devices), **Then** a subtle
   accent/glow effect appears; keyboard focus shows an equivalent visible state.

### Edge Cases

- What happens to every enhancement when JavaScript fails or is disabled? → The
  underlying content/markup remains complete and usable (graceful degradation).
- What happens when the Clipboard API is unavailable? → The copy button either
  falls back to a select-and-copy approach or hides, without throwing.
- What happens for a post with `toc: true` but only one heading? → The TOC is
  omitted or minimal; no empty sidebar.
- What happens when filtering yields zero posts? → An empty state message is shown
  with a way to clear the filter.
- How do animations behave on low-end devices? → They stay lightweight (CSS where
  possible) and never block scrolling or input.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Code blocks MUST gain a copy-to-clipboard button (when JS is
  available) that copies the exact block contents and shows a brief confirmation;
  absent and harmless when JS is disabled or the Clipboard API is missing.
- **FR-002**: Posts with `toc: true` MUST render a table of contents from their
  headings; with JS, the current section MUST be highlighted as the reader scrolls
  (Intersection Observer); without JS, the TOC MUST remain a working anchor list.
- **FR-003**: The blog index MUST support client-side tag filtering with no page
  reload; without JS, all posts remain visible and tags behave as links.
- **FR-004**: The hero tagline MUST animate as terminal-style typing with a
  blinking cursor when motion is allowed, and display fully and immediately under
  `prefers-reduced-motion`.
- **FR-005**: A scroll-to-top control MUST appear after the visitor scrolls beyond
  a threshold and return them to the top when activated; it MUST be keyboard
  operable.
- **FR-006**: Project cards MUST present a subtle hover effect on pointer devices
  and an equivalent visible focus state for keyboard users.
- **FR-007**: Section headers designated as "terminal" MUST show a blinking cursor
  via CSS, disabled under reduced motion.
- **FR-008**: Every feature in this sprint MUST be a progressive enhancement: the
  site MUST remain fully functional and readable with JavaScript disabled.
- **FR-009**: All added JavaScript MUST keep total site JS within the 10 KB
  compressed budget and load without blocking first paint.
- **FR-010**: All interactive controls MUST meet contrast and keyboard-operability
  requirements and provide accessible names/states.

### Key Entities *(include if feature involves data)*

- No new persistent data. Operates on existing rendered content: code blocks,
  post headings (for TOC), post tags (for filtering), and the hero tagline string.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: With JavaScript disabled, 100% of content remains readable and all
  links/anchors work; no enhancement leaves a broken or dead control.
- **SC-002**: A reader can copy a code block in one click and receives visible
  confirmation.
- **SC-003**: On a `toc: true` post, the active TOC item matches the section in
  view while scrolling.
- **SC-004**: Selecting a tag on the blog index filters posts in under 100 ms with
  no page reload.
- **SC-005**: Total site JavaScript stays within the 10 KB compressed budget.
- **SC-006**: With `prefers-reduced-motion`, no typing, blinking, or hover
  animation runs, and all information is still conveyed.

## Assumptions

- The code-block container, TOC stub, post tags, hero markup, and card markup all
  exist from Sprints 2–4; this sprint adds behaviour and small animation styles.
- Tag filtering is client-side over the already-rendered index (no search index);
  full-text search is a Phase 10 future enhancement.
- All scripts live in the existing `assets/js/` modules (`main.js`, `portfolio.js`,
  `blog.js`) and are loaded with `defer`.
- Confirmation UI for copy is a transient text/icon swap, not a toast library.
