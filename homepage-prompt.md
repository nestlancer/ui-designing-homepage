# Nestlancer Marketing Homepage — Master Agent Prompt (v2)

> Paste this whole file into an agent (Cursor, Claude Code, Arena) with **`ui-designing-homepage`** open.
>
> **v2 fix:** v1 invented a generic section map. v2 locks **content and section order from the real Nestlancer homepage screenshot** (`013-marketing-homepage.webp`) — documented in `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`. You redesign the *look*, not the *story*.

---

## 1. YOUR ROLE

1. **Art director** — one mood, one signature moment; first viewport is one composition.
2. **Senior UI designer** — hierarchy, rhythm, spacing, contrast, states.
3. **Front-end craftsperson** — self-contained HTML/CSS/JS; offline; accessible.
4. **Research analyst** — screenshot inventory first; peer homes second; never invent Nestlancer claims.
5. **Harsh critic** — reject generic teal templates and any copy not in the screenshot research.

## 2. THE MISSION

| Stage | Do | Output |
|---|---|---|
| **0 · Screenshot lock** | Open `013-…webp`; read `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md` | Print section inventory (must match research) |
| **1 · Peer research** | Study ≥ 12 product/studio homes for *layout/motion only* | `docs/RESEARCH-NOTES.md` |
| **2 · Concept** | One redesign concept that **keeps every locked section + copy** | `docs/CONCEPT.md` |
| **3 · Build** | One homepage | `homepage/index.html` |
| **4 · Verify** | 1440 / 390 · light / dark | Delivery Report |

**Quality over variants.** Ship one home. Do not invent a second product story.

## 3. READ FIRST — in this order

