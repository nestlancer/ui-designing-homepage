#!/usr/bin/env node
/**
 * Generates:
 *   1. /homepage-compositor/review/live-nestlancer-preview.html (local preview wrapper for nestlancer.com)
 *   2. /rank list.html (root deliverable requested by user)
 *   3. /rank-list.html (URL-friendly root alias)
 *   4. /homepage-compositor/review/rank-list.html (review-root deliverable)
 *   5. /docs/TOP50-UI-DESIGN-REVIEW-REPORT.md (comprehensive Markdown UI review report)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const REVIEW_DIR = path.join(ROOT, 'homepage-compositor/review');
const auditData = JSON.parse(fs.readFileSync(path.join(REVIEW_DIR, 'multi-tool-audit.json'), 'utf8'));

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function chipClass(slot, val) {
  if (val === 'LIVE') return 'slot-chip--live';
  if (slot === 'hdr') return val === 'P01' ? 'slot-chip--best' : val === 'P02' ? 'slot-chip--bad' : 'slot-chip--warn';
  if (slot === 'hero') return (val === 'H07' || val === 'H01') ? 'slot-chip--best' : '';
  if (slot === 'del') return (val === 'D01' || val === 'D03') ? 'slot-chip--best' : 'slot-chip--warn';
  if (slot === 'fin') return val === 'M05' ? 'slot-chip--best' : val === 'M04' ? 'slot-chip--warn' : '';
  if (slot === 'why') return val === 'W05' ? 'slot-chip--best' : 'slot-chip--bad';
  if (slot === 'work') return (val === 'S02' || val === 'S01') ? 'slot-chip--best' : val === 'S10' ? 'slot-chip--bad' : 'slot-chip--warn';
  if (slot === 'cta') return val === 'C01' ? 'slot-chip--best' : val === 'C04' ? 'slot-chip--warn' : '';
  if (slot === 'ftr') return val === 'P01' ? 'slot-chip--best' : val === 'P05' ? 'slot-chip--warn' : '';
  return '';
}

function formatDelta(p) {
  if (p.isLiveSite) return '<span class="badge badge--gold" style="font-size:9.5px;padding:2px 6px">LIVE SITE</span>';
  const d = p.rankDelta;
  if (d > 0) return `<span class="delta-up" title="Moved up ${d} spots from compositor rank">▲ +${d}</span>`;
  if (d < 0) return `<span class="delta-down" title="Moved down ${Math.abs(d)} spots from compositor rank">▼ ${d}</span>`;
  return `<span class="delta-same">● 0</span>`;
}

function buildLivePreviewHtml() {
  const liveEntry = auditData.rankedPages.find((p) => p.isLiveSite);
  const totalCount = auditData.rankedPages.length;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>Live Website Benchmark — nestlancer.com Marketing Homepage</title>
<style>
  :root {
    --bg: #081720;
    --surface: #0f2430;
    --ink: #ecf7f4;
    --muted: #9ecbc0;
    --teal: #4fd1c5;
    --line: #234452;
    --mono: ui-monospace, "IBM Plex Mono", monospace;
    --font: "Inter", system-ui, sans-serif;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink); font: 400 14px/1.5 var(--font); }
  .bar {
    position: sticky; top: 0; z-index: 20;
    background: rgba(8, 23, 32, 0.94);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--line);
    padding: 10px 18px;
    display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  }
  .bar strong { font: 700 12px/1.2 var(--mono); color: var(--teal); letter-spacing: 0.08em; }
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 14px; border-radius: 999px;
    background: var(--teal); color: #051118;
    font: 700 12px/1 var(--mono); border: 0; cursor: pointer; text-decoration: none;
  }
  .canvas { max-width: 1440px; margin: 0 auto; background: #f6f9f8; }
  .canvas img { width: 100%; height: auto; display: block; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition: none !important; animation: none !important; }
  }
</style>
</head>
<body>
  <header class="bar">
    <div>
      <strong>LIVE PRODUCTION WEBSITE BENCHMARK · NESTLANCER.COM (RANK #${liveEntry.userRank} OF ${totalCount} · SCORE ${liveEntry.userScore}/100)</strong>
      <div style="font-size:12px;color:var(--muted)">1440px@2x Full-Page Production Capture (013-marketing-homepage.webp) + Live DOM Audit</div>
    </div>
    <button class="btn" type="button" onclick="window.open('https://' + 'nestlancer.com/', '_blank', 'noopener')">Open Live https://nestlancer.com/ ↗</button>
  </header>
  <main class="canvas">
    <img src="../../Nestlancer-public-screenshots/public/013-marketing-homepage.webp" alt="Live nestlancer.com marketing homepage full-page capture">
  </main>
</body>
</html>`;
}

function buildHtml(relPrefixToReview, relPrefixToAssets, relPrefixToRoot) {
  const liveEntry = auditData.rankedPages.find((p) => p.isLiveSite);
  const top1Entry = auditData.rankedPages[0];
  const top2Entry = auditData.rankedPages[1];
  const totalCount = auditData.rankedPages.length; // 51

  const dimLabels = [
    ['d1_aboveFold', 'Above-Fold Clarity (15%)'],
    ['d2_portfolioUx', 'Portfolio UX (15%)'],
    ['d3_typographyScale', 'Typography Scale (12%)'],
    ['d4_conversionFlow', 'Conversion & Nav (12%)'],
    ['d5_financialTrust', 'Financial Trust (12%)'],
    ['d6_seamCoherence', 'Seam Coherence (10%)'],
    ['d7_accessibility', 'Accessibility (8%)'],
    ['d8_motionPolish', 'Motion Polish (6%)'],
    ['d9_responsive', 'Responsive (5%)'],
    ['d10_engineeringPerf', 'DOM/CSS Hygiene (5%)'],
  ];

  const toolsHtml = auditData.toolsExecuted.map((t, i) => `
    <article class="tool-card">
      <div class="tool-card__id">TOOL 0${i + 1} · ${esc(t.id.toUpperCase())}</div>
      <h3>${esc(t.name)}</h3>
      <p class="tool-card__scope">${esc(t.scope)}</p>
      <p class="tool-card__finding"><strong>Result:</strong> ${esc(t.keyFinding || t.status)}</p>
    </article>
  `).join('');

  const rowsHtml = auditData.rankedPages.map((p) => {
    const pageUrl = p.isLiveSite
      ? `${relPrefixToReview}/live-nestlancer-preview.html`
      : `${relPrefixToReview}/top50/${p.combo_id}/index.html`;
    const tierBadge = p.isLiveSite
      ? 'badge--gold'
      : p.userRank <= 8
      ? 'badge--gold'
      : p.userRank <= 20
      ? 'badge--success'
      : p.userRank <= 37
      ? 'badge--teal'
      : 'badge--amber';
    const searchHay = [
      p.combo_id,
      p.label,
      p.bestForPersona,
      p.tier,
      ...Object.values(p.slotNames),
      ...p.strengths,
      ...p.watchouts,
    ].join(' ').toLowerCase();

    const dataAttrs = [
      `data-combo="${esc(p.combo_id)}"`,
      `data-label="${esc(p.label)}"`,
      `data-islivesite="${p.isLiveSite ? '1' : '0'}"`,
      `data-pageurl="${esc(pageUrl)}"`,
      `data-userrank="${p.userRank}"`,
      `data-comprank="${p.compositorRank || 99}"`,
      `data-rankdelta="${p.rankDelta}"`,
      `data-userscore="${p.userScore}"`,
      `data-tier="${esc(p.tier)}"`,
      `data-persona="${esc(p.bestForPersona)}"`,
      `data-hdr="${esc(p.slots.hdr)}"`,
      `data-hero="${esc(p.slots.hero)}"`,
      `data-del="${esc(p.slots.del)}"`,
      `data-fin="${esc(p.slots.fin)}"`,
      `data-why="${esc(p.slots.why)}"`,
      `data-work="${esc(p.slots.work)}"`,
      `data-cta="${esc(p.slots.cta)}"`,
      `data-ftr="${esc(p.slots.ftr)}"`,
      `data-founderceo="${p.personas.founderCEO}"`,
      `data-designdirector="${p.personas.designDirector}"`,
      `data-ctoengineering="${p.personas.ctoEngineering}"`,
      `data-cfofinance="${p.personas.cfoFinance}"`,
      `data-d1_abovefold="${p.dimensions.d1_aboveFold}"`,
      `data-d2_portfolioux="${p.dimensions.d2_portfolioUx}"`,
      `data-d3_typographyscale="${p.dimensions.d3_typographyScale}"`,
      `data-d4_conversionflow="${p.dimensions.d4_conversionFlow}"`,
      `data-d5_financialtrust="${p.dimensions.d5_financialTrust}"`,
      `data-d6_seamcoherence="${p.dimensions.d6_seamCoherence}"`,
      `data-d7_accessibility="${p.dimensions.d7_accessibility}"`,
      `data-search="${esc(searchHay)}"`,
    ].join(' ');

    const rowClass = p.isLiveSite ? 'main-row main-row--live' : 'main-row';
    const compCell = p.isLiveSite
      ? `<span class="badge badge--gold" title="Current live production homepage at https://nestlancer.com/">LIVE BASELINE <small>(39/45)</small></span>`
      : `#${p.compositorRank} <small>(${p.compositorScore}/45)</small>`;

    return `
      <tr class="${rowClass}" id="row-${esc(p.combo_id)}" ${dataAttrs}>
        <td>
          <div style="display:flex;align-items:center;gap:8px">
            <span class="rank-num">#${p.userRank}</span>
            ${formatDelta(p)}
          </div>
        </td>
        <td class="num-col" style="color:var(--muted)">${compCell}</td>
        <td style="min-width:300px">
          <a href="${pageUrl}" target="_blank" rel="noopener" style="font-weight:700;font-size:13.5px;color:var(--ink)">${esc(p.label)}</a>
          <div class="slot-pills">
            ${Object.entries(p.slots).map(([k, v]) => `<span class="slot-chip ${chipClass(k, v)}" title="${esc(p.slotNames[k])}">${esc(k)}:${esc(v)}</span>`).join('')}
          </div>
        </td>
        <td><span class="score-pill">${p.userScore.toFixed(2)}<small>/100</small></span></td>
        <td class="num-col">${p.personas.founderCEO.toFixed(1)}</td>
        <td class="num-col">${p.personas.designDirector.toFixed(1)}</td>
        <td class="num-col">${p.personas.ctoEngineering.toFixed(1)}</td>
        <td class="num-col">${p.personas.cfoFinance.toFixed(1)}</td>
        <td>
          <div style="display:flex;flex-direction:column;gap:4px;align-items:flex-start">
            <span class="badge ${tierBadge}">${esc(p.tier.split(' · ')[0])}</span>
            <span style="font-size:11.5px;color:var(--body);font-weight:600">${esc(p.bestForPersona)}</span>
          </div>
        </td>
        <td style="white-space:nowrap">
          <div style="display:flex;gap:6px;align-items:center">
            <button class="btn btn--primary" type="button" style="padding:5px 10px;min-height:30px;font-size:11.5px" onclick="openPreview('${esc(p.combo_id)}')">Preview ▶</button>
            <button class="btn" type="button" style="padding:5px 10px;min-height:30px;font-size:11.5px" onclick="toggleDetail('${esc(p.combo_id)}', this)">Inspect Audit ▾</button>
            <label style="display:inline-flex;align-items:center;gap:4px;font-size:11px;cursor:pointer;margin-left:4px" title="Select up to 2 pages for side-by-side comparison">
              <input type="checkbox" onchange="toggleCompare('${esc(p.combo_id)}', this)"> Compare
            </label>
          </div>
        </td>
      </tr>
      <tr class="detail-row" id="detail-${esc(p.combo_id)}" hidden>
        <td colspan="10">
          <div class="detail-panel">
            <div class="detail-box">
              <h3>10-Dimension UI/UX Score Breakdown</h3>
              <div class="dim-bars">
                ${dimLabels.map(([k, label]) => `
                  <div class="dim-row">
                    <span>${esc(label)}</span>
                    <div class="dim-track"><div class="dim-fill" style="width:${p.dimensions[k]}%"></div></div>
                    <span class="mono" style="text-align:right;font-weight:700">${p.dimensions[k].toFixed(1)}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="detail-box">
              <h3>Why Users Like This Page (Strengths)</h3>
              <ul class="critique-list">
                ${p.strengths.map((s) => `<li>${esc(s)}</li>`).join('')}
              </ul>
              ${p.watchouts.length ? `
                <h3 style="margin-top:14px;color:var(--danger)">UI Watchouts &amp; Tool Findings</h3>
                <ul class="critique-list critique-list--warn">
                  ${p.watchouts.map((w) => `<li>${esc(w)}</li>`).join('')}
                </ul>
              ` : '<p style="margin-top:12px;color:var(--success);font-weight:600;font-size:12.5px">✓ Zero UI watchouts or friction flags across all 8 slots!</p>'}
            </div>

            <div class="detail-box">
              <h3>Multi-Tool Telemetry &amp; Provenance</h3>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px" class="mono">
                <div><strong>Total Bundle:</strong> ${p.toolMetrics.layout.totalKB} KB</div>
                <div><strong>Inlined CSS:</strong> ${p.toolMetrics.layout.cssKB} KB</div>
                <div><strong>Inlined JS:</strong> ${p.toolMetrics.layout.jsKB} KB</div>
                <div><strong>DOM Nodes:</strong> ${p.toolMetrics.layout.domElements}</div>
                <div><strong>Font Sizes:</strong> ${p.toolMetrics.typo.distinctPxSizeCount} px steps</div>
                <div><strong>Micro-Type (&lt;10px):</strong> ${p.toolMetrics.typo.microInstances} rules</div>
                <div><strong>CTA/Hero H2:H1:</strong> ${p.toolMetrics.typo.ctaToHeroRatio}× (${p.toolMetrics.typo.ctaH2MaxPx}px/${p.toolMetrics.typo.heroH1MaxPx}px)</div>
                <div><strong>CTA Button Shape:</strong> ${esc(p.toolMetrics.layout.ctaBtnRadius)}</div>
                <div><strong>Desktop Sign-In:</strong> ${p.toolMetrics.a11y.hasDesktopSignIn ? '✓ Visible' : '✕ Hidden'}</div>
                <div><strong>Work Thumbnails:</strong> ${p.toolMetrics.runtime.visibleWorkImagesDesktop}/8 immediate</div>
                <div><strong>Light Seam Max ΔL:</strong> ${p.toolMetrics.color.maxSeamDeltaLight}</div>
                <div><strong>Breakpoints:</strong> ${p.toolMetrics.layout.mediaBreakpointCount} @media</div>
              </div>
              <div style="margin-top:14px;padding-top:10px;border-top:1px solid var(--line);display:flex;gap:8px;flex-wrap:wrap">
                <a class="btn btn--primary" href="${pageUrl}" target="_blank" rel="noopener">${p.isLiveSite ? 'Open Live Site Benchmark ↗' : 'Open Full Standalone Page ↗'}</a>
                <button class="btn" type="button" onclick="openPreview('${esc(p.combo_id)}')">Open in Viewport Tester ▶</button>
                ${p.isLiveSite ? `<button class="btn" type="button" onclick="window.open('https://' + 'nestlancer.com/', '_blank', 'noopener')">Visit https://nestlancer.com/ ↗</button>` : ''}
              </div>
            </div>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>Nestlancer Top 50 + Live nestlancer.com — Professional UI/UX Review &amp; User Preference Rank List</title>
<meta name="description" content="Comprehensive multi-tool UI/UX design review and user-preference ranking of the 50 composed Nestlancer homepage templates plus the live nestlancer.com production homepage (#1 to #51).">
<script>(function(){try{var q=new URLSearchParams(location.search).get('theme'),s=localStorage.getItem('nl-theme');document.documentElement.dataset.theme=q==='dark'||q==='light'?q:s==='dark'||s==='light'?s:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}})();</script>
<style>
:root {
  color-scheme: light;
  --bg: #f4f8f7;
  --surface: #ffffff;
  --surface-2: #edf4f2;
  --surface-3: #e3efec;
  --ink: #0a2543;
  --ink-2: #123a5e;
  --body: #425869;
  --muted: #5b7280;
  --line: #cfe0dc;
  --line-strong: #9fc0b8;
  --teal: #0f7c70;
  --teal-deep: #0b5b55;
  --teal-soft: #d9eee7;
  --mint: #e4f4ee;
  --band: #082330;
  --band-2: #0d3344;
  --band-text: #e6f4f0;
  --band-mute: #9ecbc0;
  --gold: #b7791f;
  --gold-bg: #fef6e4;
  --gold-line: #f2d59b;
  --amber: #b45309;
  --amber-bg: #fffbeb;
  --danger: #b91c1c;
  --danger-bg: #fef2f2;
  --danger-line: #fecaca;
  --success: #0f766e;
  --success-bg: #ecfdf5;
  --shadow-sm: 0 2px 8px rgba(10, 37, 67, 0.06);
  --shadow: 0 10px 30px rgba(10, 37, 67, 0.09);
  --shadow-lg: 0 20px 50px rgba(10, 37, 67, 0.16);
  --radius: 14px;
  --radius-sm: 8px;
  --pill: 999px;
  --font: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --mono: ui-monospace, "IBM Plex Mono", "SFMono-Regular", Menlo, Consolas, monospace;
}
:root[data-theme="dark"] {
  color-scheme: dark;
  --bg: #081720;
  --surface: #0f2430;
  --surface-2: #142e3c;
  --surface-3: #1b3b4b;
  --ink: #ecf7f4;
  --ink-2: #cde4df;
  --body: #b8d0cc;
  --muted: #8aa8a4;
  --line: #234452;
  --line-strong: #356373;
  --teal: #4fd1c5;
  --teal-deep: #81e6d9;
  --teal-soft: #163e42;
  --mint: #133538;
  --band: #051118;
  --band-2: #0a1f2c;
  --band-text: #e2f2ee;
  --band-mute: #8ec2b6;
  --gold: #f6ad55;
  --gold-bg: rgba(246, 173, 85, 0.12);
  --gold-line: rgba(246, 173, 85, 0.35);
  --amber: #fbbf24;
  --amber-bg: rgba(251, 191, 36, 0.12);
  --danger: #f87171;
  --danger-bg: rgba(248, 113, 113, 0.12);
  --danger-line: rgba(248, 113, 113, 0.32);
  --success: #34d399;
  --success-bg: rgba(52, 211, 153, 0.12);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.35);
  --shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
  --shadow-lg: 0 24px 60px rgba(0, 0, 0, 0.65);
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--body);
  font: 400 15px/1.6 var(--font);
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4, p { margin: 0; }
a { color: var(--teal); text-decoration: none; }
a:hover { text-decoration: underline; }
button, select, input { font: inherit; }
:focus-visible { outline: 2px solid var(--teal); outline-offset: 2px; border-radius: 6px; }
.wrap { width: min(1440px, calc(100% - 40px)); margin: 0 auto; }
.mono { font-family: var(--mono); }

.masthead {
  position: sticky;
  top: 0;
  z-index: 90;
  background: color-mix(in srgb, var(--band) 92%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(158, 203, 192, 0.22);
  color: var(--band-text);
}
.masthead__inner {
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 68px;
  flex-wrap: wrap;
  padding: 8px 0;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  text-decoration: none;
}
.brand:hover { text-decoration: none; }
.brand img { height: 28px; width: auto; display: block; }
.brand__tag {
  font: 700 10px/1 var(--mono);
  letter-spacing: 0.14em;
  padding: 5px 9px;
  border-radius: var(--pill);
  background: rgba(255, 255, 255, 0.1);
  color: var(--band-mute);
}
.mast-nav {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  flex-wrap: wrap;
}
.mast-nav a {
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  color: var(--band-text);
  font: 600 12.5px/1 var(--font);
  text-decoration: none;
  opacity: 0.86;
  transition: background 0.15s, opacity 0.15s;
}
.mast-nav a:hover { background: rgba(255, 255, 255, 0.12); opacity: 1; }
.btn-theme {
  min-height: 38px;
  padding: 0 14px;
  border-radius: var(--pill);
  border: 1px solid rgba(158, 203, 192, 0.4);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font: 600 12px/1 var(--mono);
  cursor: pointer;
}
.btn-theme:hover { background: rgba(255, 255, 255, 0.18); }

.hero {
  background:
    radial-gradient(ellipse 55% 85% at 88% 20%, rgba(47, 165, 155, 0.25), transparent),
    radial-gradient(ellipse 45% 70% at 12% 90%, rgba(15, 124, 112, 0.22), transparent),
    var(--band);
  color: var(--band-text);
  padding: 56px 0 48px;
  border-bottom: 1px solid var(--line);
}
.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.85fr);
  gap: 36px;
  align-items: end;
}
.eyebrow {
  font: 700 11px/1.2 var(--mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #7ce2d4;
}
.hero h1 {
  margin-top: 14px;
  color: #fff;
  font-size: clamp(32px, 4.4vw, 54px);
  font-weight: 750;
  line-height: 1.04;
  letter-spacing: -0.035em;
}
.hero h1 em {
  font-style: normal;
  color: #8ceadf;
}
.hero__lede {
  margin-top: 16px;
  max-width: 68ch;
  font-size: 16px;
  line-height: 1.6;
  color: var(--band-text);
  opacity: 0.92;
}
.hero__callouts {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(158, 203, 192, 0.25);
  border-radius: var(--radius);
  padding: 20px 22px;
  display: grid;
  gap: 14px;
}
.hero__callouts h2 {
  font: 700 12px/1.2 var(--mono);
  letter-spacing: 0.12em;
  color: #8ceadf;
  text-transform: uppercase;
}
.winner-pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  background: rgba(15, 124, 112, 0.28);
  border: 1px solid rgba(140, 234, 223, 0.4);
}
.winner-pill strong {
  color: #fff;
  font-size: 14px;
  display: block;
}
.winner-pill span {
  font: 500 11.5px/1.3 var(--mono);
  color: var(--band-mute);
}
.winner-pill .score-badge {
  font: 700 18px/1 var(--mono);
  color: #8ceadf;
  white-space: nowrap;
}
.kpi-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 12px;
  margin-top: 32px;
}
.kpi {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(158, 203, 192, 0.18);
  border-radius: var(--radius-sm);
  padding: 14px 16px;
}
.kpi__val {
  font: 750 24px/1.1 var(--mono);
  color: #fff;
  font-variant-numeric: tabular-nums;
}
.kpi__label {
  margin-top: 4px;
  font-size: 12px;
  color: var(--band-mute);
}

.section {
  padding: 48px 0;
  border-bottom: 1px solid var(--line);
}
.section__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.section__head h2 {
  color: var(--ink);
  font-size: clamp(22px, 2.6vw, 32px);
  font-weight: 730;
  letter-spacing: -0.025em;
  margin-top: 6px;
}
.section__sub {
  max-width: 72ch;
  color: var(--body);
  font-size: 14.5px;
  margin-top: 6px;
}

.podium-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 18px;
}
.podium-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 22px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
}
.podium-card--gold {
  border: 2px solid var(--teal);
  box-shadow: var(--shadow);
}
.podium-card--live {
  border: 2px solid var(--gold);
  box-shadow: var(--shadow);
}
.podium-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: var(--pill);
  font: 700 11px/1.2 var(--mono);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.badge--teal { background: var(--teal-soft); color: var(--teal-deep); }
.badge--gold { background: var(--gold-bg); color: var(--gold); border: 1px solid var(--gold-line); }
.badge--amber { background: var(--amber-bg); color: var(--amber); }
.badge--danger { background: var(--danger-bg); color: var(--danger); border: 1px solid var(--danger-line); }
.badge--success { background: var(--success-bg); color: var(--success); }

.podium-card h3 {
  color: var(--ink);
  font-size: 18px;
  font-weight: 720;
  letter-spacing: -0.015em;
}
.podium-card__combo {
  font: 600 12.5px/1.4 var(--mono);
  color: var(--teal);
  background: var(--surface-2);
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--line);
}
.podium-card p {
  font-size: 13.5px;
  color: var(--body);
  line-height: 1.55;
}
.podium-card__actions {
  margin-top: auto;
  padding-top: 10px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 36px;
  padding: 7px 14px;
  border-radius: var(--pill);
  font: 600 12.5px/1 var(--font);
  cursor: pointer;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--ink);
  text-decoration: none;
  transition: all 0.15s ease;
}
.btn:hover {
  border-color: var(--teal);
  color: var(--teal);
  text-decoration: none;
}
.btn--primary {
  background: var(--teal);
  border-color: var(--teal);
  color: #fff;
}
.btn--primary:hover {
  background: var(--teal-deep);
  border-color: var(--teal-deep);
  color: #fff;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  gap: 14px;
}
.tool-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 18px 20px;
  box-shadow: var(--shadow-sm);
}
.tool-card__id {
  font: 700 10.5px/1 var(--mono);
  color: var(--teal);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.tool-card h3 {
  margin-top: 6px;
  color: var(--ink);
  font-size: 15.5px;
  font-weight: 700;
}
.tool-card__scope {
  margin-top: 6px;
  font: 400 11.5px/1.45 var(--mono);
  color: var(--muted);
}
.tool-card__finding {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--line);
  font-size: 13px;
  color: var(--ink-2);
}

.slot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 16px;
}
.slot-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: var(--shadow-sm);
}
.slot-card h3 {
  color: var(--ink);
  font-size: 16px;
  font-weight: 720;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.variant-list {
  display: grid;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.variant-item {
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  border: 1px solid var(--line);
  font-size: 13px;
}
.variant-item__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.variant-item__head strong {
  color: var(--ink);
  font-family: var(--mono);
  font-size: 12px;
}

.insight-box {
  background: var(--surface);
  border: 1px solid var(--line);
  border-left: 5px solid var(--teal);
  border-radius: var(--radius);
  padding: 22px 24px;
  box-shadow: var(--shadow-sm);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.insight-box--live {
  border-left-color: var(--gold);
}
.insight-box h3 {
  color: var(--ink);
  font-size: 16.5px;
  margin-bottom: 8px;
}
.insight-box ul {
  margin: 8px 0 0;
  padding-left: 18px;
  font-size: 13.5px;
  display: grid;
  gap: 6px;
}

.toolbar {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 18px 20px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 20px;
  display: grid;
  gap: 14px;
}
.toolbar__row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-end;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 120px;
  flex: 1;
}
.field label {
  font: 700 10.5px/1 var(--mono);
  color: var(--muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.field select, .field input {
  height: 38px;
  padding: 0 10px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--line);
  background: var(--surface-2);
  color: var(--ink);
  font-size: 13px;
}
.toolbar__status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 10px;
  border-top: 1px solid var(--line);
  font-size: 13px;
}

.table-wrap {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  overflow-x: auto;
}
table.rank-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.rank-table th, .rank-table td {
  padding: 12px 10px;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: middle;
}
.rank-table th {
  position: sticky;
  top: 0;
  background: var(--surface-2);
  color: var(--ink);
  font: 700 10.5px/1.2 var(--mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  z-index: 5;
}
.rank-table tbody tr.main-row:hover {
  background: color-mix(in srgb, var(--mint) 45%, transparent);
}
.rank-table tbody tr.main-row--live {
  background: var(--gold-bg);
}
.rank-table tbody tr.main-row[hidden] { display: none; }
.rank-num {
  font: 750 16px/1 var(--mono);
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}
.delta-up { color: var(--success); font: 700 11px/1 var(--mono); }
.delta-down { color: var(--danger); font: 700 11px/1 var(--mono); }
.delta-same { color: var(--muted); font: 600 11px/1 var(--mono); }

.score-pill {
  display: inline-flex;
  align-items: baseline;
  gap: 2px;
  padding: 5px 10px;
  border-radius: var(--radius-sm);
  background: var(--teal-soft);
  color: var(--teal-deep);
  font: 750 14px/1 var(--mono);
  font-variant-numeric: tabular-nums;
}
.score-pill small { font-size: 10px; font-weight: 500; opacity: 0.8; }

.slot-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
}
.slot-chip {
  font: 600 11px/1 var(--mono);
  padding: 3px 6px;
  border-radius: 5px;
  background: var(--surface-2);
  border: 1px solid var(--line);
  color: var(--ink-2);
}
.slot-chip--best {
  background: var(--teal-soft);
  border-color: var(--line-strong);
  color: var(--teal-deep);
}
.slot-chip--live {
  background: var(--gold-bg);
  border-color: var(--gold-line);
  color: var(--gold);
}
.slot-chip--warn {
  background: var(--amber-bg);
  color: var(--amber);
}
.slot-chip--bad {
  background: var(--danger-bg);
  color: var(--danger);
}

.num-col {
  font: 600 12.5px/1 var(--mono);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

tr.detail-row {
  background: var(--surface-2);
}
tr.detail-row[hidden] { display: none; }
.detail-panel {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
.detail-box {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  padding: 16px;
}
.detail-box h3 {
  font: 700 11.5px/1.2 var(--mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink);
  margin-bottom: 12px;
}
.dim-bars {
  display: grid;
  gap: 8px;
}
.dim-row {
  display: grid;
  grid-template-columns: 145px 1fr 42px;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}
.dim-track {
  height: 7px;
  background: var(--surface-2);
  border-radius: var(--pill);
  overflow: hidden;
}
.dim-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--teal), #3fb8ab);
  border-radius: var(--pill);
}
.critique-list {
  margin: 0;
  padding-left: 16px;
  display: grid;
  gap: 6px;
  font-size: 12.5px;
}
.critique-list--warn li { color: var(--danger); }

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(5, 17, 24, 0.78);
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  padding: 16px;
}
.modal-backdrop[hidden] { display: none; }
.modal {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}
.modal__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 16px;
  background: var(--surface-2);
  border-bottom: 1px solid var(--line);
  flex-wrap: wrap;
}
.modal__title {
  font: 700 13px/1.2 var(--mono);
  color: var(--ink);
}
.modal__controls {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.modal__viewport {
  flex: 1;
  background: #1e293b;
  display: flex;
  justify-content: center;
  overflow: auto;
  padding: 12px;
  gap: 12px;
}
.modal__frame {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 8px;
  height: 100%;
  width: 1440px;
  max-width: 100%;
  transition: width 0.2s ease;
}

footer.page-foot {
  padding: 36px 0 56px;
  color: var(--muted);
  font: 500 12px/1.6 var(--mono);
}

@media (max-width: 960px) {
  .hero__grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition: none !important; animation: none !important; scroll-behavior: auto !important; }
}
</style>
</head>
<body>

<header class="masthead">
  <div class="wrap masthead__inner">
    <a class="brand" href="#top">
      <img src="${relPrefixToAssets}/logo-full-dark.svg" alt="Nestlancer" width="116" height="32">
      <span class="brand__tag">UI REVIEW &amp; USER PREFERENCE RANK LIST</span>
    </a>
    <nav class="mast-nav" aria-label="Report sections">
      <a href="#champions">Top Champions</a>
      <a href="#live-benchmark">Live nestlancer.com Rank</a>
      <a href="#tools">7-Tool Audit</a>
      <a href="#slot-critique">8-Slot Critique</a>
      <a href="#methodology-diff">Why Rankings Changed</a>
      <a href="#rank-table">Full #1–#${totalCount} Rank List</a>
    </nav>
    <button class="btn-theme" id="themeBtn" type="button" aria-pressed="false">Dark mode ↗</button>
  </div>
</header>

<section class="hero" id="top">
  <div class="wrap">
    <div class="hero__grid">
      <div>
        <p class="eyebrow">NESTLANCER · PROFESSIONAL UI DESIGN &amp; UX AUDIT REPORT</p>
        <h1>Which of the 50 Homepages (+ Live <em>nestlancer.com</em>)<br><em>Users Will Love Most.</em></h1>
        <p class="hero__lede">
          We audited all <strong>50 self-contained homepage templates</strong> plus the live production website <strong>nestlancer.com</strong> (<strong>${totalCount} homepages total</strong>) using a <strong>7-tool inspection pipeline</strong> covering HTML/DOM semantics, WCAG 2.1 contrast &amp; seam luminance, typographic scale hierarchy, layout geometry, interactive runtime execution (<code>linkedom</code> VM), and conversion psychology across 4 buyer personas.
        </p>
      </div>
      <div class="hero__callouts">
        <h2>#1 Overall Winner vs. Live nestlancer.com</h2>
        <div class="winner-pill">
          <div>
            <strong>#1 Winner: P01 · H07 · D01 · M05 · W05 · S02 · C01 · Ftr-P01</strong>
            <span>Outscores Live nestlancer.com (Rank #${liveEntry.userRank} · ${liveEntry.userScore}/100) by +${(top1Entry.userScore - liveEntry.userScore).toFixed(2)} pts</span>
          </div>
          <div class="score-badge">97.51<small>/100</small></div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn--primary" type="button" onclick="openPreview('hdr-P01__hero-H07__del-D01__fin-M05__why-W05__work-S02__cta-C01__ftr-P01')">Preview #1 Winner ▶</button>
          <button class="btn" style="background:rgba(246,173,85,0.2);color:#fff;border-color:rgba(246,173,85,0.5)" type="button" onclick="openPreview('live-nestlancer-com')">Preview Live nestlancer.com (#${liveEntry.userRank}) ▶</button>
        </div>
      </div>
    </div>

    <div class="kpi-strip">
      <div class="kpi">
        <div class="kpi__val">51 / 51</div>
        <div class="kpi__label">50 Redesign Templates + 1 Live nestlancer.com Baseline</div>
      </div>
      <div class="kpi">
        <div class="kpi__val">97.51<span style="font-size:14px;opacity:.7">/100</span></div>
        <div class="kpi__label">#1 Redesign Score (P01·H07·D01·M05·W05·S02·C01·Ftr-P01)</div>
      </div>
      <div class="kpi">
        <div class="kpi__val">#${liveEntry.userRank}<span style="font-size:14px;opacity:.7"> (${liveEntry.userScore.toFixed(2)})</span></div>
        <div class="kpi__label">Live nestlancer.com Rank (35 Redesigns Beat Live Site)</div>
      </div>
      <div class="kpi">
        <div class="kpi__val">10</div>
        <div class="kpi__label">Weighted UI, UX, A11y, Motion &amp; Conversion axes</div>
      </div>
      <div class="kpi">
        <div class="kpi__val">7 Tools</div>
        <div class="kpi__label">DOM, A11y, Contrast, Scale, Geometry, VM &amp; Persona Suite</div>
      </div>
    </div>
  </div>
</section>

<main class="wrap">

  <!-- SECTION 1: TOP CHAMPIONS BY BUYER PERSONA -->
  <section class="section" id="champions">
    <div class="section__head">
      <div>
        <p class="eyebrow" style="color:var(--teal)">BUYER PERSONA WINNERS</p>
        <h2>Top Homepage Recommendations by User Archetype</h2>
        <p class="section__sub">Different visitors scan a studio homepage with different priorities. Here are the highest-scoring templates overall and for each core Nestlancer buyer persona.</p>
      </div>
    </div>

    <div class="podium-grid">
      <article class="podium-card podium-card--gold">
        <div class="podium-card__top">
          <span class="badge badge--gold">★ #1 OVERALL · FOUNDER &amp; CEO FAVORITE</span>
          <span class="score-pill">97.51<small>/100</small></span>
        </div>
        <h3>The High-Clarity Conversion Flagship</h3>
        <div class="podium-card__combo">P01 · H07 · D01 · M05 · W05 · S02 · C01 · Ftr-P01</div>
        <p>
          <strong>Why users love it most:</strong> Opens with <code>P01</code> (full desktop + mobile Sign-In &amp; CTA parity), pairs the headline immediately with <code>H07</code>’s bold <strong>₹48,000 fixed-price</strong> Project Hub proof, flows through <code>D01</code>’s linear 4-step pipeline rail and <code>M05</code>’s visual cashflow bars, lets visitors interactively filter all 8 portfolio builds in 1 click (<code>S02</code>), and closes with <code>C01</code>’s focused meridian CTA.
        </p>
        <div class="podium-card__actions">
          <button class="btn btn--primary" type="button" onclick="openPreview('hdr-P01__hero-H07__del-D01__fin-M05__why-W05__work-S02__cta-C01__ftr-P01')">Live Preview ▶</button>
          <a class="btn" href="${relPrefixToReview}/top50/hdr-P01__hero-H07__del-D01__fin-M05__why-W05__work-S02__cta-C01__ftr-P01/index.html" target="_blank" rel="noopener">Open Page ↗</a>
          <span class="badge badge--teal" style="margin-left:auto">Was #4 in Compositor</span>
        </div>
      </article>

      <article class="podium-card">
        <div class="podium-card__top">
          <span class="badge badge--teal">★ #2 OVERALL · DESIGN DIRECTOR FAVORITE</span>
          <span class="score-pill">96.85<small>/100</small></span>
        </div>
        <h3>The Canonical Studio Ground-Truth</h3>
        <div class="podium-card__combo">P01 · H01 · D01 · M05 · W05 · S02 · C01 · Ftr-P01</div>
        <p>
          <strong>Why product &amp; design leads love it:</strong> Uses <code>H01 Ground Truth</code> (1.02fr copy / 0.98fr floating Project Hub window with soft mesh wash — the purest expression of the original Nestlancer art direction) combined with <code>D01</code> Continuum Rail, <code>M05</code> Cashflow Bars, <code>W05</code> 6-Tile Bento, and <code>S02</code> Filterable 4×2 Case Grid. Zero seam cuts, zero button-shape clashes.
        </p>
        <div class="podium-card__actions">
          <button class="btn btn--primary" type="button" onclick="openPreview('hdr-P01__hero-H01__del-D01__fin-M05__why-W05__work-S02__cta-C01__ftr-P01')">Live Preview ▶</button>
          <a class="btn" href="${relPrefixToReview}/top50/hdr-P01__hero-H01__del-D01__fin-M05__why-W05__work-S02__cta-C01__ftr-P01/index.html" target="_blank" rel="noopener">Open Page ↗</a>
          <span class="badge badge--teal" style="margin-left:auto">Was #28 in Compositor</span>
        </div>
      </article>

      <article class="podium-card">
        <div class="podium-card__top">
          <span class="badge badge--teal">★ #3 OVERALL · CFO &amp; PROCUREMENT FAVORITE</span>
          <span class="score-pill">96.81<small>/100</small></span>
        </div>
        <h3>The Auditable Milestone &amp; Case Grid</h3>
        <div class="podium-card__combo">P01 · H07 · D01 · M05 · W05 · S01 · C01 · Ftr-P01</div>
        <p>
          <strong>Why finance &amp; operations leads trust it:</strong> Leads with <code>H07</code> ₹48,000 fixed-price proof, reinforces milestone payment control with <code>M05</code> tabular INR cashflow bars + Razorpay/UPI/PCI badges, presents all 8 portfolio builds indexed <code>01/08</code>–<code>08/08</code> in <code>S01</code>, and closes with <code>Ftr-P01</code>’s complete legal &amp; document-verification sitemap.
        </p>
        <div class="podium-card__actions">
          <button class="btn btn--primary" type="button" onclick="openPreview('hdr-P01__hero-H07__del-D01__fin-M05__why-W05__work-S01__cta-C01__ftr-P01')">Live Preview ▶</button>
          <a class="btn" href="${relPrefixToReview}/top50/hdr-P01__hero-H07__del-D01__fin-M05__why-W05__work-S01__cta-C01__ftr-P01/index.html" target="_blank" rel="noopener">Open Page ↗</a>
          <span class="badge badge--teal" style="margin-left:auto">Was #3 in Compositor</span>
        </div>
      </article>

      <article class="podium-card podium-card--live">
        <div class="podium-card__top">
          <span class="badge badge--gold">★ RANK #${liveEntry.userRank} OF ${totalCount} · LIVE PRODUCTION SITE</span>
          <span class="score-pill">${liveEntry.userScore.toFixed(2)}<small>/100</small></span>
        </div>
        <h3>Live Website: nestlancer.com</h3>
        <div class="podium-card__combo">LIVE · Nexus Surface · 4-Step Cards · Money Split · Marquee Work</div>
        <p>
          <strong>How the live site ranks:</strong> Scores <strong>${liveEntry.userScore.toFixed(2)}/100 (#${liveEntry.userRank} of ${totalCount})</strong>. It beats 15 niche templates (#37–#51, including the compositor’s #1 pick at #37) thanks to visible desktop Sign-In, consistent 999px pill buttons, and smooth light-mode seams, but trails the Top 35 redesigns due to its moving horizontal portfolio marquee, 3 stacked Hero widgets, and 8-link nav bar.
        </p>
        <div class="podium-card__actions">
          <button class="btn btn--primary" type="button" onclick="openPreview('live-nestlancer-com')">Inspect Capture ▶</button>
          <button class="btn" type="button" onclick="window.open('https://' + 'nestlancer.com/', '_blank', 'noopener')">Visit nestlancer.com ↗</button>
          <a class="btn" href="#row-live-nestlancer-com">Jump to Row #${liveEntry.userRank} ↓</a>
        </div>
      </article>
    </div>
  </section>

  <!-- SECTION 1B: LIVE NESTLANCER.COM BENCHMARK ANALYSIS -->
  <section class="section" id="live-benchmark">
    <div class="section__head">
      <div>
        <p class="eyebrow" style="color:var(--gold)">LIVE PRODUCTION BENCHMARK · HTTPS://NESTLANCER.COM/</p>
        <h2>How Live <code>nestlancer.com</code> Ranks Against the 50 Composed Homepages</h2>
        <p class="section__sub">We fetched and audited the live production homepage at <code>https://nestlancer.com/</code> (alongside the 1440px@2x reference capture <code>013-marketing-homepage.webp</code>) using the exact same 10-dimension rubric.</p>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn--primary" type="button" onclick="compareLiveVsWinner()">Compare #1 Winner vs. Live nestlancer.com ▶</button>
        <button class="btn" type="button" onclick="window.open('https://' + 'nestlancer.com/', '_blank', 'noopener')">Open https://nestlancer.com/ ↗</button>
      </div>
    </div>

    <div class="insight-box insight-box--live">
      <div>
        <h3>Where Live <code>nestlancer.com</code> Excels (Why It Beats #37–#51)</h3>
        <ul>
          <li><strong>Rank #${liveEntry.userRank} of ${totalCount} (Score: ${liveEntry.userScore.toFixed(2)}/100 · Compositor Equivalent: 39/45):</strong> Outperforms 15 composed templates, including the automated compositor’s #1 pick (<code>P04·H08·D03·M04·W05·S03·C04·Ftr-P04</code>, which ranks #37 at 86.14/100).</li>
          <li><strong>Full Desktop Sign-In &amp; Pill Button Consistency (90.0/100):</strong> Unlike <code>hdr-P02</code> (which hides <em>Sign in</em> on desktop) and <code>cta-C04</code> (which switches to 3px rectangular buttons), live <code>nestlancer.com</code> keeps <em>Sign in</em> visible in desktop chrome and uses consistent <code>999px</code> pill buttons throughout.</li>
          <li><strong>Disciplined Section Heading Scale (92.0/100):</strong> Uses a 56px Hero H1 and 34–38px section H2s without <code>C04</code>’s 88px CTA H2 scale inversion or <code>S10</code>’s 7.5px micro-typography.</li>
          <li><strong>Smooth Light-Mode Surface Seams (93.5/100):</strong> Alternates gently between <code>#f6f9f8</code>, <code>#edf4f2</code>, and <code>#dff0ea</code> mint before the dark <code>#082330</code> footer.</li>
        </ul>
      </div>
      <div>
        <h3>Why the Top 35 Redesigns Beat Live <code>nestlancer.com</code> (+11.11 pts at #1)</h3>
        <ul>
          <li><strong>1. Moving Portfolio Marquee vs. Filterable 4×2 Grid (76.0 vs 99.0/100):</strong> Live <code>nestlancer.com</code> puts its 8 portfolio projects inside a continuous horizontal marquee (duplicating <code>8×2 = 16</code> cards in the DOM) with no category filter, and mislabels <em>Fintech Payments Hub</em> as <code>E-Commerce</code>. Rank #1’s <code>S02</code> displays all 8 thumbnails at once in a calm 4×2 grid with 1-click category filtering.</li>
          <li><strong>2. Three Stacked Hero Widgets vs. Focused Hub Window (86.0 vs 98.5/100):</strong> Live <code>FIG 01</code> stacks 3 separate dark cards in the right column (<code>project-hub</code> + <code>⌘K command</code> + <code>nl status</code> CLI) plus a top cookie banner and 8-link nav bar. <code>H07</code> and <code>H01</code> focus attention on one cohesive Project Hub window.</li>
          <li><strong>3. Static Text Rows vs. Visual Cashflow &amp; Pipeline Artifacts (88.5 vs 99.0/100):</strong> Replacing live <code>FIG 02</code>/<code>FIG 03</code> plain rows with <code>D01</code>’s connected 68% pipeline rail and <code>M05</code>’s proportional cashflow staircase bars dramatically improves 3-second comprehension.</li>
          <li><strong>4. H1 Plain-Text Span Concatenation:</strong> Live <code>nestlancer.com</code> wraps H1 words in <code>&lt;span&gt;</code> elements without trailing spaces, causing assistive/plain-text parsers to read <code>"Shipwithclientsintheloop—andmoneyundercontrol."</code> — fixed across all 50 redesigned templates.</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- SECTION 2: THE 7 TOOLS USED -->
  <section class="section" id="tools">
    <div class="section__head">
      <div>
        <p class="eyebrow" style="color:var(--teal)">MULTI-TOOL VERIFICATION SUITE</p>
        <h2>7 Specialized Tools Used to Audit All ${totalCount} Pages</h2>
        <p class="section__sub">Rather than relying on a single static heuristic, we executed 7 distinct inspection tools across every file in <code>homepage-compositor/review/top50/</code> plus the live <code>nestlancer.com</code> homepage.</p>
      </div>
    </div>

    <div class="tools-grid" id="toolsGrid">${toolsHtml}</div>
  </section>

  <!-- SECTION 3: WHY OUR UI REVIEW RANKING DIFFERS FROM REVIEW.MJS -->
  <section class="section" id="methodology-diff">
    <div class="section__head">
      <div>
        <p class="eyebrow" style="color:var(--teal)">CRITICAL DESIGNER INSIGHT</p>
        <h2>Why Professional UI Review Differs from the Automated Compositor Score</h2>
        <p class="section__sub">The automated generator (<code>tools/review.mjs</code>) scored 48 of the Top 50 pages as an identical <strong>43/45 tie</strong> and placed <code>P04 · H08 · D03 · M04 · W05 · S03 · C04 · Ftr-P04</code> at #1 (44/45). Our 7-tool audit uncovered 6 concrete reasons why real users prefer a different order:</p>
      </div>
    </div>

    <div class="insight-box">
      <div>
        <h3>What the Coarse Heuristic (<code>review.mjs</code>) Did</h3>
        <ul>
          <li><strong>Vector Standard Deviation Bias:</strong> Because <code>W05</code> was assigned trait vector <code>[1,1,1]</code>, the script rewarded slots with vector <code>[1,0,1]</code> (<code>P04</code>, <code>H08</code>, <code>D03</code>, <code>M04</code>, <code>S03</code>, <code>C04</code>) and penalized clean flat/grid surfaces assigned <code>[0,0,0]</code> (<code>P01</code>, <code>H01</code>, <code>H07</code>, <code>D01</code>, <code>S01</code>, <code>S02</code>, <code>C01</code>) — even though <code>S01</code> and <code>S02</code> actually use elevated shadowed cards!</li>
          <li><strong>Coarse Integer Rounding:</strong> Rounding 9 aspect scores to the nearest integer compressed 684 different pages into a single <code>43/45</code> tie bucket.</li>
          <li><strong>No DOM/CSS Inspection of UX Ergonomics:</strong> It did not check how many clicks it takes to view portfolio items, whether "Sign in" is visible on desktop, or whether CTA button shapes match.</li>
        </ul>
      </div>
      <div>
        <h3>6 Real UI/UX Defects Our Multi-Tool Suite Caught</h3>
        <ul>
          <li><strong>1. Missing Desktop "Sign in" in <code>hdr-P02</code> (12 pages):</strong> In <code>P02-glass</code>, <code>&lt;a href="/login"&gt;Sign in&lt;/a&gt;</code> is only inside the mobile drawer (<code>.nav__panel</code>), which is <code>display:none</code> at <code>&gt;=900px</code>! Desktop visitors have no Sign In button.</li>
          <li><strong>2. Portfolio Hiding + Swap Bug + Stale Copy in <code>work-S03</code> (17 pages):</strong> <code>S03</code> shows only <strong>1 of 8</strong> projects at a time (requiring 7 clicks), boots on item <code>05/08</code> instead of <code>01/08</code>, attaches <code>img.onload</code> before setting <code>img.src</code> (forcing a 320ms timeout delay on every tab click), and leaves the unedited phrase <em>"for a lending platform"</em> in initial <code>#pv-desc</code> HTML.</li>
          <li><strong>3. Scale Inversion &amp; Shape Clash in <code>cta-C04</code> (29 pages):</strong> <code>C04</code> sets its closing <code>H2</code> to <strong>88px</strong> (<code>-0.077em</code> tracking, <code>0.92</code> line-height) — <strong>57% larger than the 56px Hero H1</strong> — and uses <strong>3px square stacked buttons</strong> while every other section uses <code>999px</code> pill buttons!</li>
          <li><strong>4. Illegible 7.5px Micro-Type &amp; Non-Clickable Rows in <code>work-S10</code> (4 pages):</strong> <code>S10</code> has 7 CSS rules between <code>7.5px</code> and <code>9.5px</code>, requires ~1,400px of scrolling, and has no click handler on <code>.case</code> cards.</li>
          <li><strong>5. Non-Semantic Banner &amp; 42px Target in <code>hdr-P04</code> (11 pages):</strong> <code>P04-pill</code> uses <code>&lt;div role="banner"&gt;</code> instead of <code>&lt;header&gt;</code> and sizes its theme button at <code>42×42px</code> (&lt;44px WCAG target).</li>
          <li><strong>6. Light-Mode Dark Slab &amp; Right-Aligned Copy in <code>why-W04</code> (2 pages):</strong> <code>W04</code> inserts a full-bleed <code>#0b2b36</code> dark plane into Light Mode (<code>ΔL = 0.89</code> seam jump) and right-aligns odd proof paragraphs.</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- SECTION 4: 8-SLOT DESIGN CRITIQUE -->
  <section class="section" id="slot-critique">
    <div class="section__head">
      <div>
        <p class="eyebrow" style="color:var(--teal)">COMPONENT-LEVEL UI REVIEW</p>
        <h2>Deep Critique of the 8 Section Slots Across the Top 50 + Live Site</h2>
        <p class="section__sub">How each section sample performs on visual craft, user comprehension, accessibility, and cross-slot harmony when composed into a full homepage.</p>
      </div>
    </div>

    <div class="slot-grid">
      <div class="slot-card">
        <h3><span>01 · Header Chrome</span><span class="badge badge--teal">3 + Live</span></h3>
        <ul class="variant-list">
          <li class="variant-item">
            <div class="variant-item__head"><strong>P01 · Classic Solid Bar (27 pages)</strong><span class="badge badge--success">★ Best UX (98/100)</span></div>
            Semantic <code>&lt;header&gt;</code>, 44×44px touch targets, animated underline-draw links, full Desktop + Mobile <em>Sign in</em> and <em>Start a project</em> parity, zero sticky collision.
          </li>
          <li class="variant-item">
            <div class="variant-item__head"><strong>P04 · Floating Pill Dock (11 pages)</strong><span class="badge badge--amber">Good · Minor Issues (91/100)</span></div>
            Sleek floating capsule with sparkle CTA. Uses <code>&lt;div role="banner"&gt;</code> instead of <code>&lt;header&gt;</code>, 42×42px icon button, and creates a double-sticky plane with <code>S03</code>/<code>S10</code>.
          </li>
          <li class="variant-item">
            <div class="variant-item__head"><strong>P02 · Sticky Glass Bar (12 pages)</strong><span class="badge badge--danger">✕ Desktop Defect (79/100)</span></div>
            Nice 14px blur, but <strong>omits "Sign in" on desktop (&gt;=900px)</strong> because the link only exists inside the hidden mobile drawer (<code>#menuPanel</code>).
          </li>
        </ul>
      </div>

      <div class="slot-card">
        <h3><span>02 · Hero &amp; Sector Ticker</span><span class="badge badge--teal">5 + Live</span></h3>
        <ul class="variant-list">
          <li class="variant-item">
            <div class="variant-item__head"><strong>H07 · Money-First Split (9 pages)</strong><span class="badge badge--success">★ Top Conversion (98/100)</span></div>
            Leads the Project Hub preview with a bold <code>₹48,000 FIXED-PRICE QUOTE</code> count-up, immediately proving the H1 claim <em>"and money under control."</em>
          </li>
          <li class="variant-item">
            <div class="variant-item__head"><strong>H01 · Ground Truth Split (8 pages)</strong><span class="badge badge--success">★ Best Balance (96/100)</span></div>
            Canonical <code>1.02fr / 0.98fr</code> split with floating Hub window (<code>7s</code> float) and soft dual radial mesh wash.
          </li>
          <li class="variant-item">
            <div class="variant-item__head"><strong>H08 · Command Rail (22 pages)</strong><span class="badge badge--teal">Strong for CTOs (89/100)</span></div>
            Adds a 56px vertical mono rail + magnetic button, but narrows the H1 copy column to ~480px on 1440px screens.
          </li>
          <li class="variant-item">
            <div class="variant-item__head"><strong>H09 · Split Mirror (8), H03 (3) &amp; LIVE</strong><span class="badge badge--amber">Specialized (82–86)</span></div>
            <code>H09</code>’s center vertical rule stops abruptly at Delivery; <code>LIVE</code> stacks 3 separate right-column dark widgets.
          </li>
        </ul>
      </div>

      <div class="slot-card">
        <h3><span>03 · Delivery Narrative (FIG 02)</span><span class="badge badge--teal">3 + Live</span></h3>
        <ul class="variant-list">
          <li class="variant-item">
            <div class="variant-item__head"><strong>D01 · Continuum Pipeline Rail (24 pages)</strong><span class="badge badge--success">★ Best Flow (99/100)</span></div>
            Connected horizontal pipeline with SVG checkmarks, 68% active fill bar, 4-across linear step cards (<code>02.1</code>→<code>02.4</code>), and 4 responsive breakpoints.
          </li>
          <li class="variant-item">
            <div class="variant-item__head"><strong>D03 · Bento Field Grid (16 pages)</strong><span class="badge badge--success">★ Clean Craft (96/100)</span></div>
            Crisp progress track above a 4-card bento field with only 1 hard-coded hex and 6 font sizes.
          </li>
          <li class="variant-item">
            <div class="variant-item__head"><strong>D10 · Magnetic 2×2 Stack (10 pages)</strong><span class="badge badge--amber">Watchout (87/100)</span></div>
            Wraps a sequential 4-step process into a 2×2 zig-zag grid and drops to only 2 media queries.
          </li>
        </ul>
      </div>

      <div class="slot-card">
        <h3><span>04 · Financial Clarity (Money)</span><span class="badge badge--teal">3 + Live</span></h3>
        <ul class="variant-list">
          <li class="variant-item">
            <div class="variant-item__head"><strong>M05 · Cashflow Staircase Bars (35 pages)</strong><span class="badge badge--success">★ Best Comprehension (99/100)</span></div>
            Turns milestone ₹ amounts (<code>₹29,500</code> / <code>₹48,000</code> / <code>₹62,000</code>) into proportional animated bars (47.6% / 77.4% / 100%) + <code>₹4,28,500</code> collected.
          </li>
          <li class="variant-item">
            <div class="variant-item__head"><strong>M01 · Broadsheet Statement (6 pages)</strong><span class="badge badge--teal">Best for CFOs (94/100)</span></div>
            The only sample with a true semantic <code>&lt;table&gt;</code>, audit stamp, and 0 hard-coded hexes. Uses 15 distinct font sizes.
          </li>
          <li class="variant-item">
            <div class="variant-item__head"><strong>M04 · Rails CLI Terminal (9 pages)</strong><span class="badge badge--amber">Niche / Dev Only (84/100)</span></div>
            Live-typed CLI command inside a dark navy window; appeals to developers but feels foreign to finance/business buyers.
          </li>
        </ul>
      </div>

      <div class="slot-card">
        <h3><span>05 · Why Nestlancer (FIG 04)</span><span class="badge badge--teal">2 + Live</span></h3>
        <ul class="variant-list">
          <li class="variant-item">
            <div class="variant-item__head"><strong>W05 · Six-Tile Gate Bento (48 pages)</strong><span class="badge badge--success">★ Clear Winner (94/100)</span></div>
            12-column asymmetric bento mixing 2 dark hero tiles, 1 mint tile, and 3 light tiles with bespoke CSS micro-diagrams. Minor note: shifts <code>--bg</code> to <code>#f5f9f6</code> and uses <code>system-ui</code>.
          </li>
          <li class="variant-item">
            <div class="variant-item__head"><strong>W04 · Dark Convergence Manifold (2 pages)</strong><span class="badge badge--danger">⚠ Seam Cut (78/100)</span></div>
            Forces a full-bleed dark <code>#0b2b36</code> slab in Light Mode (<code>ΔL = 0.89</code>) and right-aligns odd proof blocks (<code>text-align: right</code>).
          </li>
        </ul>
      </div>

      <div class="slot-card">
        <h3><span>06 · Selected Work (FIG 05)</span><span class="badge badge--teal">4 + Live</span></h3>
        <ul class="variant-list">
          <li class="variant-item">
            <div class="variant-item__head"><strong>S02 · Filter Bar + 4×2 Grid (14 pages)</strong><span class="badge badge--success">★ #1 Portfolio UX (99/100)</span></div>
            Shows all 8 concept thumbnails immediately AND provides 1-click category filtering (<code>ALL 8</code>, <code>UI/UX 2</code>, <code>FINTECH 1</code>…) with <code>aria-live</code> count.
          </li>
          <li class="variant-item">
            <div class="variant-item__head"><strong>S01 · 4×2 Spotlight Case Grid (15 pages)</strong><span class="badge badge--success">★ Zero-Click Scan (95/100)</span></div>
            All 8 cases visible at once with cursor-tracking radial spotlight and <code>01/08</code> indexing.
          </li>
          <li class="variant-item">
            <div class="variant-item__head"><strong>S03 · Split Viewer (17) &amp; LIVE Marquee (1)</strong><span class="badge badge--amber">⚠ Interaction Friction (81 / 76)</span></div>
            <code>S03</code> hides 7/8 images behind clicks + 320ms swap bug; <code>LIVE</code> uses a moving horizontal marquee with duplicate DOM nodes.
          </li>
          <li class="variant-item">
            <div class="variant-item__head"><strong>S10 · Sticky Scroll Showcase (4 pages)</strong><span class="badge badge--danger">✕ Micro-Type &amp; Scroll (73/100)</span></div>
            Has 7 micro-type rules (<code>7.5px</code>–<code>9.5px</code>), requires ~1,400px scroll, and clicking a <code>.case</code> card does nothing.
          </li>
        </ul>
      </div>

      <div class="slot-card">
        <h3><span>07 · Closing CTA (FIG 06)</span><span class="badge badge--teal">3 + Live</span></h3>
        <ul class="variant-list">
          <li class="variant-item">
            <div class="variant-item__head"><strong>C01 · Quiet Meridian (19 pages)</strong><span class="badge badge--success">★ Best Conversion (97/100)</span></div>
            Centered conversion statement over soft mint radial wash, 4-column bordered check bar, and <code>999px</code> pill buttons matching Header &amp; Hero.
          </li>
          <li class="variant-item">
            <div class="variant-item__head"><strong>C03 · Four-Point Orbit (2 pages)</strong><span class="badge badge--teal">Visual Diagram (91/100)</span></div>
            Keeps <code>999px</code> pill buttons, paired with a 460px SVG orbital compass diagram on the right.
          </li>
          <li class="variant-item">
            <div class="variant-item__head"><strong>C04 · Editorial Endnote (29 pages)</strong><span class="badge badge--amber">⚠ Scale &amp; Button Clash (84/100)</span></div>
            88px H2 (<code>-0.077em</code>) overpowers the 56px Hero H1 by 57%, and uses <strong>3px square stacked buttons</strong> that break the page’s 999px pill language.
          </li>
        </ul>
      </div>

      <div class="slot-card">
        <h3><span>08 · Global Footer</span><span class="badge badge--teal">3 + Live</span></h3>
        <ul class="variant-list">
          <li class="variant-item">
            <div class="variant-item__head"><strong>Ftr-P01 · Classic 3-Col Sitemap (25 pages)</strong><span class="badge badge--success">★ Best Architecture (98/100)</span></div>
            Clear <code>PRODUCT</code>, <code>COMPANY</code>, and <code>LEGAL</code> columns with 44px touch targets and full brand blurb.
          </li>
          <li class="variant-item">
            <div class="variant-item__head"><strong>Ftr-P04 · Floating Card Footer (19 pages)</strong><span class="badge badge--teal">Good Bookend (94/100)</span></div>
            Frames the 3-column sitemap inside a 24px-radius floating card; best when paired with <code>hdr-P04</code>.
          </li>
          <li class="variant-item">
            <div class="variant-item__head"><strong>Ftr-P05 · Minimalist Centered (6 pages)</strong><span class="badge badge--amber">Flat Hierarchy (88/100)</span></div>
            Collapses the 3-column sitemap into a single centered line of links; only non-fluid fragment (<code>fluid: false</code>).
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- SECTION 5: INTERACTIVE RANK LIST TABLE (#1 - #51) -->
  <section class="section" id="rank-table" style="border-bottom:0">
    <div class="section__head">
      <div>
        <p class="eyebrow" style="color:var(--teal)">INTERACTIVE EXPLORER · ALL ${totalCount} HOMEPAGES RANKED (50 TEMPLATES + LIVE NESTLANCER.COM)</p>
        <h2>Complete #1–#${totalCount} User Preference &amp; UI Review Rank List</h2>
        <p class="section__sub">Filter by any section slot, buyer persona, or tier (including the highlighted <strong>Live nestlancer.com</strong> row at <strong>#${liveEntry.userRank}</strong>). Click <strong>Inspect Audit</strong> on any row for full 10-dimension bars &amp; tool diagnostics, or <strong>Preview ▶</strong> to test the live page.</p>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn" type="button" onclick="compareLiveVsWinner()">Compare #1 vs Live nestlancer.com</button>
        <button class="btn" type="button" id="compareBtn" onclick="openCompareModal()">Compare Selected (0/2)</button>
        <button class="btn" type="button" onclick="resetFilters()">Reset Filters</button>
      </div>
    </div>

    <div class="toolbar">
      <div class="toolbar__row">
        <div class="field" style="min-width:200px;flex:2">
          <label for="fSearch">Search Combo / Note</label>
          <input id="fSearch" type="search" placeholder="e.g. nestlancer.com, H07, S02, CFO...">
        </div>
        <div class="field">
          <label for="fSort">Sort Order</label>
          <select id="fSort">
            <option value="userrank">User Preference Rank (#1 → #${totalCount})</option>
            <option value="comprank">Original Compositor Rank (#1 → #50)</option>
            <option value="rankdelta">Biggest Rank Climbers (+Δ)</option>
            <option value="founderceo">Persona: Startup Founder / CEO</option>
            <option value="designdirector">Persona: Design Director</option>
            <option value="ctoengineering">Persona: CTO / Engineering</option>
            <option value="cfofinance">Persona: CFO / Finance</option>
            <option value="d1_abovefold">Axis 1: Above-the-Fold Clarity</option>
            <option value="d2_portfolioux">Axis 2: Portfolio UX (FIG 05)</option>
            <option value="d3_typographyscale">Axis 3: Typography &amp; Scale</option>
            <option value="d4_conversionflow">Axis 4: Navigation &amp; Conversion</option>
            <option value="d5_financialtrust">Axis 5: Financial &amp; Delivery Trust</option>
            <option value="d6_seamcoherence">Axis 6: Surface &amp; Seam Coherence</option>
            <option value="d7_accessibility">Axis 7: Accessibility &amp; Semantics</option>
          </select>
        </div>
        <div class="field">
          <label for="fTier">Tier</label>
          <select id="fTier">
            <option value="">All Tiers (${totalCount})</option>
            <option value="Live Baseline">★ Live Website (nestlancer.com)</option>
            <option value="Tier S">Tier S · Top 8 Flagships</option>
            <option value="Tier A">Tier A · Ranks #9–#20</option>
            <option value="Tier B">Tier B · Ranks #21–#37</option>
            <option value="Tier C">Tier C · Ranks #38–#51</option>
          </select>
        </div>
        <div class="field">
          <label for="fPersona">Best Persona Fit</label>
          <select id="fPersona">
            <option value="">All Personas</option>
            <option value="Live Production">Live Website (nestlancer.com)</option>
            <option value="Startup Founders">Startup Founders &amp; CEOs</option>
            <option value="Design Directors">Design Directors &amp; Product</option>
            <option value="CTOs">CTOs &amp; Engineering</option>
            <option value="CFOs">CFOs &amp; Procurement</option>
          </select>
        </div>
      </div>

      <div class="toolbar__row">
        <div class="field"><label for="sHdr">Header</label><select id="sHdr"><option value="">All</option><option value="P01">P01 Classic (27)</option><option value="P04">P04 Pill (11)</option><option value="P02">P02 Glass (12)</option><option value="LIVE">LIVE nestlancer.com (1)</option></select></div>
        <div class="field"><label for="sHero">Hero</label><select id="sHero"><option value="">All</option><option value="H07">H07 Money-First (9)</option><option value="H01">H01 Ground Truth (8)</option><option value="H08">H08 Command Rail (22)</option><option value="H09">H09 Split Mirror (8)</option><option value="H03">H03 Ledger (3)</option><option value="LIVE">LIVE nestlancer.com (1)</option></select></div>
        <div class="field"><label for="sDel">Delivery</label><select id="sDel"><option value="">All</option><option value="D01">D01 Continuum (24)</option><option value="D03">D03 Bento (16)</option><option value="D10">D10 2×2 Stack (10)</option><option value="LIVE">LIVE nestlancer.com (1)</option></select></div>
        <div class="field"><label for="sFin">Financial</label><select id="sFin"><option value="">All</option><option value="M05">M05 Cashflow (35)</option><option value="M01">M01 Broadsheet (6)</option><option value="M04">M04 Terminal (9)</option><option value="LIVE">LIVE nestlancer.com (1)</option></select></div>
        <div class="field"><label for="sWhy">Why</label><select id="sWhy"><option value="">All</option><option value="W05">W05 6-Tile Bento (48)</option><option value="W04">W04 Dark Fold (2)</option><option value="LIVE">LIVE nestlancer.com (1)</option></select></div>
        <div class="field"><label for="sWork">Work</label><select id="sWork"><option value="">All</option><option value="S02">S02 Filter Grid (14)</option><option value="S01">S01 Case Grid (15)</option><option value="S03">S03 Split Viewer (17)</option><option value="S10">S10 Sticky Spy (4)</option><option value="LIVE">LIVE Marquee (1)</option></select></div>
        <div class="field"><label for="sCta">Closing CTA</label><select id="sCta"><option value="">All</option><option value="C01">C01 Meridian (19)</option><option value="C03">C03 Orbit (2)</option><option value="C04">C04 Endnote (29)</option><option value="LIVE">LIVE nestlancer.com (1)</option></select></div>
        <div class="field"><label for="sFtr">Footer</label><select id="sFtr"><option value="">All</option><option value="P01">Ftr-P01 Classic (25)</option><option value="P04">Ftr-P04 Card (19)</option><option value="P05">Ftr-P05 Centered (6)</option><option value="LIVE">LIVE nestlancer.com (1)</option></select></div>
      </div>

      <div class="toolbar__status">
        <span id="resultCount">Showing <strong>${totalCount}</strong> of ${totalCount} ranked homepages (50 templates + live nestlancer.com)</span>
        <span class="mono" style="font-size:11.5px;color:var(--muted)">Chip Legend: <span class="slot-chip slot-chip--best">★ Top UX Choice</span> <span class="slot-chip slot-chip--live">★ Live Site</span> <span class="slot-chip">Standard</span> <span class="slot-chip slot-chip--warn">⚠ Minor Friction</span> <span class="slot-chip slot-chip--bad">✕ UI Defect</span></span>
      </div>
    </div>

    <div class="table-wrap">
      <table class="rank-table" aria-label="Ranked top 50 homepage templates plus live nestlancer.com">
        <thead>
          <tr>
            <th>User Rank</th>
            <th>Comp. Rank</th>
            <th>Template Combination &amp; Slot Chips</th>
            <th>User Score</th>
            <th title="Startup Founder / CEO Score">Founder</th>
            <th title="Design Director Score">Design</th>
            <th title="CTO / Engineering Score">CTO</th>
            <th title="CFO / Finance Score">CFO</th>
            <th>Best Persona Fit &amp; Tier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="rankTbody">${rowsHtml}</tbody>
      </table>
    </div>
  </section>

</main>

<footer class="wrap page-foot">
  <div style="display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;border-top:1px solid var(--line);padding-top:24px">
    <span>© 2026 Nestlancer · Professional UI/UX Multi-Tool Audit of the Top 50 Composed Homepage Templates + Live nestlancer.com</span>
    <span><a href="${relPrefixToRoot}/docs/TOP50-UI-DESIGN-REVIEW-REPORT.md">Written Markdown Report</a> · <a href="${relPrefixToReview}/multi-tool-audit.json">Raw Audit JSON</a> · <a href="${relPrefixToReview}/top50.html">Original Compositor Top 50</a></span>
  </div>
</footer>

<!-- LIVE PREVIEW & SIDE-BY-SIDE COMPARISON MODAL -->
<div class="modal-backdrop" id="previewModal" hidden role="dialog" aria-modal="true" aria-labelledby="modalTitle">
  <div class="modal">
    <div class="modal__bar">
      <div class="modal__title" id="modalTitle">Live Page Preview</div>
      <div class="modal__controls">
        <button class="btn" type="button" onclick="setViewport('1440px')">1440px Desktop</button>
        <button class="btn" type="button" onclick="setViewport('1024px')">1024px Laptop</button>
        <button class="btn" type="button" onclick="setViewport('768px')">768px Tablet</button>
        <button class="btn" type="button" onclick="setViewport('390px')">390px Mobile</button>
        <button class="btn" type="button" onclick="toggleFrameTheme()">Toggle Frame Theme</button>
        <a class="btn btn--primary" id="modalOpenNew" href="${relPrefixToReview}/top50/hdr-P01__hero-H07__del-D01__fin-M05__why-W05__work-S02__cta-C01__ftr-P01/index.html" target="_blank" rel="noopener">Open in New Tab ↗</a>
        <button class="btn" type="button" onclick="closePreview()" style="border-color:var(--danger);color:var(--danger)">Close ✕</button>
      </div>
    </div>
    <div class="modal__viewport" id="modalViewport">
      <iframe class="modal__frame" id="previewFrame1" title="Homepage template preview"></iframe>
      <iframe class="modal__frame" id="previewFrame2" title="Comparison template preview" hidden></iframe>
    </div>
  </div>
</div>

<script>
(function(){
  var REL_REVIEW = ${JSON.stringify(relPrefixToReview)};
  var TOTAL_COUNT = ${totalCount};
  var compareSet = new Set();
  var frameTheme = document.documentElement.dataset.theme || 'light';

  var root = document.documentElement;
  var themeBtn = document.getElementById('themeBtn');
  function syncTheme() {
    var d = root.dataset.theme === 'dark';
    themeBtn.setAttribute('aria-pressed', String(d));
    themeBtn.textContent = d ? 'Light mode ↗' : 'Dark mode ↗';
  }
  themeBtn.addEventListener('click', function(){
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    frameTheme = root.dataset.theme;
    try { localStorage.setItem('nl-theme', root.dataset.theme); } catch(e) {}
    syncTheme();
  });
  syncTheme();

  var tbody = document.getElementById('rankTbody');
  var mainRows = Array.prototype.slice.call(tbody.querySelectorAll('tr.main-row'));

  function applyFilterAndSort() {
    var q = document.getElementById('fSearch').value.trim().toLowerCase();
    var sortKey = document.getElementById('fSort').value;
    var tier = document.getElementById('fTier').value;
    var persona = document.getElementById('fPersona').value;
    var slotFilters = {
      hdr: document.getElementById('sHdr').value,
      hero: document.getElementById('sHero').value,
      del: document.getElementById('sDel').value,
      fin: document.getElementById('sFin').value,
      why: document.getElementById('sWhy').value,
      work: document.getElementById('sWork').value,
      cta: document.getElementById('sCta').value,
      ftr: document.getElementById('sFtr').value
    };

    var visibleCount = 0;

    mainRows.sort(function(a, b) {
      var av = parseFloat(a.getAttribute('data-' + sortKey));
      var bv = parseFloat(b.getAttribute('data-' + sortKey));
      var au = parseFloat(a.getAttribute('data-userrank'));
      var bu = parseFloat(b.getAttribute('data-userrank'));
      if (sortKey === 'userrank' || sortKey === 'comprank') {
        return av - bv || au - bu;
      }
      return bv - av || au - bu;
    });

    mainRows.forEach(function(row) {
      var combo = row.getAttribute('data-combo');
      var detailRow = document.getElementById('detail-' + combo);
      var show = true;

      Object.keys(slotFilters).forEach(function(k) {
        if (slotFilters[k] && row.getAttribute('data-' + k) !== slotFilters[k]) {
          show = false;
        }
      });
      if (show && tier && row.getAttribute('data-tier').indexOf(tier) !== 0) {
        show = false;
      }
      if (show && persona && row.getAttribute('data-persona').indexOf(persona) === -1) {
        show = false;
      }
      if (show && q && row.getAttribute('data-search').indexOf(q) === -1) {
        show = false;
      }

      if (show) {
        row.removeAttribute('hidden');
        visibleCount++;
      } else {
        row.setAttribute('hidden', '');
        if (detailRow) detailRow.setAttribute('hidden', '');
      }

      tbody.appendChild(row);
      if (detailRow) tbody.appendChild(detailRow);
    });

    var countEl = document.getElementById('resultCount');
    countEl.textContent = 'Showing ' + visibleCount + ' of ' + TOTAL_COUNT + ' ranked homepages (50 templates + live nestlancer.com)';
  }

  ['fSearch', 'fSort', 'fTier', 'fPersona', 'sHdr', 'sHero', 'sDel', 'sFin', 'sWhy', 'sWork', 'sCta', 'sFtr'].forEach(function(id) {
    var el = document.getElementById(id);
    el.addEventListener('input', applyFilterAndSort);
    el.addEventListener('change', applyFilterAndSort);
  });

  window.resetFilters = function() {
    ['fSearch', 'fTier', 'fPersona', 'sHdr', 'sHero', 'sDel', 'sFin', 'sWhy', 'sWork', 'sCta', 'sFtr'].forEach(function(id) {
      document.getElementById(id).value = '';
    });
    document.getElementById('fSort').value = 'userrank';
    applyFilterAndSort();
  };

  window.toggleDetail = function(comboId, btn) {
    var row = document.getElementById('detail-' + comboId);
    if (!row) return;
    var isHidden = row.hasAttribute('hidden');
    if (isHidden) {
      row.removeAttribute('hidden');
      btn.textContent = 'Hide Audit ▴';
    } else {
      row.setAttribute('hidden', '');
      btn.textContent = 'Inspect Audit ▾';
    }
  };

  window.toggleCompare = function(comboId, cb) {
    if (cb.checked) {
      if (compareSet.size >= 2) {
        cb.checked = false;
        alert('You can compare up to 2 pages side-by-side at once.');
        return;
      }
      compareSet.add(comboId);
    } else {
      compareSet.delete(comboId);
    }
    var btn = document.getElementById('compareBtn');
    btn.textContent = 'Compare Selected (' + compareSet.size + '/2)';
    if (compareSet.size === 2) btn.classList.add('btn--primary');
    else btn.classList.remove('btn--primary');
  };

  function resolvePreviewUrl(comboId) {
    if (comboId === 'live-nestlancer-com') {
      return REL_REVIEW + '/live-nestlancer-preview.html';
    }
    return REL_REVIEW + '/top50/' + comboId + '/index.html?theme=' + frameTheme;
  }

  window.openPreview = function(comboId) {
    var row = document.getElementById('row-' + comboId);
    var modal = document.getElementById('previewModal');
    var f1 = document.getElementById('previewFrame1');
    var f2 = document.getElementById('previewFrame2');
    var url = resolvePreviewUrl(comboId);
    f2.setAttribute('hidden', '');
    f1.style.width = '1440px';
    f1.src = url;
    if (row) {
      document.getElementById('modalTitle').textContent = 'Rank #' + row.getAttribute('data-userrank') + ' (' + row.getAttribute('data-userscore') + '/100) — ' + row.getAttribute('data-label');
    } else {
      document.getElementById('modalTitle').textContent = comboId;
    }
    document.getElementById('modalOpenNew').href = url;
    modal.removeAttribute('hidden');
  };

  window.compareLiveVsWinner = function() {
    var c1 = 'hdr-P01__hero-H07__del-D01__fin-M05__why-W05__work-S02__cta-C01__ftr-P01';
    var c2 = 'live-nestlancer-com';
    var modal = document.getElementById('previewModal');
    var f1 = document.getElementById('previewFrame1');
    var f2 = document.getElementById('previewFrame2');
    f1.style.width = '50%';
    f2.style.width = '50%';
    f2.removeAttribute('hidden');
    f1.src = resolvePreviewUrl(c1);
    f2.src = resolvePreviewUrl(c2);
    document.getElementById('modalTitle').textContent = 'Compare: #1 Winner (P01·H07·D01·M05·W05·S02·C01·Ftr-P01 · 97.51) vs #36 Live nestlancer.com (86.40)';
    document.getElementById('modalOpenNew').href = resolvePreviewUrl(c1);
    modal.removeAttribute('hidden');
  };

  window.openCompareModal = function() {
    var items = Array.from(compareSet);
    var c1 = items[0] || 'hdr-P01__hero-H07__del-D01__fin-M05__why-W05__work-S02__cta-C01__ftr-P01';
    var c2 = items[1] || 'live-nestlancer-com';
    var r1 = document.getElementById('row-' + c1);
    var r2 = document.getElementById('row-' + c2);
    var modal = document.getElementById('previewModal');
    var f1 = document.getElementById('previewFrame1');
    var f2 = document.getElementById('previewFrame2');
    f1.style.width = '50%';
    f2.style.width = '50%';
    f2.removeAttribute('hidden');
    f1.src = resolvePreviewUrl(c1);
    f2.src = resolvePreviewUrl(c2);
    document.getElementById('modalTitle').textContent = 'Compare: #' + (r1 ? r1.getAttribute('data-userrank') : '1') + ' (' + (r1 ? r1.getAttribute('data-label') : c1) + ') vs #' + (r2 ? r2.getAttribute('data-userrank') : '36') + ' (' + (r2 ? r2.getAttribute('data-label') : c2) + ')';
    document.getElementById('modalOpenNew').href = resolvePreviewUrl(c1);
    modal.removeAttribute('hidden');
  };

  window.setViewport = function(w) {
    var f1 = document.getElementById('previewFrame1');
    var f2 = document.getElementById('previewFrame2');
    f1.style.width = w;
    if (!f2.hasAttribute('hidden')) f2.style.width = w;
  };

  window.toggleFrameTheme = function() {
    frameTheme = frameTheme === 'dark' ? 'light' : 'dark';
    ['previewFrame1', 'previewFrame2'].forEach(function(id) {
      var f = document.getElementById(id);
      if (f && f.src && !f.hasAttribute('hidden')) {
        f.src = f.src.replace(/([?&])theme=(light|dark)/, '$1theme=' + frameTheme);
      }
    });
  };

  window.closePreview = function() {
    var modal = document.getElementById('previewModal');
    modal.setAttribute('hidden', '');
    document.getElementById('previewFrame1').src = 'about:blank';
    document.getElementById('previewFrame2').src = 'about:blank';
  };
})();
</script>
</body>
</html>`;
}

function buildMarkdownReport() {
  const liveEntry = auditData.rankedPages.find((p) => p.isLiveSite);
  const lines = [];
  lines.push('# Nestlancer Top 50 Homepage Templates + Live `nestlancer.com` — Professional UI/UX & Design Review Report');
  lines.push('');
  lines.push('**Date:** 21 October 2026  ');
  lines.push('**Scope:** All 50 composed homepage templates in `homepage-compositor/review/top50/` **plus** the live production homepage at [`https://nestlancer.com/`](https://nestlancer.com/) (**51 homepages ranked in total**)  ');
  lines.push('**Interactive Deliverable:** [`rank list.html`](../rank%20list.html) · [`rank-list.html`](../rank-list.html) · [`homepage-compositor/review/rank-list.html`](../homepage-compositor/review/rank-list.html)  ');
  lines.push('**Raw Multi-Tool Telemetry:** [`homepage-compositor/review/multi-tool-audit.json`](../homepage-compositor/review/multi-tool-audit.json)');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 1. Executive Summary & Live `nestlancer.com` Benchmark');
  lines.push('');
  lines.push('We audited all **50 composed homepage templates** alongside the live production homepage at **[`https://nestlancer.com/`](https://nestlancer.com/)** (captured in `Nestlancer-public-screenshots/public/013-marketing-homepage.webp` and inspected live via DOM fetch) using our **7-tool UI/UX inspection suite**.');
  lines.push('');
  lines.push(`- **Where Live \`https://nestlancer.com/\` Ranks:** **Rank #${liveEntry.userRank} out of 51** with a User-Preference Score of **\`${liveEntry.userScore.toFixed(2)} / 100\`** (Compositor equivalent: \`39/45\`).`);
  lines.push(`- **35 Redesigned Templates Beat Live \`nestlancer.com\`:** Ranked **#1** (\`P01 · H07 · D01 · M05 · W05 · S02 · C01 · Ftr-P01\`, **97.51/100**) outscores the live website by **+11.11 points**, and **#2** (\`P01 · H01 · D01 · M05 · W05 · S02 · C01 · Ftr-P01\`, **96.85/100**) outscores the live website by **+10.45 points**.`);
  lines.push(`- **Live \`nestlancer.com\` Beats 15 Niche Composed Templates (#37–#51):** Including the automated compositor’s #1 pick (\`P04 · H08 · D03 · M04 · W05 · S03 · C04 · Ftr-P04\`, which lands at **#37** with **86.14/100**), because the live website keeps a visible desktop *Sign in* link, uses consistent \`999px\` pill buttons, and avoids the 88px CTA H2 scale inversion (\`C04\`) and 7.5px micro-type (\`S10\`).`);
  lines.push('');
  lines.push('### Top Champions & Live Production Baseline at a Glance');
  lines.push('');
  lines.push('| Award / Benchmark | User Rank (of 51) | User Score | Combo / Page Label | Key UI/UX Takeaway |');
  lines.push('|---|---:|---:|---|---|');
  const p1 = auditData.rankedPages[0];
  const p2 = auditData.rankedPages[1];
  const p3 = auditData.rankedPages[2];
  const p11 = auditData.rankedPages[10];
  lines.push(`| **#1 Overall & Startup Founder / CEO Favorite** | **#1** *(was #4)* | **${p1.userScore}/100** | \`${p1.label}\` | Full desktop+mobile nav parity (\`P01\`), immediate \`₹48,000\` fixed-price proof above the fold (\`H07\`), linear 4-step pipeline (\`D01\`), proportional cashflow bars (\`M05\`), 6-tile bento (\`W05\`), 1-click filterable 8-up portfolio grid (\`S02\`), and centered meridian CTA (\`C01\`). |`);
  lines.push(`| **#1 Design Director & Product Lead Favorite** | **#2** *(was #28)* | **${p2.userScore}/100** | \`${p2.label}\` | Pairs the canonical \`H01 Ground Truth\` balanced split hero (floating Project Hub window + mesh wash) with \`D01\`, \`M05\`, \`W05\`, \`S02\` filter grid, and \`C01\`. |`);
  lines.push(`| **#1 CFO & Finance / Procurement Favorite** | **#3** *(was #3)* | **${p3.userScore}/100** | \`${p3.label}\` | Combines \`H07\` Money-First hero + \`M05\` tabular INR cashflow staircase + \`S01\` indexed 4×2 case grid (\`01/08\`–\`08/08\`) + \`Ftr-P01\` complete legal & document-verification sitemap. |`);
  lines.push(`| **#1 CTO & Engineering Leader Favorite** | **#11** *(was #33)* | **${p11.userScore}/100** | \`${p11.label}\` | Features \`H08 Command Rail\` (vertical monospace telemetry rail + magnetic CTA) with \`D01\` pipeline states, \`W05\` gate logic, and \`S02\` stack-tagged filter grid. |`);
  lines.push(`| **Live Production Website (\`nestlancer.com\`)** | **#${liveEntry.userRank}** *(Baseline)* | **${liveEntry.userScore}/100** | \`${liveEntry.label}\` | Strong light-mode seam flow (93.5), heading scale (92.0), and desktop Sign-In parity (90.0), but held back by its moving horizontal portfolio marquee (76.0), 3 stacked Hero widgets (86.0), and 8-link nav bar. |`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 2. Deep-Dive Audit of Live `https://nestlancer.com/`');
  lines.push('');
  lines.push('| Dimension (Weight) | Live `nestlancer.com` Score | Rank #1 Redesign Score | Why Redesign #1 Wins / Where Live Site Stands |');
  lines.push('|---|---:|---:|---|');
  lines.push('| **1. Above-the-Fold Clarity (15%)** | `86.0` | `98.5` | Live site stacks 3 dark widgets (`project-hub` + `⌘K` + `nl status`) in the right column + top cookie bar + 8 nav links; `H07` focuses on one elevated Hub window with bold `₹48,000` count-up. |');
  lines.push('| **2. Portfolio UX — FIG 05 (15%)** | `76.0` | `99.0` | Live site uses a continuous horizontal marquee (`8×2 = 16` duplicate DOM cards, no category filter, and mislabels *Fintech Payments Hub* as `E-Commerce`); `S02` shows all 8 cards in a 4×2 grid with 1-click category filtering. |');
  lines.push('| **3. Typography & Scale Rhythm (12%)** | `92.0` | `95.0` | Live site has clean 56px H1 / 34–38px H2 hierarchy (beating `C04`’s 88px H2 inversion), though its H1 word `<span>`s lack trailing spaces in plain-text extraction. |');
  lines.push('| **4. Navigation & Conversion (12%)** | `90.0` | `99.0` | Live site keeps desktop *Sign in* visible (beating `P02`) and uses `999px` pill buttons (beating `C04`), but packs 8 links into the top nav bar. |');
  lines.push('| **5. Financial & Delivery Trust (12%)** | `88.5` | `99.0` | Live site has clear tabular ₹ rows, but `D01` (connected 68% rail) + `M05` (proportional animated cashflow bars) communicate milestone control much faster. |');
  lines.push('| **6. Surface & Seam Coherence (10%)** | `93.5` | `95.0` | Both maintain smooth light-mode mint/off-white transitions before the dark `#082330` footer. |');
  lines.push('| **7. Accessibility & Semantics (8%)** | `84.0` | `98.0` | Live site duplicates all 8 portfolio links twice in the DOM for the marquee and concatenates H1 words (`Shipwithclientsintheloop...`) in assistive text. |');
  lines.push('| **8. Motion Purpose (6%)** | `82.0` | `96.0` | Live site uses two continuous horizontal marquees; #1 uses purposeful, one-time mechanism reveals (`D01` rail, `M05` bars, `C01` axis). |');
  lines.push('| **9. Responsive Engineering (5%)** | `88.0` | `96.0` | 5-link `P01` header + `D01` 4-breakpoint grid adapt more cleanly between 768px and 1100px than the live 8-link nav. |');
  lines.push('| **10. DOM & Asset Hygiene (5%)** | `85.0` | `94.0` | Redesign templates inline all SVG/JPG concept renders locally with zero external S3 placeholders or duplicate marquee DOM nodes. |');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 3. Complete #1–#51 User Preference Rank List (50 Templates + Live `nestlancer.com`)');
  lines.push('');
  lines.push('| User Rank | Comp. Rank | Δ | Combo / Page Label | User Score | Comp. Score | Above Fold | Portfolio UX | Typo Scale | Conversion | Fin. Trust | Seam | A11y | Best Persona Fit |');
  lines.push('|---:|---:|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|');
  for (const r of auditData.rankedPages) {
    const compStr = r.isLiveSite ? 'LIVE' : `#${r.compositorRank}`;
    const deltaStr = r.isLiveSite ? 'BASELINE' : r.rankDelta > 0 ? `+${r.rankDelta}` : String(r.rankDelta);
    const d = r.dimensions;
    lines.push(
      `| **#${r.userRank}** | ${compStr} | ${deltaStr} | \`${r.label}\` | **${r.userScore.toFixed(2)}** | ${r.compositorScore}/45 | ${d.d1_aboveFold.toFixed(0)} | ${d.d2_portfolioUx.toFixed(0)} | ${d.d3_typographyScale.toFixed(0)} | ${d.d4_conversionFlow.toFixed(0)} | ${d.d5_financialTrust.toFixed(0)} | ${d.d6_seamCoherence.toFixed(0)} | ${d.d7_accessibility.toFixed(0)} | ${r.bestForPersona} |`
    );
  }
  lines.push('');
  return lines.join('\n');
}

// 0. Write `homepage-compositor/review/live-nestlancer-preview.html`
fs.writeFileSync(path.join(REVIEW_DIR, 'live-nestlancer-preview.html'), buildLivePreviewHtml(), 'utf8');

// 1. Write root `rank list.html` and `rank-list.html`
const rootHtml = buildHtml('homepage-compositor/review', 'assets', '.');
fs.writeFileSync(path.join(ROOT, 'rank list.html'), rootHtml, 'utf8');
fs.writeFileSync(path.join(ROOT, 'rank-list.html'), rootHtml, 'utf8');

// 2. Write `homepage-compositor/review/rank-list.html`
const reviewHtml = buildHtml('.', 'shared/assets', '../..');
fs.writeFileSync(path.join(REVIEW_DIR, 'rank-list.html'), reviewHtml, 'utf8');

// 3. Write `docs/TOP50-UI-DESIGN-REVIEW-REPORT.md`
const mdReport = buildMarkdownReport();
fs.writeFileSync(path.join(ROOT, 'docs/TOP50-UI-DESIGN-REVIEW-REPORT.md'), mdReport, 'utf8');

console.log('Generated:');
console.log('  - homepage-compositor/review/live-nestlancer-preview.html');
console.log('  - rank list.html');
console.log('  - rank-list.html');
console.log('  - homepage-compositor/review/rank-list.html');
console.log('  - docs/TOP50-UI-DESIGN-REVIEW-REPORT.md');
