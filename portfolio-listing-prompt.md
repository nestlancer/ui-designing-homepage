# Nestlancer Portfolio Listing Page Lab — AI Agent Prompt (Listing Only)

> **Use this prompt with the `nestlancer/ui-designing-homepage` repository open as the working directory.**
>
> **Split v2.3 (2026-10-23) — winding roadmap (approved prototype) · hand-crafted only.** This file is one half of the split of `portfolio-prompt.md`. It covers **portfolio listing work only**: `PL01–PL20` = **20 templates**. The case-study half lives in `portfolio-case-study-prompt.md` and is **not** part of this task. Blog work is out of scope.
>
> **Why v2.3 (mandatory read):** v2.1–v2.2 still produced wrong templates (straight spines, generic “river” doodles, card grids). The user then approved a concrete prototype: **`docs/references/nestlancer-winding-roadmap/`** — a Nestlancer portfolio as a **winding dashed-snake roadmap** (Visme-inspired). **Every `PL##` must look like a variation of that prototype**, not like homepage Selected Work and not like a classic vertical timeline. Open and study that folder **before** Gate R. See §1.1, §1.2, `DESIGN-SPEC.md` in the reference folder.
>
> **Hand-crafted builds only (§1.3):** write each template’s HTML/CSS/JS **manually**. Do **not** generate, emit, clone-in-a-loop, or mass-produce `PL01–PL20` with Node/Python/`*.mjs`/`*.js` build scripts, template engines, or compositors. Small **in-page** JS for the snake path (like the prototype’s `roadmap.js`) is allowed inside each hand-written page — that is not a generator.
>
> This prompt is **standalone** for gates/tokens/a11y, but the **layout parent is the local reference prototype** above. Do not diverge from §5 brand tokens when adapting phase colours.
>
> **Do not push, commit, create or switch a branch.** If `portfolio-listing-lab/` already has rejected skins, **replace them** under the same `PL##` IDs.

---

## 1. Role and outcome

Act as a senior product designer, UI/motion researcher, accessibility-minded frontend engineer, and critical design reviewer. Extend this repository into a **separate portfolio listing page-template lab** without changing the homepage work, without touching any blog work, and without building case-study pages.

Deliverables, in order:

1. Study **`docs/references/nestlancer-winding-roadmap/`** (open `index.html`, read `roadmap.css`, `roadmap.js`, `DESIGN-SPEC.md`) — this is the **gold-standard layout parent**.
2. `docs/RESEARCH-PORTFOLIO-LISTING-UI.md` — supporting winding/roadmap refs (≥12), each compared to the gold standard (§4).
3. `docs/TOP10-CANON-SPEC-PORTFOLIO-LISTING.md` — brand-chrome audit only (§3, §5).
4. `docs/PORTFOLIO-LISTING-DESIGN-ANALYSIS.md` — content freeze, anti-parent note, winding-roadmap acceptance notes (§6).
5. **20 HTML templates** `PL01–PL20` in `portfolio-listing-lab/` — **each a visible variant of the winding-roadmap prototype** (§1.2, §12), **authored by hand** (§1.3).

Every template must sit next to `docs/references/nestlancer-winding-roadmap/index.html` and still read as the **same design family**. Homepage samples = chrome/tokens only. Straight spines, plain card grids, and decorative S-doodles that do not snake through stop markers are failures.

### 1.1 Design derivation policy — winding-roadmap-first

| Layer | Source of truth | What you take | What you refuse |
|---|---|---|---|
| **Layout (primary)** | `docs/references/nestlancer-winding-roadmap/` + `DESIGN-SPEC.md` | Dotted journey canvas · dashed gradient SVG snake through markers · snaking multi-column grid (DOM order 01→08) · numbered stop markers · category icons · project cards · Start/Finish bookends · phase legend | Straight center spine; card grid with no snake; fixed SVG that ignores marker positions; homepage `D01`/`S01` |
| **Inspiration (secondary)** | Visme image + Gate R curve refs | Dash rhythm, phase journey colour, bookend language | Clipart overload; unrelated rainbow |
| **Interaction** | §7.1 | Select stop → shared preview crossfade; keep "View case study" as a real link (as on prototype cards) | Swallowing the case-study link |
| **Brand chrome & tokens** | §3 + §5 | Nestlancer header/footer, FIG voice; phase colours may keep prototype blue/violet/coral **or** remap to §5 teal/navy — record in `DECISIONS.md` | Dropping Nestlancer chrome |
| **Content** | §9.1 / FIG 05 | The 8 locked projects | Invented projects |

**Anti-patterns:** homepage Selected Work · Nestlancer `/portfolio` list · straight vertical timeline · card grid without dashed snake · abstract river not through markers · keeping old lab skins.

### 1.2 Visual contract — winding roadmap anatomy (non-negotiable)

**First action:** open `docs/references/nestlancer-winding-roadmap/index.html` (local server). Study `roadmap.css`, `roadmap.js`, `DESIGN-SPEC.md`.

Every `PL##` must include **all** of:

1. **Journey hero** — FIG eyebrow + H1 framing work as a connected path + supporting line + mono meta (count / year).
2. **Roadmap section head** — FIG eyebrow + title + **phase legend** (e.g. Discover / Build / Deliver).
3. **Dotted journey canvas** — rounded panel, soft lavender (or dark) with **dot-grid** background (prototype `.roadmap`).
4. **Start + Finish bookends** — labelled journey start and end (Finish may include a CTA).
5. **Eight stops, DOM order 01→08** — category icon/label · **numbered circular marker** · connector · **project card** (image, date, title, summary, stack chips, "View case study").
6. **Snaking layout** — desktop ≥2 columns (prototype: 3 desktop / 2 tablet / 1 phone). Odd rows L→R, even rows R→L via grid column flip (`roadmap.js` pattern). **Do not reorder the DOM** to fake the snake.
7. **SVG route from marker positions** — absolute SVG; dashed stroke; journey gradient; path rebuilt on resize from stop-marker centres. A static path that breaks on reflow **fails**.
8. **Phase colours** — per-stop colour driving marker/accents; active/selected stop fills the marker.
9. **Shared preview dock** (§7.1) — sticky/side/canvas-adjacent; selection crossfades 200–260 ms; case-study link remains separate and real.

**5-second test:** side-by-side with the reference prototype → "same winding roadmap, different variant."

**Hard fail:** straight spine · card grid with no snake · SVG not through markers · homepage work grid · Nestlancer `/portfolio` clone · infographic icons-on-a-path without snaking Nestlancer project cards.

**Supporting image (layout inspiration only):** `https://visme.co/blog/wp-content/uploads/2021/08/4.jpg` — dashed S-path + milestone nodes (already embodied in the local prototype).

### 1.3 Manual craft rule — no generators (non-negotiable)

Design and code each of the 20 templates **manually**, the same way the gold-standard prototype was made: open the files, write/adjust markup and CSS, tune the snake and stops by eye.

