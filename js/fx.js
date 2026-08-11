'use strict';
window.FX = (function(){
  const $=id=>document.getElementById(id);
  const fxC=document.getElementById('fxC'), fg=fxC.getContext('2d');
  let pts=[];
  function size(){fxC.width=innerWidth;fxC.height=innerHeight}
  addEventListener('resize',size);size();
  (function loop(){
    requestAnimationFrame(loop);
    fg.clearRect(0,0,fxC.width,fxC.height);
    for(const p of pts){p.l+=.016;p.x+=p.vx;p.y+=p.vy;p.vy+=.18;
      fg.globalAlpha=Math.max(0,1-p.l/p.ml);fg.fillStyle=p.c;fg.beginPath();fg.arc(p.x,p.y,p.r,0,7);fg.fill()}
    fg.globalAlpha=1; pts=pts.filter(p=>p.l<p.ml);
  })();
  function burst(x,y,col,n,pw){n=n||20;pw=pw||5;
    for(let i=0;i<n;i++){const a=Math.random()*6.28,s=1+Math.random()*pw;
      pts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-2,l:0,ml:.5+Math.random()*.6,r:1.5+Math.random()*3.5,c:col})}}
  function centerOf(el){if(!el)return{x:innerWidth/2,y:innerHeight/2};const r=el.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}}
  function pillar(el,col){const p=centerOf(el);const d=document.createElement('div');d.className='pillar';
    d.style.left=p.x+'px';d.style.top=p.y+'px';
    d.style.background='linear-gradient(to top,transparent,'+(col||'rgba(255,240,170,.9)')+',transparent)';
    document.body.appendChild(d);setTimeout(()=>d.remove(),750)}
  function ring(x,y){const d=document.createElement('div');d.className='ring';d.style.left=(x-10)+'px';d.style.top=(y-10)+'px';
    document.body.appendChild(d);setTimeout(()=>d.remove(),650)}
  let msgTm;
  function msg(t){const m=$('msg');if(!m)return;m.textContent=t;clearTimeout(msgTm);m.style.opacity=1;msgTm=setTimeout(()=>m.style.opacity=0,2400)}
  function banner(txt,foe){const b=$('banner');b.textContent=txt;b.classList.toggle('foe',!!foe);
    b.classList.remove('show');void b.offsetWidth;b.classList.add('show')}
  let toastTm;
  function toast(t){const e=$('toast');e.textContent=t;e.classList.add('show');clearTimeout(toastTm);toastTm=setTimeout(()=>e.classList.remove('show'),1800)}
  function shakeArena(){const a=$('arena');if(!a)return;a.classList.remove('shake');void a.offsetWidth;a.classList.add('shake')}
  function floatAt(x,y,txt,heal){const d=document.createElement('div');d.className='dmgfloat'+(heal?' heal':'');
    d.textContent=txt;d.style.left=x+'px';d.style.top=y+'px';document.body.appendChild(d);setTimeout(()=>d.remove(),1100)}
  function ask(title,desc,ms){ms=ms||6000;
    return new Promise(res=>{
      if(GAME.over){res(false);return}
      $('askT').textContent=title;$('askD').textContent=desc;$('ask').classList.add('show');
      const bar=$('askBar');bar.style.transition='none';bar.style.width='100%';void bar.offsetWidth;
      bar.style.transition='width '+ms+'ms linear';bar.style.width='0%';
      let done=false;const fin=v=>{if(done)return;done=true;clearTimeout(tm);$('ask').classList.remove('show');res(v)};
      const tm=setTimeout(()=>fin(false),ms);
      $('askYes').onclick=()=>{AUDIO.sfx.click();fin(true)};
      $('askNo').onclick=()=>{AUDIO.sfx.click();fin(false)};
    })}
  return {burst,centerOf,pillar,ring,msg,banner,toast,shakeArena,floatAt,ask};
})();
