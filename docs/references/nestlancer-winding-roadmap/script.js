/* No framework, build step, analytics, or backend. */
(() => {
  const root = document.documentElement;
  const store = {
    get(key) { try { return localStorage.getItem(key); } catch (_) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch (_) {} }
  };
  const theme = document.getElementById('theme-toggle');
  function applyTheme(dark) {
    root.classList.toggle('dark', dark);
    theme.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    theme.title = theme.getAttribute('aria-label');
  }
  applyTheme(store.get('nl-prototype-theme') === 'dark');
  theme.addEventListener('click', () => {
    const dark = !root.classList.contains('dark');
    applyTheme(dark); store.set('nl-prototype-theme', dark ? 'dark' : 'light');
  });
  const menu = document.getElementById('menu-toggle');
  const nav = document.getElementById('public-mobile-nav');
  function setMenu(open) {
    nav.hidden = !open;
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menu.addEventListener('click', () => setMenu(nav.hidden));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { setMenu(false); } });
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.hidden = !!store.get('nl-prototype-cookie');
    banner.querySelectorAll('[data-cookie-choice]').forEach(button => {
      button.addEventListener('click', () => {
        store.set('nl-prototype-cookie', button.dataset.cookieChoice); banner.hidden = true;
      });
    });
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.toggleAttribute('data-active', entry.isIntersecting));
  }, {threshold: 0.12, rootMargin: '-8% 0px -8% 0px'});
  document.querySelectorAll('[data-ptl-item]').forEach(item => observer.observe(item));
  const progress = document.querySelector('.nl-scroll-progress');
  const updateProgress = () => {
    const range = root.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = 'scaleX(' + (range ? window.scrollY / range : 0) + ')';
  };
  window.addEventListener('scroll', updateProgress, {passive: true});
  window.addEventListener('resize', updateProgress); updateProgress();
})();
