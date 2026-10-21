/**
 * Hand-assigned design traits for the 29 approved shortlist samples.
 *
 * These are the reviewer's reading of each sample (surface treatment, motion
 * intensity, density) and are the inputs the review pass uses for the
 * cross-slot judgement — seam integrity, skin coherence, hierarchy rhythm and
 * overall feel. They are deliberately authored per sample, not inferred from a
 * random heuristic, so the ranking is auditable: change a trait, re-run
 * `tools/review.mjs`, and the ranking changes in a predictable way.
 *
 * vector = [texture, darkness, elevation]
 *   texture   0 = flat house surface, 1 = subtle (rules/tint/cards), 2 = strong (mesh/print/dark plane)
 *   darkness  0 = light, 1 = mixed panels, 2 = dark surface
 *   elevation 0 = flush, 1 = card/window, 2 = floating chrome
 * motion 0..3 (0 = static, 3 = signature motion is loud)
 * density 0 = compact, 1 = balanced, 2 = spacious
 */

export const SLOT_ORDER = ['header', 'hero', 'delivery', 'financial', 'why', 'work', 'cta', 'footer'];

export const SLOT_LABEL = {
  header: 'Header',
  hero: 'Hero',
  delivery: 'Delivery',
  financial: 'Money',
  why: 'Why',
  work: 'Work',
  cta: 'CTA',
  footer: 'Footer',
};

export const LABS = [
  { slot: 'header', dir: 'homepage-header', file: 'header.html', ids: ['P01', 'P02', 'P04'], folders: { P01: 'P01-classic', P02: 'P02-glass', P04: 'P04-pill' } },
  { slot: 'hero', dir: 'homepage-hero', file: 'index.html', ids: ['H01', 'H03', 'H07', 'H08', 'H09'], folders: { H01: 'H01-ground-truth', H03: 'H03-editorial-ledger', H07: 'H07-money-first', H08: 'H08-command-rail', H09: 'H09-split-mirror' } },
  { slot: 'delivery', dir: 'homepage-delivery', file: 'index.html', ids: ['D01', 'D03', 'D06', 'D09', 'D10'], folders: { D01: 'D01-continuum-rail', D03: 'D03-bento-proof', D06: 'D06-mesh-flow', D09: 'D09-progress-path', D10: 'D10-magnetic-stack' } },
  { slot: 'financial', dir: 'homepage-financial-clarity', file: 'index.html', ids: ['M01', 'M03', 'M04', 'M05'], folders: { M01: 'M01-broadsheet-total', M03: 'M03-receipt-print', M04: 'M04-rails-terminal', M05: 'M05-cashflow-staircase' } },
  { slot: 'why', dir: 'homepage-why-nestlancer', file: 'index.html', ids: ['W04', 'W05'], folders: { W04: 'W04-scope-fold', W05: 'W05-gate-logic' } },
  { slot: 'work', dir: 'homepage-selected-work', file: 'index.html', ids: ['S01', 'S02', 'S03', 'S10'], folders: { S01: 'S01-case-grid', S02: 'S02-filter-bar', S03: 'S03-split-viewer', S10: 'S10-sticky-showcase' } },
  { slot: 'cta', dir: 'homepage-closing-cta', file: 'index.html', ids: ['C01', 'C03', 'C04'], folders: { C01: 'C01-quiet-meridian', C03: 'C03-four-point-orbit', C04: 'C04-editorial-endnote' } },
  { slot: 'footer', dir: 'homepage-footer', file: 'footer.html', ids: ['P01', 'P04', 'P05'], folders: { P01: 'P01-classic', P04: 'P04-pill', P05: 'P05-centered' } },
];

