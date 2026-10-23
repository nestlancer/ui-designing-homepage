# Nestlancer Portfolio Listing Page Lab — AI Agent Prompt (Listing Only)

> **Use this prompt with the `nestlancer/ui-designing-homepage` repository open as the working directory.**
>
> **Split v2.2 (2026-10-23) — river-curve timelines only.** This file is one half of the split of `portfolio-prompt.md` (which itself was the portfolio half of `blog-portfolio-prompt.md` v4). It covers **portfolio listing work only**: `PL01–PL20` = **20 templates**. The case-study half lives in `portfolio-case-study-prompt.md` and is **not** part of this task — do not read it as instructions, do not execute it, and do not create any case-study (`PD`) artifact while running this prompt. Blog work (`blog-prompt.md`) is likewise out of scope.
>
> **Why v2.2 (mandatory read):** Earlier runs kept shipping **old designs** — straight vertical center-spines, card grids, ledger rails, and homepage `D01`/`S01` clones — even after v2.1 banned Nestlancer `/portfolio` as a layout parent. Those builds were rejected again. This revision locks **every** `PL##` to a **river / serpentine / S-curve / winding-path** timeline composition (infographic “road/river” family), adapted to Nestlancer tokens and §7 selection. Straight spines and card grids are hard failures. See §1.1, §1.2, §4, §12.
>
> This prompt is **standalone**: everything you need (canon, tokens, accessibility, size, content and gate rules) is in this file. You do not need `portfolio-case-study-prompt.md`, `portfolio-prompt.md`, or `blog-prompt.md` to complete it. Where a rule is duplicated identically in the case-study prompt (tokens, canon table, brand keep-rules), that duplication is intentional — the two labs must stay one brand even though they are built separately. **Do not diverge from the shared values in §5 to "be different" from the case-study lab.**
>
> **Do not push, commit, create or switch a branch.** Preserve the active branch, all existing homepage artifacts, the rank-list records and the current template URLs. If `portfolio-listing-lab/` already contains rejected straight-spine templates from a prior run, **replace them** under the same `PL##` IDs — do not keep the old skins.

---

## 1. Role and outcome

Act as a senior product designer, UI/motion researcher, accessibility-minded frontend engineer, and critical design reviewer. Extend this repository into a **separate portfolio listing page-template lab** without changing the homepage work, without touching any blog work, and without building case-study pages.

Deliverables, in order:

1. `docs/RESEARCH-PORTFOLIO-LISTING-UI.md` — research corpus focused on **river / serpentine / S-curve / winding-path** timeline visuals (≥20 curve references + ≥15 live pages), plus the 2026 synthesis (§4).
2. `docs/TOP10-CANON-SPEC-PORTFOLIO-LISTING.md` — brand-chrome audit of the Top-10 compositions (type, tokens, header/footer geometry) for Nestlancer identity only — **not** the timeline layout brief (§3, §5).
3. `docs/PORTFOLIO-LISTING-DESIGN-ANALYSIS.md` — brand sample matrix, Nestlancer **content** freeze + layout anti-parent note, river-curve visual acceptance notes, and verification findings (§6).
4. **20 responsive, navigable HTML templates** — portfolio listing (`PL01–PL20`) — in `portfolio-listing-lab/`, plus one gallery, manifest and checker. **Every template is a river-curve timeline variant** (§1.2, §12).

Every template must trace to **(a)** at least one **river/serpentine/S-curve** reference from Gate R as its **layout parent**, and **(b)** Nestlancer homepage samples only for chrome / tokens / FIG voice (§3, §5). A shared palette alone is not derivation. Straight center-spines, card grids, homepage `D01`/`S01`/`S02` clones, and Nestlancer `/portfolio` layout clones are failures — including “new skins” of those old templates.

### 1.1 Design derivation policy — river-curve-first (read before §3)

| Layer | Source of truth | What you take | What you refuse |
|---|---|---|---|
| **Timeline layout** | River / serpentine / S-curve / winding-road **infographic & UI** references (Gate R §4) | Continuous curved path, alternating left/right (or above/below) stations, phase colour bands along the path, milestone nodes, Start→End journey reading | Straight vertical center line; flat card grid; left date-rail + right cards only; horizontal thumbnail strip without a curve; homepage section clones |
| **Interaction** | §7.1 shared preview contract | Select project → crossfade into one shared preview; `View case study` separate | Whole-card fake links; hover-only selection |
| **Brand chrome & tokens** | Homepage top-10 samples + §5 | Header/footer `P01`, FIG mono eyebrow, navy/teal/mint, radius/spacing, CTA closings | New brand hues; rainbow gradients that abandon Nestlancer teal/navy |
| **Content** | FIG 05 + verified Nestlancer project fields (§9.1) | The 8 locked titles, categories, summaries, stack tags, dates, illustrative caption | Invented projects |

