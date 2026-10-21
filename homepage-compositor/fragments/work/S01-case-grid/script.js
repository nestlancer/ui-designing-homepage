/* work slot — theme controls are owned by the page shell. */
try{
(function(document){
  (function(){
    document.documentElement.classList.add('js');
    var root=document.documentElement;
    var btn=document.getElementById('theme-toggle');
    function syncTheme(){
      var dark=root.getAttribute('data-theme')==='dark';
      btn.setAttribute('aria-pressed',String(dark));
      btn.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');
    }
    btn.addEventListener('click',function(){
      root.setAttribute('data-theme',root.getAttribute('data-theme')==='dark'?'light':'dark');
      try{localStorage.setItem('nl-theme',root.getAttribute('data-theme'));}catch(e){}
      syncTheme();
    });
    syncTheme();

    var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    var items=[].slice.call(document.querySelectorAll('[data-reveal]'));
    if(!reduce&&'IntersectionObserver' in window){
      var io=new IntersectionObserver(function(entries){
        entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
      },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
      items.forEach(function(el){ io.observe(el); });
    }else{
      items.forEach(function(el){ el.classList.add('in'); });
    }

    /* pointer-tracked spotlight per card */
    [].slice.call(document.querySelectorAll('.card')).forEach(function(card){
      var spot=card.querySelector('.spot');
      card.addEventListener('pointermove',function(e){
        if(reduce)return;
        var r=card.getBoundingClientRect();
        spot.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
        spot.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
      });
    });
  })();
})(window.NL.scope('work'));
}catch(__nlError){ window.NL.rescue('work', __nlError); }
