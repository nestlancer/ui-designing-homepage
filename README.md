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

Pass 02 is a refined shortlist of five selected treatments (**D01 Continuum Rail**, **D03 Field Grid**, **D06 Contour Flow**, **D09 Ribbon Path**, **D10 Stack Rail**). Pass 03 is a refined shortlist of four selected treatments (**M01 Broadsheet Total**, **M03 Receipt Print**, **M04 Rails Terminal**, **M05 Cashflow Staircase**). Pass 04 is a refined shortlist of two selected treatments (**W04 Convergence**, **W05 Six-up**). Pass 05 is a refined shortlist of four selected treatments (**S01 Case Grid**, **S02 Filter Bar**, **S03 Split Viewer**, **S10 Sticky Showcase**). Pass 06 is a refined shortlist of three selected treatments (**C01 Quiet Meridian**, **C03 Four-Point Orbit**, **C04 Editorial Endnote**) with locked copy and preserved project/portal destinations.

## Mission (v3)

1. Lock Nestlancer copy from the homepage screenshot  
2. Research top **100** sites’ homepages (heroes, proof, motion)  
3. Design **20** concepts on different axes (layout / proof / scroll / skin / JS motion)  
4. Build `homepage-lab/samples/H01…H20/` — each a full HTML homepage  
5. Gallery + critique at 1440 / 390, light + dark  

**Content stays the same. Design aspect + animation JS change.**

## Layout (after the agent runs)

```
ui-designing-homepage/
  homepage-prompt.md                 ← master prompt (v3) — paste this
  docs/
    HOMEPAGE-SCREENSHOT-RESEARCH.md  ← locked Nestlancer sections + copy
    RESEARCH-NOTES.md                ← agent: 100 one-liners
    CONCEPTS.md                      ← agent: 20 concept cards
  research/
    top-100.json · sites-100.json · patterns.md
  Nestlancer-public-screenshots/
  assets/                            ← logos
  homepage-lab/                      ← agent output
    index.html                       ← gallery
    samples/H01-…/index.html
```

## Run

1. Open this repo in the agent  
2. Paste **all** of `homepage-prompt.md`  
3. Agent must pass Screenshot Gate → Research Gate before building  
4. Preview:

```bash
cd ui-designing-homepage && python3 -m http.server 8124
# → http://127.0.0.1:8124/homepage-lab/
```
