# Nestlancer Marketing Homepage Lab — Master Agent Prompt (v3)
### Research 100 world-ranked sites → design 20 homepage samples · same Nestlancer story · different aspects · great motion JS

> Paste this whole file into an agent (Arena Agent Mode, Cursor, Claude Code) with the **`ui-designing-homepage`** repo open.
>
> **v1** was a thin single-page brief. **v2** locked screenshot copy but still only asked for one home with weak research. **v3** matches the rigor of `ui-designing-header-footer`’s v4: **countable research (100 sites) → 20 distinct homepage HTML samples**, all telling the **same Nestlancer story** from `013-marketing-homepage.webp` / `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`, with **serious animation JS** (not CSS-only fluff).

---

## 1. YOUR ROLE

You are, at the same time:

1. **A creative artist and art director.** Each of the 20 homes gets a concept, mood, shape language, and one memorable motion moment. You do not ship 20 recolours.
2. **A senior UI designer.** Hierarchy, rhythm, spacing, contrast, type scale, and states (hover, focus, scrolled, open, reduced-motion).
3. **A front-end craftsperson + motion engineer.** Self-contained HTML + CSS + **real JS** for scroll, stagger, count-up, parallax-lite, timeline, drawer/menu — offline, accessible, performant.
4. **A research analyst.** Study **100** ranked sites’ *homepages* as data; extract hero/proof/CTA/motion patterns; never copy identity.
5. **A harsh design critic.** Reject generic teal templates and any invented Nestlancer claims.

## 2. THE MISSION (read twice)

| Stage | Quantity | Output |
|---|---|---|
| **0 · Screenshot lock** | 1 Nestlancer home | Confirm `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md` vs `013-marketing-homepage.webp` |
| **1 · Research** | **100** world-ranked sites | `research/top-100.json`, `research/sites-100.json`, `docs/RESEARCH-NOTES.md`, `research/patterns.md` |
| **2 · Concepts** | **20** Concept Cards | printed before code; `docs/CONCEPTS.md` |
| **3 · Build** | **20** homepage HTML samples (`H01`…`H20`) | `homepage-lab/samples/Hnn-name/index.html` + gallery |
| **4 · Verify** | all 20 @ 1440 + 390, light + dark | Delivery Report |

### The content rule — the most important rule in this file

**User / Nestlancer story stays the same across all 20 samples.**  
Every `H01`…`H20` must include the **same locked sections and copy** from `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md` (H1, lead, CTAs, FIG 02–06 jobs, ₹ figures, disclaimers, footer columns).  

What **changes** per sample is the *aspect*: layout geometry, chrome feel, surface skin, proof presentation, scroll narrative, and **signature motion JS**.  

A redesign that rewrites the H1, drops “Financial clarity…”, invents clients, or removes illustrative disclaimers is a **failed sample**.

**Research wide, build narrow.** 100 sites in → 20 homes out. Never build more than 20. Never stub “same as H01 with different colour”.

## 3. READ FIRST — in this order, before any design

