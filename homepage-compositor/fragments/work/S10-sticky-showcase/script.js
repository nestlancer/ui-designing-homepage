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
      var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.1});
      items.forEach(function(el){io.observe(el);});
    }else{items.forEach(function(el){el.classList.add('in');});}

    var cases=[].slice.call(document.querySelectorAll('.case')),
        frame=document.getElementById('w-frame'),wImg=document.getElementById('w-img'),
        wSlug=document.getElementById('w-slug'),wCat=document.getElementById('w-cat'),wIdx=document.getElementById('w-idx'),
        wTitle=document.getElementById('w-title'),wDesc=document.getElementById('w-desc'),wStack=document.getElementById('w-stack'),
        wCount=document.getElementById('w-count');

    function setActive(el){
      if(el.classList.contains('active'))return;
      cases.forEach(function(c){c.classList.toggle('active',c===el);});
      var d=el.dataset;
      wSlug.textContent=d.slug;wCat.textContent=d.cat;wIdx.textContent=d.idx;
      wTitle.textContent=d.title;wDesc.textContent=d.desc;
      wStack.innerHTML=d.stack.split('|').map(function(s){return '<li>'+s+'</li>';}).join('');
      wCount.textContent=d.idx.split(' · ')[0];
      frame.classList.add('swap');
      var src=d.img;
      var im=new Image();
      im.onload=function(){wImg.src=src;frame.classList.remove('swap');};
      im.onerror=function(){frame.classList.remove('swap');};
      im.src=src;
      setTimeout(function(){frame.classList.remove('swap');},260);
    }

    if('IntersectionObserver' in window){
      var spy=new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if(en.isIntersecting){setActive(en.target);}
        });
      },{rootMargin:'-42% 0px -42% 0px',threshold:0});
      cases.forEach(function(c){spy.observe(c);});
    }
  })();
})(window.NL.scope('work'));
}catch(__nlError){ window.NL.rescue('work', __nlError); }
