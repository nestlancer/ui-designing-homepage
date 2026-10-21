/* cta slot — theme controls are owned by the page shell. */
try{
(function(document){
  (function(){var r=document.documentElement,b=document.querySelector('.theme'),target=document.querySelector('[data-reveal]'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;function sync(){var d=r.dataset.theme==='dark';b.setAttribute('aria-pressed',String(d));b.setAttribute('aria-label',d?'Switch to light theme':'Switch to dark theme');b.textContent=d?'LIGHT':'DARK'}b.addEventListener('click',function(){r.dataset.theme=r.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('nl-theme',r.dataset.theme)}catch(e){}sync()});sync();if(reduced||!('IntersectionObserver'in window)){target.classList.add('is-in');return}var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){target.classList.add('is-in');io.disconnect()}})},{threshold:.18});io.observe(target)})();
})(window.NL.scope('cta'));
}catch(__nlError){ window.NL.rescue('cta', __nlError); }
