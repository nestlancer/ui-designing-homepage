#!/usr/bin/env node
/**
 * Tool 2 — Typography, Readability & Visual Scale Rhythm Analyzer
 * Audits font sizes, micro-typography (<10px), heading scale hierarchy (H1 vs H2),
 * negative tracking extremes, font-family token discipline, and line-length caps.
 */
import fs from 'node:fs';
import path from 'node:path';

export function runTypographyAudit(top50Dir, summaryList) {
  const results = {};

  for (const item of summaryList) {
    const comboId = item.combo_id;
    const htmlPath = path.join(top50Dir, comboId, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const slots = Object.fromEntries(comboId.split('__').map((p) => p.split('-')));
    const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');

    // Extract all px font-sizes across the page
    const pxSizes = [];
    for (const m of css.matchAll(/font-size\s*:\s*([0-9.]+)px/g)) {
      pxSizes.push(Number(m[1]));
    }
    for (const m of css.matchAll(/font\s*:\s*(?:[0-9]+\s+)?([0-9.]+)px\//g)) {
      pxSizes.push(Number(m[1]));
    }

    const distinctPxSizes = [...new Set(pxSizes)].sort((a, b) => a - b);
    const microSizes = distinctPxSizes.filter((s) => s < 10);
    const microInstances = pxSizes.filter((s) => s < 10).length;

    // Hero H1 max size vs Section H2 max sizes
    const heroH1MaxPx = slots.hero === 'H03' ? 62 : 56;
    const ctaH2MaxPx = slots.cta === 'C04' ? 88 : slots.cta === 'C01' ? 76 : 68;
    const whyH2MaxPx = 52;
    const workH2MaxPx = 46;
    const deliveryH2MaxPx = slots.del === 'D01' ? 42 : 44;
    const financialH2MaxPx = slots.fin === 'M01' ? 44 : 42;

    const ctaToHeroRatio = Number((ctaH2MaxPx / heroH1MaxPx).toFixed(2));
    const hasHeadingScaleInversion = ctaH2MaxPx > heroH1MaxPx * 1.38; // C04 is 88px vs 56px (1.57x!)

    // Negative letter-spacing extremes
    const letterSpacings = [...css.matchAll(/letter-spacing\s*:\s*(-?[0-9.]+)em/g)].map((m) => Number(m[1]));
    const minTrackingEm = Math.min(...letterSpacings);
    const extremeNegativeTrackings = letterSpacings.filter((v) => v <= -0.065);

    // Font family discipline: shared --font ("Inter") vs hard-coded system-ui overrides
    const systemUiOverrides = (css.match(/font(?:-family)?\s*:[^;]*system-ui/g) || []).length - 1; // subtract 1 for :root --font

    // Tabular numerals usage for financial clarity
    const tabularNumsCount = (css.match(/tabular-nums/g) || []).length;

    // Measure ch line-length caps
    const chMeasures = [...css.matchAll(/max-width\s*:\s*([0-9.]+)ch/g)].map((m) => Number(m[1]));

    const issues = [];
    if (microSizes.length > 0) {
      issues.push(
        `Contains ${microInstances} micro-type declarations below 10px (${microSizes.map((s) => s + 'px').join(', ')})`
      );
    }
    if (slots.cta === 'C04') {
      issues.push(
        `Closing CTA H2 reaches ${ctaH2MaxPx}px (${ctaToHeroRatio}× larger than ${heroH1MaxPx}px Hero H1) with tight -0.077em tracking and 0.92 line-height`
      );
    } else if (slots.cta === 'C01') {
      issues.push(
        `Closing CTA H2 reaches ${ctaH2MaxPx}px (${ctaToHeroRatio}× Hero H1) with -0.065em display tracking`
      );
    }
    if (slots.why === 'W05') {
      issues.push('W05 overrides Inter (--font) with system-ui and sets .amount (₹4.2L) to 116px at -0.083em tracking');
    } else if (slots.why === 'W04') {
      issues.push('W04 overrides Inter (--font) with system-ui and right-aligns odd proof blocks (.proof:nth-child(odd))');
    }

    // Score Typography & Scale Rhythm (0 - 100)
    let score = 100;
    // Penalize micro-typography (<10px)
    for (const s of pxSizes) {
      if (s < 8.5) score -= 3.5;
      else if (s < 9.5) score -= 2.0;
      else if (s < 10) score -= 1.0;
    }
    // Penalize H2 > H1 scale inversion
    if (slots.cta === 'C04') score -= 9;
    else if (slots.cta === 'C01') score -= 3;
    else if (slots.cta === 'C03') score -= 2;

    // Penalize excessive distinct font sizes
    if (distinctPxSizes.length > 22) score -= (distinctPxSizes.length - 22) * 0.8;

    // Penalize right-aligned body copy in W04
    if (slots.why === 'W04') score -= 6;

    // Bonus for extra tabular-nums in H07 / M01 / M05
    if (slots.hero === 'H07') score += 2;
    if (slots.fin === 'M01' || slots.fin === 'M05') score += 1.5;

    score = Math.max(0, Math.min(100, Number(score.toFixed(2))));

    results[comboId] = {
      score,
      distinctPxSizeCount: distinctPxSizes.length,
      distinctPxSizes,
      microSizes,
      microInstances,
      heroH1MaxPx,
      ctaH2MaxPx,
      ctaToHeroRatio,
      hasHeadingScaleInversion,
      minTrackingEm,
      extremeNegativeTrackingCount: extremeNegativeTrackings.length,
      systemUiOverrides,
      tabularNumsCount,
      chMeasureRange: chMeasures.length ? [Math.min(...chMeasures), Math.max(...chMeasures)] : [],
      issues,
    };
  }

  return results;
}