**Anti-pattern (explicit — prior builds failed on these):**

1. Homepage Selected Work / Delivery Continuum Rail with Nestlancer content pasted in.
2. Nestlancer live `/portfolio` straight chronological list / spine.
3. “Agency portfolio” card grid or bento with a thin line somewhere.
4. Straight vertical timeline with dots on a center axis (classic “old template”).
5. Re-shipping any previous `portfolio-listing-lab` skin that is not a visible river/S-curve path.

### 1.2 Visual contract — river / serpentine path (non-negotiable for all 20)

Every `PL##` must pass this **5-second screenshot test** at 1440 and 390: a reviewer who has never read the prompt must describe the main composition as a **winding path / river / S-curve / serpentine road**, not as a “card list” or “center spine.”

**Must be visible on every page:**

1. **One continuous curved path** (SVG `path`, CSS clip, or equivalent) that meanders — at least **two direction changes** (e.g. L→R then R→L, or an S with ≥2 bends). A single straight line fails.
2. **Eight project stations** on that path (newest-first), each with date + title + select control + thumbnail within §11 caps.
3. **Alternating placement** of stations relative to the path (left/right or above/below) so the composition reads as a journey, not a column.
4. **Phase / segment colour** along the path using Nestlancer tokens only (e.g. `--teal` → `--ink-2` → `--band` segments, or `--mint`/`--teal-soft` fills) — not a rainbow unrelated to §5.
5. Clear **Start** (newest / top or path origin) and **End** (oldest / path terminus) orientation.
6. **One shared preview** (§7.1) — sticky panel, floating frame, or path-adjacent dock — still required.

**Reference images the agent must open and study (layout only — restyle to Nestlancer brand):**

| Reference | URL | What to borrow |
|---|---|---|
| Visme research project timeline (S-curve / dashed river) | `https://visme.co/blog/wp-content/uploads/2021/08/4.jpg` | Meandering dashed path, month rings at turns, nodes + icons + dates along the river, Start→End |
| LinkedIn / winding-road learning path (river curve) | `https://media.licdn.com/dms/image/v2/D4E22AQFsEC1u6TO3eg/feedshare-shrink_800/B4EZfTb5omHIAg-/0/1751598997615?e=2147483647&v=beta&t=7xxAk65fH2I6oL8jt9glq4m4LYle0RdVz1Nd5C44JBY` | Thick winding road, colour-coded phase markers, stations alternating beside the path, legend for phases |
| Visme timeline layout guide (S-shape / zig-zag / wavy / winding road) | `https://visme.co/blog/how-to-make-a-timeline/` | Named layout families: S-shape, zig-zag, wavy, winding-road roadmap |
| Umberex ribbon timeline brief | `https://umbrex.com/resources/powerpoint-slides/timeline/infographic-ribbon-timeline/` | Sweeping S-ribbon with stations at bends, alternating callouts |
| PresentationGO serpentine | `https://www.presentationgo.com/presentation/powerpoint-serpentine-timeline/` | Wavy connected segments as chronology |
| amCharts SerpentineChart docs | `https://www.amcharts.com/docs/v5/charts/timeline/` | Vertical/horizontal serpentine “road” with `levelCount` turns — implement with plain SVG/CSS, **no** amcharts CDN |
| Snake Timeline (row serpentine) | `https://ui.mljr.eu/components/snake-timeline` | Odd rows L→R, even rows R→L, curved connectors at row ends |

**Hard fail if the page looks like any of these:** straight center spine · single-column card stack · CSS grid of project cards · horizontal scrolling thumbnail strip without a serpentine path · “filter bar + work grid” homepage Selected Work · Nestlancer production `/portfolio`.

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
- **If the listing lab already exists** from an earlier run: keep the same `PL01–PL20` IDs and folder paths, but **replace** any straight-spine / card-grid skins with river-curve compositions that pass §1.2. Do not create a second listing folder. Do not “polish” old templates — rebuild the main composition.
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

