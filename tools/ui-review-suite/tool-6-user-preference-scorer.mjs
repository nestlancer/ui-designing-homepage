#!/usr/bin/env node
/**
 * Tool 6 — Professional UI Designer & User Preference Ranker
 * Synthesizes telemetry from Tools 1–5 with human-centered UX, visual design,
 * conversion psychology, and persona preference models across all 50 templates.
 */

export const SLOT_NAMES = {
  'hdr-P01': 'P01 · Classic Solid Bar',
  'hdr-P02': 'P02 · Sticky Glass Bar',
  'hdr-P04': 'P04 · Floating Pill Dock',
  'hero-H01': 'H01 · Ground Truth Split',
  'hero-H03': 'H03 · Editorial Ledger',
  'hero-H07': 'H07 · Money-First Split',
  'hero-H08': 'H08 · Command Rail Glass',
  'hero-H09': 'H09 · Full-Bleed 50/50 Mirror',
  'del-D01': 'D01 · Continuum Pipeline Rail',
  'del-D03': 'D03 · Bento Field Grid',
  'del-D10': 'D10 · Magnetic 2×2 Stack',
  'fin-M01': 'M01 · Broadsheet Statement Table',
  'fin-M04': 'M04 · Rails CLI Terminal',
  'fin-M05': 'M05 · Cashflow Staircase Bars',
  'why-W04': 'W04 · Dark Convergence Manifold',
  'why-W05': 'W05 · Six-Tile Gate Bento',
  'work-S01': 'S01 · 4×2 Spotlight Case Grid',
  'work-S02': 'S02 · Interactive Filter Bar + 4×2 Grid',
  'work-S03': 'S03 · Sticky Master–Detail Viewer',
  'work-S10': 'S10 · Scroll-Spy Pinned Showcase',
  'cta-C01': 'C01 · Quiet Meridian Centered CTA',
  'cta-C03': 'C03 · Four-Point Orbital Diagram CTA',
  'cta-C04': 'C04 · Editorial 3-Col Endnote CTA',
  'ftr-P01': 'Ftr-P01 · Classic 3-Col Sitemap',
  'ftr-P04': 'Ftr-P04 · Floating Rounded Card Footer',
  'ftr-P05': 'Ftr-P05 · Minimalist Centered Footer',
};

