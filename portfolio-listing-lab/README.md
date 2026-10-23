# Nestlancer Portfolio — 10 Design Directions

A standalone redesign lab for the existing production page. All ten directions now follow a curved, river, or snake-inspired route system; concept 01 is preserved and concepts 02–10 were completely rebuilt around flowing SVG geometry.

- **Source:** https://app.nestlancer.com/portfolio
- **Production content audited:** 23 October 2026
- **Archive range:** 2020 — 2023 (two case studies per year)
- **Runtime:** Plain HTML, CSS, and JavaScript; no frameworks or external runtime dependencies

## Open the concepts

Start with `index.html` for the visual comparison gallery, then open any of `design-01.html` through `design-10.html`. Every concept includes a bottom design navigator for moving between directions.

## Production data preserved

All eight published projects keep their real production detail, now laid out as a four-year archive (2023 → 2020):

- Titles and real month/year labels (`Dec 2023` back to `Jun 2020`)
- Four archive years, two case studies each, newest year first
- Categories and summaries
- Technology tags
- Featured states
- Case-study URLs
- Project thumbnails (downloaded locally for reliable previews)

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

## The 10 directions

| # | Name | Design intent |
|---|---|---|
| 01 | Serpentine | Original approved winding-route template direction |
| 02 | Neon Current | A luminous river winding between cinematic dark stations |
| 03 | Editorial Meander | Large outer loops around serif-led case-study spreads |
| 04 | Chromatic Rapids | A multicolor current sweeping through vivid project chapters |
| 05 | Blueprint Delta | A measured technical channel through a two-column delta |
| 06 | Quiet Stream | A hairline stream with large imagery and generous whitespace |
| 07 | Wild Snake | A thick graphic snake with black outlines and brutalist cards |
| 08 | Glass River | A glowing translucent river beneath floating glass panels |
| 09 | Data Stream | Dashed organic data flow through terminal-style modules |
| 10 | Atelier Bend | A warm ribbon curling around arched editorial imagery |

## Shared functionality in every direction

- Discipline and year filters with live, faceted project counts
- Year-divided timeline groups (2023 → 2020) showing per-year case-study counts and disciplines
- A clear empty state when a discipline/year combination has no work
- Real production case-study links
- Local project and brand imagery
- Responsive layouts and mobile navigation behavior
- Scroll reveal treatment with reduced-motion support
- Previous/next concept navigation and comparison gallery

## File map

- `index.html` — visual design picker
- `design-01.html` … `design-10.html` — standalone concepts
- `assets/data.js` — production project data and concept metadata
- `assets/app.js` — shared renderer, filters, reveals, and serpentine SVG geometry
- `assets/designs.css` — shared foundations and the original Serpentine concept
- `assets/flow-designs.css` — nine completely rebuilt curved, river, and snake systems
- `assets/projects/` — eight production thumbnails
- `assets/brand/` — Nestlancer logo assets
- `assets/previews/` — generated concept thumbnails for the picker
- `reference/` — production source capture and visual/content audit