## 4. Gate R — river / serpentine curve corpus ⭐ primary design source

Write `docs/RESEARCH-PORTFOLIO-LISTING-UI.md`. This corpus is the **primary layout parent** for all 20 PL templates. The research question is **not** “find nice portfolio indexes.” It is: **find and document river-curve / serpentine / S-shape / winding-road timeline compositions**, then adapt them under Nestlancer brand + §7.

**Hard exclusions from the design corpus (may still appear only as content footnotes):**

- `app.nestlancer.com/portfolio` and screenshot `007` — **content extract only**; never a layout parent.
- Homepage compositor top-50 / top-10 pages and section samples (`D01`, `S01`, `S02`, …) — **brand chrome only**; do not count them toward corpus totals.
- Straight center-spine timelines, card grids, and “filter + work grid” indexes — record them only in a short **anti-pattern appendix** (what not to rebuild), not as layout parents.
- Generic marketing homes with no timeline path — do not count.

**Corpus composition — two tracks (both required):**

| Tier | Min | What counts |
|---|---|---|
| **RC · River-curve visual refs** | **20** | Infographic images, template pages, docs, or live demos whose primary composition is a **serpentine / S-curve / winding road / ribbon / snake / meandering path** timeline. Image URLs and template pages count if opened and described. Prefer curve examples over portfolio card grids. |
| **LP · Live pages with curve or zigzag journey UX** | **15** | Live HTML pages (portfolio, roadmap, process, history) that use alternating zig-zag stations, serpentine rows, curved connectors, or winding paths. Straight-spine-only sites do **not** count toward LP. |
| PL-C · Preview / selection UX (supporting) | 6 | Shared/hover preview, sticky preview dock, keyboard-friendly selection patterns to adapt into §7.1 (may be on non-curve pages, but they are **interaction** parents only, never layout parents) |

**Mandatory image seeds (open first — these define the visual family):**

| # | URL | Notes |
|---|---|---|
| 1 | `https://visme.co/blog/wp-content/uploads/2021/08/4.jpg` | User-cited: dashed S-river, month rings, icon nodes, Start→End |
| 2 | `https://media.licdn.com/dms/image/v2/D4E22AQFsEC1u6TO3eg/feedshare-shrink_800/B4EZfTb5omHIAg-/0/1751598997615?e=2147483647&v=beta&t=7xxAk65fH2I6oL8jt9glq4m4LYle0RdVz1Nd5C44JBY` | User-cited: thick winding road, phase colours, pin markers |
| 3+ | Search and open similar images: queries `serpentine timeline infographic`, `winding road roadmap`, `S-curve timeline`, `river curve timeline`, `zigzag timeline path`, `meandering path milestones` — from Visme, SlideKit, PresentationGO, Umberex, Freepik (layout study only), etc. |

**Mandatory page / doc seeds (verify live; replace if dead):**

| Seed | URL | Curve lesson |
|---|---|---|
| Visme — How to Make a Timeline | `https://visme.co/blog/how-to-make-a-timeline/` | Names S-shape, zig-zag, wavy, winding-road layouts — use as taxonomy |
| Visme timeline / roadmap template hubs | `https://www.visme.co/templates/infographics/timeline/` · `https://www.visme.co/templates/infographics/roadmaps/` | More curve variants |
| Umberex ribbon timeline | `https://umbrex.com/resources/powerpoint-slides/timeline/infographic-ribbon-timeline/` | S-ribbon + alternating callouts |
| PresentationGO serpentine | `https://www.presentationgo.com/presentation/powerpoint-serpentine-timeline/` | Wavy chevron segments |
| SlideKit / PPT serpentine templates | e.g. `https://www.slidekit.com/serpentine-timeline-powerpoint-and-google-slides/` · `https://ppt-design.com/timeline-templates/6-year-serpentine-timeline-infographic` | Multi-year serpentine ribbons |
| amcharts Timeline (SerpentineChart) | `https://www.amcharts.com/docs/v5/charts/timeline/` | `levelCount` turns — **reimplement in SVG/CSS; no amcharts CDN** |
| Snake Timeline showcase | `https://ui.mljr.eu/components/snake-timeline` | Row serpentine L→R / R→L |
| Wensity zigzag timeline | `https://ui.wensity.com/blocks/how-it-works-sections/how-it-works-section-with-zigzag-timeline` | Alternating cards + elbow connectors |
| Madeline Cole timeline portfolio demos | `https://timeline-portfolio.madelinecole.com/` | Zigzag vertical variants — borrow curve/alternation only |

