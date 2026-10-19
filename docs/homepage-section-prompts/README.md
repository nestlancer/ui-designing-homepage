# Nestlancer homepage redesign — section-by-section prompts

These prompts split the full-page redesign into manageable, reviewable stages. Read the repository's `homepage-prompt.md` and `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md` first; the latter is the source of truth for copy and section intent. The reference screenshot is `Nestlancer-public-screenshots/public/013-marketing-homepage.webp` (2880 × 10444; 1440 CSS px wide at 2×).

**The content is locked; the design is not.** The goal is not to reproduce the screenshot, nor to make six faithful mini-redraws. For every generated homepage sample, the LLM must act as an imaginative art director and UI creator: invent a distinct visual interpretation for the section while keeping its exact story and data. Treat the reference as evidence for what the section says and does—not as a layout to copy. The screenshot's composition is only one possible treatment.

## Included prompts

1. [`01-hero.md`](01-hero.md) — hero, product previews, and sector ticker
2. [`02-delivery.md`](02-delivery.md) — FIG 02 delivery narrative
3. [`03-financial-clarity.md`](03-financial-clarity.md) — money overview, milestone rows, payment-rails preview
4. [`04-why-nestlancer.md`](04-why-nestlancer.md) — FIG 04 creative reset, six distinct proof treatments; [research](../WHY-NESTLANCER-RESEARCH.md) · [HTML gallery](../../homepage-why-nestlancer/)
5. [`05-selected-work.md`](05-selected-work.md) — FIG 05 selected work shortlist (S01 · S02 · S03 · S10); [HTML gallery](../../homepage-selected-work/)
6. [`06-closing-cta.md`](06-closing-cta.md) — FIG 06 final conversion band · [shortlist C01 · C03 · C04](../../homepage-closing-cta/) · [direction & online research](../FIG06-CLOSING-CTA-DIRECTION.md)

The global nav/header and footer are intentionally excluded; handle those separately. Each prompt is standalone enough to paste into a coding agent, but they share the same project-wide contract below.

## Recommended workflow

1. Start from the existing homepage, not a blank page. Preserve its framework, conventions, routes, and build setup.
2. Complete one section prompt at a time, in numerical order. Review the result and approve it before moving on.
3. Keep all sections in the same page and use shared design tokens/components rather than creating a separate visual system in each pass.
4. At every pass, check the full page at desktop and mobile widths. Ensure the new section joins its neighbors cleanly and does not cause horizontal overflow.
5. Do a final full-page pass for rhythm, accessibility, copy accuracy, and responsive behavior.

## Shared contract (applies to every prompt)

- **Be the creator, not a screenshot tracer:** for each generated sample, first state a concise creative direction for this section (concept name, mood, visual metaphor, composition, and signature interaction/motion if useful). Then design to that direction. Samples must be meaningfully different in geometry, hierarchy, rhythm, visual storytelling, and/or interaction—not just color, border radius, or a rearranged card grid. Do not assume the screenshot's split, centered, grid, or card layout is mandatory. Push for a memorable but usable idea that still belongs to the page's overall design system. If a sample already has an established art direction, adapt this section to it; do not make the section look like a disconnected microsite.
- **Reference hierarchy:** screenshot and research document for content, section purpose, and factual visual cues; existing code for implementation conventions. Use the screenshot as inspiration, not as a required composition or pixel target.
- **Scope:** modify only the requested section and the minimum shared styles/components needed to integrate it. Do not redesign the header, other sections, or footer during a section pass. Do not delete or reorder existing sections.
- **Brand:** retain Nestlancer's calm, precise product-studio character: soft off-white/mint surfaces, navy text, restrained teal accent, fine borders, generous whitespace, compact mono FIG labels, and tabular INR figures. Use the real SVG logos already in `assets/`; do not invent a logo, clients, prices, metrics, certifications, or claims.
- **Copy:** preserve the locked strings in the relevant section prompt verbatim. Do not paraphrase or omit caveats. Use the existing site routes and assets where available.
- **UI quality:** semantic HTML, visible keyboard focus, accessible names, sufficient contrast, sensible heading order, reduced-motion support, and touch-friendly controls. Responsive at 360, 390, 768, 1024, and 1440 px; no horizontal scroll.
- **Motion:** purposeful and subtle, never required to understand the content. Respect `prefers-reduced-motion`; do not add external libraries/CDNs or network dependencies.
- **Finish:** run the repository's available checks/build, inspect the actual rendered page if a browser preview is available, and report files changed, checks run, and anything that could not be verified. Do not claim visual verification unless performed.

## Prompt usage

Paste the shared contract and just the relevant numbered prompt into your coding agent. If the agent has already read this README and the repository sources, you can paste only the numbered prompt and point it back to this shared contract.