export const TRAITS = {
  header: {
    'P01-classic': { short: 'solid bar', surface: 'bar', vector: [0, 0, 0], motion: 1, density: 1, sticky: false, summary: 'solid 64/72px bar with underline-draw links' },
    'P02-glass': { short: 'sticky glass bar', surface: 'glass', vector: [1, 0, 1], motion: 1, density: 1, sticky: true, summary: 'sticky glass bar (blur 14px) over the hero' },
    'P04-pill': { short: 'floating pill bar', surface: 'float', vector: [1, 0, 2], motion: 1, density: 1, sticky: true, summary: 'floating pill bar with a soft drop shadow' },
  },
  hero: {
    'H01-ground-truth': { short: 'split Hub hero', surface: 'solid', vector: [0, 0, 0], motion: 3, density: 2, summary: 'split copy + Hub window, mesh wash and sector marquee' },
    'H03-editorial-ledger': { short: 'editorial ledger hero', surface: 'editorial', vector: [1, 0, 0], motion: 3, density: 2, summary: 'editorial rules with a full-width ledger strip' },
    'H07-money-first': { short: 'money-first hero', surface: 'solid', vector: [0, 0, 0], motion: 2, density: 2, summary: 'reversed split led by the fixed-price ₹48,000 proof' },
    'H08-command-rail': { short: 'glass rail hero', surface: 'glass', vector: [1, 0, 1], motion: 2, density: 2, summary: 'asymmetric mono rail beside a glass Hub window' },
    'H09-split-mirror': { short: '50/50 split hero', surface: 'dual', vector: [1, 0, 1], motion: 2, density: 2, summary: 'full-bleed 50/50 halves meeting in the middle' },
  },
  delivery: {
    'D01-continuum-rail': { short: 'pipeline rail', surface: 'rail', vector: [0, 0, 0], motion: 2, density: 1, summary: 'horizontal pipeline rail with a 68% draw' },
    'D03-bento-proof': { short: 'bento field', surface: 'bento', vector: [1, 0, 1], motion: 2, density: 1, summary: 'bento field grid under a continuous rail' },
    'D06-mesh-flow': { short: 'contour mesh', surface: 'mesh', vector: [2, 0, 1], motion: 2, density: 1, summary: 'contour map with a drawn SVG path' },
    'D09-progress-path': { short: 'ribbon path', surface: 'ribbon', vector: [2, 0, 0], motion: 2, density: 1, summary: 'curved ribbon path with labelled dots' },
    'D10-magnetic-stack': { short: 'magnetic stack', surface: 'stack', vector: [1, 0, 1], motion: 2, density: 1, summary: 'rail plus a 2×2 magnetic stack of step cards' },
  },
  financial: {
    'M01-broadsheet-total': { short: 'broadsheet sheet', surface: 'paper', vector: [1, 0, 1], motion: 2, density: 2, summary: 'broadsheet sheet with masthead, rules and an audit stamp' },
    'M03-receipt-print': { short: 'printed receipt', surface: 'print', vector: [2, 0, 1], motion: 1, density: 1, summary: 'till receipt with torn edge and barcode' },
    'M04-rails-terminal': { short: 'terminal ledger', surface: 'terminal', vector: [1, 1, 1], motion: 2, density: 1, summary: 'navy CLI window with a typing command line' },
    'M05-cashflow-staircase': { short: 'cashflow bars', surface: 'grid', vector: [1, 0, 0], motion: 2, density: 1, summary: 'graph-paper cashflow bars growing on reveal' },
  },
  why: {
    'W04-scope-fold': { short: 'dark convergence plane', surface: 'dark', vector: [2, 2, 1], motion: 1, density: 2, summary: 'dark convergence plane with six linked proofs' },
    'W05-gate-logic': { short: 'six-tile proof field', surface: 'tiles', vector: [1, 1, 1], motion: 1, density: 1, summary: 'twelve-column tile field mixing dark and mint cards' },
  },
  work: {
    'S01-case-grid': { short: 'case grid', surface: 'grid', vector: [0, 0, 0], motion: 2, density: 2, summary: '4×2 case grid with pointer spotlight' },
    'S02-filter-bar': { short: 'filter grid', surface: 'grid', vector: [0, 0, 0], motion: 2, density: 2, summary: 'filter toolbar over a 4×2 concept grid' },
    'S03-split-viewer': { short: 'sticky viewer', surface: 'viewer', vector: [1, 0, 1], motion: 2, density: 2, summary: 'sticky preview window with a vertical work index' },
    'S10-sticky-showcase': { short: 'scroll-spy showcase', surface: 'showcase', vector: [1, 0, 1], motion: 3, density: 2, summary: 'pinned preview driven by a scroll-spy over case blocks' },
  },
  cta: {
    'C01-quiet-meridian': { short: 'meridian close', surface: 'centered', vector: [0, 0, 0], motion: 1, density: 2, summary: 'centred statement on a drawn meridian axis' },
    'C03-four-point-orbit': { short: 'orbital close', surface: 'orbit', vector: [1, 0, 1], motion: 1, density: 2, summary: 'asymmetric copy beside an orbital reassurance field' },
    'C04-editorial-endnote': { short: 'editorial endnote', surface: 'editorial', vector: [1, 0, 0], motion: 1, density: 2, summary: 'three-column endnote with a printed folio' },
  },
  footer: {
    'P01-classic': { short: 'classic footer', surface: 'bar', vector: [0, 0, 0], motion: 0, density: 1, summary: 'three-column sitemap with a single legal line' },
    'P04-pill': { short: 'floating footer card', surface: 'float', vector: [1, 0, 2], motion: 0, density: 1, summary: 'floating rounded footer card with INR rails note' },
    'P05-centered': { short: 'centred footer', surface: 'centered', vector: [0, 0, 0], motion: 0, density: 1, summary: 'centred mark, nav and legal line' },
  },
};

/** expected marker strings per slot — used by verify + content fidelity */
export const SLOT_MARKERS = {
  header: ['aria-label="Primary"', 'Start a project'],
  hero: ['Ship with clients', 'Tour the product'],
  delivery: ['FIG 02', 'From brief to release'],
  financial: ['Financial clarity for every milestone', 'PREVIEW'],
  why: ['FIG 04', 'Engineered for delivery'],
  work: ['FIG 05', 'Work that speaks for itself'],
  cta: ['FIG 06', 'Ready to ship with clarity?'],
  footer: ['© 2026 Nestlancer', 'Made in India'],
};
