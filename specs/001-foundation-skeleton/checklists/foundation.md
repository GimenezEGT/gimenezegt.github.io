# Foundation Readiness Checklist: Foundation & Skeleton

**Purpose**: Requirements-quality gate ("unit tests for English") for Sprint 1
before implementation — validates that the spec is complete, clear, consistent,
and measurable, with emphasis on the constitutional NFRs (accessibility,
performance budget, design-token/dual-palette, progressive enhancement).
**Created**: 2026-06-11
**Feature**: [spec.md](../spec.md) · [plan.md](../plan.md) · [tasks.md](../tasks.md)

**How to use**: Each item asks whether the *requirement* is well-written, not
whether the code works. Mark `[x]` if the spec already satisfies it; leave
unchecked and note the gap if it does not. Unchecked `[Gap]`/`[Ambiguity]` items
are candidates to tighten the spec before `/speckit-implement`.

## Requirement Completeness

- [ ] CHK001 Are requirements defined for the full set of layouts `base.html` must support (portfolio, blog-index, post, page)? [Completeness, Spec §FR-004]
- [ ] CHK002 Is the complete design-token set enumerated (which colour, type-scale, spacing, and breakpoint tokens must exist) rather than referenced only in general terms? [Completeness, Spec §FR-002]
- [ ] CHK003 Are the routes/pages that MUST include the shared header and footer explicitly scoped? [Completeness, Spec §FR-006, §FR-007]
- [ ] CHK004 Is the build/serve workflow (install → serve → live-reload) fully specified as acceptance criteria, including the "no build errors" condition? [Completeness, Spec §US1]
- [ ] CHK005 Are the required `_data` files and their fields (navigation, social) documented at the level needed to implement them? [Gap, Spec §"Key Entities"]
- [ ] CHK006 Are the global style surfaces that must be normalised/styled (background, scrollbar, selection, links, lists, code) enumerated? [Completeness, Spec §FR-005]

## Requirement Clarity

- [ ] CHK007 Is "consistent visual foundation" quantified by the specific properties that must match (type size, line height, colour, spacing) instead of left subjective? [Clarity, Spec §US2]
- [ ] CHK008 Is the page-type attribute that switches palettes named unambiguously, with its allowed values and default stated? [Clarity, Spec §FR-003]
- [ ] CHK009 Is "primary navigation links" defined with the concrete destinations expected for this sprint? [Clarity, Spec §FR-006]
- [ ] CHK010 Is "degrading gracefully" for absent footer data defined with the expected rendered outcome (omitted vs empty)? [Ambiguity, Spec §FR-007]
- [ ] CHK011 Is the skip-to-content link's target and placement specified precisely ("first focusable", what element it targets)? [Clarity, Spec §FR-008]
- [ ] CHK012 Is the default behaviour for a page that declares no page type stated as a definite rule (default = portfolio)? [Clarity, Spec §"Edge Cases"]

## Requirement Consistency

- [ ] CHK013 Do the "no hard-coded values" rule (FR-009) and the "base styles from tokens" rule (FR-005) align without contradiction? [Consistency, Spec §FR-005, §FR-009]
- [ ] CHK014 Are the two P1 stories consistent about whether US1 (build/serve) requires any styling, or whether styling is wholly US2's concern? [Consistency, Spec §US1, §US2]
- [ ] CHK015 Do the header/footer data-source requirements (FR-006/FR-007) align with the navigation/social Key Entities definitions? [Consistency, Spec §"Key Entities"]
- [ ] CHK016 Is the reduced-motion requirement (FR-010) consistent with the rest of the spec (no conflicting "always animate" statements)? [Consistency, Spec §FR-010]

## Acceptance Criteria Quality (Measurability)

