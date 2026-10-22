# Nestlancer Portfolio + Blog Page Lab — AI Agent Prompt

> **Use this prompt with the `nestlancer/ui-designing-homepage` repository open as the working directory.**
>
> **v4 supersedes `blog-portfolio-prompt-v3.md`, which supersedes `blog-portfolio-prompt.md`.** v4 keeps v3's research corpus, 80-template scale, timeline/crossfade rule, size contract and honesty policy, and adds four things v3 was missing: a **Top-10 canon** as the single derivation source, a **prescriptive design-token specification**, an **accessibility and interaction contract**, and a **component/state, content, performance and reviewability specification**.
>
> **Do not push, commit, create or switch a branch.** Preserve the active branch, all existing homepage artifacts, the rank-list records and the current template URLs.

---

## 1. Role and outcome

Act as a senior product designer, UI/motion researcher, accessibility-minded frontend engineer, and critical design reviewer. Extend this repository into a **separate portfolio/blog page-template lab** without changing the homepage work.

Deliverables, in order:

1. `docs/RESEARCH-100-BLOG-PORTFOLIO-UI.md` — research corpus of **≥100 distinct, currently accessible** blog/editorial/portfolio sites, audited for UI design and animation, plus the 2026 synthesis (§4).
2. `docs/TOP10-CANON-SPEC.md` — the Top-10 canon audit: each of the 10 compositions measured for type scale, container width, spacing rhythm, chrome geometry, card treatment and motion, in light and dark (§3, §5).
3. `docs/PORTFOLIO-BLOG-DESIGN-ANALYSIS.md` — the 13-sample matrix for the canon, the four live production-page audits, and verification findings (§6).
4. **80 responsive, navigable HTML templates** — 20 each for portfolio listing, portfolio case study, blog listing and blog article — in `portfolio-blog-lab/`, plus one gallery, manifest and checker.

Every template must trace to **(a)** one of the ten canon compositions and **(b)** at least one corpus entry. A shared palette alone is not derivation. 80 recolours is a failure.

Reference production pages: `/portfolio`, `/portfolio/b2b-portal-ux`, `/blog`, `/blog/cutting-deploy-time-from-45-minutes-to-five` on `app.nestlancer.com`.

---

## 2. What changed in v4

| | v3 | v4 |
|---|---|---|
| Derivation source | any of the top 50 | **the Top-10 canon only** (rubric top-10 available as a declared secondary for ≤12 variants) |
| Design tokens | not specified | **prescriptive token tables**, extracted from the canon samples, with contrast measured |
| Accessibility | intentions | **testable contract**: selection semantics, landmarks, focus management, WCAG 2.2 numbers, banned defect patterns |
| Components | none | **inventory + state matrix + chrome checklist** |
| Content | implicit | **data plan, stress fixtures, asset plan, image policy** |
| Performance | none | **per-page budget + identical-skin detector** |
| Review at 80 items | gallery only | **selection rubric, defect severity, verification status, before/after benchmark, decision log** |

---

## 3. The Top-10 canon (v4 core)

This repo publishes **two different top-10 lists that do not agree**. Verified from the repo, not assumed:

| List | Source | Scale | Top-10 flavour |
|---|---|---|---|
| **User-preference rank** | `rank-list.html` (also `homepage-compositor/review/rank-list.html`), `data-userrank` / `data-userscore`, default sort `userrank` | /100 with persona sub-scores | `P01` solid header · `H01`/`H07` heroes · `D01`/`D03` delivery · `M05` · `W05` · `S01`/`S02` · `C01`/`C03` · `P01`/`P05` footers |
| **Rubric/compositor rank** | `homepage-compositor/review/summary.json`, `tools/review.mjs`, 9 aspects | /45 | `P04` pill header · `H08` glass command rail · `D03`/`D10` · `M04`/`M01`/`M05` · `W05` · `S03`/`S10` · `C04` · `P04` |

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

**Only 13 distinct samples appear across these ten pages**: header `P01`; heroes `H01`, `H07`; delivery `D01`, `D03`; financial `M05`; why `W05`; work `S01`, `S02`; CTA `C01`, `C03`; footers `P01`, `P05`. That tight vocabulary is the point — it is what makes 80 pages recognisably one brand. **These 13 files are the lab's visual grammar.** Read every one of them (markup, CSS, JS) before designing.

