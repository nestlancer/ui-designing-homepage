# Nestlancer Blog Page Lab — AI Agent Prompt (Blog Only)

> **Use this prompt with the `nestlancer/ui-designing-homepage` repository open as the working directory.**
>
> **Split v1 (2026-10-22).** This file is one half of the split of `blog-portfolio-prompt.md` (v4 content). It covers **blog work only**: blog listing (`BL01–BL20`) + blog article (`BA01–BA20`) = **40 templates**. The portfolio half lives in `portfolio-prompt.md` and is **not** part of this task — do not read it as instructions, do not execute it, and do not create any portfolio artifact while running this prompt.
>
> This prompt is **standalone**: everything you need (canon, tokens, accessibility, size, content and gate rules) is in this file. You do not need `portfolio-prompt.md` or `blog-portfolio-prompt.md` to complete it. Where a rule is duplicated identically in the portfolio prompt (tokens, canon table, brand keep-rules), that duplication is intentional — the two labs must stay one brand even though they are built separately. **Do not diverge from the shared values in §5 to "be different" from the portfolio lab.**
>
> **Do not push, commit, create or switch a branch.** Preserve the active branch, all existing homepage artifacts, the rank-list records and the current template URLs.

---

## 1. Role and outcome

Act as a senior product designer, UI/motion researcher, accessibility-minded frontend engineer, and critical design reviewer. Extend this repository into a **separate blog page-template lab** without changing the homepage work and without touching any portfolio work.

Deliverables, in order:

1. `docs/RESEARCH-BLOG-UI.md` — research corpus of **≥60 distinct, currently accessible** blog/editorial/reading sites, audited for UI design and animation, plus the 2026 synthesis (§4).
2. `docs/TOP10-CANON-SPEC-BLOG.md` — the Top-10 canon audit through the blog/editorial lens: each of the 10 compositions measured for type scale, container/measure width, spacing rhythm, chrome geometry, card treatment and motion, in light and dark (§3, §5).
3. `docs/BLOG-DESIGN-ANALYSIS.md` — the 13-sample matrix for the canon, the two live production-page audits, and verification findings (§6).
4. **40 responsive, navigable HTML templates** — 20 blog listing (`BL`) + 20 blog article (`BA`) — in `blog-lab/`, plus one gallery, manifest and checker.

Every template must trace to **(a)** one of the ten canon compositions and **(b)** at least one corpus entry in `docs/RESEARCH-BLOG-UI.md`. A shared palette alone is not derivation. 40 recolours is a failure — and 40 identical reading columns with different headers is the blog version of that failure.

Reference production pages (blog only):

| Route (on `app.nestlancer.com`) | Family | Legacy screenshot in this repo |
|---|---|---|
| `/blog` | `BL` listing | `Nestlancer-public-screenshots/public/002-blog-listing.webp` |
| `/blog/cutting-deploy-time-from-45-minutes-to-five` | `BA` article | `Nestlancer-public-screenshots/public/003-blog-article.webp` |

Brand truth also used by this prompt: `Nestlancer-public-screenshots/public/013-marketing-homepage.webp` + `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md` (chrome, FIG voice and tokens only — homepage marketing copy is **not** blog content and must not be pasted into articles).

---

## 2. Separation contract — blog only, all separate

This prompt exists so blog work can be run **independently** of portfolio work (different session, different agent, different time). Keep the boundary absolute:

| | This prompt (blog) | Sibling prompt (portfolio — NOT your task) |
|---|---|---|
| Prompt file | `blog-prompt.md` (this file) | `portfolio-prompt.md` |
| Families | `BL01–BL20` listing · `BA01–BA20` article | `PL01–PL20` listing · `PD01–PD20` case study |
| Template count | **40** | 40 (theirs, not yours) |
| Lab folder | `blog-lab/` | `portfolio-lab/` |
| Research doc | `docs/RESEARCH-BLOG-UI.md` (≥60 domains) | `docs/RESEARCH-PORTFOLIO-UI.md` |
| Canon spec | `docs/TOP10-CANON-SPEC-BLOG.md` | `docs/TOP10-CANON-SPEC-PORTFOLIO.md` |
| Analysis doc | `docs/BLOG-DESIGN-ANALYSIS.md` | `docs/PORTFOLIO-DESIGN-ANALYSIS.md` |
| Decisions log | `blog-lab/DECISIONS.md` | `portfolio-lab/DECISIONS.md` |
| Live routes audited | `/blog`, `/blog/cutting-deploy-time-from-45-minutes-to-five` | `/portfolio`, `/portfolio/b2b-portal-ux` |
| Screenshots audited | `002`, `003` (+ `013` for brand/chrome only) | `007`, `008` |
| Preview port | `8127` | `8126` |

Rules:

- **In scope:** the three docs above, everything under `blog-lab/`, and nothing else. Every file you create must be one of those paths.
- **Out of scope:** `portfolio-lab/`, `docs/RESEARCH-PORTFOLIO-UI.md`, `docs/TOP10-CANON-SPEC-PORTFOLIO.md`, `docs/PORTFOLIO-DESIGN-ANALYSIS.md`, the old combined `portfolio-blog-lab/` folder name (never create it), and any `PL`/`PD` template, project timeline with shared preview, case-study narrative, the eight FIG 05 projects as a "related work" module, or portfolio imagery used as article covers. If an article direction needs a closing block, it closes into related **articles** or the canon CTA — never into a portfolio grid.
- **No dependency on the portfolio run.** This prompt must be completable whether the portfolio lab exists, is half-built, or was never started. Never link a blog template to a portfolio template as a required route; header/footer nav labels (including "Portfolio") keep their existing production/repo destinations exactly as the canon chrome defines them.
- **If the portfolio lab already exists** when you run: treat `portfolio-lab/` and the three portfolio docs as **read-only**. You may read `docs/TOP10-CANON-SPEC-PORTFOLIO.md` only to cross-check that your measured token/type values do not contradict it; if they disagree, §5 of this file and the canon sample CSS win, and you record the discrepancy in `blog-lab/DECISIONS.md`. Never edit, "fix", regenerate or reformat a portfolio file.
- **If the blog lab already exists** from an earlier partial run of this same prompt: resume inside `blog-lab/` under the gate rules in §15; do not restart file numbering and do not create a second blog folder.
- **Combined-prompt traceability:** section numbers below deliberately mirror `blog-portfolio-prompt.md` (§3 canon, §5 tokens, §11 sizes, §12 directions, §15 gates) so a reviewer can diff the split against the original. Numbers from the combined prompt are re-scoped pro-rata for 40 templates — each change is stated where it occurs (research ≥100 → ≥60 blog-only; secondary-primary cap 12/80 → 6/40; motion-catalog cap 12/80 → 6/40; pilot 4 → 2).

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

**Only 13 distinct samples appear across these ten pages**: header `P01`; heroes `H01`, `H07`; delivery `D01`, `D03`; financial `M05`; why `W05`; work `S01`, `S02`; CTA `C01`, `C03`; footers `P01`, `P05`. That tight vocabulary is the point — it is what makes 40 blog pages recognisably one brand. **These 13 files are this lab's visual grammar.** Read every one of them (markup, CSS, JS) before designing:

