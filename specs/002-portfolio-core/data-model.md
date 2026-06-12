# Data Model: Portfolio Core

Phase 1 output for `002-portfolio-core`. Defines the `_data` schemas the
portfolio sections consume. All content is author-edited YAML; templates read
these and MUST NOT hard-code values (Constitution Principle V).

## Entity: Project (`_data/projects.yml`)

A list of project entries rendered as cards in the projects grid.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | yes | Project name shown as card heading. |
| `description` | string | yes | One–two sentence summary. |
| `image` | string (path) | no | Cover image; omit → text-only/placeholder card. |
| `tags` | list of string | yes | Tech stack tags (e.g. Python, Snakemake). |
| `repo` | string (URL) | no | Source repository; renders repo link when present. |
| `demo` | string (URL) | no | Live demo; renders demo link when present. |
| `featured` | boolean | no (default false) | Emphasised / ordered first. |
| `post` | string (URL/path) | no | Linked write-up; enables "Read the write-up →" (used in Sprint 4 bridge). |

**Validation / rules**:
- `title`, `description`, and at least one `tag` MUST be present per entry.
- External URLs (`repo`, `demo`) open in a new tab with `rel="noopener"`.
- Ordering: featured first (stable order), then source order.

**Example**:

```yaml
- title: "GenomePipe"
  description: "Automated NGS pipeline for variant calling."
  image: "/assets/images/projects/genomepipe.png"
  tags: ["Python", "Snakemake", "Bioinformatics"]
  repo: "https://github.com/enricogimenez/genomepipe"
  demo: ""
  featured: true
  post: "/blog/bioinformatics/variant-pipeline/"
```

## Entity: Skill group (`_data/skills.yml`)

A list of categories, each containing skills, rendered grouped by category.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `category` | string | yes | Group heading (e.g. Languages, Frameworks, Tools, Wet Lab). |
| `items` | list of Skill | yes | Skills in this category. |

**Skill** (item within `items`):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | yes | Skill/tech name. |
| `level` | enum `basic`/`proficient`/`expert` | no | Optional proficiency indicator. |
| `icon` | string | no | Optional icon reference. |

**Example**:

```yaml
- category: "Languages"
  items:
    - { name: "Python", level: "expert" }
    - { name: "R", level: "proficient" }
    - { name: "Bash", level: "proficient" }
- category: "Wet Lab"
  items:
    - { name: "PCR / qPCR", level: "expert" }
    - { name: "NGS library prep", level: "proficient" }
```

## Entity: Profile facts (`_data/profile.yml` or page front matter)

Identity fields for the hero (FR-002) plus short key/value facts for the
about-section "terminal window" panel.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | yes | Author name shown as the hero `<h1>` (FR-002). May instead come from `site.title` / `_config.yml author.name`. |
| `tagline` | string | yes | One-line role tagline shown under the name in the hero (FR-002). May instead come from `_config.yml author.tagline`. |
| `facts` | list of `{ label, value }` | yes | Key facts (location, focus, role, etc.). |
| `bio` | string (markdown) | no | If set, overrides inline about copy. |

> The hero's `name` + `tagline` are content, not markup (Constitution Principle
> V). Author them in `_data/profile.yml` **or** `_config.yml` (`author.name`,
> `author.tagline`) — pick one source and keep templates free of hard-coded
> copy. The about panel and hero read from the same profile source.

**Example**:

```yaml
name: "Enrico Gimenez"
tagline: "Molecular Biologist · Bioinformatics & Data Science"
facts:
  - { label: "based_in", value: "São Paulo, BR" }
  - { label: "focus", value: "Bioinformatics · Data Science" }
  - { label: "current", value: "Molecular Biology research" }
```

## Reuse note

`social.yml` and `navigation.yml` are defined in Sprint 1 and reused by the
contact section and header. The `post` field on Project is consumed by the
Sprint 4 cross-linking work.
