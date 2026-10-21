# Nestlancer Portfolio + Blog Page Lab — AI Agent Prompt

> **Use this prompt with the `nestlancer/ui-designing-homepage` repository open.**
>
> **Interpretation of the brief:** create **five new template designs for each of four production page types** (not five total): portfolio listing, portfolio case study, blog listing, and blog article — **20 templates in total**. First audit the existing homepage design system and the four live pages; then build the new templates as a separate lab.
>
> This is a build brief for a future coding-agent run. Do not push or create a branch. Preserve the active branch and existing homepage artifacts.

---

## 1. Role and outcome

Act as a senior product designer, UI researcher, accessibility-minded frontend engineer, and critical design reviewer. The job is to extend this repository from a homepage-template lab into a **separate portfolio/blog page-template lab** without changing or replacing the homepage work.

Research and design against these four live production references:

1. Portfolio listing — <https://app.nestlancer.com/portfolio>
2. Portfolio detail — <https://app.nestlancer.com/portfolio/b2b-portal-ux>
3. Blog listing — <https://app.nestlancer.com/blog>
4. Blog article — <https://app.nestlancer.com/blog/cutting-deploy-time-from-45-minutes-to-five>

Deliver exactly **20 genuinely different, responsive, navigable HTML templates**: five for each reference page type. The work must feel recognizably Nestlancer, preserve the real content and actions, and explore distinct layout/typography/media/navigation patterns — not 20 recolours of one card grid.

## 2. Repository findings — start here, then verify against current files

This repository is a static HTML/CSS/JS design lab, not the Nestlancer application source. Its homepage work has:

- Eight homepage slots: **hero, delivery, financial clarity, why Nestlancer, selected work, closing CTA, header, footer**.
- Twenty-nine approved section/chrome samples: `H01/H03/H07/H08/H09`; `D01/D03/D06/D09/D10`; `M01/M03/M04/M05`; `W04/W05`; `S01/S02/S03/S10`; `C01/C03/C04`; header `P01/P02/P04`; footer `P01/P04/P05`.
- **21,600** legal compositions and a ranked, hand-off set of **50** pages. Existing review artifacts include `docs/TOP50-UI-DESIGN-REVIEW-REPORT.md`, `homepage-compositor/review/top50.html`, `homepage-compositor/review/summary.json`, `homepage-compositor/review/multi-tool-audit.json`, and `homepage-compositor/review/methodology.md`.
- Legacy screenshots for the four requested page families: `Nestlancer-public-screenshots/public/007-portfolio-listing.webp`, `008-portfolio-case-study.webp`, `002-blog-listing.webp`, and `003-blog-article.webp`. Treat them as historical visual references; compare them to the live pages instead of assuming they are identical.
- Real logo assets under `assets/`. Shared colors, locked homepage copy, accessibility findings, and project constraints are documented in `docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`, `docs/REVIEW-2026-10-21.md`, and the existing prompts.

### Required method for the existing template analysis

Before designing, inspect the **actual markup, CSS, scripts, and gallery cards** for all 29 source samples listed above. Also inspect the individual records for **all 50 ranked homepage compositions**, not just the top-ranked example. Use the rank report and machine-readable review records to build a traceable table with one row per ranked composition.

For each of the 29 samples, record: ID/name, slot, visual silhouette, information hierarchy, interaction/motion, mobile behavior, a pattern worth adapting to portfolio/blog, a risk/limitation, and the file path used as evidence. Avoid inferring behavior from a sample name alone.

For each of the 50 ranked pages, record: rank and score **as represented by its cited source**, the full slot combination, which combinations of patterns recur, what makes it distinct (if anything), one transferable page-design insight, and one limitation. Do not paste 50 long descriptions of the same repeated combination; still give every rank its own explicit row and explain shared patterns while preserving the individual combination. Verify the live `rank-list.html`, report, and JSON data agree before quoting values.

**Important scoring caveat:** the current top-50 is a repository rubric/review output, not proof of a statistically representative user study. The reports contain different scoring scales and comparisons; quote the source and its methodology, and never label machine-generated/rubric scores as observed user preference or real-world performance. Call out missing browser/pixel verification where the cited methodology says it was not measured.

Write the audit to `docs/PORTFOLIO-BLOG-DESIGN-ANALYSIS.md`. Include the four production-page audits below, a 29-sample matrix, a 50-row top-page matrix, cross-cutting pattern synthesis, source paths/URLs, and explicit evidence limitations. If a source cannot be accessed or a rendered state cannot be observed, mark it **not verified** rather than guessing.

## 3. Live page audit — content and observed structure

The following is a starting point from a live page-content inspection. Re-open the pages during the build, inspect their rendered UI at desktop and mobile where possible, and update any changed content. Do not represent this text extract as a full visual or interaction audit.

