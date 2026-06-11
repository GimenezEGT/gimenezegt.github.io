# Feature Specification: Blog Core

**Feature Branch**: `003-blog-core`

**Created**: 2026-06-11

**Status**: Draft

**Input**: Sprint 3 of DEVELOPMENT_PLAN.md (Phase 4): the blog system — index listing, individual post layout, blog serif typography, terminal-styled code blocks, and post metadata.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read an individual post (Priority: P1)

As a reader who followed a link to an article, I see a well-typeset post with a
clear title, date, reading time, the rendered Markdown body, and styled code
blocks, so the content is pleasant and easy to read.

**Why this priority**: The post page is where the actual content lives and where
readers spend their time. Without it there is no blog.

**Independent Test**: Create a Markdown post with front matter and body
(including a code block); it renders as a styled article at its permalink.

**Acceptance Scenarios**:

1. **Given** a Markdown post, **When** it is published, **Then** its page shows
   title, date, and estimated read time.
2. **Given** post body Markdown, **When** rendered, **Then** headings, lists,
   links, images, and blockquotes are styled with the blog (serif) typography.
3. **Given** a fenced code block, **When** rendered, **Then** it appears in a
   terminal-styled container with syntax highlighting.
4. **Given** a post, **When** the reader reaches the end, **Then** tags, a "back
   to blog" link, and a subtle "back to portfolio" link are present.

### User Story 2 - Discover posts from the blog index (Priority: P1)

As a visitor exploring the blog, I see a list of post cards (title, date, read
time, excerpt, tags) so I can choose what to read.

**Why this priority**: The index is the entry point that routes readers to posts.
Tied with the post page as essential.

**Independent Test**: With ≥ 2 published posts, the blog index lists a card for
each, newest first, each linking to its post.

**Acceptance Scenarios**:

1. **Given** published posts, **When** the blog index renders, **Then** each post
   appears as a card with title, date, read time, excerpt, and tags.
2. **Given** the index, **When** the visitor activates a card, **Then** they
   navigate to that post.
3. **Given** the index, **When** it renders, **Then** the blog world is active —
   narrower column, serif headings, warmer palette.

### User Story 3 - Scannable, consistent post metadata (Priority: P2)

As a reader, every post shows its date, reading time, and tags in a consistent
format, so I can judge relevance and length quickly.

**Why this priority**: Metadata improves scannability and trust; reusable across
index and post but secondary to the content itself.

**Independent Test**: The post-meta component renders identical formatting on
both a post card and a post header.

**Acceptance Scenarios**:

1. **Given** a post date, **When** displayed, **Then** it uses a consistent
   human-readable format.
2. **Given** post body length, **When** the page renders, **Then** an estimated
   read time is computed and shown.

### Edge Cases

- What happens when a post has no excerpt front matter? → An excerpt is derived
  from the first ~160 characters of the body.
- What happens when a post has no cover image or tags? → Those elements are
  omitted gracefully; layout does not break.
- How are very long code lines handled? → They scroll horizontally within the
  code container without breaking page layout.
- What happens when there are zero published posts? → The index shows a tasteful
  empty state, not a broken page.
- What happens with a `prefers-reduced-motion` reader? → Any code-block or card
  affordances are static; no motion.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST render Markdown posts from `_posts/` at a
  configured permalink, applying the blog world (serif headings, warmer palette,
  narrower prose column).
- **FR-002**: Each post page MUST display title, publication date, and an
  estimated reading time computed from word count.
- **FR-003**: Post body Markdown MUST be fully styled: headings, paragraphs,
  lists, links, blockquotes, tables, images (with optional captions), and inline
  code.
- **FR-004**: Fenced code blocks MUST render in a terminal-styled container
  (elevated background, top bar with coloured dots and optional filename) with
  Rouge syntax highlighting in a dark theme matching the palette.
- **FR-005**: Each post MUST display its tags and provide a "back to blog" link
  and a subtle "back to portfolio" link.
- **FR-006**: The blog index MUST list published posts newest-first as cards
  showing title, date, read time, excerpt, and tags, each linking to the post.
- **FR-007**: When a post lacks an excerpt, the system MUST derive one from the
  post body; when it lacks tags or image, those MUST be omitted gracefully.
- **FR-008**: The post-meta presentation (date, read time, tags) MUST be a single
  reusable component used by both index cards and post headers.
- **FR-009**: The blog index and posts MUST be responsive and meet contrast and
  keyboard-operability requirements.
- **FR-010**: Code blocks MUST be readable and selectable with JavaScript
  disabled (the copy-to-clipboard button is added in Sprint 5 as enhancement).

### Key Entities *(include if feature involves data)*

- **Post**: a Markdown article with front matter — title, date, categories,
  tags, excerpt, cover image, TOC flag, featured flag — plus body content.
- **Post metadata**: derived/display values — formatted date, computed read time,
  tag pills.

See [data-model.md](data-model.md) for the front-matter schema.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An author can publish a new post by adding one Markdown file with
  front matter to `_posts/` — no template changes — and it appears on the index
  and at its permalink on next build.
- **SC-002**: A reader can distinguish the blog world from the portfolio world at
  a glance (serif headings, narrower column, warmer palette) without reading the
  URL.
- **SC-003**: Code blocks render with correct syntax highlighting for at least
  the languages used in sample posts, and remain readable/selectable with JS off.
- **SC-004**: 100% of blog text meets contrast ≥ 4.5:1; index cards and post
  links are fully keyboard-operable with visible focus.
- **SC-005**: Reading time shown is within ±1 minute of a 200-wpm estimate of the
  post body.

## Assumptions

- kramdown + Rouge (declared in Sprint 1 config) provide Markdown rendering and
  syntax highlighting; this sprint supplies the dark Rouge theme.
- 1–2 sample posts are written for testing and demonstration.
- Table of contents, copy-to-clipboard, and tag filtering are interactivity
  features delivered in Sprint 5; this sprint ships the static, readable base
  (a `toc: true` flag may be present in front matter but its sticky behaviour is
  Sprint 5).
- Pagination and related-posts may be stubbed here and completed in Sprint 4/5;
  the index renders all posts newest-first if pagination is deferred.
- Organic/botanical blog header art is a Sprint 6 motif; a simple header is used
  now.
