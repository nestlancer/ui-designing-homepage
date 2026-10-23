/* Draw the dashed snake from actual stop positions, so it follows responsive card heights. */
(() => {
 const canvas=document.querySelector('.road-canvas');
 const stops=[...document.querySelectorAll('.road-stop')];
 const svg=canvas.querySelector('.road-route');
 let frame;
 function draw() {
  const width=canvas.clientWidth, height=canvas.clientHeight;
  const mobile=innerWidth<700;
  const columns=mobile?1:innerWidth<1024?2:3;
  stops.forEach((stop,i)=>{
   const row=Math.floor(i/columns), col=i%columns;
   stop.style.gridRow=String(row+1);
   stop.style.gridColumn=String(row%2===0?col+1:columns-col);
  });
  const base=canvas.getBoundingClientRect();
  const points=stops.map(stop=>{
   const rect=stop.querySelector('.stop-marker').getBoundingClientRect();
   return {x:rect.left+rect.width/2-base.left,y:rect.top+rect.height/2-base.top};
  });
  let d='';
  if(mobile) {
   d=`M ${points[0].x} 0 L ${points[0].x} ${points[0].y}`;
   for(let i=1;i<points.length;i++) {
    const a=points[i-1],b=points[i],mid=(a.y+b.y)/2;
    d+=` C ${a.x-14} ${mid-45}, ${b.x+14} ${mid+45}, ${b.x} ${b.y}`;
   }
   const last=points.at(-1);d+=` L ${last.x} ${canvas.clientHeight-4}`;
  } else {
   const first=points[0];d=`M 22 ${first.y} H ${first.x}`;
   for(let i=1;i<points.length;i++) {
    const a=points[i-1],b=points[i];
    if(Math.abs(a.y-b.y)<2) d+=` H ${b.x}`;
    else {
     const right=Math.floor((i-1)/columns)%2===0;
     const edge=right?width-16:16;
     const radius=30, inside=right?edge-radius:edge+radius;
     d+=` H ${inside} Q ${edge} ${a.y} ${edge} ${a.y+radius} V ${b.y-radius} Q ${edge} ${b.y} ${inside} ${b.y} H ${b.x}`;
    }
   }
   const last=points.at(-1),row=Math.floor((stops.length-1)/columns);
   d+=` H ${row%2===0?last.x+46:last.x-46}`;
  }
  svg.setAttribute('viewBox',`0 0 ${width} ${canvas.clientHeight}`);
  svg.querySelectorAll('path').forEach(path=>path.setAttribute('d',d));
 }
 function schedule(){cancelAnimationFrame(frame);frame=requestAnimationFrame(draw);}
 new ResizeObserver(schedule).observe(canvas);
 window.addEventListener('resize',schedule,{passive:true});
 document.fonts.ready.then(schedule);
 document.querySelectorAll('.road-card img').forEach(img=>img.addEventListener('load',schedule));
 schedule();
})();