| Allowed | Forbidden |
|---|---|
| Hand-writing / hand-editing each `portfolio-listing/PL##-…/index.html` (and its CSS/JS) | Any script that **creates or overwrites** `PL01–PL20` HTML/CSS (`node`, `python`, `*.mjs`, `*.cjs`, shell loops, Make/npm tasks that emit pages) |
| Copying the **reference prototype** once as a starting point for a single PL, then **manually** redesigning that file into a distinct variant | “Generate all 20 from one template string / JSON / config” |
| Small **in-page** JS per template for snake path, theme, selection (like `roadmap.js`) | A repo `tools/generate-*.mjs`, compositor, or factory that stamps out variants |
| Running **existing** repo auditors after the fact (`python3 tools/audit-samples.py`, `tools/ui-review-suite/…`) for QA only | Writing a new generator under `portfolio-listing-lab/tools/` that builds designs |
| Hand-maintained `manifest.json` / gallery `index.html` | Auto-scaffolding that produces near-identical skins in a loop |

**Why:** mass-generated pages look samey and miss the craft of the approved winding roadmap. Distinctness must come from intentional design edits per `PL##`, not from a parameter loop.

State in `portfolio-listing-lab/DECISIONS.md`: “All PL templates were hand-authored; no design-generation script was used.”

Reference production page (listing — **content lock only**, not layout parent):

| Route (on `app.nestlancer.com`) | Family | Legacy screenshot in this repo | Role in this lab |
|---|---|---|---|
| `/portfolio` | `PL` listing | `Nestlancer-public-screenshots/public/007-portfolio-listing.webp` | Extract/freeze the 8 projects + taxonomy quirk. **Do not** treat its timeline UI as a design parent. |

Brand/locked-copy truth also used by this prompt: `Nestlancer-public-screenshots/public/013-marketing-homepage.webp` FIG 05 (the eight work titles + illustrative caption) and `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`.

Do **not** audit or rebuild `/portfolio/b2b-portal-ux` or screenshot `008` in this run — that is the case-study prompt's job. You may record that `View case study` must resolve under the linking rule in §9.1; you do not build the destination.

---

## 2. Separation contract — listing only, all separate

This prompt exists so portfolio listing work can be run **independently** of case-study work and blog work (different session, different agent, different time). Keep the boundary absolute:

| | This prompt (listing) | Sibling (case study — NOT your task) | Sibling (blog — NOT your task) |
|---|---|---|---|
| Prompt file | `portfolio-listing-prompt.md` (this file) | `portfolio-case-study-prompt.md` | `blog-prompt.md` |
| Families | `PL01–PL20` listing | `PD01–PD20` case study | `BL01–BL20` · `BA01–BA20` |
| Template count | **20** | 20 (theirs) | 40 (theirs) |
| Lab folder | `portfolio-listing-lab/` | `portfolio-case-study-lab/` | `blog-lab/` |
| Research doc | `docs/RESEARCH-PORTFOLIO-LISTING-UI.md` (≥30 domains) | `docs/RESEARCH-PORTFOLIO-CASE-STUDY-UI.md` | `docs/RESEARCH-BLOG-UI.md` |
| Canon spec | `docs/TOP10-CANON-SPEC-PORTFOLIO-LISTING.md` | `docs/TOP10-CANON-SPEC-PORTFOLIO-CASE-STUDY.md` | `docs/TOP10-CANON-SPEC-BLOG.md` |
| Analysis doc | `docs/PORTFOLIO-LISTING-DESIGN-ANALYSIS.md` | `docs/PORTFOLIO-CASE-STUDY-DESIGN-ANALYSIS.md` | `docs/BLOG-DESIGN-ANALYSIS.md` |
| Decisions log | `portfolio-listing-lab/DECISIONS.md` | `portfolio-case-study-lab/DECISIONS.md` | `blog-lab/DECISIONS.md` |
| Live route audited | `/portfolio` | `/portfolio/b2b-portal-ux` | `/blog`, article route |
| Screenshot audited | `007` (+ `013` FIG 05 for locked titles) | `008` | `002`, `003` |
| Preview port | `8126` | `8128` | `8127` |

Rules:

- **In scope:** the three docs above, everything under `portfolio-listing-lab/`, and nothing else. Every file you create must be one of those paths.
- **Out of scope:** `portfolio-case-study-lab/`, `portfolio-lab/` (legacy combined folder name — never create it), any `PD##` template, case-study narrative/body/gallery/outcomes modules, before/after comparison, annotated screenshot walkthrough, in-case TOC/chapter accordion as a full case-study page, blog labs/docs, and any `BL`/`BA` work. If a listing direction needs expandable notes (`PL05`), spec them as listing components in §8 — do not import a case-study page design.
- **No dependency on the case-study run.** This prompt must be completable whether the case-study lab exists, is half-built, or was never started. Never require a `PD##` file as a build dependency. Header/footer nav labels keep their existing production/repo destinations exactly as the canon chrome defines them.
- **If the case-study lab already exists** when you run: treat `portfolio-case-study-lab/` and its three docs as **read-only**. You may link `View case study` for the B2B project into a paired `PD##` under the §9.1 rule if that path exists; otherwise link to the live production route `/portfolio/b2b-portal-ux` (or a clearly labelled demo destination recorded in `DECISIONS.md`). Never edit, "fix", regenerate or reformat a case-study file.
- **If the listing lab already exists** from an earlier run: keep the same `PL01–PL20` IDs and folder paths, but **replace** any skin that fails the side-by-side test with `docs/references/nestlancer-winding-roadmap/`. Do not create a second listing folder. Do not “polish” old templates — rebuild to the winding-roadmap family.
- **Traceability:** section numbers deliberately mirror `portfolio-prompt.md` (§3 canon, §5 tokens, §11 sizes, §12 directions, §15 gates). Numbers from the combined portfolio prompt are re-scoped pro-rata for 20 templates — each change is stated where it occurs (research ≥60 → ≥30 listing-focused; secondary-primary cap 6/40 → 3/20; motion-catalog cap 6/40 → 3/20; pilot 2 → 1).

---

## 3. Brand canon (chrome + tokens only — not the timeline layout parent)

Homepage top-10 / top-50 compositions are the Nestlancer **brand grammar** for header, footer, tokens, FIG voice and closing CTAs. They are **not** the primary parent for the chronological work-timeline composition. Timeline layout parents live in Gate R (§4).

This repo publishes **two different top-10 lists that do not agree**. Verified from the repo, not assumed:

| List | Source | Scale | Top-10 flavour |
|---|---|---|---|
| **User-preference rank** | `rank-list.html` (also `homepage-compositor/review/rank-list.html`), `data-userrank` / `data-userscore`, default sort `userrank` | /100 with persona sub-scores | `P01` solid header · `H01`/`H07` heroes · `D01`/`D03` delivery · `M05` · `W05` · `S01`/`S02` · `C01`/`C03` · `P01`/`P05` footers |
| **Rubric/compositor rank** | `homepage-compositor/review/summary.json`, `homepage-compositor/tools/review.mjs`, 9 aspects | /45 | `P04` pill header · `H08` glass command rail · `D03`/`D10` · `M04`/`M01`/`M05` · `W05` · `S03`/`S10` · `C04` · `P04` |

Only **4 of 20** combos appear in both lists. **Neither list may be described as a user study**; the preference scorer is a persona-weighted model, the rubric is reviewer judgement plus extracted CSS metrics.

### 3.1 Canonical top 10 — brand chrome set (read for chrome, not for timeline spine)

User-preference ranks 1–10, verified from `rank-list.html` (quoted so brand chrome stays aligned with the homepage lab):

