# FIG 04 · Why Nestlancer — research, critique, and new concepts

**Scope:** section 04 of the marketing homepage; initial research performed 18 October 2026, with a rendered-reference revision on 19 October 2026. The only content authority is [`HOMEPAGE-SCREENSHOT-RESEARCH.md`](HOMEPAGE-SCREENSHOT-RESEARCH.md) and the source screenshot. External pages below are references for *composition*, never sources of Nestlancer facts. The later side-by-side review of the screenshot and actual FIG 01–03 HTML is recorded in [`FIG04-COMPARATIVE-REVIEW.md`](FIG04-COMPARATIVE-REVIEW.md).

## What was unsatisfying about the earlier branch

Inspected `arena/e70ba0ed-ui-designing-homepage` without checking it out: its ten samples and `docs/WHY-NESTLANCER-RESEARCH.md`. Several ideas are individually promising, but W01/W03 depend on a six-point connector field; W04/W06/W08 depend on large type plus a low row of small proofs; W07/W10 depend on six abstract marks; W05 is a static command metaphor. Most are variations of six open text blocks on a pale field, with only a headline-scale change or decorative illustration. Important copy often sits at ~12–14px. The gallery calls them ten different directions, but the first-glance silhouettes and reading rhythm are too similar. This is a **design critique**, not a judgment about the truthfulness of their locked copy. None of those files is copied into this branch.

A better reset: keep six **legible** reasons and the two claim-adjacent qualifications, but create different *spatial experiences*: an engraved sheet, an inverse threshold, a usable selector, a folded editorial surface, a paired mechanism, and a restrained field index. The design should explain a studio + portal decision, not decorate six marketing cards.

## References actually consulted