### A. Portfolio listing — `/portfolio`

Observed content and structure:

- Skip link and essential-cookie notice with **Dismiss** / **Accept** actions.
- Eyebrow `FIG · Work`; heading `Selected work` (the text extract concatenated the words as `Selectedwork`); short intro: `Case studies in sequence — product language, stack, and outcomes. Scroll the timeline; each project arrives on its own beat.`
- Summary: `8 projects / 2026`.
- `FIG · Timeline` / `Project timeline`; explanatory line says newest first, each node lights on entry, and a card opens the full case study.
- Eight October 2026 project entries, each with a thumbnail, category, summary, stack tags, and case-study link. First is **B2B Client Portal UX**, linking to `/portfolio/b2b-portal-ux`; subsequent items are Fitness Tracking App, Marketplace Redesign, Brand Identity System, Fintech Payments Hub, SaaS Analytics Platform, E-Commerce Mobile App, and HealthTech Dashboard.
- Closing CTA: `Want work like this?`, `Tell us about the product. We will come back with a scoped studio quote.`, `Start a project` → `/contact`.
- **Data QA flag:** the live extract labels **Fintech Payments Hub** as `E-Commerce`; this conflicts with its title/description and with this repo's documented earlier audit, which says that item should be categorized as **Fintech**. Do not silently copy the contradiction into the redesigned data. Record it in the analysis, use `Fintech` in the new static demo only if the asset/content evidence supports it, and clearly document this as a taxonomy correction rather than a claim about a live production fix.

### B. Portfolio case study — `/portfolio/b2b-portal-ux`

Observed content and structure:

- Cookie notice; large project image; `← Portfolio` back link.
- Category `UI/UX Design`; title `B2B Client Portal UX`; summary `Information architecture and UI for a client self-serve portal.`
- Metadata: `Oct 2026 / Harbor Ops`; category/tags include `UI/UX Design`, `ux`, `ia`, `b2b`, `portal`; visible engagement text includes `4 views` and `Like`.
- Sections: `Overview`; `What we shipped` — `Mapped complex account, billing, and project workflows into a clear portal IA with role-aware navigation and empty states.`; `Outcomes` — fewer “where do I find…” support chats, clearer escalation paths, and implementation-ready design specs.
- Client: `Harbor Ops`; `Operations Software`.
- Gallery contains the project image; stack: Figma, User Interviews, Prototyping.
- Closing CTA: `Interested in similar work?`; `Tell us about your project — we can scope something inspired by this case study.`; `Start a similar project` → `/contact?ref=01a10a2a-92fe-76ab-94be-c68dbf0db7aa`.
- Preserve this as supplied case-study content; do not invent extra client quotes, budgets, conversion lifts, team sizes, deliverables, or success metrics. Views/likes are dynamic UI data, not proof of business outcomes.

### C. Blog listing — `/blog`

Observed content and structure:

- Skip link and essential-cookie notice; category control labelled `Categories`.
- Heading `Latest articles`; intro: `Hiring playbooks, engineering deep-dives, and studio insights — filtered by category.`
- Search control labelled `Search posts`; section `Featured & latest`; current page says `Showing 1–12 of 110`.
- Article cards carry cover image, optional `Featured` label, category (`Case Studies` in observed entries), title, summary, author, read time, view count, and link. Featured first article is **Cutting Deploy Time from 45 Minutes to Five**, summary `CI caching, smaller artifacts, and service-level pipelines after monolith split.`, by Nestlancer Editorial, `2 min read`, `5 views`; it links to the article in D.
- Other observed listing entries include Scaling a Freelance Marketplace Architecture, GDPR Compliance Platform Rebuild, Migrating from WebSockets to SSE, Elasticsearch Migration for Search Features, API Versioning Without Breaking Mobile Clients, Multi-Region Deployment Case Study, Event Sourcing for Order Management, Kubernetes Migration Cost Analysis, Building an Incident Response Culture, Splitting a Monorepo into Microservices, and Legacy PHP to NestJS Migration Story.
- Recreate category filtering, search, pagination/load-more behavior only after verifying the live controls. In a static lab, provide meaningful working local interactions and honestly label any demo-only behavior. Do not imply that filtering fetches the production 110-post database.
- Search snippets expose time-limited signed S3 URLs for some article images. Never hard-code signed/private URLs into the templates. If using existing Nestlancer production media is permitted and accessible, localize and optimize the assets; otherwise use supplied repo imagery or clearly marked original editorial placeholder artwork. No broken or expiring external image references.

### D. Blog article — `/blog/cutting-deploy-time-from-45-minutes-to-five`

Observed content and structure:

- Back link `← Back to articles`; metadata `2 min read · 5 views`; title `Cutting Deploy Time from 45 Minutes to Five`; summary matches the listing card.
- Author `Nestlancer Editorial`; date `Oct 5, 2026`; article metadata also says `2 min read · 2 comments`.
- Share controls include `Copy`, LinkedIn, and X. Hero image, an `On this page` table of contents, article body, tags, Like/Bookmark controls, comments form area, and related-post cards.
- Article body sections: opening paragraph; `Where we started`; `Architecture before` (four bullets); `Migration timeline` (Discovery, Strangler cutover, Reliability hardening, Stabilize and learn); `Patterns we applied` (API gateway, Prisma); a TypeScript code sketch; `Results` (four supplied bullet points); `Retrospective checklist` (five bullets); and `Lesson`.
- **Data QA flag:** the live extraction shows `5 views` in the lead metadata and `2 comments` later, while the article-list extract also says `5 views`. Treat view/comment counts as dynamic snapshots; do not fabricate or reconcile them into fixed evidence. Keep date, body, and technical code as supplied if included. Do not add unverifiable claims beyond this source.

For each of the four production routes, the analysis must discuss: visual hierarchy, page anatomy, typography and density, media use, navigation, primary/secondary actions, responsive behavior, accessibility/semantics, interactive states, content risks, and gaps between screenshot and current live page. Mark rendered observations separately from text/DOM observations.

## 4. Design direction: 20 new templates

Build five designs per page type. Each must have a recognizable silhouette, clear reason for its layout, its own responsive strategy, and at least one relevant interaction. They must share a sensible Nestlancer visual identity but must not be mere surface swaps. The following are starting directions, not permission to build five near-duplicates; refine after research and document each concept before implementation.

| ID family | Page type | Five distinct starting directions |
|---|---|---|
| `PL01–PL05` | Portfolio listing | **PL01** sequential editorial timeline; **PL02** filterable project index with asymmetric image grid; **PL03** featured case study + compact archive rail; **PL04** large image-led mosaic with category navigation; **PL05** typographic project directory with expandable project details. |
| `PD01–PD05` | Portfolio case study | **PD01** editorial case-study narrative with sticky contents; **PD02** image-first full-bleed opening then restrained article; **PD03** compact project brief / metadata rail beside narrative; **PD04** process-led chapter sequence with gallery; **PD05** quiet dossier/specification sheet with outcomes and stack clearly separated. |
| `BL01–BL05` | Blog listing | **BL01** featured editorial lead + readable article list; **BL02** magazine-style variable card grid; **BL03** searchable/category-driven archive; **BL04** compact chronological dispatch index with one featured story; **BL05** category-led split view with selected article preview. |
| `BA01–BA05` | Blog article | **BA01** classic long-form reading column with sticky contents; **BA02** magazine cover treatment with hero image and metadata; **BA03** technical field-notes layout with code and callouts; **BA04** chaptered reading experience with progress/contents navigation; **BA05** restrained case-study report with structured results and related reading. |

### Template requirements

- Each of the 20 pages must render standalone and be linked from a central lab gallery with clear grouping by page type. Provide next/previous variant navigation and useful links between the portfolio listing and first detail, and blog listing and first article.
- Use original layout and styling, not screenshots as page backgrounds and not copied third-party templates. Existing Nestlancer screenshots and production media may be used as visual/content references; use rights-appropriate local media and descriptive alt text. Do not hotlink expiring S3 media in final HTML.
- Keep page content faithful to the source. Where a section/page does not have source text, do not invent metrics, testimonials, client facts, article content, or brand claims; use clearly labelled neutral placeholder copy only where necessary for a visual variant, and make its placeholder status obvious.
- Keep established wordmark assets intact; do not redraw, stretch, or recolor the logo. Reuse repository tokens and patterns where they support brand continuity, while allowing each concept a distinct composition.
- Templates are illustrative static demos, not a production app. No backend, authentication, analytics, cookie persistence, comment submission, bookmarking persistence, real search API, or production writes. Build local front-end interactions as demos, label them honestly, and ensure controls never pretend to have completed a server action.
- No external CDN, font service, runtime dependency, or remote API. Use local assets, system font stacks, inline/local SVG, and plain HTML/CSS/JS unless the existing repository has an approved dependency that genuinely improves the result.
- Keep all buttons, menus, filters, tabs, search fields, TOC links, share actions, and cookie UI keyboard-operable and semantically correct. Provide visible focus, labels, states, adequate hit areas, reduced-motion support, and readable contrast. Do not hide essential copy behind hover or animation.
- Test responsive layouts at **360, 390, 768, 1024, and 1440 px**, light and dark where provided. Avoid horizontal overflow, clipped code, tiny metadata, unstable image dimensions, and reordered reading sequences that break meaning.
- Honor `prefers-reduced-motion`; animation should explain selection, reading progress, or timeline state, not decorate every element. Pages must remain understandable with JavaScript disabled.

