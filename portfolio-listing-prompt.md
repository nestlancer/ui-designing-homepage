# Nestlancer Portfolio Listing Page Lab — AI Agent Prompt (Listing Only)

> **Use this prompt with the `nestlancer/ui-designing-homepage` repository open as the working directory.**
>
> **Split v2.1 (2026-10-22) — timeline-first.** This file is one half of the split of `portfolio-prompt.md` (which itself was the portfolio half of `blog-portfolio-prompt.md` v4). It covers **portfolio listing work only**: `PL01–PL20` = **20 templates**. The case-study half lives in `portfolio-case-study-prompt.md` and is **not** part of this task — do not read it as instructions, do not execute it, and do not create any case-study (`PD`) artifact while running this prompt. Blog work (`blog-prompt.md`) is likewise out of scope.
>
> **Why v2.1:** An earlier run of this lab derived timeline layouts from the homepage top-10/top-50 samples and from Nestlancer’s own live `/portfolio` page. Those timeline designs were rejected. This revision flips the derivation order: **timeline layout + chronology UX come from live external timeline / work-index sites** (Gate R). Homepage samples and Nestlancer `/portfolio` are **brand chrome, tokens, and locked content only** — not timeline layout parents. See §1.1 and §3.
>
> This prompt is **standalone**: everything you need (canon, tokens, accessibility, size, content and gate rules) is in this file. You do not need `portfolio-case-study-prompt.md`, `portfolio-prompt.md`, or `blog-prompt.md` to complete it. Where a rule is duplicated identically in the case-study prompt (tokens, canon table, brand keep-rules), that duplication is intentional — the two labs must stay one brand even though they are built separately. **Do not diverge from the shared values in §5 to "be different" from the case-study lab.**
>
> **Do not push, commit, create or switch a branch.** Preserve the active branch, all existing homepage artifacts, the rank-list records and the current template URLs.

---

## 1. Role and outcome

Act as a senior product designer, UI/motion researcher, accessibility-minded frontend engineer, and critical design reviewer. Extend this repository into a **separate portfolio listing page-template lab** without changing the homepage work, without touching any blog work, and without building case-study pages.

Deliverables, in order:

1. `docs/RESEARCH-PORTFOLIO-LISTING-UI.md` — research corpus of **≥30 distinct, currently accessible** portfolio / work-index sites, audited for listing UI and animation, plus the 2026 synthesis (§4).
2. `docs/TOP10-CANON-SPEC-PORTFOLIO-LISTING.md` — brand-chrome audit of the Top-10 compositions (type, tokens, header/footer geometry) for Nestlancer identity only — **not** the timeline layout brief (§3, §5).
3. `docs/PORTFOLIO-LISTING-DESIGN-ANALYSIS.md` — brand sample matrix, Nestlancer **content** freeze + layout anti-parent note, and verification findings (§6).
4. **20 responsive, navigable HTML templates** — portfolio listing (`PL01–PL20`) — in `portfolio-listing-lab/`, plus one gallery, manifest and checker.

Every template must trace to **(a)** at least one **external live timeline / work-index** corpus entry in `docs/RESEARCH-PORTFOLIO-LISTING-UI.md` as its **layout parent**, and **(b)** Nestlancer homepage samples only for chrome / tokens / FIG voice (§3, §5). A shared palette alone is not derivation. Cloning the homepage `D01` Continuum Rail, `S01`/`S02` work grids, or Nestlancer’s live `/portfolio` timeline as the page layout is a failure. 20 recolours of a homepage section is a failure.

### 1.1 Design derivation policy — timeline-first (read before §3)

