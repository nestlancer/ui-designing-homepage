# Section prompt 04 — FIG 04 · Why Nestlancer (creative reset)

> Paste this entire prompt into an agent with this repository open. This is a **section-design lab**, not a request to build six full homepages. Read `docs/homepage-section-prompts/README.md`, `homepage-prompt.md` (brand rules), `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`, and `docs/WHY-NESTLANCER-RESEARCH.md` first. Open `Nestlancer-public-screenshots/public/013-marketing-homepage.webp`; use it to verify content and placement, **not** as a layout template. Inspect at least one approved sample each in `homepage-hero/`, `homepage-delivery/`, and `homepage-financial-clarity/` to understand the quality bar and brand tokens.

## The actual assignment

Make **six new, excellent, visibly different FIG 04-only HTML explorations** and a gallery at `homepage-why-nestlancer/`. The ten explorations on `arena/e70ba0ed-ui-designing-homepage` are a *rejected direction*, not source code to reuse. They share too much of the same airy six-item-list grammar; a new name, line illustration, oversized “04”, theme, or reordered list is not a new idea. Inspect them only to avoid repeating that failure. Prioritize six art-directed experiences over ten weak permutations.

The section sits **after Financial clarity** and **before Selected work**. It answers “why this studio + portal?” with six supplied reasons. FIG 02 already owns the step-by-step delivery timeline; FIG 03 already owns the money table. FIG 04 must feel like a **decision point**: show the mechanism behind the reasons without turning it into another timeline, a second checkout, or an invented case study. Keep a sensible visual seam to the adjacent off-white/mint/navy/teal sections.

### Unbreakable content contract

Render the following **exact text in every sample**, as visible HTML text (not only in an SVG, image, hover state, aria label, accordion, or animation). Natural HTML entities and line breaks are fine; do not paraphrase. Keep the supplied order in the DOM and on mobile.

| Element | Locked text |
|---|---|
| Eyebrow | `FIG 04 · WHY NESTLANCER` |
| H2 | `Engineered for delivery, not marketplace noise.` |
| 01 title | `Milestone payouts` |
| 01 figure | `₹4.2L` |
| 01 explanation | `Razorpay milestones — deposit, mid, final.` |
| 02 title | `Reply under 2m` |
| 02 explanation | `Typical studio response on active threads.` |
| 03 title | `Fixed-price only` |
| 03 explanation | `No hourly fog. Scope locks on accept.` |
| 04 title | `Command density` |
| 04 explanation | `Search jumps across Hub, quotes, pay.` |
| 05 title | `Deliverable gates` |
| 05 explanation | `Payment gates tied to approvals.` |
| 06 title | `Selective intake` |
| 06 explanation | `Quality over volume — scoped studio work.` |

**Truth next to the claim, not buried elsewhere:** mark `₹4.2L` as *illustrative homepage proof copy, not a verified payout total* beside the figure; mark `Reply under 2m` as *illustrative homepage proof copy, not a response-time guarantee* beside that title or explanation. You may use those short qualifiers verbatim. Never imply a live transaction, measured SLA, customer result, rating, client list, accreditation, testimonial, review, conversion rate, or performance history. Do not invent a dashboard record, payment status, new monetary amount, or additional numeric KPI. Decorative numerals `01–06` are item indices only. If using “deposit / mid / final,” they are labels from the supplied sentence, **not** records with fictitious states.

## Research-informed direction (study the actual pages; do not copy them)

