# Nestlancer Homepage Compositor — Master Agent Prompt
### Combine 8 shortlist section labs → **exactly 21,600** full HTML homepages
### Batching · unique-sample-ID verification · UI review · top-50 delivery

> Paste this whole file into an agent (Cursor, Claude Code, Arena) with the **`ui-designing-homepage`** repo open.
>
> Upstream work already shipped the **section shortlists**. This prompt does **not** invent new section designs. It **composes** every legal combination of the approved samples into complete, offline, self-previewable homepage HTML pages, batches the write for workspace safety, reviews the result as a UI critic, and hands you the top 50 for manual inspection.

---

## 1. YOUR ROLE

You are, at the same time:

1. **A compositor / build engineer.** Extract, namespace, stitch, and write pages at combinatorial scale without hand-editing 21,600 files.
2. **A senior front-end craftsperson.** Combined pages must still be valid semantic HTML, theme-safe, accessible, and free of ID/CSS/JS collisions.
3. **A harsh design critic of seams only.** You do not redesign sections. You do reject broken joins (double theme toggles, missing `#how-it-works`, leaked lab chrome, broken logo paths, horizontal overflow from stacked styles).
4. **A faithful content guardian.** Locked Nestlancer copy from `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md` stays intact because the source samples already carry it — never rewrite, paraphrase, or invent claims while composing.
5. **A UI reviewer / end-user.** After pages are composed, step into the shoes of a visitor and a design reviewer: judge each combination on layout rhythm, visual hierarchy, colour/skin coherence, motion quality, readability, and general "does this feel like one honest Nestlancer page or a stitched-together collage?" — and rank the results.

---

## 2. THE MISSION (read twice)

| Stage | Quantity | Output |
|---|---|---|
| **0 · Inventory + identity gate** | 8 labs · 29 samples | Confirm every shortlist folder exists; confirm each sample carries its own unique ID code |
| **1 · Normalize** | 29 fragments | Extract section HTML + scoped CSS + JS per sample |
| **2 · Compose (batched)** | **21,600** full pages | One `index.html` per combination, written in batches of 1000–1500 |
| **3 · Cross-combo verification** | 21,600 checks | Every combo verifies against the sample-ID matrix; no orphan or mis-paired slots |
| **4 · Index** | 1 gallery + 1 manifest | Browse / filter / deep-link any combo |
| **5 · UI review** | 21,600 review records | Score every combo on UI aspects; surface the top 50 |
| **6 · Top-50 delivery** | 50 full HTML pages | Complete `index.html` for each top combo, ready for manual review |
| **7 · Verify** | sample matrix + spot checks | Delivery report |

### Math lock (do not invent other counts)

| Slot | Lab directory | Shortlist folders (exact) | Count | Unique ID prefix |
|---|---|---|---|---|
| **Header** | `homepage-header/samples/` | `P01-classic` · `P02-glass` · `P04-pill` | **3** | `P##` |
| **Hero** | `homepage-hero/samples/` | `H01-ground-truth` · `H03-editorial-ledger` · `H07-money-first` · `H08-command-rail` · `H09-split-mirror` | **5** | `H##` |
| **Delivery (FIG 02)** | `homepage-delivery/samples/` | `D01-continuum-rail` · `D03-bento-proof` · `D06-mesh-flow` · `D09-progress-path` · `D10-magnetic-stack` | **5** | `D##` |
| **Financial clarity** | `homepage-financial-clarity/samples/` | `M01-broadsheet-total` · `M03-receipt-print` · `M04-rails-terminal` · `M05-cashflow-staircase` | **4** | `M##` |
| **Why Nestlancer (FIG 04)** | `homepage-why-nestlancer/samples/` | `W04-scope-fold` · `W05-gate-logic` | **2** | `W##` |
| **Selected work (FIG 05)** | `homepage-selected-work/samples/` | `S01-case-grid` · `S02-filter-bar` · `S03-split-viewer` · `S10-sticky-showcase` | **4** | `S##` |
| **Closing CTA (FIG 06)** | `homepage-closing-cta/samples/` | `C01-quiet-meridian` · `C03-four-point-orbit` · `C04-editorial-endnote` | **3** | `C##` |
| **Footer** | `homepage-footer/samples/` | `P01-classic` · `P04-pill` · `P05-centered` | **3** | `P##` (footer) |

