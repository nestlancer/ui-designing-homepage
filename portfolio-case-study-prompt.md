# Nestlancer Portfolio Case Study Page Lab — AI Agent Prompt (Case Study Only)

> **Use this prompt with the `nestlancer/ui-designing-homepage` repository open as the working directory.**
>
> **Split v2 (2026-10-22).** This file is one half of the split of `portfolio-prompt.md` (which itself was the portfolio half of `blog-portfolio-prompt.md` v4). It covers **portfolio case-study (detail) work only**: `PD01–PD20` = **20 templates**. The listing half lives in `portfolio-listing-prompt.md` and is **not** part of this task — do not read it as instructions, do not execute it, and do not create any listing (`PL`) artifact while running this prompt. Blog work (`blog-prompt.md`) is likewise out of scope.
>
> This prompt is **standalone**: everything you need (canon, tokens, accessibility, size, content and gate rules) is in this file. You do not need `portfolio-listing-prompt.md`, `portfolio-prompt.md`, or `blog-prompt.md` to complete it. Where a rule is duplicated identically in the listing prompt (tokens, canon table, brand keep-rules), that duplication is intentional — the two labs must stay one brand even though they are built separately. **Do not diverge from the shared values in §5 to "be different" from the listing lab.**
>
> **Do not push, commit, create or switch a branch.** Preserve the active branch, all existing homepage artifacts, the rank-list records and the current template URLs.

---

## 1. Role and outcome

Act as a senior product designer, UI/motion researcher, accessibility-minded frontend engineer, and critical design reviewer. Extend this repository into a **separate portfolio case-study page-template lab** without changing the homepage work, without touching any blog work, and without building listing/index pages.

Deliverables, in order:

1. `docs/RESEARCH-PORTFOLIO-CASE-STUDY-UI.md` — research corpus of **≥30 distinct, currently accessible** case-study / project-detail sites, audited for detail UI and animation, plus the 2026 synthesis (§4).
2. `docs/TOP10-CANON-SPEC-PORTFOLIO-CASE-STUDY.md` — the Top-10 canon audit through the case-study lens: each of the 10 compositions measured for type scale, container/measure width, spacing rhythm, chrome geometry, media treatment and motion, in light and dark (§3, §5).
3. `docs/PORTFOLIO-CASE-STUDY-DESIGN-ANALYSIS.md` — the 13-sample matrix for the canon, the live `/portfolio/b2b-portal-ux` audit, and verification findings (§6).
4. **20 responsive, navigable HTML templates** — portfolio case study (`PD01–PD20`) — in `portfolio-case-study-lab/`, plus one gallery, manifest and checker.

Every template must trace to **(a)** one of the ten canon compositions and **(b)** at least one corpus entry in `docs/RESEARCH-PORTFOLIO-CASE-STUDY-UI.md`. A shared palette alone is not derivation. 20 recolours is a failure — and 20 identical reading columns with different headers is the case-study version of that failure.

Reference production page (case study only):

| Route (on `app.nestlancer.com`) | Family | Legacy screenshot in this repo |
|---|---|---|
| `/portfolio/b2b-portal-ux` | `PD` case study | `Nestlancer-public-screenshots/public/008-portfolio-case-study.webp` |

Brand/locked-copy truth also used by this prompt: `Nestlancer-public-screenshots/public/013-marketing-homepage.webp` FIG 05 (illustrative caption language only) and `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md` (chrome, FIG voice and tokens). The eight work titles on the listing are **not** case-study content to invent — only the supplied Harbor Ops / B2B portal case study is presented (§9.1).

Do **not** audit or rebuild `/portfolio` or screenshot `007` as a listing build in this run — that is the listing prompt's job. You may record a working "back to portfolio" link under §9.1; you do not build the index.

---

## 2. Separation contract — case study only, all separate

This prompt exists so portfolio case-study work can be run **independently** of listing work and blog work (different session, different agent, different time). Keep the boundary absolute:

| | This prompt (case study) | Sibling (listing — NOT your task) | Sibling (blog — NOT your task) |
|---|---|---|---|
| Prompt file | `portfolio-case-study-prompt.md` (this file) | `portfolio-listing-prompt.md` | `blog-prompt.md` |
| Families | `PD01–PD20` case study | `PL01–PL20` listing | `BL01–BL20` · `BA01–BA20` |
| Template count | **20** | 20 (theirs) | 40 (theirs) |
| Lab folder | `portfolio-case-study-lab/` | `portfolio-listing-lab/` | `blog-lab/` |
| Research doc | `docs/RESEARCH-PORTFOLIO-CASE-STUDY-UI.md` (≥30 domains) | `docs/RESEARCH-PORTFOLIO-LISTING-UI.md` | `docs/RESEARCH-BLOG-UI.md` |
| Canon spec | `docs/TOP10-CANON-SPEC-PORTFOLIO-CASE-STUDY.md` | `docs/TOP10-CANON-SPEC-PORTFOLIO-LISTING.md` | `docs/TOP10-CANON-SPEC-BLOG.md` |
| Analysis doc | `docs/PORTFOLIO-CASE-STUDY-DESIGN-ANALYSIS.md` | `docs/PORTFOLIO-LISTING-DESIGN-ANALYSIS.md` | `docs/BLOG-DESIGN-ANALYSIS.md` |
| Decisions log | `portfolio-case-study-lab/DECISIONS.md` | `portfolio-listing-lab/DECISIONS.md` | `blog-lab/DECISIONS.md` |
| Live route audited | `/portfolio/b2b-portal-ux` | `/portfolio` | `/blog`, article route |
| Screenshot audited | `008` (+ `013` for brand/chrome only) | `007` | `002`, `003` |
| Preview port | `8128` | `8126` | `8127` |

Rules:

- **In scope:** the three docs above, everything under `portfolio-case-study-lab/`, and nothing else. Every file you create must be one of those paths.
- **Out of scope:** `portfolio-listing-lab/`, `portfolio-lab/` (legacy combined folder name — never create it), any `PL##` template, shared-preview selection system, chronological 8-project timeline index, filter chips over the eight projects, blog labs/docs, and any `BL`/`BA` work. If a case-study direction needs a contents rail or chapter accordion, spec it as a case-study component in §8 — do not import a listing-page design or a blog-article TOC design to get one.
- **No dependency on the listing run.** This prompt must be completable whether the listing lab exists, is half-built, or was never started. Never require a `PL##` file as a build dependency. Header/footer nav labels keep their existing production/repo destinations exactly as the canon chrome defines them.
- **If the listing lab already exists** when you run: treat `portfolio-listing-lab/` and its three docs as **read-only**. You may link "Back to portfolio" / "All work" into a paired `PL##` or the listing gallery under the §9.1 rule if that path exists; otherwise link to the live production route `/portfolio` (or a clearly labelled demo destination recorded in `DECISIONS.md`). Never edit, "fix", regenerate or reformat a listing file.
- **If the case-study lab already exists** from an earlier partial run of this same prompt: resume inside `portfolio-case-study-lab/` under the gate rules in §15; do not restart file numbering and do not create a second case-study folder.
- **Traceability:** section numbers deliberately mirror `portfolio-prompt.md` (§3 canon, §5 tokens, §11 sizes, §12 directions, §15 gates). Numbers from the combined portfolio prompt are re-scoped pro-rata for 20 templates — each change is stated where it occurs (research ≥60 → ≥30 case-study-focused; secondary-primary cap 6/40 → 3/20; motion-catalog cap 6/40 → 3/20; pilot 2 → 1).

---

## 3. The Top-10 canon (single derivation source)

This repo publishes **two different top-10 lists that do not agree**. Verified from the repo, not assumed:

| List | Source | Scale | Top-10 flavour |
|---|---|---|---|
| **User-preference rank** | `rank-list.html` (also `homepage-compositor/review/rank-list.html`), `data-userrank` / `data-userscore`, default sort `userrank` | /100 with persona sub-scores | `P01` solid header · `H01`/`H07` heroes · `D01`/`D03` delivery · `M05` · `W05` · `S01`/`S02` · `C01`/`C03` · `P01`/`P05` footers |
| **Rubric/compositor rank** | `homepage-compositor/review/summary.json`, `homepage-compositor/tools/review.mjs`, 9 aspects | /45 | `P04` pill header · `H08` glass command rail · `D03`/`D10` · `M04`/`M01`/`M05` · `W05` · `S03`/`S10` · `C04` · `P04` |

Only **4 of 20** combos appear in both lists. **Neither list may be described as a user study**; the preference scorer is a persona-weighted model, the rubric is reviewer judgement plus extracted CSS metrics.

### 3.1 Canonical top 10 (primary derivation set)

User-preference ranks 1–10, verified from `rank-list.html`:

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

**Only 13 distinct samples appear across these ten pages**: header `P01`; heroes `H01`, `H07`; delivery `D01`, `D03`; financial `M05`; why `W05`; work `S01`, `S02`; CTA `C01`, `C03`; footers `P01`, `P05`. That tight vocabulary is the point — it is what makes 20 case-study pages recognisably one brand. **These 13 files are this lab's visual grammar.** Read every one of them (markup, CSS, JS) before designing:

| ID | Source file | Case-study relevance |
|---|---|---|
| Header `P01` | `homepage-header/samples/P01-classic/index.html` | default chrome for all 20 (solid-bar grammar) |
| `H01` Ground Truth | `homepage-hero/samples/H01-ground-truth/index.html` | case-study opening / brief hierarchy |
| `H07` Money-first | `homepage-hero/samples/H07-money-first/index.html` | typographic hierarchy, metadata-first leads |
| `D01` Continuum Rail | `homepage-delivery/samples/D01-continuum-rail/index.html` | in-case engagement timeline / process spine |
| `D03` Bento Proof | `homepage-delivery/samples/D03-bento-proof/index.html` | modular proof / field blocks |
| `M05` Cashflow Staircase | `homepage-financial-clarity/samples/M05-cashflow-staircase/index.html` | ledger rhythm, stepped/ordinal cadence |
| `W05` Gate Logic | `homepage-why-nestlancer/samples/W05-gate-logic/index.html` | proof/outcome card logic |
| `S01` Case Grid | `homepage-selected-work/samples/S01-case-grid/index.html` | card geometry (applied to outcome/proof cards, not an index) |
| `S02` Filter Bar | `homepage-selected-work/samples/S02-filter-bar/index.html` | chip/metadata language (supporting) |
| `C01` Quiet Meridian | `homepage-closing-cta/samples/C01-quiet-meridian/index.html` | case-study closing CTA |
| `C03` Four-Point Orbit | `homepage-closing-cta/samples/C03-four-point-orbit/index.html` | alternate closing CTA |
| Footer `P01` | `homepage-footer/samples/P01-classic/index.html` | default footer |
| Footer `P05` | `homepage-footer/samples/P05-centered/index.html` | alternate footer |

For case-study work the load-bearing grammar is **`H01`/`H07` (openings), `D01`/`D03` (spine + modular blocks), `M05` (ledger rhythm), `W05` (outcome/proof), `C01`/`C03` (closings), `P01` chrome**. `S01`/`S02` contribute card/chip **geometry**, never an 8-project listing.

### 3.2 Secondary set (rubric top 10) — declared exceptions only

The rubric top 10 contributes a different vocabulary: `P04` pill/float header (`homepage-header/samples/P04-pill/`), `H08` glass command rail (`homepage-hero/samples/H08-command-rail/`), `D10` magnetic stack (`homepage-delivery/samples/D10-magnetic-stack/`), `M01` broadsheet (`homepage-financial-clarity/samples/M01-broadsheet-total/`), `M04` rails terminal (`homepage-financial-clarity/samples/M04-rails-terminal/`), `S03` split viewer (`homepage-selected-work/samples/S03-split-viewer/`), `S10` sticky showcase (`homepage-selected-work/samples/S10-sticky-showcase/`), `C04` editorial endnote (`homepage-closing-cta/samples/C04-editorial-endnote/`).