## 5. Proposed output layout

Keep new work isolated. Do not overwrite the existing homepage galleries, ranking reports, screenshots, section samples, or compositor output.

```text
portfolio-blog-lab/
  index.html                      # overview, filters, links to every template
  assets/                          # only local, optimized, rights-appropriate media
  portfolio-listing/
    PL01-.../index.html
    ...
    PL05-.../index.html
  portfolio-detail/
    PD01-.../index.html
    ...
    PD05-.../index.html
  blog-listing/
    BL01-.../index.html
    ...
    BL05-.../index.html
  blog-article/
    BA01-.../index.html
    ...
    BA05-.../index.html
```

A shared local CSS/JS file is allowed only if it reduces duplication without erasing concept differences or causing CSS/JS collisions. Preserve direct relative paths so every sample works when served from the repository root. Update `README.md` with a short link to the new lab and the new analysis report; do not rewrite unrelated project documentation.

## 6. Work sequence and gates

### Gate 0 — Baseline and screenshot lock

1. Check `git status`; do not overwrite user changes.
2. Read the homepage screenshot research, section prompts, current review report, ranking methodology/data, and all source sample files.
3. Open all four legacy screenshots and inspect current live routes; record date, viewport, and whether each observation came from live rendering, DOM/text extraction, screenshot, or source code.
4. Identify content/source inconsistencies before designing.
5. Write the 29-sample matrix, 50-row rank matrix, and four-page audit in `docs/PORTFOLIO-BLOG-DESIGN-ANALYSIS.md`.
6. Gate passes only when every required row is represented and uncertainty is disclosed. Do not invent visual facts for inaccessible pages.

### Gate 1 — Concepts

Write 20 concept cards in the analysis report before coding. Each card includes: ID/name, source page, central metaphor, desktop composition, phone composition, hierarchy, primary interaction, accessible fallback, media plan, content risks, and the specific existing pattern(s) that informed it. Prove the five templates in each family are materially distinct.

### Gate 2 — Build

Implement the gallery and all 20 standalone templates in `portfolio-blog-lab/`. Use genuine source content and local assets; ensure all local page links resolve. Do not rebuild or change the 21,600 homepage compositions.

### Gate 3 — Verify and critique

- Run the repo's relevant existing audit scripts without modifying their behavior; add a separate purpose-built audit for the new lab if useful.
- Validate all 20 HTML files, local links/assets, unique IDs, semantic landmarks/headings, image dimensions/alt text, button names/states, JS syntax, and no-JS content visibility.
- Exercise every local interaction: portfolio category filtering/search, blog search/categories/pagination demo, article TOC/progress, responsive menu, theme control if included, copy-link/share fallbacks, and safe no-op cookie/comment/like controls.
- Inspect actual rendered pages at all five widths and both themes using a browser if available. If no browser is available, state that clearly and do not claim screenshot QA or measured overflow checks.
- Write findings, known issues, what was verified, and what was not verified in `docs/PORTFOLIO-BLOG-DESIGN-ANALYSIS.md`.
- Finish by reporting the file paths, local run command, verification results, and any known limitations.

## 7. Hard constraints

- **Do not** push, commit, create/switch/rename a branch, or change the current branch.
- **Do not** modify or delete the existing homepage sample folders, locked homepage copy, rank-list source records, screenshots, or compositor generator outputs.
- **Do not** claim that a rubric rank is a real user study, a page score proves conversion, or a case-study result is independently verified.
- **Do not** invent testimonials, project outcomes, client identities, article statistics, product states, social accounts, or fake loading/search results.
- **Do not** use production-looking controls that cannot work in a static demo without disclosing their demo status.
- **Do not** leave the build with remote/expired media URLs, broken local routes, or visual differentiation limited to color and border radius.

## 8. Completion checklist

- [ ] Exactly 5 portfolio listing templates (`PL01–PL05`)
- [ ] Exactly 5 portfolio detail templates (`PD01–PD05`)
- [ ] Exactly 5 blog listing templates (`BL01–BL05`)
- [ ] Exactly 5 blog article templates (`BA01–BA05`)
- [ ] Central gallery links to all 20; each template is standalone
- [ ] All 29 existing section/chrome samples analyzed individually
- [ ] All 50 ranked homepage compositions represented individually in the audit
- [ ] All four live pages and their legacy screenshot comparisons documented
- [ ] Source and score caveats, data inconsistencies, and verification limits disclosed
- [ ] Local links/assets and core interactions verified; mobile, keyboard, reduced motion, and no-JS reviewed
- [ ] Existing homepage lab remains intact; no branch/push/commit operation performed