| Layer | Source of truth | What you take | What you refuse |
|---|---|---|---|
| **Timeline layout & chronology UX** | Live **external** portfolio / work-index / timeline pages (Gate R) | Spine shape, year rails, horizontal rails, sticky previews, archive rows, chapter markers, density, media placement, motion ideas (adapted to §7/§11) | Nestlancer `/portfolio` layout; homepage section samples used as the timeline composition |
| **Brand chrome & tokens** | Homepage top-10 samples + §5 | Header/footer `P01` grammar, FIG mono eyebrow, navy/teal/mint tokens, radius/spacing, CTA closings | New brand hues; copying a homepage hero/delivery block as the whole page |
| **Content** | FIG 05 + verified Nestlancer project fields (§9.1) | The 8 locked titles, categories, summaries, stack tags, dates, illustrative caption | Invented projects; inventing Nestlancer’s production timeline UI as “content” |

**Anti-pattern (explicit):** Do **not** design the 20 PL pages as “homepage Selected Work / Delivery Continuum Rail with Nestlancer portfolio content pasted in.” Prior builds that did this were rejected. Open and audit **other people’s live timeline sites** first; Nestlancer’s own `/portfolio` is opened only to freeze **data**, then set aside as a layout reference.

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
- **If the listing lab already exists** from an earlier partial run of this same prompt: resume inside `portfolio-listing-lab/` under the gate rules in §15; do not restart file numbering and do not create a second listing folder.
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

## 4. Gate R — live external timeline corpus (≥30 sites) ⭐ primary design source

Write `docs/RESEARCH-PORTFOLIO-LISTING-UI.md`. This corpus is the **primary layout parent** for all 20 PL templates. Homepage samples are not a substitute.

**Hard exclusions from the design corpus (may still appear only as content footnotes):**

- `app.nestlancer.com/portfolio` and screenshot `007` — **content extract only**; do not list them as a transferable timeline pattern or as a layout parent for any `PL##`.
- Homepage compositor top-50 / top-10 pages and section samples (`D01`, `S01`, `S02`, …) — **brand chrome only**; do not count them toward the ≥30 domains.
- Generic marketing homes with no work index / timeline — do not count.

**Corpus composition — minimum 30 distinct domains** (tier minimums sum to 36, giving headroom). Prefer live **timeline / chronological work-index** pages over generic card grids:

| Tier | Min | What counts |
|---|---|---|
| PL-T · Chronological timelines | **15** | Live sites whose work index is explicitly a timeline, year rail, horizontal project rail, chaptered chronology, career archive, or dated spine (vertical or horizontal) |
| PL-A · Work indexes with chronology | 8 | Studio/agency/individual work indexes that preserve date order even if not a literal “timeline” graphic |
| PL-B · Award / trend timeline refs | 6 | 2025–2026 award nominees / SOTD / curated lists audited on their **work index or timeline** pages |
| PL-C · Preview / sticky / archive UX | 7 | Sites strong in shared/hover preview, sticky project rail, master/detail index, filterable chronology |

**Seed list — open these first (verify live; replace if dead; do not invent).** Each must get a full per-site record before you invent new directions. Expand beyond this seed to reach ≥30:

| Seed | Live URL (verify) | Why it is in the seed | Timeline archetype to study |
|---|---|---|---|
| Aparelho Studio | `https://aparelho.studio/` (+ `/archive` if present) | Horizontal project rail; archive rows with hover preview | horizontal rail · archive hover preview |
| Matt Olpinski | `https://mattolpinski.com/portfolio/` | Year-grouped visual career timeline (many projects) | year chapters · dense chronological archive |
| 18 Years of Büro | `https://18.burocratik.com/` | Horizontal chaptered studio timeline (Awwwards SOTD) | horizontal chaptered timeline — **risk:** WebGL / scroll-jacking / forced audio — adapt rhythm, refuse the risks |
| Diego Sevilla | `https://diegosevilla.dev/` | Awwwards-nominated work-experiences timeline | horizontal scroll timeline · scroll-driven motion |
| Ultranoir | `https://ultranoir.com/` | Agency project vertical slideshow transitions | vertical project stack · transition discipline |
| Eliot Besson (via Awwwards) | Resolve live domain from Awwwards “Work Index Page / Modal” (Eliot Besson Portfolio 2025) | Work-index page + modal patterns | index density · modal/preview hand-off |
| Cynx Portfolio 2026 | Resolve live domain from Awwwards “Cynx ー Portfolio 2026” | Work overview + interactive scroll gallery | scroll gallery · work overview |
| Additional PL-T finds | Awwwards / CSS Design Awards / One Club / curated lists — search “portfolio timeline”, “work index”, “horizontal project rail”, “year archive” | Fill the 15 PL-T minimum | as observed |

