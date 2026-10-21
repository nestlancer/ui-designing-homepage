/* work slot — theme controls are owned by the page shell. */
try{
(function(document){
  (function(){
    document.documentElement.classList.add('js');
    var root=document.documentElement,btn=document.getElementById('theme-toggle');
    function syncTheme(){var dark=root.getAttribute('data-theme')==='dark';btn.setAttribute('aria-pressed',String(dark));btn.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');}
    btn.addEventListener('click',function(){root.setAttribute('data-theme',root.getAttribute('data-theme')==='dark'?'light':'dark');try{localStorage.setItem('nl-theme',root.getAttribute('data-theme'));}catch(e){}syncTheme();});
    syncTheme();

    var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    var items=[].slice.call(document.querySelectorAll('[data-reveal]'));
    if(!reduce&&'IntersectionObserver' in window){
      var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.12});
      items.forEach(function(el){io.observe(el);});
    }else{items.forEach(function(el){el.classList.add('in');});}

    var chips=[].slice.call(document.querySelectorAll('.chip')),
        cards=[].slice.call(document.querySelectorAll('.card')),
        count=document.getElementById('count');
    chips.forEach(function(chip){
      chip.addEventListener('click',function(){
        var f=chip.dataset.filter;
        chips.forEach(function(c){c.setAttribute('aria-pressed',String(c===chip));});
        var shown=0;
        cards.forEach(function(card){
          var show=f==='all'||card.dataset.cat===f;
          if(show){card.removeAttribute('hidden');shown++;}else{card.setAttribute('hidden','');}
        });
        count.innerHTML='SHOWING <b>'+shown+'</b> OF 8 CONCEPTS';
      });
    });
  })();
})(window.NL.scope('work'));
}catch(__nlError){ window.NL.rescue('work', __nlError); }