### 3.2 Secondary set (rubric top 10) — declared exceptions only

The rubric top 10 contributes a different vocabulary: `P04` pill/float header, `H08` glass command rail, `D10` magnetic stack, `M01` broadsheet, `M04` rails terminal, `S03` split viewer, `S10` sticky showcase, `C04` editorial endnote.

Rules:

- A template may use a rubric-top-10 sample as a **secondary** pattern source, and at most **12 of the 80** templates may use one as their **primary** parent.
- Any such template must label the secondary parent in its gallery card and in `manifest.json`, and must explain why the direction needs it (glass chrome, terminal ledger, split master/detail, sticky showcase).
- Directions that need it: `PL03` command rail, `PL13` terminal-log timeline, `PL18` master/detail split, `PD03`/`PD19` command metadata rail, `BL03` command archive, `BA15`-style chrome variants, plus any terminal/dossier direction.
- **Never mix more than one chrome family per page.** A page is either `P01` solid-bar grammar or `P04` floating-pill grammar, not both.

### 3.3 Canon measurement requirement

For each of the 10 canon pages and each of the 13 samples, record in `docs/TOP10-CANON-SPEC.md`: measured H1/H2/body sizes, container width, section padding rhythm, header height, card radius and border, shadow, mono-eyebrow treatment, motion inventory with durations, and light/dark token values actually used. Quote the file path as evidence. Where a value can only be reasoned from CSS because no browser engine was available, say so.

---

## 4. Gate R — the 100-site research corpus

Write `docs/RESEARCH-100-BLOG-PORTFOLIO-UI.md`.

**Corpus composition — minimum 100 distinct domains** (tier minimums sum to 117):

| Tier | Min | What counts |
|---|---|---|
| A · Editorial & blog | 45 | Company/tech blogs, design and culture magazines, independent writers, journalism and newsletter sites |
| B · Portfolio & case study | 35 | Studio, agency and individual portfolios with work indexes **and** case-study pages |
| C · Award / trend references | 25 | 2026 award winners and trend roundups (Awwwards, Web Design Awards, WebAward, curated lists) |
| D · Reading-experience references | 12 | Sites strong in long-read UX: sticky TOC, reading progress, typography controls, code blocks, related-post logic |

**Per-site record (all 100+):** # / domain / URL audited / access date / observation method (`live render`, `DOM/text extraction`, `screenshot`, `secondary source`) / category / page-type tag (`listing`, `detail`, `both`) / layout archetype / typography system / image and media treatment / navigation and chrome / **each animation with trigger, approximate duration, easing, and whether it moves content or only decoration** / micro-interaction states / colour and surface model + dark mode / reading-UX specifics / performance and a11y observations / **transferable pattern** / **risk to not copy** / which template IDs it informs.

Rules: 100 distinct **domains**; dead, paywalled or JS-walled entries capped at 10% and labelled; no fabricated sites; anything not opened is marked **not verified**.

**Quality bar:** ≥30 entries with a real timed animation observation; ≥20 with dark-mode or theme-switching observations.

**2026 synthesis** — every claim cites corpus entries or a named external source:
- Trend families with counts and 3+ example domains (editorial/serif revival, kinetic and variable type, CSS scroll-driven animation, scroll progress, bento-modular feeds, pinned chapters, view transitions, grain/tactile surfaces, restrained "barely-there" UI, dark editorial modes).
- Motion patterns with observed duration ranges and triggers.
- What is fading (full scroll-jacking, generic AI imagery, animation on everything) and the evidence.
- **Browser-support reality check.** Public 2026 sources contradict each other on scroll-driven animation support across engines. Do not assert support from memory; state what you verified, and build every scroll-driven effect as **progressive enhancement** with an `IntersectionObserver`/class-toggle fallback.
- **Conflict list against §11's size contract.** 2026 editorial work uses viewport-filling headlines; this lab's caps are hard limits and are not waived by a trend. For each conflict, state what is kept (rhythm, hierarchy, motion, restraint, surface) and what is refused (absolute scale).
- **Motion catalog** of 10–14 named signatures with trigger, duration range, easing, animated properties (transform/opacity only), reduced-motion behaviour, no-JS behaviour, and permitted usage. Every template references at least one by name.