When a seed’s live domain cannot be opened, mark **not verified**, do not fabricate observations, and replace it with another live timeline site so the PL-T minimum still holds.

**Per-site record (all 30+):** # / domain / URLs audited / access date / observation method (`live render`, `DOM/text extraction`, `screenshot`, `secondary source`) / category / page-type tag (`timeline`, `chronological-index`, `archive`, `horizontal-rail`, `listing+detail-hand-off`) / **timeline archetype** (vertical spine, year rail, horizontal rail, chaptered chronology, zig-zag, typographic date-lead, index-table, sticky preview, archive hover-preview, master/detail…) / typography system / image and media treatment / navigation and chrome / **each animation with trigger, approximate duration, easing, and whether it moves content or only decoration** / micro-interaction states (filters, preview swap, sticky rail, accordion notes) / colour and surface model + dark mode / performance and a11y observations / **transferable pattern** (what Nestlancer may borrow under §5/§7/§11) / **risk to not copy** (scroll-jacking, WebGL-only, forced audio, viewport-filling covers, missing keyboard path) / which listing template IDs (`PL##` only) it informs.

Rules: 30 distinct **external** domains; dead, paywalled or JS-walled entries capped at 10% and labelled; no fabricated sites; anything not opened is marked **not verified**. Never import the case-study or blog corpus's count, records or conclusions. Never count Nestlancer or this repo’s homepage samples toward the 30.

**Quality bar:** ≥15 PL-T timeline entries; ≥10 entries with a real timed animation observation; ≥6 with dark-mode or theme-switching observations; ≥12 entries whose primary audited page is a work **index or timeline**, not only a marketing home; ≥8 entries with an explicit preview / sticky / hover-preview behaviour useful for §7.1.

**2026 synthesis** — every claim cites corpus entries or a named external source:

- **Timeline archetype map** with counts and 3+ live domains each (vertical dated spine, year-chapter archive, horizontal project rail, sticky preview + list, archive hover-preview, typographic date-lead, index-table chronology, zig-zag, chaptered progress rail, dark editorial chronology).
- Listing-specific pattern counts: shared/hover preview vs card-only; how chronology is preserved; how filters affect ordering; how sticky rails behave on scroll.
- Motion patterns with observed duration ranges and triggers, including measured preview-crossfade / swap timings to check against §7.3's 200–260 ms rule.
- What is fading or too risky to copy (full scroll-jacking, WebGL-only timelines, forced audio, generic AI imagery as "work", animation on everything, masonry chaos without order) and the evidence.
- **Browser-support reality check.** Do not assert scroll-driven animation support from memory; state what you verified, and build every scroll-driven effect as **progressive enhancement** with an `IntersectionObserver`/class-toggle fallback.
- **Conflict list against §11's size contract.** External timelines often use full-bleed covers and huge type; for each conflict, state what is kept (rhythm, hierarchy, motion, restraint, surface) and what is refused (absolute scale, scroll-jacking).
- **Motion catalog** of 6–8 named signatures derived from the **external** corpus (not from homepage `D01`), with trigger, duration range, easing, animated properties (transform/opacity only), reduced-motion behaviour, no-JS behaviour, and permitted usage. It must name at least: the shared-preview **crossfade**, a **spine-fill** (or year-rail progress) signature, and an entrance **stagger-reveal**. Every listing template references at least one catalog signature by name.

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
- **Reduced motion:** `prefers-reduced-motion: reduce` must neutralise entrance animation, hover transitions, spine-fill, pinned scroll and the preview crossfade — immediate swap, no fade. All 13 canon samples already do this; the new pages must too.
- **No JS:** all eight projects, every `View case study` link and the static first-project preview (or per-card images) must be reachable; preview/selection controls must not render as operable when JS is absent.