```
3 × 5 × 5 × 4 × 2 × 4 × 3 × 3 = 21,600
```

**Build every combination. No stubs. No "representative subset" unless the user later asks to downscope.**
If disk or time forces a batching strategy, still produce **all 21,600** files before declaring done — batch writes are fine; shrinking the cartesian product is not.

### What changes vs what stays

| Stays (source of truth) | Changes (compositor only) |
|---|---|
| Every sample's visual design, locked copy, figures, disclaimers | Page shell that hosts all 8 slots |
| Brand tokens already used inside samples | Shared `:root` tokens once at page level |
| Section IDs that other sections link to (`#how-it-works`, `#start`, …) | Asset path rewrites + CSS/JS namespacing |
| Content from section prompts 01–06 + chrome labs | Manifest ID, title, meta describing the combo |

---

## 3. READ FIRST — in this order, before writing code

1. **This prompt** end-to-end.
2. **`docs/homepage-section-prompts/README.md`** — shared contract (brand, a11y, offline, no CDN).
3. **`docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`** — locked story / page map (header → hero → FIG02 → money → FIG04 → FIG05 → FIG06 → footer).
4. Section prompts (content contract, not redesign tasks):  `
   docs/homepage-section-prompts/01-hero.md` … `06-closing-cta.md`
5. **`homepage-prompt.md`** — brand tokens, theme boot, offline rules (reuse; do not re-run the 100-site research or invent 20 new homes).
6. Open **one sample per lab** and confirm how markup is shaped (`<section>`, `header.html` / `footer.html`, theme fab, `<style>`, `<script>`).
7. Reference shot (content only): `Nestlancer-public-screenshots/public/013-marketing-homepage.webp`

**Touch only:** `homepage-compositor/` (new), and optional thin links from root `README.md` / `docs/homepage-section-prompts/README.md`.  **
Do not edit** existing shortlist sample HTML to "make composing easier" unless a true bug blocks extraction — prefer adapters in the compositor.

---

## 4. PAGE ORDER (fixed)

Every composed page must render this top→bottom order:

```
[skip link]
[HEADER sample]
<main id="main">
  [HERO sample]
  [DELIVERY sample]          <!-- must keep id="how-it-works" (or equivalent already in sample) -->
  [FINANCIAL CLARITY sample]
  [WHY NESTLANCER sample]    <!-- id="why-nestlancer" -->
  [SELECTED WORK sample]     <!-- id="selected-work" -->
  [CLOSING CTA sample]       <!-- id="start" -->
</main>
[FOOTER sample]
```

No reordering. No dropping a slot. No inserting new marketing sections.

---

## 5. COMBINATION ID + PATHS

### 5.1 Combo ID (canonical)

Use a stable, sortable ID with **eight slots** (header and footer both use `P##`, so prefixes are mandatory):

```
hdr-P01__hero-H01__del-D01__fin-M01__why-W04__work-S01__cta-C01__ftr-P05
```

Short display label (gallery / `<title>`):

```
P01 · H01 · D01 · M01 · W04 · S01 · C01 · Ftr-P05
```

### 5.2 Output layout

