# Nestlancer Portfolio Page Lab — AI Agent Prompt (Portfolio Only)

> **Use this prompt with the `nestlancer/ui-designing-homepage` repository open as the working directory.**
>
> **Split v1 (2026-10-22).** This file is one half of the split of `blog-portfolio-prompt.md` (v4 content). It covers **portfolio work only**: portfolio listing (`PL01–PL20`) + portfolio case study (`PD01–PD20`) = **40 templates**. The blog half lives in `blog-prompt.md` and is **not** part of this task — do not read it as instructions, do not execute it, and do not create any blog artifact while running this prompt.
>
> This prompt is **standalone**: everything you need (canon, tokens, accessibility, size, content and gate rules) is in this file. You do not need `blog-prompt.md` or `blog-portfolio-prompt.md` to complete it. Where a rule is duplicated identically in the blog prompt (tokens, canon table, brand keep-rules), that duplication is intentional — the two labs must stay one brand even though they are built separately. **Do not diverge from the shared values in §5 to "be different" from the blog lab.**
>
> **Do not push, commit, create or switch a branch.** Preserve the active branch, all existing homepage artifacts, the rank-list records and the current template URLs.

---

## 1. Role and outcome

Act as a senior product designer, UI/motion researcher, accessibility-minded frontend engineer, and critical design reviewer. Extend this repository into a **separate portfolio page-template lab** without changing the homepage work and without touching any blog work.

Deliverables, in order:

1. `docs/RESEARCH-PORTFOLIO-UI.md` — research corpus of **≥60 distinct, currently accessible** portfolio / case-study sites, audited for UI design and animation, plus the 2026 synthesis (§4).
2. `docs/TOP10-CANON-SPEC-PORTFOLIO.md` — the Top-10 canon audit through the portfolio lens: each of the 10 compositions measured for type scale, container width, spacing rhythm, chrome geometry, card/preview treatment and motion, in light and dark (§3, §5).
3. `docs/PORTFOLIO-DESIGN-ANALYSIS.md` — the 13-sample matrix for the canon, the two live production-page audits, and verification findings (§6).
4. **40 responsive, navigable HTML templates** — 20 portfolio listing (`PL`) + 20 portfolio case study (`PD`) — in `portfolio-lab/`, plus one gallery, manifest and checker.

Every template must trace to **(a)** one of the ten canon compositions and **(b)** at least one corpus entry in `docs/RESEARCH-PORTFOLIO-UI.md`. A shared palette alone is not derivation. 40 recolours is a failure.

Reference production pages (portfolio only):

| Route (on `app.nestlancer.com`) | Family | Legacy screenshot in this repo |
|---|---|---|
| `/portfolio` | `PL` listing | `Nestlancer-public-screenshots/public/007-portfolio-listing.webp` |
| `/portfolio/b2b-portal-ux` | `PD` case study | `Nestlancer-public-screenshots/public/008-portfolio-case-study.webp` |

Brand/locked-copy truth also used by this prompt: `Nestlancer-public-screenshots/public/013-marketing-homepage.webp` FIG 05 (the eight work titles + illustrative caption) and `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`.

---

## 2. Separation contract — portfolio only, all separate

This prompt exists so portfolio work can be run **independently** of blog work (different session, different agent, different time). Keep the boundary absolute:

| | This prompt (portfolio) | Sibling prompt (blog — NOT your task) |
|---|---|---|
| Prompt file | `portfolio-prompt.md` (this file) | `blog-prompt.md` |
| Families | `PL01–PL20` listing · `PD01–PD20` case study | `BL01–BL20` listing · `BA01–BA20` article |
| Template count | **40** | 40 (theirs, not yours) |
| Lab folder | `portfolio-lab/` | `blog-lab/` |
| Research doc | `docs/RESEARCH-PORTFOLIO-UI.md` (≥60 domains) | `docs/RESEARCH-BLOG-UI.md` |
| Canon spec | `docs/TOP10-CANON-SPEC-PORTFOLIO.md` | `docs/TOP10-CANON-SPEC-BLOG.md` |
| Analysis doc | `docs/PORTFOLIO-DESIGN-ANALYSIS.md` | `docs/BLOG-DESIGN-ANALYSIS.md` |
| Decisions log | `portfolio-lab/DECISIONS.md` | `blog-lab/DECISIONS.md` |
| Live routes audited | `/portfolio`, `/portfolio/b2b-portal-ux` | `/blog`, `/blog/cutting-deploy-time-from-45-minutes-to-five` |
| Screenshots audited | `007`, `008` (+ `013` FIG 05 for locked titles) | `002`, `003` |
| Preview port | `8126` | `8127` |

Rules:

- **In scope:** the three docs above, everything under `portfolio-lab/`, and nothing else. Every file you create must be one of those paths.
- **Out of scope:** `blog-lab/`, `docs/RESEARCH-BLOG-UI.md`, `docs/TOP10-CANON-SPEC-BLOG.md`, `docs/BLOG-DESIGN-ANALYSIS.md`, the old combined `portfolio-blog-lab/` folder name (never create it), and any `BL`/`BA` template, blog listing pattern, article body, TOC/reading-progress/code-block feature, blog search, or blog placeholder data. If a portfolio case study needs a contents rail, spec it as a case-study component in §8 — do not import a blog-article design to get one.
- **No dependency on the blog run.** This prompt must be completable whether the blog lab exists, is half-built, or was never started. Never link a portfolio template to a blog template as a required route; header/footer nav labels (including "Blog") keep their existing production/repo destinations exactly as the canon chrome defines them.
- **If the blog lab already exists** when you run: treat `blog-lab/` and the three blog docs as **read-only**. You may read `docs/TOP10-CANON-SPEC-BLOG.md` only to cross-check that your measured token/type values do not contradict it; if they disagree, §5 of this file and the canon sample CSS win, and you record the discrepancy in `portfolio-lab/DECISIONS.md`. Never edit, "fix", regenerate or reformat a blog file.
- **If the portfolio lab already exists** from an earlier partial run of this same prompt: resume inside `portfolio-lab/` under the gate rules in §15; do not restart file numbering and do not create a second portfolio folder.
- **Combined-prompt traceability:** section numbers below deliberately mirror `blog-portfolio-prompt.md` (§3 canon, §5 tokens, §11 sizes, §12 directions, §15 gates) so a reviewer can diff the split against the original. Numbers from the combined prompt are re-scoped pro-rata for 40 templates — each change is stated where it occurs (research ≥100 → ≥60 portfolio-only; secondary-primary cap 12/80 → 6/40; motion-catalog cap 12/80 → 6/40; pilot 4 → 2).

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

