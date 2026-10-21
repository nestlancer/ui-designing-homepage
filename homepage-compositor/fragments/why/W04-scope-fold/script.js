/* why slot — theme controls are owned by the page shell. */
try{
(function(document){
  (function(){var r=document.documentElement,b=document.querySelector('.theme'),art=document.querySelector('.art'),proofs=[].slice.call(document.querySelectorAll('.proof'));function sync(){var dark=r.dataset.theme==='dark';b.setAttribute('aria-pressed',String(dark));b.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');}b.addEventListener('click',function(){r.dataset.theme=r.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('nl-theme',r.dataset.theme)}catch(e){}sync()});proofs.forEach(function(item,i){item.addEventListener('pointerenter',function(){art.dataset.active=i});item.addEventListener('focusin',function(){art.dataset.active=i});item.addEventListener('click',function(){art.dataset.active=i})});document.querySelector('.proofs').addEventListener('pointerleave',function(){delete art.dataset.active});sync()})();
})(window.NL.scope('why'));
}catch(__nlError){ window.NL.rescue('why', __nlError); }
