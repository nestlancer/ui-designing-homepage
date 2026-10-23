# Nestlancer winding roadmap — design anatomy (gold standard)

This folder is the **approved visual parent** for `portfolio-listing-prompt.md` v2.3.
Open `index.html` locally (`python3 -m http.server` from this folder) before designing any `PL##`.

Visual direction also cites: `https://visme.co/blog/wp-content/uploads/2021/08/4.jpg` (layout only — not embedded).

## What the page is

A Nestlancer portfolio listing as a **winding project journey**, not a straight timeline spine and not a card grid.

Desktop reads as: **3-column CSS grid of project stops** where odd rows flow left→right and even rows flow right→left, with a **dashed SVG snake** drawn through the numbered markers. Tablet uses 2 columns with the same snake logic. Mobile stacks one column with a vertical winding path on the left.

## Required anatomy (every approved template inherits this)

| Piece | Implementation in this prototype | Must keep in PL variants |
|---|---|---|
| Hero | `FIG · The journey` · H1 “Selected work, **connected.**” · journey subcopy · mono meta “8 projects / 2026 / One connected journey” | Journey framing + FIG voice |
| Section head | `FIG · Roadmap` · “The project journey” · phase legend Discover / Build / Deliver | Legend + roadmap framing |
| Canvas | Lavender (or dark) panel with **dotted** background, rounded border | Dotted journey canvas |
| Bookends | Start (“The starting line”) + Finish (“The next stop could be yours” + CTA) | Start + End bookends |
| Route SVG | Absolute SVG over the canvas; `path.route-halo` + dashed `path.route-line` with **linear gradient** blue→violet→coral→orange | Continuous dashed snake through markers |
| Path geometry | JS measures `.stop-marker` positions and builds an SVG `d` with horizontal runs + **rounded U-turns** at row ends (`Q` curves, radius ~30). Mobile uses vertical cubic snakes | Path follows **real stop positions** (not a fixed decorative doodle) |
| Snake order | Desktop/tablet: `gridColumn = row%2===0 ? col+1 : columns-col` so visual order snakes while **DOM order stays 01…08** | Numerical DOM order; visual snake |
| Stop | Category icon + label · numbered circle marker (`01`–`08`) · short connector · project card | Marker + card per project |
| Card | 16:10 image · date · title · summary · stack chips · “View case study →” | Real project content |
| Phase colour | `--stop-color` per stop; gradient + legend: Discover `#326594`, Build `#7957a5`, Deliver `#c05f87` / `#ee9569` | Phase colour system (may map to Nestlancer teal/navy variants in lab tokens) |
| Active stop | `data-active` fills marker | Keyboard/scroll/selection affordance |
| Chrome | Nestlancer header/footer, theme toggle, mobile nav | Keep Nestlancer chrome |

## Files

- `index.html` — structure + 8 project stops
- `roadmap.css` — winding roadmap skin
- `roadmap.js` — responsive SVG route + snake grid placement
- `styles.css` / `script.js` — base Nestlancer page chrome / theme
- `assets/` — logos, fonts, project images

## How PL01–PL20 should vary

Vary **within** this anatomy: column count, snake tightness, canvas colour, marker style, legend labels, preview dock placement, motion (path-draw, active marker), density, dark editorial — **do not** replace it with a straight center spine, a plain card grid, or a floating infographic doodle that does not connect through the stop markers.

## Anti-patterns (explicitly not this design)

- Straight vertical center line with cards left/right
- CSS grid of cards with **no** dashed snake through markers
- Fixed SVG path that ignores stop positions when the layout reflows
- Reversing DOM order of projects to fake the snake (keep DOM 01→08; flip columns in CSS/JS)