### 7.3 Motion contract

- One primary signature per template from the Gate R motion catalog, with declared duration and easing; at most one pinned/sticky motion effect and one entrance stagger per page.
- Animate **transform and opacity only**. Never animate `top`/`height`/`width`/`margin` for scroll effects. No animation may move text under a pointer, delay reading, or block a control.
- Crossfade on the shared preview: **200–260 ms**, constant frame dimensions, selected image ends at full opacity. This number is a listing-lab constant on all 20 PL pages — directions differ around it, never by retiming it outside the range.
- Scroll-driven CSS (`animation-timeline: scroll()/view()`, `animation-range`, `animation-duration: auto`) — for spine-fill and sticky-preview effects — only as progressive enhancement with a verified non-supporting fallback (`IntersectionObserver`/class toggle), and only after recording what support you actually tested.
- No JS animation libraries, no CDN. Plain HTML/CSS/JS plus `IntersectionObserver`.

---

## 8. Component inventory and state matrix (listing components only)

Define once, reuse across all 20. Every component lists the states it must implement; a template may restyle a component but may not drop a state. Case-study-only components (before/after slider, annotated screenshot markers, outcome dashboard cards as a full case body, in-case chapter accordion as a reading page…) are **not** defined here and must not appear rebadged as listing components.

| Component | Required states |
|---|---|
| Button — primary / ghost / icon | default · hover · focus-visible · active · disabled · loading |
| Project card | default · hover · focus-within · **selected** (matches preview) · image-error — selection visible at 3:1, never colour-only |
| Timeline spine + node | ordinal/date marker · selected node · spine fill · keyboard-reachable nodes · reduced-motion = static complete spine |
| Shared preview frame | first-load · crossfading (200–260 ms) · settled · image-loading · image-error placeholder · no-JS static — constant dimensions in all states |
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

## 12. The 20 templates — direction assignments

Twenty materially distinct directions. **Layout parent** = a live external Gate R site (or archetype cluster) named in the concept card. **Brand chrome** = §3 `P01` (default) or a labelled rubric chrome exception (§3.2, ≤3). Homepage samples are never the layout parent.

### 12.1 `PL01–PL20` — portfolio listing

**Non-negotiable for all 20:** visible dated chronological spine (or equivalent year/rail chronology), all eight projects newest-first, medium thumbnails within §11 caps, image/control click selects into **one shared preview** with a 200–260 ms crossfade (§7), `View case study` a separate explicit link on every project. Layout inspiration must cite Gate R — not Nestlancer `/portfolio`, not homepage `D01`/`S01`.