- [1](https://www.framer.com/marketplace/templates/department/) **Department**: a disciplined dark editorial grid and typographic authority. Borrow controlled contrast and a decisive silhouette, not its agency branding or testimonials.
- [2](https://www.framer.com/marketplace/templates/materia/) **Materia**: an architectural print-like spread with sharp edges, generous margins, and a strong content index. Borrow material/typographic rhythm, not serif fonts or its product imagery.
- [3](https://www.framer.com/marketplace/templates/the-stillform/) **Stillform**: quiet editorial spacing and restrained motion; a strong counterpoint to maximal layouts.
- [4](https://www.awwwards.com/case-study-baillat-studio-by-locomotive.html) **Baillat Studio case study**: flexible modular grids and contrasting light/dark editorial worlds. Borrow the *principle* of compositional contrast, never its art or identity.
- [5](https://linear.app/features) **Linear features**: organize the explanation around real product jobs. Translate Nestlancer’s supplied nouns into a believable **illustration**, not a fake live Hub.
- [6](https://stripe.com/resources/more/payment-page-wireframes) **Stripe’s wireframe guide**: clarity and visible terms at decision points. Use the lesson to keep qualifiers adjacent to the illustrative figure/response claim; do not build checkout UI here.
- [7](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/) **NN/g on visual hierarchy**: scale, contrast, and grouping should tell the eye where to go; if every reason has identical treatment, hierarchy has failed.

Source observations and translation rules live in `docs/WHY-NESTLANCER-RESEARCH.md`. These are **inspiration references**, not assets or evidence that Nestlancer has the referenced products’ capabilities.

## Invent before implementing

Write six concept cards in `docs/WHY-NESTLANCER-RESEARCH.md` before writing HTML. For each: (1) a memorable visual metaphor tied to *specific supplied nouns*; (2) a layout silhouette at 1440 and 390; (3) the focal reason; (4) how the other five stay readable; (5) one purposeful motion/interaction or a defensible static choice; (6) a cited design reference; (7) what it **must not** look like. Reject two concepts if they only differ in palette, border radius, illustration style, or the location of an otherwise identical six-item list. No more than two samples may use a conventional equal-card grid, and at least four should not resemble a card grid at all.

Use six different composition families, for example:

1. **Payout Press** — a broad typographic payout sheet with a restrained deposit / mid / final engraving and a facing index of the other reasons; not a dashboard.
2. **Signal / Noise** — a dramatic inverse field where empty space and a sharp typographic seam contrast with six clean, readable proof statements; not a generic dark mode recolour.
3. **Proof Console** — an accessible, genuinely functioning proof selector: all six descriptions remain visible while a separate, explicitly illustrative visual plate changes; not a fake command-palette input.
4. **Scope Fold** — one folded editorial surface with asymmetrical columns and meaningful print-like margin notes; not another floating-card grid.
5. **Gate Logic** — group the six exact reasons into three *visual pairs* (money/scope, communication/control, approval/intake) without adding new product claims or implying a chronological process; not FIG 02 repeated.
6. **Field Notes** — a quiet, mobile-first ruled index / specimen sheet whose visual precision is the point; not a typography-only poster with microscopic explanatory text.

These names are prompts, not mandatory branding. Improve them if you find a stronger concept. Each must have a different first-glance silhouette.

## Build contract

- Output `homepage-why-nestlancer/index.html` (gallery with short concept descriptions and links), plus exactly six `homepage-why-nestlancer/samples/W01-…/index.html` files and paired `sample.json` cards. Keep each sample **self-contained**: local inline CSS and any necessary inline JS; no build, CDN, external font, remote image, dependency, iframe, placeholder or broken link. The gallery may link back to the research/prompt. Do not edit the first three galleries or their samples.
- Each demo’s actual design lives in **one semantic `<section id="why-nestlancer" aria-labelledby="why-title">` inside `<main>`**. A small theme button outside the section is permitted as lab chrome; no header, footer, hero, money table, or later sections. Use one `<h2>` and six `<h3>`s; do not make the decorative art the only carrier of content.
- Use the Nestlancer palette: off-white, white, mist/mint, deep navy, restrained teal. Dark-native compositions are allowed if they also render well in light mode. System sans + system mono only; no unrelated accent colors, neon, stock photos, fake logos, AI images, marquee filler, gratuitous 3D, or gradient soup. Art can be handcrafted CSS or inline SVG and must be semantically decorative where appropriate.
- Keep explanatory copy at a comfortable **14–16px or larger** and caveats at **12px or larger** on a phone. Avoid forced all-caps for full explanations. Put figure and both qualifiers near the claims even on narrow screens.
- Interactive samples: actual working buttons and visible selected/focus states; buttons at least 44px high. Keyboard and touch must work. Content may become *emphasized* or a decorative illustration may change, but **never hide any of the six reasons** behind tabs, accordions, horizontal scroll, hover, or JS. Static content must work if JS is disabled.
- A lab theme control supports `?theme=light|dark`, then saved theme, then OS preference; a click updates pressed state, label, and local storage. The control must not overlap text at 360px. The section must be legible in both themes. Respect `prefers-reduced-motion`; motion cannot gate content or run indefinitely. No fake count-up of `₹4.2L` or `under 2m`.
- Responsive at 360, 390, 768, 1024, and 1440 CSS px: no clipping of headline, rupee glyph, qualifications, or list; no horizontal body scroll; sensible reading order. Use `minmax(0,1fr)`, wrapping, fluid type and mobile-specific composition rather than simply shrinking desktop art.
- Keep metadata truthful: concept, silhouette, focal reason, interaction, references, scope, and safety note. Do not claim visual verification without an actual browser check.

## Review / rejection gate

For **each** sample, ask:

1. At a glance, can a designer identify its visual metaphor without reading `sample.json`? Is it clearly different from the other five **and** the rejected branch’s six-item diagrams/posters?
2. Can a reader find `Milestone payouts`, the ₹ figure and qualifier, `Reply under 2m` and its qualifier within one normal reading path? Are all six explanations visible?
3. Is every graphic grounded in the supplied wording, or is it attractive but arbitrary decoration? Does any UI imply a live product feature, verified metric, or customer history that was never supplied?
4. Does it still work with JS disabled, reduced motion, keyboard navigation, and at phone width in both themes?
5. Does it feel like the same product studio as sections 01–03 when placed between money and selected work?

If two fail the difference test, **redesign one before shipping**. Deliver six polished files, not a claim of six polished files. Report exact files, research URLs, checks actually run, and anything unverified. Work manually; do not write scripts to generate sample HTML or search through repository files.
