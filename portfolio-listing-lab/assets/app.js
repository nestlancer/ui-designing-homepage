(() => {
  const data = window.NESTLANCER_DATA;
  const design = Number(document.body.dataset.design || 1);
  const designMeta = data.designs.find(item => item.id === design);
  const app = document.getElementById('app');
  const darkDesigns = [2, 5, 8, 9];
  const isDark = darkDesigns.includes(design);
  const projects = data.projects;
  const collection = data.collection;
  const allYears = 'All years';
  let activeCategory = 'All work';
  let activeYear = allYears;
  let revealObserver;
  let shellResizeObserver;
  let resizeFrame;
  const serpentineColsForViewport = () => {
    if (window.matchMedia('(max-width: 760px)').matches) return 1;
    if (window.matchMedia('(max-width: 960px)').matches) return 2;
    return 3;
  };
  let lastSerpentineCols = serpentineColsForViewport();

  // Newest year is open; the older years stay collapsed until asked for.
  const expandedYears = new Set([projects[0].year]);

  document.documentElement.classList.add('js');
  document.title = `${String(design).padStart(2, '0')} · ${designMeta.name} — Nestlancer Portfolio`;

  const categories = ['All work', ...new Set(projects.map(project => project.category))];
  const years = [...new Set(projects.map(project => project.year))].sort((a, b) => Number(b) - Number(a));
  const disciplines = categories.length - 1;
  const pad = value => String(value).padStart(2, '0');
  const categoryShort = project => project.categoryShort || project.category;
  const countForCategory = (category, year = allYears) => projects.filter(project =>
    (category === 'All work' || project.category === category) && (year === allYears || project.year === year)).length;
  const countForYear = (year, category = 'All work') => projects.filter(project =>
    (year === allYears || project.year === year) && (category === 'All work' || project.category === category)).length;
  const monthLabel = dateLabel => String(dateLabel).split(' ')[0].toUpperCase();
  const yearWord = value => ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][value] || String(value);
  const isYearOpen = year => activeYear !== allYears || expandedYears.has(year);

  function groupByYear(list) {
    return list.reduce((groups, project) => {
      let group = groups[groups.length - 1];
      if (!group || group.year !== project.year) {
        group = { year: project.year, items: [], months: [] };
        groups.push(group);
      }
      group.items.push(project);
      let month = group.months[group.months.length - 1];
      if (!month || month.key !== project.monthKey) {
        month = { key: project.monthKey, label: project.monthLabel, items: [] };
        group.months.push(month);
      }
      month.items.push(project);
      return groups;
    }, []);
  }

  function yearDivider(group) {
    const open = isYearOpen(group.year);
    const interactive = activeYear === allYears;
    const count = group.items.length;
    const months = group.months.length;
    const disciplinesInYear = [...new Set(group.items.map(categoryShort))];
    return `<button type="button" class="year-divider ${open ? 'is-open' : ''}" data-year-toggle="${group.year}" aria-expanded="${open}" aria-controls="year-panel-${group.year}" ${interactive ? '' : 'disabled'}>
      <span class="year-divider-year">${group.year}</span>
      <span class="year-divider-line" aria-hidden="true"></span>
      <span class="year-divider-meta">${pad(count)} case studies · ${pad(months)} months · ${disciplinesInYear.join(' / ')}</span>
      <span class="year-divider-toggle" aria-hidden="true"><i></i>${open ? 'Hide' : 'Show'}</span>
    </button>`;
  }

  function monthDivider(month) {
    const count = month.items.length;
    return `<div class="month-divider" role="presentation">
      <span class="month-divider-name">${month.label}</span>
      <span class="month-divider-count">${pad(count)}</span>
      <span class="month-divider-line" aria-hidden="true"></span>
    </div>`;
  }

  function logo() {
    return `<img src="assets/brand/logo-full-${isDark ? 'dark' : 'light'}.svg" alt="Nestlancer" width="154" height="43">`;
  }

  function header() {
    return `<a class="skip-link" href="#work">Skip to portfolio archive</a>
    <header class="site-header">
      <a class="brand" href="https://app.nestlancer.com" aria-label="Nestlancer home">${logo()}</a>
      <nav class="main-nav" aria-label="Production navigation">
        <a href="https://nestlancer.com/#how-it-works">Product</a>
        <a class="is-current" href="https://app.nestlancer.com/portfolio" aria-current="page">Portfolio</a>
        <a href="https://nestlancer.com/services">Services</a>
        <a href="https://nestlancer.com/about">About</a>
      </nav>
      <div class="header-actions">
        <a class="sign-in" href="https://app.nestlancer.com/login?from=%2Fportfolio">Sign in</a>
        <a class="header-cta" href="${data.register}">Start a project <span aria-hidden="true">↗</span></a>
        <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open navigation menu">
          <span></span><span></span>
        </button>
      </div>
      <div class="mobile-nav" id="mobile-nav" hidden>
        <nav aria-label="Mobile navigation">
          <a href="https://nestlancer.com/#how-it-works">Product</a>
          <a class="is-current" href="https://app.nestlancer.com/portfolio" aria-current="page">Portfolio</a>
          <a href="https://nestlancer.com/services">Services</a>
          <a href="https://nestlancer.com/about">About</a>
          <a href="https://app.nestlancer.com/blog">Blog</a>
          <a href="https://nestlancer.com/pricing">Pricing</a>
          <a href="${data.contact}">Contact</a>
        </nav>
        <div class="mobile-nav-actions">
          <a class="mobile-sign-in" href="https://app.nestlancer.com/login?from=%2Fportfolio">Sign in</a>
          <a class="button button-primary" href="${data.register}">Start a project <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </header>`;
  }

  function hero() {
    const latest = projects[0];
    const stats = categories
      .filter(category => category !== 'All work')
      .map(category => ({
        label: categoryShort(projects.find(project => project.category === category)),
        count: countForCategory(category)
      }));
    return `<section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span>FIG · WORK</span><i></i>Selected case studies</p>
        <h1 id="hero-title">Selected <em>work<span class="hero-dot">.</span></em></h1>
        <p class="hero-lede">${yearWord(collection.years).replace(/^./, character => character.toUpperCase())} years of shipped product, in sequence — the product language, the stack, and the outcome. The archive runs newest first, ${collection.perMonth} case studies per month.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#work">Explore the work <span aria-hidden="true">↓</span></a>
          <a class="button button-secondary" href="${data.contact}">Start a project <span aria-hidden="true">↗</span></a>
        </div>
        <div class="hero-proof"><span><strong>${pad(projects.length)}</strong> projects</span><i></i><span><strong>${pad(disciplines)}</strong> disciplines</span><i></i><span><strong>${collection.short}</strong> archive</span></div>
      </div>
      <aside class="hero-panel" aria-label="Portfolio summary">
        <div class="panel-topline"><span>PORTFOLIO / ${collection.label}</span><span class="panel-status"><i></i>Published</span></div>
        <div class="panel-count"><strong>${pad(projects.length)}</strong><span>selected<br>projects</span></div>
        <a class="panel-preview" href="${latest.href}">
          <img src="${latest.image}" alt="${latest.title} project thumbnail" width="1600" height="900">
          <span class="panel-preview-copy"><small>Latest release / ${latest.dateLabel}</small><strong>${latest.title}</strong></span>
        </a>
        <div class="panel-stats">${stats.map(stat => `<span><strong>${pad(stat.count)}</strong>${stat.label}</span>`).join('')}</div>
        <span class="panel-watermark" aria-hidden="true">NESTLANCER®</span>
      </aside>
    </section>`;
  }

  function projectCard(project, index, colSide = '') {
    const number = projects.indexOf(project) + 1;
    const colAttr = colSide ? ` data-col="${colSide}"` : '';
    return `<article class="project-card ${project.featured ? 'is-featured' : ''}" data-category="${project.category}" data-year="${project.year}"${colAttr} style="--order:${index};--stagger:${index % 3};--project-number:'${pad(number)}'">
      <span class="project-node" aria-hidden="true"><i></i><b>${pad(number)}</b></span>
      <a class="project-image" href="${project.href}" aria-label="View ${project.title} case study">
        <img src="${project.image}" alt="${project.title} project thumbnail" width="1600" height="900" loading="${index < 3 ? 'eager' : 'lazy'}">
        <span class="image-action" aria-hidden="true">View case <b>↗</b></span>
        ${project.featured ? '<span class="featured-badge">Featured</span>' : ''}
      </a>
      <div class="project-body">
        <div class="project-meta"><span>${pad(number)} / ${project.dateLabel}</span><span>${project.year}</span></div>
        <p class="project-category">${project.category}</p>
        <h3>${project.title}</h3>
        <p class="project-summary">${project.summary}</p>
        <ul class="project-tags" aria-label="Technologies">${project.technologies.map(tech => `<li>${tech}</li>`).join('')}</ul>
        <a class="project-link" href="${project.href}">View case study <span aria-hidden="true">→</span></a>
      </div>
    </article>`;
  }

  function filterButton(category) {
    return `<button type="button" class="filter-button ${category === activeCategory ? 'is-active' : ''}" data-filter="${category}" aria-pressed="${category === activeCategory}">${category}<span>${pad(countForCategory(category))}</span></button>`;
  }

  function yearButton(year) {
    return `<button type="button" class="filter-button filter-button-year ${year === activeYear ? 'is-active' : ''}" data-year="${year}" aria-pressed="${year === activeYear}">${year === allYears ? 'All' : year}<span>${pad(countForYear(year))}</span></button>`;
  }

  function workSection() {
    return `<section class="work-section" id="work" aria-labelledby="work-title">
      <div class="section-heading">
        <div><p class="section-kicker">FIG · ARCHIVE</p><h2 id="work-title">Project timeline</h2><p>${projects.length} case studies across ${collection.label} — ${collection.perMonth} per month, newest first. ${years[0]} is open; open an older year or filter by discipline to narrow the archive.</p></div>
        <div class="heading-side">
          <span class="collection-stamp">${collection.label}<br>NESTLANCER®</span>
          <button type="button" class="archive-toggle" data-toggle-all aria-pressed="false">Expand all years</button>
        </div>
      </div>
      <div class="filter-bar">
        <div class="filter-groups">
          <div class="filters" role="group" aria-label="Filter projects by discipline">
            ${categories.map(filterButton).join('')}
          </div>
          <div class="filters filters-years" role="group" aria-label="Filter projects by year">
            <span class="filter-group-label" aria-hidden="true">Year</span>
            ${[allYears, ...years].map(yearButton).join('')}
          </div>
        </div>
        <span class="result-count" id="result-count" aria-live="polite"></span>
      </div>
      <div id="timeline-mount"></div>
    </section>`;
  }

  function closing() {
    return `<section class="project-cta">
      <div><p class="section-kicker">NEXT / YOUR PRODUCT</p><h2>Want work <em>like this?</em></h2></div>
      <div><p>Tell us about the product. We will come back with a scoped studio quote.</p><a class="button button-primary" href="${data.contact}">Start a project <span aria-hidden="true">↗</span></a></div>
    </section>`;
  }

  function footer() {
    return `<footer class="site-footer">
      <a class="footer-brand" href="https://app.nestlancer.com">${logo()}</a>
      <p>A dedicated product studio.<br>Design, engineering, and delivery in one workspace.</p>
      <nav aria-label="Footer navigation"><a href="https://app.nestlancer.com/blog">Blog</a><a href="https://nestlancer.com/pricing">Pricing</a><a href="${data.contact}">Contact</a><a href="https://app.nestlancer.com/privacy">Privacy</a></nav>
      <small>© 2026 Nestlancer. Made in India.</small>
    </footer>`;
  }

  function designDock() {
    const previous = design === 1 ? 10 : design - 1;
    const next = design === 10 ? 1 : design + 1;
    return `<nav class="design-dock" aria-label="Browse ten redesign concepts">
      <a class="dock-index" href="index.html" title="Compare all ten designs" aria-label="Compare all ten designs"><span></span><span></span><span></span><span></span><b>All 10</b></a>
      <a class="dock-arrow" href="design-${pad(previous)}.html" aria-label="Previous design: ${data.designs[previous - 1].name}">←</a>
      <div class="dock-label"><small>DESIGN ${pad(design)} / 10</small><strong>${designMeta.name}</strong></div>
      <a class="dock-arrow" href="design-${pad(next)}.html" aria-label="Next design: ${data.designs[next - 1].name}">→</a>
    </nav>`;
  }

  app.innerHTML = `${header()}<main>${hero()}${workSection()}${closing()}</main>${footer()}${designDock()}`;

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  function setMobileMenu(open) {
    if (!navToggle || !mobileNav) return;
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    mobileNav.hidden = !open;
  }
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      setMobileMenu(!isOpen);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setMobileMenu(false);
        navToggle.focus();
      }
    });
  }

  function filteredProjects() {
    return projects.filter(project =>
      (activeCategory === 'All work' || project.category === activeCategory) &&
      (activeYear === allYears || project.year === activeYear)
    );
  }

  function serpentineLayout(list) {
    const groups = groupByYear(list);
    const indexOf = new Map(list.map((project, index) => [project, index]));
    const cols = serpentineColsForViewport();
    let rowIndex = 0;
    const panels = groups.map(group => {
      const open = isYearOpen(group.year);
      let inner = '';
      if (open) {
        inner = group.months.map(month => {
          const rows = [];
          for (let index = 0; index < month.items.length; index += cols) {
            rows.push(month.items.slice(index, index + cols));
          }
          const rowMarkup = rows.map(items => {
            const rowClass = `serpentine-row ${rowIndex % 2 ? 'is-reverse' : ''}`;
            rowIndex += 1;
            return `<div class="${rowClass}" data-year="${group.year}" data-month="${month.key}" style="--serp-cols:${cols}">${items.map(project => projectCard(project, indexOf.get(project))).join('')}</div>`;
          }).join('');
          return `${monthDivider(month)}${rowMarkup}`;
        }).join('');
      }
      return `${yearDivider(group)}<div class="year-panel" id="year-panel-${group.year}" role="group" aria-label="${group.year} case studies"${open ? '' : ' hidden'}>${inner}</div>`;
    }).join('');
    const latest = list[0] || projects[0];
    const earliest = list[list.length - 1] || projects[projects.length - 1];
    return `<div class="serpentine-shell">
      <svg class="route-svg" id="route-svg" aria-hidden="true" preserveAspectRatio="none"><path class="route-underlay" id="route-underlay"></path><path class="route-path" id="route-path"></path></svg>
      <div class="serpentine-origin" aria-hidden="true">
        <div class="year-marker"><small>START</small><strong>${latest.year}</strong><span>${monthLabel(latest.dateLabel)} ${latest.year}</span></div>
      </div>
      <div class="serpentine-rows">${panels}</div>
      <div class="serpentine-finish" aria-hidden="true">
        <div class="finish-marker"><small>END</small><strong>${earliest.year}</strong></div>
      </div>
    </div>`;
  }

  function flowGradientStops() {
    if (design === 4) {
      return `<stop offset="0%" stop-color="#6c3cff"></stop>
        <stop offset="28%" stop-color="#ff6b5b"></stop>
        <stop offset="56%" stop-color="#7bc618"></stop>
        <stop offset="82%" stop-color="#1496b8"></stop>
        <stop offset="100%" stop-color="#6c3cff"></stop>`;
    }
    return `<stop offset="0%" stop-color="var(--accent)"></stop>
      <stop offset="52%" stop-color="var(--accent-2)"></stop>
      <stop offset="100%" stop-color="var(--accent)"></stop>`;
  }

  function flowLayout(list) {
    const groups = groupByYear(list);
    const indexOf = new Map(list.map((project, index) => [project, index]));
    const latest = list[0] || projects[0];
    const earliest = list[list.length - 1] || projects[projects.length - 1];
    const panels = groups.map(group => {
      const open = isYearOpen(group.year);
      let yearCardIndex = 0;
      const inner = open
        ? group.months.map(month => {
          const cardsMarkup = month.items.map((project, idxInMonth) => {
            const colSide = design === 5
              ? (idxInMonth % 2 === 0 ? 'left' : 'right')
              : (yearCardIndex % 2 === 0 ? 'left' : 'right');
            yearCardIndex += 1;
            return projectCard(project, indexOf.get(project), colSide);
          }).join('');
          return `${monthDivider(month)}${cardsMarkup}`;
        }).join('')
        : '';
      return `${yearDivider(group)}<div class="year-panel" id="year-panel-${group.year}" role="group" aria-label="${group.year} case studies"${open ? '' : ' hidden'}>${inner}</div>`;
    }).join('');
    return `<div class="flow-shell" data-flow-design="${design}">
      <svg class="route-svg flow-route" id="route-svg" aria-hidden="true" preserveAspectRatio="none">
        <defs><linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">${flowGradientStops()}</linearGradient></defs>
        <path class="flow-underlay" id="route-underlay"></path><path class="flow-line" id="route-path"></path>
      </svg>
      <div class="flow-origin"><span><b>${latest.year}</b><small>LATEST / ${pad(list.length)}</small></span></div>
      <div class="flow-projects">${panels}</div>
      <div class="flow-finish"><span><b>${earliest.year}</b><small>ARCHIVE / END</small></span></div>
    </div>`;
  }

  function emptyState() {
    return `<div class="timeline-empty">
      <p class="section-kicker">NO MATCH</p>
      <strong>No case studies in this combination.</strong>
      <p>Nothing was published for ${activeCategory === 'All work' ? 'this discipline' : activeCategory} in ${activeYear}. Try another year or reset the filters.</p>
      <button type="button" class="filter-reset" data-reset>Reset filters</button>
    </div>`;
  }

  function syncToolbar(list) {
    const toggleAll = document.querySelector('[data-toggle-all]');
    if (!toggleAll) return;
    const visibleYears = years.filter(year => list.some(project => project.year === year));
    const allOpen = visibleYears.length > 0 && visibleYears.every(year => expandedYears.has(year));
    toggleAll.textContent = allOpen ? 'Collapse all years' : 'Expand all years';
    toggleAll.setAttribute('aria-pressed', String(allOpen));
    toggleAll.disabled = activeYear !== allYears;
  }

  function wireMediaAndResize(mount) {
    if (shellResizeObserver) shellResizeObserver.disconnect();
    const shell = mount.querySelector('.serpentine-shell, .flow-shell');
    if (shell && 'ResizeObserver' in window) {
      shellResizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(drawRoute);
      });
      shellResizeObserver.observe(shell);
    }
    mount.querySelectorAll('.project-image img').forEach(img => {
      img.addEventListener('load', () => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(drawRoute);
      }, { once: true });
      img.addEventListener('error', () => {
        const frame = img.closest('.project-image');
        if (frame) frame.classList.add('is-image-error');
      }, { once: true });
    });
  }

  function renderTimeline(options = {}) {
    lastSerpentineCols = serpentineColsForViewport();
    const list = filteredProjects();
    const mount = document.getElementById('timeline-mount');
    mount.innerHTML = list.length ? (design === 1 ? serpentineLayout(list) : flowLayout(list)) : emptyState();
    const scope = activeYear === allYears ? collection.short : activeYear;
    const openCount = list.filter(project => isYearOpen(project.year)).length;
    const counter = document.getElementById('result-count');
    counter.textContent = openCount === list.length
      ? `${pad(list.length)} case ${list.length === 1 ? 'study' : 'studies'} · ${scope}`
      : `${pad(openCount)} of ${pad(list.length)} open · ${scope}`;
    mount.querySelectorAll('[data-year-toggle]').forEach(button => {
      button.addEventListener('click', () => {
        const year = button.dataset.yearToggle;
        if (expandedYears.has(year)) expandedYears.delete(year);
        else expandedYears.add(year);
        renderTimeline({ focusYear: year });
      });
    });
    const reset = mount.querySelector('[data-reset]');
    if (reset) reset.addEventListener('click', () => {
      activeCategory = 'All work';
      activeYear = allYears;
      expandedYears.clear();
      expandedYears.add(years[0]);
      syncFilters();
      renderTimeline();
    });
    syncToolbar(list);
    observeReveals();
    wireMediaAndResize(mount);
    if (options.focusYear) {
      const button = mount.querySelector(`[data-year-toggle="${options.focusYear}"]`);
      if (button) button.focus({ preventScroll: true });
    }
    requestAnimationFrame(drawRoute);
  }

  function syncFilters() {
    document.querySelectorAll('.filter-button[data-filter]').forEach(button => {
      const active = button.dataset.filter === activeCategory;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
      const count = countForCategory(button.dataset.filter, activeYear);
      button.querySelector('span').textContent = pad(count);
      button.classList.toggle('is-empty', count === 0);
    });
    document.querySelectorAll('.filter-button[data-year]').forEach(button => {
      const active = button.dataset.year === activeYear;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
      const count = countForYear(button.dataset.year, activeCategory);
      button.querySelector('span').textContent = pad(count);
      button.classList.toggle('is-empty', count === 0);
    });
  }

  function observeReveals() {
    if (revealObserver) revealObserver.disconnect();
    const cards = document.querySelectorAll('.project-card');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      cards.forEach(card => card.classList.add('is-visible'));
      return;
    }
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    cards.forEach(card => revealObserver.observe(card));
  }

  function pointFor(element, rect) {
    const box = element.getBoundingClientRect();
    return { x: box.left - rect.left + box.width / 2, y: box.top - rect.top + box.height / 2 };
  }

  function drawSerpentineRoute() {
    if (window.matchMedia('(max-width: 760px)').matches) return;
    const shell = document.querySelector('.serpentine-shell');
    if (!shell) return;
    const marker = shell.querySelector('.year-marker');
    const finish = shell.querySelector('.finish-marker');
    const nodes = [...shell.querySelectorAll('.project-node')];
    if (!marker || !nodes.length) return;
    const rect = shell.getBoundingClientRect();
    const width = shell.clientWidth;
    const height = shell.scrollHeight;
    const startPt = pointFor(marker, rect);
    const nodePts = nodes.map(node => pointFor(node, rect));
    const leftEdge = 18;
    const rightEdge = Math.max(leftEdge + 40, width - 18);

    // Connect START marker smoothly into the left margin and horizontally into Node 01
    const first = nodePts[0];
    const startRadius = Math.min(22, Math.max(8, (first.y - startPt.y) / 3));
    let path = `M ${startPt.x.toFixed(2)} ${startPt.y.toFixed(2)}`;
    if (first.y > startPt.y + 8) {
      const midStartY = startPt.y + Math.min(48, (first.y - startPt.y) * 0.45);
      path += ` L ${startPt.x.toFixed(2)} ${(midStartY - startRadius).toFixed(2)}`;
      path += ` Q ${startPt.x.toFixed(2)} ${midStartY.toFixed(2)} ${Math.max(leftEdge, startPt.x - startRadius).toFixed(2)} ${midStartY.toFixed(2)}`;
      path += ` L ${(leftEdge + startRadius).toFixed(2)} ${midStartY.toFixed(2)}`;
      path += ` Q ${leftEdge.toFixed(2)} ${midStartY.toFixed(2)} ${leftEdge.toFixed(2)} ${(midStartY + startRadius).toFixed(2)}`;
      path += ` L ${leftEdge.toFixed(2)} ${(first.y - startRadius).toFixed(2)}`;
      path += ` Q ${leftEdge.toFixed(2)} ${first.y.toFixed(2)} ${(leftEdge + startRadius).toFixed(2)} ${first.y.toFixed(2)}`;
      path += ` L ${first.x.toFixed(2)} ${first.y.toFixed(2)}`;
    } else {
      path += ` L ${first.x.toFixed(2)} ${first.y.toFixed(2)}`;
    }

    // Connect all nodes row-by-row; U-turns happen strictly in the outer left/right gutter
    for (let index = 1; index < nodePts.length; index += 1) {
      const previous = nodePts[index - 1];
      const current = nodePts[index];
      if (Math.abs(current.y - previous.y) < 6) {
        path += ` L ${current.x.toFixed(2)} ${current.y.toFixed(2)}`;
      } else {
        const prevRow = nodes[index - 1].closest('.serpentine-row');
        const turnRight = prevRow ? !prevRow.classList.contains('is-reverse') : ((previous.x + current.x) / 2 > width / 2);
        const edge = turnRight ? rightEdge : leftEdge;
        const r = Math.min(24, Math.max(8, Math.abs(current.y - previous.y) / 3));
        const innerPrev = turnRight ? Math.min(edge - r, Math.max(previous.x, edge - r)) : Math.max(edge + r, Math.min(previous.x, edge + r));
        const innerCurr = turnRight ? Math.min(edge - r, Math.max(current.x, edge - r)) : Math.max(edge + r, Math.min(current.x, edge + r));
        path += ` L ${innerPrev.toFixed(2)} ${previous.y.toFixed(2)}`;
        path += ` Q ${edge.toFixed(2)} ${previous.y.toFixed(2)} ${edge.toFixed(2)} ${(previous.y + r).toFixed(2)}`;
        path += ` L ${edge.toFixed(2)} ${(current.y - r).toFixed(2)}`;
        path += ` Q ${edge.toFixed(2)} ${current.y.toFixed(2)} ${innerCurr.toFixed(2)} ${current.y.toFixed(2)}`;
        path += ` L ${current.x.toFixed(2)} ${current.y.toFixed(2)}`;
      }
    }

    // Connect final node smoothly into END marker
    if (finish) {
      const endPt = pointFor(finish, rect);
      const last = nodePts[nodePts.length - 1];
      const lastRow = nodes[nodes.length - 1].closest('.serpentine-row');
      const exitRight = lastRow ? !lastRow.classList.contains('is-reverse') : (last.x > width / 2);
      const edge = exitRight ? rightEdge : leftEdge;
      const r = Math.min(22, Math.max(8, Math.abs(endPt.y - last.y) / 3));
      const innerLast = exitRight ? edge - r : edge + r;
      if (endPt.y > last.y + 12) {
        path += ` L ${innerLast.toFixed(2)} ${last.y.toFixed(2)}`;
        path += ` Q ${edge.toFixed(2)} ${last.y.toFixed(2)} ${edge.toFixed(2)} ${(last.y + r).toFixed(2)}`;
        path += ` L ${edge.toFixed(2)} ${(endPt.y - r).toFixed(2)}`;
        path += ` Q ${edge.toFixed(2)} ${endPt.y.toFixed(2)} ${(exitRight ? edge - r : edge + r).toFixed(2)} ${endPt.y.toFixed(2)}`;
        path += ` L ${endPt.x.toFixed(2)} ${endPt.y.toFixed(2)}`;
      } else {
        path += ` L ${endPt.x.toFixed(2)} ${endPt.y.toFixed(2)}`;
      }
    }

    const svg = document.getElementById('route-svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    document.getElementById('route-path').setAttribute('d', path);
    document.getElementById('route-underlay').setAttribute('d', path);
  }

  function smoothFlowPath(rawPoints, bend, shellWidth) {
    if (rawPoints.length < 2) return '';
    const clampX = x => Math.max(10, Math.min(shellWidth - 10, x));
    const points = [rawPoints[0]];
    for (let index = 1; index < rawPoints.length; index += 1) {
      const previous = rawPoints[index - 1];
      const current = rawPoints[index];
      const distance = Math.hypot(current.x - previous.x, current.y - previous.y);
      const direction = index % 2 === 1 ? 1 : -1;
      const offset = Math.min(bend, Math.max(24, distance * .18));
      points.push({
        x: clampX((previous.x + current.x) / 2 + direction * offset),
        y: (previous.y + current.y) / 2
      });
      points.push(current);
    }

    let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
    const tension = .82;
    for (let index = 0; index < points.length - 1; index += 1) {
      const p0 = points[index - 1] || points[index];
      const p1 = points[index];
      const p2 = points[index + 1];
      const p3 = points[index + 2] || p2;
      const cp1x = clampX(p1.x + ((p2.x - p0.x) / 6) * tension);
      const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;
      const cp2x = clampX(p2.x - ((p3.x - p1.x) / 6) * tension);
      const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;
      path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
    }
    return path;
  }

  function outerFlowPath(rawPoints, bulge, shellWidth) {
    if (rawPoints.length < 2) return '';
    const clampX = x => Math.max(12, Math.min(shellWidth - 12, x));
    const offset = Math.min(130, bulge);
    let path = `M ${rawPoints[0].x.toFixed(2)} ${rawPoints[0].y.toFixed(2)}`;
    for (let index = 1; index < rawPoints.length; index += 1) {
      const previous = rawPoints[index - 1];
      const current = rawPoints[index];
      const deltaX = current.x - previous.x;
      const direction = Math.abs(deltaX) < 30 ? (index % 2 === 1 ? 1 : -1) : Math.sign(deltaX);
      const middleX = clampX((previous.x + current.x) / 2);
      const middleY = (previous.y + current.y) / 2;
      const previousOutsideX = clampX(previous.x - direction * offset);
      const currentOutsideX = clampX(current.x + direction * offset);
      path += ` C ${previousOutsideX.toFixed(2)} ${previous.y.toFixed(2)}, ${previousOutsideX.toFixed(2)} ${middleY.toFixed(2)}, ${middleX.toFixed(2)} ${middleY.toFixed(2)}`;
      path += ` C ${currentOutsideX.toFixed(2)} ${middleY.toFixed(2)}, ${currentOutsideX.toFixed(2)} ${current.y.toFixed(2)}, ${current.x.toFixed(2)} ${current.y.toFixed(2)}`;
    }
    return path;
  }

  function drawFlowRoute() {
    const shell = document.querySelector('.flow-shell');
    if (!shell) return;
    const rect = shell.getBoundingClientRect();
    const origin = shell.querySelector('.flow-origin span');
    const finish = shell.querySelector('.flow-finish span');
    const nodes = [...shell.querySelectorAll('.project-node')];
    if (!origin || !finish || !nodes.length) return;
    const rawPoints = [origin, ...nodes, finish].map(element => pointFor(element, rect));
    const width = shell.clientWidth;
    const height = shell.scrollHeight;
    const mobile = window.matchMedia('(max-width: 760px)').matches;
    const bend = mobile ? Math.min(18, width * .04) : Math.min(140, Math.max(68, width * .095));
    const outerDesigns = [3, 4, 7, 9, 10];
    const path = !mobile && outerDesigns.includes(design)
      ? outerFlowPath(rawPoints, Math.min(180, width * .15), width)
      : smoothFlowPath(rawPoints, bend, width);
    const svg = document.getElementById('route-svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    document.getElementById('route-path').setAttribute('d', path);
    document.getElementById('route-underlay').setAttribute('d', path);
  }

  function drawRoute() {
    if (design === 1) drawSerpentineRoute();
    else drawFlowRoute();
  }

  const toggleAllButton = document.querySelector('[data-toggle-all]');
  if (toggleAllButton) toggleAllButton.addEventListener('click', () => {
    const list = filteredProjects();
    const visibleYears = years.filter(year => list.some(project => project.year === year));
    const allOpen = visibleYears.every(year => expandedYears.has(year));
    expandedYears.clear();
    // Never leave the archive empty: collapsing falls back to the newest year.
    if (!allOpen) visibleYears.forEach(year => expandedYears.add(year));
    else if (visibleYears.length) expandedYears.add(visibleYears[0]);
    renderTimeline();
  });

  document.querySelectorAll('.filter-button[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.filter;
      syncFilters();
      renderTimeline();
    });
  });

  document.querySelectorAll('.filter-button[data-year]').forEach(button => {
    button.addEventListener('click', () => {
      activeYear = button.dataset.year;
      syncFilters();
      renderTimeline();
    });
  });

  window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width: 860px)').matches) {
      setMobileMenu(false);
    }
    if (design === 1) {
      const nextCols = serpentineColsForViewport();
      if (nextCols !== lastSerpentineCols) {
        renderTimeline();
        return;
      }
    }
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(drawRoute);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawRoute);

  renderTimeline();
})();