| ID | Direction | Distinctness axis | Layout parent (external archetype — cite live domain in concept card) | Brand chrome |
|---|---|---|---|---|
| PL01 | Connected card timeline, right sticky preview | layout spine | vertical dated spine + sticky preview (PL-T / PL-C) | `P01` |
| PL02 | Ledger / date-rail timeline, left preview | preview placement | year/date rail archive (e.g. year-chapter sites like Olpinski-class) | `P01` |
| PL03 | Compact command-rail timeline, right preview | chrome | dense metadata rail + timeline (PL-T) | optional `H08` chrome exception |
| PL04 | Alternating zig-zag cards + shared preview | layout spine | zig-zag / alternating chronology (PL-T) | `P01` |
| PL05 | Ruled editorial timeline, native expandable notes, left preview | density | editorial ruled archive + notes (PL-A/PL-T) | `P01` |
| PL06 | Horizontal rail timeline, scroll-driven spine fill | navigation model | horizontal project rail (e.g. Aparelho-class / Diego Sevilla-class) — **no homepage D01 clone** | `P01` |
| PL07 | Sticky spine with `spine-fill` progress + right preview | motion signature | sticky vertical progress spine (PL-T) | `P01` |
| PL08 | Two-column asymmetric index (wide cards left, preview right) | hierarchy | asymmetric index + persistent preview (PL-C) | `P01` |
| PL09 | Stacked-card scroll reveal with pinned preview | motion signature | pinned/stacked scroll reveal from Gate R (not homepage D10 alone) | optional `D10` surface exception |
| PL10 | Typographic timeline — date + title lead, image secondary | media treatment | typographic date-lead chronology (PL-T) | `P01` (+ optional `H07` type only) |
| PL11 | Bento-modular timeline blocks, preview as fixed module | layout spine | bento chronology only if a Gate R site uses it | `P01` |
| PL12 | Ledger-print timeline with receipt-style rules, left preview | surface/theme emphasis | print/ledger chronology from Gate R | optional `M01` surface exception |
| PL13 | Terminal/log-style timeline, mono metadata | chrome | log/terminal chronology from Gate R | optional `M04` chrome exception |
| PL14 | Sticky media wall timeline with edge-mask transitions | media treatment | sticky media / edge-mask from Gate R (e.g. scroll-gallery class) | optional `S10` surface exception |
| PL15 | Filterable timeline: category chips, chronology preserved | navigation model | filterable chronological index (PL-A/PL-C) — chip mechanics may match `S02`, layout must not | `P01` |
| PL16 | Chaptered timeline with quarter markers + progress rail | hierarchy | chaptered horizontal/vertical timeline (e.g. Büro-class chapters — refuse WebGL/audio risks) | `P01` |
| PL17 | Dark editorial timeline, light preview frame | surface/theme emphasis | dark editorial chronology from Gate R + Nestlancer `--band` tokens | `P01` |
| PL18 | Master/detail split: index list + persistent preview | preview placement | archive list + persistent/hover preview (e.g. Aparelho `/archive`-class) | optional `S03` surface exception |
| PL19 | Index-table timeline: dense rows, thumbnail on select | density | dense index-table chronology (PL-T/PL-A) | `P01` |
| PL20 | Magazine-cover index with bounded covers + timeline sidebar | media treatment | cover-led index + timeline sidebar (PL-A/PL-T) within §11 caps | `P01` |

Gate 1 fails if any concept card’s layout parent is only a homepage sample ID (`D01`, `S01`, …) or Nestlancer `/portfolio`.

There are **no case-study (`PD`) directions and no blog directions in this prompt.** If you catch yourself designing a Harbor Ops narrative page, a before/after comparison, an annotated screenshot walkthrough, or a blog archive, stop — that is sibling-prompt work.

---

## 13. Gate 1 — concepts, mappings and the selection rubric

**20 concept cards**, each with:

- ID / name / family
- **Layout parent:** live external domain(s) from Gate R + timeline archetype + ≥3 concrete borrowed patterns (composition, not colour)
- **Brand chrome parent:** `P01` (default) or labelled rubric chrome exception; optional type reference (`H01`/`H07`) — never a timeline spine parent
- Both homepage rank values only as brand-context footnotes (user-preference /100 and rubric /45), not as proof the timeline is good
- ≥1 corpus reference with what is borrowed vs refused (risks)
- Desktop and phone composition · size bounds · §7.1 selection + crossfade spec · a11y plan · media plan · content risks · one-sentence distinctness claim
- Explicit statement: **not** derived from Nestlancer `/portfolio` layout or homepage `D01`/`S01` as layout parent

**Table 1 — parent mapping (20 rows):** `template_id | family (PL) | layout parent domain(s) | timeline archetype | brand chrome | chrome exception? | inherited external patterns | risks refused | corpus refs`.

