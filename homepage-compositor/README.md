# Nestlancer homepage compositor

Every legal combination of the eight approved shortlist slots, composed into a full
homepage — **21,600 pages**, batched, verified against the sample-ID matrix, reviewed
on nine UI aspects, and handed off as a top 50.

This folder **does not redesign anything**. The 29 shortlist samples in
`homepage-header/`, `homepage-hero/`, `homepage-delivery/`, `homepage-financial-clarity/`,
`homepage-why-nestlancer/`, `homepage-selected-work/`, `homepage-closing-cta/` and
`homepage-footer/` remain untouched; the compositor extracts them, namespaces their
CSS/JS, and stitches them in the fixed order.

```
3 × 5 × 5 × 4 × 2 × 4 × 3 × 3 = 21,600
H   H   D   M   W   S   C   F
```

| Slot | Lab | Samples |
|---|---|---|
| Header | `homepage-header` | P01 · P02 · P04 |
| Hero | `homepage-hero` | H01 · H03 · H07 · H08 · H09 |
| Delivery (FIG 02) | `homepage-delivery` | D01 · D03 · D06 · D09 · D10 |
| Financial clarity | `homepage-financial-clarity` | M01 · M03 · M04 · M05 |
| Why Nestlancer (FIG 04) | `homepage-why-nestlancer` | W04 · W05 |
| Selected work (FIG 05) | `homepage-selected-work` | S01 · S02 · S03 · S10 |
| Closing CTA (FIG 06) | `homepage-closing-cta` | C01 · C03 · C04 |
| Footer | `homepage-footer` | P01 · P04 · P05 |

Header and footer both use the `P##` code family by design; identity is slot-scoped
(`sample_id_matrix` in `inventory.json` is keyed by slot, and every combo is checked
against the matrix for its own slot only).

## Run it

The folder has **three different document roots** and each one shows something
different — most 404s people hit are just the wrong root:

| You want | Serve this root | Open |
|---|---|---|
| Everything, including all 21,600 composed pages | repository root | `/homepage-compositor/` |
| Only the review + the 50 hand-off pages (no build needed) | `homepage-compositor/review/` | `/` or `/top50.html` |
| Just the gallery shell (no page previews) | `homepage-compositor/` | `/` |

The simplest option is the bundled server, which picks the right root, redirects
`/` to the gallery and prints the URLs that resolve:

```bash
node homepage-compositor/tools/serve.mjs            # repo root, port 8125
node homepage-compositor/tools/serve.mjs --review   # review/ only, no pages/ needed
node homepage-compositor/tools/serve.mjs --port 8001
```

`python3 -m http.server` works too, as long as you start it in the matching folder:

```bash
cd ui-designing-homepage && python3 -m http.server 8125        # → /homepage-compositor/
cd homepage-compositor/review && python3 -m http.server 8001   # → /  and /top50.html
```

# pipeline (Node 18+, no dependencies)
node homepage-compositor/tools/extract.mjs          # 29 samples  -> fragments/
node homepage-compositor/tools/compose.mjs --all    # 21,600 pages (1200 per batch)
node homepage-compositor/tools/review.mjs           # scores 21,600, writes top 50
node homepage-compositor/tools/gallery.mjs          # index.html + review/top50*
node homepage-compositor/tools/verify.mjs           # all gates, writes verify.log
npm i --no-save linkedom
node homepage-compositor/tools/handoff-smoke.mjs    # boot the 50 hand-off copies
```

Compose flags: `--batch N` (1–18), `--batch-size 1000..1500`, `--only <combo-id>`,
`--resume` (skip complete folders), `--clean` (rebuild `pages/`; never touches the labs).

## Layout

```
homepage-compositor/
  index.html                  filterable gallery (all 21,600, deep-linkable)
  manifest.json               all 21,600 combo ids + slot maps (~6 MB)
  inventory.json              shortlist map, counts, product, sample-ID matrix
  verify.log                  last verification run
  fragments/<slot>/<folder>/  markup.html · styles.css · script.js · meta.json
  shared/
    tokens.css                one page-level token block (light + dark)
    theme-boot.js             the single theme controller
    slot-runtime.js           slot-scoped document facade + rescue
    assets/                   logos (4 SVG) + illustrative work images (8 JPG)
  pages/<combo-id>/           index.html + combo.json  (21,600 folders)
  review/
    scores.json               all 21,600 review records, ranked
    summary.json              distribution, top-50 table
    methodology.md            how the review was scored
    top50.html                ranked top-50 table with per-aspect scores
    index.html                landing page for serving review/ as its own root
    shared/assets/            bundled copy of the 12 assets the hand-off pages need
    top50/<combo-id>/         hand-off copy: single file, CSS + JS inlined, assets local
  tools/                      extract · compose · review · gallery · verify ·
                              dom-smoke · handoff-smoke · serve + lib/
