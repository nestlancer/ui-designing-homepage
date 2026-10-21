/* financial slot — theme controls are owned by the page shell. */
try{
(function(document){
  (function(){
    var doc=document, root=doc.documentElement;
    var reduce=matchMedia('(prefers-reduced-motion: reduce)');
    var tBtn=document.getElementById('theme-toggle');
    function sync(){var dark=root.getAttribute('data-theme')==='dark';tBtn.setAttribute('aria-pressed',String(dark));tBtn.setAttribute('aria-label',dark ? 'Switch to light theme':'Switch to dark theme');}
    tBtn.addEventListener('click',function(){var dark=root.getAttribute('data-theme')!=='dark';root.setAttribute('data-theme',dark ? 'dark':'light');try{localStorage.setItem('nl-theme',dark?'dark':'light');}catch(e){}sync();});sync();
    var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('is-in');io.unobserve(en.target);}});},{threshold:.15,rootMargin:'0px 0px -40px 0px'});
    doc.querySelectorAll('[data-reveal],.slot').forEach(function(el){io.observe(el);});
    var fmt=new Intl.NumberFormat('en-IN');
    function countUp(el){
      var end=parseInt(el.getAttribute('data-count'),10);
      var pre=el.getAttribute('data-prefix')||'';
      var suf=el.getAttribute('data-suffix')||'';
      function render(v){el.textContent=pre+fmt.format(v)+suf;}
      if(reduce.matches){render(end);return;}
      var t0=null,D=1000;
      function step(t){if(t0===null)t0=t;var p=Math.min((t-t0)/D,1);var e=1-Math.pow(1-p,3);render(Math.round(end*e));if(p<1)requestAnimationFrame(step);}
      requestAnimationFrame(step);
    }
    var cio=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){countUp(en.target);cio.unobserve(en.target);}});},{threshold:.5});
    doc.querySelectorAll('[data-count]').forEach(function(el){cio.observe(el);});
  })();
})(window.NL.scope('financial'));
}catch(__nlError){ window.NL.rescue('financial', __nlError); }
