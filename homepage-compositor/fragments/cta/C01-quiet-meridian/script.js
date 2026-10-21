/* cta slot — theme controls are owned by the page shell. */
try{
(function(document){
  (function(){var root=document.documentElement,button=document.querySelector('.theme'),section=document.querySelector('[data-reveal]'),reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;function sync(){var d=root.dataset.theme==='dark';button.setAttribute('aria-pressed',String(d));button.setAttribute('aria-label',d?'Switch to light theme':'Switch to dark theme');button.textContent=d?'LIGHT':'DARK'}button.addEventListener('click',function(){root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('nl-theme',root.dataset.theme)}catch(e){}sync()});sync();if(reduce||!('IntersectionObserver'in window)){section.classList.add('is-in');return}var io=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){section.classList.add('is-in');io.disconnect()}})},{threshold:.2});io.observe(section)})();
})(window.NL.scope('cta'));
}catch(__nlError){ window.NL.rescue('cta', __nlError); }
