# Nestlancer — UI Designing · Homepage Lab

Research **100** world-ranked marketing homes → ship **20** Nestlancer homepage samples.  
Same Nestlancer story (from the real screenshot). Different aspects + real motion JS.

| | |
|---|---|
| **GitHub** | https://github.com/nestlancer/ui-designing-homepage |
| **Sibling chrome lab** | https://github.com/nestlancer/ui-designing-header-footer |
| **Design truth** | `Nestlancer-public-screenshots/public/013-marketing-homepage.webp` |
| **Locked content** | [`docs/HOMEPAGE-SCREENSHOT-RESEARCH.md`](docs/HOMEPAGE-SCREENSHOT-RESEARCH.md) |
| **Agent prompt** | [`homepage-prompt.md`](homepage-prompt.md) **(v3)** |
| **Compositor prompt** | [`homepage-compositor-prompt.md`](homepage-compositor-prompt.md) — combine all shortlists → **21,600** full pages |

## Section labs (current work)

The existing HTML deliverables are **section-only explorations**, not complete 20-section homepages. Open each gallery to compare the actual designs:

| Pass | Gallery | Prompt |
|---|---|---|
| 01 · Hero | [`homepage-hero/`](homepage-hero/) | [`01-hero.md`](docs/homepage-section-prompts/01-hero.md) |
| 02 · Delivery | [`homepage-delivery/`](homepage-delivery/) | [`02-delivery.md`](docs/homepage-section-prompts/02-delivery.md) |
| **03 · Financial clarity** | **[`homepage-financial-clarity/`](homepage-financial-clarity/)** | [`03-financial-clarity.md`](docs/homepage-section-prompts/03-financial-clarity.md) |
| **04 · Why Nestlancer** | **[`homepage-why-nestlancer/`](homepage-why-nestlancer/)** | **[Rewritten creative prompt](docs/homepage-section-prompts/04-why-nestlancer.md)** · [research & critique](docs/WHY-NESTLANCER-RESEARCH.md) |
| **05 · Selected work** | **[`homepage-selected-work/`](homepage-selected-work/)** | [`05-selected-work.md`](docs/homepage-section-prompts/05-selected-work.md) |
| **06 · Closing CTA** | [`homepage-closing-cta/`](homepage-closing-cta/) | [`06-closing-cta.md`](docs/homepage-section-prompts/06-closing-cta.md) · [direction & online research](docs/FIG06-CLOSING-CTA-DIRECTION.md) |
| 07 · Header (chrome) | [`homepage-header/`](homepage-header/) | Approved chrome shortlist — P01 · P02 · P04 (default `header.html`) |
| 08 · Footer (chrome) | [`homepage-footer/`](homepage-footer/) | Approved chrome shortlist — P01 · P04 · P05 (default `footer.html`) |

Open **[`index.html`](index.html)** for the lab hub: all eight galleries, sample counts and the locked-content rules in one place.

Pass 02 is a refined shortlist of five selected treatments (**D01 Continuum Rail**, **D03 Field Grid**, **D06 Contour Flow**, **D09 Ribbon Path**, **D10 Stack Rail**). Pass 03 is a refined shortlist of four selected treatments (**M01 Broadsheet Total**, **M03 Receipt Print**, **M04 Rails Terminal**, **M05 Cashflow Staircase**). Pass 04 is a refined shortlist of two selected treatments (**W04 Convergence**, **W05 Six-up**). Pass 05 is a refined shortlist of four selected treatments (**S01 Case Grid**, **S02 Filter Bar**, **S03 Split Viewer**, **S10 Sticky Showcase**). Pass 06 is a refined shortlist of three selected treatments (**C01 Quiet Meridian**, **C03 Four-Point Orbit**, **C04 Editorial Endnote**) with locked copy and preserved project/portal destinations.

## Mission (v3)

1. Lock Nestlancer copy from the homepage screenshot  
2. Research top **100** sites’ homepages (heroes, proof, motion)  
3. Design **20** concepts on different axes (layout / proof / scroll / skin / JS motion)  
4. Build `homepage-lab/samples/H01…H20/` — each a full HTML homepage  
5. Gallery + critique at 1440 / 390, light + dark  

**Content stays the same. Design aspect + animation JS change.**

## Layout (current)

```
ui-designing-homepage/
  index.html                         ← lab hub — every gallery in one place
  homepage-prompt.md                 ← master prompt (v3)
  homepage-compositor-prompt.md      ← stitch approved samples into full pages
  docs/
    HOMEPAGE-SCREENSHOT-RESEARCH.md  ← locked Nestlancer sections + copy (content truth)
    homepage-section-prompts/        ← one brief per section, plus the shared contract
    FIG04-*.md · FIG06-*.md · WHY-NESTLANCER-RESEARCH.md
  Nestlancer-public-screenshots/     ← design truth: 013-marketing-homepage.webp
  assets/                            ← real Nestlancer SVG logos
  homepage-hero/                     ← gallery + samples/H01 · H03 · H07 · H08 · H09
  homepage-delivery/                 ← gallery + samples/D01 · D03 · D06 · D09 · D10
  homepage-financial-clarity/        ← gallery + samples/M01 · M03 · M04 · M05
  homepage-why-nestlancer/           ← gallery + samples/W04 · W05
  homepage-selected-work/            ← gallery + samples/S01 · S02 · S03 · S10
  homepage-closing-cta/              ← gallery + samples/C01 · C03 · C04
  homepage-header/                   ← gallery + samples/P01 · P02 · P04 + default header.html
  homepage-footer/                   ← gallery + samples/P01 · P04 · P05 + default footer.html
```

Every sample is **section-only** and self-contained (inline CSS/JS, local assets, no CDN). Do not treat one sample as a finished page.

## Run

1. Open this repo in the agent  
2. Paste **all** of `homepage-prompt.md`  
3. Agent must pass Screenshot Gate → Research Gate before building  
4. Preview:

```bash
cd ui-designing-homepage && python3 -m http.server 8124
# → http://127.0.0.1:8124/            (lab hub)
# → http://127.0.0.1:8124/homepage-hero/   (any gallery also works standalone)
```

Any sample accepts `?theme=light` or `?theme=dark`; the corner toggle stores the choice in `localStorage`.
