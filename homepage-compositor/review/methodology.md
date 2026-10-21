# UI review methodology

`tools/review.mjs` scores all 21,600 composed homepages on the nine aspects from the
compositor brief. This file records exactly what is measured, what is a reviewer
judgement, and what was not verified, so the ranking can be audited or deliberately
re-tuned.

**Result:** top **44/45** · lowest **38/45** · median **41/45** · mean **40.94**
(2 combos at 44, 684 at 43, 5,652 at 42, 8,695 at 41, 4,943 at 40, 1,452 at 39, 172 at 38).

## Inputs

| Input | Where it comes from | Nature |
|---|---|---|
| Per-sample design traits | `tools/lib/traits.mjs` | hand-authored reading of each of the 29 approved samples (surface, texture/darkness/elevation vector, motion 0–3, density, one-line description) |
| Measured CSS/markup facts | `tools/extract.mjs` → `fragments/*/*/meta.json` → `metrics` | media queries, distinct font sizes, radius count, looping animations, `prefers-reduced-motion` presence, literal font stack, fluidity (`clamp`/`minmax`/`auto-fit`), max fixed width, text chars, element count, hard-coded colour count |
| Cross-slot relations | combination rules below | sticky×sticky, dark×dark, mass ratios, surface-family spread, tie-break rules |

Every metric in `meta.json` is reproducible: `node tools/extract.mjs --check` re-derives
all 29 fragments and fails on drift. Traits are a documented judgement; edit them and
re-run `tools/review.mjs` to change the ranking.

## Aspects

Each aspect is scored 1–5 in 0.1 steps; the integer-rounded sum is the total (45 max).

1. **Seam integrity** — starts at 5. Docked for hard cuts a visitor would notice:
   a dark proof plane between light sections (−0.5), two dark masses meeting at
   money → why (−1), floating pill header over a hard 50/50 hero split (−0.5),
   orbital close stacked on a floating footer card (−0.5), sticky×sticky header/work
   (−0.25), dark why over a floating footer (−0.25). The shell's sticky-offset and
   anchor-scroll fixes are already applied to every page, so they are not charged.
2. **Visual hierarchy** — docked when the work grid carries more than 2.2× the hero's
   mass (text + 12 px/element), when a hero exceeds 110 elements, when two spacious
   proof sections run back to back, or when two sections both run maximum motion.
3. **Skin coherence** — standard deviation of the texture and elevation vectors across
   the eight slots, plus penalties for more than one dark plane and for more than two
   mixed-darkness sections. A run that keeps one surface family scores ~5; a run that
   stacks glass, print, terminal, dark and floating chrome drops to ~3.8.
4. **Typography & spacing** — total distinct font sizes across the page (>95 and >110
   docked), sections carrying their own literal system stack (−0.25), sections with
   more than thirteen distinct sizes (−0.25 each, max two), square-edged panels beside
   pill chrome (−0.25).
5. **Motion quality** — motion budget (sum of the eight motion traits), looping
   animation count, and whether **every** fragment ships a `prefers-reduced-motion`
   branch (a page without one loses a full point).
6. **Theme integrity** — the sample set is theme-complete; the charges are for the
   always-dark W04/W05 proof plane (−0.25), heavy hard-coded colour use, and a terminal
   money surface next to that dark plane (−0.25).
7. **Responsive behaviour** — per-fragment breakpoint coverage averaged over the eight
   slots (4+ media queries = 1.0, 3 = 0.9, 2 = 0.8, 1 = 0.6, 0 = 0.25), +0.15 for a
   fluid fragment (`clamp`/`minmax`/`auto-fit`), −0.2 for a fixed max-width above
   1100 px, scaled to 5.
8. **Content fidelity** — full marks for every combo because `tools/verify.mjs`
   mechanically requires all eight section markers, the four locked anchors and
   `© 2026 Nestlancer` on every page; a page that failed any of them would not be in
   the dataset.
9. **Overall feel** — the mean of aspects 1–8, +0.3 when seam and skin are both ≥4,
   +0.2 when CTA and footer share a surface family, +0.2 when header and footer match,
   −0.3/−0.6 when six/seven distinct surface languages appear.

## Ranking and top 50

Records sort by total desc, then the unrounded score desc, then canonical combo index
asc — fully deterministic.

The top 50 never reaches below the 50th-highest total (cutoff **43**): the two 44s and
48 of the 43s. Inside that tie band the selection is **diversity-aware** — one
hero × work pairing each before any pairing repeats — so the hand-off is not 50
variations of one winner while never promoting a lower-scored combo over a higher one.
The 50 are then re-sorted by score (44s first), and the remaining 209 combos at 43 are
simply outside the 50-slot budget. Every entry is a scored combo; nothing is labelled
"top 50" without a record in `review/scores.json`.

## Behavioural coverage

`tools/dom-smoke.mjs` executed **all 21,600** composed pages in linkedom (a JS DOM, no
layout): zero script errors, theme toggle correct on every page, mobile menu open/close,
hero reveals fired, every count-up landed on its locked figure, S02 filters and S03 tabs
working. See `review/dom-smoke.json`. This covers behaviour, not layout.

## What was not verified

- **Horizontal overflow at 390/768/1024/1440** was *not* measured (the DOM smoke has no
  layout engine, so it cannot see it). Chromium cannot
  launch in this sandbox (missing `libnspr4`/`libnss3`/`libnssutil3`) and no other
  engine is available, so `tools/verify.mjs` prints `NOT MEASURED` instead of claiming
  a pass. The CSS carries the samples' own breakpoints (2–7 per fragment); the gallery
  preview iframe is the intended way to eyeball a page at a chosen width.
- **Pixel-level visual review** was not performed. The eight non-mechanical aspects are
  rubric judgements over measured facts, as described above.
- **Contrast, focus order and screen-reader output** were not audited with a browser or
  assistive tech; the samples' own accessibility work (labelled sections, focus-visible
  styles, reduced-motion branches, ARIA tabs in S03) is preserved unchanged.

## Re-running

```bash
node homepage-compositor/tools/review.mjs          # ~4 s, rewrites scores/summary/top50 folders
node homepage-compositor/tools/gallery.mjs         # rebuild gallery + top50.html + hand-off copies
```

`review/scores.json` is a flat array of `{ combo_id, label, index, total, exact, aspects, note }`
sorted by rank. `review/summary.json` adds the distribution and a readable top-50 list.