1. **`Nestlancer-public-screenshots/public/013-marketing-homepage.webp`** — full page. Crop hero, FIG 02–06, footer at full size.
2. **`docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`** — locked copy + section map (source of truth).
3. Related shots for density/voice (do not steal their IA onto home): `016-pricing`, `017-services`, `014-about`, `015-contact`.
4. **`assets/logo-full-light.svg`** / **`logo-full-dark.svg`** — real logos only.
5. Sibling chrome lab (optional import): [ui-designing-header-footer](https://github.com/nestlancer/ui-designing-header-footer) — prefer **Orbit Suite (P04)** or **Mist over Orbit (P02+P04)**.

**Touch only:** `homepage/`, `docs/` (except do not gut the screenshot research without replacing it with equal detail). Never edit screenshot binaries or logo SVG paths.

## 4. BRAND SYSTEM — locked

### 4.1 Logo
- Light: `assets/logo-full-light.svg` · Dark: `assets/logo-full-dark.svg`
- Header ~24–40 px high; set width + height (≈ 3.63∶1)
- Forbidden: invented glyph, recolour, stretch, purple/neon

### 4.2 Icons
- One inline SVG set: 24×24, `stroke="currentColor"` stroke-width 1.8, round caps
- Minimum: sun, moon, menu, close, arrow-right, check, external, linkedin, github, x
- No emoji · no icon CDN · touch targets ≥ 44 px on mobile chrome

### 4.3 Tokens (no new hues)
```css
:root{
  --bg:#f9fbfc; --surface:#ffffff; --surface-2:#f4f8f9; --tint:#edf4f6; --mint:#eef7f5;
  --mesh-1:#d8e8e9; --mesh-2:#daeaeb;
  --ink:#0a2543; --ink-2:#123a5e; --body:#4a5c6e; --muted:#5f7080; --line:#e3ebe9;
  --teal:#24877f; --teal-hover:#1c6f68; --teal-soft:#d9ece9; --glow:#3fb8ab; --live:#22a06b;
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
- No serif display · no font CDN · theme boot before paint (`?theme=` / `prefers-color-scheme`)
- Hard bans: second brand hue, Bootstrap/Tailwind CDN, external requests, gradient soup, glass over dense text

### 4.4 Locked homepage copy — **from screenshot research only**

Use the strings in `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`. Critical lines (must appear):

| Slot | Locked text |
|---|---|
| Intake pill | Intake open |
| H1 | Ship with clients **in the loop** — and money under control. |
| Lead | Nestlancer fuses a dedicated product studio with an operating system for delivery: fixed-price quotes, milestone payments, live Project Hub, and Razorpay / UPI. |
| Hero CTAs | Start a project → · Tour the product |
| FIG 02 H2 | From brief to release — one continuous surface. |
| Steps | 02.1 Request · 02.2 Quote · 02.3 Build · 02.4 Pay & release (+ their titles) |
| Money H2 | Financial clarity for every milestone. |
| Why H2 | Engineered for delivery, not marketplace noise. |
| Proof | ₹4.2L · ₹4,28,500 · milestone ₹29,500 / ₹48,000 / ₹62,000 |
| Work H2 | Work that speaks for itself. |
| Close H2 | Ready to ship with clarity? |
| Close checks | Reply in 24h · Fixed-price quotes · No subscription · Made in India |
| Close CTAs | Start a project → · Preview the portal |
| Footer blurb | Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub. |
| Legal | © 2026 Nestlancer. Made in India. All rights reserved. |

**Always keep** “illustrative / preview / not a live checkout” disclaimers next to money UI and work cards.

**Forbidden to invent:** new client names, new ₹ totals, certifications, hourly pricing, marketplace claims.

## 5. SECTION DNA — must ship these blocks (order locked)

Rebuild visually, but **do not drop or reorder** these jobs:

1. **Header** — logo · Product/Portfolio/Blog/About/Pricing/Services/Contact · Sign in · Start a project  
2. **Hero** — Intake open · H1 · lead · Start a project + Tour the product · product preview art (Hub and/or command) · sector ticker  
3. **FIG 02 Delivery narrative** — four steps + milestone timeline panel  
4. **Money surface** — financial clarity · milestone money rows · Razorpay/Bank/UPI preview chrome  
5. **FIG 04 Why Nestlancer** — six differentiators (₹4.2L card included)  
6. **FIG 05 Selected work** — View all → · illustrative work cards · caption  
7. **FIG 06 Start** — Ready to ship… · four checks · Start a project + Preview the portal  
8. **Footer** — blurb · PRODUCT / COMPANY / LEGAL · ©  

Optional: payments table (“Money in one place”) if it fits the money story — copy already in research file.

### First viewport rules
- One composition: brand chrome + one H1 + one lead + one CTA group + one dominant product visual  
- No dashboard clutter, no stat strips, no multi-promo chips in the hero  
- Cards only when they wrap Hub/timeline/work interaction — not decoration piles  

### Chrome preference
| Prefer | When |
|---|---|
| Orbit Suite (P04 floating pill + card footer) | Default Nestlancer productized-studio home |
| Mist over Orbit (P02 glass + P04 footer) | Hero is mesh / full-bleed visual |
| Ground Truth (P01 solid) | Only if Orbit fights the layout |

## 6. RESEARCH (peers — layout only)

After screenshot lock, study ≥ 12 homes (Linear, Vercel, Stripe, Notion, Framer, Supabase, Razorpay, Zerodha, Pentagram-class studios…).  

`docs/RESEARCH-NOTES.md` one line each:  
`host · hero pattern · proof style · CTA · borrowable layout idea (not identity)`

Then `docs/CONCEPT.md`:
```
Name:
Mood / shape:
How we redesign without changing locked copy:
Chrome choice: Orbit / Mist / Ground
Signature moment: (ms + easing)
Section checklist: all 8 DNA blocks YES
```

## 7. BUILD

```
homepage/index.html     ← self-contained preferred
docs/RESEARCH-NOTES.md
docs/CONCEPT.md
docs/HOMEPAGE-SCREENSHOT-RESEARCH.md   ← already present; obey it
```

### Craft
- Mobile-first; no horizontal scroll at 360 / 768 / 1024 / 1440  
- Container ~1200 (1160 if Orbit)  
- Skip link · one banner · one contentinfo · real `<ul>/<li>`  
- `:focus-visible` 2px solid `var(--teal)` + 2px offset  
- Relative paths; 0 external requests; no dead CSS; no framework  
- File budget soft cap ~40 KB for first pass; DOM stay readable  
- Motion: ≥ 2 intentional moments; honour `prefers-reduced-motion`  
- ₹ with `font-variant-numeric: tabular-nums`

### Accessibility
WCAG 2.2 AA light + dark · body ≥ 14 px · nothing under 11 px · keyboard for menus · meaningful alt / empty decorative

## 8. CRITIQUE

Serve `python3 -m http.server 8124` → look 1440 + 390, light + dark:

1. Diff against `HOMEPAGE-SCREENSHOT-RESEARCH.md` — every locked string present?  
2. Logo removed → still Nestlancer? If not, brand too weak.  
3. One primary CTA hierarchy?  
4. Disclaimers still on illustrative money/work?  
5. Invented copy/clients/hues? Kill them.

Max 3 fix loops.

## 9. REFUSAL RULES

- Do not write CSS before opening `013-…webp` and confirming the research file.  
- Do not invent homepage sections outside the DNA table.  
- Do not rewrite H1/lead/FIG headlines to “sound better.”  
- Do not invent logos, clients, or ₹ figures.  
- Do not use emoji / CDNs / frameworks.  
- Do not claim browser-verified without looking.

## 10. START COMMAND

1. Open `013-marketing-homepage.webp`. Print the 8 DNA blocks you see.  
2. Diff aloud against `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md` — fix the research file only if the shot contradicts it.  
3. Peer research → `docs/RESEARCH-NOTES.md`.  
4. Concept → `docs/CONCEPT.md` (chrome choice + redesign-without-rewriting-copy).  
5. Build `homepage/index.html` with locked strings.  
6. Serve, look, fix. Print:

```
## DELIVERY REPORT
Screenshot research obeyed: YES/NO
Locked H1/lead/FIG02/FIG04/FIG05/FIG06 present: YES/NO
Illustrative disclaimers present: YES/NO
Chrome pattern: …
Browser 1440/390 light+dark: DONE / NO-BROWSER
External requests: 0
Invented copy: NONE
Flagged: …
```

---

### Operator shortcuts
- **Copy drift:** “Re-open docs/HOMEPAGE-SCREENSHOT-RESEARCH.md — restore H1 and FIG headlines verbatim.”  
- **Missing money honesty:** “Restore PREVIEW / not a live checkout labels.”  
- **Wrong chrome:** “Use Orbit Suite floating pill + card footer.”  
- **Too generic:** “Match screenshot: mono FIG eyebrows, Hub window proof, tabular ₹.”