| # | Score | Combo | Slots |
|---|---|---|---|
| 1 | 97.51 | `hdr-P01__hero-H07__del-D01__fin-M05__why-W05__work-S02__cta-C01__ftr-P01` | P01 · H07 · D01 · M05 · W05 · S02 · C01 · P01 |
| 2 | 96.85 | `hdr-P01__hero-H01__del-D01__fin-M05__why-W05__work-S02__cta-C01__ftr-P01` | P01 · H01 · D01 · M05 · W05 · S02 · C01 · P01 |
| 3 | 96.81 | `hdr-P01__hero-H07__del-D01__fin-M05__why-W05__work-S01__cta-C01__ftr-P01` | P01 · H07 · D01 · M05 · W05 · S01 · C01 · P01 |
| 4 | 96.75 | `hdr-P01__hero-H07__del-D01__fin-M05__why-W05__work-S02__cta-C03__ftr-P01` | P01 · H07 · D01 · M05 · W05 · S02 · C03 · P01 |
| 5 | 96.73 | `hdr-P01__hero-H07__del-D01__fin-M05__why-W05__work-S02__cta-C01__ftr-P05` | P01 · H07 · D01 · M05 · W05 · S02 · C01 · P05 |
| 6 | 96.52 | `hdr-P01__hero-H01__del-D03__fin-M05__why-W05__work-S02__cta-C01__ftr-P01` | P01 · H01 · D03 · M05 · W05 · S02 · C01 · P01 |
| 7 | 96.15 | `hdr-P01__hero-H01__del-D01__fin-M05__why-W05__work-S01__cta-C01__ftr-P01` | P01 · H01 · D01 · M05 · W05 · S01 · C01 · P01 |
| 8 | 96.05 | `hdr-P01__hero-H07__del-D01__fin-M05__why-W05__work-S01__cta-C03__ftr-P01` | P01 · H07 · D01 · M05 · W05 · S01 · C03 · P01 |
| 9 | 96.03 | `hdr-P01__hero-H07__del-D01__fin-M05__why-W05__work-S01__cta-C01__ftr-P05` | P01 · H07 · D01 · M05 · W05 · S01 · C01 · P05 |
| 10 | 95.82 | `hdr-P01__hero-H01__del-D03__fin-M05__why-W05__work-S01__cta-C01__ftr-P01` | P01 · H01 · D03 · M05 · W05 · S01 · C01 · P01 |

**Only 13 distinct samples appear across these ten pages.** Read them for **brand craft** (tokens, type, chrome, FIG eyebrow, card radius, closing CTA), **not** as the composition to clone for the work timeline:

| ID | Source file | Allowed use in this lab | Forbidden use |
|---|---|---|---|
| Header `P01` | `homepage-header/samples/P01-classic/index.html` | default chrome for all 20 | — |
| `H01` Ground Truth | `homepage-hero/samples/H01-ground-truth/index.html` | optional page-opening hierarchy / type scale | whole-page layout parent |
| `H07` Money-first | `homepage-hero/samples/H07-money-first/index.html` | metadata-first type hierarchy for leads | whole-page layout parent |
| `D01` Continuum Rail | `homepage-delivery/samples/D01-continuum-rail/index.html` | token/spacing reference only | **timeline spine parent** (rejected pattern) |
| `D03` Bento Proof | `homepage-delivery/samples/D03-bento-proof/index.html` | modular block rhythm only if a Gate R site also uses bento | sole timeline parent |
| `M05` Cashflow Staircase | `homepage-financial-clarity/samples/M05-cashflow-staircase/index.html` | ledger/ordinal type rhythm | sole timeline parent |
| `W05` Gate Logic | `homepage-why-nestlancer/samples/W05-gate-logic/index.html` | supporting card logic only | page layout |
| `S01` Case Grid | `homepage-selected-work/samples/S01-case-grid/index.html` | card radius / hairline craft | **work-index layout parent** (rejected pattern) |
| `S02` Filter Bar | `homepage-selected-work/samples/S02-filter-bar/index.html` | filter-chip mechanics only | sole index layout |
| `C01` Quiet Meridian | `homepage-closing-cta/samples/C01-quiet-meridian/index.html` | listing closing CTA | — |
| `C03` Four-Point Orbit | `homepage-closing-cta/samples/C03-four-point-orbit/index.html` | alternate closing CTA | — |
| Footer `P01` | `homepage-footer/samples/P01-classic/index.html` | default footer | — |
| Footer `P05` | `homepage-footer/samples/P05-centered/index.html` | alternate footer | — |

**Load-bearing brand grammar for this lab:** `P01` header/footer chrome, §5 tokens, FIG mono eyebrow, `C01`/`C03` closings, and (optionally) type hierarchy from `H01`/`H07`. **Load-bearing timeline grammar comes from Gate R external sites**, not from `D01`/`S01`/`S02`.

### 3.2 Rubric-top-10 samples — chrome exceptions only (≤3 of 20)

The rubric top 10 contributes alternate **chrome** vocabulary: `P04` pill/float header, `H08` glass command rail, `D10` magnetic stack, `M01` broadsheet, `M04` rails terminal, `S03` split viewer, `S10` sticky showcase, `C04` editorial endnote.

Rules:

- At most **3 of the 20** listing templates may use a rubric-top-10 sample as a **chrome / surface** exception (pill header, terminal metadata, sticky media surface). Label it in the gallery card and `manifest.json`.
- Even those 3 must still name an **external Gate R timeline site** as the layout parent. A rubric sample alone is never enough.
- Directions that may need a chrome exception: `PL03`, `PL09`, `PL12`, `PL13`, `PL14`, `PL18` — most stay `P01` chrome with an external layout parent.
- **Never mix more than one chrome family per page.** A page is either `P01` solid-bar grammar or `P04` floating-pill grammar, not both.

### 3.3 Brand measurement requirement

For each of the 10 canon pages and each of the 13 samples, record in `docs/TOP10-CANON-SPEC-PORTFOLIO-LISTING.md`: measured H1/H2/body sizes, container width, section padding rhythm, header height, card radius and border, shadow, mono-eyebrow treatment, and light/dark token values actually used. Quote the file path as evidence. Explicitly label this doc as **brand chrome measurement**, not timeline-layout measurement. Timeline geometry (spine, preview frame, year rail) is measured from Gate R sites into `docs/RESEARCH-PORTFOLIO-LISTING-UI.md` and the concept cards.

---

## 4. Gate R — supporting research (gold standard is already local)

**Primary layout parent is already in-repo:** `docs/references/nestlancer-winding-roadmap/`.
Gate R does **not** replace that parent. It only gathers supporting winding/roadmap references and records how variants may differ without leaving the family.

Write `docs/RESEARCH-PORTFOLIO-LISTING-UI.md` with:

1. **Gold-standard dissection** (required first section) — quote the local prototype anatomy from `DESIGN-SPEC.md`: dotted canvas, dashed gradient SVG through markers, snake grid (3/2/1 cols), bookends, phase legend, stop marker+card. List file paths (`roadmap.css`, `roadmap.js`).
2. **≥12 supporting refs** — winding roadmap / serpentine / S-curve images or pages (Visme `4.jpg`, LinkedIn winding-road image, Visme timeline guide, Umberex ribbon, PresentationGO serpentine, mljr snake-timeline, etc.). For each: URL · curve traits · **what to borrow into a PL variant** · **what not to copy** · which `PL##` it informs.
3. **Anti-pattern appendix** — straight spines, card grids, homepage Selected Work — with one screenshot/path note each if available.
4. **Motion catalog** (6–8) including: SVG path rebuild on resize (prototype behaviour), path-draw/`stroke-dashoffset`, station/marker active fill, shared-preview **crossfade** 200–260 ms, optional sticky preview dock. Reduced-motion: path fully present, no dash animation, immediate preview swap.
5. **Preview attachment note** — how a shared preview dock can sit beside the winding canvas without deleting the snake (required for §7.1).

