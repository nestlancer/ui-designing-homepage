/* hero slot — theme controls are owned by the page shell. */
try{
(function(document){
  (function(){
    var doc = document, root = doc.documentElement;
    var reduce = matchMedia('(prefers-reduced-motion: reduce)');

    /* Theme toggle (boot handled in <head>) */
    var tBtn = doc.getElementById('theme-toggle');
    function syncTheme(){
      var dark = root.getAttribute('data-theme') === 'dark';
      tBtn.setAttribute('aria-pressed', String(dark));
      tBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    tBtn.addEventListener('click', function(){
      var dark = root.getAttribute('data-theme') !== 'dark';
      root.setAttribute('data-theme', dark ? 'dark' : 'light');
      try { localStorage.setItem('nl-theme', dark ? 'dark' : 'light'); } catch(e){}
      syncTheme();
    });
    syncTheme();

    /* Scroll reveals */
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){ en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
    doc.querySelectorAll('[data-reveal]').forEach(function(el){ io.observe(el); });

    /* Count-up (locked figures only, en-IN grouping for ₹) */
    var fmt = new Intl.NumberFormat('en-IN');
    function countUp(el){
      var end = parseInt(el.getAttribute('data-count'), 10);
      var suf = el.getAttribute('data-suffix') || '';
      var pre = el.getAttribute('data-prefix') || '';
      var inr = el.getAttribute('data-format') === 'inr';
      function render(v){ el.textContent = pre + (inr ? fmt.format(v) : String(v)) + suf; }
      if (reduce.matches){ render(end); return; }
      var t0 = null, D = 900;
      function step(t){
        if (t0 === null) t0 = t;
        var p = Math.min((t - t0) / D, 1);
        var e = 1 - Math.pow(1 - p, 3);
        render(Math.round(end * e));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){ countUp(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: .5 });
    doc.querySelectorAll('[data-count]').forEach(function(el){ cio.observe(el); });

    /* H08 signature: magnetic primary CTA (fine pointers only) */
    var mag = doc.querySelector('.magnetic');
    if (mag && !reduce.matches && matchMedia('(pointer: fine)').matches){
      mag.addEventListener('pointermove', function(e){
        var r = mag.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / r.width;
        var y = (e.clientY - r.top - r.height / 2) / r.height;
        mag.style.transform = 'translate(' + (x * 8).toFixed(1) + 'px,' + (y * 6).toFixed(1) + 'px)';
      });
      mag.addEventListener('pointerleave', function(){ mag.style.transform = ''; });
    }
  })();
})(window.NL.scope('hero'));
}catch(__nlError){ window.NL.rescue('hero', __nlError); }
