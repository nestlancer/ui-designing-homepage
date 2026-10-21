/* header slot — theme controls are owned by the page shell. */
try{
(function(document){
  (function(){
    const r=document.documentElement,btn=document.getElementById('themeToggle');
    function sync(){const dark=r.getAttribute('data-theme')==='dark';
      btn.setAttribute('aria-pressed',String(dark));
      btn.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');}
    btn.addEventListener('click',()=>{const next=r.getAttribute('data-theme')==='dark'?'light':'dark';
      r.setAttribute('data-theme',next);
      try{localStorage.setItem('nl-theme',next)}catch(e){}
      sync();});
    sync();
  })();

  function disclosure(btn,panel,{closeOnEsc=true,overlay=null}={}){
    const set=o=>{btn.setAttribute('aria-expanded',o);panel.hidden=!o;document.documentElement.classList.toggle('is-locked',o&&!!overlay)};
    set(false);
    btn.addEventListener('click',()=>set(btn.getAttribute('aria-expanded')!=='true'));
    if(closeOnEsc)document.addEventListener('keydown',e=>{ // Esc closes from anywhere, focus returns to the trigger
      if(e.key==='Escape'&&btn.getAttribute('aria-expanded')==='true'){set(false);btn.focus()}});
    if(overlay)overlay.addEventListener('click',()=>set(false));
    return set;
  }

  (function(){const d=document.documentElement;
  addEventListener('scroll',()=>d.classList.toggle('is-scrolled',scrollY>8),{passive:true})})();

  disclosure(document.getElementById('menuBtn'),document.getElementById('panel'));
})(window.NL.scope('header'));
}catch(__nlError){ window.NL.rescue('header', __nlError); }