```
homepage-compositor/
  README.md
  index.html                         ← filterable gallery (must handle 21,600 without freezing UI)
  manifest.json                      ← array of all combos (or sharded JSON — see §8)
  inventory.json                     ← locked shortlist map + math proof + sample-ID matrix
  tools/
    extract.mjs | extract.py         ← sample → fragment
    compose.mjs | compose.py         ← cartesian product → pages (batched)
    verify.mjs | verify.py           ← count + sample-ID cross-check + spot checks
    review.mjs | review.py           ← score + rank all combos; emit top-50 list
  fragments/                         ← normalized, reusable pieces (29)
    header/P01-classic/{markup.html,styles.css,script.js,meta.json}
    hero/H01-ground-truth/...
    ...
  shared/
    tokens.css                       ← single Nestlancer token block from homepage-prompt.md §4.3
    theme-boot.js                    ← one theme boot (?theme → localStorage → OS)
    assets/                          ← logos copied once from /assets (or symlink)
  pages/
    hdr-P01__hero-H01__del-D01__fin-M01__why-W04__work-S01__cta-C01__ftr-P01/
      index.html                     ← full page
      combo.json                     ← slot map + source paths + review scores
    … (21,600 folders)
  review/
    scores.json                      ← all 21,600 review records
    top50.html                       ← single HTML page listing top 50 with links
    top50/                           ← 50 full combo folders copied / symlinked for hand-off
```

Asset rule: logos live in `homepage-compositor/shared/assets/` (or root `assets/` with correct relative paths). **Do not copy SVG logos into each of the 21,600 folders.**

Disk note: expect on the order of **~1–3 GB** if CSS/JS are inlined per page. Prefer:

- shared `tokens.css` + theme boot linked once, and  `
- **section CSS/JS inlined but stripped of duplicate `:root` / lab chrome**,  `

so pages stay offline-openable as single files *or* as folder+shared links that work under `python3 -m http.server`.

---

## 6. EXTRACTION CONTRACT (per sample → fragment)

### 6.1 Sources

