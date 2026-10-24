(() => {
  const data = window.NESTLANCER_DATA;
  const gallery = document.getElementById('design-gallery');
  const hpContainer = document.getElementById('top-homepages');
  const hpFilters = document.getElementById('hp-filters');
  if (!data || !gallery) return;

  const esc = (s) => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const pad = (n) => String(n).padStart(2, '0');
  let activeHp = 'ALL';

  function syncThemeUI() {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = theme === 'dark' ? 'light' : 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(theme === 'dark'));
      btn.setAttribute('aria-label', `Switch to ${next} theme`);
      const label = btn.querySelector('[data-theme-label]');
      if (label) label.textContent = theme === 'dark' ? 'Dark' : 'Light';
    });
  }

  document.addEventListener('click', (event) => {
    const toggle = event.target.closest('[data-theme-toggle]');
    if (!toggle) return;
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('nl-theme', next); } catch (_) {}
    syncThemeUI();
  });

  function renderHomepages() {
    if (!hpContainer || !Array.isArray(data.topHomepages)) return;
    if (hpFilters) {
      const codes = ['ALL', ...data.topHomepages.map((h) => h.code)];
      hpFilters.innerHTML = codes.map((code) => {
        const active = activeHp === code;
        const label = code === 'ALL' ? 'All 10 Concepts' : code;
        return `<button type="button" class="hp-pill ${active ? 'is-active' : ''}" data-hp-filter="${esc(code)}" aria-pressed="${active}">${esc(label)}</button>`;
      }).join('');
    }

    hpContainer.innerHTML = data.topHomepages.map((hp) => {
      const selected = activeHp === hp.code;
      const twinLinks = hp.designs.map((id) => {
        const d = data.designs.find((item) => item.id === id);
        return `<a class="hp-twin-link" href="design-${pad(id)}.html">#${pad(id)} ${esc(d ? d.name : '')}</a>`;
      }).join('');
      const swatches = hp.swatches.map((c) => `<span style="background:${esc(c)}"></span>`).join('');
      return `
        <article class="hp-card ${selected ? 'is-selected' : ''}" data-hp-card="${esc(hp.code)}">
          <div class="hp-card-top">
            <span class="hp-rank">#${hp.rank} · ${esc(hp.code)}</span>
            <span class="hp-score">${esc(hp.score)}</span>
          </div>
          <h3>${esc(hp.title)}</h3>
          <p class="hp-combo">${esc(hp.combo)}</p>
          <div class="hp-card-foot">
            <div class="hp-swatches" aria-hidden="true">${swatches}</div>
            <a class="hp-open" href="${esc(hp.href)}">Homepage <span aria-hidden="true">↗</span></a>
          </div>
          <div class="hp-twins">
            <span class="hp-twins-label">Portfolio twins:</span>
            ${twinLinks}
          </div>
        </article>`;
    }).join('');
  }

  function renderGallery() {
    const list = activeHp === 'ALL'
      ? data.designs
      : data.designs.filter((d) => d.hpCode === activeHp);

    gallery.innerHTML = list.map((design) => {
      const id = pad(design.id);
      const swatches = design.colors.map((color) => `<span style="background:${esc(color)}"></span>`).join('');
      const tags = design.tags.map((tag) => `<span>${esc(tag)}</span>`).join('');
      return `
        <a class="design-option" href="design-${id}.html" data-design="${design.id}" data-hp="${esc(design.hpCode || '')}">
          <div class="option-preview">
            <img src="assets/previews/design-${id}.jpg" alt="Preview of Concept ${id}: ${esc(design.name)}" loading="lazy" width="720" height="500">
            <span class="preview-badge">Concept ${id} · ${esc(design.defaultTheme === 'dark' ? 'Dark' : 'Light')}</span>
            <div class="swatches" aria-hidden="true">${swatches}</div>
          </div>
          <div class="option-body">
            <div class="option-top">
              <span class="option-index">${id}</span>
              <span class="option-label">${esc(design.label)}</span>
            </div>
            <h3>${esc(design.name)}</h3>
            <p>${esc(design.description)}</p>
            <div class="option-meta">
              <div class="option-tags">${tags}</div>
              <span class="open-cta">Open <span aria-hidden="true">→</span></span>
            </div>
          </div>
        </a>`;
    }).join('');
  }

  if (hpFilters) {
    hpFilters.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-hp-filter]');
      if (!btn) return;
      activeHp = btn.dataset.hpFilter || 'ALL';
      renderHomepages();
      renderGallery();
    });
  }

  syncThemeUI();
  renderHomepages();
  renderGallery();
})();
