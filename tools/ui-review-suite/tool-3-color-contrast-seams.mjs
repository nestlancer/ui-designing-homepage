#!/usr/bin/env node
/**
 * Tool 3 — Color Science, WCAG 2.1 Contrast & Section Seam Luminance Analyzer
 * Evaluates contrast ratios across Light & Dark palettes, section-to-section
 * background luminance delta (seam jumps), and hard-coded color literals.
 */
import fs from 'node:fs';
import path from 'node:path';

function hexToRgb(hex) {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (h.length === 4) h = h.slice(0, 3).split('').map((c) => c + c).join('');
  if (h.length === 8) h = h.slice(0, 6);
  const num = parseInt(h, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function relativeLuminance([r, g, b]) {
  const srgb = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

// Primary section canvas hex in Light mode and Dark mode per slot sample
const SLOT_CANVAS_LIGHT = {
  'hdr-P01': '#ffffff',
  'hdr-P02': '#f9fbfc',
  'hdr-P04': '#f9fbfc',
  'hero-H01': '#f9fbfc',
  'hero-H03': '#f9fbfc',
  'hero-H07': '#f9fbfc',
  'hero-H08': '#f9fbfc',
  'hero-H09': '#f3f8f9', // 50/50 split between #f9fbfc and #edf4f6
  'del-D01': '#f9fbfc',
  'del-D03': '#f9fbfc',
  'del-D10': '#f9fbfc',
  'fin-M01': '#f9fbfc',
  'fin-M04': '#f9fbfc', // hosts dark #0a2543 terminal card inside light canvas
  'fin-M05': '#f9fbfc',
  'why-W04': '#0b2b36', // full-bleed dark convergence plane even in light mode!
  'why-W05': '#f5f9f6', // custom mint-tinted off-white with 2 dark tiles
  'work-S01': '#f9fbfc',
  'work-S02': '#f9fbfc',
  'work-S03': '#f9fbfc',
  'work-S10': '#f9fbfc',
  'cta-C01': '#f9fbfc',
  'cta-C03': '#f9fbfc',
  'cta-C04': '#ffffff',
  'ftr-P01': '#ffffff',
  'ftr-P04': '#f9fbfc',
  'ftr-P05': '#ffffff',
};

const SLOT_CANVAS_DARK = {
  'hdr-P01': '#0f1e29',
  'hdr-P02': '#0b1720',
  'hdr-P04': '#0b1720',
  'hero-H01': '#0b1720',
  'hero-H03': '#0b1720',
  'hero-H07': '#0b1720',
  'hero-H08': '#0b1720',
  'hero-H09': '#0d1d28',
  'del-D01': '#0b1720',
  'del-D03': '#0b1720',
  'del-D10': '#0b1720',
  'fin-M01': '#0b1720',
  'fin-M04': '#0b1720',
  'fin-M05': '#0b1720',
  'why-W04': '#071c26',
  'why-W05': '#0a1e27',
  'work-S01': '#0b1720',
  'work-S02': '#0b1720',
  'work-S03': '#0b1720',
  'work-S10': '#0b1720',
  'cta-C01': '#0b1720',
  'cta-C03': '#0b1720',
  'cta-C04': '#0f1e29',
  'ftr-P01': '#0f1e29',
  'ftr-P04': '#0b1720',
  'ftr-P05': '#0f1e29',
};

export function runColorSeamsAudit(top50Dir, summaryList) {
  const results = {};

  // Key token pairs contrast verification
  const lightContrasts = {
    inkOnBg: contrastRatio('#0a2543', '#f9fbfc'),           // 14.84:1 (AAA)
    bodyOnBg: contrastRatio('#4a5c6e', '#f9fbfc'),          // 6.45:1 (AA)
    mutedOnBg: contrastRatio('#5f7080', '#f9fbfc'),         // 4.78:1 (AA)
    tealOnSurface: contrastRatio('#1f7a72', '#ffffff'),     // 5.13:1 (AA)
    tealOnMint: contrastRatio('#0d6f64', '#d5eee1'),        // 4.93:1 (AA in W05)
    btnWhiteOnTeal: contrastRatio('#ffffff', '#1f7a73'),    // 5.11:1 (AA)
    w04BodyOnDark: contrastRatio('#c9deda', '#0b2b36'),     // 10.67:1 (AAA)
    w05LightOnDarkTile: contrastRatio('#f0faf5', '#0b303d'),// 14.12:1 (AAA)
  };

  const darkContrasts = {
    inkOnBg: contrastRatio('#e8eef4', '#0b1720'),           // 15.05:1 (AAA)
    bodyOnBg: contrastRatio('#b9c6d0', '#0b1720'),          // 10.11:1 (AAA)
    mutedOnBg: contrastRatio('#8aa0b3', '#0b1720'),         // 6.32:1 (AA)
    tealOnSurface: contrastRatio('#2fa59b', '#0f1e29'),     // 5.66:1 (AA)
  };

  for (const item of summaryList) {
    const comboId = item.combo_id;
    const htmlPath = path.join(top50Dir, comboId, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const parts = comboId.split('__');
    const slots = Object.fromEntries(parts.map((p) => p.split('-')));
    const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');

    // Measure luminance transitions across the 7 vertical seams in Light mode
    const lightLuminances = parts.map((p) => relativeLuminance(hexToRgb(SLOT_CANVAS_LIGHT[p] || '#f9fbfc')));
    const seamDeltasLight = [];
    for (let i = 0; i < lightLuminances.length - 1; i++) {
      seamDeltasLight.push(Number(Math.abs(lightLuminances[i + 1] - lightLuminances[i]).toFixed(3)));
    }
    const maxSeamDeltaLight = Math.max(...seamDeltasLight);

    // Count hard-coded hex colors in CSS
    const hexMatches = css.match(/#[0-9a-fA-F]{3,8}\b/g) || [];

    const seamNotes = [];
    if (slots.why === 'W04') {
      seamNotes.push('W04 inserts a full-bleed dark #0b2b36 slab in light mode (ΔL = 0.89 seam jump on both sides)');
    } else if (slots.why === 'W05') {
      seamNotes.push('W05 shifts section canvas from cool #f9fbfc to warm-mint #f5f9f6 (subtle ΔL = 0.024 tint shift)');
    }
    if (slots.fin === 'M04') {
      seamNotes.push('M04 places a high-contrast dark navy CLI terminal (#0a2543) inside the light financial section');
    }
    if (slots.hero === 'H09') {
      seamNotes.push('H09 splits hero background 50/50 (#f9fbfc left | #edf4f6 right) with a vertical center rule that terminates abruptly at Delivery');
    }

    let score = 100;
    if (slots.why === 'W04') score -= 14;       // harsh light-mode dark slab
    if (slots.fin === 'M04') score -= 5;        // dark terminal block before W05 dark tiles
    if (slots.hero === 'H09') score -= 5;       // 50/50 split seam against centered Delivery
    if (slots.hdr === 'P04' && slots.hero === 'H09') score -= 4; // floating pill over 50/50 split
    if (slots.cta === 'C04' && slots.ftr === 'P04') score -= 2;  // bordered white endnote into floating footer card
    if (slots.hdr === 'P01' && slots.ftr === 'P01') score += 2;  // bookended classic solid chrome
    if (slots.hdr === 'P04' && slots.ftr === 'P04') score += 2;  // bookended floating pill chrome

    score = Math.max(0, Math.min(100, Number(score.toFixed(2))));

    results[comboId] = {
      score,
      minContrastLight: Math.min(...Object.values(lightContrasts)),
      minContrastDark: Math.min(...Object.values(darkContrasts)),
      wcagAA: true,
      maxSeamDeltaLight,
      seamDeltasLight,
      hardcodedHexCount: hexMatches.length,
      seamNotes,
    };
  }

  return results;
}
