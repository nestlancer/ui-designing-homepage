/* why slot — theme controls are owned by the page shell. */
try{
(function(document){
  (function(){var r=document.documentElement,b=document.querySelector('.theme');function sync(){var dark=r.dataset.theme==='dark';b.setAttribute('aria-pressed',String(dark));b.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');}b.addEventListener('click',function(){r.dataset.theme=r.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('nl-theme',r.dataset.theme)}catch(e){}sync()});sync()})();
})(window.NL.scope('why'));
}catch(__nlError){ window.NL.rescue('why', __nlError); }
