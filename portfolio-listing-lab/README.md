# Nestlancer Portfolio — 4 Design Directions

A standalone redesign lab for the existing production page. Four shortlisted curved, river, or snake-inspired routes remain after review: concepts **01**, **03**, **04**, and **10**.

- **Source:** https://app.nestlancer.com/portfolio
- **Production content audited:** 23 October 2026
- **Archive range:** 2021 — 2023 (3 case studies per month, 108 total)
- **Runtime:** Plain HTML, CSS, and JavaScript; no frameworks or external runtime dependencies

## Open the concepts

Start with `index.html` for the visual comparison gallery, then open `design-01.html`, `design-03.html`, `design-04.html`, or `design-10.html`. Every concept includes a bottom design navigator for moving between directions.

## Demo archive dataset

The lab runs on a generated demo archive so every concept can be judged at real density:

- **Range:** 2021 — 2023 (three years)
- **Rhythm:** 12 months per year × 3 case studies per month
- **Total:** 108 case studies, 36 per year, 27 per discipline
- **Eight real production projects** are kept verbatim inside the archive (real titles, summaries, stacks, slugs and case-study URLs); the remaining 100 are deterministic demo records
- Demo records reuse the eight local production thumbnails by discipline, and link to the production portfolio listing

Regenerate the dataset with:

```bash
node tools/generate-demo-data.mjs
```

### How the archive is displayed

- **Newest year open, older years collapsed** — 2023 renders in full; 2022 and 2021 expand from their year header (or with the *Expand all years* control)
- **Month groups** inside each open year, so 36 case studies stay scannable
- **Year dividers** show per-year counts, months, and disciplines
- **Discipline + year filters** with live faceted counts and an empty state when a combination has no work

Case-study, contact, registration, navigation, and authentication links point to the existing production destinations.

## Old page audit

### What already works

- Clear page title and concise introductory copy
- Semantic project cards with useful technology metadata
- Chronological timeline and obvious case-study links
- Responsive layout with no mobile overflow
- Consistent Nestlancer navy and teal brand cues

### Opportunities found

1. **Weak visual hierarchy above the fold:** the hero is compact and does not communicate the size or breadth of the collection.
2. **Underused project imagery:** thumbnails are relatively small despite being the strongest proof of work.
3. **Excess empty space in the alternating timeline:** the desktop layout creates a long 5,870px page for only eight projects.
4. **Limited scanning and comparison:** categories are visible but cannot be used to filter the collection.
5. **Repetitive project rhythm:** every card has nearly identical visual weight, including featured projects.
6. **Minimal transition to the CTA:** the closing section works, but could carry more of the studio's personality.

## The 4 directions

| # | Name | Design intent |
|---|---|---|
| 01 | Serpentine | Original approved winding-route template direction |
| 03 | Editorial Meander | Large outer loops around serif-led case-study spreads |
| 04 | Chromatic Rapids | A multicolor current sweeping through vivid project chapters |
| 10 | Atelier Bend | A warm ribbon curling around arched editorial imagery |

## Shared functionality in every direction

- Discipline and year filters with live, faceted project counts
- Collapsible year sections (2023 open, 2022/2021 closed) with month groups and per-year metadata
- A clear empty state when a discipline/year combination has no work
- Real production case-study links
- Local project and brand imagery
- Responsive layouts and mobile navigation behavior
- Scroll reveal treatment with reduced-motion support
- Previous/next concept navigation and comparison gallery

## File map

- `index.html` — visual design picker
- `design-01.html`, `design-03.html`, `design-04.html`, `design-10.html` — shortlisted standalone concepts
- `assets/data.js` — demo archive dataset (108 projects) and concept metadata
- `tools/generate-demo-data.mjs` — regenerates the dataset deterministically
- `tools/verify-templates.mjs` — validates `index.html` and the shortlisted design templates, CSS tokens/contrast, animations, and dataset integrity
- `assets/app.js` — shared renderer, filters, reveals, and serpentine SVG geometry
- `assets/designs.css` — shared foundations and the original Serpentine concept
- `assets/flow-designs.css` — curved, river, and snake systems for concepts 03+
- `assets/projects/` — eight thumbnails shared across the archive
- `assets/brand/` — Nestlancer logo assets
- `assets/previews/` — generated concept thumbnails for the picker
- `reference/` — production source capture and visual/content audit
