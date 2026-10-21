/* Nestlancer compositor — the single theme controller for a composed page.
 *
 * Precedence: ?theme=light|dark  ->  localStorage("nl-theme")  ->  OS preference.
 * The head boot script sets data-theme before paint; this file binds the one
 * theme control supplied by the header sample (marked data-theme-toggle during
 * extraction) and keeps aria-pressed / aria-label in sync.
 */
(function () {
  var root = document.documentElement;
  var buttons = [].slice.call(document.querySelectorAll('[data-theme-toggle]'));
  if (!buttons.length) return;

  function sync() {
    var dark = root.getAttribute('data-theme') === 'dark';
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(dark));
      btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      btn.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }

  function set(theme) {
    if (theme !== 'light' && theme !== 'dark') return;
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('nl-theme', theme); } catch (e) { /* private mode */ }
    sync();
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      set(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  });

  // keep a second tab in sync and follow the OS when the visitor has not chosen
  try {
    addEventListener('storage', function (e) {
      if (e.key === 'nl-theme' && (e.newValue === 'light' || e.newValue === 'dark')) set(e.newValue);
    });
    var mq = matchMedia('(prefers-color-scheme: dark)');
    var onScheme = function (e) {
      var saved = null;
      try { saved = localStorage.getItem('nl-theme'); } catch (err) {}
      if (saved !== 'light' && saved !== 'dark') root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    };
    if (mq.addEventListener) mq.addEventListener('change', onScheme);
    else if (mq.addListener) mq.addListener(onScheme);
  } catch (e) { /* progressive enhancement only */ }

  sync();
})();