---

## 5. Design-token specification (prescriptive)

Values below were extracted from the canon samples' own CSS. Use these tokens; do not invent new brand colours. Where a template needs an extra tone, derive it from these and record it in `docs/TOP10-CANON-SPEC.md`.

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

**Rule:** `--line` is a decorative hairline. Any border that conveys meaning — input boundary, selected state, timeline spine, focus ring, table structure — must reach **3:1** against its neighbour; use `--teal`, `--teal-soft` over `--bg`, `--ink-2` or a dedicated `--line-strong` you add and document.

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

These are documented must-keeps for the homepage lab and carry into the new lab:

- The **mono FIG eyebrow** on every major block (`FIG · Work`, `FIG · Timeline`, and equivalents for blog).
- **Hairline borders** and soft shadow on card/window surfaces; radius from §5.3 only.
- **Product-window chrome** (three dots, mono title, chip) where a UI mock is shown.
- Locked copy and the "illustrative / not a live checkout" disclaimers stay intact wherever homepage content appears.
- Real logo assets from `assets/` — never redrawn, stretched or recoloured.
- Restrained navy/teal/mint palette; no new brand hues.

### 5.5 Dark-mode craft rules

No pure black (`#000`) surfaces; keep the `--bg`/`--surface`/`--surface-2` three-step ramp. Hairlines must stay visible without becoming borders. Do not invert accent relationships — `--teal` stays the accent and `--teal-hover` stays darker/lighter in the same direction as the token table. Photographs get a slight luminance treatment (no white flash at load) and never a hard white frame. Re-measure contrast in dark; the ratios above are the floor, not the ceiling.

---

## 6. Gate 0 — repository baseline

1. `git status`; never overwrite uncommitted changes.
2. Baseline the existing lab: `python3 tools/audit-samples.py` must still pass on its current file set before you touch anything.
3. Read the 13 canon samples in full (markup, CSS, JS) plus the four production-page extracts.
4. Re-open the four live routes at desktop and mobile where possible; label each observation `live render` / `DOM extract` / `screenshot` / `source`.
5. Carry the two known data inconsistencies forward rather than copying them silently:
   - Portfolio listing labels **Fintech Payments Hub** as `E-Commerce`, contradicting its title/description. Record it; treat any correction as a documented taxonomy decision in `DECISIONS.md`, not a claim about a production fix.
   - Article metadata shows `5 views` in the lead and `2 comments` later. Treat counts as dynamic snapshots; never reconcile them into fixed evidence.
6. Write the 13-sample matrix, the 10-row canon matrix and the four-page audit into `docs/PORTFOLIO-BLOG-DESIGN-ANALYSIS.md`.

---

## 7. Accessibility and interaction contract

### 7.1 Selection semantics (all 20 PL pages)

Pick **one** pattern and implement it fully — record the choice in `DECISIONS.md`:

- **Recommended:** an ordered list of projects where each item's preview control is `role="radio"` inside `role="radiogroup"` (or a native radio input visually styled), with `aria-checked`, roving tabindex, Arrow Up/Down/Left/Right to move, Home/End to jump, Space/Enter to select, and an `aria-live="polite"` status region announcing the selected project.
- Alternative: `role="tablist"` with `role="tab"`/`aria-selected` + `role="tabpanel"`, if the preview reads as a panel.
- `aria-pressed` alone on a list of buttons is acceptable only if arrow-key navigation and a live region are also implemented.
- **Never** rely on click alone: every project must be selectable from the keyboard, and `View case study` must be reachable without selecting the project first.

### 7.2 Structure and focus