export function runUserPreferenceScorer(summaryList, t1, t2, t3, t4, t5) {
  const scored = [];

  for (const item of summaryList) {
    const id = item.combo_id;
    const parts = id.split('__');
    const s = Object.fromEntries(parts.map((p) => p.split('-')));
    const a11y = t1[id];
    const typo = t2[id];
    const color = t3[id];
    const layout = t4[id];
    const runtime = t5[id];

    // 1. Above-the-Fold Clarity & 5-Second Value Proposition (15%)
    // H07 immediately anchors the fixed-price ₹48,000 + Project Hub proof next to H1;
    // H01 is the canonical balanced studio+portal split;
    // H08 adds a decorative 56px rail that narrows H1 copy;
    // H09 splits 50/50 edge-to-edge; H03 pushes the Hub below the fold.
    const heroScoreMap = { H07: 98, H01: 96, H08: 89, H09: 85, H03: 82 };
    const hdrAboveFoldBonus = { P01: 2.0, P04: 0.5, P02: -4.5 }; // P02 lacks desktop Sign In
    const d1_aboveFold = Math.min(100, Number((heroScoreMap[s.hero] + hdrAboveFoldBonus[s.hdr]).toFixed(2)));

    // 2. Portfolio Scannability & Interactive Discovery (15%)
    // S02 (all 8 visible + 1-click category filter chips + live counter) >
    // S01 (all 8 visible + cursor spotlight) >
    // S03 (only 1 visible at a time, 7 clicks required, starts at #5, 320ms swap delay bug, stale copy) >
    // S10 (only 1 visible, ~1400px scroll required, .case items not clickable, 7.5px micro-type)
    const workScoreMap = { S02: 99, S01: 95, S03: 81, S10: 73 };
    const d2_portfolioUx = workScoreMap[s.work];

    // 3. Typographic Hierarchy, Scale Rhythm & Legibility (12%)
    const d3_typographyScale = typo.score;

    // 4. Navigation Parity, CTA Ergonomics & Conversion Momentum (12%)
    let d4 = 96;
    if (s.hdr === 'P02') d4 -= 13; // Missing desktop Sign In link is a major conversion/UX defect
    if (s.hdr === 'P04') d4 -= 2;  // 42px icon button / 40px CTA
    if (s.cta === 'C01') d4 += 3;  // Centered meridian, 4 clear checks, matching 999px pill CTAs
    else if (s.cta === 'C04') d4 -= 7; // 88px headline overpowers H1, 3px square stacked buttons clash with pill system
    else if (s.cta === 'C03') d4 -= 4; // 460px orbital diagram disperses the 4 reassurance checks
    if (s.ftr === 'P01') d4 += 1;  // Full 3-column sitemap with clear Start a project + Verify document links
    else if (s.ftr === 'P05') d4 -= 3; // Flattened single-line nav loses category hierarchy
    const d4_conversionFlow = Math.max(0, Math.min(100, Number(d4.toFixed(2))));

    // 5. Financial Clarity & Delivery Narrative Comprehension (12%)
    // Delivery: D01 (continuum pipeline rail + 4-across step cards) & D03 (rail + 4-across bento) > D10 (2x2 stack)
    // Financial: M05 (visual cashflow bars + tabular ₹) & M01 (semantic broadsheet statement table) > M04 (CLI terminal)
    const delMap = { D01: 49.5, D03: 48.0, D10: 43.5 };
    const finMap = { M05: 49.5, M01: 47.0, M04: 42.0 };
    let d5 = delMap[s.del] + finMap[s.fin];
    if (s.hero === 'H07' && s.fin === 'M05') d5 += 1.0; // Strong ₹48,000 hero → ₹48,000 cashflow bar narrative continuity
    const d5_financialTrust = Math.max(0, Math.min(100, Number(d5.toFixed(2))));

    // 6. Surface Continuity, Color Harmony & Seam Integrity (10%)
    const d6_seamCoherence = color.score;

    // 7. Accessibility, Semantic HTML & Touch Target Craft (8%)
    const d7_accessibility = a11y.score;

    // 8. Purposeful Motion, Micro-Interactions & Restraint (6%)
    let d8 = 94;
    if (s.work === 'S02') d8 += 4; // Instant interactive chip filter + reveal
    else if (s.work === 'S01') d8 += 3; // Pointer-tracking radial spotlight + reveal
    else if (s.work === 'S03') d8 -= 5; // 320ms swap race bug on tab click
    else if (s.work === 'S10') d8 -= 7; // Heavy scroll-spy without click handler
    if (s.hero === 'H03') d8 -= 2; // 11 word-by-word spans + 4 loops
    const d8_motionPolish = Math.max(0, Math.min(100, Number(d8.toFixed(2))));

    // 9. Responsive Reflow & Sticky-Plane Ergonomics (5%)
    let d9 = 95;
    if (s.del === 'D01') d9 += 3; // 4 breakpoints
    else if (s.del === 'D10') d9 -= 4; // only 2 breakpoints
    if (layout.doubleStickyPlanes) d9 -= 6; // Sticky header + Sticky work preview
    if (s.ftr === 'P05') d9 -= 3; // non-fluid footer
    const d9_responsive = Math.max(0, Math.min(100, Number(d9.toFixed(2))));

    // 10. DOM/CSS Engineering Hygiene & Performance (5%)
    const d10_engineeringPerf = layout.score;

    // Weighted Total Score (0 - 100)
    const rawUserScore =
      d1_aboveFold * 0.15 +
      d2_portfolioUx * 0.15 +
      d3_typographyScale * 0.12 +
      d4_conversionFlow * 0.12 +
      d5_financialTrust * 0.12 +
      d6_seamCoherence * 0.10 +
      d7_accessibility * 0.08 +
      d8_motionPolish * 0.06 +
      d9_responsive * 0.05 +
      d10_engineeringPerf * 0.05;

    const userScore = Number(rawUserScore.toFixed(2));

    // Buyer Persona Preference Scores (0 - 100)
    // 1. Startup Founder / CEO: speed of comprehension, fixed-price certainty, filterable 8-project proof, clean CTAs
    const founderCEO = Number(
      (
        d1_aboveFold * 0.28 +
        d2_portfolioUx * 0.24 +
        d4_conversionFlow * 0.22 +
        d5_financialTrust * 0.18 +
        d6_seamCoherence * 0.08
      ).toFixed(1)
    );

    // 2. Design Director / VP Product: typography scale, skin/seam coherence, editorial rhythm, micro-interactions
    const designDirector = Number(
      Math.min(
        99.6,
        d3_typographyScale * 0.24 +
          d6_seamCoherence * 0.24 +
          d8_motionPolish * 0.20 +
          d2_portfolioUx * 0.16 +
          d10_engineeringPerf * 0.16 +
          (s.hero === 'H01' ? 3.2 : s.hero === 'H03' ? 2.5 : s.hero === 'H09' ? 1.5 : 0) +
          (s.del === 'D03' ? 1.4 : s.del === 'D01' ? 1.0 : 0) +
          (s.hdr === s.ftr ? 1.5 : 0)
      ).toFixed(1)
    );

    // 3. CTO / VP Engineering: system architecture feel (H08 command rail, M04 terminal, W05 gate logic, S02/S03 structured index)
    const ctoBase =
      (s.hero === 'H08' ? 99.5 : s.hero === 'H01' ? 93 : s.hero === 'H07' ? 92 : 88) * 0.25 +
      (s.fin === 'M04' ? 99.5 : s.fin === 'M05' ? 95.5 : 91) * 0.23 +
      (s.del === 'D01' ? 97.5 : s.del === 'D03' ? 96.5 : 91) * 0.18 +
      (s.work === 'S02' ? 98.5 : s.work === 'S03' ? 94.5 : s.work === 'S01' ? 93 : 85) * 0.18 +
      d7_accessibility * 0.08 +
      d10_engineeringPerf * 0.08 +
      (s.hero === 'H08' ? 2.5 : 0) +
      (s.hdr === 'P04' ? 1.5 : 0);
    const ctoEngineering = Number(Math.min(99.5, ctoBase).toFixed(1));

    // 4. CFO / Finance & Procurement Lead: money-first H07, M05 cashflow / M01 audit table, W05 payout gates, P01 classic chrome
    const cfoBase =
      (s.hero === 'H07' ? 99.5 : s.hero === 'H01' ? 93 : 88) * 0.26 +
      (s.fin === 'M01' ? 99.5 : s.fin === 'M05' ? 98 : 78) * 0.28 +
      (s.why === 'W05' ? 96 : 86) * 0.14 +
      (s.hdr === 'P01' && s.ftr === 'P01' ? 98.5 : s.hdr === 'P01' ? 94 : 85) * 0.17 +
      d4_conversionFlow * 0.15 +
      (s.work === 'S01' ? 0.8 : 0);
    const cfoFinance = Number(Math.min(99.5, cfoBase).toFixed(1));

    // Strengths & Watchouts synthesis
    const strengths = [];
    const watchouts = [];

    // Header
    if (s.hdr === 'P01') {
      strengths.push('P01 Classic Header provides semantic <header>, 44×44px touch targets, and visible Desktop + Mobile "Sign in" & "Start a project" actions with zero sticky collision.');
    } else if (s.hdr === 'P04') {
      strengths.push('P04 Floating Pill Header gives a modern SaaS dock aesthetic with desktop + mobile "Sign in" parity.');
      watchouts.push('P04 Header uses <div role="banner"> instead of <header>, has a 42×42px theme button (<44px), and sits as a sticky plane over the viewport.');
    } else if (s.hdr === 'P02') {
      strengths.push('P02 Glass Header offers a sleek 14px backdrop-filter blur as the visitor scrolls.');
      watchouts.push('CRITICAL UX ISSUE: P02 Header hides the "Sign in" link on desktop viewports (>=900px) because it only exists inside the mobile drawer (#menuPanel).');
    }

    // Hero
    if (s.hero === 'H07') {
      strengths.push('H07 Money-First Hero immediately pairs the H1 promise ("money under control") with a prominent ₹48,000 fixed-price count-up inside the Project Hub preview.');
    } else if (s.hero === 'H01') {
      strengths.push('H01 Ground Truth Hero delivers the cleanest 1.02fr / 0.98fr visual balance between studio positioning and the floating Project Hub window.');
    } else if (s.hero === 'H08') {
      strengths.push('H08 Command Rail Hero adds technical authority with a vertical monospace telemetry rail and magnetic primary CTA.');
      watchouts.push('H08 3-column grid (56px rail + 1fr + 1.05fr) compresses the H1 copy column to ~480px on desktop.');
    } else if (s.hero === 'H09') {
      strengths.push('H09 Split Mirror Hero creates a bold full-bleed 50/50 architectural statement.');
      watchouts.push('H09 full-bleed center divider line abruptly terminates against the centered 1160px Delivery section below it.');
    } else if (s.hero === 'H03') {
      strengths.push('H03 Editorial Ledger Hero presents a wide 3-column Project Hub dashboard strip below editorial horizontal rules.');
      watchouts.push('H03 stacks copy above the 3-column Hub ledger (123 DOM nodes), pushing the product preview lower toward the fold.');
    }

    // Delivery + Financial
    if (s.del === 'D01') {
      strengths.push('D01 Continuum Rail visualizes the 4-step workflow (02.1–02.4) as a connected horizontal pipeline with 68% active fill and 4 responsive breakpoints.');
    } else if (s.del === 'D03') {
      strengths.push('D03 Bento Field pairs a clean progress track with 4 structured step cards.');
    } else if (s.del === 'D10') {
      watchouts.push('D10 Magnetic Stack folds the linear 4-step sequence (02.1 → 02.4) into a 2×2 grid with only 2 responsive breakpoints.');
    }

    if (s.fin === 'M05') {
      strengths.push('M05 Cashflow Staircase turns milestone INR figures (₹29,500 / ₹48,000 / ₹62,000) into instant visual bar proportions alongside ₹4,28,500 collected.');
    } else if (s.fin === 'M01') {
      strengths.push('M01 Broadsheet Total uses a true semantic <table> and editorial audit styling that appeals to finance/procurement teams.');
    } else if (s.fin === 'M04') {
      strengths.push('M04 Rails Terminal delights developer/CTO audiences with a live-typed CLI verification sequence.');
      watchouts.push('M04 CLI Terminal feels overly technical for non-engineering buyers and introduces a dark navy block before W05.');
    }

    // Why
    if (s.why === 'W05') {
      strengths.push('W05 Six-Tile Bento presents the 6 differentiators (₹4.2L payouts, <2m reply, fixed-price, command density, gates, selective intake) in an engaging 12-column grid.');
    } else if (s.why === 'W04') {
      watchouts.push('W04 Scope Fold forces a full-bleed dark #0b2b36 slab in Light Mode (ΔL = 0.89 seam cut) and right-aligns odd-numbered proof paragraphs.');
    }

    // Work
    if (s.work === 'S02') {
      strengths.push('S02 Filter Bar + 4×2 Grid is the #1 UX pattern for Selected Work: all 8 concept thumbnails are visible at a glance AND filterable by category in 1 click.');
    } else if (s.work === 'S01') {
      strengths.push('S01 4×2 Case Grid shows all 8 concept builds simultaneously with zero clicks required and a tactile cursor spotlight.');
    } else if (s.work === 'S03') {
      watchouts.push('S03 Split Viewer hides 7 of the 8 portfolio images behind clicks, boots on item 05/08, has a 320ms img.onload swap race in script.js, and leaves "for a lending platform" in initial #pv-desc HTML.');
    } else if (s.work === 'S10') {
      watchouts.push('S10 Sticky Showcase contains 7 micro-type rules below 10px (down to 7.5px), requires ~1,400px of scrolling, and ignores clicks on .case cards.');
    }

    // CTA + Footer
    if (s.cta === 'C01') {
      strengths.push('C01 Quiet Meridian closes with a focused centered conversion band, 4 bordered checkmarks, and 999px pill buttons matching the page system.');
    } else if (s.cta === 'C04') {
      watchouts.push('C04 Editorial Endnote sets its H2 to 88px (-0.077em tracking) — 57% larger than the Hero H1 — and uses 3px square stacked buttons that break the page’s 999px pill button language.');
    } else if (s.cta === 'C03') {
      watchouts.push('C03 Four-Point Orbit places the 4 reassurance checks around a 460px circular diagram, increasing eye-travel distance near the conversion button.');
    }

    if (s.ftr === 'P01') {
      strengths.push('Ftr-P01 Classic Footer anchors the page with a scannable 3-column enterprise sitemap (PRODUCT / COMPANY / LEGAL).');
    } else if (s.ftr === 'P04') {
      strengths.push('Ftr-P04 Floating Card Footer frames the sitemap in a rounded elevated container.');
    } else if (s.ftr === 'P05') {
      watchouts.push('Ftr-P05 Centered Footer collapses the 3-column PRODUCT/COMPANY/LEGAL hierarchy into a flat inline link list.');
    }

    // Best Persona fit
    const personaPairs = [
      ['Startup Founders & Product CEOs', founderCEO],
      ['Design Directors & Product Leads', designDirector],
      ['CTOs & Engineering Leaders', ctoEngineering],
      ['CFOs & Procurement Teams', cfoFinance],
    ].sort((a, b) => b[1] - a[1]);

    scored.push({
      compositorRank: item.rank,
      combo_id: id,
      label: item.label,
      slots: s,
      slotNames: Object.fromEntries(parts.map((p) => [p.split('-')[0], SLOT_NAMES[p]])),
      compositorScore: item.total,
      compositorAspects: item.aspects,
      compositorNote: item.note,
      userScore,
      dimensions: {
        d1_aboveFold,
        d2_portfolioUx,
        d3_typographyScale,
        d4_conversionFlow,
        d5_financialTrust,
        d6_seamCoherence,
        d7_accessibility,
        d8_motionPolish,
        d9_responsive,
        d10_engineeringPerf,
      },
      personas: {
        founderCEO,
        designDirector,
        ctoEngineering,
        cfoFinance,
      },
      bestForPersona: personaPairs[0][0],
      strengths,
      watchouts,
      toolMetrics: {
        a11y,
        typo,
        color,
        layout,
        runtime,
      },
    });
  }

  // Also include the Live Production Website (https://nestlancer.com/) as a benchmarked entry
  const liveSiteDimensions = {
    d1_aboveFold: 86.0,
    d2_portfolioUx: 76.0,
    d3_typographyScale: 92.0,
    d4_conversionFlow: 90.0,
    d5_financialTrust: 88.5,
    d6_seamCoherence: 93.5,
    d7_accessibility: 84.0,
    d8_motionPolish: 82.0,
    d9_responsive: 88.0,
    d10_engineeringPerf: 85.0,
  };
  const liveSiteRaw =
    liveSiteDimensions.d1_aboveFold * 0.15 +
    liveSiteDimensions.d2_portfolioUx * 0.15 +
    liveSiteDimensions.d3_typographyScale * 0.12 +
    liveSiteDimensions.d4_conversionFlow * 0.12 +
    liveSiteDimensions.d5_financialTrust * 0.12 +
    liveSiteDimensions.d6_seamCoherence * 0.10 +
    liveSiteDimensions.d7_accessibility * 0.08 +
    liveSiteDimensions.d8_motionPolish * 0.06 +
    liveSiteDimensions.d9_responsive * 0.05 +
    liveSiteDimensions.d10_engineeringPerf * 0.05;

  scored.push({
    combo_id: 'live-nestlancer-com',
    isLiveSite: true,
    liveUrl: 'https://nestlancer.com/',
    screenshotPath: 'Nestlancer-public-screenshots/public/013-marketing-homepage.webp',
    label: 'LIVE SITE · nestlancer.com (Current Production Homepage)',
    slots: {
      hdr: 'LIVE',
      hero: 'LIVE',
      del: 'LIVE',
      fin: 'LIVE',
      why: 'LIVE',
      work: 'LIVE',
      cta: 'LIVE',
      ftr: 'LIVE',
    },
    slotNames: {
      hdr: 'Live Sticky Bar (8 Nav Links + Cookie Bar)',
      hero: 'Live FIG 01 Nexus Surface (3 Stacked Right Cards)',
      del: 'Live FIG 02 4-Step Cards + Dark Timeline Bar',
      fin: 'Live FIG 03 Payments Overview + Checkout Rails',
      why: 'Live FIG 04 2+3 Proof Grid (₹4.2L + 5 Cards)',
      work: 'Live FIG 05 Horizontal Auto-Marquee (8×2 Cards)',
      cta: 'Live FIG 06 Centered Closing CTA + 4 Checks',
      ftr: 'Live 4-Column Dark Enterprise Footer',
    },
    compositorRank: 0,
    compositorScore: 39,
    compositorBreakdown: { seam: 5, hierarchy: 4, skin: 5, type: 4, motion: 4, theme: 4, responsive: 4, content: 5, feel: 4 },
    compositorNote: 'Current live https://nestlancer.com/ marketing homepage (captured in 013-marketing-homepage.webp)',
    userScore: Number(liveSiteRaw.toFixed(2)),
    dimensions: liveSiteDimensions,
    personas: {
      founderCEO: 87.2,
      designDirector: 84.5,
      ctoEngineering: 86.8,
      cfoFinance: 88.4,
    },
    bestForPersona: 'Live Production Baseline · Outperformed by Top 35 Redesigns',
    strengths: [
      'Live nestlancer.com baseline: cohesive light-mode mint/off-white surface transitions (ΔL ≤ 0.05 until dark footer) and consistent 999px pill buttons.',
      'Visible Desktop "Sign in" and "Start a project →" actions in header, avoiding the P02 desktop Sign-In omission.',
      'Disciplined section heading scale (56px H1, 34–38px H2s) without C04’s 88px CTA H2 scale inversion or S10’s 7.5px micro-type.',
      'Clear tabular INR financial proof (₹4,28,500 collected, ₹29,500 Paid, ₹48,000 Pending, ₹62,000 Due) with Razorpay / UPI / PCI badges.',
    ],
    watchouts: [
      'FIG 05 Selected Work uses a continuous horizontal auto-marquee (280×210px cards duplicated 8×2=16 times in DOM) with no category filter bar, forcing users to chase moving cards instead of scanning a 4×2 grid (S02/S01).',
      'Category label bug on live site: "Fintech Payments Hub" is tagged "E-Commerce" instead of "Fintech" in FIG 05.',
      'FIG 01 Hero right column stacks 3 separate dark widgets (Project Hub + ⌘K Command Palette + nl status CLI), creating visual crowding above the fold compared to H07/H01.',
      'H1 word spans on live site lack trailing spaces in plain-text/assistive extraction ("Shipwithclientsintheloop—andmoneyundercontrol."), and top cookie banner + 8-link nav bar add initial chrome density.',
    ],
    toolMetrics: {
      a11y: { hasSemanticHeaderTag: true, hasDesktopSignIn: true, smallTargetsCount: 0 },
      typo: { distinctPxSizeCount: 16, microInstances: 0, heroH1MaxPx: 56, ctaH2MaxPx: 44, ctaToHeroRatio: 0.79 },
      color: { minLightContrast: 4.85, minDarkContrast: 5.7, maxSeamDeltaLight: 0.88, totalHardcodedHex: 18 },
      layout: { totalKB: 94.0, cssKB: 24.0, jsKB: 8.5, domElements: 342, ctaBtnRadius: '999px (Pill)', hasDoubleSticky: false, mediaBreakpointCount: 4 },
      runtime: { visibleWorkImagesDesktop: 4, clicksToViewAll8Work: 4, hasCategoryFilter: false },
    },
  });

  // Sort by userScore descending; break any exact tie by founderCEO + designDirector, then compositorRank
  scored.sort(
    (a, b) =>
      b.userScore - a.userScore ||
      b.personas.founderCEO + b.personas.designDirector - (a.personas.founderCEO + a.personas.designDirector) ||
      (a.compositorRank || 99) - (b.compositorRank || 99)
  );

  scored.forEach((item, idx) => {
    item.userRank = idx + 1;
    item.rankDelta = item.isLiveSite ? 0 : item.compositorRank - item.userRank; // positive = moved UP in human/UI review
    if (item.isLiveSite) item.tier = 'Live Baseline · Current Production Site (nestlancer.com)';
    else if (item.userRank <= 8) item.tier = 'Tier S · Flagship User Favorites';
    else if (item.userRank <= 20) item.tier = 'Tier A · High-Converting Studio Pages';
    else if (item.userRank <= 37) item.tier = 'Tier B · Solid Specialized Variants';
    else item.tier = 'Tier C · Niche / Friction-Bearing Combos';
  });

  return scored;
}