Expand with more RC images and LP pages until minima are met. When a URL is dead, mark **not verified** and replace — do not invent observations.

**Per-record fields (RC + LP):** # / URL or domain / access date / observation method / **curve family** (`s-curve` · `serpentine-vertical` · `serpentine-horizontal` · `winding-road` · `ribbon` · `snake-rows` · `zigzag-elbows` · `wavy`) / bend count / how stations sit relative to the path / phase colour strategy / icon/node treatment / preview opportunity / **transferable Nestlancer adaptation** / **risk to not copy** (clipart overload, rainbow unrelated to brand, illegible type, scroll-jacking) / which `PL##` it informs.

Rules: no fabricated refs; Nestlancer and homepage samples never count toward RC/LP; dead/paywalled capped at 10% and labelled.

**Quality bar:** ≥20 RC curve visuals; ≥15 LP live curve/zigzag pages; both user-cited images opened and described in detail; ≥8 RC/LP with timed motion notes; ≥6 dark-mode or theme notes where applicable.

**2026 synthesis** — every claim cites corpus entries:

- **Curve-family map** with counts (S-curve, serpentine vertical, winding road, ribbon, snake-rows, zigzag-elbows, wavy) and 3+ refs each.
- How preview/selection can attach to a river path without destroying the curve (dock, sticky panel, inline frame).
- What “old timeline templates” look like (straight spine, card grid) and why this lab bans them.
- Motion catalog of 6–8 signatures: at least **path-draw / path-progress**, **station stagger-reveal**, shared-preview **crossfade** (200–260 ms), and one sticky-preview signature. Animate transform/opacity (and SVG `stroke-dashoffset` for path-draw only). Reduced-motion = path fully drawn, no dash animation, immediate preview swap.
- Conflict list vs §11 (infographics love huge covers/icons — refuse oversize; keep curve rhythm).

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
| **River / serpentine path** | continuous SVG/CSS path · ≥2 bends · phase segments · Start/End · path-progress / path-draw · reduced-motion = fully drawn static path · visible at 3:1 against background |
| Path station / node | ordinal/date · icon optional · **selected** (matches preview) · keyboard-reachable · image-error — selection at 3:1, never colour-only |
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

**Anti-drift checks (must be scripted in the lab checker, §14):**

1. **Identical-skin detector** — compare computed type scales, container widths, radius sets and colour sets across the 20; fail when two templates are visually near-identical.
2. **Remote-URL scan** — fail on any `http(s)://` asset, font or script reference (production case-study route links in `href` for the §9.1 rule are allowed and must be labelled in `DECISIONS.md`).
3. **Dead-link scan** — fail on any local route that does not resolve and on any `href="#"` used as a destination.
4. **Token-lint** — fail on brand colours outside §5.1 and on radius/spacing values outside §5.3.
5. **Scope scan (split-specific)** — fail if any file under `portfolio-listing-lab/` references `portfolio-case-study-lab/` as a **required** build path without the §9.1 optional link rule, references `blog-lab/`, a `BL##`/`BA##`/`PD##` path as an owned artifact, or `portfolio-lab/` / `portfolio-blog-lab/`; fail if any doc created by this run sits outside the three §2 paths.
6. **River-curve presence** — fail if a template’s main markup has no SVG/`path` (or equivalent continuous curved connector) with documented ≥2 bends, or if the gallery thumbnail is labelled as “spine” / “card grid” / “work grid” without a curve family from §12.2.
7. **Old-template detector** — fail templates whose structure is primarily a centered vertical list of cards with a straight `::before` line (classic timeline template), or a CSS grid of project cards with no meandering path.

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

## 12. The 20 templates — river-curve direction assignments

All 20 directions are **variants inside the river / serpentine family**. Distinctness comes from curve geometry, phase colouring, station density, preview dock placement, and motion — **not** from abandoning the curve. **Layout parent** = a Gate R RC/LP curve reference named in the concept card. **Brand chrome** = §3 `P01` (default) or ≤3 rubric chrome exceptions (§3.2).

### 12.1 Non-negotiables (all 20)