- Exactly one `h1`; no skipped heading levels; landmarks `header / nav / main / aside / footer`; every `nav` gets an `aria-label`; a working skip link to `main`.
- No `aria-label` on role-less `div`s (use `role="group"` or a real element). No contradictory ARIA (`aria-hidden` + `aria-label` on the same element). No `progressbar` inside `role="list"`. Every toggle is `<button type="button">`.
- **Focus management:** filtering, tab switching, crossfade swaps and view-transition-style changes must not lose or trap focus. After a filter changes, focus stays on the control and the live region announces the result count. The active TOC entry gets `aria-current="true"` (scroll-spy), and scroll-spy must not scroll the page on its own.
- **Target size (WCAG 2.2):** 44×44 px preferred for primary controls, 24×24 px absolute minimum (SC 2.5.8), with spacing so adjacent targets cannot be hit together. The homepage lab shipped 22 px footer links — do not repeat that.
- **Contrast (WCAG 2.2 AA):** 4.5:1 normal text, 3:1 text ≥18.66 px bold or ≥24 px, 3:1 for UI component boundaries and meaningful graphical objects (SC 1.4.11), 3:1 for the focus indicator (SC 2.4.13). Run `tools/ui-review-suite/tool-3-color-contrast-seams.mjs` against every template in both themes and record the ratios.
- **Reduced motion:** `prefers-reduced-motion: reduce` must neutralise entrance animation, hover transitions, marquees, pinned scroll and crossfades — immediate swap, no fade. All 13 canon samples already do this; the new pages must too.
- **No JS:** every record, every case-study link and every article link must be reachable; preview/selection controls must not render as operable when JS is absent.

### 7.3 Motion contract

- One primary signature per template from the Gate R catalog, with declared duration and easing; at most one pinned/sticky motion effect and one entrance stagger per page.
- Animate **transform and opacity only**. Never animate `top`/`height`/`width`/`margin` for scroll effects. No animation may move text under a pointer, delay reading, or block a control.
- Crossfade on the shared preview: **200–260 ms**, constant frame dimensions, selected image ends at full opacity.
- Scroll-driven CSS (`animation-timeline: scroll()/view()`, `animation-range`, `animation-duration: auto`) only as progressive enhancement with a verified non-supporting fallback, and only after recording what support you actually tested.
- No JS animation libraries, no CDN. Plain HTML/CSS/JS plus `IntersectionObserver`.

---

## 8. Component inventory and state matrix

Define once, reuse across all 80. Every component lists the states it must implement; a template may restyle a component but may not drop a state.

| Component | Required states |
|---|---|
| Button — primary / ghost / icon | default · hover · focus-visible · active · disabled · loading |
| Chip / tag / filter pill | default · hover · focus-visible · selected (`aria-pressed`/`aria-checked`) · disabled |
| Search input | empty · typing · focus · no-results · cleared; visible label, `type="search"`, honest demo disclosure |
| Select / sort control | closed · open · focus · selected; native element or full listbox keyboard model |
| Pagination / load-more | page states · current (`aria-current="page"`) · disabled ends · loading · end-of-list message |
| Tabs | `tablist`/`tab`/`tabpanel`, arrow keys, `aria-selected`, focus retention |
| Accordion / disclosure | native `details`/`summary` preferred; expanded/collapsed; focus visible |
| Code block | language label · horizontal scroll on narrow widths (never clipped) · copy button with real "Copied" feedback · syntax tokens passing contrast in both themes · no CDN highlighter |
| Table (archive listings) | header semantics (`th scope`), zebra or rule separation, horizontal scroll wrapper with a visible affordance on phones |
| Empty state | illustration-free or simple inline SVG, one line of copy, one recovery action |
| Error state | what failed, why, what the user can do; never a silently empty region |
| Loading state | honest local states only; never simulate a network call |
| Cookie banner | Accept/Dismiss, keyboard-operable, no persistence claim, labelled as a demo |
| Share row | Copy with real clipboard fallback, LinkedIn/X as real external links or labelled placeholders |
| Author block / byline | name, role, date; no invented bios |
| Related-post cards | image, title, category, read time; identical component across BA pages |
| TOC | `nav aria-label`, `aria-current` on active, scroll-spy without hijacking scroll |
| Reading progress bar | `role="progressbar"` outside any list, `aria-valuenow` updated |
| Timeline spine + node | ordinal/date marker, selected node, spine fill, keyboard-reachable nodes |
| Image frame | fixed aspect, `object-fit: contain/cover` declared, `alt` text, error placeholder |
| Theme toggle | `<button type="button">`, `aria-pressed`, persisted via `localStorage`, visible at all widths |

