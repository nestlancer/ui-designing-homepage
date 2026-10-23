(() => {
  const { designs } = window.NESTLANCER_DATA;
  const gallery = document.getElementById('design-gallery');
  gallery.innerHTML = designs.map(design => `
    <article class="design-option" style="--swatch-1:${design.colors[0]};--swatch-2:${design.colors[1]};--swatch-3:${design.colors[2]}">
      <a class="preview-link" href="design-${String(design.id).padStart(2, '0')}.html" aria-label="Open design ${design.id}: ${design.name}">
        <div class="design-preview">
          <img src="assets/previews/design-${String(design.id).padStart(2, '0')}.jpg" alt="${design.name} portfolio design preview" width="720" height="500" loading="${design.id < 3 ? 'eager' : 'lazy'}">
          <span class="preview-number">${String(design.id).padStart(2, '0')}</span>
          <span class="open-pill">Open full design <b>↗</b></span>
        </div>
        <div class="design-info">
          <div class="design-title-row"><div><p>${design.label}</p><h2>${design.name}</h2></div><span class="design-index">${String(design.id).padStart(2, '0')} / 10</span></div>
          <p class="design-description">${design.description}</p>
          <div class="design-meta"><ul>${design.tags.map(tag => `<li>${tag}</li>`).join('')}</ul><div class="swatches" aria-hidden="true"><i></i><i></i><i></i></div></div>
        </div>
      </a>
    </article>`).join('');
})();
