# Homepage screenshot research — locked from Nestlancer public shots

**Source:** `Nestlancer-public-screenshots/public/013-marketing-homepage.webp`  
**Size:** 2880 × 10444 px (= 1440 CSS px wide @2×)  
**Cross-checked against:** live landing HTML in sibling `frontend-ui-upgrade/proto/apps/landing/index.html`  
**Also opened:** `016-pricing`, `017-services`, `014-about`, `015-contact` (voice only)

> This file is the **content truth** for `homepage-prompt.md`. Agents must not invent sections or rewrite marketing claims beyond this inventory (except visual redesign of the same story).

---

## Page map (top → bottom)

| # | FIG label (screenshot) | Section job | Key UI |
|---|---|---|---|
| 0 | Header | Global chrome | Logo · 7 nav links · theme · Sign in · Start a project |
| 1 | Hero + product proof | Sell studio + portal | Intake pill · H1 · lead · 2 CTAs · Project Hub / command mockups · sector ticker |
| 2 | `FIG 02 · DELIVERY NARRATIVE` | How delivery works | 4 step cards + milestone timeline panel |
| 3 | Money / financial clarity | Payments story | ₹ clarity · milestone money rows · Razorpay / Bank / UPI (preview) |
| 4 | `FIG 04 · WHY NESTLANCER` | Differentiator grid | 6 proof cards (₹4.2L highlight) |
| 5 | `FIG 05 · SELECTED WORK` | Portfolio tease | “View all →” · work cards · illustrative caption |
| 6 | `FIG 06 · START` | Closing conversion | CTA headline · checklist · dual buttons |
| 7 | Payments preview table *(in HTML; may sit near money)* | Tabular money | Milestone table · collected ₹4,28,500 |
| 8 | Footer | Sitemap + legal | Brand blurb · PRODUCT / COMPANY / LEGAL · © line |

---

## Locked homepage copy (verbatim from shot / landing)

### Header
- Nav: Product · Portfolio · Blog · About · Pricing · Services · Contact  
- Actions: Sign in · **Start a project** (+ theme toggle in shot)

### Hero
- Pill: **Intake open** (green live dot)  
- Eyebrow variants seen: `FIG 01 · NEXUS SURFACE` / `FIG 01 / THE DELIVERY SYSTEM`  
- **H1:** Ship with clients **in the loop** — and money under control.  
  - Gradient accent on “in the loop”  
- **Lead:** Nestlancer fuses a dedicated product studio with an operating system for delivery: fixed-price quotes, milestone payments, live Project Hub, and Razorpay / UPI.  
- Primary CTA: **Start a project →**  
- Secondary CTA: **Tour the product** (HTML anchors `#how-it-works`; closing band uses **Preview the portal**)

### Product preview (illustrative — not live data)
- Project Hub window: `project-hub · NL-204` · “Frontend development — SaaS Landing Redesign”  
- Badges: In progress · Deposit paid · Due Fri · ₹48,000 · 68%  
- Activity: Staging build pushed · Rahul: Hero CTA above the fold?  
- Status list: Discovery complete · UI Design complete · Frontend 68% active · QA & handoff pending  
- Caption: Illustrative Project Hub preview  

### Sector ticker
HEALTHTECH · FINTECH · E-COMMERCE · SAAS · B2B PORTALS · MOBILE APPS · DESIGN SYSTEMS · MARKETPLACES  

### FIG 02 — Delivery narrative
- Eyebrow: `FIG 02 · DELIVERY NARRATIVE`  
- **H2:** From brief to release — one continuous surface.  
- Support: Every marketing claim is a real Project Hub state your client can open.  
- Steps:  
  1. **02.1 Request** — Scoped intake, not a ticket black hole.  
  2. **02.2 Quote** — Fixed-price line items with milestones.  
  3. **02.3 Build** — Live progress, files, and messages.  
  4. **02.4 Pay & release** — Milestone pay with Razorpay / UPI.  
- Timeline panel: Discovery Done · UI Design Done · Frontend Active 68% · QA & release Queued  

### Money surface
- **H2:** Financial clarity for every milestone.  
- Support: Milestone gates, tabular ₹, and India rails — finance your team can audit.  
- Rows: Milestone 2 Design Paid ₹29,500 · Milestone 3 Frontend Pending ₹48,000 · Final Due ₹62,000  
- Labels: `PREVIEW · ILLUSTRATIVE` / `Preview, not a live checkout`  
- Rails: Razorpay · Bank · UPI · PCI · India rails  

### FIG 04 — Why Nestlancer
- Eyebrow: `FIG 04 · WHY NESTLANCER`  
- **H2:** Engineered for delivery, not marketplace noise.  
- Cards:  
  - Milestone payouts — **₹4.2L** — Razorpay milestones — deposit, mid, final.  
  - Reply under 2m — Typical studio response on active threads.  
  - Fixed-price only — No hourly fog. Scope locks on accept.  
  - Command density — Search jumps across Hub, quotes, pay.  
  - Deliverable gates — Payment gates tied to approvals.  
  - Selective intake — Quality over volume — scoped studio work.  

### FIG 05 — Selected work
- Eyebrow: `FIG 05 · SELECTED WORK`  
- **H2:** Work that speaks for itself.  
- Link: View all →  
- Cards (illustrative concepts — not customer screenshots):  
  - B2B Client Portal UX · Fitness Tracking App · Marketplace Redesign · Brand Identity System · Fintech Payments Hub · SaaS Analytics Platform · E-Commerce Mobile App · HealthTech Dashboard  
- Caption: Illustrative product concepts — not customer screenshots.  

### FIG 06 — Start (closing CTA)
- Eyebrow: `FIG 06 · START`  
- **H2:** Ready to ship with clarity?  
- Lead: Fixed-price studio work. Live Project Hub. Razorpay milestones. Intake is open.  
- Checks: ✓ Reply in 24h · ✓ Fixed-price quotes · ✓ No subscription · ✓ Made in India  
- CTAs: **Start a project →** · **Preview the portal**  

### Footer
- Blurb: Product studio + client portal. Fixed-price quotes, Razorpay milestones, live Project Hub.  
- PRODUCT: Project Hub, Pricing, Services, Portfolio  
- COMPANY: About, Blog, Contact, Start a project  
- LEGAL: Terms, Privacy, Verify document  
- © 2026 Nestlancer. Made in India. All rights reserved.  

---

## Visual / craft notes measured from the shot

| Token | Observation |
|---|---|
| Canvas | Soft off-white / mint mesh wash behind hero (~`--bg` / `--mesh`) |
| Type | Geometric sans; navy ink; teal accent on gradient phrase + primary buttons |
| Header | ~72 px feel; logo left; inline 7 links; pill CTA right |
| Cards | ~12–16 px radius; hairline borders; soft shadow on product windows |
| Product windows | Fake “traffic light” chrome; mono eyebrows; tabular ₹ |
| Density | Generous whitespace; one job per FIG section |
| Labels | Every major block has a mono FIG eyebrow — keep that voice |

---

## What a redesign may change vs must keep

| May change (visual) | Must keep (content / story) |
|---|---|
| Layout geometry of hero art / mockups | H1, lead, CTAs, FIG section purpose |
| Card arrangement / motion | Step names 02.1–02.4 and their meaning |
| Chrome pattern (Orbit / Mist / Ground) | Locked ₹ figures + illustrative disclaimers |
| Illustration style | No invented clients, prices, or certifications |

**Do not drop** the “illustrative / not a live checkout” disclaimers — they are part of Nestlancer’s honesty.