**Hard exclusions as layout parents:** Nestlancer `/portfolio`, homepage `D01`/`S01`/`S02`, straight-spine templates, card grids without a snake.

**Quality bar:** gold-standard section complete; ≥12 supporting refs opened; both user-cited images documented; motion catalog present.

---

## 5. Design-token specification (prescriptive — shared brand values, do not diverge)

Values below were extracted from the canon samples' own CSS. Use these tokens; do not invent new brand colours. Where a template needs an extra tone, derive it from these and record it in `docs/TOP10-CANON-SPEC-PORTFOLIO-LISTING.md`. **This section is intentionally identical in the case-study prompt.** If you find a value here that contradicts the canon CSS, the canon CSS wins — record the correction in your canon spec and `DECISIONS.md`; do not silently fork the palette.

### 5.1 Colour tokens

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#f9fbfc` | `#0b1720` |
| `--surface` | `#ffffff` | `#0f1e29` |
| `--surface-2` | `#f4f8f9` | `#12242f` |
| `--ink` | `#0a2543` | `#e8eef4` |
| `--ink-2` | `#123a5e` | `#d3dde6` |
| `--body` | `#4a5c6e` | `#b9c6d0` |
| `--muted` | `#5f7080` | `#8aa0b3` |
| `--line` | `#e3ebe9` | `rgba(255,255,255,.08)` |
| `--teal` (accent) | `#1f7a72` | `#2fa59b` |
| `--teal-hover` | `#1c6f68` | `#3fb8ab` |
| `--teal-soft` | `#d9ece9` | `#14343a` |
| `--teal-text` | `#1c6f68` | `#3fb8ab` |
| `--mint` | `#eef7f5` | `#10272a` |
| `--tint` | `#edf4f6` | `#102530` |
| `--mesh-1` / `--mesh-2` | `#d8e8e9` / `#daeaeb` | `#12303a` / `#0f2a33` |
| `--band` (dark plane) | `#0a2543` | `#06111a` |
| `--band-text` / `--band-body` | `#e8eef4` / `#b9c6d0` | same |
| `--band-line` | `rgba(255,255,255,.12)` | same |
| `--live` (positive state) | `#22a06b` | `#34c27f` |
| `--glow` | `#3fb8ab` | `#3fb8ab` |

