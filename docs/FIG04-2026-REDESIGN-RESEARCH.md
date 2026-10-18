# FIG 04 / Third-pass art direction — 19 October 2026

## Why another pass is necessary

The October 18–19 refinements made the six samples readable, responsive, and honest, but **not memorable enough**. The six rendered pages still open with nearly the same 48px heading and then resolve into variations of a bordered grid, split panel, or ruled list. Most of the visual “proof” is a tiny circle, line, or label added *after* the text. The page often talks about being a study (“not invented metrics”, “not product UI”) instead of looking like a considered Nestlancer section. The original screenshot is less theatrical but more direct: headline, one convincing payout object, five supporting reasons, then Selected Work. The earlier approved Hero/Delivery/Money explorations have an identifiable interface, route, or document that creates their form. FIG 04 needs that same cause-and-effect.

This is a **visual critique of our own rendered HTML**, not a request to copy the original card layout or to alter sections 01–03. Keep all supplied FIG 04 wording, exact order in the DOM **and in the desktop/mobile visual reading path**, and both adjacent illustrative qualifications. Do not invent users, live payments, success metrics, fake customer evidence, or working product screens.

## What recent, actually inspected references suggest

1. [Figma, *Top Web Design Trends for 2026*](https://www.figma.com/resource-library/web-design-trends/) — expressive typography, modes, and motion are contemporary tools; use them as part of wayfinding and information hierarchy, **not** to enlarge a mid-page heading into another hero or add color for its own sake.
2. [Codrops, *MERSI: Between Print and Digital* (July 2026)](https://tympanus.net/codrops/2026/07/27/between-print-and-digital-the-making-of-mersis-website/) — print materiality works when a page behaves like the physical object it depicts. Translate this into an engraved payout strip or annotated scope drawing, not a decorative paper corner.
3. [Codrops, *Kononenko Architectural Bureau* (September 2026)](https://tympanus.net/codrops/2026/09/18/kononenko-architectural-bureau/) — the same content can support different ways of looking; the inactive work stays visible while the active piece gains priority. Translate into an optional proof selector with all six descriptions still visible.
4. [Codrops, *Chems.Studio digital archive* (August 2026)](https://tympanus.net/codrops/2026/08/08/designing-a-flexible-digital-archive-for-chems-studios-creative-practice/) — a stable grid can vary tempo and remain quiet; motion should orient the reader rather than loop for decoration. Translate into one calm, highly finished index option.
5. [Codrops, *Yestalgia* (September 2026)](https://tympanus.net/codrops/2026/09/12/yestalgia-bringing-decathlons-90s-spirit-to-life-through-a-playful-digital-experience/) — an interaction becomes memorable when it is a physical expression of the concept; motion embedded in the graphic language is more convincing than a generic fade-up. Translate into a noise shutter, gate, or press mechanism only if the mechanism is intelligible.
6. [MockFlow, *SaaS Website Design Trends 2026* (June 2026)](https://mockflow.com/blog/saas-website-design-trends) — clear product-led illustration and trust cues placed next to claims beat polished but meaningless visuals. For Nestlancer, **do not** imitate customer logos, dashboards, testimonials, or performance statistics that the supplied copy cannot support.
7. [Awwwards, *AI in Design Report 2026* (August 2026)](https://www.awwwards.com/sites/ai-in-design-report-2026) — a chaptered editorial system can give data and visuals one language. Borrow chapter rhythm and disciplined labels, **not** invented charts for ₹4.2L or response times.

These are visual/interaction references, **not evidence about Nestlancer**, and no third-party layout, art, code, font, or image is to be copied. “Latest” here means sources available by 19 October 2026, not a claim that every example is new or suitable for this brand.

## Non-negotiable art-direction rules

- The first 2 seconds must show **six different silhouettes** in the gallery. Change headline *placement*, proof *carrier*, and spatial rhythm—not merely colors, corners, numerals, or the arrangement of six identical cards.
- Each direction must have one **large copy-derived object**, not six mini glyphs after six cells. The object must say something about payout stages, scope, approvals, portal navigation, conversation, or selective work.
- The object cannot pretend to be a live application, transaction, document of record, SLA, or client outcome. Keep `₹4.2L` beside “Illustrative homepage proof copy, not a verified payout total.” Keep “Reply under 2m” beside “Illustrative homepage proof copy, not a response-time guarantee.”
- Place the exact heading and all six exact proof/explanation strings in semantic HTML; headings and explanation text must not be masked, hidden behind interaction, or rendered solely inside illustration. The first two proof items should remain easy to locate.
- Make the visual choice **purposeful at 390px**, not a screenshot of the desktop layout collapsed into one long grid. Change the composition, but keep DOM/mobile reading order 01–06.
- Use the established studio system: system sans/mono, deep navy, off-white, white, mist/mint, restrained teal, hairline rules. No unrelated neon, glossy 3D, external fonts, photography, fake UI data, or library dependency. A sun/moon-only 44px lab toggle should recede into the chrome.
- Small type is for annotations only. Explanations ≥14px, caveats ≥12px on phones; all contrast and focus states must be legible in both themes. One-time motion or user-driven interaction, reduced-motion fallback, and no-JavaScript readable content.

## Six art-directed carriers to test

| Existing slug | New first-glance carrier | Interaction with a reason to exist | Explicit rejection |
|---|---|---|---|
| W01 · Payout Press | A broad engraved *milestone ribbon*: large qualified figure and three tactile deposit/mid/final plates, with five quiet notes under the object. | The engraved rule passes through three supplied labels once; no transaction state animates. | The old 50/50 mint/dark split card and another receipt from FIG 03. |
| W02 · Signal / Noise | One dark typographic field cut open by a precise mint signal aperture; reasons sit on open ruled channels rather than white cards. | A real Focus/Noise control changes only the decorative interference field, never the proof copy. | A dark recolor of six white rectangles or an inaccessible glitch effect. |
| W03 · Proof Console | A horizontal proof instrument: compact selector keys, one large illustrated mechanism, and a six-item written evidence strip. | Keyboard/touch selects one *drawing*, while all six explanations remain readable. | The old left-column list with a mostly empty right artboard. |
| W04 · Scope Fold | A drawn **scope boundary** on a blueprint-like folio; fixed-price copy is the center while five reasons behave like margin annotations. | The boundary draws or settles once; labels do not disappear. | A generic folded corner on a six-cell sheet or a mock contract. |
| W05 · Gate Logic | Three unequal interlocking **horizontal pair sheets**: 01–02, 03–04, and 05–06. Each is read left to right before moving down; no tile grid. | A hinge seats at each pair's seam in response to view/attention. | Chronological stepper, desktop order 01/02/05 then 03/04/06, or three identically sized bento rows. |
| W06 · Field Notes | A physical **open field book** with two bound pages of three notes each, registered tabs, and an active reading marker. | Pointer/keyboard focus changes the marker, with no change to actual copy or reading order. | A plain table with a small hover line or a giant decorative “04” poster. |

## Rendered results and trade-offs

The six studies were manually rebuilt, not restyled from the previous layouts. Review captures are in ignored `tmp/fig04-redesign/`; the gallery uses CSS miniature silhouettes of the **current** HTML, not screenshots of the discarded versions. Browser measurements below include the section's vertical padding at 1440px and 390px; these are not intended as fixed production heights.

| Study | Visible carrier at 1440px | Section height 1440 / 390 | Honest limitation |
|---|---|---:|---|
| W01 · Payout Press | A broad slanted three-plate ribbon underneath the qualified figure, then an open 2+3 ledger. | ~1,074 / ~1,522px | The ribbon is intentionally illustrative, not a payment ledger or FIG 03 receipt. |
| W02 · Signal / Noise | Six borderless proof channels around one central lens on a dark field. | ~903 / ~1,504px | Dark-native even in light mode; the focus button only changes the graphic. |
| W03 · Proof Console | A full-width selectable instrument above six permanently visible written reasons. | ~1,102 / ~1,808px | The tallest mobile option: proof 01 begins below the instrument. Use it if inspection is worth the extra scroll, not as the default compact section. |
| W04 · Scope Blueprint | A gridded drawing with fixed-price as the large central boundary and five marginal annotations. | ~959 / ~1,582px | The drawing is a visual scope metaphor, not a contract. |
| W05 · Gate Logic | Three unequal horizontal pair sheets, with a seam at 01–02, 03–04, and 05–06. | ~1,043 / ~1,712px | An earlier *column* triptych broke desktop scan order; the final left-to-right, top-to-bottom pairing fixes it. |
| W06 · Field Notes | A bound two-page book with three reasons on each page, a reading locator, and edge tabs. | ~962 / ~1,602px | Read the left page down, then the right; the pages stack in exactly that DOM order on phones. |

**Browser checks, current pass (Chromium):** 60/60 sample combinations passed at 360, 390, 768, 1024, and 1440 CSS pixels in both themes: exact heading, six titles and explanations, correct DOM order, both adjacent qualifications, no horizontal document overflow, no off-screen proof headings, and a 44px-or-larger theme target. Light and dark full-page renders at 1440px and 390px were inspected. Separately checked six theme toggles/storage/query precedence, six JavaScript-disabled layouts, six reduced-motion layouts, W02 focus-control toggling, W03 click/Arrow/Home/End selection with permanent copy, W06 pointer and focus locator behavior, and ten responsive gallery combinations plus no-JS navigation. None of the studies presents actual Nestlancer performance data or a live product screen. This is visual/functional lab QA, **not** a production accessibility audit or a guarantee that the illustrative marketing claims are verified.