- [ ] CHK017 Is "clone to running local site in under 5 minutes" measurable with defined start/end points and a reference environment? [Measurability, Spec §SC-001]
- [ ] CHK018 Is the CSS budget criterion (≤ 30 KB compressed) defined with its measurement method (which build, compression algorithm)? [Measurability, Spec §SC-004]
- [ ] CHK019 Can "switching… changes only the page-type attribute (zero component markup changes)" be objectively verified as written? [Measurability, Spec §SC-002]
- [ ] CHK020 Is "100% of global text meets contrast ≥ 4.5:1" scoped to which text and states (body, muted, links, focus, both palettes)? [Clarity, Spec §SC-003]
- [ ] CHK021 Does each success criterion trace to at least one functional requirement and user story? [Traceability, Spec §"Success Criteria"]

## Accessibility (NFR)

- [ ] CHK022 Are contrast requirements specified for BOTH palettes and for non-body text (muted, accent-on-dark, links), not just default body text? [Coverage, Spec §SC-003]
- [ ] CHK023 Are keyboard focus-order requirements defined explicitly for the skip link → header → footer sequence? [Completeness, Spec §SC-005]
- [ ] CHK024 Is the visible focus-indicator requirement specified (which elements, which state) rather than implied? [Clarity, Spec §FR-008]
- [ ] CHK025 Are semantic-landmark requirements (`<main>`, `<nav>`, `<footer>`) stated for the base layout, per Constitution Principle III? [Gap, Spec §FR-004]
- [ ] CHK026 Is the reduced-motion requirement complete — covering ALL global transitions/animations rather than an unspecified subset? [Coverage, Spec §FR-010]

## Performance & Budget (NFR)

- [ ] CHK027 Is "0 KB blocking JavaScript" defined precisely (is deferred JS permitted; is any JS allowed this sprint)? [Clarity, Spec §SC-004]
- [ ] CHK028 Are font-loading performance requirements (`font-display: swap`, preload) specified, or explicitly deferred with rationale? [Gap, Spec §Assumptions]
- [ ] CHK029 Is layout stability (CLS) stated as a requirement for the skeleton, or intentionally excluded until a later sprint? [Coverage, Gap]
- [ ] CHK030 Is the measurement environment for the performance criteria (production build, mobile profile) specified? [Measurability, Spec §SC-004]

## Design-Token / Dual-Palette

- [ ] CHK031 Do the requirements make explicit that both palettes derive from one source with no duplicated component styles? [Consistency, Spec §FR-002, §FR-003]
- [ ] CHK032 Are the spacing base unit and the type-scale steps specified as requirements (not merely implied by the plan)? [Completeness, Spec §FR-002]
- [ ] CHK033 Is what must NOT be hard-coded (colours, font sizes, spacing) defined with enough precision to verify objectively? [Clarity, Spec §FR-009]

## Edge Case Coverage

- [ ] CHK034 Are missing-data requirements defined for data files beyond footer social (e.g. an absent navigation file)? [Coverage, Spec §"Edge Cases"]
- [ ] CHK035 Are narrow-viewport (~320px) no-horizontal-overflow requirements stated for the global foundation? [Edge Case, Spec §"Edge Cases"]
- [ ] CHK036 Is behaviour defined for a page with BOTH no declared layout and no page type (combined fallback)? [Coverage, Spec §"Edge Cases"]

## Dependencies & Assumptions

- [ ] CHK037 Is the assumption that sample/placeholder content is acceptable reconciled with the 5-minute onboarding criterion (SC-001)? [Assumption, Spec §Assumptions]
- [ ] CHK038 Is the dependency on self-hosted fonts vs a system-font fallback resolved or explicitly deferred? [Assumption, Spec §Assumptions]
- [ ] CHK039 Is the out-of-scope boundary (light mode deferred) consistent with the requirement that the token structure leaves room for it? [Consistency, Spec §Assumptions]

## Ambiguities & Conflicts

- [ ] CHK040 Is the term "world" (portfolio vs blog) defined once and used consistently across FR-003, US2, and the edge cases? [Ambiguity]

## Notes

- Check items off as the spec is confirmed/tightened: `[x]`.
- Items tagged `[Gap]` flag requirements likely absent from the current spec —
  decide to add them or accept the omission before implementing.
- Traceability: 39/40 items carry a `[Spec §…]` reference or a
  `[Gap]/[Ambiguity]/[Assumption]` marker.
