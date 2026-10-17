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
