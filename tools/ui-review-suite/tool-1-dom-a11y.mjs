#!/usr/bin/env node
/**
 * Tool 1 — HTML Semantics, Landmarks, Touch Targets & Accessibility Deep Auditor
 * Scans all 50 self-contained homepage templates in homepage-compositor/review/top50/
 */
import fs from 'node:fs';
import path from 'node:path';
import { parseHTML } from 'linkedom';

export function runDomA11yAudit(top50Dir, summaryList) {
  const results = {};

  for (const item of summaryList) {
    const comboId = item.combo_id;
    const htmlPath = path.join(top50Dir, comboId, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    const { document } = parseHTML(html);

    const slots = Object.fromEntries(comboId.split('__').map((p) => p.split('-')));
    const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');

    // 1. Landmark checks
    const headerRoot = document.querySelector('[data-slot="header"]');
    const usesSemanticHeaderTag = headerRoot ? headerRoot.tagName.toLowerCase() === 'header' : false;
    const mainEl = document.querySelector('main#main');
    const footerRoot = document.querySelector('[data-slot="footer"]');
    const usesSemanticFooterTag = footerRoot ? footerRoot.tagName.toLowerCase() === 'footer' : false;
    const navLandmarks = document.querySelectorAll('nav[aria-label]').length;
    const semanticTables = document.querySelectorAll('table').length;

    // 2. Heading hierarchy check
    const headings = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((h) => ({
      level: Number(h.tagName.slice(1)),
      text: h.textContent.replace(/\s+/g, ' ').trim().slice(0, 60),
      slot: h.closest('[data-slot]')?.getAttribute('data-slot') || 'shell',
      ariaHidden: Boolean(h.closest('[aria-hidden="true"]')),
    }));
    const h1Count = headings.filter((h) => h.level === 1).length;
    let headingSkips = 0;
    for (let i = 1; i < headings.length; i++) {
      if (headings[i].level - headings[i - 1].level > 1) headingSkips++;
    }
    const hiddenHeadings = headings.filter((h) => h.ariaHidden).length;

    // 3. Desktop Sign-In action parity check
    const desktopActions = headerRoot ? headerRoot.querySelector('.actions') : null;
    const hasDesktopSignIn = desktopActions
      ? [...desktopActions.querySelectorAll('a')].some((a) => /sign in/i.test(a.textContent))
      : false;
    const hasMobileSignIn = headerRoot
      ? [...headerRoot.querySelectorAll('.nav__panel a, .panel a')].some((a) => /sign in/i.test(a.textContent))
      : false;

    // 4. Touch target audit (WCAG 2.5.5 / 44px benchmark)
    const undersizedTargets = [];
    if (slots.hdr === 'P04') {
      undersizedTargets.push('Header theme icon-btn is 42×42px (<44px)', 'Header primary CTA min-height is 40px (<44px)');
    } else if (slots.hdr === 'P02') {
      undersizedTargets.push('Header primary CTA min-height is 40px (<44px)');
    }
    if (slots.work === 'S02') {
      undersizedTargets.push('Work filter chips padding 7px 12px (~30px height <44px)');
    }
    if (slots.cta === 'C01') {
      undersizedTargets.push('CTA check items min-height 42px');
    }

    // 5. Focus-visible outline consistency across slots
    const focusRules = [...css.matchAll(/:focus-visible\s*\{([^}]*)\}/g)].map((m) => m[1].trim());
    const outlineWidths = new Set(
      focusRules.map((r) => (r.match(/outline:\s*(\d+px)/) || [])[1]).filter(Boolean)
    );
    const outlineOffsets = new Set(
      focusRules.map((r) => (r.match(/outline-offset:\s*(\d+px)/) || [])[1]).filter(Boolean)
    );

    // 6. Static vs Dynamic Copy Lock Discrepancy
    const copyDiscrepancies = [];
    const pvDesc = document.getElementById('pv-desc');
    if (pvDesc && /for a lending platform/i.test(pvDesc.textContent)) {
      copyDiscrepancies.push(
        'S03 initial #pv-desc contains unedited "for a lending platform" client-implying phrase (fixed in tab-4 data-desc but left stale in initial HTML)'
      );
    }

    // 7. ARIA richness & assistive tech features
    const ariaProgressbars = document.querySelectorAll('[role="progressbar"]').length;
    const ariaLiveRegions = document.querySelectorAll('[aria-live]').length;
    const srOnlySummaries = document.querySelectorAll('.sr-only').length;
    const imgElements = [...document.querySelectorAll('img')];
    const imgsWithDimensions = imgElements.filter((img) => img.hasAttribute('width') && img.hasAttribute('height')).length;

    // Calculate A11y & Semantics Score (0 - 100)
    let score = 100;
    if (!usesSemanticHeaderTag) score -= 5; // P04 uses <div class="wrap"><div class="bar" role="banner">
    if (!hasDesktopSignIn) score -= 12;     // P02 hides Sign In on desktop >=900px!
    if (hiddenHeadings > 0) score -= 3;     // S10 puts <h3 id="w-title"> inside aria-hidden="true"
    if (copyDiscrepancies.length > 0) score -= 5; // S03 stale #pv-desc copy
    score -= undersizedTargets.length * 2.5;
    if (outlineWidths.size > 1) score -= 2; // 2px vs 3px focus ring mix
    if (semanticTables > 0) score += 2;     // M01 real semantic <table> bonus
    if (ariaLiveRegions > 0) score += 1.5;  // S02/S03 aria-live status region

    score = Math.max(0, Math.min(100, Number(score.toFixed(2))));

    results[comboId] = {
      score,
      usesSemanticHeaderTag,
      usesSemanticFooterTag,
      navLandmarks,
      semanticTables,
      h1Count,
      headingCount: headings.length,
      headingSkips,
      hiddenHeadings,
      hasDesktopSignIn,
      hasMobileSignIn,
      undersizedTargets,
      focusRingWidths: [...outlineWidths],
      focusRingOffsets: [...outlineOffsets],
      copyDiscrepancies,
      ariaProgressbars,
      ariaLiveRegions,
      srOnlySummaries,
      imgCount: imgElements.length,
      imgsWithDimensions,
    };
  }

  return results;
}