| ID | Source file | Blog relevance |
|---|---|---|
| Header `P01` | `homepage-header/samples/P01-classic/index.html` | default chrome for all 40 (solid-bar grammar) |
| `H01` Ground Truth | `homepage-hero/samples/H01-ground-truth/index.html` | article/listing opening hierarchy |
| `H07` Money-first | `homepage-hero/samples/H07-money-first/index.html` | typographic, metadata-first editorial leads |
| `D01` Continuum Rail | `homepage-delivery/samples/D01-continuum-rail/index.html` | chronological feeds, in-article process spine (`BA12`) |
| `D03` Bento Proof | `homepage-delivery/samples/D03-bento-proof/index.html` | bento-modular listing feed (`BL06`) |
| `M05` Cashflow Staircase | `homepage-financial-clarity/samples/M05-cashflow-staircase/index.html` | ledger rhythm for indexes and result dashboards |
| `W05` Gate Logic | `homepage-why-nestlancer/samples/W05-gate-logic/index.html` | proof/checklist card logic inside articles |
| `S01` Case Grid | `homepage-selected-work/samples/S01-case-grid/index.html` | card-grid language (applied to article cards, not projects) |
| `S02` Filter Bar | `homepage-selected-work/samples/S02-filter-bar/index.html` | category chips + filtered index language |
| `C01` Quiet Meridian | `homepage-closing-cta/samples/C01-quiet-meridian/index.html` | article/listing closing block |
| `C03` Four-Point Orbit | `homepage-closing-cta/samples/C03-four-point-orbit/index.html` | alternate closing block |
| Footer `P01` | `homepage-footer/samples/P01-classic/index.html` | default footer |
| Footer `P05` | `homepage-footer/samples/P05-centered/index.html` | alternate footer |

For blog work the load-bearing grammar is **`H01`/`H07` (editorial openings and type hierarchy), `S02` (filter/search index), `S01` card geometry re-expressed for articles, `D03` (bento feed), `M05` (ledger rhythm), `D01` (chronology), `P01` chrome, `C01`/`C03` closings**. `W05` is supporting grammar (checklist/proof treatment inside article bodies), not a page-layout parent. Note the trap: `S01`/`S02` are *work*-section samples — inherit their card/filter **mechanics and geometry**, never their project content, titles or imagery.

### 3.2 Secondary set (rubric top 10) — declared exceptions only

The rubric top 10 contributes a different vocabulary: `P04` pill/float header (`homepage-header/samples/P04-pill/`), `H08` glass command rail (`homepage-hero/samples/H08-command-rail/`), `D10` magnetic stack (`homepage-delivery/samples/D10-magnetic-stack/`), `M01` broadsheet (`homepage-financial-clarity/samples/M01-broadsheet-total/`), `M04` rails terminal (`homepage-financial-clarity/samples/M04-rails-terminal/`), `S03` split viewer (`homepage-selected-work/samples/S03-split-viewer/`), `S10` sticky showcase (`homepage-selected-work/samples/S10-sticky-showcase/`), `C04` editorial endnote (`homepage-closing-cta/samples/C04-editorial-endnote/`).