1. Passes §1.2 visual contract (continuous curved path, ≥2 bends, 8 stations, alternating placement, phase colour, Start→End).
2. All eight Nestlancer projects newest-first on the path; medium thumbnails within §11 caps.
3. Selecting a station loads **one shared preview** with 200–260 ms crossfade (§7); `View case study` is a separate explicit link.
4. Layout parent is a **river-curve** Gate R ref — never Nestlancer `/portfolio`, never homepage `D01`/`S01`/`S02`, never a straight spine.
5. SVG/CSS only — no amcharts, no Chart.js, no CDN path libraries.

### 12.2 `PL01–PL20` — curve variants only

| ID | Direction (must still read as a river/S-curve) | Distinctness axis | Curve family (cite Gate R ref) | Brand chrome |
|---|---|---|---|---|
| PL01 | Classic vertical S-river, dashed path, sticky preview right | path style | `s-curve` (Visme 4.jpg class) | `P01` |
| PL02 | Thick winding-road path, phase pins, preview left | path weight | `winding-road` (LinkedIn roadmap class) | `P01` |
| PL03 | Compact serpentine with command metadata chips on stations | chrome | `serpentine-vertical` | optional `H08` |
| PL04 | Soft ribbon S-curve, stations at bends, alternating callouts | path style | `ribbon` (Umberex class) | `P01` |
| PL05 | Ruled editorial river + expandable station notes | density | `s-curve` + notes | `P01` |
| PL06 | Horizontal serpentine (levelCount ≥3), scroll-driven path-progress | navigation model | `serpentine-horizontal` (amcharts-class geometry, SVG only) | `P01` |
| PL07 | Vertical serpentine with `path-progress` fill + preview dock | motion signature | `serpentine-vertical` | `P01` |
| PL08 | Wide S-curve left, large sticky preview right (asymmetric) | hierarchy | `s-curve` | `P01` |
| PL09 | Stacked river loops (tight bends) + pinned preview | motion signature | `serpentine-vertical` dense | optional surface exception |
| PL10 | Typographic stations (date+title lead) on a thin S-path; images secondary | media treatment | `s-curve` typographic | `P01` |
| PL11 | Phase-banded river (colour segments) + fixed preview module | layout / colour | `winding-road` phase bands | `P01` |
| PL12 | Ledger-print river: receipt rules + wavy path | surface | `wavy` | optional `M01` |
| PL13 | Terminal/mono labels on a geometric serpentine | chrome | `serpentine-vertical` | optional `M04` |
| PL14 | Media-forward stations on a river + edge-mask preview | media treatment | `winding-road` | optional `S10` |
| PL15 | Filterable river: category chips dim off-path stations; chronology kept | navigation model | `s-curve` + filters | `P01` |
| PL16 | Chaptered river with turn-rings (quarter / phase markers) | hierarchy | `s-curve` with turn rings (Visme month-ring class) | `P01` |
| PL17 | Dark `--band` canvas, light path + light preview frame | surface/theme | `s-curve` dark editorial | `P01` |
| PL18 | Snake-rows: odd L→R, even R→L, curved end connectors + persistent preview | preview placement | `snake-rows` (mljr class) | optional `S03` |
| PL19 | Dense node river (compact stations) + select-to-preview | density | `serpentine-vertical` dense | `P01` |
| PL20 | Zigzag-elbow path (rounded elbows, not sharp grid) + sidebar preview | path style | `zigzag-elbows` (must still read as a continuous journey path) | `P01` |

**Forbidden directions (do not build, even if named in an older prompt version):** straight center spine · card grid · bento index · index-table without a curve · horizontal thumbnail rail without serpentine · magazine cover grid · master/detail list without a river path · “ledger date rail + cards” without a meandering path.

Gate 1 fails if any concept card’s layout parent is a homepage sample, Nestlancer `/portfolio`, or a non-curve archetype — or if the sketched composition fails the §1.2 5-second test.

There are **no case-study (`PD`) directions and no blog directions in this prompt.**

---

## 13. Gate 1 — concepts, mappings and the selection rubric

**20 concept cards**, each with:

- ID / name / family
- **Curve family** from §12.2 + **layout parent** Gate R URL(s) (must be RC/LP curve refs) + ≥3 borrowed curve patterns (path shape, station placement, phase colour — not just palette)
- A **rough path diagram** (ASCII or SVG sketch) showing bends and 8 station sides — Gate fails without it
- **Brand chrome parent:** `P01` (default) or labelled rubric chrome exception
- §7.1 selection + crossfade · a11y · media · size bounds · risks · distinctness claim
- Explicit statement: passes §1.2; **not** a straight spine / card grid / Nestlancer `/portfolio` / homepage `D01`/`S01` clone

**Table 1 — parent mapping (20 rows):** `template_id | curve family | layout parent URL(s) | bend strategy | preview dock | brand chrome | risks refused`.

**Table 2 — distinctness matrix (20 rows × axes):** `path geometry`, `preview placement`, `chrome`, `density`, `media treatment`, `phase colour`, `navigation model`, `motion signature`, `surface/theme`. **Gate fails if two templates share both path geometry and motion signature**, or if any row’s path geometry is “straight spine” / “card grid”.

**Table 3 — motion coverage:** path-draw / path-progress, station stagger, crossfade (constant), sticky preview — caps as before (≤3 primary uses per catalog signature excluding crossfade).

**Selection rubric (define before building, apply at Gate 3):**

| Criterion | Weight |
|---|---|
| **River-curve clarity** — 5-second test: reads as winding path, not old spine/grid | 25 |
| Work scanability — all 8 projects + preview story fast | 20 |
| Preview-selection quality (keyboard, live region, latest-wins, frame stability) | 15 |
| Brand fit (tokens, FIG, `P01`) without looking like Nestlancer `/portfolio` | 10 |
| Accessibility and keyboard quality | 15 |
| Motion restraint (path-progress + crossfade; no scroll-jacking) | 10 |
| Distinctiveness within the river-curve family | 5 |

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
  DECISIONS.md                   # selection semantics, filtered-out-selection rule, taxonomy call,
                                 # case-study linking rule, image policy, exceptions
  tools/check-portfolio-listing-lab.*  # the lab checker (§10 anti-drift + Gate 3 audits)
```

- Plus the three docs (§2): `docs/RESEARCH-PORTFOLIO-LISTING-UI.md`, `docs/TOP10-CANON-SPEC-PORTFOLIO-LISTING.md`, `docs/PORTFOLIO-LISTING-DESIGN-ANALYSIS.md`. **Nothing else.**
- `shared/` may hold **only** tokens, resets and primitives. Each template carries its own layout skin. Never import from a sibling case-study or blog `shared/` folder.
- Every template renders standalone over relative paths from the repo root, links to the listing gallery, and has next/previous variant navigation within the PL family.
- Add one shared `@media print` block.
- Preview: `python3 -m http.server 8126` from the repo root → `/portfolio-listing-lab/` (8124 = homepage lab hub, 8125 = compositor, 8127 = blog lab, 8128 = case-study lab if built).

**Gallery requirements (20 items must be reviewable):** filter by layout-parent archetype, brand chrome, motion signature, verification status; **side-by-side comparison of 2–4 templates**; a contact-sheet mode; per card show **external layout parent domain**, brand chrome, corpus references, motion signature and QA status; a "compare content against Nestlancer `/portfolio`" link (content parity only — not “match this UI”), following the precedent of `homepage-compositor/review/live-nestlancer-preview.html`.

**Verification status per template** must be one of `machine-audited`, `browser-verified`, `not verified` — do not upgrade a status you did not earn.

---

## 15. Work sequence and gates

**Gate R — River-curve corpus.** ≥20 RC curve visuals (including both user-cited images) + ≥15 LP live curve/zigzag pages; curve-family map; anti-pattern appendix for straight spines; motion catalog with path-draw/path-progress. Fails if Nestlancer/homepage counted as layout parents, if RC/LP minima missed, or if research drifts back to “generic portfolio indexes” without curves.

**Gate 0 — Brand chrome + content lock.** `git status`; `python3 tools/audit-samples.py` still passes; read the 13 samples for chrome/tokens only; measure brand tokens; freeze Nestlancer content + anti-parent note. If an old `portfolio-listing-lab/` exists with straight-spine templates, list those IDs for **replacement** (same `PL##`, new river-curve skins).

**Gate 1 — Concepts.** 20 concept cards each with a path diagram + curve family + Gate R curve parent + §7.1 spec. Fails on missing path diagram, non-curve layout parents, duplicate path-geometry+motion pairs, >3 chrome exceptions, or any concept that would fail the §1.2 5-second test.