1. **`Nestlancer-public-screenshots/public/013-marketing-homepage.webp`** (2880×10444). Study hero → FIG 02 → money → FIG 04 → work → FIG 06 → footer.
2. **`docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`** — locked copy + section DNA. If the shot contradicts the doc, update the doc with equal detail, then proceed.
3. Related shots for brand voice (not to replace home IA): `016-pricing`, `017-services`, `014-about`, `015-contact`.
4. **`assets/logo-full-light.svg`**, **`logo-full-dark.svg`**, mark SVGs. Render them. Never invent a glyph.
5. This prompt end-to-end.
6. Optional chrome reference: sibling [ui-designing-header-footer](https://github.com/nestlancer/ui-designing-header-footer) (Orbit / Mist / Ground) — may inspire chrome *aspects*, but each sample’s chrome must live inside that sample’s file (or a shared snippet generator). Do not depend on the sibling repo at runtime.

**Touch only:** `homepage-lab/`, `research/`, `docs/` (research notes + concepts; keep screenshot research accurate). Never edit screenshot binaries or overwrite logo asset files with fakes.

## 4. BRAND SYSTEM — locked

### 4.1 Logo
- Light surfaces: `../../assets/logo-full-light.svg` (from `homepage-lab/samples/Hnn/`) or copy into lab assets with relative paths.
- Dark: `logo-full-dark.svg`. Aspect ≈ 3.63∶1 — always set width + height.
- Forbidden: invented logos, recolour, stretch, purple/neon on the mark.

### 4.2 Icons
- One inline SVG set for all 20 samples: 24×24, `fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`, `aria-hidden="true"`.
- Minimum: sun, moon, menu, close, search, arrow-right, chevron-down, check, external, linkedin, github, x, plus what concepts need.
- No emoji · no icon font · no CDN · ≥ 44 px touch targets on mobile chrome.

### 4.3 Tokens (no new hues)
```css
:root{
  --bg:#f9fbfc; --surface:#ffffff; --surface-2:#f4f8f9; --tint:#edf4f6; --mint:#eef7f5;
  --mesh-1:#d8e8e9; --mesh-2:#daeaeb;
  --ink:#0a2543; --ink-2:#123a5e; --body:#4a5c6e; --muted:#5f7080; --line:#e3ebe9;
  --teal:#1f7a72; --teal-hover:#1c6f68; --teal-soft:#d9ece9; --glow:#3fb8ab; --live:#22a06b;
  /* --teal is the AA-safe brand accent: 5.13:1 on #ffffff, 4.95:1 on --bg, 4.71:1 on --mint. */
  --btn:#1f7a73;
  --band:#0a2543; --band-text:#e8eef4; --band-body:#b9c6d0; --band-line:rgba(255,255,255,.12);
  --shadow:0 8px 28px rgba(10,37,67,.10);
  --pill:999px; --card:14px; --chip:8px;
  --font:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  --mono:ui-monospace,"IBM Plex Mono","SF Mono",Menlo,Consolas,monospace;
}
[data-theme="dark"]{
  --bg:#0b1720; --surface:#0f1e29; --surface-2:#12242f; --tint:#102530; --mint:#10272a;
  --mesh-1:#12303a; --mesh-2:#0f2a33;
  --ink:#e8eef4; --ink-2:#d3dde6; --body:#b9c6d0; --muted:#8aa0b3; --line:rgba(255,255,255,.08);
  --teal:#2fa59b; --teal-hover:#3fb8ab; --teal-soft:#14343a;
  --band:#06111a; --shadow:0 8px 28px rgba(0,0,0,.45);
}
```
- Geometric sans only · no font CDN · offline render · theme boot before paint (`?theme=dark|light` else OS).
- Hard bans: second brand hue, purple/neon, Bootstrap/Tailwind CDN, external requests, gradient soup, glass over dense text, 3D flourishes.

### 4.4 Locked Nestlancer homepage copy (all 20 samples)

**Source of truth:** `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`. Summary (must appear in every sample):

| Slot | Locked text |
|---|---|
| Nav | Product · Portfolio · Blog · About · Pricing · Services · Contact |
| Pill | Intake open |
| H1 | Ship with clients **in the loop** — and money under control. |
| Lead | Nestlancer fuses a dedicated product studio with an operating system for delivery: fixed-price quotes, milestone payments, live Project Hub, and Razorpay / UPI. |
| Hero CTAs | Start a project → · Tour the product |
| FIG 02 | From brief to release — one continuous surface. + support line + **02.1–02.4** step titles |
| Money | Financial clarity for every milestone. + ₹29,500 / ₹48,000 / ₹62,000 + ₹4,28,500 where used |
| FIG 04 | Engineered for delivery, not marketplace noise. + six proof cards incl. **₹4.2L** |
| FIG 05 | Work that speaks for itself. · View all → · illustrative work cards + caption |
| FIG 06 | Ready to ship with clarity? · four checks · Start a project → · Preview the portal |
| Ticker | HEALTHTECH · FINTECH · E-COMMERCE · SAAS · B2B PORTALS · MOBILE APPS · DESIGN SYSTEMS · MARKETPLACES |
| Footer blurb | Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub. |
| Footer cols | PRODUCT / COMPANY / LEGAL as in research |
| Legal | © 2026 Nestlancer. Made in India. All rights reserved. |

**Always keep** “illustrative / preview / not a live checkout” next to money + Hub mockups + work cards.  
Currency: INR primary (en-IN), tabular nums. Routes as in research file.

## 5. PHASE 0 — SCREENSHOT GATE (before research code)

```
## SCREENSHOT GATE
013 opened: YES/NO
HOMEPAGE-SCREENSHOT-RESEARCH.md matches shot: YES/NO
DNA blocks present in research: Header · Hero · FIG02 · Money · FIG04 · FIG05 · FIG06 · Footer
Gate: PASS / FAIL
```
Do not start Phase 1 until PASS.

## 6. PHASE 1 — RESEARCH: 100 WORLD-RANKED SITES (homepages)

**Goal:** learn how the best sites structure **marketing homes** — hero, proof, narrative, CTA, scroll motion — so the 20 Nestlancer samples are informed and varied. Research never changes Nestlancer copy; the brand is §4.

### 6.1 Build the list first — `research/top-100.json`
Do this live; **memory is not a ranking.**
1. Fetch **≥ 2** ranking sources; print URLs: Similarweb Top Websites · Semrush · Cloudflare Radar · Wikipedia most-visited.
2. Write **exactly 100** objects:
   ```json
   { "rank": 1, "host": "google.com", "rank_source": "similarweb-global-2026-10",
     "tier": "global-top-100", "bucket": "B", "suitable": true, "skip_reason": null }
   ```
3. Eligible: ranked global hosts or documented category world-leaders with a public marketing home.
4. Banned: NSFW, gambling, malware, personal blogs, obscure startups, invented domains, CodePen pads (pads OK for motion *how-to* only — not in the 100).
5. Skip & replace on bot-wall / login-only / robots disallow — next suitable ranked host.
6. Print: `TOP-100 LOCKED — sources: … · global-tier: <n> · category-leader: <n> · skipped: <n>`.

### 6.2 Cover twelve buckets (≈ 8 each, total 100)
A Marketplaces & freelance · B Big-tech · C Dev tools & infra · D Fintech & payments · E SaaS marketing · F Editorial & media · G Brand / agency · H E-commerce · I Travel & mobility · J AI products · K Consumer platforms · L India & APAC leaders.

### 6.3 Study each site’s **homepage** — `research/sites-100.json`
For every host, open the marketing home and record:
- identity: `host`, `rank`, `rank_source`, `tier`, `bucket`, `verified`, `capture_failed`
- **hero:** layout (split · centered · full-bleed media · product UI · statement-only), CTA count/labels pattern, proof above fold?
- **body narrative:** section count feel, proof style (logos · metrics · bento · timeline · video), conversion band
- **chrome:** sticky / transparent→solid / floating pill / mega (one line)
- **motion:** the *one* notable homepage animation — trigger · duration · easing if measurable (`getAnimations()` / CSS read)
- **one-line insight** — borrowable *structure/motion*, not identity

Public pages only. No logins. Honour robots + rate limits. **Never copy** logos, proprietary art, or competitor copy into Nestlancer samples.

### 6.4 Animation vocabulary (how-to libraries — not counted in 100)
codepen.io · uiverse.io · hover.css · animate.style · motion.dev · gsap.com docs · magicui.design · ui.aceternity.com  

Extract **≥ 25 measured primitives** into `research/patterns.md`:  
`name · trigger · duration · easing · where seen`  

Examples: scroll-reveal stagger, sticky shrink header, glass engage, transparent→solid, count-up on intersect, progress line, ticker/marquee, timeline draw, parallax-lite (transform only), magnetic CTA, wordmark/clip reveal, accordion `grid-template-rows`, command palette scale, hero mockup float, section pin (careful), reduced-motion fallbacks.

### 6.5 Synthesis
- `docs/RESEARCH-NOTES.md`: **100 lines** — `rank · host · homepage insight · source URL`
- `research/patterns.md`: **≥ 15 homepage archetypes** + **≥ 12 hero patterns** + **≥ 25 motion primitives**

### 6.6 Research gate (mandatory — no concepts until PASS)
```
## RESEARCH GATE
Ranking sources fetched: <names + URLs>
top-100.json: 100/100 · unranked/random: 0
Captured verified: <n>/100 · Skipped: <n>
Bucket coverage: A..L
Homepage archetypes: <n> (≥15) · Hero patterns: <n> (≥12) · Motion primitives: <n> (≥25)
Screenshot gate still PASS: YES
Gate: PASS / FAIL
```

## 7. PHASE 2 — CREATIVE DIRECTION: 20 CONCEPTS

Stop researching. Think like an artist. **20 concepts — print all before code** in `docs/CONCEPTS.md`.

### 7.1 Concept Card template
```
H07 · "Quiet Signal Home"
Mood: calm · confident · warm
Shape language: soft rectangles, 14 px cards, one teal pill
Aspect (what differs): glass sticky chrome + timeline-led FIG02 + count-up money
Locked content: ALL DNA blocks from screenshot research — unchanged
Hero treatment: …
Signature motion JS: count-up ₹ on intersect (600 ms ease-out) + section stagger 40 ms
Research basis: stripe.com, linear.app — from sites-100.json
Axes: A… · B… · C… · D… · E…
```

### 7.2 Difference test (multi-axis)
Each sample must differ from every other on **≥ 3 of 5 axes**, one of which must be A or D:

| Axis | Options (examples) |
|---|---|
| **A · Hero geometry** | split copy+UI · centered statement · full-bleed mesh · floating product stack · asymmetric rail · editorial rules |
| **B · Proof treatment** | Hub window · timeline · bento metrics · tabular money first · ticker-led · command palette |
| **C · Scroll narrative** | static sections · sticky chapter labels · progress-linked · reveal-stagger · pin-lite · condense header |
| **D · Surface skin** | solid · glass · tint · mesh · elevated · editorial · dual · invert · ink |
| **E · Motion family (JS)** | count-up · timeline-draw · marquee · clip-reveal · parallax-lite · magnetic · palette · accordion · progress-line · stagger-IO |

Recolouring alone is **not** a difference. Neighbouring samples must not share the same skin.

Coverage across 20: ≥ 3 minimal · ≥ 3 dense/informational · ≥ 3 bold/expressive · ≥ 2 dark-native · ≥ 2 editorial · ≥ 2 mobile-first · ≥ 2 conversion-led · ≥ 3 motion-heavy (JS signature is the star).

### 7.3 Suggested roster (adapt ≤ 6 from research — keep locked content)
| ID | Aspect name | Skin | Signature JS motion |
|---|---|---|---|
| H01 | Ground Truth | solid | underline-draw + IO stagger |
| H02 | Morning Mist | glass | glass engage after 8 px + fade-up |
| H03 | Orbit Float | elevated | pop-lift cards + soft float on Hub |
| H04 | Split Nexus | dual | meet-in-middle hero fills |
| H05 | Editorial Rules | editorial | rule-draw 320 ms |
| H06 | Timeline River | tint | timeline draw + active step pulse |
| H07 | Money First | solid | count-up ₹4,28,500 / ₹4.2L |
| H08 | Command Density | glass | ⌘K palette scale + stagger |
| H09 | Mesh Settle | mesh | transparent→solid header + mesh parallax-lite |
| H10 | Invert Night | invert | glow hairline pulse (CSS) + JS theme boot |
| H11 | Bento Proof | elevated | bento stagger 40 ms |
| H12 | Marquee Industries | tint | sector ticker JS (pause on hover/focus) |
| H13 | Progress Path | solid | reading-progress line + section spy |
| H14 | Loud Overlay | invert | full-screen nav overlay + focus trap |
| H15 | Accordion Steps | solid | FIG02 accordion via grid-template-rows |
| H16 | Dock Mobile | elevated | bottom dock press + reduced desktop |
| H17 | Pin Chapters | dual | sticky FIG labels while section scrolls |
| H18 | Clip Wordmark | editorial | H1 clip-path reveal 600 ms |
| H19 | Magnetic CTA | tint | magnetic primary button (pointer) |
| H20 | Twin Gates | dual | 50/50 CTA band meet-in-middle |

Rename freely if research yields stronger aspects — still **20**, still locked copy.

## 8. PHASE 3 — BUILD

### 8.1 Output layout
```
homepage-lab/
  index.html                          ← gallery: 20 cards, light/dark, links to samples
  assets/                             ← logos copied from /assets (relative)
  samples/
    H01-ground-truth/
      index.html                      ← full homepage (self-contained preferred)
      sample.json                     ← id, name, skin, axes, signature_motion, references[2], dna
    H02-…
    …
research/
  top-100.json
  sites-100.json
  patterns.md
docs/
  HOMEPAGE-SCREENSHOT-RESEARCH.md     ← already present
  RESEARCH-NOTES.md
  CONCEPTS.md
index.html                            ← redirect → homepage-lab/
```

You may use a small generator (`tools/build-homes.mjs`) so tokens, logo markup, icon set, and shared motion helpers exist **once** — but each sample must remain readable and must not share one megatemplate CSS scoped 20 times with dead rules.

### 8.2 Craft rules
- Each sample: `<!DOCTYPE html>`, tokens, only CSS it uses, full homepage markup, **JS for its signature motion + chrome interactions**.
- No dead CSS. No framework. Relative paths. Zero external requests (no GSAP CDN — if you use a motion approach, implement it yourself or vendor a tiny local helper under `homepage-lab/assets/motion/`).
- Mobile-first; no horizontal scroll at 360 / 768 / 1024 / 1440 / 1920.
- Budgets (soft): prefer ≤ 55 KB HTML per sample including inline CSS/JS; DOM keep sensible; CLS 0 for sticky chrome.
- `?theme=dark|light` · optional `?frame=1` to hide gallery chrome if needed.

### 8.3 Great JS — required bar (not optional fluff)

Every sample **must** include purposeful JS beyond a theme toggle:

| Requirement | Detail |
|---|---|
| **Signature motion** | The Concept Card’s motion family — implemented and *visible* |
| **IntersectionObserver** | Prefer IO for reveals/count-up; no scroll jank listeners without rAF |
| **prefers-reduced-motion** | Disable transform/scroll-linked effects; allow opacity ≤ 150 ms |
| **Performance** | Animate `transform`/`opacity` only; no layout thrash; cancel on unmount/nav away |
| **A11y** | Focus trap for overlays/drawers; Esc closes; restore focus; `aria-expanded` |
| **Ticker/marquee** | Pause on hover **and** focus; no seizure-inducing speeds |
| **Count-up** | Use locked figures only; `Intl` / en-IN grouping for ₹ |

**Forbidden “fake motion”:** only CSS `:hover` on buttons with no page-level signature; empty `<script></script>`; copying GSAP CDN.

Suggested shared helpers (optional local module): `io-reveal.js`, `count-up.js`, `marquee.js`, `theme-boot.js` — each < ~2 KB, no deps.

### 8.4 Accessibility
WCAG 2.2 AA both themes · skip link · one `role="banner"` + one `role="contentinfo"` · real lists · `:focus-visible` 2px `var(--teal)` + 2px offset · body ≥ 14 px · nothing under 11 px · contrast AA · no `outline:none` without replacement.

### 8.5 Build order
Four batches of five: H01–H05 → critique → H06–H10 → … → H20.  
Per sample: Concept Card → HTML structure with locked copy → CSS aspect → **JS signature** → `sample.json` → gallery card.  
Never stub; never “TODO motion later”.

## 9. PHASE 4 — LOOK, CRITIQUE, FIX

Serve (`python3 -m http.server 8124`) and open the gallery. For **each** sample at 1440 + 390, light + dark:

1. Diff copy against `HOMEPAGE-SCREENSHOT-RESEARCH.md` — all DNA blocks present?
2. Nestlancer feel (calm, teal + navy) or generic template?
3. **Aspect test:** cover the logo — can you tell H0n from neighbours in < 2 s?
4. Is the **signature JS motion** actually seen? Does reduced-motion calm it?
5. Real logos? No invented clients/₹? Disclaimers intact?
6. Keyboard: menu/overlay/palette Esc + focus return?

Fix max 3 loops per sample. List leftovers honestly.

**Checklist:** 20 contiguous IDs · locked copy · tokens only · 0 externals · no emoji · AA · motion primitives used · gallery works.

## 10. DELIVERY

Workspace must contain research JSON + 20 samples + gallery. No `node_modules/`, no full-page crops of 100 sites (optional gitignored `research/raw/` ≤ 30 MB if needed).

```
## DELIVERY REPORT
Screenshot gate: PASS
Research: top-100 YES · verified <n>/100 · archetypes H≥15 · heroes ≥12 · motion ≥25
Samples: <n>/20 · skins <list> · aspect glance PASS/FAIL
Locked content identical across samples: YES/NO
JS signatures implemented: <n>/20 visible
Browser look 1440/390 light+dark: DONE / NO-BROWSER
External requests: 0
Flagged: <IDs + reason or none>
```

## 11. REFUSAL RULES

- Do not start concepts until Screenshot Gate + Research Gate PASS.
- Do not fabricate researched hosts; skip honestly.
- Do not build more than 20 homes; do not ship recolours as new aspects.
- Do not change locked Nestlancer copy, drop DNA sections, or invent clients/prices.
- Do not use CDNs, frameworks, emoji, or invented logos.
- Do not claim motion done without a visible JS signature + reduced-motion path.
- Do not claim browser-verified without looking.

## 12. START COMMAND

1. Open `013-marketing-homepage.webp` + `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md` → print Screenshot Gate.  
2. Fetch ≥ 2 ranking sources → lock `research/top-100.json` → capture 100 homes → `sites-100.json` + `RESEARCH-NOTES.md` + `patterns.md` → Research Gate.  
3. Print 20 Concept Cards (`docs/CONCEPTS.md`) with axes + JS signatures.  
4. Set up `homepage-lab/assets/` (real logos) + shared motion helpers if any.  
5. Build H01–H05, look, fix; continue through H20.  
6. Build gallery `homepage-lab/index.html` + root redirect.  
7. Full critique pass → Delivery Report.  
8. If context is short: finish the current batch, sync, hand off next ID — never leave a half-written sample.

---

### Operator shortcuts
- **Copy drift:** “Restore strings from docs/HOMEPAGE-SCREENSHOT-RESEARCH.md in every sample.”  
- **Fake variety:** “H12 fails axis test vs H07 — change geometry or motion family, not hue.”  
- **No motion:** “H09 has no visible JS signature — implement IO parallax-lite + reduced-motion.”  
- **Research shallow:** “Research Gate FAIL — top-100.json must be 100 ranked hosts with verified captures.”  
- **Freeze:** “H01–H05 approved — never regenerate them.”