**Chrome checklist per template:** all seven nav links present at mobile widths; the mobile drawer is **not empty** and carries Sign in + Start a project; the theme toggle works and persists; both CTAs reachable; no `href="#"` used as a destination — every control is a button or a real link.

---

## 9. Content, data and assets

### 9.1 Data plan

- **Portfolio:** the 8 real projects in verified newest-first order, all dated Oct 2026. Do not invent durations, extra dates, clients, budgets or outcomes.
- **Case study:** only the supplied sections (`Overview`, `What we shipped`, `Outcomes`, metadata, gallery, stack, closing CTA) and the real client (`Harbor Ops`).
- **Article:** the supplied body, headings, bullets and the TypeScript sketch, verbatim.
- **Blog listing:** use the **12 known real posts**. Because the live index says `Showing 1–12 of 110`, build **24–30 local records**: the 12 real titles plus clearly labelled neutral placeholders whose titles state their placeholder status. Disclose in-page that this is demo data, not the production database. Never hard-code signed or expiring S3 URLs.
- Dates, read times, authors and view counts: only `Oct 5, 2026` and `2 min read` are known for the featured article. For placeholders use obviously neutral values and label them.
- The taxonomy correction (Fintech Payments Hub) and the view/comment inconsistency go in `DECISIONS.md`.

### 9.2 Stress fixtures (run on every template)

| Fixture | Purpose |
|---|---|
| Longest real title: `Cutting Deploy Time from 45 Minutes to Five` | wrapping, no clipping |
| A 2-word title and a 4-line summary | short/long balance |
| 5 stack tags vs 1 tag | chip-row wrapping |
| Missing image (broken src) | error placeholder, layout stability |
| Single search result and zero results | empty states |
| A 6-word category name | chip and rail overflow |

**Truncation policy:** prefer wrapping. If a clamp is unavoidable, use `-webkit-line-clamp` with an ellipsis **and** the full text available via a visually-hidden span or `title`. Never clamp to force a fixed card height, and never clamp a title to one line.

### 9.3 Asset plan

- One deduplicated local media set under `portfolio-blog-lab/assets/` with hashed, descriptive filenames, referenced by every template — not 80 copies of 8 project images.
- Format WebP (AVIF where it helps), with explicit `width`/`height` and `aspect-ratio` to prevent CLS. Non-LCP images `loading="lazy"`; the LCP image never lazy-loaded.
- **Image policy:** use supplied repo imagery or clearly marked original placeholder artwork. If any generated placeholder art is used, label it as such in the gallery card and in `DECISIONS.md` — the corpus research itself flags generic AI imagery as a fading pattern. No hotlinking, no remote or expiring URLs.
- Alt text: descriptive for content images, `alt=""` for decorative chrome.

---

## 10. Performance and scale budget

| Budget | Limit |
|---|---|
| Total page weight (HTML + CSS + JS + referenced images) | ≤ 700 KB per template, ≤ 250 KB excluding images |
| Image payload per page | ≤ 350 KB |
| Animation | transform/opacity only; no scroll handler that does layout work; compositor-only where possible |
| LCP | identified per template, not lazy-loaded, not blocked by a JS animation init |
| INP | no main-thread work competing with tap/keypress; no long tasks on interaction |
| CLS | zero from images (explicit dimensions) and zero from animated type (size-locked blocks) |
| Dependencies | none. No CDN, no font service, no runtime library |

**Anti-drift checks (must be scripted):**
1. **Identical-skin detector** — compare computed type scales, container widths, radius sets and colour sets across templates; fail when two templates in the same family are visually near-identical. This is the check that actually prevents 80 recolours.
2. **Remote-URL scan** — fail on any `http(s)://` asset, font or script reference.
3. **Dead-link scan** — fail on any local route that does not resolve and on any `href="#"` used as a destination.
4. **Token-lint** — fail on brand colours outside §5.1 and on radius/spacing values outside §5.3.

---

## 11. Controlled-size contract (applies to all 80)

