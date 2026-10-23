(() => {
  const data = window.NESTLANCER_DATA;
  const design = Number(document.body.dataset.design || 1);
  const designMeta = data.designs.find(item => item.id === design);
  const app = document.getElementById('app');
  const darkDesigns = [2, 5, 8, 9];
  const isDark = darkDesigns.includes(design);
  let activeCategory = 'All work';
  let revealObserver;
  let resizeFrame;

  document.documentElement.classList.add('js');
  document.title = `${String(design).padStart(2, '0')} · ${designMeta.name} — Nestlancer Portfolio`;

  const categories = ['All work', ...new Set(data.projects.map(project => project.category))];
  const pad = value => String(value).padStart(2, '0');
  const categoryClass = category => category.toLowerCase().replace(/[^a-z]+/g, '-').replace(/-$/, '');
  const countForCategory = category => category === 'All work' ? data.projects.length : data.projects.filter(project => project.category === category).length;

  function logo() {
    return `<img src="assets/brand/logo-full-${isDark ? 'dark' : 'light'}.svg" alt="Nestlancer" width="154" height="43">`;
  }

  function header() {
    return `<header class="site-header">
      <a class="brand" href="https://app.nestlancer.com" aria-label="Nestlancer home">${logo()}</a>
      <nav class="main-nav" aria-label="Production navigation">
        <a href="https://nestlancer.com/#how-it-works">Product</a>
        <a class="is-current" href="https://app.nestlancer.com/portfolio">Portfolio</a>
        <a href="https://nestlancer.com/services">Services</a>
        <a href="https://nestlancer.com/about">About</a>
      </nav>
      <div class="header-actions">
        <a class="sign-in" href="https://app.nestlancer.com/login?from=%2Fportfolio">Sign in</a>
        <a class="header-cta" href="${data.register}">Start a project <span aria-hidden="true">↗</span></a>
      </div>
    </header>`;
  }

  function hero() {
    const latest = data.projects[0];
    return `<section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span>FIG · WORK</span><i></i>Selected case studies</p>
        <h1 id="hero-title">Selected <em>work</em><span class="hero-dot">.</span></h1>
        <p class="hero-lede">Case studies in sequence — product language, stack, and outcomes. Scroll the timeline; each project arrives on its own beat.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#work">Explore the work <span aria-hidden="true">↓</span></a>
          <a class="button button-secondary" href="${data.contact}">Start a project <span aria-hidden="true">↗</span></a>
        </div>
        <div class="hero-proof"><span><strong>08</strong> projects</span><i></i><span><strong>04</strong> disciplines</span><i></i><span><strong>2026</strong> collection</span></div>
      </div>
      <aside class="hero-panel" aria-label="Portfolio summary">
        <div class="panel-topline"><span>PORTFOLIO / 2026</span><span class="panel-status"><i></i>Published</span></div>
        <div class="panel-count"><strong>08</strong><span>selected<br>projects</span></div>
        <a class="panel-preview" href="${latest.href}">
          <img src="${latest.image}" alt="${latest.title} project thumbnail" width="1600" height="900">
          <span class="panel-preview-copy"><small>Latest release / 01</small><strong>${latest.title}</strong></span>
        </a>
        <div class="panel-stats"><span><strong>02</strong>UI/UX</span><span><strong>02</strong>Mobile</span><span><strong>02</strong>Commerce</span><span><strong>02</strong>Web</span></div>
        <span class="panel-watermark" aria-hidden="true">NESTLANCER®</span>
      </aside>
    </section>`;
  }

  function projectCard(project, index) {
    const number = data.projects.indexOf(project) + 1;
    return `<article class="project-card ${project.featured ? 'is-featured' : ''}" data-category="${project.category}" style="--order:${index};--project-number:'${pad(number)}'">
      <span class="project-node" aria-hidden="true"><i></i><b>${pad(number)}</b></span>
      <a class="project-image" href="${project.href}" aria-label="View ${project.title} case study">
        <img src="${project.image}" alt="${project.title} project thumbnail" width="1600" height="900" loading="${index < 2 ? 'eager' : 'lazy'}">
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

  function workSection() {
    return `<section class="work-section" id="work" aria-labelledby="work-title">
      <div class="section-heading">
        <div><p class="section-kicker">FIG · TIMELINE</p><h2 id="work-title">Project timeline</h2><p>Newest first. Each node lights as it enters view — open a card for the full case study.</p></div>
        <span class="collection-stamp">OCT / 2026<br>NESTLANCER®</span>
      </div>
      <div class="filter-bar">
        <div class="filters" role="group" aria-label="Filter projects by discipline">
          ${categories.map(category => `<button type="button" class="filter-button ${category === 'All work' ? 'is-active' : ''}" data-filter="${category}" aria-pressed="${category === 'All work'}">${category}<span>${pad(countForCategory(category))}</span></button>`).join('')}
        </div>
        <span class="result-count" id="result-count" aria-live="polite">08 case studies</span>
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
      <a class="dock-index" href="index.html" title="Compare all ten designs"><span></span><span></span><span></span><span></span><b>All 10</b></a>
      <a class="dock-arrow" href="design-${pad(previous)}.html" aria-label="Previous design: ${data.designs[previous - 1].name}">←</a>
      <div class="dock-label"><small>DESIGN ${pad(design)} / 10</small><strong>${designMeta.name}</strong></div>
      <a class="dock-arrow" href="design-${pad(next)}.html" aria-label="Next design: ${data.designs[next - 1].name}">→</a>
    </nav>`;
  }

  app.innerHTML = `${header()}<main>${hero()}${workSection()}${closing()}</main>${footer()}${designDock()}`;

  function filteredProjects() {
    return activeCategory === 'All work' ? data.projects : data.projects.filter(project => project.category === activeCategory);
  }

  function serpentineLayout(projects) {
    const groups = [];
    for (let index = 0; index < projects.length; index += 3) groups.push(projects.slice(index, index + 3));
    return `<div class="serpentine-shell">
      <svg class="route-svg" id="route-svg" aria-hidden="true" preserveAspectRatio="none"><path class="route-underlay" id="route-underlay"></path><path class="route-path" id="route-path"></path></svg>
      <div class="year-marker" aria-hidden="true"><small>START</small><strong>2026</strong><span>OCTOBER</span></div>
      <div class="serpentine-rows">${groups.map((group, rowIndex) => `<div class="serpentine-row ${rowIndex % 2 ? 'is-reverse' : ''}" style="grid-template-columns:repeat(${group.length},minmax(0,1fr))">${group.map((project, index) => projectCard(project, rowIndex * 3 + index)).join('')}</div>`).join('')}</div>
    </div>`;
  }

  function flowLayout(projects) {
    return `<div class="flow-shell" data-flow-design="${design}">
      <svg class="route-svg flow-route" id="route-svg" aria-hidden="true" preserveAspectRatio="none">
        <defs><linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--accent)"></stop><stop offset="52%" stop-color="var(--accent-2)"></stop><stop offset="100%" stop-color="var(--accent)"></stop></linearGradient></defs>
        <path class="flow-underlay" id="route-underlay"></path><path class="flow-line" id="route-path"></path>
      </svg>
      <div class="flow-origin"><span><b>2026</b><small>OCT / START</small></span></div>
      <div class="flow-projects">${projects.map(projectCard).join('')}</div>
      <div class="flow-finish"><span><b>${pad(projects.length)}</b><small>END / FLOW</small></span></div>
    </div>`;
  }

  function renderTimeline() {
    const projects = filteredProjects();
    document.getElementById('timeline-mount').innerHTML = design === 1 ? serpentineLayout(projects) : flowLayout(projects);
    document.getElementById('result-count').textContent = `${pad(projects.length)} case ${projects.length === 1 ? 'study' : 'studies'}`;
    observeReveals();
    requestAnimationFrame(drawRoute);
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
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
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
    const firstPin = shell.querySelector('.project-node');
    if (!firstPin) return;
    let rect = shell.getBoundingClientRect();
    const firstPoint = pointFor(firstPin, rect);
    marker.style.top = `${firstPoint.y - marker.offsetHeight / 2}px`;
    rect = shell.getBoundingClientRect();
    const points = [pointFor(marker, rect), ...[...shell.querySelectorAll('.project-node')].map(node => pointFor(node, rect))];
    const width = shell.clientWidth;
    const height = shell.scrollHeight;
    let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
    for (let index = 1; index < points.length; index += 1) {
      const previous = points[index - 1];
      const current = points[index];
      if (Math.abs(current.y - previous.y) < 5) {
        path += ` L ${current.x.toFixed(2)} ${current.y.toFixed(2)}`;
      } else {
        const right = (previous.x + current.x) / 2 > width / 2;
        let controlX = right ? Math.max(previous.x, current.x) + 58 : Math.min(previous.x, current.x) - 58;
        controlX = Math.max(12, Math.min(width - 12, controlX));
        path += ` C ${controlX.toFixed(2)} ${previous.y.toFixed(2)}, ${controlX.toFixed(2)} ${current.y.toFixed(2)}, ${current.x.toFixed(2)} ${current.y.toFixed(2)}`;
      }
    }
    const svg = document.getElementById('route-svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    document.getElementById('route-path').setAttribute('d', path);
    document.getElementById('route-underlay').setAttribute('d', path);
  }

  function smoothFlowPath(rawPoints, bend) {
    if (rawPoints.length < 2) return '';
    const points = [rawPoints[0]];
    for (let index = 1; index < rawPoints.length; index += 1) {
      const previous = rawPoints[index - 1];
      const current = rawPoints[index];
      const distance = Math.hypot(current.x - previous.x, current.y - previous.y);
      const direction = index % 2 === 1 ? 1 : -1;
      const offset = Math.min(bend, Math.max(24, distance * .18));
      points.push({
        x: (previous.x + current.x) / 2 + direction * offset,
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
      const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension;
      const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;
      const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension;
      const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;
      path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
    }
    return path;
  }

  function outerFlowPath(rawPoints, bulge) {
    if (rawPoints.length < 2) return '';
    const offset = Math.min(140, bulge);
    let path = `M ${rawPoints[0].x.toFixed(2)} ${rawPoints[0].y.toFixed(2)}`;
    for (let index = 1; index < rawPoints.length; index += 1) {
      const previous = rawPoints[index - 1];
      const current = rawPoints[index];
      const deltaX = current.x - previous.x;
      const direction = Math.abs(deltaX) < 30 ? (index % 2 === 1 ? 1 : -1) : Math.sign(deltaX);
      const middleX = (previous.x + current.x) / 2;
      const middleY = (previous.y + current.y) / 2;
      const previousOutsideX = previous.x - direction * offset;
      const currentOutsideX = current.x + direction * offset;
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
    const bend = mobile ? Math.min(20, width * .04) : Math.min(150, Math.max(72, width * .1));
    const outerDesigns = [3, 4, 7, 9, 10];
    const path = !mobile && outerDesigns.includes(design)
      ? outerFlowPath(rawPoints, Math.min(230, width * .19))
      : smoothFlowPath(rawPoints, bend);
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

  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      renderTimeline();
    });
  });

  window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(drawRoute);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawRoute);

  renderTimeline();
})();