**Gate 2a — Pilot (1 page).** One PL template. Measure at all five widths and both themes, run `tool-3` contrast and the five anti-drift checks (§10), exercise the interactions end-to-end: select each of the 8 projects by pointer **and** keyboard, rapid-click race, broken image into the preview, filter to 1 and to 0 (if applicable), follow `View case study`, reduced motion, no-JS. Record results. Do not proceed until the pilot passes.

**Gate 2b — Full build.** All 20 pages plus gallery, manifest and checker. Keep manifests, concept cards, parent mappings, gallery labels and thumbnails synchronised. Preserve existing URLs; do not rebuild or alter the 21,600 homepage compositions or the original top-50 hand-offs; do not touch case-study or blog labs if they exist.

**Gate 3 — Verify and critique.**

- Run the repo's existing audit scripts unmodified (`python3 tools/audit-samples.py`, the `tools/ui-review-suite/` tools that apply) plus the new listing-lab audit (links, unique IDs, landmarks/headings, alt text, image dimensions, remote-URL scan, dead links, token-lint, identical-skin detector, **scope scan**, **river-curve presence**, **old-template detector**, JS syntax, no-JS visibility, size caps, motion-signature presence, curve-family label, Gate R parent presence, crossfade-duration check).
- Visually spot-check every gallery thumbnail against §1.2; any page a reviewer would call “normal timeline” or “card grid” is a **blocker**.
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
- **Do not** use Nestlancer `/portfolio`, screenshot `007`, homepage `D01` Continuum Rail, or `S01`/`S02` selected-work samples as the **timeline layout parent** for any `PL##`. Brand chrome and content lock only.
- **Do not** ship a straight vertical center-spine timeline, a project card grid, a bento work index, or any “classic HTML timeline template” as a `PL##`. Every page must pass §1.2.
- **Do not** keep rejected old `portfolio-listing-lab` skins — replace them with river-curve compositions under the same IDs.
- **Do not** ship remote or expiring media URLs, broken local routes, `href="#"` destinations, external CDNs, font services, or chart libraries (no amcharts CDN).
- **Do not** introduce brand colours outside §5.1, radii/spacing outside §5.3, or differentiation limited to colour and border radius. Phase colours along the river must be derived from §5.
- **Do not** waive the size contract (§11) or the crossfade contract (§7.3). Do not copy clipart-heavy rainbow infographics wholesale — borrow **path geometry and station rhythm** only; restyle to Nestlancer.

---

## 17. Completion checklist (listing — 20 templates)

- [ ] ≥20 RC river-curve visual refs + ≥15 LP live curve/zigzag pages; both user-cited images opened and documented
- [ ] Curve-family map (S-curve, winding-road, serpentine, ribbon, snake-rows, zigzag-elbows, wavy) with citations
- [ ] Anti-pattern appendix documents straight spines / card grids as banned
- [ ] Motion catalog includes path-draw/path-progress + crossfade + station stagger; reduced-motion + no-JS defined
- [ ] `docs/TOP10-CANON-SPEC-PORTFOLIO-LISTING.md`: brand chrome/tokens only
- [ ] Nestlancer `/portfolio` = content freeze + anti-parent only; taxonomy quirk recorded
- [ ] Every concept card has a path diagram + curve family + Gate R curve parent
- [ ] All 20 templates pass §1.2 5-second river-curve test at 1440 and 390
- [ ] No straight center-spine, card-grid, or homepage `D01`/`S01`/`S02` layout; old lab skins replaced if present
- [ ] Continuous curved path with ≥2 bends; 8 stations alternating; phase colour from §5; Start→End clear
- [ ] Selection semantics + shared preview crossfade 200–260 ms on all 20; chronology survives filtering
- [ ] River-path component + station states implemented; contrast 3:1 on path and selection
- [ ] Token-lint, identical-skin, remote-URL, dead-link, scope, **river-curve presence**, **old-template detector** pass
- [ ] Landmarks, single `h1`, skip link, 44/24 targets, reduced-motion, no-JS
- [ ] Chrome checklist; no `href="#"`; illustrative caption intact; assets deduplicated
- [ ] Gallery shows curve family per card; Nestlancer link is content-compare only
- [ ] ≤3 chrome exceptions; size contract at 5×2; one PL winner; no blockers; no commit/branch/push