Rules (pro-rata from the combined portfolio prompt's 6/40):

- A template may use a rubric-top-10 sample as a **secondary** pattern source, and at most **3 of the 20** case-study templates may use one as their **primary** parent.
- Any such template must label the secondary parent in its gallery card and in `manifest.json`, and must explain why the direction needs it (glass chrome, sticky showcase, command metadata rail).
- Case-study directions that need it: `PD03`/`PD19` command metadata rail, `PD20` pinned long-form visual. Most other directions stay **canon-primary**; if you reach for `S10`/`H08` elsewhere, keep them secondary-source under the 3-primary cap.
- **Never mix more than one chrome family per page.** A page is either `P01` solid-bar grammar or `P04` floating-pill grammar, not both.

### 3.3 Canon measurement requirement

For each of the 10 canon pages and each of the 13 samples, record in `docs/TOP10-CANON-SPEC-PORTFOLIO-CASE-STUDY.md`: measured H1/H2/body sizes, container/measure width, section padding rhythm, header height, card radius and border, shadow, mono-eyebrow treatment, opening-image and gallery-slot geometry, motion inventory with durations, and light/dark token values actually used. Quote the file path as evidence. Where a value can only be reasoned from CSS because no browser engine was available, say so. This doc is the case-study lab's own measurement record — do not name it `TOP10-CANON-SPEC-PORTFOLIO.md` (that name belonged to the combined portfolio prompt and would collide with a listing run).

---

## 4. Gate R — the portfolio case-study research corpus (≥30 sites)

Write `docs/RESEARCH-PORTFOLIO-CASE-STUDY-UI.md`.

**Corpus composition — minimum 30 distinct domains** (tier minimums sum to 35, giving headroom for dead/paywalled exclusions). Case-study / project-detail evidence only — a work index may be opened only to understand how it hands off into the detail page, and must then be tagged accordingly; do not build a listing corpus here (that is the sibling prompt):

| Tier | Min | What counts |
|---|---|---|
| PD-A · Case-study detail pages | 15 | Studio, agency and individual portfolios with strong project-detail / case-study pages |
| PD-B · Award / trend case studies | 8 | 2026 award winners and trend roundups audited on case-study detail pages |
| PD-C · Depth references | 6 | Sites strong in long case-study UX: in-case navigation, gallery/media treatment, outcome/proof, before/after, sticky media, annotated screens |
| PD-D · Adjacent detail pages | 6 | Product companies' customer-story / work-detail pages with transferable reading structures |

**Per-site record (all 30+):** # / domain / URLs audited (detail primary; listing only if needed to understand the hand-off) / access date / observation method (`live render`, `DOM/text extraction`, `screenshot`, `secondary source`) / category / page-type tag (`detail`, `detail+listing-hand-off`) / reading structure (chapters, dossier, split-scroll, sticky gallery, timeline…) / typography system (measure, size, line-height) / image and media treatment (opening cover, gallery, sticky media, comparison) / navigation and chrome / **each animation with trigger, approximate duration, easing, and whether it moves content or only decoration** / micro-interaction states (accordion, slider, annotated markers, in-case nav) / colour and surface model + dark mode / case-study reading structure / performance and a11y observations / **transferable pattern** / **risk to not copy** / which case-study template IDs (`PD##` only) it informs.

Rules: 30 distinct **domains**; dead, paywalled or JS-walled entries capped at 10% and labelled; no fabricated sites; anything not opened is marked **not verified**. Never import the listing or blog corpus's count, records or conclusions. Together the two portfolio split prompts target ≥60 domains (30 listing + 30 case study).

**Quality bar:** ≥10 entries with a real timed animation observation; ≥6 with dark-mode or theme-switching observations; ≥15 entries auditing a case-study **detail** page end-to-end (not only an index).

**2026 synthesis** — every claim cites corpus entries or a named external source:

- Trend families with counts and 3+ example domains (editorial/serif revival in case studies, CSS scroll-driven animation, scroll progress / measure-progress, pinned chapters/sticky media, view transitions, grain/tactile surfaces, restrained "barely-there" UI, dark editorial modes).
- Case-study-specific pattern counts: how outcomes/proof are evidenced; how galleries and sticky media behave; how in-case navigation is structured.
- Motion patterns with observed duration ranges and triggers.
- What is fading (full scroll-jacking, generic AI imagery as "work", animation on everything, invented metrics) and the evidence.
- **Browser-support reality check.** Do not assert scroll-driven animation support from memory; state what you verified, and build every scroll-driven effect as **progressive enhancement** with an `IntersectionObserver`/class-toggle fallback.
- **Conflict list against §11's size contract.** 2026 portfolio work uses viewport-filling covers and headlines; this lab's caps are hard limits and are not waived by a trend. For each conflict, state what is kept and what is refused (absolute scale).
- **Motion catalog** of 6–8 named signatures with trigger, duration range, easing, animated properties (transform/opacity only), reduced-motion behaviour, no-JS behaviour, and permitted usage. It must name at least: a sticky-media signature, a **measure-progress** (or chapter-progress) signature, and an entrance **stagger-reveal**. Every case-study template references at least one catalog signature by name. Signature names are this lab's own; if the listing lab exists, do not rename yours to match or clash silently — record any shared name with identical meaning in `DECISIONS.md`.

---

## 5. Design-token specification (prescriptive — shared brand values, do not diverge)

Values below were extracted from the canon samples' own CSS. Use these tokens; do not invent new brand colours. Where a template needs an extra tone, derive it from these and record it in `docs/TOP10-CANON-SPEC-PORTFOLIO-CASE-STUDY.md`. **This section is intentionally identical in the listing prompt.** If you find a value here that contradicts the canon CSS, the canon CSS wins — record the correction in your canon spec and `DECISIONS.md`; do not silently fork the palette.

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

**Rule:** `--line` is a decorative hairline. Any border that conveys meaning — timeline spine and node, gallery-frame boundary, input boundary, focus ring, table structure, selected in-case nav item — must reach **3:1** against its neighbour; use `--teal`, `--teal-soft` over `--bg`, `--ink-2` or a dedicated `--line-strong` you add and document.

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
| z-index scale | base 0 · sticky chrome 10 · sticky media / side gallery 20 · drawer/menu 40 · status toast 60 — nothing above 60 |
| Container | 1160 px max (1200 px only where a canon sample already uses it, recorded per template) |

### 5.4 Brand keep-rules

These are documented must-keeps for the homepage lab and carry into this lab:

- The **mono FIG eyebrow** on every major block (`FIG · Case study`, `FIG · Timeline`, `FIG · Outcomes` and equivalents).
- **Hairline borders** and soft shadow on card/window surfaces; radius from §5.3 only.
- **Product-window chrome** (three dots, mono title, chip) where a UI mock is shown.
- Locked copy and illustrative disclaimers stay intact. Where gallery/product imagery from the supplied case study is shown, keep honesty about illustrative/demo status where the production page does.
- Real logo assets from `assets/` (`logo-full-dark.svg`, `logo-full-light.svg`, `logo-mark-dark.svg`, `logo-mark-light.svg`) — never redrawn, stretched or recoloured.
- Restrained navy/teal/mint palette; no new brand hues.

### 5.5 Dark-mode craft rules

No pure black (`#000`) surfaces; keep the `--bg`/`--surface`/`--surface-2` three-step ramp. Hairlines must stay visible without becoming borders. Do not invert accent relationships — `--teal` stays the accent and `--teal-hover` stays darker/lighter in the same direction as the token table. Case-study images get a slight luminance treatment (no white flash at load) and never a hard white frame. **Long-form dark reading needs its own check:** verify prose `--body` on the actual reading surface and muted metadata at case-study length, in both themes — a card-level pass is not a reading-level pass. The ratios above are the floor, not the ceiling.

---

## 6. Gate 0 — repository baseline (case-study sources only)

1. `git status`; never overwrite uncommitted changes.
2. Baseline the existing lab: `python3 tools/audit-samples.py` must still pass on its current file set before you touch anything.
3. Read the 13 canon samples in full (markup, CSS, JS — paths in §3.1), plus relevant FIG rows of `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md` (chrome, FIG voice).
4. Re-open the **one** live portfolio case-study route (`/portfolio/b2b-portal-ux`) at desktop and mobile where possible, and inspect the legacy screenshot `008-portfolio-case-study.webp`; label each observation `live render` / `DOM extract` / `screenshot` / `source`. Do not audit the listing route or screenshot `007` as a listing build in this run.
5. Extract and freeze the case-study content truth before designing: the full supplied Harbor Ops / B2B portal sections (`Overview`, `What we shipped`, `Outcomes`, metadata, gallery, stack, closing CTA) and the real client (**Harbor Ops**). Quote the source for every field; anything you cannot verify is marked **not verified**, never invented. If the full case-study text cannot be extracted and verified, stop at Gate 0 and report exactly what is missing rather than writing a substitute case study.
6. Do not invent case studies for the other seven listing projects. This lab presents **one** supplied case study in 20 directions.
7. Write the 13-sample matrix, the 10-row canon matrix and the one-page case-study audit into `docs/PORTFOLIO-CASE-STUDY-DESIGN-ANALYSIS.md`.

---

## 7. Accessibility and interaction contract

### 7.1 Reading semantics — in-case nav, galleries, disclosures (all 20 PD pages) ⭐ core case-study contract

- **In-case navigation** (where a PD direction uses one) is a `nav` with an `aria-label`; the active item gets `aria-current="true"`; it must never scroll the page on its own and must never move focus away from the user. Every nav link targets a real heading `id` in the supplied case study. Heading order is the supplied order — never re-levelled for looks.
- **Measure / chapter progress** (where used, e.g. `PD20`) uses `role="progressbar"` placed **outside** any list, with `aria-valuenow` updated, or is purely decorative with `aria-hidden="true"` — pick one, never both meanings.
- **Galleries** are keyboard-reachable if interactive; every image has descriptive `alt`; fixed aspect per slot; error placeholder on broken src.
- **Before/after (`PD15`)** is a keyboard-operable slider (`role="slider"` or native `input[type=range]`), labelled as a **demo control**, with both images described, and reduced-motion safe. Disclose demo status in-page.
- **Annotated markers (`PD16`)** have real text alternatives and a list fallback that works without hover.
- **Disclosures (`PD17`)** prefer native `details`/`summary`; content inside them is the supplied case study reorganised, not new answers.
- **Metadata** uses definition-list semantics (`dl`) for client/sector/stack/date facts — no invented fields.

### 7.2 Structure and focus

- Exactly one `h1`; no skipped heading levels; landmarks `header / nav / main / aside / footer`; every `nav` gets an `aria-label`; a working skip link to `main` (a second skip target to the case body is welcome but not a substitute).
- No `aria-label` on role-less `div`s (use `role="group"` or a real element). No contradictory ARIA. Every toggle is `<button type="button">`.
- **Focus management:** accordion/disclosure changes, gallery interactions, slider changes and view-transition-style changes must not lose or trap focus.
- **Target size (WCAG 2.2):** 44×44 px preferred for primary controls, 24×24 px absolute minimum (SC 2.5.8). Gallery controls, slider thumbs and annotated markers are targets too. The homepage lab shipped 22 px footer links — do not repeat that.
- **Contrast (WCAG 2.2 AA):** 4.5:1 normal text, 3:1 text ≥18.66 px bold or ≥24 px, 3:1 for UI component boundaries and meaningful graphical objects (SC 1.4.11), 3:1 for the focus indicator (SC 2.4.13). Run `tools/ui-review-suite/tool-3-color-contrast-seams.mjs` against every template in both themes and record the ratios. Re-check long-form prose on the reading surface in dark mode.
- **Reduced motion:** `prefers-reduced-motion: reduce` must neutralise entrance animation, hover transitions, pinned scroll, spine-fill and measure-progress animation — immediate state, no fade. All 13 canon samples already do this; the new pages must too.
- **No JS:** the full case-study content, gallery images (as static stack), metadata and closing CTA must be reachable and readable; interactive controls must not render as operable when JS is absent (progressive disclosure: stacked panels and full text are the no-JS truth).

### 7.3 Motion contract

- One primary signature per template from the Gate R motion catalog, with declared duration and easing; at most one pinned/sticky motion effect and one entrance stagger per page.
- Animate **transform and opacity only**. Never animate `top`/`height`/`width`/`margin` for scroll effects. No animation may move text under a pointer, delay reading, or block a control.
- Scroll-driven CSS only as progressive enhancement with a verified non-supporting fallback (`IntersectionObserver`/class toggle), and only after recording what support you actually tested.
- No JS animation libraries, no CDN. Plain HTML/CSS/JS plus `IntersectionObserver`.

---

## 8. Component inventory and state matrix (case-study components only)

Define once, reuse across all 20. Every component lists the states it must implement; a template may restyle a component but may not drop a state. Listing-only components (shared preview frame, 8-project timeline selection radios, category filter chips over the index…) are **not** defined here and must not appear rebadged as case-study components.

| Component | Required states |
|---|---|
| Button — primary / ghost / icon | default · hover · focus-visible · active · disabled · loading |
| Metadata rail / brief panel | definition-list semantics (`dl`) for client/sector/stack/date facts · no invented fields |
| Case-study image gallery | fixed aspect per slot · caption · `alt` text · error placeholder · keyboard-reachable if interactive |
| Before/after comparison (`PD15`) | keyboard-operable slider · labelled as a demo control · both images described · reduced-motion safe |
| Accordion / disclosure (`PD17`) | native `details`/`summary` preferred; expanded/collapsed; focus visible |
| Outcome / proof cards (`PD14`) | supplied bullets only · identical card component across PD pages that use it |
| Annotated screenshot marker (`PD16`) | numbered markers with real text alternatives · list fallback that works without hover |
| In-case nav / contents | `aria-current="true"` on active · real heading targets · never auto-scrolls the page |
| Timeline spine + node (in-case phases, `PD11`) | ordinal/date marker · spine fill · keyboard-reachable nodes · reduced-motion = static complete spine |
| Image frame | fixed aspect, `object-fit: contain/cover` declared, `alt` text, error placeholder |
| Error state | what failed, why, what the user can do; never a silently empty gallery slot |
| Loading state | honest local states only; never simulate a network call |
| Theme toggle | `<button type="button">`, `aria-pressed`, persisted via `localStorage`, visible at all widths |

**Chrome checklist per template:** all seven nav links (**Product · Portfolio · Blog · About · Pricing · Services · Contact** — locked from `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`) present at mobile widths; the mobile drawer is **not empty** and carries Sign in + Start a project; the theme toggle works and persists; both CTAs reachable; no `href="#"` used as a destination — every control is a button or a real link; `Portfolio` is marked current (`aria-current="page"`) or the case study is marked within the portfolio section consistently. Nav destinations keep their existing routes — in particular do **not** invent listing-lab URLs that this run does not build, except under the §9.1 linking rule when the sibling lab already exists.

---

## 9. Content, data and assets (case-study data only)

### 9.1 Data plan

- **Case study (`PD`):** only the supplied sections (`Overview`, `What we shipped`, `Outcomes`, metadata, gallery, stack, closing CTA) and the real client (**Harbor Ops**) from `/portfolio/b2b-portal-ux`. All 20 PD templates present this **same** case study — directions change the presentation, never the facts. Pull quotes, dashboard figures and checklist items come from the supplied copy only.
- Do **not** invent case studies, clients, outcomes, budgets or dates for the other seven listing projects.
- **Back-link rule:** state the exact rule once in `portfolio-case-study-lab/DECISIONS.md`. Preferred order: (1) if `portfolio-listing-lab/` already has a paired `PL##` or gallery, link "Back to portfolio" / "All work" there; (2) otherwise link to the live production route `/portfolio`; (3) also keep a link to this lab's own gallery. Never link to `#`.
- Never hard-code signed or expiring S3 URLs from a live extract.
- **No listing index and no blog data** in this lab: no 8-project chronological timeline as the page purpose, no shared-preview selection system, no article titles, no "from the blog" modules. Closing blocks use the canon closing CTA (`C01`/`C03`).

### 9.2 Stress fixtures (run on every template)

| Fixture | Purpose |
|---|---|
| Longest supplied heading and longest outcome bullet | wrapping, no clipping |
| Shortest supplied metadata field vs longest stack-tag row | rail overflow |
| Missing image (broken src) in opening slot **and** a gallery slot | error placeholder, frame stability, no layout shift |
| Accordion all-collapsed and all-expanded (`PD17`) | focus, no content loss |
| Before/after at 0%, 50%, 100% (`PD15`) | keyboard + reduced motion |
| Annotated markers with hover unavailable (`PD16`) | list fallback readable |
| Print stylesheet: first page and long body | no clipped headings, sensible page breaks |

**Truncation policy:** prefer wrapping. If a clamp is unavoidable, use `-webkit-line-clamp` with an ellipsis **and** the full text available via a visually-hidden span or `title`. Never clamp a case-study H1 to one line. Never silently abridge supplied body copy.

### 9.3 Asset plan

- One deduplicated local media set under `portfolio-case-study-lab/assets/` with hashed, descriptive filenames, referenced by every template. Seed from the repo's existing local work imagery for the B2B portal (and any Gate 0–verified case-study gallery assets); record the source of every image in `DECISIONS.md`.
- Format WebP (AVIF where it helps), with explicit `width`/`height` and `aspect-ratio` to prevent CLS. Non-LCP images `loading="lazy"`; the LCP image (case-study opening image) never lazy-loaded.
- **Image policy:** use supplied repo imagery or clearly marked original placeholder artwork. If any generated placeholder art is used, label it as such in the gallery card and in `DECISIONS.md`. No hotlinking, no remote or expiring URLs.
- Alt text: descriptive for case images ("B2B client portal dashboard concept", not "image"), `alt=""` for decorative chrome.

---

## 10. Performance and scale budget

| Budget | Limit |
|---|---|
| Total page weight (HTML + CSS + JS + referenced images) | ≤ 700 KB per template, ≤ 250 KB excluding images |
| Image payload per page | ≤ 350 KB (lazy-load gallery slots below the fold — never ship every gallery image eagerly at full size) |
| Animation | transform/opacity only; no scroll handler that does layout work; compositor-only where possible |
| LCP | identified per template, not lazy-loaded, not blocked by a JS animation init |
| INP | no main-thread work competing with tap/keypress |
| CLS | zero from images (explicit dimensions) |
| Dependencies | none. No CDN, no font service, no runtime library |

**Anti-drift checks (must be scripted in the lab checker, §14):**

1. **Identical-skin detector** — compare computed type scales, container widths, radius sets and colour sets across the 20; fail when two templates are visually near-identical.
2. **Remote-URL scan** — fail on any `http(s)://` asset, font or script reference (production listing route links in `href` for the §9.1 rule are allowed and must be labelled in `DECISIONS.md`).
3. **Dead-link scan** — fail on any local route that does not resolve and on any `href="#"` used as a destination.
4. **Token-lint** — fail on brand colours outside §5.1 and on radius/spacing values outside §5.3.
5. **Scope scan (split-specific)** — fail if any file under `portfolio-case-study-lab/` references `portfolio-listing-lab/` as a **required** build path without the §9.1 optional link rule, references `blog-lab/`, a `BL##`/`BA##`/`PL##` path as an owned artifact, or `portfolio-lab/` / `portfolio-blog-lab/`; fail if any doc created by this run sits outside the three §2 paths.

---

## 11. Controlled-size contract (all 20 case-study templates)

| Element | Desktop / tablet | Phone |
|---|---|---|
| Main content container | ~1080–1160 px; **max 1160 px** | Full width, 16–24 px gutters |
| Page H1 | 40–52 px; **max 56 px** | 30–34 px; **max 36 px** |
| Section H2 / card title | H2 24–32 px; card titles 18–24 px | H2 22–28 px; card titles 18–22 px |
| Prose / metadata | Body 16–18 px, metadata ≥12 px; measure 60–72 ch, max 720 px | Body ≥16 px narrative; metadata ≥12 px |
| Case-study opening image | **max 720 × 320 px**; no viewport-filling cover | **max 220 px high** |
| Case-study gallery images | bounded by the opening-image cap per slot; fixed aspect | within width, **max 220 px high** per slot |
| Spacing / targets | Section padding 24–48 px; gaps 16–32 px; header 64–76 px | Section padding 20–32 px; 44 px targets |

**Full-bleed clarification:** a full-bleed *background* plane (as `hero-H09` does at 1440 px) is permitted, but the **content container inside it stays ≤1160 px** and the H1/media caps still apply. Record any full-bleed usage in the concept card. No 80–124 px headlines, no 500–600 px-tall covers, no giant decorative ordinals, no empty opening screens. Record **measured** sizes at 360, 390, 768, 1024 and 1440 px in both themes.

---

## 12. The 20 templates — direction assignments

Twenty materially distinct directions. `canon` = primary parent must come from §3.1; `secondary allowed` = a rubric-top-10 sample may be the declared secondary (or primary, within the 3-of-20 cap in §3.2).

### 12.1 `PD01–PD20` — portfolio case study

**Non-negotiable for all 20:** the same supplied Harbor Ops / B2B portal case study (§9.1), opening image within §11 caps, metadata as real facts only, closing CTA from the canon family, and a working link back under the §9.1 back-link rule (at minimum this lab's gallery + production `/portfolio` or a paired listing template if it already exists).

| ID | Direction | Distinctness axis | Parent guidance |
|---|---|---|---|
| PD01 | Compact Ground Truth narrative + contents | chrome | canon (H01) |
| PD02 | Bounded ledger opening (no full-bleed image) | media treatment | canon (M05) |
| PD03 | Project brief with command-style metadata rail | hierarchy | secondary allowed (H08) |
| PD04 | Restrained reading chapters with field/window treatments | layout spine | canon |
| PD05 | Editorial dossier with marginal notes | layout spine | canon |
| PD06 | Sticky side gallery, text column scrolls | preview placement | canon |
| PD07 | Technical field notes (mono metadata, code preserved) | density | canon |
| PD08 | Problem → approach → outcome ledger | hierarchy | canon |
| PD09 | Split-scroll parallel narrative | layout spine | canon (H09 split language, full-bleed rule applies) |
| PD10 | Print-inspired report with rules, folio numbers, captions | surface/theme emphasis | canon |
| PD11 | In-case timeline of the supplied engagement phases | motion signature | canon (D01) |
| PD12 | Decision/QA log with checklist affordances | density | canon |
| PD13 | Interview-style narrative, pull quotes from supplied copy only | hierarchy | canon |
| PD14 | Outcome dashboard — supplied bullets as bounded cards | media treatment | canon |
| PD15 | Before/after comparison with sticky media (labelled demo control) | interaction model | canon |
| PD16 | Annotated screenshot walkthrough of the supplied gallery image | media treatment | canon |
| PD17 | Chapter accordion, single-scroll reading | navigation model | canon |
| PD18 | Dark editorial case study, light content surface | surface/theme emphasis | canon |
| PD19 | Command-center layout: metadata rail left, narrative right | chrome | secondary allowed (H08) |
| PD20 | Long-form scroll narrative, one pinned visual, `measure-progress` | motion signature | secondary allowed (S10) |

There are **no listing (`PL`) directions and no blog directions in this prompt.** If you catch yourself designing an 8-project chronological index, a shared-preview selection system, or a blog article archive, stop — that is sibling-prompt work.

---

## 13. Gate 1 — concepts, mappings and the selection rubric

**20 concept cards**, each with: ID/name/family · primary canon parent `combo_id` + source path + **both** rank values (user-preference /100 and rubric /45) with their scales named · ≥3 concrete inherited patterns · ≥1 corpus reference (from `docs/RESEARCH-PORTFOLIO-CASE-STUDY-UI.md`) with what is borrowed · secondary source where used · desktop and phone composition · size bounds · interaction spec with named motion signature(s) · accessibility plan (in-case nav, focus, reduced motion, no-JS, demo-control disclosure where needed) · media plan · content risks · one-sentence distinctness claim.

**Table 1 — parent mapping (20 rows):** `template_id | family (PD) | canon parent | parent path | user rank | rubric rank | inherited patterns | corpus refs | secondary parent`.

**Table 2 — distinctness matrix (20 rows × axes):** `layout spine`, `preview placement`, `chrome`, `density`, `media treatment`, `hierarchy`, `navigation model`, `motion signature`, `surface/theme emphasis`, `interaction model`. **Gate fails if two templates share both primary axis and motion signature.**

**Table 3 — motion coverage:** one row per catalog signature with usage count, reduced-motion and no-JS behaviour. No signature may be primary on more than **3 of the 20** (pro-rata from 6/40).

**Selection rubric (define before building, apply at Gate 3)** so a reviewer can pick 1 of 20:

| Criterion | Weight |
|---|---|
| Case-study narrative clarity — can a buyer follow problem → work → outcome | 25 |
| Brand fit to the canon (tokens, FIG voice, chrome, opening hierarchy) | 15 |
| Media and proof quality (gallery, outcomes, sticky discipline within size caps) | 15 |
| Accessibility and keyboard quality (in-case nav, disclosures, demo controls) | 15 |
| Motion quality and restraint | 10 |
| Distinctiveness within the family | 10 |
| Responsive behaviour at 360 and 1440 | 5 |
| Build feasibility for production handoff | 5 |

Record a score sheet and one recommendation (**one PD winner**) with rationale. Optionally note which listing direction from the sibling prompt would pair best once that lab exists — do not build it.

---

## 14. Output layout

```text
portfolio-case-study-lab/
  index.html                     # gallery: all 20, filterable
  assets/                        # deduplicated local case-study media only (§9.3)
  shared/                        # tokens.css + base.css only (see below)
  portfolio-detail/PD01-…/index.html … PD20-…/index.html
  manifest.json                  # 20 records: id, family, canon parent, ranks, corpus refs, motion, verification
  audit.json                     # machine-readable audit results per template
  DECISIONS.md                   # back-link rule, demo-control disclosures, image policy, exceptions
  tools/check-portfolio-case-study-lab.*  # the lab checker (§10 anti-drift + Gate 3 audits)
```

- Plus the three docs (§2): `docs/RESEARCH-PORTFOLIO-CASE-STUDY-UI.md`, `docs/TOP10-CANON-SPEC-PORTFOLIO-CASE-STUDY.md`, `docs/PORTFOLIO-CASE-STUDY-DESIGN-ANALYSIS.md`. **Nothing else.**
- `shared/` may hold **only** tokens, resets and primitives. Each template carries its own layout skin. Never import from a sibling listing or blog `shared/` folder.
- Every template renders standalone over relative paths from the repo root, links to the case-study gallery, and has next/previous variant navigation within the PD family.
- Add one shared `@media print` block (case studies get printed/exported by clients).
- Preview: `python3 -m http.server 8128` from the repo root → `/portfolio-case-study-lab/` (8124 = homepage lab hub, 8125 = compositor, 8126 = listing lab, 8127 = blog lab if built).

**Gallery requirements (20 items must be reviewable):** filter by canon parent, motion signature, verification status; **side-by-side comparison of 2–4 templates**; a contact-sheet mode; per card show canon parent, corpus references, motion signature and QA status; a "compare against the live page" link to `/portfolio/b2b-portal-ux`, following the precedent of `homepage-compositor/review/live-nestlancer-preview.html`.

**Verification status per template** must be one of `machine-audited`, `browser-verified`, `not verified` — do not upgrade a status you did not earn.

---

## 15. Work sequence and gates

**Gate R — Research corpus.** ≥30 case-study-focused domains, per-site records, 2026 synthesis, conflict list, 6–8-signature motion catalog. Fails under 30 domains, on missing observation methods, on listing-only sites counted without a detail page, or on an uncited synthesis.

**Gate 0 — Canon and baseline.** `git status`; `python3 tools/audit-samples.py` still passes; read the 13 canon samples; measure the 10 canon pages; re-open `/portfolio/b2b-portal-ux`; freeze the Harbor Ops case-study content truth; write `docs/TOP10-CANON-SPEC-PORTFOLIO-CASE-STUDY.md` and the matrices in `docs/PORTFOLIO-CASE-STUDY-DESIGN-ANALYSIS.md`.

**Gate 1 — Concepts.** 20 concept cards + three mapping tables + rubric definition (§13). Fails on duplicate axis+signature pairs, on any template without a canon parent and a case-study-corpus reference, on more than 3 secondary-primary variants, or on invented case-study facts.

**Gate 2a — Pilot (1 page).** One PD template. Measure at all five widths and both themes, run `tool-3` contrast and the five anti-drift checks (§10), exercise the interactions end-to-end: in-case nav (if present), gallery, accordion/before-after/annotated controls as applicable, back-link, reduced motion, no-JS, print. Record results. Do not proceed until the pilot passes.

**Gate 2b — Full build.** All 20 pages plus gallery, manifest and checker. Keep manifests, concept cards, parent mappings, gallery labels and thumbnails synchronised. Preserve existing URLs; do not rebuild or alter the 21,600 homepage compositions or the original top-50 hand-offs; do not touch listing or blog labs if they exist.

**Gate 3 — Verify and critique.**

- Run the repo's existing audit scripts unmodified (`python3 tools/audit-samples.py`, the `tools/ui-review-suite/` tools that apply) plus the new case-study-lab audit (links, unique IDs, landmarks/headings, alt text, image dimensions, remote-URL scan, dead links, token-lint, identical-skin detector, **scope scan**, JS syntax, no-JS visibility, size caps, motion-signature presence, canon-parent resolution, corpus-reference presence, supplied-copy integrity).
- Exercise every interaction across all 20 PD pages: gallery/accordion/before-after/annotated-walkthrough controls, in-case nav, responsive menus and themes. Verify reduced motion and no-JS.
- Inspect rendered pages at 360/390/768/1024/1440 in both themes **if a browser is available**. If not, say so explicitly and do not claim screenshot QA or measured overflow checks.
- Record measured H1 sizes, container widths and opening/gallery image dimensions at all five widths and both themes. Reject oversize states, not just horizontal overflow.
- Apply the selection rubric, score the family, and recommend **one PD winner** with rationale.
- Classify every finding: **blocker** · **major** · **minor**. No blocker may remain open at hand-off.
- Write findings into `docs/PORTFOLIO-CASE-STUDY-DESIGN-ANALYSIS.md`, and log design calls in `portfolio-case-study-lab/DECISIONS.md`.
- Finish by reporting file paths, the local run command (`python3 -m http.server 8128`), verification results and limitations. State explicitly that no listing (`PL`) and no blog artifact was created or modified.

---

## 16. Hard constraints

- **Do not** push, commit, create/switch/rename a branch.
- **Do not** modify or delete existing homepage sample folders, locked copy, rank-list records, screenshots or compositor generator outputs.
- **Do not** do listing or blog work: no `PL`/`BL`/`BA` templates, no `portfolio-listing-lab/`, no `blog-lab/`, no listing or blog research/analysis/canon docs, no 8-project shared-preview index. Do not create the combined `portfolio-lab/` or `portfolio-blog-lab/` folders.
- **Do not** present the user-preference score or the rubric score as a user study, conversion proof, or independent verification of a case-study result.
- **Do not** invent testimonials, outcomes, client identities (beyond the supplied Harbor Ops), project dates/durations/budgets, or case studies beyond the one supplied.
- **Do not** drop honesty about illustrative/demo status for imagery and demo controls (e.g. `PD15`).
- **Do not** present a research corpus you did not open; unopened entries are marked not verified. Do not borrow the listing or blog corpus's entries or count.
- **Do not** ship production-looking controls that cannot work in a static demo without disclosing their demo status.
- **Do not** ship remote or expiring media URLs, broken local routes, `href="#"` destinations, external CDNs or font services.
- **Do not** introduce brand colours outside §5.1, radii/spacing outside §5.3, or differentiation limited to colour and border radius.
- **Do not** waive the size contract (§11) because a 2026 portfolio trend uses larger covers or scroll-jacking.

---

## 17. Completion checklist (case study — 20 templates)

- [ ] ≥30 distinct case-study-focused domains audited with per-site records and observation methods; ≥15 detail-page audits
- [ ] 2026 synthesis with cited evidence, trend + case-study-pattern counts, fading patterns, browser-support reality check
- [ ] Conflict list between 2026 portfolio trends and the §11 size contract, with adaptations
- [ ] Motion catalog of 6–8 named signatures (incl. sticky-media + measure-progress) with timing, reduced-motion and no-JS behaviour
- [ ] `docs/TOP10-CANON-SPEC-PORTFOLIO-CASE-STUDY.md`: 10 canon pages and 13 samples measured, with file-path evidence
- [ ] Two rank lists quoted with their scales; no rubric/model score called a user study
- [ ] Live `/portfolio/b2b-portal-ux` audited and compared with screenshot `008`; content truth frozen with sources
- [ ] Back-link rule + demo-control disclosures recorded in `portfolio-case-study-lab/DECISIONS.md`
- [ ] Token, radius/spacing and brand-keep rules applied; token-lint passes on all 20
- [ ] Contrast measured in both themes on all 20, including long-form reading surfaces in dark
- [ ] In-case nav, galleries, disclosures and demo controls meet §7; reduced motion and no-JS covered
- [ ] Landmarks, single `h1`, skip link, focus management, 44/24 px targets, `type="button"` toggles
- [ ] Case-study component inventory implemented with every required state; error states present
- [ ] Chrome checklist passes on all 20; no empty mobile drawer; no `href="#"` destinations; nav unchanged
- [ ] All 20 pages present the same supplied Harbor Ops case study; no invented facts, quotes or metrics
- [ ] Image policy honoured; placeholder art labelled; print stylesheet present
- [ ] Content stress fixtures (§9.2) run on all 20; truncation policy respected
- [ ] Asset plan honoured: deduplicated `portfolio-case-study-lab/assets/`, explicit dimensions, LCP identified
- [ ] Performance budget met; five anti-drift checks pass (identical-skin, remote URL, dead link, token-lint, **scope scan**)
- [ ] Exactly 20 `PD` templates; **zero** `PL` / blog files created or modified; no `portfolio-lab/` / `portfolio-blog-lab/`
- [ ] Gallery: filters, 2–4-up comparison, contact sheet, QA status per card, live-page comparison
- [ ] Every template resolves to a canon parent **and** a case-study-corpus reference, with visible inherited patterns
- [ ] ≤3 templates use a rubric-top-10 sample as primary; each labelled; one chrome family per page
- [ ] Size contract measured and satisfied at 5 widths × 2 themes
- [ ] Selection rubric applied; one recommended PD winner with rationale
- [ ] Findings classified blocker/major/minor; no blocker open
- [ ] `manifest.json`, `audit.json`, `DECISIONS.md` and gallery in sync with the real files
- [ ] Existing homepage lab intact; `tools/audit-samples.py` still passes; no commit/branch/push performed