| Element | Desktop / tablet | Phone |
|---|---|---|
| Main content container | ~1080–1160 px; **max 1160 px** | Full width, 16–24 px gutters |
| Page H1 | 40–52 px; **max 56 px** | 30–34 px; **max 36 px** |
| Section H2 / card title | H2 24–32 px; card titles 18–24 px | H2 22–28 px; card titles 18–22 px |
| Prose / metadata | Body 16–18 px, metadata ≥12 px; measure 60–72 ch, max 720 px | Body ≥16 px narrative; compact card text ≥14 px; metadata ≥12 px |
| Portfolio timeline thumbnail | 128–240 × 80–150 px; **max 280 × 176 px** | 128–240 px wide, never wider than its card; **max 280 × 176 px** |
| Shared portfolio preview | **max 480 × 300 px**, stable frame, `object-fit:contain` | Within card width; **max 200 px high** |
| Detail/article opening image | **max 720 × 320 px**; no viewport-filling cover | **max 220 px high** |
| Blog listing cover / preview | Card covers max 360 × 225 px; featured preview max 480 × 300 px | Within width; **max 200 px high** |
| Spacing / targets | Section padding 24–48 px; gaps 16–32 px; header 64–76 px | Section padding 20–32 px; 44 px targets |

**Full-bleed clarification:** a full-bleed *background* plane (as `hero-H09` does at 1440 px) is permitted, but the **content container inside it stays ≤1160 px** and the H1/media caps still apply. Record any full-bleed usage in the concept card. No 80–124 px headlines, no 500–600 px-tall photographs, no giant decorative numbers, no empty opening screens. Record **measured** sizes at 360, 390, 768, 1024 and 1440 px in both themes.

---

## 12. The 80 templates — direction assignments

Twenty materially distinct directions per family. `canon` = primary parent must come from §3.1; `secondary allowed` = a rubric-top-10 sample may be the declared secondary (or primary, within the 12-variant cap).

### 12.1 `PL01–PL20` — portfolio listing

**Non-negotiable for all 20:** visible dated chronological spine, all eight projects newest-first, medium thumbnails, image click selects into **one shared preview** with a 200–260 ms crossfade, `View case study` a separate explicit link.

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

### 12.3 `BL01–BL20` — blog listing

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

### 12.4 `BA01–BA20` — blog article

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

---

## 13. Gate 1 — concepts, mappings and the selection rubric

**80 concept cards**, each with: ID/name/family · primary canon parent `combo_id` + source path + **both** rank values (user-preference /100 and rubric /45) with their scales named · ≥3 concrete inherited patterns · ≥1 corpus reference with what is borrowed · secondary source where used · desktop and phone composition · size bounds · interaction spec with named motion signature(s) · accessibility plan (selection semantics, focus, live region, reduced motion, no-JS) · media plan · content risks · one-sentence distinctness claim.

**Table 1 — parent mapping (80 rows):** `template_id | family | canon parent | parent path | user rank | rubric rank | inherited patterns | corpus refs | secondary parent`.

**Table 2 — distinctness matrix (80 rows × axes):** `layout spine`, `preview placement`, `chrome`, `density`, `media treatment`, `hierarchy`, `navigation model`, `motion signature`, `surface/theme emphasis`. **Gate fails if two templates in a family share both primary axis and motion signature.**

**Table 3 — motion coverage:** one row per catalog signature with usage count, reduced-motion and no-JS behaviour. No signature may be primary on more than 12 of the 80.

**Selection rubric (define before building, apply at Gate 3)** so a reviewer can pick 1 of 20 per family:

| Criterion | Weight |
|---|---|
| Information hierarchy and scanability | 20 |
| Brand fit to the canon (tokens, FIG voice, chrome) | 15 |
| Reading comfort (measure, line-height, density) | 15 |
| Accessibility and keyboard quality | 15 |
| Motion quality and restraint | 10 |
| Distinctiveness within its family | 10 |
| Responsive behaviour at 360 and 1440 | 10 |
| Build feasibility for production handoff | 5 |

Record a score sheet per family and a recommendation with rationale.

---

## 14. Output layout