```

`pages/` holds **~830 MB** because each of the 21,600 folders carries a full
`combo.json` (slot provenance + its review block) next to a ~31 KB `index.html`.
The page itself does not inline CSS or JS: it links the eight fragment stylesheets and
the fragment scripts, so the 29 designs exist once on disk. That is why a page is
31 KB instead of 150 KB, and why `pages/` stays around 0.8 GB rather than 3 GB.

## What a composed page is

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"> <meta name="viewport" …> <title>P04 · H08 · … · Ftr-P04 — …</title>
  <meta name="combo-id" content="hdr-P04__hero-H08__…__ftr-P04">
  <script>/* theme boot before paint: ?theme → localStorage → OS */</script>
  <link rel="stylesheet" href="../../shared/tokens.css">
  <link rel="stylesheet" href="../../fragments/{slot}/{folder}/styles.css"> × 8
</head>
<body>
  <a class="nl-skip" href="#main">Skip to content</a>
  <header data-slot="header" …>                       ← P01/P02/P04 header
  <main id="main" tabindex="-1">
    <section data-slot="hero" …>                      ← H##
    <section data-slot="delivery" id="how-it-works">  ← D##
    <section data-slot="financial" id="financial-clarity">
    <section data-slot="why" id="why-nestlancer">
    <section data-slot="work" id="selected-work">
    <section data-slot="cta" id="start">
  </main>
  <footer data-slot="footer" …>                       ← P01/P04/P05 footer
  <script src="../../shared/slot-runtime.js"></script>
  <script src="../../fragments/{slot}/{folder}/script.js"></script> × N
  <script src="../../shared/theme-boot.js"></script>
</body>
</html>
```

Combo id: `hdr-P01__hero-H01__del-D01__fin-M01__why-W04__work-S01__cta-C01__ftr-P05`
Short label: `P01 · H01 · D01 · M01 · W04 · S01 · C01 · Ftr-P05`

## Extraction contract (what the compositor changes)

**Verbatim:** all markup inside each slot, locked copy, ₹ figures, disclaimers,
FIG labels, section ids (`#how-it-works`, `#financial-clarity`, `#why-nestlancer`,
`#selected-work`, `#start`), footer columns and © line.

**Changed — page plumbing only:**

| Concern | Treatment |
|---|---|
| CSS collisions | every selector rewritten to `[data-slot="<slot>"] …`; a selector whose first compound *is* the fragment's root (`.nav`, `.why`, `.money`) becomes the slot scope itself |
| Tokens | each fragment's `:root` / `[data-theme="dark"]` block is diffed against `shared/tokens.css`; only genuinely different keys are re-emitted, scoped to the slot (e.g. W04's dark convergence plane) |
| `@keyframes` | namespaced (`ping` → `nl-hero-0-ping`) so a hero animation can never drive a money panel |
| Theme fabs | deleted from all 18 section samples; the header's own button becomes the page's only theme control (`data-theme-toggle`) |
| Lab chrome | `is-framed` preview rules, `postMessage` frame hooks, skip links, sample notes, `<main>` wrappers removed |
| Page backgrounds | a sample's `body{background:var(--bg)}` is stripped before it lands on the slot root — otherwise a sticky header wrapper (P04) would paint over the page |
| Scripts | each fragment script wrapped in an IIFE whose `document` is a slot-scoped facade: `getElementById`/`querySelector` cannot leave the slot, theme controls resolve to a detached stub, and a thrown error calls `NL.rescue()` which reveals the section instead of leaving it blank |
| Asset paths | `../../assets/…` → `../../shared/assets/…` (logos + 8 illustrative work images, copied once) |
| Theme contract | one boot in `<head>` (`?theme` → `nl-theme` → OS), one writer in `shared/theme-boot.js`, `prefers-color-scheme` followed only when the visitor has not chosen |