1. [Department — Framer Marketplace](https://www.framer.com/marketplace/templates/department/): described as a dark editorial agency template with a disciplined Swiss-inspired grid, contrasting type hierarchy, and micro-interactions. **Translation:** W02 uses one strong dark/light seam and ruled proof bands. **Do not borrow:** testimonial/award sections, branding, or its layout wholesale.
2. [Materia — Framer Marketplace](https://www.framer.com/marketplace/templates/materia/): described as an architectural, sharp-edged print-like studio site with editorial splits and a chronological index. **Translation:** W04 treats copy as a folded sheet and physical margin annotation. **Do not borrow:** serif font, craft-product imagery, or identity.
3. [The Stillform — Framer Marketplace](https://www.framer.com/marketplace/templates/the-stillform/): prioritizes generous whitespace, typography, and restrained reduced-motion-safe motion. **Translation:** W06 is the quieter option with a precise mobile reading path. **Do not borrow:** project content or component designs.
4. [Baillat Studio by Locomotive — Awwwards case study](https://www.awwwards.com/case-study-baillat-studio-by-locomotive.html): explains a modular editorial grid, contrast between light/dark worlds, and typography as a central part of the concept. **Translation:** W01/W02 can use contrast and an intentional page grid without copying artwork or identity.
5. [Linear features](https://linear.app/features): groups its product explanation around actual jobs such as planning and building, with product imagery. **Translation:** W03/W05 organize supplied Nestlancer mechanisms as readable jobs, but any illustration is clearly conceptual; never invent product states or live Hub screens.
6. [Stripe: payment-page wireframes](https://stripe.com/resources/more/payment-page-wireframes): explains that users need clear summaries, obvious hierarchy, mobile layouts, and trust/terms near relevant decisions. **Translation:** place the ₹4.2L and response-time qualifications next to their respective claims. **Do not borrow:** checkout UI or payment-provider branding.
7. [Nielsen Norman Group: visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/): discusses scale, contrast, and grouping as ways to guide attention. **Translation:** one focal idea and different sizes of proof, not six identically loud cards.

These pages are not a representative sample of all websites. Their traffic rank or commercial performance has **not** been asserted. No external imagery, CSS, JavaScript, font, or copy is reused in the implementation.

## Content / risk map

| Slot | Design use | Risk and remedy |
|---|---|---|
| Milestone payouts / ₹4.2L | Anchor figure for the payout mechanism | Could look like an audited total; state *illustrative homepage proof copy, not a verified payout total* immediately beside it. |
| Reply under 2m | Small but visible response claim | Could read like an SLA; state *illustrative homepage proof copy, not a response-time guarantee* beside it. |
| Fixed-price only | Scope / boundary metaphor | Do not fabricate contract documents or pricing. |
| Command density | Hub / quotes / pay navigation metaphor | Do not draw a fake functioning search box or results. |
| Deliverable gates | Approval relationship | Do not invent approval state, client, or release date. |
| Selective intake | Curation / focus metaphor | Do not fabricate acceptance rates or waiting lists. |

`deposit`, `mid`, and `final` may appear as abstract step labels because they are literal locked copy. They are not transactions or extra metrics. Indices 01–06 are reading aids, not KPIs.

## Six concept cards — written before implementation

### W01 · Payout Press
- **Metaphor:** an engraved payout sheet, made from the supplied “deposit, mid, final” language rather than fake checkout data.
- **1440 / 390:** a wide mint press plate with a large left figure and three engraved labels; a facing dark ruled index holds five other fully written reasons. On phone it becomes one continuous vertical sheet, figure and its caveat first.
- **Focal proof:** Milestone payouts. All others remain in an open, numbered list.
- **Behavior:** a short sheet/rule reveal only; default HTML always readable.
- **Basis:** [Baillat modular contrast](https://www.awwwards.com/case-study-baillat-studio-by-locomotive.html), [Stripe clarity](https://stripe.com/resources/more/payment-page-wireframes).
- **Not:** the rejected branch’s floating payout card, a receipt with invented charges, or a payment CTA.

### W02 · Signal / Noise
- **Metaphor:** a dark typographic threshold turns “not marketplace noise” into structured quiet; a clean white proof wall is the resolution.
- **1440 / 390:** asymmetric dark headline field next to an open numbered wall, with one teal seam; on phone, one dark introductory slab followed by six generous ruled statements.
- **Focal proof:** the H2 and the complete six-reason set, without a second giant KPI competing for attention.
- **Behavior:** a small noise stamp resolves as the dark/light seam is drawn; the six decorative proof marks sharpen, but no copy blurs or disappears. No continuous blinking or marquee.
- **Basis:** [Department](https://www.framer.com/marketplace/templates/department/), [NN/g hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/).
- **Not:** a dark recolor of W01, glitch graphics, or fabricated marketplace criticism.

### W03 · Proof Console
- **Metaphor:** an editorial instrument for inspecting one supplied reason at a time; the *illustrative drawing*, not the copy, changes.
- **1440 / 390:** six always-readable selector rows left, one large artboard right; on phone the list precedes the artboard.
- **Focal proof:** the selected reason; the list remains fully visible and legible throughout. The board shows only abstract labels/geometry derived from existing phrases.
- **Behavior:** real keyboard- and touch-operable buttons with pressed/focus states; no hidden descriptions or invented search results. Without JS the first illustration stays visible and every reason reads normally.
- **Basis:** [Linear feature organization](https://linear.app/features), [NN/g hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/).
- **Not:** the rejected static command-palette mockup or a faux live product demo.

### W04 · Scope Fold
- **Metaphor:** a folded studio brief; a physical margin carries notes, while the intact page carries the decision copy.
- **1440 / 390:** one asymmetrical sheet spanning the section, a clipped corner and paper rules, staggered columns of proof; at phone width the fold becomes an unobtrusive top-right detail and copy stacks in order.
- **Focal proof:** Fixed-price only as the sheet’s anchor, while payout remains prominent and qualified.
- **Behavior:** the paper corner and printed scope brackets settle once when the sheet enters view; a hover nudge is decorative. No content flips or disappears.
- **Basis:** [Materia](https://www.framer.com/marketplace/templates/materia/), [Stillform](https://www.framer.com/marketplace/templates/the-stillform/).
- **Not:** six separate cards, a scanned contract, or unreadably tiny margin copy.

### W05 · Gate Logic
- **Metaphor:** paired decisions, not a chronological workflow: payout + scope; response + navigation; approvals + selective intake.
- **1440 / 390:** three substantial horizontal proof bays with contrasting typographic scales and unique CSS motifs, each holding two complete reasons; on phone the six reasons remain 01–06 in DOM order without a horizontal swipe.
- **Focal proof:** the relation between money and boundaries, with the figure qualified beside it.
- **Behavior:** in-view connectors, keys, and edge marks settle once; every pair exists in full without motion.
- **Basis:** [Linear’s job grouping](https://linear.app/features), [NN/g grouping](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/).
- **Not:** FIG 02’s timeline, fake approval states, or a familiar equal-card bento.

### W06 · Field Notes
- **Metaphor:** a compact studio field guide with measured whitespace, ruled annotations, and one typographic “specimen” per supplied reason.
- **1440 / 390:** a wide quiet masthead and offset columnar index; at 390 the index becomes six crisp, generous single-column paragraphs with no hidden details.
- **Focal proof:** the full set and its editorial clarity, rather than a decorative hero illustration.
- **Behavior:** hover, touch, or keyboard focus on a proof row updates a small desktop reading locator; the full index stays visible. Mobile and no-JavaScript reading remain linear; reduced motion is identical in meaning.
- **Basis:** [Stillform](https://www.framer.com/marketplace/templates/the-stillform/), [Baillat modular grid](https://www.awwwards.com/case-study-baillat-studio-by-locomotive.html).
- **Not:** the previous branch’s giant “04” poster with five undersized footnotes.

## Delivery intent

Six original self-contained HTML files + six honest `sample.json` cards + one navigable gallery at `homepage-why-nestlancer/`. The lab is a **selection exercise**; it does not rewrite FIG 01–03 or pretend the six variants can all live together on one homepage.