**Only 13 distinct samples appear across these ten pages**: header `P01`; heroes `H01`, `H07`; delivery `D01`, `D03`; financial `M05`; why `W05`; work `S01`, `S02`; CTA `C01`, `C03`; footers `P01`, `P05`. That tight vocabulary is the point — it is what makes 40 portfolio pages recognisably one brand. **These 13 files are this lab's visual grammar.** Read every one of them (markup, CSS, JS) before designing:

| ID | Source file | Portfolio relevance |
|---|---|---|
| Header `P01` | `homepage-header/samples/P01-classic/index.html` | default chrome for all 40 (solid-bar grammar) |
| `H01` Ground Truth | `homepage-hero/samples/H01-ground-truth/index.html` | case-study opening / brief hierarchy |
| `H07` Money-first | `homepage-hero/samples/H07-money-first/index.html` | typographic hierarchy, metadata-first leads |
| `D01` Continuum Rail | `homepage-delivery/samples/D01-continuum-rail/index.html` | the chronological timeline-spine parent |
| `D03` Bento Proof | `homepage-delivery/samples/D03-bento-proof/index.html` | bento-modular work blocks |
| `M05` Cashflow Staircase | `homepage-financial-clarity/samples/M05-cashflow-staircase/index.html` | ledger rhythm, stepped/ordinal cadence |
| `W05` Gate Logic | `homepage-why-nestlancer/samples/W05-gate-logic/index.html` | proof/outcome card logic |
| `S01` Case Grid | `homepage-selected-work/samples/S01-case-grid/index.html` | primary project-card language |
| `S02` Filter Bar | `homepage-selected-work/samples/S02-filter-bar/index.html` | filter chips + work-grid language |
| `C01` Quiet Meridian | `homepage-closing-cta/samples/C01-quiet-meridian/index.html` | case-study closing CTA |
| `C03` Four-Point Orbit | `homepage-closing-cta/samples/C03-four-point-orbit/index.html` | alternate closing CTA |
| Footer `P01` | `homepage-footer/samples/P01-classic/index.html` | default footer |
| Footer `P05` | `homepage-footer/samples/P05-centered/index.html` | alternate footer |

For portfolio work the load-bearing grammar is **`S01`/`S02` (cards + filters), `D01`/`D03` (spine + bento), `M05` (ledger rhythm), `H01`/`H07` (openings), `P01` chrome, `C01`/`C03` closings**. `W05` is supporting grammar (outcome/proof treatment inside case studies), not a page-layout parent.

### 3.2 Secondary set (rubric top 10) — declared exceptions only

The rubric top 10 contributes a different vocabulary: `P04` pill/float header (`homepage-header/samples/P04-pill/`), `H08` glass command rail (`homepage-hero/samples/H08-command-rail/`), `D10` magnetic stack (`homepage-delivery/samples/D10-magnetic-stack/`), `M01` broadsheet (`homepage-financial-clarity/samples/M01-broadsheet-total/`), `M04` rails terminal (`homepage-financial-clarity/samples/M04-rails-terminal/`), `S03` split viewer (`homepage-selected-work/samples/S03-split-viewer/`), `S10` sticky showcase (`homepage-selected-work/samples/S10-sticky-showcase/`), `C04` editorial endnote (`homepage-closing-cta/samples/C04-editorial-endnote/`).