Rules (pro-rata from the combined prompt's 12/80):

- A template may use a rubric-top-10 sample as a **secondary** pattern source, and at most **6 of the 40** blog templates may use one as their **primary** parent.
- Any such template must label the secondary parent in its gallery card and in `manifest.json`, and must explain why the direction needs it (glass/command chrome, broadsheet/terminal ledger, split master/detail preview, sticky/scrollytold visual, editorial endnote closing).
- Blog directions that need it: `BL03` command archive, `BL16` split index with sticky preview, `BA08` scrollytelling chapters, plus any broadsheet/endnote-flavoured chrome variant you declare at Gate 1. Everything else stays canon-primary.
- **Never mix more than one chrome family per page.** A page is either `P01` solid-bar grammar or `P04` floating-pill grammar, not both.

### 3.3 Canon measurement requirement

For each of the 10 canon pages and each of the 13 samples, record in `docs/TOP10-CANON-SPEC-BLOG.md`: measured H1/H2/body sizes, container width, prose measure/line-height actually used, section padding rhythm, header height, card radius and border, shadow, mono-eyebrow treatment, motion inventory with durations, and light/dark token values actually used. Quote the file path as evidence. Where a value can only be reasoned from CSS because no browser engine was available, say so. This doc is the blog lab's own measurement record — do not name it `TOP10-CANON-SPEC.md` (that unsuffixed name belonged to the combined prompt and would collide with the portfolio run).

---

## 4. Gate R — the blog research corpus (≥60 sites)

Write `docs/RESEARCH-BLOG-UI.md`.

**Corpus composition — minimum 60 distinct domains** (tier minimums sum to 65, giving headroom for dead/paywalled exclusions). Blog/editorial/reading evidence only — a portfolio or agency site counts **only** if the audited pages are its blog index / article pages, and it must then sit in tier B-D with that stated:

| Tier | Min | What counts |
|---|---|---|
| B-A · Editorial & blog | 30 | Company/tech blogs, design and culture magazines, independent writers, journalism and newsletter sites (index **and** article pages) |
| B-B · Reading-experience references | 12 | Sites strong in long-read UX: sticky TOC, reading progress, typography/measure controls, code blocks, marginalia, related-post logic |
| B-C · Award / trend references | 13 | 2026 award winners and trend roundups (Awwwards, Web Design Awards, WebAward, curated lists), audited on editorial pages |
| B-D · Adjacent editorial indexes | 10 | Documentation blogs, changelogs/dispatches, and portfolio-site blogs with transferable listing/article patterns |

**Per-site record (all 60+):** # / domain / URLs audited (listing **and** article where both exist) / access date / observation method (`live render`, `DOM/text extraction`, `screenshot`, `secondary source`) / category / page-type tag (`listing`, `article`, `both`) / index archetype (lead+list, card grid, bento, table, typographic, chronological feed…) / typography system (measure, size, line-height, serif/sans roles) / image and cover treatment / navigation, search, category and chrome / **each animation with trigger, approximate duration, easing, and whether it moves content or only decoration** / micro-interaction states (search, filters, paging, tabs, disclosures, copy-code, reader controls) / colour and surface model + dark mode / **reading-UX specifics** (TOC, scroll-spy, progress, drop caps, pull quotes, footnotes, code rendering, related logic) / performance and a11y observations / **transferable pattern** / **risk to not copy** / which blog template IDs (`BL##`/`BA##` only) it informs.

Rules: 60 distinct **domains**; dead, paywalled or JS-walled entries capped at 10% and labelled; no fabricated sites; anything not opened is marked **not verified**. A domain that also appears in the portfolio corpus (if it exists) still counts here only if **you** opened its blog/article pages for this corpus — never import the portfolio corpus's count, records or conclusions. Together the two split prompts target ≥120 domains (60 blog + 60 portfolio), exceeding the combined prompt's 100; each half must stand alone.

**Quality bar:** ≥18 entries with a real timed animation observation; ≥12 with dark-mode or theme-switching observations; ≥15 entries auditing an **article** page end-to-end (not only an index); ≥8 entries with a real code-block observation (the featured article ships a TypeScript sketch — §9.1).

**2026 synthesis** — every claim cites corpus entries or a named external source:

- Trend families with counts and 3+ example domains (editorial/serif revival, kinetic and variable type, CSS scroll-driven animation, scroll progress + scroll-spy TOCs, bento-modular feeds, pinned/scrollytold chapters, view transitions, grain/tactile surfaces, restrained "barely-there" UI, dark editorial/reading modes, newsletter-issue framing).
- Blog-specific pattern counts: how many indexes search/filter client-side vs page; how related posts are chosen and how many are shown; typical measures/line-heights observed vs §5.2; how code blocks handle labels, wrapping/scrolling and copy feedback.
- Motion patterns with observed duration ranges and triggers, including measured tab/preview swap timings to check against §7.3.
- What is fading (full scroll-jacking of prose, generic AI cover imagery, animation on every paragraph, infinite scroll without position recovery) and the evidence.
- **Browser-support reality check.** Public 2026 sources contradict each other on scroll-driven animation support across engines. Do not assert support from memory; state what you verified, and build every scroll-driven effect as **progressive enhancement** with an `IntersectionObserver`/class-toggle fallback. Reading text must never depend on any of it.
- **Conflict list against §11's size contract.** 2026 editorial work uses viewport-filling headlines and covers; this lab's caps are hard limits and are not waived by a trend. For each conflict, state what is kept (rhythm, hierarchy, motion, restraint, surface, measure discipline) and what is refused (absolute scale).
- **Motion catalog** of 8–10 named signatures with trigger, duration range, easing, animated properties (transform/opacity only), reduced-motion behaviour, no-JS behaviour, and permitted usage. It must name at least: an entrance **stagger-reveal** for listing cards, a **measure-progress** reading-progress signature, a view-transition-style listing swap signature, and a sticky/scrolly signature. Every blog template references at least one catalog signature by name. Signature names are this lab's own; if the portfolio lab exists, do not rename yours to match or clash silently — record any shared name with identical meaning in `DECISIONS.md`.

---

## 5. Design-token specification (prescriptive — shared brand values, do not diverge)

Values below were extracted from the canon samples' own CSS. Use these tokens; do not invent new brand colours. Where a template needs an extra tone (e.g. code-syntax tones), derive it from these, prove contrast in both themes, and record it in `docs/TOP10-CANON-SPEC-BLOG.md`. **This section is intentionally identical in the portfolio prompt.** If you find a value here that contradicts the canon CSS, the canon CSS wins — record the correction in your canon spec and `DECISIONS.md`; do not silently fork the palette.

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

**Rule:** `--line` is a decorative hairline. Any border that conveys meaning — search/select input boundary, selected chip/tab state, code-block boundary, table structure, focus ring, reading-progress track — must reach **3:1** against its neighbour; use `--teal`, `--teal-soft` over `--bg`, `--ink-2` or a dedicated `--line-strong` you add and document.

### 5.2 Typography tokens

| Token | Value |
|---|---|
| `--font` | `"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--mono` | `ui-monospace, "IBM Plex Mono", "SF Mono", Menlo, Consolas, monospace` |
| FIG eyebrow | `500 11px/1 var(--mono)`, uppercase, letter-spaced — the label voice from the brand screenshots |
| Type scale | 12 / 14 / 16 / 18 / 24 / 32 / 40–52 px (H1 capped at 56 desktop, 36 phone) |
| Body / prose | 16–18 px, line-height 1.55–1.7, **measure 60–72 ch / max 720 px** — the single most load-bearing token in this lab |
| Code | `--mono`, ≥13 px, line-height ≥1.5; never shrunk to fit width (scroll instead, §8) |
| Tabular figures | `font-variant-numeric: tabular-nums` on all dates, counts, issue numbers and currency |

No web fonts, no CDN, no font service. System stacks only. A serif *system* stack for display/lead roles is permitted only where a corpus-backed editorial direction needs it, declared per template in its concept card; body prose stays on `--font` unless the direction's whole point is a serif reading column (`BA18`-family), still system serif only.

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
| z-index scale | base 0 · sticky chrome/TOC 10 · preview panel 20 · drawer/menu 40 · status toast 60 — nothing above 60 |
| Container | 1160 px max (1200 px only where a canon sample already uses it, recorded per template); prose measure caps independently at 720 px |

### 5.4 Brand keep-rules

These are documented must-keeps for the homepage lab and carry into this lab:

- The **mono FIG eyebrow** on every major block (`FIG · Blog`, `FIG · Article`, `FIG · Archive`, `FIG · Contents` and equivalents).
- **Hairline borders** and soft shadow on card/window surfaces; radius from §5.3 only.
- **Product-window chrome** (three dots, mono title, chip) where a UI mock is shown (e.g. the featured panel in `BL09`, the code window in `BA09`).
- Locked copy and honesty disclaimers stay intact: wherever demo data stands in for the production blog database, the in-page demo disclosure (§9.1) is visible — it is this lab's equivalent of the homepage's "illustrative / not a live checkout" rule, and it is never dropped for looks.
- Real logo assets from `assets/` (`logo-full-dark.svg`, `logo-full-light.svg`, `logo-mark-dark.svg`, `logo-mark-light.svg`) — never redrawn, stretched or recoloured.
- Restrained navy/teal/mint palette; no new brand hues (code-syntax tones derived per §5 preamble are the only exception, and they stay inside code blocks).

### 5.5 Dark-mode craft rules

No pure black (`#000`) surfaces; keep the `--bg`/`--surface`/`--surface-2` three-step ramp. Hairlines must stay visible without becoming borders. Do not invert accent relationships — `--teal` stays the accent and `--teal-hover` stays darker/lighter in the same direction as the token table. Article covers get a slight luminance treatment (no white flash at load) and never a hard white frame. **Long-form dark reading needs its own check:** verify prose `--body` on the actual reading surface, code tokens, and muted bylines at article length, in both themes — a card-level pass is not a reading-level pass. The ratios above are the floor, not the ceiling.

---

## 6. Gate 0 — repository baseline (blog sources only)

1. `git status`; never overwrite uncommitted changes.
2. Baseline the existing lab: `python3 tools/audit-samples.py` must still pass on its current file set before you touch anything.
3. Read the 13 canon samples in full (markup, CSS, JS — paths in §3.1) and the chrome/FIG/token rows of `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`.
4. Re-open the **two** live blog routes (`/blog`, `/blog/cutting-deploy-time-from-45-minutes-to-five`) at desktop and mobile where possible, and inspect the legacy screenshots `002-blog-listing.webp` and `003-blog-article.webp`; label each observation `live render` / `DOM extract` / `screenshot` / `source`. Do not audit the portfolio routes or screenshots `007`/`008` in this run.
5. Extract and freeze the blog content truth before designing: the 12 known real posts visible on the index (title, category, author, date, read time, cover — each field quoted with its source), the index's own `Showing 1–12 of 110` statement, and the **complete featured article verbatim** — body, headings, bullets, byline/metadata, and the TypeScript sketch (§9.1). Anything you cannot verify is marked **not verified**, never invented or "completed". If the full article text cannot be extracted and verified, stop at Gate 0 and report exactly what is missing rather than writing a substitute article.
6. Carry the known blog data inconsistency forward rather than copying it silently: article metadata shows `5 views` in the lead and `2 comments` later. Treat counts as dynamic snapshots; never reconcile them into fixed evidence, and record how templates present volatile counts in `blog-lab/DECISIONS.md`. (The Fintech Payments Hub category error belongs to the portfolio prompt — do not log or "fix" it here.)
7. Write the 13-sample matrix, the 10-row canon matrix and the two-page blog audit into `docs/BLOG-DESIGN-ANALYSIS.md`.

---

## 7. Accessibility and interaction contract

### 7.1 Discovery semantics — search, filter, paging, tabs (BL pages) ⭐ core listing contract

- **Search** is a real local search over the lab's records (`type="search"`, visible label) or it does not appear. No fake search, no simulated network. Typing filters honestly; the result count is announced in an `aria-live="polite"` region; focus stays in the input; clearing restores the full local set. A demo disclosure next to the search states that it searches the local demo records, not the production database (§9.1).
- **Category/tag filtering** uses real controls (chip buttons with `aria-pressed`, or radios) — never links that pretend to navigate. Filtering preserves the index's declared order, keeps focus on the control, announces the count, and provides a working reset. Zero results renders the §8 empty state, never a blank region.
- **Pagination / load-more** (`BL15` and friends) is honest local paging over the full local record set: `aria-current="page"` on the current page, disabled states at the ends, an end-of-list message, and position/focus handled so keyboard users land predictably after a page change. No fake "110 results" paging math beyond quoting the live index's own statement as context.
- **Tabs** (`BL20` Latest / Featured / Archive) implement the full `tablist`/`tab`/`tabpanel` keyboard model: arrow keys move, `aria-selected` tracks, focus is retained across the swap, and the panel swap (any view-transition-style effect) is decoration — content is identical and complete with JS off (all three panels' content reachable as stacked sections without JS).
- **Selected-article previews** (`BL05`, `BL13`, `BL16`, `BL09` featured panel): hovering or selecting a card may mirror it into a preview pane, but selection must also work from the keyboard (focus/selection control per card), the preview never becomes the only path to the article — every card keeps its own real article link — and the preview swap follows §7.3 (immediate under reduced motion). Record the chosen preview-selection pattern once in `blog-lab/DECISIONS.md` and implement it identically wherever a preview appears.

### 7.2 Reading semantics — TOC, progress, disclosures, reader controls (BA pages) ⭐ core article contract

- **TOC** is a `nav` with an `aria-label`; the scroll-spy active entry gets `aria-current="true"`; scroll-spy must not scroll the page on its own, must not move focus, and every TOC link targets a real heading `id` in the supplied article. Heading order in the article is the supplied order — never re-levelled for looks.
- **Reading progress** uses `role="progressbar"` placed **outside** any list, with `aria-valuenow` updated, or is purely decorative with `aria-hidden="true"` — pick one, never both meanings. Progress reflects article-body scroll, stated in the concept card.
- **Disclosures** (`BA10` Q&A, `BA17` on-demand panels) prefer native `details`/`summary`; content inside them is the supplied article reorganised, not new answers.
- **Reader controls** (`BA19` text-size/width toggles, `BA17` focus mode) are `<button type="button">` controls labelled as a demo where they cannot persist to production; they adjust within §5.2/§11 limits (a width toggle may never exceed the 720 px measure cap; a size toggle never goes below 16 px prose), persist via `localStorage` if they persist at all, and default to the token values with JS off.
- **Code block:** language label ("TypeScript"), horizontal scroll on narrow widths (never clipped, never shrunk), a copy button with real "Copied" feedback and a clipboard-failure fallback, syntax tones passing AA contrast in **both** themes (§5 preamble), no CDN highlighter. The code text itself is the supplied sketch verbatim — not "improved", reformatted beyond whitespace fidelity, or extended.
- **Share/author/related:** share rows use real copy-to-clipboard with fallback; LinkedIn/X are real external links or labelled placeholders — never dead `#` icons. The author block carries the supplied name/role/date only; no invented bios, avatars-of-real-people, or social handles. Related-post cards are one identical component across BA pages, fed only by the §9.1 records, with the selection rule (same category? latest? manual?) stated in `DECISIONS.md`.

### 7.3 Structure, focus and motion

- Exactly one `h1`; no skipped heading levels; landmarks `header / nav / main / aside / footer`; every `nav` gets an `aria-label`; a working skip link to `main` (on BA pages, a second skip target to the article body is welcome but not a substitute).
- No `aria-label` on role-less `div`s (use `role="group"` or a real element). No contradictory ARIA (`aria-hidden` + `aria-label` on the same element). No `progressbar` inside `role="list"`. Every toggle is `<button type="button">`.
- **Focus management:** filtering, paging, tab switching, preview swaps and view-transition-style changes must not lose or trap focus. After a filter/page change, focus behaviour is the §7.1 rule, applied consistently.
- **Target size (WCAG 2.2):** 44×44 px preferred for primary controls, 24×24 px absolute minimum (SC 2.5.8) — pagination numbers, chips and TOC links included — with spacing so adjacent targets cannot be hit together. The homepage lab shipped 22 px footer links — do not repeat that. In-prose text links keep a non-colour distinguisher (underline) at reading size.
- **Contrast (WCAG 2.2 AA):** 4.5:1 normal text, 3:1 text ≥18.66 px bold or ≥24 px, 3:1 for UI component boundaries and meaningful graphical objects (SC 1.4.11), 3:1 for the focus indicator (SC 2.4.13). Run `tools/ui-review-suite/tool-3-color-contrast-seams.mjs` against every template in both themes — including the code theme — and record the ratios.
- **Reduced motion:** `prefers-reduced-motion: reduce` must neutralise entrance staggers, hover transitions, pinned/scrolly effects, preview/tab swaps and smooth-scroll — immediate states, normal scroll. **Reading never requires motion.** All 13 canon samples already do this; the new pages must too.
- **No JS:** every record, the full article body, the code sketch and every article link must be reachable and readable; search/filter/paging/tab/reader controls must not render as operable when JS is absent (progressive disclosure: the unfiltered full list and stacked panels are the no-JS truth).

**Motion contract:**

- One primary signature per template from the Gate R motion catalog, with declared duration and easing; at most one pinned/sticky motion effect (`BA08`) and one entrance stagger per page.
- Animate **transform and opacity only**. Never animate `top`/`height`/`width`/`margin` for scroll effects. No animation may move text under a pointer, shift the reading column, delay reading, or block a control. The reading-progress bar is the one sanctioned continuously-moving element, and it lives outside the prose.
- Listing preview/tab swaps: **200–260 ms**, constant panel dimensions, incoming content ends at full opacity.
- Scroll-driven CSS (`animation-timeline: scroll()/view()`, `animation-range`, `animation-duration: auto`) only as progressive enhancement with a verified non-supporting fallback, and only after recording what support you actually tested.
- No JS animation libraries, no CDN. Plain HTML/CSS/JS plus `IntersectionObserver`.

---

## 8. Component inventory and state matrix (blog components only)

Define once, reuse across all 40. Every component lists the states it must implement; a template may restyle a component but may not drop a state. Portfolio components (project timeline/spine, shared project preview, case-study gallery, before/after slider…) are **not** defined here and must not appear rebadged as blog components.

| Component | Required states |
|---|---|
| Button — primary / ghost / icon | default · hover · focus-visible · active · disabled · loading |
| Article card | default · hover · focus-within · selected (where a preview mirrors it) · cover-error — title link always present, card never one fake link |
| Chip / category / tag pill | default · hover · focus-visible · selected (`aria-pressed`/`aria-checked`) · disabled |
| Search input | empty · typing · focus · results + count · **no-results** · cleared; visible label, `type="search"`, honest demo disclosure |
| Select / sort control (if used) | closed · open · focus · selected; native element or full listbox keyboard model |
| Pagination / load-more | page states · current (`aria-current="page"`) · disabled ends · loading (local only) · end-of-list message |
| Tabs (`BL20`) | `tablist`/`tab`/`tabpanel`, arrow keys, `aria-selected`, focus retention, no-JS stacked fallback |
| TOC | `nav aria-label`, `aria-current` on active, scroll-spy without hijacking scroll, collapsible on phone without hiding content |
| Reading progress bar | `role="progressbar"` outside any list with `aria-valuenow`, **or** decorative `aria-hidden` — one meaning only |
| Code block | language label · horizontal scroll (never clipped/shrunk) · copy button with real "Copied" feedback + fallback · syntax tokens passing contrast in both themes · no CDN highlighter |
| Accordion / disclosure (`BA10`) | native `details`/`summary` preferred; expanded/collapsed; focus visible |
| Table (archive listings, `BL08`) | header semantics (`th scope`), zebra or rule separation, horizontal-scroll wrapper with a visible affordance on phones |
| Author block / byline | supplied name, role, date; no invented bios or handles |
| Share row | copy with real clipboard fallback, LinkedIn/X as real external links or labelled placeholders |
| Related-post cards | image, title, category, read time; identical component across BA pages; only §9.1 records |
| Newsletter / subscribe block (if a direction uses one) | real form semantics, visible label, labelled demo (no submission claim), success/error as honest local states |
| Cookie banner (only if the supplied pages carry one) | Accept/Dismiss, keyboard-operable, no persistence claim, labelled as a demo |
| Empty state | illustration-free or simple inline SVG, one line of copy, one recovery action (clear search/filter) |
| Error state | what failed, why, what the user can do; never a silently empty list |
| Loading state | honest local states only; never simulate a network call |
| Image frame (covers) | fixed aspect, `object-fit: contain/cover` declared, `alt` text, error placeholder |
| Theme toggle | `<button type="button">`, `aria-pressed`, persisted via `localStorage`, visible at all widths |

**Chrome checklist per template:** all seven nav links (**Product · Portfolio · Blog · About · Pricing · Services · Contact** — locked from `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`) present at mobile widths; the mobile drawer is **not empty** and carries Sign in + Start a project; the theme toggle works and persists; both CTAs reachable; no `href="#"` used as a destination — every control is a button or a real link; `Blog` is marked current (`aria-current="page"`) on BL pages. Nav destinations keep their existing routes — in particular the `Portfolio` label must **not** be relinked into a portfolio-lab template that this run does not build.

---

## 9. Content, data and assets (blog data only)

### 9.1 Data plan

- **Blog listing (`BL`):** use the **12 known real posts** frozen at Gate 0 (title, category, author, date, read time, cover — each only as verified). Because the live index says `Showing 1–12 of 110`, build **24–30 local records**: the 12 real titles plus clearly labelled neutral placeholders whose titles state their placeholder status (e.g. "Placeholder article record 13 — layout testing only"). Disclose in-page, next to the list/search, that this is demo data, not the production database. Never hard-code signed or expiring S3 URLs. Listing links: the featured article links to the paired BA template; the other records link to that same BA template **only** under the demo disclosure, with the exact linking rule stated once in `blog-lab/DECISIONS.md` — never invent 29 fake articles behind the links, never link to `#`.
- **Article (`BA`):** the supplied featured article only — **"Cutting Deploy Time from 45 Minutes to Five"** — body, headings, bullets, byline/metadata and the TypeScript sketch, **verbatim**. All 20 BA templates present this same article; directions reorganise presentation (chapters, marginalia, Q&A disclosures, checklist spine…) but never rewrite, abridge silently, or add paragraphs, statistics or a conclusion the supplied text does not have. Pull quotes are exact supplied sentences. `BA12`'s Discovery → Stabilize phases and `BA13`'s result cards must be traceable to supplied headings/bullets, with the mapping recorded in the concept card. Dates/read time: only `Oct 5, 2026` and `2 min read` are known for the featured article. For placeholder records use obviously neutral values and label them.
- Volatile counts (`5 views`, `2 comments`) are dynamic snapshots (§6 step 6): templates either omit them or present them exactly as the frozen extract does, per the rule recorded in `DECISIONS.md`. Never fabricate counts for placeholder records beyond obviously-neutral labelled values.
- **No portfolio data anywhere in this lab:** no project titles/cards, no client names, no "selected work" or case-study modules, no portfolio images as covers. Homepage marketing copy is likewise not article filler.

### 9.2 Stress fixtures (run on every template)

| Fixture | Purpose |
|---|---|
| Longest real title: `Cutting Deploy Time from 45 Minutes to Five` | wrapping in cards, preview panes, TOC-adjacent leads — no clipping |
| A 2-word title and a 4-line summary (labelled fixture record) | short/long card balance |
| 5 tags vs 1 tag on a record | chip-row wrapping |
| Missing cover image (broken src) on card **and** featured/preview slot | error placeholder, layout stability |
| Search returning exactly 1 record and 0 records; filter + search combined to 0 | empty states, count announcements, reset path |
| A 6-word category name | chip, rail and table overflow |
| The supplied code sketch at 360 px | horizontal scroll, label + copy reachability, no page-level overflow |
| Article at 200% text zoom equivalent (reader-control max, `BA19`) | measure cap held, TOC/progress still usable |

**Truncation policy:** prefer wrapping. If a clamp is unavoidable, use `-webkit-line-clamp` with an ellipsis **and** the full text available via a visually-hidden span or `title`. Never clamp to force a fixed card height, never clamp an article title to one line, and never clamp code.

### 9.3 Asset plan

- One deduplicated local media set under `blog-lab/assets/` with hashed, descriptive filenames, referenced by every template — not 40 copies of the same covers. Covers for the 12 real posts: use only assets verified/supplied in this repo or extracted as stable local copies at Gate 0 (record each cover's source); placeholder-record covers come from one small set of restrained, clearly original placeholder artworks (§5.4 honesty applies).
- Format WebP (AVIF where it helps), with explicit `width`/`height` and `aspect-ratio` to prevent CLS. Non-LCP images `loading="lazy"`; the LCP image (featured/listing lead cover, article opening image) never lazy-loaded.
- **Image policy:** use supplied repo imagery or clearly marked original placeholder artwork. If any generated placeholder art is used, label it as such in the gallery card and in `DECISIONS.md` — the corpus research itself flags generic AI cover imagery as a fading pattern, so placeholders must look like honest editorial placeholders (type/pattern/rule treatments), not fake photography. No hotlinking, no remote or expiring URLs. Portfolio project images (`homepage-compositor/review/shared/assets/work/…`) are **not** blog covers and must not be copied into this asset set.
- Alt text: descriptive for content covers, `alt=""` for decorative chrome; cover alt never just repeats the article title verbatim where the title is adjacent link text (state the convention in `DECISIONS.md`).

---

## 10. Performance and scale budget

| Budget | Limit |
|---|---|
| Total page weight (HTML + CSS + JS + referenced images) | ≤ 700 KB per template, ≤ 250 KB excluding images |
| Image payload per page | ≤ 350 KB (a 24–30-record listing must lazy-load/thumbnail covers — never ship 30 full covers eagerly) |
| Animation | transform/opacity only; no scroll handler that does layout work (scroll-spy/progress via rAF-throttled reads or `IntersectionObserver`) |
| LCP | identified per template, not lazy-loaded, not blocked by a JS animation init |
| INP | search/filter keystrokes stay responsive over the full local record set; no long tasks on interaction |
| CLS | zero from images (explicit dimensions), zero from tab/preview swaps, zero from reader-control defaults |
| Dependencies | none. No CDN, no font service, no runtime library, no CDN syntax highlighter |

**Anti-drift checks (must be scripted in the lab checker, §14):**

1. **Identical-skin detector** — compare computed type scales, measures, container widths, radius sets and colour sets across the 40; fail when two templates in the same family are visually near-identical (for BA, compare layout spine + TOC/progress treatment too, since prose tokens *should* converge). This is the check that actually prevents 40 recolours / 20 identical reading columns.
2. **Remote-URL scan** — fail on any `http(s)://` asset, font, script or highlighter reference.
3. **Dead-link scan** — fail on any local route that does not resolve (including article links with no BA target and TOC links with no heading target) and on any `href="#"` used as a destination.
4. **Token-lint** — fail on brand colours outside §5.1 (documented code-syntax tones excepted, inside code blocks only) and on radius/spacing values outside §5.3.
5. **Scope scan (split-specific)** — fail if any file under `blog-lab/` references `portfolio-lab/`, a `PL##`/`PD##` path, or `portfolio-blog-lab/`; fail if any doc created by this run sits outside the three §2 paths; fail if FIG 05 project titles appear as page content (the nav label "Portfolio" is chrome, not content).

---

## 11. Controlled-size contract (all 40 blog templates)

| Element | Desktop / tablet | Phone |
|---|---|---|
| Main content container | ~1080–1160 px; **max 1160 px** | Full width, 16–24 px gutters |
| Page H1 (listing + article title) | 40–52 px; **max 56 px** | 30–34 px; **max 36 px** |
| Section H2 / card title | H2 24–32 px; card titles 18–24 px | H2 22–28 px; card titles 18–22 px |
| Prose / metadata | Body 16–18 px, line-height 1.55–1.7, metadata ≥12 px; **measure 60–72 ch, max 720 px** | Body ≥16 px narrative prose; compact card text ≥14 px; metadata ≥12 px |
| Blog listing cover / preview | Card covers max 360 × 225 px; featured preview max 480 × 300 px | Within width; **max 200 px high** |
| Article opening image | **max 720 × 320 px**; no viewport-filling magazine cover | **max 220 px high** |
| In-article figures | within the 720 px measure; fixed aspect | within width |
| Code block | within the measure; internal horizontal scroll beyond it | internal horizontal scroll; ≥13 px mono held |
| Spacing / targets | Section padding 24–48 px; gaps 16–32 px; header 64–76 px | Section padding 20–32 px; 44 px targets |

**Full-bleed clarification:** a full-bleed *background* plane (as `hero-H09` does at 1440 px) is permitted, but the **content container inside it stays ≤1160 px**, the prose measure stays ≤720 px, and the H1/media caps still apply. Record any full-bleed usage in the concept card. No 80–124 px article headlines, no 500–600 px-tall covers, no giant drop-cap numerals eating the measure, no empty opening screens before the first paragraph. Record **measured** sizes (including the actual prose measure in px/ch) at 360, 390, 768, 1024 and 1440 px in both themes.

---

## 12. The 40 templates — direction assignments

Twenty materially distinct directions per family. `canon` = primary parent must come from §3.1; `secondary allowed` = a rubric-top-10 sample may be the declared secondary (or primary, within the 6-of-40 cap in §3.2).

### 12.1 `BL01–BL20` — blog listing

**Non-negotiable for all 20:** the §9.1 record set with its demo disclosure visible, every card/row carrying its own real article link, covers within §11 caps, declared sort order that filtering/search preserves, and the §7.1 discovery semantics for whatever search/filter/paging/tab/preview the direction includes.

| ID | Direction | Distinctness axis | Parent guidance |
|---|---|---|---|
| BL01 | Compact lead + readable list | density | canon |
| BL02 | Controlled ledger / magazine cards | surface/theme emphasis | canon |
| BL03 | Command-style searchable archive | chrome | secondary allowed (H08) |
| BL04 | Compact field / dispatch index | density | canon |
| BL05 | Editorial index + bounded selected-article preview | preview placement | canon |
| BL06 | Bento-modular feed with one large lead module | layout spine | canon (D03) |
| BL07 | Magazine cover wall, varied but capped covers | media treatment | canon |
| BL08 | Dense archive table (title · category · author · date · read time) | density | canon |
| BL09 | Sticky featured panel + list below | hierarchy | canon |
| BL10 | Category rail sidebar + chips, local results | navigation model | canon (S02) |
| BL11 | Chronological feed with date separators | layout spine | canon |
| BL12 | Image-dominant card grid within cover caps | media treatment | canon (S01) |
| BL13 | Typographic index, covers revealed on hover/select only | media treatment | canon |
| BL14 | Newsletter dispatch index (issue numbers, send-date feel) | chrome | canon |
| BL15 | Paged archive with honest local paging + `stagger-reveal` | navigation model | canon |
| BL16 | Split index: sticky preview pane mirrors the focused card | preview placement | secondary allowed (S03) |
| BL17 | Dark editorial index | surface/theme emphasis | canon |
| BL18 | Mobile-first stacked cards, thumb left | density | canon |
| BL19 | Tag-cloud + filtered ledger | navigation model | canon |
| BL20 | Latest / Featured / Archive tabs with view-transition-style swaps | interaction model | canon |

### 12.2 `BA01–BA20` — blog article

**Non-negotiable for all 20:** the same supplied featured article verbatim (§9.1) — full body, headings in supplied order, TypeScript sketch intact — inside the §11 measure/H1/image caps, with the §7.2 reading semantics for whatever TOC/progress/disclosure/reader feature the direction includes, and a working link back to the listing (at minimum the lab gallery + `BL01`).

| ID | Direction | Distinctness axis | Parent guidance |
|---|---|---|---|
| BA01 | Classic restrained reading column | density | canon |
| BA02 | Bounded ledger opening (no giant magazine cover) | media treatment | canon |
| BA03 | Compact technical field notes | density | canon |
| BA04 | Restrained chapters + contents | navigation model | canon |
| BA05 | Structured editorial report | hierarchy | canon |
| BA06 | Sticky sidebar TOC, scroll-spy, reading progress | navigation model | canon |
| BA07 | Marginalia layout — notes and captions in the side column | layout spine | canon |
| BA08 | Scrollytelling chapters, one pinned visual (progressive enhancement) | motion signature | secondary allowed (S10) |
| BA09 | Code-first layout: annotated TypeScript block as centrepiece | media treatment | canon |
| BA10 | Q&A / FAQ layout with native disclosures | interaction model | canon |
| BA11 | Interview-style long read with pull quotes | hierarchy | canon |
| BA12 | Timeline-driven migration story (Discovery → Stabilize) | layout spine | canon (D01) |
| BA13 | Results dashboard: supplied bullets as bounded cards | hierarchy | canon |
| BA14 | Checklist-style retrospective as the reading spine | density | canon |
| BA15 | Newsletter-issue article (issue header, footer navigation) | chrome | canon |
| BA16 | Dark reading mode with light content column | surface/theme emphasis | canon |
| BA17 | Minimal focus mode: TOC and related revealed on demand | interaction model | canon |
| BA18 | Two-column editorial with drop caps and rules | layout spine | canon |
| BA19 | Reader controls: text size and width toggles (labelled demo) | interaction model | canon |
| BA20 | Related-first ending: article closes into a bounded related grid | hierarchy | canon |

There are **no portfolio directions in this prompt.** If you catch yourself designing a dated project timeline with a shared crossfading preview, a client metadata rail, or a case-study gallery, stop — that is `portfolio-prompt.md` work.

---

## 13. Gate 1 — concepts, mappings and the selection rubric

**40 concept cards**, each with: ID/name/family · primary canon parent `combo_id` + source path + **both** rank values (user-preference /100 and rubric /45) with their scales named · ≥3 concrete inherited patterns · ≥1 corpus reference (from `docs/RESEARCH-BLOG-UI.md`) with what is borrowed · secondary source where used · desktop and phone composition · size bounds (incl. declared prose measure for BA) · interaction spec with named motion signature(s) — for BL cards this must spell out search/filter/paging/tab/preview behaviour, for BA cards the TOC/progress/disclosure/reader behaviour · accessibility plan (semantics, focus, live region, reduced motion, no-JS) · media/data plan (which records, which covers, demo-disclosure placement) · content risks (verbatim fidelity, placeholder labelling) · one-sentence distinctness claim.

**Table 1 — parent mapping (40 rows):** `template_id | family (BL/BA) | canon parent | parent path | user rank | rubric rank | inherited patterns | corpus refs | secondary parent`.

**Table 2 — distinctness matrix (40 rows × axes):** `layout spine`, `preview placement`, `chrome`, `density`, `media treatment`, `hierarchy`, `navigation model`, `motion signature`, `surface/theme emphasis`. **Gate fails if two templates in a family share both primary axis and motion signature.** For BA rows also record `measure + TOC/progress treatment` — two articles differing only in header styling fail this gate even if their axis labels differ.

**Table 3 — motion coverage:** one row per catalog signature with usage count, reduced-motion and no-JS behaviour. No signature may be primary on more than **6 of the 40** (pro-rata from 12/80).

**Selection rubric (define before building, apply at Gate 3)** so a reviewer can pick 1 of 20 per family:

| Criterion | Weight |
|---|---|
| Reading comfort — measure, line-height, density, dark-reading quality (BA) / scanability (BL) | 20 |
| Discovery quality — search/filter/paging honesty and speed to the right article (BL) / in-article navigation (BA) | 15 |
| Brand fit to the canon (tokens, FIG voice, chrome) | 15 |
| Accessibility and keyboard quality (TOC, tabs, disclosures, code, focus) | 15 |
| Motion quality and restraint (reading never waits for animation) | 10 |
| Distinctiveness within its family | 10 |
| Responsive behaviour at 360 and 1440 | 10 |
| Build feasibility for production handoff (incl. real-data swap for the demo records) | 5 |

Record a score sheet per family and one recommendation (**one BL winner + one BA winner**) with rationale. Recommend a *pairing* note as well: which BL and BA winners work as one production journey from index to finished article.

---

## 14. Output layout

```text
blog-lab/
  index.html                     # gallery: all 40, grouped BL / BA, filterable
  assets/                        # deduplicated local cover/media only (§9.3)
  shared/                        # tokens.css + base.css only (see below)
  blog-listing/BL01-…/index.html … BL20-…/index.html
  blog-article/BA01-…/index.html  … BA20-…/index.html
  manifest.json                  # 40 records: id, family, canon parent, ranks, corpus refs, motion, verification
  audit.json                     # machine-readable audit results per template
  DECISIONS.md                   # preview-selection pattern, related-posts rule, article linking rule,
                                 # volatile-counts presentation, cover-alt convention, image policy, exceptions
  tools/check-blog-lab.*         # the lab checker (§10 anti-drift + Gate 3 audits), documented in the gallery
```

- Plus the three docs (§2): `docs/RESEARCH-BLOG-UI.md`, `docs/TOP10-CANON-SPEC-BLOG.md`, `docs/BLOG-DESIGN-ANALYSIS.md`. **Nothing else.** In particular: no `portfolio-blog-lab/`, no `portfolio-lab/`, no portfolio docs, no edits to homepage labs, compositor output, rank lists or screenshots.
- `shared/` may hold **only** tokens, resets and primitives. Each template carries its own layout skin; if sharing starts erasing differences or causing collisions, inline it. `blog-lab/shared/` is this lab's own — never import from a sibling `portfolio-lab/shared/` (it may not exist, and the labs must run independently; identical token *values* come from §5, not from a shared file). The local record set is lab data: define it once (e.g. `blog-lab/shared/records` data your templates render from, or a documented copy-identical block) so counts and placeholder labels can never drift between BL templates — and whichever mechanism you choose, every BL page must still render its full unfiltered list with JS off.
- Every template renders standalone over relative paths from the repo root, links to the blog gallery, and has next/previous variant navigation **within its family**. Listing ↔ featured article link both ways (the §9.1 linking rule governs the other records).
- Add one shared `@media print` block (articles get printed/saved by readers; print output is clean prose + code, no chrome, no sticky panels).
- Preview: `python3 -m http.server 8127` from the repo root → `/blog-lab/` (8124 = homepage lab hub, 8125 = compositor, 8126 = portfolio lab if built).

**Gallery requirements (40 items must be reviewable):** filter by family, canon parent, motion signature, verification status; **side-by-side comparison of 2–4 templates** (including a BL+BA pairing view and a reading-measure overlay for BA comparison); a contact-sheet mode; per card show canon parent, corpus references, motion signature and QA status; a "compare against the live page" link per family (`/blog` for BL, the featured-article route for BA), following the precedent of `homepage-compositor/review/live-nestlancer-preview.html`.

**Verification status per template** must be one of `machine-audited`, `browser-verified`, `not verified` — the repo's own review records that no browser engine was available, so do not upgrade a status you did not earn.

---

## 15. Work sequence and gates

**Gate R — Research corpus.** ≥60 blog/editorial domains, per-site records, 2026 synthesis, conflict list, 8–10-signature motion catalog. Fails under 60 domains, on missing observation methods, on portfolio-only sites counted without blog/article pages, or on an uncited synthesis.

**Gate 0 — Canon and baseline.** `git status`; `python3 tools/audit-samples.py` still passes; read the 13 canon samples; measure the 10 canon pages; re-open the two live blog routes; freeze the 12-post + verbatim-article content truth (halt and report if the article cannot be verified — §6.5); write `docs/TOP10-CANON-SPEC-BLOG.md` and the matrices in `docs/BLOG-DESIGN-ANALYSIS.md`.

**Gate 1 — Concepts.** 40 concept cards + three mapping tables + rubric definition (§13). Fails on duplicate axis+signature pairs (BA: including measure/TOC-treatment duplicates), on any template without a canon parent and a blog-corpus reference, on more than 6 secondary-primary variants, or on any concept whose data plan hides the demo disclosure or rewrites the article.

**Gate 2a — Pilot (2 pages).** One BL + one BA template. Measure at all five widths and both themes (including measured prose measure), run `tool-3` contrast (prose **and** code) and the five anti-drift checks (§10), exercise the interactions end-to-end: search to 1 and to 0 results, category filter + reset, paging to the end, TOC scroll-spy + progress, code copy at 360 px, follow a card into the article and back, reduced motion, no-JS full read. Record results. Do not proceed until the pilot passes.

**Gate 2b — Full build.** All 40 pages plus gallery, manifest and checker, in two family batches (BL batch, then BA batch — or interleaved pairs, recorded either way). Keep manifests, concept cards, parent mappings, the single record set, gallery labels and thumbnails synchronised. Preserve existing URLs; do not rebuild or alter the 21,600 homepage compositions or the original top-50 hand-offs; do not touch `portfolio-lab/` if it exists.

**Gate 3 — Verify and critique.**

- Run the repo's existing audit scripts unmodified (`python3 tools/audit-samples.py`, the `tools/ui-review-suite/` tools that apply) plus the new blog-lab audit (links + TOC targets, unique IDs, landmarks/headings, alt text, image dimensions, remote-URL scan, dead links, token-lint, identical-skin detector, **scope scan**, JS syntax, no-JS readability, size + measure caps, motion-signature presence, canon-parent resolution, corpus-reference presence, verbatim-article diff against the Gate 0 freeze, placeholder-labelling check).
- Exercise every interaction: blog search (typing, clearing, counts), categories/tags, paging/load-more to exhaustion, `BL20` tabs by keyboard, preview mirroring where present; article TOC/scroll-spy, progress, disclosures, reader controls at their extremes, code copy success + failure, share copy fallback, and any safe labelled demo controls (cookie banner, subscribe). Verify reduced motion and no-JS on both families, plus print output.
- Inspect rendered pages at 360/390/768/1024/1440 in both themes **if a browser is available**. If not, say so explicitly and do not claim screenshot QA or measured overflow checks.
- Record measured H1 sizes, container widths, **prose measures**, cover/preview dimensions and code-block behaviour at all five widths and both themes. Reject oversize and over-measure states, not just horizontal overflow.
- Apply the selection rubric, score each family, and recommend **one BL winner and one BA winner** (plus the pairing note) with rationale.
- Classify every finding: **blocker** (broken link/TOC target, failed contrast incl. code, keyboard trap, oversize/over-measure breach, missing state, altered article text, unlabelled placeholder passed off as real) · **major** (missing reduced-motion path, unstable swap layout, weak hierarchy, fake-feeling search) · **minor** (spacing, copy polish). No blocker may remain open at hand-off.
- Write findings, known issues, verified vs not verified into `docs/BLOG-DESIGN-ANALYSIS.md`, and log design calls in `blog-lab/DECISIONS.md`.
- Finish by reporting file paths, the local run command (`python3 -m http.server 8127`), verification results and limitations. State explicitly that no portfolio artifact was created or modified.

---

## 16. Hard constraints

- **Do not** push, commit, create/switch/rename a branch.
- **Do not** modify or delete existing homepage sample folders, locked copy, rank-list records, screenshots or compositor generator outputs.
- **Do not** do portfolio work: no `PL`/`PD` templates, no `portfolio-lab/`, no portfolio research/analysis/canon docs, no project timelines/shared project previews, no case-study content, no FIG 05 project modules, no portfolio images as article covers. Do not create the combined `portfolio-blog-lab/` folder.
- **Do not** present the user-preference score or the rubric score as a user study, readership proof, or independent verification of any claim inside the featured article.
- **Do not** rewrite, abridge, "fix", extend or re-conclude the featured article; do not invent article statistics, author bios, testimonials, social accounts, or additional real posts beyond the verified 12.
- **Do not** hide the demo-data disclosure, pass labelled placeholders off as real posts (in-page, in the gallery, or in `manifest.json`), or hard-code signed/expiring cover URLs.
- **Do not** ship production-looking controls that cannot work in a static demo without disclosing their demo status (search scope, subscribe, reader-control persistence, cookie banner).
- **Do not** present a research corpus you did not open; unopened entries are marked not verified. Do not borrow the portfolio corpus's entries or count.
- **Do not** ship remote or expiring media URLs, broken local routes or TOC targets, `href="#"` destinations, external CDNs, font services or CDN syntax highlighters.
- **Do not** introduce brand colours outside §5.1 (code-block syntax tones are the single documented exception), radii/spacing outside §5.3, or differentiation limited to colour, border radius and header styling.
- **Do not** waive the size/measure contract (§11) because a 2026 editorial trend uses larger headlines, covers or full-viewport opening screens.

---

## 17. Completion checklist (blog — 40 templates)

- [ ] ≥60 distinct blog/editorial domains audited with per-site records and observation methods; ≥15 article audits, ≥8 code-block observations
- [ ] 2026 synthesis with cited evidence, trend + blog-pattern counts, fading patterns, browser-support reality check
- [ ] Conflict list between 2026 editorial trends and the §11 size/measure contract, with adaptations
- [ ] Motion catalog of 8–10 named signatures (incl. stagger-reveal + measure-progress) with timing, reduced-motion and no-JS behaviour
- [ ] `docs/TOP10-CANON-SPEC-BLOG.md`: 10 canon pages and 13 samples measured, with file-path evidence
- [ ] Two rank lists quoted with their scales; no rubric/model score called a user study
- [ ] Both live blog pages audited and compared with screenshots `002`/`003`; 12-post index + verbatim article frozen with sources
- [ ] View/comment volatile-counts handling + article linking rule + related-posts rule recorded in `blog-lab/DECISIONS.md`
- [ ] Token, radius/spacing and brand-keep rules applied; token-lint passes on all 40 (code tones documented)
- [ ] Contrast measured in both themes on all 40 — prose, muted metadata **and** code tokens; `--line` never used for meaningful boundaries
- [ ] Discovery semantics (§7.1) implemented: honest local search/filter/paging/tabs, live-region counts, focus retained, demo scope disclosed
- [ ] Reading semantics (§7.2) implemented: TOC + `aria-current` scroll-spy, honest progress semantics, verbatim code block with working copy, labelled reader controls within caps
- [ ] Landmarks, single `h1`, skip link, 44/24 px targets, `type="button"` toggles; no banned ARIA (`progressbar` never inside a list)
- [ ] `prefers-reduced-motion` covers hover, staggers, swaps, pinned/scrolly effects and smooth-scroll; reading never requires motion
- [ ] Blog component inventory implemented with every required state; empty (zero-result) and error states present
- [ ] Chrome checklist passes on all 40; no empty mobile drawer; no `href="#"` destinations; nav unchanged
- [ ] All 20 BL pages render the single §9.1 record set (12 real + labelled placeholders = 24–30) with the demo disclosure visible
- [ ] All 20 BA pages present the same supplied article **verbatim** (diff-checked), TypeScript sketch intact, supplied heading order kept
- [ ] Content stress fixtures (§9.2) run on all 40; truncation policy respected; code never clipped at 360 px
- [ ] Asset plan honoured: deduplicated `blog-lab/assets/`, explicit dimensions, labelled placeholder art, no portfolio images as covers
- [ ] Performance budget met; five anti-drift checks pass (identical-skin, remote URL, dead link, token-lint, **scope scan**)
- [ ] Exactly 20 `BL` + 20 `BA` templates (40 total), all standalone and readable with JS off; **zero** portfolio files created or modified; no `portfolio-blog-lab/`
- [ ] Gallery: filters, 2–4-up comparison incl. BL+BA pairing + measure overlay, contact sheet, QA status per card, live-page comparison
- [ ] Every template resolves to a canon parent **and** a blog-corpus reference, with visible inherited patterns
- [ ] ≤6 templates use a rubric-top-10 sample as primary; each labelled; one chrome family per page
- [ ] Size + measure contract measured and satisfied at 5 widths × 2 themes; print block verified
- [ ] Selection rubric applied; one recommended BL winner + one BA winner (+ pairing note) with rationale
- [ ] Findings classified blocker/major/minor; no blocker open
- [ ] `manifest.json`, `audit.json`, `DECISIONS.md` and gallery in sync with the real files
- [ ] Existing homepage lab intact; `tools/audit-samples.py` still passes; no commit/branch/push performed