```text
portfolio-blog-lab/
  index.html                     # gallery: all 80, grouped, filterable
  assets/                        # deduplicated local media only
  shared/                        # tokens.css + base.css only (see below)
  portfolio-listing/PL01-…/index.html … PL20-…/index.html
  portfolio-detail/PD01-…/index.html  … PD20-…/index.html
  blog-listing/BL01-…/index.html      … BL20-…/index.html
  blog-article/BA01-…/index.html      … BA20-…/index.html
  manifest.json                  # 80 records: id, family, canon parent, ranks, corpus refs, motion, verification
  audit.json                     # machine-readable audit results per template
  DECISIONS.md                   # selection semantics, taxonomy call, image policy, exceptions
```

- `shared/` may hold **only** tokens, resets and primitives. Each template carries its own layout skin; if sharing starts erasing differences or causing collisions, inline it.
- Every template renders standalone over relative paths from the repo root, links to the gallery, and has next/previous variant navigation. Listing ↔ first detail and listing ↔ first article link both ways.
- Add one shared `@media print` block (case studies and articles get printed/exported by clients).

**Gallery requirements (80 items must be reviewable):** filter by family, canon parent, motion signature, verification status; **side-by-side comparison of 2–4 templates**; a contact-sheet mode; per card show canon parent, corpus references, motion signature and QA status; a "compare against the live page" link per family, following the precedent of `homepage-compositor/review/live-nestlancer-preview.html`.

**Verification status per template** must be one of `machine-audited`, `browser-verified`, `not verified` — the repo's own review records that no browser engine was available, so do not upgrade a status you did not earn.

---

## 15. Work sequence and gates

**Gate R — Research corpus.** ≥100 domains, per-site records, 2026 synthesis, conflict list, motion catalog. Fails under 100 domains, on missing observation methods, or on an uncited synthesis.

**Gate 0 — Canon and baseline.** `git status`; `python3 tools/audit-samples.py` still passes; read the 13 canon samples; measure the 10 canon pages; re-open the four live routes; write `docs/TOP10-CANON-SPEC.md` and the matrices in `docs/PORTFOLIO-BLOG-DESIGN-ANALYSIS.md`.

**Gate 1 — Concepts.** 80 concept cards + three mapping tables + rubric definition. Fails on duplicate axis+signature pairs, on any template without a canon parent and a corpus reference, or on more than 12 secondary-primary variants.

**Gate 2a — Pilot (4 pages).** One template per family. Measure at all five widths and both themes, run `tool-3` contrast and the four anti-drift checks, exercise the interactions. Record results. Do not proceed until the pilot passes.

**Gate 2b — Full build.** All 80 pages plus gallery, manifest and checker, in four family batches. Keep manifests, concept cards, parent mappings, gallery labels and thumbnails synchronised. Preserve existing URLs; do not rebuild or alter the 21,600 homepage compositions or the original top-50 hand-offs.

**Gate 3 — Verify and critique.**
- Run the repo's existing audit scripts unmodified plus the new lab audit (links, unique IDs, landmarks/headings, alt text, image dimensions, remote-URL scan, dead links, token-lint, identical-skin detector, JS syntax, no-JS visibility, size caps, motion-signature presence, canon-parent resolution, corpus-reference presence).
- Exercise every interaction across all 20 PL pages: selection and crossfade, keyboard-only selection, rapid-click races, image-load failure, filtered previous/next, zero results, search/categories; plus blog search/categories/paging, article TOC/progress/disclosures, reader controls, responsive menus, themes, copy/share fallbacks, and the safe demo cookie/comment/like controls. Verify reduced motion and no-JS.
- Inspect rendered pages at 360/390/768/1024/1440 in both themes **if a browser is available**. If not, say so explicitly and do not claim screenshot QA or measured overflow checks.
- Record measured H1 sizes, container/reading widths, thumbnails, preview frames and image dimensions at all five widths and both themes. Reject oversize states, not just horizontal overflow.
- Apply the selection rubric, score each family, and recommend one winner per family with rationale.
- Classify every finding: **blocker** (broken link, failed contrast, keyboard trap, oversize breach, missing state) · **major** (missing reduced-motion path, unstable image, weak hierarchy) · **minor** (spacing, copy polish). No blocker may remain open at hand-off.
- Write findings, known issues, verified vs not verified into `docs/PORTFOLIO-BLOG-DESIGN-ANALYSIS.md` or a linked revision report, and log design calls in `DECISIONS.md`.
- Finish by reporting file paths, the local run command, verification results and limitations.

