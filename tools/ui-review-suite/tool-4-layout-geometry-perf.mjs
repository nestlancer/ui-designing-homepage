#!/usr/bin/env node
/**
 * Tool 4 — Layout Geometry, Shape Language, Sticky Planes & CSS/DOM Performance Analyzer
 */
import fs from 'node:fs';
import path from 'node:path';
import { parseHTML } from 'linkedom';

const SLOT_CONTAINER_WIDTH = {
  'hdr-P01': 1200,
  'hdr-P02': 1200,
  'hdr-P04': 1160,
  'hero-H01': 1160,
  'hero-H03': 1160,
  'hero-H07': 1160,
  'hero-H08': 1160,
  'hero-H09': 1440, // full-bleed 50/50 split
  'del-D01': 1160,
  'del-D03': 1160,
  'del-D10': 1160,
  'fin-M01': 1160,
  'fin-M04': 1160,
  'fin-M05': 1160,
  'why-W04': 1180,
  'why-W05': 1170,
  'work-S01': 1160,
  'work-S02': 1160,
  'work-S03': 1160,
  'work-S10': 1160,
  'cta-C01': 1080,
  'cta-C03': 1120,
  'cta-C04': 1200,
  'ftr-P01': 1200,
  'ftr-P04': 1160,
  'ftr-P05': 1200,
};

export function runLayoutPerfAudit(top50Dir, summaryList) {
  const results = {};

  for (const item of summaryList) {
    const comboId = item.combo_id;
    const htmlPath = path.join(top50Dir, comboId, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const { document } = parseHTML(html);

    const parts = comboId.split('__');
    const slots = Object.fromEntries(parts.map((p) => p.split('-')));
    const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
    const js = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');

    // 1. Container width alignment
    const widths = parts.map((p) => SLOT_CONTAINER_WIDTH[p]);
    const uniqueContainerWidths = [...new Set(widths)].sort((a, b) => a - b);

    // 2. Button shape coherence (Pill 999px vs Sharp 3px in C04)
    const ctaBtnRadius = slots.cta === 'C04' ? '3px (sharp rectangle)' : '999px (pill)';
    const buttonShapeMismatch = slots.cta === 'C04'; // Header, Hero, Work all use 999px pill buttons

    // 3. Sticky plane interactions
    const hasStickyHeader = slots.hdr === 'P02' || slots.hdr === 'P04';
    const hasStickyWork = slots.work === 'S03' || slots.work === 'S10';
    const doubleStickyPlanes = hasStickyHeader && hasStickyWork;

    // 4. Responsive breakpoints across the composed page
    const mediaBreakpoints = [
      ...new Set(
        [...css.matchAll(/@media\s*\([^)]*?(?:max|min)-width\s*:\s*([0-9.]+)px\)/g)].map((m) => Math.round(Number(m[1])))
      ),
    ].sort((a, b) => b - a);

    // 5. Payload & DOM metrics
    const totalBytes = Buffer.byteLength(html, 'utf8');
    const cssBytes = Buffer.byteLength(css, 'utf8');
    const jsBytes = Buffer.byteLength(js, 'utf8');
    const domElements = document.querySelectorAll('*').length;

    // Dead CSS rules check (e.g. .sample__hero in header fragment)
    const deadSampleHeroRules = (css.match(/\.sample__hero/g) || []).length;
    const infiniteAnimations = (css.match(/infinite/g) || []).length;

    const layoutNotes = [];
    if (buttonShapeMismatch) {
      layoutNotes.push('C04 Closing CTA uses 3px rectangular buttons (stacked vertically) while Header, Hero & Work use 999px pill buttons');
    }
    if (doubleStickyPlanes) {
      layoutNotes.push(`Sticky header (${slots.hdr}) + Sticky work viewer (${slots.work}) creates two simultaneous sticky planes (mitigated by top:calc(22px + 72px))`);
    }
    if (slots.hero === 'H08') {
      layoutNotes.push('H08 3-column grid (56px mono rail + 1fr copy + 1.05fr Hub) narrows the H1 copy column to ~480px on 1440px screens');
    }
    if (slots.del === 'D10') {
      layoutNotes.push('D10 arranges sequential steps 02.1–02.4 in a 2×2 grid rather than a continuous 4-across horizontal flow');
    }
    if (slots.ftr === 'P05') {
      layoutNotes.push('Ftr-P05 flattens the 3-column PRODUCT/COMPANY/LEGAL sitemap into a single centered row');
    }

    let score = 100;
    if (buttonShapeMismatch) score -= 7;
    if (doubleStickyPlanes) score -= 4;
    if (slots.hero === 'H08') score -= 3.5;
    if (slots.hero === 'H09') score -= 4.5;
    if (slots.hero === 'H03') score -= 4.0; // 123 elements, pushes Hub below fold
    if (slots.del === 'D10') score -= 3.5;  // 2x2 grid for linear steps + only 2 media queries
    if (slots.ftr === 'P05') score -= 3.0;  // loses 3-col sitemap hierarchy
    if (slots.why === 'W04') score -= 5.0;  // 0px radius sharp panels

    score = Math.max(0, Math.min(100, Number(score.toFixed(2))));

    results[comboId] = {
      score,
      uniqueContainerWidths,
      ctaBtnRadius,
      buttonShapeMismatch,
      hasStickyHeader,
      hasStickyWork,
      doubleStickyPlanes,
      mediaBreakpointCount: mediaBreakpoints.length,
      mediaBreakpoints,
      totalKB: Number((totalBytes / 1024).toFixed(1)),
      cssKB: Number((cssBytes / 1024).toFixed(1)),
      jsKB: Number((jsBytes / 1024).toFixed(1)),
      domElements,
      deadSampleHeroRules,
      infiniteAnimations,
      layoutNotes,
    };
  }

  return results;
}
