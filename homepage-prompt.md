# Nestlancer Marketing Homepage — Master Agent Prompt (v1)

> Paste this whole file into an agent (Cursor, Claude Code, Arena Agent Mode) with the **`ui-designing-homepage`** repo open.
>
> **Mission:** research how world-class product-studio / SaaS marketing homes are built → study Nestlancer’s own screenshot → ship **one** production-quality homepage that feels like Nestlancer (calm, teal + navy, client-portal + studio) — not a generic template.
>
> **Sibling repo (chrome only):** [ui-designing-header-footer](https://github.com/nestlancer/ui-designing-header-footer) already locked approved headers/footers. Prefer **Orbit Suite (P04+P04)** or **Mist over Orbit (P02+P04)** for the home chrome; do not invent a third brand system.

---

## 1. YOUR ROLE

You are, at the same time:

1. **Art director** — one concept, one mood, one memorable moment. No dashboard clutter in the first viewport.
2. **Senior UI designer** — hierarchy, rhythm, spacing, contrast, type scale, states.
3. **Front-end craftsperson** — small, readable, accessible HTML + CSS + a little JS. Offline-capable.
4. **Research analyst** — study real ranked marketing homes as *data*; never copy identity.
5. **Harsh critic** — reject anything that looks like a generic teal-button template.

## 2. THE MISSION

| Stage | Output |
|---|---|
| **Research** | Short notes: ≥ 12 world-class product / studio / SaaS homes (structure, hero, proof, CTA) → `docs/RESEARCH-NOTES.md` |
| **Design** | One Concept Card for the Nestlancer home (mood · shape · section map · signature motion) |
| **Build** | `homepage/index.html` (+ optional `homepage/styles` only if split helps; prefer one self-contained file first) |
| **Verify** | Look at 1440 / 390, light + dark; fix; print Delivery Report |

**Ship one homepage, not twenty variants.** Quality beats quantity.

## 3. READ FIRST — in this order

1. **`Nestlancer-public-screenshots/public/013-marketing-homepage.webp`** — crop and study the **current** home: header height, hero layout, section order, proof/CTA, footer. This is the primary design truth.
2. Also open (for voice + density, not to clone layout):
   - `016-marketing-pricing.webp`
   - `017-marketing-services.webp`
   - `014-marketing-about.webp`
   - `015-marketing-contact.webp`
   - `007-portfolio-listing.webp`
3. **`assets/logo-full-light.svg`** and **`logo-full-dark.svg`** — real Nestlancer logos. Render them. Never invent a glyph.
4. This prompt, end to end.

**Touch only your output.** Create under `homepage/` and `docs/`. Never edit `Nestlancer-public-screenshots/` or overwrite `assets/` logos.

## 4. BRAND SYSTEM — locked (same as header/footer lab)

### 4.1 Logo
- Light surfaces: `assets/logo-full-light.svg` (indigo `#272A7A` + teal `#16B6A5`).
- Dark surfaces: `assets/logo-full-dark.svg`.
- Header height ~24–40 px; always set `width` + `height` (aspect ≈ 3.63∶1).
- Mark-only allowed in compact chrome (`assets/logo-mark-*.svg`).
- **Forbidden:** invented logos, recolouring, stretching, purple/neon accents on the mark.

### 4.2 Tokens (use `var(--…)`, no new hues)
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
- Geometric sans only — **no serif display**. No font CDN. Offline render required.
- Theme boot before paint: `?theme=dark|light` → else `prefers-color-scheme`.
- **Hard bans:** second brand hue, purple/neon, Bootstrap/Tailwind CDN, external requests, gradient soup, glass over dense text, emoji.

### 4.3 Locked copy (do not invent features, clients, prices, or certifications)
- **Nav:** Product · Portfolio · Blog · About · Pricing · Services · Contact
- **Actions:** `Sign in` · `Start a project` · `Preview the portal`
- **Positioning blurb:** `Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.`
- **CTA line:** `Ready to ship with clarity?`
- **Eyebrows:** `FIG · WORK`, `FIG · PORTAL`, `FIG · START`
- **Proof (only these):** `₹4,28,500` payments · `₹4.2L` milestone · `Payouts cleared 1/3`
- **Ticker sectors:** FINTECH · E-COMMERCE · SaaS · B2B PORTALS · MOBILE APPS · DESIGN SYSTEMS · MARKETPLACES · HEALTHCARE
- **Legal:** `© 2026 Nestlancer. Made in India. All rights reserved.`
- **Routes:** `/` `/product` `/portfolio` `/blog` `/about` `/pricing` `/services` `/contact` `/login`

## 5. WHAT THIS HOMEPAGE IS

Nestlancer is a **product studio + client portal** for builders who want fixed-price clarity (Razorpay milestones, live Project Hub). The home must sell:

1. **Trust** — calm studio craft, Made in India, real process.
2. **Product** — the portal / Project Hub is real software, not a brochure.
3. **Conversion** — one primary CTA: **Start a project**; secondary: **Preview the portal** / **Sign in**.

### Site-type fit (from chrome research)
| Prefer chrome | Why |
|---|---|
| **Orbit Suite (floating pill + floating footer)** | Best “productized studio” feel for home |
| **Mist over Orbit (glass sticky + Orbit footer)** | Best when the hero is visual / mesh |
| Ground Truth (solid) | Fallback for maximum trust / legal-heavy pages — not the first choice for home |

If you cannot import chrome from the sibling repo, **rebuild equivalent chrome** with the same tokens, logo files, and craft — do not invent a new palette.

## 6. PAGE COMPOSITION RULES (hard)

### First viewport (hero budget)
Must read as **one composition**, not a dashboard:
- Brand (logo) as a hero-level signal in the chrome
- **One** headline
- **One** short supporting sentence
- **One** CTA group (`Start a project` + secondary)
- **One** dominant visual plane (full-bleed mesh / product atmosphere — not a floating card collage)

**Do not** put in the first viewport: stat strips, schedules, address blocks, multi promo chips, dense metadata.

**Cards:** default none in the hero. Cards only when they wrap a real interaction later on the page.

### Suggested section map (adapt after reading `013-…webp`)
1. Header (approved chrome pattern)
2. Hero
3. Proof / trust strip (only locked numbers + sectors ticker — restrained)
4. How it works / Product Hub (3 steps max)
5. Selected work / Portfolio tease (link out — no fake clients)
6. Services or Pricing tease (link to `/services` `/pricing`)
7. Closing CTA band — `Ready to ship with clarity?`
8. Footer (approved chrome pattern)

**One job per section** — one headline, usually one short support line.

### Motion
- At least **2–3 intentional motions** (e.g. hero settle, underline-draw / pop-lift matching chrome, section reveal).
- Prefer `transform` / `opacity`; honour `prefers-reduced-motion`.
- Micro-interactions 120–200 ms; opens ≤ 320 ms.

## 7. RESEARCH (before pixels)

Study **≥ 12** live marketing homes in these buckets (mix product SaaS + studios):

| Bucket | Examples to open (replace if blocked) |
|---|---|
| Product SaaS | linear.app, vercel.com, stripe.com, notion.com, framer.com |
| Dev tools | supabase.com, railway.app, resend.com |
| Design / product studios | pentagram.com, sturdy.studio, read.cv (for tone) |
| India / payments adjacent | razorpay.com, zerodha.com |

For each, write **one line** in `docs/RESEARCH-NOTES.md`:
`host · hero pattern · proof style · CTA · one borrowable idea (not identity)`

Then write the Nestlancer **Concept Card** in `docs/CONCEPT.md`:
```
Name: …
Mood / shape: …
Hero idea: …
Section map: …
Chrome choice: Orbit Suite / Mist over Orbit / …
Signature moment: … (duration + easing)
Why it fits Nestlancer: …
```

## 8. BUILD RULES

### Output
```
homepage/
  index.html          ← preferred: self-contained <style> + markup + tiny <script>
docs/
  RESEARCH-NOTES.md
  CONCEPT.md
```
Optional later: split CSS only if the single file exceeds ~40 KB.

### Craft
- Mobile-first; no horizontal scroll at 360 / 768 / 1024 / 1440.
- Container ~1200 px (or 1160 if matching Orbit floating chrome).
- Skip link · one `role="banner"` · one `role="contentinfo"` · real `<ul>/<li>` nav.
- `:focus-visible` ring `2px solid var(--teal)` + 2 px offset.
- Touch targets ≥ 44 px on mobile chrome.
- Relative paths only; zero external requests.
- No dead CSS. No framework.

### Accessibility
WCAG 2.2 AA light + dark. Text ≥ 14 px body; nothing under 11 px. Alt text on meaningful images; decorative images empty alt.

## 9. CRITIQUE LOOP

Serve (`python3 -m http.server 8124`) and look at **1440 and 390**, light and dark:

1. Could this homepage belong to another brand if you removed the logo? If yes — branding is too weak; fix.
2. Does the first viewport feel like Nestlancer (calm, generous, trustworthy) or a SaaS template?
3. Is there exactly one primary CTA hierarchy?
4. Do header + footer read as one system with the page?
5. Any invented copy, fake logos, or second hues? Kill them.

Max 3 fix loops; list leftovers honestly.

## 10. REFUSAL RULES

- Do not start CSS before opening `013-marketing-homepage.webp` and writing the Concept Card.
- Do not invent clients, case-study metrics, certifications, or prices beyond locked copy.
- Do not use emoji, icon fonts, or CDNs.
- Do not ship a dashboard-style home or multi-card hero collage.
- Do not edit screenshot files.
- Do not claim “browser-verified” without looking.

## 11. START COMMAND

1. Open `013-marketing-homepage.webp` (+ pricing/services/about). Print three measured observations (header height feel, hero structure, section order).
2. Research ≥ 12 homes → `docs/RESEARCH-NOTES.md`.
3. Write `docs/CONCEPT.md` (include chrome choice).
4. Build `homepage/index.html` with real logos from `assets/`.
5. Serve, look, fix.
6. Print:

```
## DELIVERY REPORT
Research notes: YES/NO · Concept: YES/NO
Homepage: homepage/index.html present YES/NO
Chrome pattern used: …
Browser look 1440/390 light+dark: DONE / NO-BROWSER
External requests: 0
Invented logo/copy: NONE
Flagged: …
```

---

### Operator shortcuts
- **Too generic:** “Re-open 013 — match Nestlancer spacing and teal discipline; cut the card grid from the hero.”
- **Wrong chrome:** “Switch home chrome to Orbit Suite (P04) floating pill + card footer.”
- **Copy drift:** “Replace all marketing sentences with locked copy from §4.3 only.”