Measured contrast (computed with the repo's own relative-luminance formula):

| Pair | Ratio | Verdict |
|---|---|---|
| `--ink` on `--bg` (light) | 14.89:1 | pass |
| `--body` on `--bg` (light) | 6.64:1 | pass |
| `--muted` on `--bg` (light) | 4.92:1 | pass AA for normal text |
| `--teal` on `--mint` (light) | 4.71:1 | pass AA |
| `--teal` on `--tint` (light) | 4.62:1 | pass AA |
| `--teal` on `#fff` (light) | 5.14:1 | pass AA |
| `--ink` on `--bg` (dark) | 15.52:1 | pass |
| `--body` on `--bg` (dark) | 10.41:1 | pass |
| `--muted` on `--bg` (dark) | 6.70:1 | pass |
| `--teal` on `--surface` (dark) | 5.63:1 | pass |
| `--line` on `--bg` (light) | **1.17:1** | **decorative only** |

**Rule:** `--line` is a decorative hairline. Any border that conveys meaning — selected project state, **timeline spine and node**, preview-frame boundary, input boundary, focus ring, table structure — must reach **3:1** against its neighbour; use `--teal`, `--teal-soft` over `--bg`, `--ink-2` or a dedicated `--line-strong` you add and document.

### 5.2 Typography tokens

| Token | Value |
|---|---|
| `--font` | `"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--mono` | `ui-monospace, "IBM Plex Mono", "SF Mono", Menlo, Consolas, monospace` |
| FIG eyebrow | `500 11px/1 var(--mono)`, uppercase, letter-spaced — the label voice from the brand screenshots |
| Type scale | 12 / 14 / 16 / 18 / 24 / 32 / 40–52 px (H1 capped at 56 desktop, 36 phone) |
| Body | 16–18 px, line-height 1.55–1.7, measure 60–72 ch / max 720 px |
| Tabular figures | `font-variant-numeric: tabular-nums` on all dates, counts, ordinals and currency |

No web fonts, no CDN, no font service. System stacks only.

### 5.3 Radius, spacing, elevation, z-index

| Token | Value |
|---|---|
| `--chip` | 8 px |
| `--card` | 14 px (16 px for large panels) |
| `--pill` | 999 px |
| Spacing scale | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 px — no other values for layout gaps |
| Section padding | 24–48 px desktop, 20–32 px phone |
| Header height | 64–76 px |
| `--shadow` | `0 8px 28px rgba(10,37,67,.10)` light · `0 8px 28px rgba(0,0,0,.45)` dark |
| `--shadow-hover` | `0 18px 44px rgba(10,37,67,.16)` light · `0 18px 44px rgba(0,0,0,.55)` dark |
| Focus ring | `0 0 0 3px var(--teal-soft)` plus a 2 px `--teal` outline; must be visible in both themes |
| z-index scale | base 0 · sticky chrome 10 · preview panel 20 · drawer/menu 40 · status toast 60 — nothing above 60 |
| Container | 1160 px max (1200 px only where a canon sample already uses it, recorded per template) |

### 5.4 Brand keep-rules

These are documented must-keeps for the homepage lab and carry into this lab:

- The **mono FIG eyebrow** on every major block (`FIG · Work`, `FIG · Timeline` and equivalents).
- **Hairline borders** and soft shadow on card/window surfaces; radius from §5.3 only.
- **Product-window chrome** (three dots, mono title, chip) where a UI mock is shown — the natural frame for the shared portfolio preview.
- Locked copy and the "illustrative / not a live checkout" disclaimers stay intact wherever homepage content appears. For work imagery specifically, keep **"Illustrative product concepts — not customer screenshots."** visible and near the cards wherever FIG 05 content is reused (see §9.1).
- Real logo assets from `assets/` (`logo-full-dark.svg`, `logo-full-light.svg`, `logo-mark-dark.svg`, `logo-mark-light.svg`) — never redrawn, stretched or recoloured.
- Restrained navy/teal/mint palette; no new brand hues.

### 5.5 Dark-mode craft rules

No pure black (`#000`) surfaces; keep the `--bg`/`--surface`/`--surface-2` three-step ramp. Hairlines must stay visible without becoming borders. Do not invert accent relationships — `--teal` stays the accent and `--teal-hover` stays darker/lighter in the same direction as the token table. Project images get a slight luminance treatment (no white flash at load) and never a hard white frame; the shared preview frame must read as the same frame in both themes. Re-measure contrast in dark; the ratios above are the floor, not the ceiling.

---

## 6. Gate 0 — repository baseline (brand chrome + content lock only)

1. `git status`; never overwrite uncommitted changes.
2. Baseline the existing lab: `python3 tools/audit-samples.py` must still pass on its current file set before you touch anything.
3. Read the 13 brand samples for **chrome/tokens only** (paths in §3.1), plus the FIG 05 rows of `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md` (the locked eight titles and illustrative caption). You may skim `docs/homepage-section-prompts/05-selected-work.md` for locked copy language — **do not** treat it as the timeline layout brief.
4. Re-open Nestlancer `/portfolio` and screenshot `007` **only to extract content** (titles, categories, summaries, stack, dates, images). Label observations `live render` / `DOM extract` / `screenshot` / `source`. In `docs/PORTFOLIO-LISTING-DESIGN-ANALYSIS.md`, include a short **“layout anti-parent”** note: Nestlancer’s live portfolio timeline is **not** a design parent for this lab (prior clones were rejected). Do not audit the case-study route or screenshot `008` in this run.
5. Freeze the 8-project content truth (§9.1). Quote the source for every field; anything you cannot verify is marked **not verified**, never invented.
6. Carry the known portfolio data inconsistency forward: **Fintech Payments Hub** labelled `E-Commerce`. Record it in `portfolio-listing-lab/DECISIONS.md`; any correction is a taxonomy decision, not a production-fix claim.
7. Write the brand 13-sample matrix, the 10-row chrome matrix, the content freeze, and the anti-parent note into `docs/PORTFOLIO-LISTING-DESIGN-ANALYSIS.md`. Timeline layout analysis belongs in Gate R, not as “improve Nestlancer’s current timeline.”

---

## 7. Accessibility and interaction contract

### 7.1 Selection semantics — the shared preview (all 20 PL pages) ⭐ core listing contract

Every PL page has one behaviour: selecting a project (by its image/control) loads it into **one shared preview** with a crossfade, while `View case study` remains a separate explicit link. Pick **one** selection pattern and implement it fully and identically on all 20 PL pages — record the choice in `portfolio-listing-lab/DECISIONS.md`:

- **Recommended:** an ordered list of projects where each item's preview control is `role="radio"` inside `role="radiogroup"` (or a native radio input visually styled), with `aria-checked`, roving tabindex, Arrow Up/Down/Left/Right to move, Home/End to jump, Space/Enter to select, and an `aria-live="polite"` status region announcing the selected project.
- Alternative: `role="tablist"` with `role="tab"`/`aria-selected` + `role="tabpanel"`, if the preview reads as a panel.
- `aria-pressed` alone on a list of buttons is acceptable only if arrow-key navigation and a live region are also implemented.
- **Never** rely on click alone: every project must be selectable from the keyboard, and `View case study` must be reachable **without** selecting the project first. A whole card must never be one fake link that swallows the select control.
- **Latest-selection-wins:** rapid successive selections must resolve to the last selected project (no stale image winning a load race). The preview frame's dimensions never change during swap (no layout shift), the incoming image ends at full opacity, and a failed image load shows the §8 error placeholder inside the same frame.
- Filtering (`PL15` and any chip filter) preserves chronology, keeps focus on the filter control, announces the result count in the live region, and defines what happens to the selection when the selected project is filtered out (state the rule in `DECISIONS.md` and implement it everywhere).

### 7.2 Structure and focus

- Exactly one `h1`; no skipped heading levels; landmarks `header / nav / main / aside / footer`; every `nav` gets an `aria-label`; a working skip link to `main`.
- No `aria-label` on role-less `div`s (use `role="group"` or a real element). No contradictory ARIA (`aria-hidden` + `aria-label` on the same element). Every toggle is `<button type="button">`.
- **Focus management:** filtering, crossfade swaps, accordion/disclosure changes and view-transition-style changes must not lose or trap focus. After a filter changes, focus stays on the control and the live region announces the result count.
- **Target size (WCAG 2.2):** 44×44 px preferred for primary controls, 24×24 px absolute minimum (SC 2.5.8), with spacing so adjacent targets cannot be hit together. Timeline nodes and thumbnail select controls are targets too. The homepage lab shipped 22 px footer links — do not repeat that.
- **Contrast (WCAG 2.2 AA):** 4.5:1 normal text, 3:1 text ≥18.66 px bold or ≥24 px, 3:1 for UI component boundaries and meaningful graphical objects (SC 1.4.11 — selected state, timeline spine/node, preview boundary), 3:1 for the focus indicator (SC 2.4.13). Run `tools/ui-review-suite/tool-3-color-contrast-seams.mjs` against every template in both themes and record the ratios.
- **Reduced motion:** `prefers-reduced-motion: reduce` must neutralise entrance animation, hover transitions, **path-draw / path-progress**, pinned scroll and the preview crossfade — path renders fully drawn and static; preview swaps immediately with no fade. All 13 brand samples already respect reduced motion; the new pages must too.
- **No JS:** all eight projects, every `View case study` link and the static first-project preview (or per-card images) must be reachable; preview/selection controls must not render as operable when JS is absent.

### 7.3 Motion contract

- One primary signature per template from the Gate R motion catalog, with declared duration and easing; at most one pinned/sticky motion effect and one entrance stagger per page.
- Animate **transform and opacity only**. Never animate `top`/`height`/`width`/`margin` for scroll effects. No animation may move text under a pointer, delay reading, or block a control.
- Crossfade on the shared preview: **200–260 ms**, constant frame dimensions, selected image ends at full opacity. This number is a listing-lab constant on all 20 PL pages — directions differ around it, never by retiming it outside the range.
- Path-draw may use SVG `stroke-dashoffset` (the one allowed exception to “transform/opacity only” for the river path). Prefer compositor-friendly transforms for station motion.
- Scroll-driven CSS for path-progress and sticky-preview — only as progressive enhancement with an `IntersectionObserver`/class-toggle fallback.
- No JS animation libraries, no CDN, no chart libraries. Plain HTML/CSS/JS + SVG + `IntersectionObserver`.

---

## 8. Component inventory and state matrix (listing components only)

Define once, reuse across all 20. Every component lists the states it must implement; a template may restyle a component but may not drop a state. Case-study-only components (before/after slider, annotated screenshot markers, outcome dashboard cards as a full case body, in-case chapter accordion as a reading page…) are **not** defined here and must not appear rebadged as listing components.

| Component | Required states |
|---|---|
| Button — primary / ghost / icon | default · hover · focus-visible · active · disabled · loading |
| Project card | default · hover · focus-within · **selected** (matches preview) · image-error — selection visible at 3:1, never colour-only |
| **Winding roadmap canvas** | dotted panel · Start/Finish bookends · phase legend · dashed gradient SVG route · snaking grid · rebuilt on resize · reduced-motion = static full path |
| Road stop / marker | numbered circle · category icon · **selected/active** · connector · keyboard-reachable · image-error — selection at 3:1, never colour-only |
| Shared preview frame | first-load · crossfading (200–260 ms) · settled · image-loading · image-error placeholder · no-JS static — constant dimensions in all states · docked beside or over the river without breaking path readability |
| Chip / tag / filter pill (category, stack) | default · hover · focus-visible · selected (`aria-pressed`/`aria-checked`) · disabled · non-interactive stack tags must not look clickable |
| Accordion / disclosure (`PL05` notes) | native `details`/`summary` preferred; expanded/collapsed; focus visible |
| Image frame | fixed aspect, `object-fit: contain/cover` declared, `alt` text, error placeholder |
| Empty state (filter → zero projects) | illustration-free or simple inline SVG, one line of copy, one recovery action (clear filter) |
| Error state | what failed, why, what the user can do; never a silently empty preview |
| Loading state | honest local states only; never simulate a network call |
| Theme toggle | `<button type="button">`, `aria-pressed`, persisted via `localStorage`, visible at all widths |

**Chrome checklist per template:** all seven nav links (**Product · Portfolio · Blog · About · Pricing · Services · Contact** — locked from `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`) present at mobile widths; the mobile drawer is **not empty** and carries Sign in + Start a project; the theme toggle works and persists; both CTAs reachable; no `href="#"` used as a destination — every control is a button or a real link; `Portfolio` is marked current (`aria-current="page"`). Nav destinations keep their existing routes — in particular do **not** invent case-study lab URLs that this run does not build, except under the §9.1 linking rule when the sibling lab already exists.

---

## 9. Content, data and assets (listing data only)

### 9.1 Data plan

- **Portfolio index:** the 8 real projects in verified newest-first order, all dated Oct 2026. Do not invent durations, extra dates, clients, budgets or outcomes. The locked titles (FIG 05, `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`; verify order/category/summary/stack against the live `/portfolio` extract at Gate 0 and record any difference):
  1. B2B Client Portal UX 2. Fitness Tracking App 3. Marketplace Redesign 4. Brand Identity System 5. Fintech Payments Hub 6. SaaS Analytics Platform 7. E-Commerce Mobile App 8. HealthTech Dashboard.
- Keep the caption **"Illustrative product concepts — not customer screenshots."** visible and near the cards/preview wherever these eight concepts are shown as the FIG 05 set. Do not fabricate client logos, endorsements or case-study metrics.
- **`View case study` linking rule:** state the exact rule once in `portfolio-listing-lab/DECISIONS.md`. Preferred order: (1) if `portfolio-case-study-lab/` already has a paired `PD##` for this listing direction, the B2B project may link there; (2) otherwise link B2B to the live production route `/portfolio/b2b-portal-ux`; (3) the remaining seven projects link to that same destination **only if** the page clearly carries the demo disclosure that one full case study is supplied — never invent seven fake case studies, never link to `#`.
- The taxonomy correction (Fintech Payments Hub labelled `E-Commerce`) goes in `portfolio-listing-lab/DECISIONS.md` with the listing value, the corrected value if you apply one, and where each appears. Never hard-code signed or expiring S3 URLs from a live extract.
- **No case-study body content and no blog data** in this lab: no Harbor Ops narrative sections, no invented outcomes, no article titles, no "from the blog" modules. Closing blocks use the canon closing CTA (`C01`/`C03`).

### 9.2 Stress fixtures (run on every template)

| Fixture | Purpose |
|---|---|
| Longest real project title in the verified set, at card + preview sizes | wrapping, no clipping |
| A 2-word project title and a 4-line summary (labelled fixture data, swapped in only for the test) | short/long balance |
| 5 stack tags vs 1 tag | chip-row wrapping |
| Missing image (broken src) on card **and** in the shared preview | error placeholder, frame stability, no layout shift |
| Filter returning exactly 1 project and 0 projects | single/empty states, selection rule, live-region announcement |
| A 6-word category name | chip and rail overflow |
| Rapid selection A→B→A during image load | latest-selection-wins, no stale crossfade |

**Truncation policy:** prefer wrapping. If a clamp is unavoidable, use `-webkit-line-clamp` with an ellipsis **and** the full text available via a visually-hidden span or `title`. Never clamp to force a fixed card height, and never clamp a project title to one line.

### 9.3 Asset plan

- One deduplicated local media set under `portfolio-listing-lab/assets/` with hashed, descriptive filenames, referenced by every template — not 20 copies of 8 project images. Seed it from the repo's existing local work imagery (`homepage-compositor/review/shared/assets/work/01-b2b-client-portal.jpg` … `08-healthtech-dashboard.jpg`) unless Gate 0 verifies better supplied originals; record the source of every image in `DECISIONS.md`.
- Format WebP (AVIF where it helps), with explicit `width`/`height` and `aspect-ratio` to prevent CLS. Non-LCP images `loading="lazy"`; the LCP image (shared preview's first project) never lazy-loaded. Preload only what the selection interaction needs to keep the crossfade honest — record the strategy.
- **Image policy:** use supplied repo imagery or clearly marked original placeholder artwork. If any generated placeholder art is used, label it as such in the gallery card and in `DECISIONS.md`. No hotlinking, no remote or expiring URLs.
- Alt text: descriptive for project images ("B2B client portal dashboard concept", not "image"), `alt=""` for decorative chrome.

---

## 10. Performance and scale budget

| Budget | Limit |
|---|---|
| Total page weight (HTML + CSS + JS + referenced images) | ≤ 700 KB per template, ≤ 250 KB excluding images |
| Image payload per page | ≤ 350 KB (the shared-preview model exists to make this easy — never ship all 8 full-size images eagerly) |
| Animation | transform/opacity only; no scroll handler that does layout work; compositor-only where possible |
| LCP | identified per template, not lazy-loaded, not blocked by a JS animation init |
| INP | no main-thread work competing with tap/keypress; selection responds before the crossfade completes |
| CLS | zero from images (explicit dimensions) and zero from the preview swap |
| Dependencies | none. No CDN, no font service, no runtime library |

**Anti-drift checks (run manually and/or with existing repo auditors — do not invent a design generator to “pass” them):**

1. **Identical-skin check** — open several PL pages side-by-side; fail when two variants are visually near-identical (proves a generator or lazy clone was used).
2. **Remote-URL check** — no `http(s)://` asset, font or script refs (production case-study `href`s under §9.1 are OK if labelled in `DECISIONS.md`).
3. **Dead-link check** — every local route resolves; no `href="#"` destinations.
4. **Token check** — brand colours within §5.1; radii/spacing within §5.3.
5. **Scope check** — no owned `blog-lab/` / `PD##` / `portfolio-lab/` artifacts from this run.
6. **Winding-roadmap presence** — dotted canvas, numbered markers, dashed SVG through markers, snaking layout.
7. **Old-template check** — no straight center-spine; no card grid without a snake.
8. **No-generator check** — no `generate*`, `build-templates*`, or similar emitter scripts under `portfolio-listing-lab/`; `DECISIONS.md` states hand-authorship.

---

## 11. Controlled-size contract (all 20 listing templates)

| Element | Desktop / tablet | Phone |
|---|---|---|
| Main content container | ~1080–1160 px; **max 1160 px** | Full width, 16–24 px gutters |
| Page H1 | 40–52 px; **max 56 px** | 30–34 px; **max 36 px** |
| Section H2 / card title | H2 24–32 px; card titles 18–24 px | H2 22–28 px; card titles 18–22 px |
| Prose / metadata | Body 16–18 px, metadata ≥12 px; measure 60–72 ch, max 720 px | Body ≥16 px narrative; compact card text ≥14 px; metadata ≥12 px |
| Portfolio timeline thumbnail | 128–240 × 80–150 px; **max 280 × 176 px** | 128–240 px wide, never wider than its card; **max 280 × 176 px** |
| Shared portfolio preview | **max 480 × 300 px**, stable frame, `object-fit: contain` | Within card width; **max 200 px high** |
| Spacing / targets | Section padding 24–48 px; gaps 16–32 px; header 64–76 px | Section padding 20–32 px; 44 px targets |

**Full-bleed clarification:** a full-bleed *background* plane is permitted, but the **content container inside it stays ≤1160 px** and the H1/media caps still apply. Record any full-bleed usage in the concept card. No 80–124 px headlines, no 500–600 px-tall project covers, no giant decorative ordinals, no empty opening screens. Record **measured** sizes at 360, 390, 768, 1024 and 1440 px in both themes.

---

## 12. The 20 templates — winding-roadmap variants

All 20 are **variations of `docs/references/nestlancer-winding-roadmap/`**. Distinctness = column count, snake tightness, canvas/phase colour, marker style, preview dock placement, density, motion — **not** a different page archetype. **Layout parent for every card:** the local prototype (cite path). Gate R refs are secondary spice only.

### 12.1 Non-negotiables (all 20)

1. Passes §1.2 (same anatomy as the prototype).
2. Eight projects DOM-ordered 01→08; snake via grid columns, not DOM reorder.
3. SVG dashed route rebuilt from marker positions on resize (prototype `roadmap.js` idea).
4. Select stop → shared preview crossfade 200–260 ms; "View case study" remains a real link.
5. No amcharts/CDN; plain HTML/CSS/JS + SVG.
6. **Hand-authored** (§1.3) — each `PL##` edited as its own design; no mass-generation `*.mjs` / Node / Python emitter.

### 12.2 `PL01–PL20` — variants of the approved winding roadmap

| ID | Variant (still the same family) | Distinctness axis | Notes |
|---|---|---|---|
| PL01 | Closest to the gold standard (3-col snake, dotted lavender, gradient dash) | fidelity baseline | May be near-clone for pilot; still add §7.1 preview dock |
| PL02 | 2-col desktop snake, wider cards, preview dock left | density / preview | |
| PL03 | Compact markers + command-style meta chips on stops | chrome | optional `H08` chrome |
| PL04 | Softer ribbon stroke (thicker halo), gentler U-turn radius | path style | |
| PL05 | Expandable notes under stops (`details`) on the same snake | density | |
| PL06 | Stronger horizontal emphasis / tighter row turns + path-progress | motion | |
| PL07 | Scroll-linked active marker + path-progress fill | motion | |
| PL08 | Asymmetric: snake canvas + large sticky preview column | hierarchy / preview | |
| PL09 | Tighter gaps / denser snake + pinned preview | density | |
| PL10 | Typographic-first cards (title/date lead; smaller thumbs) on same snake | media | |
| PL11 | Stronger phase banding (Discover/Build/Deliver segments more obvious) | colour | |
| PL12 | Print/ledger surface on cards; same snake geometry | surface | optional `M01` |
| PL13 | Mono/terminal meta on stops; same snake | chrome | optional `M04` |
| PL14 | Media-forward cards + edge treatment; same snake | media | optional `S10` |
| PL15 | Category filter dims off-phase stops; chronology + snake kept | navigation | |
| PL16 | Extra turn-rings / chapter badges at row U-turns | hierarchy | |
| PL17 | Dark dotted canvas (`--band`), light cards, light preview | theme | |
| PL18 | Explicit snake-rows labelling + persistent preview | preview | optional `S03` |
| PL19 | Smaller markers, denser 3-col, select-to-preview | density | |
| PL20 | Phone-first vertical wind refined; desktop still multi-col snake | responsive | |

**Forbidden:** straight center spine · card grid with no snake · bento/index-table as the page · fixed SVG doodle not tied to markers · abandoning the prototype for a generic “river infographic”.

Gate 1 fails if the concept would not pass the side-by-side test with `docs/references/nestlancer-winding-roadmap/`.

---

## 13. Gate 1 — concepts, mappings and the selection rubric

**20 concept cards**, each with:

- ID / name · **layout parent:** `docs/references/nestlancer-winding-roadmap/` (required)
- Which prototype pieces are kept vs varied (≥3 concrete deltas: columns, path weight, preview dock, phase colour, density, motion…)
- A **sketch** of the snake grid (rows/cols + preview dock) — Gate fails without it
- Secondary Gate R ref optional · brand chrome · §7.1 selection + crossfade · a11y · media · risks
- Explicit: passes §1.2 side-by-side test with the gold standard

**Table 1:** `template_id | gold-standard parent path | variant deltas | preview dock | brand chrome | Gate R spice refs`.

**Table 2 — distinctness:** `columns`, `path weight`, `preview placement`, `phase colour`, `density`, `motion`, `surface/theme`, `marker style`. Fail if two share the same primary delta set, or if any abandons the snake grid.

**Table 3 — motion:** path-rebuild, path-draw, marker active, crossfade (constant), sticky preview — ≤3 primary uses per signature excluding crossfade.

**Selection rubric:**

| Criterion | Weight |
|---|---|
| **Family match** — side-by-side with winding-roadmap prototype still reads as same system | 30 |
| Work scanability — 8 projects + preview story | 20 |
| Preview-selection quality | 15 |
| Brand chrome + FIG voice | 10 |
| Accessibility / keyboard | 15 |
| Motion restraint | 5 |
| Distinctiveness within the family | 5 |

Record a score sheet and one recommendation (**one PL winner**) with rationale. Optionally note which case-study direction from the sibling prompt would pair best once that lab exists — do not build it.

---

## 14. Output layout

```text
portfolio-listing-lab/
  index.html                     # gallery: all 20, filterable
  assets/                        # deduplicated local project media only (§9.3)
  shared/                        # tokens.css + base.css only (see below)
  portfolio-listing/PL01-…/index.html … PL20-…/index.html
  manifest.json                  # 20 records: id, family, layout parent domain(s), brand chrome, corpus refs, motion, verification
  audit.json                     # machine-readable audit results per template
  DECISIONS.md                   # hand-authorship attestation + selection/taxonomy/image decisions
  # NO tools/generate-*.mjs (or any script that emits PL HTML) — §1.3
```

- Plus the three docs (§2): `docs/RESEARCH-PORTFOLIO-LISTING-UI.md`, `docs/TOP10-CANON-SPEC-PORTFOLIO-LISTING.md`, `docs/PORTFOLIO-LISTING-DESIGN-ANALYSIS.md`. **Nothing else.**
- `shared/` may hold **only** tokens, resets and primitives. Each template carries its **own hand-written** layout skin (not emitted from a factory). Never import from a sibling case-study or blog `shared/` folder.
- Optional handwritten QA notes in `audit.json` / `DECISIONS.md` after visual review — do **not** add a Node/Python generator to produce designs.
- Every template renders standalone over relative paths from the repo root, links to the listing gallery, and has next/previous variant navigation within the PL family.
- Add one shared `@media print` block.
- Preview: `python3 -m http.server 8126` from the repo root → `/portfolio-listing-lab/` (8124 = homepage lab hub, 8125 = compositor, 8127 = blog lab, 8128 = case-study lab if built).

**Gallery requirements (20 items must be reviewable):** filter by layout-parent archetype, brand chrome, motion signature, verification status; **side-by-side comparison of 2–4 templates**; a contact-sheet mode; per card show **external layout parent domain**, brand chrome, corpus references, motion signature and QA status; a "compare content against Nestlancer `/portfolio`" link (content parity only — not “match this UI”), following the precedent of `homepage-compositor/review/live-nestlancer-preview.html`.

**Verification status per template** must be one of `machine-audited`, `browser-verified`, `not verified` — do not upgrade a status you did not earn.

---

## 15. Work sequence and gates

**Gate R — Supporting research.** Gold-standard dissection of `docs/references/nestlancer-winding-roadmap/` first; ≥12 supporting refs; anti-pattern appendix; motion catalog. Fails if the local prototype was not opened, or if research treats random portfolios as layout parents.

**Gate 0 — Brand chrome + content lock + gold standard.** `git status`; audit-samples still passes; open the winding-roadmap reference and confirm it runs; measure brand tokens; freeze Nestlancer content. If old `portfolio-listing-lab/` skins are not winding-roadmap family, list them for **replacement**.

**Gate 1 — Concepts.** 20 cards each naming the local gold standard + variant deltas + snake-grid sketch + §7.1 preview. Fails if layout parent is not the winding-roadmap folder, if the side-by-side family test would fail, or if DOM reorder is proposed instead of column snake.

**Gate 2a — Pilot (1 page, hand-built).** Manually author one `PL##` (start from the gold standard only if needed, then redesign by hand). Measure at all five widths and both themes; run existing `tool-3` contrast if useful; exercise interactions end-to-end. Do not proceed until the pilot passes §1.2 / §1.3.

**Gate 2b — Full build (hand-built).** Manually author the remaining pages one by one (or in small intentional batches of hand edits — never a generate script). Then hand-update gallery + `manifest.json`. Preserve existing homepage/compositor URLs; do not touch case-study or blog labs.

**Gate 3 — Verify and critique.**

- Confirm §1.3: no design-generation scripts under `portfolio-listing-lab/`; `DECISIONS.md` records hand-authorship.
- Optionally run existing repo auditors (`python3 tools/audit-samples.py`, `tools/ui-review-suite/…`) for contrast/links — these QA tools must **not** create templates.
- Manually verify §10 anti-drift list (identical-skin, winding-roadmap presence, old-template, no-generator).
- Visually spot-check every gallery thumbnail against the gold-standard prototype; any page that is not clearly the same winding-roadmap family is a **blocker**.
- Exercise every interaction across all 20 PL pages: selection and crossfade, keyboard-only selection (arrows/Home/End), rapid-click races, image-load failure, filtered previous/next, zero results, category filtering with chronology intact; plus responsive menus and themes. Verify reduced motion and no-JS.
- Inspect rendered pages at 360/390/768/1024/1440 in both themes **if a browser is available**. If not, say so explicitly and do not claim screenshot QA or measured overflow checks.
- Record measured H1 sizes, container widths, thumbnail sizes and preview-frame dimensions at all five widths and both themes. Reject oversize states, not just horizontal overflow.
- Apply the selection rubric, score the family, and recommend **one PL winner** with rationale.
- Classify every finding: **blocker** · **major** · **minor**. No blocker may remain open at hand-off.
- Write findings into `docs/PORTFOLIO-LISTING-DESIGN-ANALYSIS.md`, and log design calls in `portfolio-listing-lab/DECISIONS.md`.
- Finish by reporting file paths, the local run command (`python3 -m http.server 8126`), verification results and limitations. State explicitly that no case-study (`PD`) and no blog artifact was created or modified.

---

## 16. Hard constraints

- **Do not** push, commit, create/switch/rename a branch.
- **Do not** modify or delete existing homepage sample folders, locked copy, rank-list records, screenshots or compositor generator outputs.
- **Do not** do case-study or blog work: no `PD`/`BL`/`BA` templates, no `portfolio-case-study-lab/`, no `blog-lab/`, no case-study or blog research/analysis/canon docs, no Harbor Ops narrative body, no before/after or annotated case-study components. Do not create the combined `portfolio-lab/` or `portfolio-blog-lab/` folders.
- **Do not** present the user-preference score or the rubric score as a user study, conversion proof, or independent verification of a case-study result.
- **Do not** invent testimonials, outcomes, client identities, project dates/durations/budgets, or case studies for projects that have none supplied.
- **Do not** drop or hide the "Illustrative product concepts — not customer screenshots." caption where the FIG 05 set is shown, and do not pass placeholder/generated art off as real client work.
- **Do not** present a research corpus you did not open; unopened entries are marked not verified. Do not borrow the case-study or blog corpus's entries or count.
- **Do not** use Nestlancer `/portfolio`, screenshot `007`, homepage `D01`/`S01`/`S02` as the **layout parent**. Brand chrome and content lock only.
- **Do not** invent a different timeline system. Layout parent is `docs/references/nestlancer-winding-roadmap/`. Every page must pass §1.2.
- **Do not** ship a straight center-spine, a card grid with no dashed snake, or a fixed SVG doodle that ignores stop markers.
- **Do not** keep rejected old lab skins — replace with winding-roadmap-family compositions under the same IDs.
- **Do not** create templates with a generator script (`*.mjs`, `*.js` Node CLI, Python emitter, shell loop, npm task, compositor, factory). Hand-author each `PL##` (§1.3). In-page snake/theme/selection JS inside a template is fine; build-time generation is not.
- **Do not** ship remote or expiring media URLs, broken local routes, `href="#"` destinations, external CDNs, font services, or chart libraries (no amcharts CDN).
- **Do not** introduce brand colours outside §5.1, radii/spacing outside §5.3, or differentiation limited to colour and border radius. Phase colours along the river must be derived from §5.
- **Do not** waive the size contract (§11) or the crossfade contract (§7.3). Do not copy clipart-heavy rainbow infographics wholesale — borrow **path geometry and station rhythm** only; restyle to Nestlancer.

---

## 17. Completion checklist (listing — 20 templates)

- [ ] Opened and studied `docs/references/nestlancer-winding-roadmap/` (`index.html`, `roadmap.css`, `roadmap.js`, `DESIGN-SPEC.md`)
- [ ] **All 20 templates hand-authored** (§1.3); no generate/build-templates script; `DECISIONS.md` states hand-craft
- [ ] Research doc includes gold-standard dissection + ≥12 supporting refs + anti-pattern appendix
- [ ] Motion catalog includes path-rebuild, path-draw, marker active, crossfade
- [ ] Brand chrome/tokens measured; Nestlancer `/portfolio` = content only
- [ ] All 20 pass §1.2 side-by-side family test with the winding-roadmap prototype
- [ ] Dotted canvas · bookends · phase legend · dashed gradient SVG through markers · snake grid (DOM 01→08)
- [ ] SVG path rebuilt from marker positions on resize (in-page JS OK)
- [ ] Shared preview + selection semantics + crossfade 200–260 ms; case-study links real
- [ ] No straight spine / card-grid-without-snake / homepage D01-S01 clone
- [ ] Anti-drift checks (§10) including identical-skin + no-generator pass
- [ ] a11y: landmarks, h1, skip link, keyboard, reduced-motion, no-JS
- [ ] Gallery labels variant deltas; Nestlancer link is content-compare only
- [ ] One PL winner; no blockers; no commit/branch/push