**Table 2 — distinctness matrix (20 rows × axes):** `layout spine`, `preview placement`, `chrome`, `density`, `media treatment`, `hierarchy`, `navigation model`, `motion signature`, `surface/theme emphasis`. **Gate fails if two templates share both primary axis and motion signature.**

**Table 3 — motion coverage:** one row per catalog signature (from Gate R) with usage count, reduced-motion and no-JS behaviour. No signature may be primary on more than **3 of the 20**. The preview crossfade is a constant behaviour on PL pages, not a countable "primary signature".

**Selection rubric (define before building, apply at Gate 3)** so a reviewer can pick 1 of 20:

| Criterion | Weight |
|---|---|
| Work scanability — can a buyer grasp all 8 projects + the preview story fast | 25 |
| Timeline craft quality (clearly inspired by live external timelines, not a homepage-section clone) | 15 |
| Brand fit (tokens, FIG voice, `P01` chrome) without looking like Nestlancer’s current `/portfolio` | 10 |
| Preview-selection quality (keyboard, live region, latest-wins, frame stability) | 20 |
| Accessibility and keyboard quality | 15 |
| Motion quality and restraint (crossfade, spine, sticky discipline; no scroll-jacking) | 10 |
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

**Gate R — External timeline corpus.** ≥30 external domains with ≥15 PL-T chronological timelines; seed list opened or replaced; per-site records; archetype map; conflict list; 6–8-signature motion catalog derived from external sites. Fails if Nestlancer `/portfolio` or homepage samples are counted toward the 30, if PL-T < 15, on missing observation methods, or on an uncited synthesis.

**Gate 0 — Brand chrome + content lock.** `git status`; `python3 tools/audit-samples.py` still passes; read the 13 samples for chrome/tokens only; measure brand tokens into `docs/TOP10-CANON-SPEC-PORTFOLIO-LISTING.md`; extract Nestlancer content only + anti-parent note into `docs/PORTFOLIO-LISTING-DESIGN-ANALYSIS.md`.

**Gate 1 — Concepts.** 20 concept cards + three mapping tables + rubric definition (§13). Fails on duplicate axis+signature pairs, on any template whose layout parent is only a homepage sample or Nestlancer `/portfolio`, on missing Gate R layout-parent domain, on more than 3 chrome exceptions, or on any concept without the shared-preview interaction spec.

**Gate 2a — Pilot (1 page).** One PL template. Measure at all five widths and both themes, run `tool-3` contrast and the five anti-drift checks (§10), exercise the interactions end-to-end: select each of the 8 projects by pointer **and** keyboard, rapid-click race, broken image into the preview, filter to 1 and to 0 (if applicable), follow `View case study`, reduced motion, no-JS. Record results. Do not proceed until the pilot passes.

**Gate 2b — Full build.** All 20 pages plus gallery, manifest and checker. Keep manifests, concept cards, parent mappings, gallery labels and thumbnails synchronised. Preserve existing URLs; do not rebuild or alter the 21,600 homepage compositions or the original top-50 hand-offs; do not touch case-study or blog labs if they exist.

**Gate 3 — Verify and critique.**

- Run the repo's existing audit scripts unmodified (`python3 tools/audit-samples.py`, the `tools/ui-review-suite/` tools that apply) plus the new listing-lab audit (links, unique IDs, landmarks/headings, alt text, image dimensions, remote-URL scan, dead links, token-lint, identical-skin detector, **scope scan**, JS syntax, no-JS visibility, size caps, motion-signature presence, **external layout-parent presence**, corpus-reference presence, crossfade-duration check, **no-homepage-timeline-parent** check).
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
- **Do not** ship remote or expiring media URLs, broken local routes, `href="#"` destinations, external CDNs or font services.
- **Do not** introduce brand colours outside §5.1, radii/spacing outside §5.3, or differentiation limited to colour and border radius.
- **Do not** waive the size contract (§11) or the crossfade contract (§7.3) because a 2026 portfolio trend uses larger covers, slower reveals or scroll-jacking. Do not copy WebGL-only, forced-audio, or full scroll-jacking timelines from seeds like `18.burocratik.com` — borrow chapter/rail ideas only.

