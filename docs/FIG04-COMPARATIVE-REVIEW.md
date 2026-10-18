# FIG 04 — screenshot and section-lab design review

Reviewed from the actual `013-marketing-homepage.webp` (2880 × 10444; FIG 04 around source y=5900–7400) and rendered HTML at 1440px from the three completed section directories. This is a **visual/craft review of repository assets**, not a claim that the reference layout must be copied.

## Original homepage: where FIG 04 belongs

- The financial-clarity section immediately above FIG 04 is a soft mint/blue money surface; FIG 04 switches back to a quiet off-white field; Selected work begins after a generous but controlled bottom margin.
- The original FIG 04 headline is a **section heading**, not a second hero. A small FIG label sits above it. Below: one prominent milestone-payout area, two compact reasons alongside it, then three supporting reasons. The eye reads **headline → illustrative ₹4.2L → five reasons → next section**.
- The original explicitly labels the payout preview `PREVIEW · ILLUSTRATIVE`. The revised lab uses stronger adjacent qualifications for both ₹4.2L and “Reply under 2m”; those remain non-negotiable.
- What to keep: the hierarchy, the contextual honesty, the pause between money and work. What not to copy: its particular 2+3 card grid or exact pixels.

## Rendered first-three labs: what the user approved

| Directory / examples visually reviewed | Useful pattern to bring forward |
|---|---|
| `homepage-hero/` — H01 Ground Truth, H03 Editorial Ledger, H08 Command Rail | A focused headline and a **specific Project Hub preview**, never an abstract shape in lieu of proof. FIG/mono labels and teal emphasis provide rhythm. The visual can be an editorial strip, split window, or rail without becoming a new brand. |
| `homepage-delivery/` — D01 Continuum Rail, D06 Contour Flow, D08 Atrium | Four steps are **explained by one readable physical/system metaphor**: rail, path, or split timeline. Motion follows the mechanism (path draw / progress state), while the actual copy and timeline remain readable without it. |
| `homepage-financial-clarity/` — M01 Broadsheet Total, M03 Receipt Print, M07 Departure Board, M10 Scan Ledger | One carefully drawn **artifact** owns the section: statement, receipt, departures board, or ledger. Motion makes the artifact behave (print, flip, scan), rather than simply fading cards. The INR and “preview” notices remain visually attached to the artifact. |

Across these examples the desktop content width is roughly **1160px**, sectional headings mostly around **28–46px** (the hero is allowed larger), major sample sections roughly **740–1140px** tall, window radius about **14px**, with off-white/mint, navy, hairline borders, and one restrained teal accent. They are self-contained section demos, with light/dark themes, responsive stacking, and reduced-motion fallbacks. Those are useful **ranges**, not pixel-copy requirements.

## Gap in the previous FIG 04 shortlist

- Several W01–W06 pages used a **70–110px headline** and a large field before the proof began. That made a mid-page differentiator feel like a second hero and weakened its seam with FIG 03 and FIG 05.
- W01, W02, W04, W05, and W06 mostly used one-time CSS decoration/hover or static rows; the first three labs instead have a meaningful, concise **signature motion tied to what the visual depicts**.
- W02’s generic six-cell proof wall and W06’s plain ruled list did not translate their copy into an artifact as well as the delivery timeline or money receipt do. W03 had the right interaction model but its conceptual artboard needed stronger, copy-derived visual language and clearer mobile feedback.

## Revision decisions

1. **One section-sized heading, then an artifact.** Bring heading scale and max-width back toward the completed section passes. Aim for approximately 800–1050px tall on desktop *where the idea allows*; avoid turning this into a six-page hero collection.
2. **Six different proof carriers, not six different palettes:** W01 impressed payout plate; W02 noise-to-signal field; W03 selectable proof instrument; W04 folding studio brief; W05 three paired gate surfaces; W06 precise reading index with active locator.
3. **Motion must explain the carrier.** A line is engraved, noise resolves, a selector changes its illustration, a fold settles, connectors link a pair, or an index tracks reading. One-time/reduced-motion-safe; never animate the claim values as though they are measured live.
4. **Truth is stronger than spectacle.** Preserve all six titles/explanations in the DOM and visibly on mobile. Keep the exact `₹4.2L`, `Reply under 2m`, and adjacent illustrative qualifications. Do not invent transaction states, client details, approval histories, or UI that pretends to be a live tool.
5. **Check in a browser, not just a text diff.** Review at 360/390/768/1024/1440, light and dark, including no-JS content and keyboard interaction for W03.

## Refinement delivered

| Sample | What changed after the visual review | 1440px section height, light theme |
|---|---|---:|
| W01 · Payout Press | Reduced the heading to section scale; added an explicit preview chip and a one-time engraving of the three supplied milestone labels. | 874px |
| W02 · Signal / Noise | Shortened the inverse masthead; replaced blank proof cells with six word-derived specimen marks; the noise stamp resolves while the seam draws. | 955px |
| W03 · Proof Console | Framed the selected illustration as a compact instrument; gave each scene a copy-derived title and short shape motion; added selected-row feedback on phones. | 985px |
| W04 · Scope Fold | Brought the sheet into section rhythm; the corner and printed scope brackets settle without hiding the brief. | 1008px |
| W05 · Gate Logic | Tightened three paired proof bays; the connectors/keys/gate marks now reinforce the conceptual pairs without turning into a workflow. | 1087px |
| W06 · Field Notes | Replaced the static-only treatment with a focus/hover/touch reading locator on desktop and a corrected single-column mobile index. | 813px |

**Browser checks:** six sample pages at **360, 390, 768, 1024, and 1440 CSS px in light and dark** (60 combinations) passed copy/order, six visible reasons, adjacent claim qualifications, 14px+ explanation / 12px+ caveat size, theme state, and no horizontal overflow or JavaScript errors. All six retained their reasons and figure at 360px with JavaScript disabled; W03's initial illustration also remained visible. W03 click, Arrow Up/Down, Home, and End changed only its illustration; W06's desktop locator followed pointer and keyboard focus. Reduced-motion content and both gallery themes were checked in Chromium. The W06 narrow-column overflow discovered during review was corrected before these final checks.

The earlier section HTML files are **references only** and are intentionally not modified by this pass.
