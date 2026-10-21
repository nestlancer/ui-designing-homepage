/**
 * The single Nestlancer token block (homepage-prompt.md §4.3, extended with the
 * keys the approved samples actually use).
 *
 * The compositor keeps this block once, page-wide. Each fragment's own :root
 * block is diffed against these maps and only the genuinely different keys are
 * re-emitted, scoped to that fragment's slot.
 */

export const HOUSE_LIGHT = new Map(Object.entries({
  'color-scheme': 'light',
  '--bg': '#f9fbfc',
  '--surface': '#ffffff',
  '--surface-2': '#f4f8f9',
  '--tint': '#edf4f6',
  '--mint': '#eef7f5',
  '--mesh-1': '#d8e8e9',
  '--mesh-2': '#daeaeb',
  '--ink': '#0a2543',
  '--ink-2': '#123a5e',
  '--body': '#4a5c6e',
  '--muted': '#5f7080',
  '--line': '#e3ebe9',
  '--teal': '#1f7a72',
  '--teal-hover': '#1c6f68',
  '--teal-soft': '#d9ece9',
  '--glow': '#3fb8ab',
  '--live': '#22a06b',
  '--btn': '#1f7a73',
  '--band': '#0a2543',
  '--band-text': '#e8eef4',
  '--band-body': '#b9c6d0',
  '--band-line': 'rgba(255,255,255,.12)',
  '--shadow': '0 8px 28px rgba(10,37,67,.10)',
  '--pill': '999px',
  '--card': '14px',
  '--chip': '8px',
  '--font': '"Inter",system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
  '--mono': 'ui-monospace,"IBM Plex Mono","SF Mono",Menlo,Consolas,monospace',
}));

export const HOUSE_DARK = new Map(Object.entries({
  'color-scheme': 'dark',
  '--bg': '#0b1720',
  '--surface': '#0f1e29',
  '--surface-2': '#12242f',
  '--tint': '#102530',
  '--mint': '#10272a',
  '--mesh-1': '#12303a',
  '--mesh-2': '#0f2a33',
  '--ink': '#e8eef4',
  '--ink-2': '#d3dde6',
  '--body': '#b9c6d0',
  '--muted': '#8aa0b3',
  '--line': 'rgba(255,255,255,.08)',
  '--teal': '#2fa59b',
  '--teal-hover': '#3fb8ab',
  '--teal-soft': '#14343a',
  '--band': '#06111a',
  '--shadow': '0 8px 28px rgba(0,0,0,.45)',
}));

function declString(map) {
  return [...map.entries()].map(([k, v]) => `  ${k}:${v};`).join('\n');
}

export function tokensCss() {
  return `/* Nestlancer shared tokens — one page-level palette for every composed homepage.
   Source of truth: homepage-prompt.md §4.3 (brand tokens) plus the keys the approved
   shortlist samples use. Fragment-specific palettes (e.g. W04's dark convergence
   surface) are scoped in fragments/<slot>/<folder>/styles.css. */
:root{
  color-scheme:light;
${declString(HOUSE_LIGHT)}
}
[data-theme="dark"]{
  color-scheme:dark;
${declString(HOUSE_DARK)}
}

/* ---- page shell ---------------------------------------------------------- */
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--body);
  font:400 16px/1.6 var(--font);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
img{max-width:100%;height:auto;display:block}
a{color:inherit}
ul{margin:0;padding:0;list-style:none}
h1,h2,h3,h4,p,figure{margin:0}
button{font:inherit}
::selection{background:var(--teal-soft);color:var(--ink)}
:where(a,button,input,summary,[tabindex]):focus-visible{outline:2px solid var(--teal);outline-offset:3px;border-radius:4px}

/* one skip link -> #main, owned by the shell */
.nl-skip{position:absolute;left:16px;top:-64px;z-index:400;background:var(--surface);color:var(--ink);
  padding:10px 16px;border-radius:10px;border:1px solid var(--line);box-shadow:var(--shadow);
  font:600 14px/1 var(--font);text-decoration:none;transition:top .12s ease-out}
.nl-skip:focus-visible{top:12px}

/* anchor landing clears both sticky header variants (P02/P04) */
#main,#how-it-works,#financial-clarity,#why-nestlancer,#selected-work,#start{scroll-margin-top:92px}
#main{display:block}
.nl-slot{display:block}

@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;
    transition-duration:.01ms!important;scroll-behavior:auto!important}
}
`;
}