Rules (pro-rata from the combined prompt's 12/80):

- A template may use a rubric-top-10 sample as a **secondary** pattern source, and at most **6 of the 40** portfolio templates may use one as their **primary** parent.
- Any such template must label the secondary parent in its gallery card and in `manifest.json`, and must explain why the direction needs it (glass chrome, terminal ledger, split master/detail, sticky showcase).
- Portfolio directions that need it: `PL03` command rail, `PL09` stacked-card/pinned preview, `PL13` terminal-log timeline, `PL14` sticky media wall, `PL18` master/detail split, `PD03`/`PD19` command metadata rail, `PD20` pinned long-form visual. Count carefully — that list is longer than the 6-primary cap, so most of them must stay **secondary-source** with a canon primary parent.
- **Never mix more than one chrome family per page.** A page is either `P01` solid-bar grammar or `P04` floating-pill grammar, not both.

### 3.3 Canon measurement requirement

For each of the 10 canon pages and each of the 13 samples, record in `docs/TOP10-CANON-SPEC-PORTFOLIO.md`: measured H1/H2/body sizes, container width, section padding rhythm, header height, card radius and border, shadow, mono-eyebrow treatment, work-card/preview-frame geometry, motion inventory with durations, and light/dark token values actually used. Quote the file path as evidence. Where a value can only be reasoned from CSS because no browser engine was available, say so. This doc is the portfolio lab's own measurement record — do not name it `TOP10-CANON-SPEC.md` (that unsuffixed name belonged to the combined prompt and would collide with the blog run).

---

## 4. Gate R — the portfolio research corpus (≥60 sites)

Write `docs/RESEARCH-PORTFOLIO-UI.md`.

**Corpus composition — minimum 60 distinct domains** (tier minimums sum to 65, giving headroom for dead/paywalled exclusions). Portfolio/case-study evidence only — a blog or magazine site counts **only** if the audited pages are its work index / case-study pages, and it must then sit in tier P-D with that stated:

| Tier | Min | What counts |
|---|---|---|
| P-A · Portfolio & case study | 30 | Studio, agency and individual portfolios with a work index **and** case-study detail pages |
| P-B · Award / trend references | 15 | 2026 award winners and trend roundups (Awwwards, Web Design Awards, WebAward, curated lists), audited on portfolio pages |
| P-C · Case-study depth references | 10 | Sites strong in long case-study UX: in-case navigation, gallery/media treatment, outcome/proof presentation, before/after, sticky media |
| P-D · Adjacent work indexes | 10 | Product companies' work/customer-story indexes and detail pages with transferable listing/detail patterns |

**Per-site record (all 60+):** # / domain / URLs audited (listing **and** detail where both exist) / access date / observation method (`live render`, `DOM/text extraction`, `screenshot`, `secondary source`) / category / page-type tag (`listing`, `detail`, `both`) / index archetype (grid, list, timeline, bento, index-table, master/detail…) / typography system / image and media treatment (thumbnail vs preview behaviour, hover/click preview, gallery) / navigation and chrome / **each animation with trigger, approximate duration, easing, and whether it moves content or only decoration** / micro-interaction states (filters, preview swap, accordion, comparison control) / colour and surface model + dark mode / case-study reading structure / performance and a11y observations / **transferable pattern** / **risk to not copy** / which portfolio template IDs (`PL##`/`PD##` only) it informs.

Rules: 60 distinct **domains**; dead, paywalled or JS-walled entries capped at 10% and labelled; no fabricated sites; anything not opened is marked **not verified**. A domain that also appears in the blog corpus (if it exists) still counts here only if **you** opened its portfolio pages for this corpus — never import the blog corpus's count, records or conclusions. Together the two split prompts target ≥120 domains (60 portfolio + 60 blog), exceeding the combined prompt's 100; each half must stand alone.

**Quality bar:** ≥18 entries with a real timed animation observation; ≥12 with dark-mode or theme-switching observations; ≥15 entries auditing a case-study **detail** page, not only an index.

**2026 synthesis** — every claim cites corpus entries or a named external source:

- Trend families with counts and 3+ example domains (editorial/serif revival in case studies, kinetic and variable type on indexes, CSS scroll-driven animation, scroll progress, bento-modular work feeds, pinned chapters/sticky previews, view transitions, grain/tactile surfaces, restrained "barely-there" UI, dark editorial modes).
- Portfolio-specific pattern counts: how many indexes offer a shared/hover preview vs card-only navigation; how many preserve chronology; how filters affect ordering; how outcomes/proof are evidenced.
- Motion patterns with observed duration ranges and triggers, including measured preview-crossfade timings to check against §7.3's 200–260 ms rule.
- What is fading (full scroll-jacking, generic AI imagery as "work", animation on everything, masonry chaos without order) and the evidence.
- **Browser-support reality check.** Public 2026 sources contradict each other on scroll-driven animation support across engines. Do not assert support from memory; state what you verified, and build every scroll-driven effect as **progressive enhancement** with an `IntersectionObserver`/class-toggle fallback.
- **Conflict list against §11's size contract.** 2026 portfolio work uses viewport-filling covers and headlines; this lab's caps are hard limits and are not waived by a trend. For each conflict, state what is kept (rhythm, hierarchy, motion, restraint, surface) and what is refused (absolute scale).
- **Motion catalog** of 8–10 named signatures with trigger, duration range, easing, animated properties (transform/opacity only), reduced-motion behaviour, no-JS behaviour, and permitted usage. It must name at least: the shared-preview **crossfade**, a **spine-fill** timeline signature, an entrance **stagger-reveal**, and a sticky-media signature. Every portfolio template references at least one catalog signature by name. Signature names are this lab's own; if the blog lab exists, do not rename yours to match or clash silently — record any shared name with identical meaning in `DECISIONS.md`.

---

## 5. Design-token specification (prescriptive — shared brand values, do not diverge)

Values below were extracted from the canon samples' own CSS. Use these tokens; do not invent new brand colours. Where a template needs an extra tone, derive it from these and record it in `docs/TOP10-CANON-SPEC-PORTFOLIO.md`. **This section is intentionally identical in the blog prompt.** If you find a value here that contradicts the canon CSS, the canon CSS wins — record the correction in your canon spec and `DECISIONS.md`; do not silently fork the palette.

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

- The **mono FIG eyebrow** on every major block (`FIG · Work`, `FIG · Timeline`, `FIG · Case study` and equivalents).
- **Hairline borders** and soft shadow on card/window surfaces; radius from §5.3 only.
- **Product-window chrome** (three dots, mono title, chip) where a UI mock is shown — the natural frame for the shared portfolio preview.
- Locked copy and the "illustrative / not a live checkout" disclaimers stay intact wherever homepage content appears. For work imagery specifically, keep **"Illustrative product concepts — not customer screenshots."** visible and near the cards wherever FIG 05 content is reused (see §9.1).
- Real logo assets from `assets/` (`logo-full-dark.svg`, `logo-full-light.svg`, `logo-mark-dark.svg`, `logo-mark-light.svg`) — never redrawn, stretched or recoloured.
- Restrained navy/teal/mint palette; no new brand hues.

### 5.5 Dark-mode craft rules

No pure black (`#000`) surfaces; keep the `--bg`/`--surface`/`--surface-2` three-step ramp. Hairlines must stay visible without becoming borders. Do not invert accent relationships — `--teal` stays the accent and `--teal-hover` stays darker/lighter in the same direction as the token table. Project images get a slight luminance treatment (no white flash at load) and never a hard white frame; the shared preview frame must read as the same frame in both themes. Re-measure contrast in dark; the ratios above are the floor, not the ceiling.

---

## 6. Gate 0 — repository baseline (portfolio sources only)

1. `git status`; never overwrite uncommitted changes.
2. Baseline the existing lab: `python3 tools/audit-samples.py` must still pass on its current file set before you touch anything.
3. Read the 13 canon samples in full (markup, CSS, JS — paths in §3.1), plus `docs/homepage-section-prompts/05-selected-work.md` and the FIG 05 rows of `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md` (the locked eight titles and illustrative caption).
4. Re-open the **two** live portfolio routes (`/portfolio`, `/portfolio/b2b-portal-ux`) at desktop and mobile where possible, and inspect the legacy screenshots `007-portfolio-listing.webp` and `008-portfolio-case-study.webp`; label each observation `live render` / `DOM extract` / `screenshot` / `source`. Do not audit the blog routes or screenshots `002`/`003` in this run.
5. Extract and freeze the portfolio content truth before designing: the 8 projects in verified newest-first order with their categories, summaries, stack tags, dates and images (§9.1), and the full supplied case-study content for `b2b-portal-ux`. Quote the source (live extract vs screenshot) for every field; anything you cannot verify is marked **not verified**, never invented.
6. Carry the known portfolio data inconsistency forward rather than copying it silently: the portfolio listing labels **Fintech Payments Hub** as `E-Commerce`, contradicting its title/description. Record it; treat any correction as a documented taxonomy decision in `portfolio-lab/DECISIONS.md`, not a claim about a production fix. (The blog article view/comment inconsistency belongs to the blog prompt — do not log or "fix" it here.)
7. Write the 13-sample matrix, the 10-row canon matrix and the two-page portfolio audit into `docs/PORTFOLIO-DESIGN-ANALYSIS.md`.

---

## 7. Accessibility and interaction contract

### 7.1 Selection semantics — the shared preview (all 20 PL pages) ⭐ core portfolio contract

Every PL page has one behaviour: selecting a project (by its image/control) loads it into **one shared preview** with a crossfade, while `View case study` remains a separate explicit link. Pick **one** selection pattern and implement it fully and identically on all 20 PL pages — record the choice in `portfolio-lab/DECISIONS.md`:

- **Recommended:** an ordered list of projects where each item's preview control is `role="radio"` inside `role="radiogroup"` (or a native radio input visually styled), with `aria-checked`, roving tabindex, Arrow Up/Down/Left/Right to move, Home/End to jump, Space/Enter to select, and an `aria-live="polite"` status region announcing the selected project.
- Alternative: `role="tablist"` with `role="tab"`/`aria-selected` + `role="tabpanel"`, if the preview reads as a panel.
- `aria-pressed` alone on a list of buttons is acceptable only if arrow-key navigation and a live region are also implemented.
- **Never** rely on click alone: every project must be selectable from the keyboard, and `View case study` must be reachable **without** selecting the project first. A whole card must never be one fake link that swallows the select control.
- **Latest-selection-wins:** rapid successive selections must resolve to the last selected project (no stale image winning a load race). The preview frame's dimensions never change during swap (no layout shift), the incoming image ends at full opacity, and a failed image load shows the §8 error placeholder inside the same frame.
- Filtering (`PL15` and any chip filter) preserves chronology, keeps focus on the filter control, announces the result count in the live region, and defines what happens to the selection when the selected project is filtered out (state the rule in `DECISIONS.md` and implement it everywhere).

### 7.2 Structure and focus

- Exactly one `h1`; no skipped heading levels; landmarks `header / nav / main / aside / footer`; every `nav` gets an `aria-label`; a working skip link to `main`.
- No `aria-label` on role-less `div`s (use `role="group"` or a real element). No contradictory ARIA (`aria-hidden` + `aria-label` on the same element). Every toggle is `<button type="button">`.
- **Focus management:** filtering, crossfade swaps, accordion/disclosure changes and view-transition-style changes must not lose or trap focus. After a filter changes, focus stays on the control and the live region announces the result count. Case-study in-page navigation (where a PD direction uses one) marks the active item `aria-current="true"` and must never scroll the page on its own.
- **Target size (WCAG 2.2):** 44×44 px preferred for primary controls, 24×24 px absolute minimum (SC 2.5.8), with spacing so adjacent targets cannot be hit together. Timeline nodes and thumbnail select controls are targets too. The homepage lab shipped 22 px footer links — do not repeat that.
- **Contrast (WCAG 2.2 AA):** 4.5:1 normal text, 3:1 text ≥18.66 px bold or ≥24 px, 3:1 for UI component boundaries and meaningful graphical objects (SC 1.4.11 — selected state, timeline spine/node, preview boundary), 3:1 for the focus indicator (SC 2.4.13). Run `tools/ui-review-suite/tool-3-color-contrast-seams.mjs` against every template in both themes and record the ratios.
- **Reduced motion:** `prefers-reduced-motion: reduce` must neutralise entrance animation, hover transitions, spine-fill, pinned scroll and the preview crossfade — immediate swap, no fade. All 13 canon samples already do this; the new pages must too.
- **No JS:** all eight projects, every `View case study` link and the full case-study content must be reachable; preview/selection controls must not render as operable when JS is absent (the static first-project preview or per-card images carry the content).

### 7.3 Motion contract

- One primary signature per template from the Gate R motion catalog, with declared duration and easing; at most one pinned/sticky motion effect and one entrance stagger per page.
- Animate **transform and opacity only**. Never animate `top`/`height`/`width`/`margin` for scroll effects. No animation may move text under a pointer, delay reading, or block a control.
- Crossfade on the shared preview: **200–260 ms**, constant frame dimensions, selected image ends at full opacity. This number is a portfolio-lab constant on all 20 PL pages — directions differ around it, never by retiming it outside the range.
- Scroll-driven CSS (`animation-timeline: scroll()/view()`, `animation-range`, `animation-duration: auto`) — for spine-fill and sticky-preview effects — only as progressive enhancement with a verified non-supporting fallback (`IntersectionObserver`/class toggle), and only after recording what support you actually tested.
- No JS animation libraries, no CDN. Plain HTML/CSS/JS plus `IntersectionObserver`.

---

## 8. Component inventory and state matrix (portfolio components only)

Define once, reuse across all 40. Every component lists the states it must implement; a template may restyle a component but may not drop a state. Blog components (article card, TOC, reading progress, code block, related-post cards…) are **not** defined here and must not appear rebadged as portfolio components.

| Component | Required states |
|---|---|
| Button — primary / ghost / icon | default · hover · focus-visible · active · disabled · loading |
| Project card | default · hover · focus-within · **selected** (matches preview) · image-error — selection visible at 3:1, never colour-only |
| Timeline spine + node | ordinal/date marker · selected node · spine fill · keyboard-reachable nodes · reduced-motion = static complete spine |
| Shared preview frame | first-load · crossfading (200–260 ms) · settled · image-loading · image-error placeholder · no-JS static — constant dimensions in all states |
| Chip / tag / filter pill (category, stack) | default · hover · focus-visible · selected (`aria-pressed`/`aria-checked`) · disabled · non-interactive stack tags must not look clickable |
| Case-study image gallery | fixed aspect per slot · caption · `alt` text · error placeholder · keyboard-reachable if interactive |
| Before/after comparison (`PD15`) | keyboard-operable slider (`role="slider"` or native `input[type=range]`) · labelled as a demo control · both images described · reduced-motion safe |
| Accordion / disclosure (`PD17`, `PL05` notes) | native `details`/`summary` preferred; expanded/collapsed; focus visible |
| Metadata rail / brief panel | definition-list semantics (`dl`) for client/sector/stack/date facts · no invented fields |
| Outcome / proof cards (`PD14`) | supplied bullets only · identical card component across PD pages that use it |
| Annotated screenshot marker (`PD16`) | numbered markers with real text alternatives · list fallback that works without hover |
| Image frame | fixed aspect, `object-fit: contain/cover` declared, `alt` text, error placeholder |
| Empty state (filter → zero projects) | illustration-free or simple inline SVG, one line of copy, one recovery action (clear filter) |
| Error state | what failed, why, what the user can do; never a silently empty preview |
| Loading state | honest local states only; never simulate a network call |
| Theme toggle | `<button type="button">`, `aria-pressed`, persisted via `localStorage`, visible at all widths |

**Chrome checklist per template:** all seven nav links (**Product · Portfolio · Blog · About · Pricing · Services · Contact** — locked from `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`) present at mobile widths; the mobile drawer is **not empty** and carries Sign in + Start a project; the theme toggle works and persists; both CTAs reachable; no `href="#"` used as a destination — every control is a button or a real link; `Portfolio` is marked current (`aria-current="page"`) on PL pages. Nav destinations keep their existing routes — in particular the `Blog` label must **not** be relinked into a blog-lab template that this run does not build.

---

## 9. Content, data and assets (portfolio data only)

### 9.1 Data plan

- **Portfolio index:** the 8 real projects in verified newest-first order, all dated Oct 2026. Do not invent durations, extra dates, clients, budgets or outcomes. The locked titles (FIG 05, `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`; verify order/category/summary/stack against the live `/portfolio` extract at Gate 0 and record any difference):
  1. B2B Client Portal UX 2. Fitness Tracking App 3. Marketplace Redesign 4. Brand Identity System 5. Fintech Payments Hub 6. SaaS Analytics Platform 7. E-Commerce Mobile App 8. HealthTech Dashboard.
- Keep the caption **"Illustrative product concepts — not customer screenshots."** visible and near the cards/preview wherever these eight concepts are shown as the FIG 05 set. Do not fabricate client logos, endorsements or case-study metrics for the seven projects that have no supplied case study.
- **Case study (`PD`):** only the supplied sections (`Overview`, `What we shipped`, `Outcomes`, metadata, gallery, stack, closing CTA) and the real client (**Harbor Ops**) from `/portfolio/b2b-portal-ux`. All 20 PD templates present this **same** case study — directions change the presentation, never the facts. Pull quotes, dashboard figures and checklist items come from the supplied copy only. For the other seven projects, `View case study` links from PL pages resolve inside the lab as follows: the B2B portal links to the paired PD template; the remaining seven link to the same PD template **only if** the page clearly carries the demo disclosure that one full case study is supplied (state the exact linking rule once in `DECISIONS.md` — never invent seven fake case studies, never link to `#`).
- The taxonomy correction (Fintech Payments Hub labelled `E-Commerce`) goes in `portfolio-lab/DECISIONS.md` with the listing value, the corrected value if you apply one, and where each appears. Never hard-code signed or expiring S3 URLs from a live extract.
- **No blog data anywhere in this lab:** no article titles (real or placeholder), no read times, authors, view/comment counts, categories-as-blog-taxonomy, or "from the blog" modules. Cross-promotion modules, if a direction needs a closing block, use the canon closing CTA (`C01`/`C03`) instead.

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

- One deduplicated local media set under `portfolio-lab/assets/` with hashed, descriptive filenames, referenced by every template — not 40 copies of 8 project images. Seed it from the repo's existing local work imagery (`homepage-compositor/review/shared/assets/work/01-b2b-client-portal.jpg` … `08-healthtech-dashboard.jpg`) unless Gate 0 verifies better supplied originals; record the source of every image in `DECISIONS.md`.
- Format WebP (AVIF where it helps), with explicit `width`/`height` and `aspect-ratio` to prevent CLS. Non-LCP images `loading="lazy"`; the LCP image (shared preview's first project / case-study opening image) never lazy-loaded. Preload only what the selection interaction needs to keep the crossfade honest — record the strategy.
- **Image policy:** use supplied repo imagery or clearly marked original placeholder artwork. If any generated placeholder art is used, label it as such in the gallery card and in `DECISIONS.md` — the corpus research itself flags generic AI imagery passed off as work as a fading pattern. No hotlinking, no remote or expiring URLs.
- Alt text: descriptive for project/case images ("B2B client portal dashboard concept", not "image"), `alt=""` for decorative chrome. Blog cover art is not part of this asset set — do not generate or store article covers here.

---

## 10. Performance and scale budget

| Budget | Limit |
|---|---|
| Total page weight (HTML + CSS + JS + referenced images) | ≤ 700 KB per template, ≤ 250 KB excluding images |
| Image payload per page | ≤ 350 KB (the shared-preview model exists to make this easy — never ship all 8 full-size images eagerly on a PL page) |
| Animation | transform/opacity only; no scroll handler that does layout work; compositor-only where possible |
| LCP | identified per template, not lazy-loaded, not blocked by a JS animation init |
| INP | no main-thread work competing with tap/keypress; selection responds before the crossfade completes |
| CLS | zero from images (explicit dimensions) and zero from the preview swap |
| Dependencies | none. No CDN, no font service, no runtime library |

**Anti-drift checks (must be scripted in the lab checker, §14):**

1. **Identical-skin detector** — compare computed type scales, container widths, radius sets and colour sets across the 40; fail when two templates in the same family are visually near-identical. This is the check that actually prevents 40 recolours.
2. **Remote-URL scan** — fail on any `http(s)://` asset, font or script reference.
3. **Dead-link scan** — fail on any local route that does not resolve (including a `View case study` link with no PD target) and on any `href="#"` used as a destination.
4. **Token-lint** — fail on brand colours outside §5.1 and on radius/spacing values outside §5.3.
5. **Scope scan (split-specific)** — fail if any file under `portfolio-lab/` references `blog-lab/`, a `BL##`/`BA##` path, or `portfolio-blog-lab/`; fail if any doc created by this run sits outside the three §2 paths.

---

## 11. Controlled-size contract (all 40 portfolio templates)

| Element | Desktop / tablet | Phone |
|---|---|---|
| Main content container | ~1080–1160 px; **max 1160 px** | Full width, 16–24 px gutters |
| Page H1 | 40–52 px; **max 56 px** | 30–34 px; **max 36 px** |
| Section H2 / card title | H2 24–32 px; card titles 18–24 px | H2 22–28 px; card titles 18–22 px |
| Prose / metadata | Body 16–18 px, metadata ≥12 px; measure 60–72 ch, max 720 px | Body ≥16 px narrative; compact card text ≥14 px; metadata ≥12 px |
| Portfolio timeline thumbnail | 128–240 × 80–150 px; **max 280 × 176 px** | 128–240 px wide, never wider than its card; **max 280 × 176 px** |
| Shared portfolio preview | **max 480 × 300 px**, stable frame, `object-fit: contain` | Within card width; **max 200 px high** |
| Case-study opening image | **max 720 × 320 px**; no viewport-filling cover | **max 220 px high** |
| Case-study gallery images | bounded by the opening-image cap per slot; fixed aspect | within width, **max 220 px high** per slot |
| Spacing / targets | Section padding 24–48 px; gaps 16–32 px; header 64–76 px | Section padding 20–32 px; 44 px targets |

**Full-bleed clarification:** a full-bleed *background* plane (as `hero-H09` does at 1440 px) is permitted, but the **content container inside it stays ≤1160 px** and the H1/media caps still apply. Record any full-bleed usage in the concept card. No 80–124 px headlines, no 500–600 px-tall project covers, no giant decorative ordinals, no empty opening screens. Record **measured** sizes at 360, 390, 768, 1024 and 1440 px in both themes.

---

## 12. The 40 templates — direction assignments

Twenty materially distinct directions per family. `canon` = primary parent must come from §3.1; `secondary allowed` = a rubric-top-10 sample may be the declared secondary (or primary, within the 6-of-40 cap in §3.2).

### 12.1 `PL01–PL20` — portfolio listing

**Non-negotiable for all 20:** visible dated chronological spine, all eight projects newest-first, medium thumbnails within §11 caps, image/control click selects into **one shared preview** with a 200–260 ms crossfade (§7), `View case study` a separate explicit link on every project.

| ID | Direction | Distinctness axis | Parent guidance |
|---|---|---|---|
| PL01 | Connected card timeline, right sticky preview | layout spine | canon (S01/S02 card language) |
| PL02 | Ledger / date-rail timeline, left preview | preview placement | canon (M05 staircase rhythm) |
| PL03 | Compact command-rail timeline, right preview | chrome | secondary allowed (H08) |
| PL04 | Alternating zig-zag cards + shared preview | layout spine | canon |
| PL05 | Ruled editorial timeline, native expandable notes, left preview | density | canon |
| PL06 | Horizontal rail timeline, scroll-driven spine fill | navigation model | canon (D01 continuum rail) |
| PL07 | Sticky spine with `spine-fill` progress + right preview | motion signature | canon |
| PL08 | Two-column asymmetric index (wide cards left, preview right) | hierarchy | canon |
| PL09 | Stacked-card scroll reveal with pinned preview | motion signature | secondary allowed (D10) |
| PL10 | Typographic timeline — date + title lead, image secondary | media treatment | canon (H07 money-first hierarchy) |
| PL11 | Bento-modular timeline blocks, preview as fixed module | layout spine | canon (D03 bento) |
| PL12 | Ledger-print timeline with receipt-style rules, left preview | surface/theme emphasis | secondary allowed (M01) |
| PL13 | Terminal/log-style timeline, mono metadata | chrome | secondary allowed (M04) |
| PL14 | Sticky media wall timeline with edge-mask transitions | media treatment | secondary allowed (S10) |
| PL15 | Filterable timeline: category chips, chronology preserved | navigation model | canon (S02 filter bar) |
| PL16 | Chaptered timeline with quarter markers + progress rail | hierarchy | canon |
| PL17 | Dark editorial timeline, light preview frame | surface/theme emphasis | canon (`--band` plane) |
| PL18 | Master/detail split: index list + persistent preview | preview placement | secondary allowed (S03) |
| PL19 | Index-table timeline: dense rows, thumbnail on select | density | canon |
| PL20 | Magazine-cover index with bounded covers + timeline sidebar | media treatment | canon |

### 12.2 `PD01–PD20` — portfolio case study

**Non-negotiable for all 20:** the same supplied Harbor Ops / B2B portal case study (§9.1), opening image within §11 caps, metadata as real facts only, closing CTA from the canon family, and a working link back to the paired listing direction's index pattern (at minimum the lab gallery + `PL01`).

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

There are **no blog directions in this prompt.** If you catch yourself designing a searchable archive, an article reading column, a TOC with reading progress, or related-post cards, stop — that is `blog-prompt.md` work.

---

## 13. Gate 1 — concepts, mappings and the selection rubric

**40 concept cards**, each with: ID/name/family · primary canon parent `combo_id` + source path + **both** rank values (user-preference /100 and rubric /45) with their scales named · ≥3 concrete inherited patterns · ≥1 corpus reference (from `docs/RESEARCH-PORTFOLIO-UI.md`) with what is borrowed · secondary source where used · desktop and phone composition · size bounds · interaction spec with named motion signature(s) — for PL cards this must spell out the §7.1 selection + crossfade behaviour · accessibility plan (selection semantics, focus, live region, reduced motion, no-JS) · media plan · content risks · one-sentence distinctness claim.

**Table 1 — parent mapping (40 rows):** `template_id | family (PL/PD) | canon parent | parent path | user rank | rubric rank | inherited patterns | corpus refs | secondary parent`.

**Table 2 — distinctness matrix (40 rows × axes):** `layout spine`, `preview placement`, `chrome`, `density`, `media treatment`, `hierarchy`, `navigation model`, `motion signature`, `surface/theme emphasis`. **Gate fails if two templates in a family share both primary axis and motion signature.**

**Table 3 — motion coverage:** one row per catalog signature with usage count, reduced-motion and no-JS behaviour. No signature may be primary on more than **6 of the 40** (pro-rata from 12/80). The preview crossfade is a constant behaviour on PL pages, not a countable "primary signature" — record it separately so the cap stays meaningful.

**Selection rubric (define before building, apply at Gate 3)** so a reviewer can pick 1 of 20 per family:

| Criterion | Weight |
|---|---|
| Work scanability — can a buyer grasp all 8 projects + the preview story fast | 20 |
| Brand fit to the canon (tokens, FIG voice, chrome, S01/S02 card language) | 15 |
| Case-study narrative clarity (PD) / preview-selection quality (PL) | 15 |
| Accessibility and keyboard quality (selection, focus, live region) | 15 |
| Motion quality and restraint (crossfade, spine, sticky discipline) | 10 |
| Distinctiveness within its family | 10 |
| Responsive behaviour at 360 and 1440 | 10 |
| Build feasibility for production handoff | 5 |

Record a score sheet per family and one recommendation (**one PL winner + one PD winner**) with rationale. Recommend a *pairing* note as well: which PL and PD winners work as one production journey.

---

## 14. Output layout

```text
portfolio-lab/
  index.html                     # gallery: all 40, grouped PL / PD, filterable
  assets/                        # deduplicated local project media only (§9.3)
  shared/                        # tokens.css + base.css only (see below)
  portfolio-listing/PL01-…/index.html … PL20-…/index.html
  portfolio-detail/PD01-…/index.html  … PD20-…/index.html
  manifest.json                  # 40 records: id, family, canon parent, ranks, corpus refs, motion, verification
  audit.json                     # machine-readable audit results per template
  DECISIONS.md                   # selection semantics, filtered-out-selection rule, taxonomy call,
                                 # case-study linking rule, image policy, exceptions
  tools/check-portfolio-lab.*    # the lab checker (§10 anti-drift + Gate 3 audits), documented in the gallery
```

- Plus the three docs (§2): `docs/RESEARCH-PORTFOLIO-UI.md`, `docs/TOP10-CANON-SPEC-PORTFOLIO.md`, `docs/PORTFOLIO-DESIGN-ANALYSIS.md`. **Nothing else.** In particular: no `portfolio-blog-lab/`, no `blog-lab/`, no blog docs, no edits to homepage labs, compositor output, rank lists or screenshots.
- `shared/` may hold **only** tokens, resets and primitives. Each template carries its own layout skin; if sharing starts erasing differences or causing collisions, inline it. `portfolio-lab/shared/` is this lab's own — never import from a sibling `blog-lab/shared/` (it may not exist, and the labs must run independently; identical token *values* come from §5, not from a shared file).
- Every template renders standalone over relative paths from the repo root, links to the portfolio gallery, and has next/previous variant navigation **within its family**. Listing ↔ case study link both ways for the B2B project (the §9.1 linking rule governs the other seven).
- Add one shared `@media print` block (case studies get printed/exported by clients).
- Preview: `python3 -m http.server 8126` from the repo root → `/portfolio-lab/` (8124 = homepage lab hub, 8125 = compositor, 8127 = blog lab if built).

**Gallery requirements (40 items must be reviewable):** filter by family, canon parent, motion signature, verification status; **side-by-side comparison of 2–4 templates** (including PL+PD pairing view); a contact-sheet mode; per card show canon parent, corpus references, motion signature and QA status; a "compare against the live page" link per family (`/portfolio` for PL, `/portfolio/b2b-portal-ux` for PD), following the precedent of `homepage-compositor/review/live-nestlancer-preview.html`.

**Verification status per template** must be one of `machine-audited`, `browser-verified`, `not verified` — the repo's own review records that no browser engine was available, so do not upgrade a status you did not earn.

---

## 15. Work sequence and gates

**Gate R — Research corpus.** ≥60 portfolio domains, per-site records, 2026 synthesis, conflict list, 8–10-signature motion catalog. Fails under 60 domains, on missing observation methods, on blog-only sites counted without portfolio pages, or on an uncited synthesis.

**Gate 0 — Canon and baseline.** `git status`; `python3 tools/audit-samples.py` still passes; read the 13 canon samples; measure the 10 canon pages; re-open the two live portfolio routes; freeze the 8-project + case-study content truth; write `docs/TOP10-CANON-SPEC-PORTFOLIO.md` and the matrices in `docs/PORTFOLIO-DESIGN-ANALYSIS.md`.

**Gate 1 — Concepts.** 40 concept cards + three mapping tables + rubric definition (§13). Fails on duplicate axis+signature pairs, on any template without a canon parent and a portfolio-corpus reference, on more than 6 secondary-primary variants, or on any PL concept without the shared-preview interaction spec.

**Gate 2a — Pilot (2 pages).** One PL + one PD template. Measure at all five widths and both themes, run `tool-3` contrast and the five anti-drift checks (§10), exercise the interactions end-to-end: select each of the 8 projects by pointer **and** keyboard, rapid-click race, broken image into the preview, filter to 1 and to 0, follow `View case study` both ways, reduced motion, no-JS. Record results. Do not proceed until the pilot passes.

**Gate 2b — Full build.** All 40 pages plus gallery, manifest and checker, in two family batches (PL batch, then PD batch — or interleaved pairs, recorded either way). Keep manifests, concept cards, parent mappings, gallery labels and thumbnails synchronised. Preserve existing URLs; do not rebuild or alter the 21,600 homepage compositions or the original top-50 hand-offs; do not touch `blog-lab/` if it exists.

**Gate 3 — Verify and critique.**

- Run the repo's existing audit scripts unmodified (`python3 tools/audit-samples.py`, the `tools/ui-review-suite/` tools that apply) plus the new portfolio-lab audit (links, unique IDs, landmarks/headings, alt text, image dimensions, remote-URL scan, dead links, token-lint, identical-skin detector, **scope scan**, JS syntax, no-JS visibility, size caps, motion-signature presence, canon-parent resolution, corpus-reference presence, crossfade-duration check).
- Exercise every interaction across all 20 PL pages: selection and crossfade, keyboard-only selection (arrows/Home/End), rapid-click races, image-load failure, filtered previous/next, zero results, category filtering with chronology intact; plus PD gallery/accordion/before-after/annotated-walkthrough controls, responsive menus and themes. Verify reduced motion and no-JS on both families.
- Inspect rendered pages at 360/390/768/1024/1440 in both themes **if a browser is available**. If not, say so explicitly and do not claim screenshot QA or measured overflow checks.
- Record measured H1 sizes, container widths, thumbnail sizes and preview-frame dimensions at all five widths and both themes. Reject oversize states, not just horizontal overflow.
- Apply the selection rubric, score each family, and recommend **one PL winner and one PD winner** (plus the pairing note) with rationale.
- Classify every finding: **blocker** (broken link, failed contrast, keyboard trap, oversize breach, missing state, stale-crossfade bug) · **major** (missing reduced-motion path, unstable preview frame, weak hierarchy) · **minor** (spacing, copy polish). No blocker may remain open at hand-off.
- Write findings, known issues, verified vs not verified into `docs/PORTFOLIO-DESIGN-ANALYSIS.md`, and log design calls in `portfolio-lab/DECISIONS.md`.
- Finish by reporting file paths, the local run command (`python3 -m http.server 8126`), verification results and limitations. State explicitly that no blog artifact was created or modified.

---

## 16. Hard constraints

- **Do not** push, commit, create/switch/rename a branch.
- **Do not** modify or delete existing homepage sample folders, locked copy, rank-list records, screenshots or compositor generator outputs.
- **Do not** do blog work: no `BL`/`BA` templates, no `blog-lab/`, no blog research/analysis/canon docs, no article content, no blog placeholder records, no reading-progress/TOC/code-block components passed off as case-study features. Do not create the combined `portfolio-blog-lab/` folder.
- **Do not** present the user-preference score or the rubric score as a user study, conversion proof, or independent verification of a case-study result.
- **Do not** invent testimonials, outcomes, client identities (beyond the supplied Harbor Ops), project dates/durations/budgets, or case studies for the seven projects that have none supplied.
- **Do not** drop or hide the "Illustrative product concepts — not customer screenshots." caption where the FIG 05 set is shown, and do not pass placeholder/generated art off as real client work.
- **Do not** present a research corpus you did not open; unopened entries are marked not verified. Do not borrow the blog corpus's entries or count.
- **Do not** ship production-looking controls that cannot work in a static demo without disclosing their demo status (e.g. `PD15` before/after).
- **Do not** ship remote or expiring media URLs, broken local routes, `href="#"` destinations, external CDNs or font services.
- **Do not** introduce brand colours outside §5.1, radii/spacing outside §5.3, or differentiation limited to colour and border radius.
- **Do not** waive the size contract (§11) or the crossfade contract (§7.3) because a 2026 portfolio trend uses larger covers, slower reveals or scroll-jacking.

---

## 17. Completion checklist (portfolio — 40 templates)

- [ ] ≥60 distinct portfolio domains audited with per-site records and observation methods; ≥15 detail-page audits
- [ ] 2026 synthesis with cited evidence, trend + portfolio-pattern counts, fading patterns, browser-support reality check
- [ ] Conflict list between 2026 portfolio trends and the §11 size contract, with adaptations
- [ ] Motion catalog of 8–10 named signatures (incl. crossfade + spine-fill) with timing, reduced-motion and no-JS behaviour
- [ ] `docs/TOP10-CANON-SPEC-PORTFOLIO.md`: 10 canon pages and 13 samples measured, with file-path evidence
- [ ] Two rank lists quoted with their scales; no rubric/model score called a user study
- [ ] Both live portfolio pages audited and compared with screenshots `007`/`008`; content truth frozen with sources
- [ ] Fintech Payments Hub taxonomy inconsistency + case-study linking rule recorded in `portfolio-lab/DECISIONS.md`
- [ ] Token, radius/spacing and brand-keep rules applied; token-lint passes on all 40
- [ ] Contrast measured in both themes on all 40; `--line` never used for meaningful boundaries (spine, selection, preview)
- [ ] Selection semantics implemented fully (keyboard, live region, latest-wins) on all 20 PL pages; crossfade 200–260 ms, frame-stable
- [ ] Landmarks, single `h1`, skip link, focus management, 44/24 px targets, `type="button"` toggles
- [ ] No banned ARIA patterns; `prefers-reduced-motion` covers hover, spine-fill, pinned effects and the crossfade
- [ ] Portfolio component inventory implemented with every required state; empty/error states present
- [ ] Chrome checklist passes on all 40; no empty mobile drawer; no `href="#"` destinations; nav unchanged
- [ ] All 20 PL pages are dated chronological timelines with medium thumbnails and one shared preview; chronology survives filtering
- [ ] All 20 PD pages present the same supplied Harbor Ops case study; no invented facts, quotes or metrics
- [ ] "Illustrative product concepts" caption intact; image policy honoured; placeholder art labelled
- [ ] Content stress fixtures (§9.2) run on all 40; truncation policy respected
- [ ] Asset plan honoured: deduplicated `portfolio-lab/assets/`, explicit dimensions, LCP identified
- [ ] Performance budget met; five anti-drift checks pass (identical-skin, remote URL, dead link, token-lint, **scope scan**)
- [ ] Exactly 20 `PL` + 20 `PD` templates (40 total), all standalone; **zero** blog files created or modified; no `portfolio-blog-lab/`
- [ ] Gallery: filters, 2–4-up comparison incl. PL+PD pairing, contact sheet, QA status per card, live-page comparison
- [ ] Every template resolves to a canon parent **and** a portfolio-corpus reference, with visible inherited patterns
- [ ] ≤6 templates use a rubric-top-10 sample as primary; each labelled; one chrome family per page
- [ ] Size contract measured and satisfied at 5 widths × 2 themes
- [ ] Selection rubric applied; one recommended PL winner + one PD winner (+ pairing note) with rationale
- [ ] Findings classified blocker/major/minor; no blocker open
- [ ] `manifest.json`, `audit.json`, `DECISIONS.md` and gallery in sync with the real files
- [ ] Existing homepage lab intact; `tools/audit-samples.py` still passes; no commit/branch/push performed