---

## 17. Completion checklist (listing — 20 templates)

- [ ] ≥30 distinct **external** domains audited; ≥15 are PL-T chronological timelines; Nestlancer + homepage samples not counted
- [ ] Seed list (Aparelho, Olpinski, 18.burocratik, Diego Sevilla, Ultranoir, …) opened or replaced with verified live alternatives
- [ ] 2026 synthesis with timeline archetype map, pattern counts, fading/risky patterns, browser-support reality check
- [ ] Conflict list between external timeline trends and the §11 size contract, with adaptations
- [ ] Motion catalog of 6–8 named signatures **from Gate R** (incl. crossfade + spine-fill) with timing, reduced-motion and no-JS behaviour
- [ ] `docs/TOP10-CANON-SPEC-PORTFOLIO-LISTING.md`: brand chrome/tokens measured (not used as timeline layout parent)
- [ ] Nestlancer `/portfolio` used for content freeze + anti-parent note only; taxonomy quirk recorded
- [ ] Fintech Payments Hub taxonomy inconsistency + case-study linking rule recorded in `portfolio-listing-lab/DECISIONS.md`
- [ ] Token, radius/spacing and brand-keep rules applied; token-lint passes on all 20
- [ ] Contrast measured in both themes on all 20; `--line` never used for meaningful boundaries (spine, selection, preview)
- [ ] Selection semantics implemented fully (keyboard, live region, latest-wins) on all 20; crossfade 200–260 ms, frame-stable
- [ ] Landmarks, single `h1`, skip link, focus management, 44/24 px targets, `type="button"` toggles
- [ ] No banned ARIA patterns; `prefers-reduced-motion` covers hover, spine-fill, pinned effects and the crossfade
- [ ] Listing component inventory implemented with every required state; empty/error states present
- [ ] Chrome checklist passes on all 20; no empty mobile drawer; no `href="#"` destinations; nav unchanged
- [ ] All 20 pages are dated chronological timelines with medium thumbnails and one shared preview; chronology survives filtering
- [ ] No template’s layout parent is homepage `D01`/`S01`/`S02` or Nestlancer `/portfolio`
- [ ] "Illustrative product concepts" caption intact; image policy honoured; placeholder art labelled
- [ ] Content stress fixtures (§9.2) run on all 20; truncation policy respected
- [ ] Asset plan honoured: deduplicated `portfolio-listing-lab/assets/`, explicit dimensions, LCP identified
- [ ] Performance budget met; five anti-drift checks pass (identical-skin, remote URL, dead link, token-lint, **scope scan**)
- [ ] Exactly 20 `PL` templates; **zero** `PD` / blog files created or modified; no `portfolio-lab/` / `portfolio-blog-lab/`
- [ ] Gallery: filters, 2–4-up comparison, contact sheet, QA status per card; live Nestlancer link is “content compare”, not “clone this UI”
- [ ] Every template resolves to an **external Gate R layout parent** + Nestlancer brand chrome, with visible inherited external patterns
- [ ] ≤3 templates use a rubric chrome exception; each labelled; one chrome family per page
- [ ] Size contract measured and satisfied at 5 widths × 2 themes
- [ ] Selection rubric applied; one recommended PL winner with rationale
- [ ] Findings classified blocker/major/minor; no blocker open
- [ ] `manifest.json`, `audit.json`, `DECISIONS.md` and gallery in sync with the real files
- [ ] Existing homepage lab intact; `tools/audit-samples.py` still passes; no commit/branch/push performed