| Slot | Prefer extracting from |
|---|---|
| Header | `homepage-header/samples/<id>/header.html` (fallback: `index.html`) |
| Footer | `homepage-footer/samples/<id>/footer.html` (fallback: `index.html`) |
| Body sections | `homepage-*/samples/<id>/index.html` → the primary `<section …>` (and only that section's supporting markup) |

### 6.2 Strip lab chrome (mandatory)

Remove from body fragments before composing:

- Floating **theme fab** / duplicate theme toggles (header owns theme control when a header sample provides one; otherwise keep **one** page-level toggle).
- Gallery "back" links, sample titles that are lab-only, empty `<main>` placeholders from chrome previews.
- Duplicate `<html>`, `<head>`, second theme-boot scripts.
- Duplicate global `body { … }` resets when already provided by the page shell (keep section-local rules).

### 6.3 Scope CSS to prevent collisions

Each sample's CSS was written as a mini-document. On a combined page, unscoped selectors will clash.

**Required strategy (pick one and apply consistently):**

1. **Prefix scope (preferred):** wrap each section root with `data-combo-slot="hero"` (etc.) and rewrite selectors to `[data-combo-slot="hero"] …`, **or**
2. **Class root wrap:** wrap markup in `.slot-hero` / `.slot-del` / … and prefix selectors.

Also:

- Rename colliding element IDs **only if** they are lab-only (`theme-toggle` duplicates). **Never rename** locked anchors: `#how-it-works`, `#why-nestlancer`, `#selected-work`, `#start`, `#main`.
- Keep one skip-link → `#main`.
- Deduplicate identical `:root` / `[data-theme="dark"]` token blocks into `shared/tokens.css`.

### 6.4 Scope / isolate JS

- Wrap each sample's script in an IIFE.
- Guard missing nodes (`if (!el) return`).
- Bind listeners only inside that slot's root.
- Respect `prefers-reduced-motion` already present in samples; do not strip those branches.
- Theme: **one** writer to `data-theme` + `localStorage` (`nl-theme` or existing key — standardize on one key across the page).

### 6.5 Path rewrite

Rewrite every `src` / `href` that points at lab-relative logos (e.g. `../../assets/…`, `../assets/…`) to the compositor shared assets path that works from `pages/<combo>/index.html` (typically `../../shared/assets/…` or `../../../assets/…` if using repo root assets).

---

## 7. PAGE SHELL (every composed `index.html`)

Minimum structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>…combo display label… — Nestlancer homepage compositor</title>
  <meta name="description" content="Composed Nestlancer homepage: <slot ids>">
  <!-- theme boot BEFORE paint -->
  <link rel="stylesheet" href="../../shared/tokens.css">
  <style>/* scoped section CSS concatenated in slot order */</style>
</head>
<body>
  <!-- skip link -->
  <!-- HEADER fragment -->
  <main id="main">
    <!-- HERO · DELIVERY · FINANCIAL · WHY · WORK · CTA fragments -->
  </main>
  <!-- FOOTER fragment -->
  <script src="../../shared/theme-boot.js"></script>
  <script>/* section scripts in slot order, each IIFE */</script>
</body>
</html>
```

Rules carried from the shared contract / `homepage-prompt.md`:

- Offline only: **no CDN**, no external fonts, no remote images.
- Nestlancer token hues only (no new brand hues / purple / neon).
- Geometric system sans already used in samples; do not introduce a font CDN.
- Light + dark via `data-theme`; `?theme=light|dark` wins, then saved preference, then OS.
- No emoji as UI icons.

---

## 8. GENERATOR REQUIREMENTS

Hand-writing 21,600 pages is a failed run. Implement a **deterministic generator**.

### 8.1 Algorithm

1. Load `inventory.json` with the eight slot arrays (exact folder names above).
2. Assert counts: `3,5,5,4,2,4,3,3` and product `21600`.
3. **Sample-ID matrix:** for each of the 8 labs, record every sample's unique ID code (e.g. `M01`, `P03`, `H07`, …) into `inventory.json` → `sample_id_matrix`. This matrix is the truth table for all cross-combo checks.
4. Extract/normalize 29 fragments once → `fragments/`.
5. Cartesian product over slots in the fixed order Header→…→Footer.
6. **Batched write:** process the cartesian product in **batches of 1000–1500 combos per run**. For each batch:
   - Write `pages/<combo-id>/index.html`
   - Write `pages/<combo-id>/combo.json`
   - Print batch progress (`batch 3/15 · 2500/21600 written`).
   - Between batches, check disk usage; if the workspace is tight, flush interim manifests to disk.
7. After all batches complete, write `manifest.json` listing all combo IDs + slot map + relative `href`.
   - If a single JSON is unwieldy, shard: `manifest/part-000.json` … and a `manifest/index.json` with shard list — gallery must still see all 21,600.
8. Print progress every N pages (e.g. 500) with ETA.

### 8.2 Determinism

Same inventory + same fragments ⇒ **byte-stable** combo IDs and identical file set. No random ordering. Sort each slot's sample IDs lexicographically before product iteration unless inventory already defines order (prefer the table order in §2).

### 8.3 Resume / rebuild

Support:

```bash
# examples — adapt to the language you choose (Node or Python is fine)
node tools/compose.js --all            # full run, auto-batched
node tools/compose.js --batch 3       # run only batch 3 (1000–1500 combos)
node tools/compose.js --only hdr-P01__hero-H01__…   # single combo debug
node tools/compose.js --resume        # skip existing complete folders
node tools/verify.js
```

Clean rebuild of `pages/` is allowed; never delete the upstream section labs.

### 8.4 Gallery (`homepage-compositor/index.html`)

Do **not** render 21,600 static cards in one DOM dump.

Required UX:

- Filters: one control per slot (Header, Hero, Delivery, Money, Why, Work, CTA, Footer).
- Live result count (must reach **21600** when filters clear).
- Virtualized list **or** "Apply filters → show matching links (cap visible rows, e.g. 100) + Open random match".
- Deep link: `?hdr=P01&hero=H01&del=D01&fin=M01&why=W04&work=S01&cta=C01&ftr=P05` opens/highlights that combo.
- Theme toggle for the gallery chrome itself.
- Link out to `pages/<combo-id>/` for full preview.
- **Top-50 highlight strip:** a separately styled row/section showing the 50 highest-ranked combos with one-line scores and a link to each full page.

---

## 9. SAMPLE-ID VERIFICATION (cross-combo check)

Every composed combo must be verified against the sample-ID matrix before it is considered valid.

For each combo folder written, `combo.json` must contain:

```json
{
  "combo_id": "hdr-P01__hero-H01__del-D01__fin-M01__why-W04__work-S01__cta-C01__ftr-P05",
  "slots": {
    "header":  { "id": "P01", "folder": "P01-classic", "source": "homepage-header/samples/P01-classic/header.html" },
    "hero":    { "id": "H01", "folder": "H01-ground-truth", "source": "homepage-hero/samples/H01-ground-truth/index.html" },
    "delivery":{ "id": "D01", "folder": "D01-continuum-rail", "source": "homepage-delivery/samples/D01-continuum-rail/index.html" },
    "financial":{ "id": "M01", "folder": "M01-broadsheet-total", "source": "homepage-financial-clarity/samples/M01-broadsheet-total/index.html" },
    "why":     { "id": "W04", "folder": "W04-scope-fold", "source": "homepage-why-nestlancer/samples/W04-scope-fold/index.html" },
    "work":    { "id": "S01", "folder": "S01-case-grid", "source": "homepage-selected-work/samples/S01-case-grid/index.html" },
    "cta":     { "id": "C01", "folder": "C01-quiet-meridian", "source": "homepage-closing-cta/samples/C01-quiet-meridian/index.html" },
    "footer":  { "id": "P05", "folder": "P05-centered", "source": "homepage-footer/samples/P05-centered/footer.html" }
  },
  "review": { "total": 0, "aspects": {} }
}
```

**Cross-combo verification rule:** the `id` field in each slot must match exactly one entry in the sample-ID matrix for that slot's lab. Any combo that pairs a header ID with a hero ID that does not exist, or that reuses a footer ID in the hero slot, is a **failed compose** and must be flagged in `verify.log` and re-checked.

The inventory gate (§10.1) must print the full sample-ID matrix for all 8 labs before composition begins.

---

## 10. CONTENT + SAFETY (inherited, non-negotiable)

Composing must not strip or rewrite:

- Illustrative / preview / not-a-live-checkout notices next to money, Hub mocks, and work cards.
- Exact INR amounts and milestone labels from financial samples.
- FIG 04 qualifications beside `₹4.2L` and `Reply under 2m`.
- Closing CTA destinations already in samples (`Start a project` / `Preview the portal`).
- Footer columns and © line from footer samples.

Do not invent clients, metrics, certifications, or guarantees while fixing seams.

---

## 11. UI REVIEW (as user / reviewer)

After all 21,600 pages are composed and indexed, run a **UI review pass** over every combo. You are both a visitor and a design reviewer. Score each combo on the aspects below and write the scores into `review/scores.json` and into each `combo.json` → `review`.

### 11.1 Review aspects (score each 1–5, plus a free-text note)

| Aspect | What to judge |
|---|---|
| **Seam integrity** | Do the 8 sections join as one page or feel stitched? Any double theme toggles, broken logo paths, leaked lab chrome, horizontal overflow? |
| **Visual hierarchy** | Does the eye travel header → hero → delivery → money → why → work → CTA → footer in a natural rhythm? Is any section shouting over the others? |
| **Skin coherence** | Do the surface skins (solid / glass / tint / mesh / elevated) across the 8 slots feel like one system, or a rainbow of unrelated treatments? |
| **Typography & spacing** | Readable type scale, consistent rhythm, no cramped or floating sections, line-height and paragraph spacing feel intentional. |
| **Motion quality** | Does each section's signature motion (reveal, count-up, ticker, float, parallax-lite, etc.) feel purposeful and restrained? Any motion that fights the content or breaks `prefers-reduced-motion`? |
| **Theme integrity** | Light + dark both work; one theme system — no stacked lab theme fabs; toggle behaves consistently across all 8 slots. |
| **Responsive behaviour** | No horizontal overflow at 390 / 768 / 1024 / 1440. Sections stack or reflow sensibly; sticky chrome does not collide with section content. |
| **Content fidelity** | All locked copy, ₹ figures, disclaimers, FIG labels, footer columns, and nav links are present and unaltered. |
| **Overall Nestlancer feel** | Does this combo feel like a calm, precise product-studio page — or does it feel generic, noisy, or like a mashup? |

### 11.2 Scoring + ranking

- Total score = sum of the 9 aspect scores (max 45).
- Tally all 21,600 totals. Sort descending.
- Write `review/scores.json`: array of `{ combo_id, total, aspects: {…}, note }` sorted by total descending.
- Write `review/top50.html`: a single readable HTML page listing the top 50 combos with their total score, per-aspect breakdown, and a link to each full `pages/<combo-id>/` preview.
- Copy (or symlink) the top 50 combo folders into `homepage-compositor/review/top50/` so they are easy to hand off.

### 11.3 Review gate (print before top-50 delivery)

```
## UI REVIEW GATE
combos reviewed: 21600/21600
scores written: 21600/21600
top score: <n>/45 · lowest score: <n>/45 · median: <n>/45
top50 list written: YES
top50 folders on disk: 50/50
Gate: PASS / FAIL
```

Do not claim a combo is "top 50" unless the review pass actually scored it.

---

## 12. GATES (print these; do not skip)

### 12.1 Inventory + identity gate

```
## INVENTORY + IDENTITY GATE
header:   3/3  [P01 · P02 · P04]
hero:     5/5  [H01 · H03 · H07 · H08 · H09]
delivery: 5/5  [D01 · D03 · D06 · D09 · D10]
financial:4/4  [M01 · M03 · M04 · M05]
why:      2/2  [W04 · W05]
work:     4/4  [S01 · S02 · S03 · S10]
cta:      3/3  [C01 · C03 · C04]
footer:   3/3  [P01 · P04 · P05]
sample-ID matrix: 29/29  (every sample has a unique ID code)
product: 21600
missing folders: <none|list>
Gate: PASS / FAIL
```

### 12.2 Fragment gate

```
## FRAGMENT GATE
fragments written: 29/29
lab chrome stripped: YES
anchors preserved (how-it-works, why-nestlancer, selected-work, start, main): YES
Gate: PASS / FAIL
```

### 12.3 Compose gate (batched)

```
## COMPOSE GATE
batches run: <n>/<n>   (batch size 1000–1500)
pages on disk: 21600/21600
combo.json present: 21600/21600
manifest entries: 21600
sample-ID cross-check: 21600/21600  (every combo verified against matrix)
failed writes: 0
Gate: PASS / FAIL
```

### 12.4 UI review gate

See §11.3.

### 12.5 Verify gate (automated + spot)

Automated:

- Count directories under `pages/` == 21600  `
- Every `index.html` contains markers from all eight slots (e.g. known H1 substring, `FIG 02`, `Financial clarity`, `FIG 04`, `FIG 05`, `FIG 06` / Ready to ship, footer © line, header nav "Product")  `
- Zero `http://` / `https://` network dependencies except optional `mailto:` if already present  `
- Spot-parse 50 random combos for duplicate `id="theme-toggle"` or duplicate `<html>`  `
- Every combo's `combo.json` → `slots[].id` matches the sample-ID matrix  `

Manual spot matrix (open in browser under local server):

| Check | Combos |
|---|---|
| Default-ish | `P01 + H01 + D01 + M01 + W04 + S01 + C01 + P01` |
| Glass header × editorial hero | `P02 + H03 + …` |
| Pill chrome both ends | `P04 + … + P04` |
| Dense money × sticky work | `… + M05 + … + S10 + …` |
| Alternate why | same as default but `W05` |
| Mobile 390 + desktop 1440 | at least 3 combos, light + dark |
| Top-50 spot check | open at least 3 of the top-50 combos at 1440 + 390, light + dark |

```
## VERIFY GATE
automated count/markers: PASS/FAIL
sample-ID cross-check: PASS/FAIL
spot matrix opened: PASS/FAIL
horizontal overflow found: YES/NO
Gate: PASS / FAIL
```

Do not claim visual verification unless actually performed.

---

## 13. ACCEPTANCE CHECKLIST

- [ ] Exactly **21,600** composed homepages on disk
- [ ] Each page includes **all eight** slots in the fixed order
- [ ] Every sample in every lab carries its **unique ID code** (P01, H01, M01, etc.) — verified in inventory gate
- [ ] Every composed combo's `combo.json` slot IDs **cross-check** against the sample-ID matrix
- [ ] No redesign of section samples; sources remain the shortlist folders listed in §2
- [ ] One theme system; no stacked lab theme fabs
- [ ] Logo paths resolve; offline render works
- [ ] `#how-it-works` still reachable from hero "Tour the product" when that CTA exists
- [ ] Gallery can filter to any single combo and shows **21600** with filters cleared
- [ ] `inventory.json` + `manifest` prove the math
- [ ] **UI review scores for all 21,600 combos** written to `review/scores.json`
- [ ] **Top 50** combos identified, listed in `review/top50.html`, and their full HTML available in `review/top50/`
- [ ] Delivery report lists: files/tools added, gates, disk usage, batch strategy, top-50 table, anything unverified

---

## 14. DELIVERY REPORT (required at end)

```
## DELIVERY REPORT — homepage compositor
Inventory + identity: 3×5×5×4×2×4×3×3 = 21600  ·  sample-ID matrix 29/29
Fragments: 29/29
Batches: <n> batches of 1000–1500 pages
Pages written: 21600/21600
Sample-ID cross-check: 21600/21600
Disk: <du -sh homepage-compositor/pages>
Gallery: homepage-compositor/index.html
Review: scores.json 21600 records · top score <n>/45 · median <n>/45
Top 50: review/top50.html + review/top50/ (50 full combo folders)
Server: python3 -m http.server 8125  (from repo root or compositor dir — state which)
Spot checks: <list combo IDs + viewports + themes>
Top-50 table:
  # | combo_id                                      | total | note
  1 | hdr-P01__hero-H01__del-D01__fin-M01__…       | 43/45 | …
  2 | …                                              | …     | …
  … | …                                              | …     | …
  50| …                                              | …     | …
Known limits: <e.g. CSS clash class X in combo Y — fixed/unfixed>
```

---

## 15. TOP-50 HAND-OFF (what you give back)

At the end of the run you hand back **50 complete, self-contained homepage HTML files** — one per top-ranked combo. Each is the full `index.html` from `pages/<combo-id>/`, ready to open directly in a browser (no build step, no server required for the HTML itself; logos load from `../../shared/assets/` or root `assets/`).

For each of the 50 you also include:

- The combo ID (e.g. `hdr-P01__hero-H01__del-D01__fin-M01__why-W04__work-S01__cta-C01__ftr-P05`)
- The short label (e.g. `P01 · H01 · D01 · M01 · W04 · S01 · C01 · Ftr-P05`)
- The total review score out of 45 and the per-aspect breakdown
- A one-line reviewer note

These 50 are the pages you (or the user) open and review manually. They are the best of the 21,600 — but they are **real composed pages**, not summaries or stubs.

---

## 16. OUT OF SCOPE

- Creating new hero/delivery/… designs beyond the shortlists  `
- Re-running `homepage-prompt.md`'s 100-site research or 20-from-scratch homes  `
- Deploying to production Nestlancer hosting  `
- Pixel-matching the 013 screenshot  `
- Using CDNs, AI image fills, or invented Nestlancer claims  `
- Shrinking the cartesian product below 21,600 (batching is fine; skipping combos is not)

---

## 17. START COMMAND (agent)

1. Pass **Inventory + Identity Gate** (print the full sample-ID matrix for all 8 labs).
2. Implement `tools/extract` + `tools/compose` (batched) + `tools/verify` + `tools/review`.
3. Pass **Fragment Gate**.
4. Generate all **21,600** pages in batches of 1000–1500.
5. Cross-check every combo against the sample-ID matrix.
6. Build gallery + manifest + top-50 highlight strip.
7. Run **UI review** over all 21,600 combos; write scores; rank; emit top 50.
8. Pass **Compose** + **UI Review** + **Verify** gates.
9. Copy/top-50 folders to `review/top50/` and hand off the 50 full HTML files.
10. Print **Delivery Report** with the top-50 table.

When in doubt: **compose faithfully, namespace carefully, never rewrite Nestlancer's locked story, review every combo honestly, and hand you the best 50 in full.**