---

## 16. Hard constraints

- **Do not** push, commit, create/switch/rename a branch.
- **Do not** modify or delete existing homepage sample folders, locked copy, rank-list records, screenshots or compositor generator outputs.
- **Do not** present the user-preference score or the rubric score as a user study, conversion proof, or independent verification of a case-study result.
- **Do not** invent testimonials, outcomes, client identities, article statistics, product states, social accounts, fake loading states or fake search results.
- **Do not** present a research corpus you did not open; unopened entries are marked not verified.
- **Do not** ship production-looking controls that cannot work in a static demo without disclosing their demo status.
- **Do not** ship remote or expiring media URLs, broken local routes, `href="#"` destinations, external CDNs or font services.
- **Do not** introduce brand colours outside §5.1, radii/spacing outside §5.3, or differentiation limited to colour and border radius.
- **Do not** waive the size contract because a 2026 trend uses larger type or imagery.

---

## 17. Completion checklist

- [ ] ≥100 distinct domains audited with per-site records and observation methods
- [ ] 2026 synthesis with cited evidence, trend counts, fading patterns, browser-support reality check
- [ ] Conflict list between 2026 trends and the size contract, with adaptations
- [ ] Motion catalog of 10–14 named signatures with timing, reduced-motion and no-JS behaviour
- [ ] `docs/TOP10-CANON-SPEC.md`: 10 canon pages and 13 samples measured, with file-path evidence
- [ ] Two rank lists quoted with their scales; no rubric/model score called a user study
- [ ] All four live pages audited and compared with their legacy screenshots
- [ ] Data inconsistencies recorded in `DECISIONS.md`, not silently copied
- [ ] Token, radius/spacing and brand-keep rules applied; token-lint passes on all 80
- [ ] Contrast measured in both themes on all 80; `--line` never used for meaningful boundaries
- [ ] Selection semantics implemented fully (keyboard, live region, `aria-current`) on all 20 PL pages
- [ ] Landmarks, single `h1`, skip link, focus management, 44/24 px targets, `type="button"` toggles
- [ ] No banned ARIA patterns; `prefers-reduced-motion` covers hover and transitions
- [ ] Component inventory implemented with every required state; empty/error/loading states present
- [ ] Chrome checklist passes on all 80; no empty mobile drawer; no `href="#"` destinations
- [ ] Code block spec met (label, scroll, copy feedback, contrast, no CDN)
- [ ] Content stress fixtures run on all 80; truncation policy respected
- [ ] Blog data plan honoured; demo data disclosed; no signed/expiring S3 URLs
- [ ] Asset plan honoured: deduplicated set, explicit dimensions, labelled placeholder art
- [ ] Performance budget met; four anti-drift checks pass (identical-skin, remote URL, dead link, token-lint)
- [ ] Exactly 20 templates each for `PL`, `PD`, `BL`, `BA` (80 total), all standalone
- [ ] Gallery: filters, 2–4-up comparison, contact sheet, QA status per card, live-page comparison
- [ ] All 20 PL pages are dated timelines with medium images and a shared crossfading preview
- [ ] Latest-click-wins, load-failure, keyboard, filtering, reduced-motion and no-JS states verified
- [ ] Every template resolves to a canon parent **and** a corpus reference, with visible inherited patterns
- [ ] ≤12 templates use a rubric-top-10 sample as primary; each labelled
- [ ] Size contract measured and satisfied at 5 widths × 2 themes
- [ ] Selection rubric applied; one recommended winner per family with rationale
- [ ] Findings classified blocker/major/minor; no blocker open
- [ ] `manifest.json`, `audit.json`, `DECISIONS.md` and gallery in sync with the real files
- [ ] Existing homepage lab intact; `tools/audit-samples.py` still passes; no commit/branch/push performed