**Seam fixes** (admitted into the page shell, not into the samples):

- sticky work previews (S03 `.preview`, S10 `.pin`) are offset by the sticky header
  height (`top:calc(22px + 72px)`) so the two sticky planes never overlap;
- `scroll-margin-top:92px` on every section anchor so `#how-it-works` from the hero
  lands under P02/P04 instead of behind them;
- `#main{tabindex="-1"}` so the skip link moves real keyboard focus.

## Review

`tools/review.mjs` scores all 21,600 combinations on the nine aspects (45 max) and
writes `review/scores.json`, `review/summary.json`, a review block into every
`pages/<combo-id>/combo.json`, and the top 50. The rubric — what is measured, what is
a reviewer judgement, and what was **not** verified — is in
[`review/methodology.md`](review/methodology.md).

Result: **top 44/45 · median 41/45 · mean 40.94 · lowest 38/45**.

The top 50 is diversity-aware inside score ties: the first 20 picks cover distinct
hero × work pairings, the remaining 30 are strict score order. Ties are broken by the
unrounded score, then canonical index, so the list is reproducible.

## Behavioural check (all 21,600 pages)

`tools/dom-smoke.mjs` (optional; needs `npm i --no-save linkedom`) parses every composed
page, executes its real scripts against a stubbed DOM, and then clicks what a visitor
clicks. It was run over **all 21,600 pages** (195 s):

```
pages executed: 21600
  script_errors: PASS     theme_toggle: PASS   mobile_menu: PASS   hero_reveal: PASS
  count_up: PASS          work_filter: PASS    work_tabs: PASS
Gate: PASS
```

i.e. every page mounts without a script error, has exactly one working theme control
(flips `data-theme` + `aria-pressed`), opens/closes its mobile menu, runs its hero
reveals, lands every count-up on its locked figure, filters the work grid correctly and
swaps the split-viewer tab. Results: `review/dom-smoke.json`.

### Hand-off copies (the 50 single-file pages)

`tools/handoff-smoke.mjs` (needs the same `linkedom`) checks the generated
`review/top50/<combo>/index.html` files directly, because they are produced by a
different code path: CSS and JS are inlined into one file instead of linked. It boots
each file exactly as shipped and asserts that

- every inline `<script>` parses and executes without error,
- one theme control flips the page both ways, the mobile menu opens and closes,
- every `[data-reveal]` gets `.is-in`/`.in`, and every element hidden by a
  `.js … {opacity:0}` rule ends up inside `.is-in` — i.e. no section is left blank,
- each of the eight slots is present once, in order, with real text (≥ 60 chars),
- count-ups land on their locked figures and every bundled asset resolves,
- the copy carries **exactly** the same words as `pages/<combo>/index.html`.

```bash
npm i --no-save linkedom
node homepage-compositor/tools/handoff-smoke.mjs
# pages: 50/50 · inline scripts: 100 · reveals: 1224 · opacity-gated elements: 1551
# failures: 0 · gate: PASS   → review/handoff-smoke.json
```

`verify.mjs` also parses every inline script in all 50 files and compares their text
with the composed page, so this cannot regress silently.

## Known limits (read before trusting anything visual)

1. **No browser engine in this sandbox.** Chromium could not launch (missing NSS
   libraries) and no Playwright/WebKit build is available, so:
   - `horizontal overflow` is **not measured** — it is reported as `NOT MEASURED` in `verify.log`;
   - the review is a **rubric + metrics** pass over the extracted fragments, not a
     pixel inspection of 21,600 screenshots (behaviour is covered by the DOM smoke
     above; layout and paint are not). `content` is verified mechanically on
     every page; the other eight aspects are derived from per-sample traits and
     measured CSS/markup facts.
   To eyeball results, serve the repo and use the gallery preview iframe (it loads a
   real page at any viewport you resize it to).
