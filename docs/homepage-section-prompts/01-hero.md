# Section prompt 01 — Hero, product preview, and sector ticker

Read `docs/homepage-section-prompts/README.md`, `homepage-prompt.md`, and `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`. Inspect the full reference `Nestlancer-public-screenshots/public/013-marketing-homepage.webp` and the current homepage implementation before editing. Apply the shared contract from the README.

## Creative direction for this sample
Invent this section’s visual treatment as an artist, rather than tracing the screenshot. For this generated sample, choose a specific concept and make its composition, hierarchy, and visual storytelling feel intentional and distinct from other samples. The screenshot locks the section’s content and purpose, not its layout. Honor the page/sample art direction so this section still feels integrated. Do not settle for a recolor or a generic card-grid refresh.

## Task
Redesign **only the homepage hero section**, from the intake-status pill through the product preview and industry ticker. The global navigation/header belongs to a separate task: do not redesign or remove it. Preserve all later sections and their order. Make the hero establish both halves of Nestlancer's offer: a dedicated product studio and an operating system for delivery.

Use the reference's quiet, airy composition as a guide, not as a pixel-copy mandate. Create a clear reading sequence: intake status → headline → concise lead → two actions → illustrative product proof → ticker. Keep the first viewport intentional and balanced; on mobile, stack the proof naturally without shrinking it into illegible UI.

## Locked content — retain verbatim
- Status pill: **Intake open** (with a non-color-only status cue)
- H1: **Ship with clients in the loop — and money under control.** Keep the words “in the loop” emphasized if the design supports emphasis.
- Lead: **Nestlancer fuses a dedicated product studio with an operating system for delivery: fixed-price quotes, milestone payments, live Project Hub, and Razorpay / UPI.**
- Primary action: **Start a project →**
- Secondary action: **Tour the product** (link to the existing `#how-it-works` target)
- Project Hub preview: `project-hub · NL-204`; “Frontend development — SaaS Landing Redesign”; In progress; Deposit paid; Due Fri; ₹48,000; 68%; “Staging build pushed”; “Rahul: Hero CTA above the fold?”; Discovery complete; UI Design complete; Frontend 68% active; QA & handoff pending.
- Caption: **Illustrative Project Hub preview**
- Ticker terms: **HEALTHTECH · FINTECH · E-COMMERCE · SAAS · B2B PORTALS · MOBILE APPS · DESIGN SYSTEMS · MARKETPLACES**

## Truth and safety
The Project Hub is illustrative, not live customer data. Label the mockup clearly; never imply a real project, payment, or client. Do not create additional metrics or imply the preview is interactive unless it is. Preserve any existing anchor IDs needed by other sections.

## Acceptance checks
- The H1, lead, both CTA labels, preview details, disclaimer/caption, and all ticker terms remain present.
- Header and all sections below the hero remain intact and outside scope.
- The hero works at narrow mobile widths; controls remain usable and the mock UI remains readable.
- Ticker is static or gently animated; if animated, pause on hover/focus and disable movement for reduced-motion users.
- Describe the design/implementation decisions and checks performed when done.
