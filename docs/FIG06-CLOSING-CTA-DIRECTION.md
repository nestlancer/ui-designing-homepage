# FIG 06 · Closing CTA — direction, research & concept roster

## Screenshot gate

**Reference opened:** `Nestlancer-public-screenshots/public/013-marketing-homepage.webp` (2880 × 10444; 1440 CSS px at 2×).  
**Section read:** FIG 06 sits immediately after the selected-work shelf and immediately before the existing footer. It is a light, quiet closing band: a compact mono figure label; a centered, two-line headline; one short lead; four inline reassurance checks; then a filled primary action beside a quieter portal-preview action. The surrounding page uses soft off-white/mint, navy type, restrained teal, fine rules, generous whitespace and a direct transition to the footer.  
**Content source cross-check:** `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md` and `docs/homepage-section-prompts/06-closing-cta.md`.  
**Gate:** PASS — content and purpose agree; the screenshot is treated as evidence, not as a layout to copy.

## What the first five passes establish

- **01 · Hero:** airy, confident product-studio opening; navy/teal typography and product-window proof.
- **02 · Delivery:** continuous-path / route logic, practical process structure and restrained UI detail.
- **03 · Financial clarity:** data-first layouts, tabular INR and honest preview labels.
- **04 · Why Nestlancer:** stronger contrast and expressive proof geometry (connected strands and asymmetric proof fields).
- **05 · Selected work:** editorial shelves, project-window framing and varied portfolio browsing patterns.

FIG 06 should feel like the page has *earned a pause*: less information density than the preceding work shelf, no new product story, and a clear next step. The ten treatments vary composition, material and interaction while keeping the five locked copy groups and the two actual destinations intact. No redesign of the footer is included.

## Online pattern research — translated, not copied

- [Untitled UI · CTA sections](https://www.untitledui.com/components/cta-sections) shows that a closing ask can be a centered or left-aligned band, a contained field, a split testimonial-style panel, or a UI-adjacent composition. Takeaway: vary the *structure*, not only the background colour.
- [Framer · 10 call-to-action examples](https://www.framer.com/blog/10-call-to-action-examples/) recommends a distinct primary/secondary hierarchy, sufficient contrast, and familiar button affordances. Applied here: Start a project stays visually primary; Preview the portal remains a quieter but still obvious second path.
- [Moda · SaaS landing-page teardown](https://moda.app/blog/saas-landing-page) describes Linear's ending as a repeat of the same product story with two next-step paths, rather than a new offer. Applied here: FIG 06 repeats the established Nestlancer promise and introduces no new pitch.
- [HubSpot · CTA examples](https://blog.hubspot.com/marketing/call-to-action-examples) highlights negative space as a way to make the action easier to notice. Applied here: several concepts use typography, whitespace, rules, or a single strong band instead of extra cards and claims.
- [LogRocket · CTA button best practices](https://blog.logrocket.com/ux-design/cta-button-design-best-practices/) reinforces clear visual affordance, contrast and generous interaction targets. Applied here: both actions remain readable, keyboard-visible and at least 44 px tall; mobile layouts stack them when needed.

These are pattern references, not templates to clone. No third-party brand assets, copy, fonts, scripts or external requests are used in the samples. The prompt's no-invented-claims rule takes precedence over generic conversion advice (for example, no invented free trial, guarantee, deadline, price, or extra risk-reversal).

## Existing destination check

The current landing-page prototype uses `register/index.html` for **Start a project** and `login/index.html` for **Preview the portal**. The samples preserve those original prototype destinations as root-relative `/proto/apps/landing/register/index.html` and `/proto/apps/landing/login/index.html`. Those routes belong to the landing prototype, not this section-lab repo; the samples do not replace the actual portal-preview destination with a mock form or an invented route.

## Ten concept cards

| ID | Concept | Mood / composition | Signature interaction |
|---|---|---|---|
| C01 | **Quiet Meridian** | Spacious centered typesetting; one fine horizontal axis; a four-part reassurance line. | Intersection-triggered axis draw and gentle copy reveal. |
| C02 | **Twin Thresholds** | Unequal paired surfaces; the primary project action owns the wider field, portal preview has a distinct quieter field. | Two panels meet across a drawn seam on entry. |
| C03 | **Four-Point Orbit** | Copy on one side; four confirmations held around a circular open field on the other. | SVG orbit traces in when the section enters view. |
| C04 | **Editorial Endnote** | Broadsheet-like left/right rhythm, oversized headline, compact bottom folio of four checks. | Rule-led reveal, with no moving content required to understand it. |
| C05 | **Night Shift** | Full-bleed navy closing band, restrained grid, strong typographic contrast. | One inset line wipes in on intersection; reduced motion removes the wipe. |
| C06 | **Folded Note** | A paper-like inset sheet with a single folded corner and a separate action rail. | Sheet settles into place with a short transform/opacity reveal. |
| C07 | **Studio Ledger** | Four reassurance statements set as an open ledger rather than four cards; CTAs sit in the final column. | Staggered row/column reveal. |
| C08 | **Cutline Relay** | Wide architectural band with an offset edge and a crisp teal cutline leading to the actions. | The cutline grows from the section edge on entry. |
| C09 | **Open Window** | Window-like frame with a large typographic field and a clean two-action footer, not a fabricated product mockup. | Frame rails draw in; the button arrows respond to keyboard/pointer focus. |
| C10 | **Footer Handshake** | A deliberately low, quiet transition band; checks form a narrow strip and actions land above the existing footer. | Top and bottom rules resolve in sequence on entry. |

Each file in `homepage-closing-cta/samples/` is standalone, with its own CSS and inline JS, light/dark theme support, reduced-motion handling, focus styling, responsive layout and no network dependencies.