2. **Links to the wider site** (`/product`, `/portfolio`, `/proto/…`) are inherited
   from the samples and point at the production routes — they are not resolvable in
   this repository, exactly as in the source samples.
3. **W04/W05 (Why Nestlancer) are always dark.** Light mode therefore keeps one dark
   proof plane by design of the approved samples; the review charges a small penalty
   for it rather than "fixing" the design.
4. `review/top50/<combo>/index.html` is the only place CSS/JS are inlined: the hand-off
   copies must open from disk without the fragments folder. Their logos/images resolve
   to `../../shared/assets/`, which is copied into `review/shared/assets/`, so the whole
   `review/` folder is portable — it can be served on its own, zipped, or opened from
   disk, with no `pages/` build and no network.
5. `pages/` is not in the clone. The gallery detects that at runtime: it keeps the
   filters, deep links and scores, links the 50 reviewed combos to their bundled
   copies, and marks the remaining rows `not built` with the one-line build command
   instead of sending you to a 404. `review/top50.html` does the same for its
   "live page" links.

## Gates at a glance (last full run)

```
## INVENTORY + IDENTITY GATE
header 3/3 [P01 · P02 · P04] · hero 5/5 [H01 · H03 · H07 · H08 · H09]
delivery 5/5 · financial 4/4 · why 2/2 · work 4/4 · cta 3/3 · footer 3/3
sample-ID matrix: 29/29 · product: 21600 · missing folders: none          Gate: PASS

## FRAGMENT GATE
fragments written: 29/29 · lab chrome stripped: YES
anchors preserved (how-it-works, why-nestlancer, selected-work, start, main): YES
                                                                          Gate: PASS

## COMPOSE GATE
batches run: 18/18 (batch size 1200) · pages on disk: 21600/21600
combo.json present: 21600/21600 · manifest entries: 21600
sample-ID cross-check: 21600/21600 · failed writes: 0                     Gate: PASS

## UI REVIEW GATE
combos reviewed: 21600/21600 · scores written: 21600/21600
top score: 44/45 · lowest: 38/45 · median: 41/45 · mean: 40.94
top50 list written: YES · top50 folders on disk: 50/50                    Gate: PASS

## VERIFY GATE
automated count/markers: PASS · sample-ID cross-check: PASS
asset links resolve: PASS · spot matrix (50 seeded combos): 50/50 PASS
top-50 hand-off: 50/50 self-contained · content parity: 50/50 · network refs: 0
duplicate ids: 0 · browser scripts parse: 63/63 documents (incl. all 50 copies)
hand-off smoke: 50/50 pages, 1,224 reveals, 1,551 opacity-gated elements, 0 failures
horizontal overflow found: NOT MEASURED (no browser engine)
DOM smoke: 21600/21600 pages executed, 0 failures                         Gate: PASS
```

`verify.log` is the machine-written copy of the last run.

## If `pages/` is missing or trimmed

`pages/` is generated output and is git-ignored to keep the repository small, so a
fresh clone does **not** have it. Everything else still works: the 50 hand-off pages are
bundled and self-contained, and the gallery degrades to a scored manifest. When you
want to browse all 21,600, rebuild byte-identically in ~15 seconds:

```bash
node homepage-compositor/tools/compose.mjs --all      # or --resume to fill gaps only
node homepage-compositor/tools/review.mjs             # re-attach review blocks + top 50
node homepage-compositor/tools/gallery.mjs            # rebuild gallery + hand-off copies
```

`tools/extract.mjs --check` proves the 29 fragments still match the approved samples.

## Regeneration guarantees

Same `inventory.json` + same `fragments/` ⇒ byte-stable combo ids, file set and
manifest. Order is canonical (header → … → footer, each slot in the order of its lab's
shortlist); no randomness anywhere in extraction, composition or ranking.
