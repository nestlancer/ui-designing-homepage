# Nestlancer — UI Designing · Homepage

Lab for designing and building the Nestlancer **marketing homepage**.

| | |
|---|---|
| **GitHub** | https://github.com/nestlancer/ui-designing-homepage |
| **Sibling chrome lab** | https://github.com/nestlancer/ui-designing-header-footer |
| **Design truth** | `Nestlancer-public-screenshots/public/*.webp` (17 public pages) |
| **Primary reference** | `013-marketing-homepage.webp` |
| **Agent prompt** | [`homepage-prompt.md`](homepage-prompt.md) — paste into Cursor / Claude Code / Arena |

## Layout

```
ui-designing-homepage/
  homepage-prompt.md                 ← master AI prompt (start here)
  Nestlancer-public-screenshots/     ← read-only design truth
    public/*.webp
  assets/                            ← real Nestlancer logos (light/dark + mark)
  homepage/                          ← agent output (created by the prompt)
    index.html
    …
```

## Run the prompt

1. Open this repo in the agent.
2. Paste **all** of `homepage-prompt.md`.
3. Agent must open `013-marketing-homepage.webp` before writing CSS.
4. Output lands in `homepage/` — never edit the screenshots folder.

## Preview

```bash
cd ui-designing-homepage && python3 -m http.server 8124
# → http://127.0.0.1:8124/homepage/
```
