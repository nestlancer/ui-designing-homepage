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

    var rows=[].slice.call(document.querySelectorAll('.row')),
        panel=document.getElementById('pv-panel'),
        frame=document.getElementById('pv-frame'),
        img=document.getElementById('pv-img'),
        slug=document.getElementById('pv-slug'),
        cat=document.getElementById('pv-cat'),
        idx=document.getElementById('pv-idx'),
        title=document.getElementById('pv-title'),
        desc=document.getElementById('pv-desc'),
        stack=document.getElementById('pv-stack');

    function paint(el){
      var d=el.dataset;
      panel.setAttribute('aria-labelledby',el.id);
      slug.textContent=d.slug;
      cat.textContent=d.cat;
      idx.textContent=d.idx;
      title.textContent=d.title;
      desc.textContent=d.desc;
      stack.innerHTML=d.stack.split('|').map(function(s){return '<li>'+s+'</li>';}).join('');
      if(img.getAttribute('src')!==d.img){
        frame.classList.add('swapping');
        var swap=function(){
          img.src=d.img;img.alt=d.alt;
          frame.classList.remove('swapping');
          img.removeEventListener('load',swap);
        };
        img.addEventListener('load',swap);
        setTimeout(function(){ if(frame.classList.contains('swapping')){img.src=d.img;img.alt=d.alt;frame.classList.remove('swapping');} },320);
      }
    }
    function select(el,focus){
      rows.forEach(function(r){r.setAttribute('aria-selected',String(r===el));r.tabIndex=r===el?0:-1;});
      paint(el);
      if(focus)el.focus();
    }
    rows.forEach(function(el,i){
      el.addEventListener('click',function(){select(el,false);});
      el.addEventListener('focus',function(){select(el,false);});
      el.addEventListener('keydown',function(e){
        var j=null;
        if(e.key==='ArrowDown'||e.key==='ArrowRight'){j=(i+1)%rows.length;}
        if(e.key==='ArrowUp'||e.key==='ArrowLeft'){j=(i-1+rows.length)%rows.length;}
        if(e.key==='Home'){j=0;}
        if(e.key==='End'){j=rows.length-1;}
        if(j!==null){e.preventDefault();select(rows[j],true);}
      });
    });
  })();
})(window.NL.scope('work'));
}catch(__nlError){ window.NL.rescue('work', __nlError); }
