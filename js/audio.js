'use strict';
window.AUDIO = (function(){
  let AC=null, GS=null, NB=null;
  function init(){
    if(AC){ if(AC.state==='suspended')AC.resume(); return; }
    const C=window.AudioContext||window.webkitAudioContext; if(!C)return;
    AC=new C(); const GM=AC.createGain(); GM.gain.value=.85; GM.connect(AC.destination);
    GS=AC.createGain(); GS.connect(GM);
    NB=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);
    const d=NB.getChannelData(0); for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
  }
  const on=()=>document.getElementById('tSnd').classList.contains('on');
  function T(t,f0,f1,dur,vol,del){
    if(!AC||!on())return; del=del||0;
    const t0=AC.currentTime+del,o=AC.createOscillator(),g=AC.createGain();
    o.type=t;o.frequency.setValueAtTime(f0,t0);
    if(f1&&f1!==f0)o.frequency.exponentialRampToValueAtTime(Math.max(f1,1),t0+dur);
    g.gain.setValueAtTime(vol,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+dur);
    o.connect(g);g.connect(GS);o.start(t0);o.stop(t0+dur+.03);
  }
  function N(dur,f0,f1,vol,type,del){
    if(!AC||!on())return; type=type||'bandpass'; del=del||0;
    const t0=AC.currentTime+del,s=AC.createBufferSource(); s.buffer=NB;
    const f=AC.createBiquadFilter(); f.type=type; f.frequency.setValueAtTime(f0,t0);
    if(f1)f.frequency.exponentialRampToValueAtTime(Math.max(f1,20),t0+dur);
    const g=AC.createGain(); g.gain.setValueAtTime(vol,t0); g.gain.exponentialRampToValueAtTime(.0001,t0+dur);
    s.connect(f);f.connect(g);g.connect(GS);s.start(t0);s.stop(t0+dur+.03);
  }
  const sfx={
    click(){T('square',760,760,.05,.16)},
    draw(){N(.13,500,1900,.28)},
    summon(){[392,523,659].forEach((f,i)=>T('triangle',f,f,.3,.2,i*.06))},
    bigSummon(){[262,330,392,523,659].forEach((f,i)=>T('triangle',f,f,.45,.22,i*.07));N(.5,200,1800,.2)},
    flip(){N(.09,900,300,.28)},
    spell(){[660,880,1100,1320].forEach((f,i)=>T('sine',f,f,.2,.18,i*.05))},
    trap(){[880,660,880,1320].forEach((f,i)=>T('square',f,f,.12,.15,i*.07));N(.2,2000,400,.2)},
    skill(){[523,659,784,1046,1318].forEach((f,i)=>T('sine',f,f,.3,.2,i*.06))},
    whoosh(){N(.16,1700,300,.45)},
    hit(){N(.15,700,90,.75,'lowpass');T('square',150,55,.16,.45)},
    destroy(){N(.3,1200,60,.85,'lowpass');T('sawtooth',500,60,.4,.3)},
    dmg(){T('sawtooth',220,65,.3,.35)},
    heal(){[523,659,784].forEach((f,i)=>T('sine',f,f,.25,.22,i*.08))},
    err(){T('square',200,110,.2,.28)},
    win(){[523,659,784,1046,1318,1568].forEach((f,i)=>T('triangle',f,f,.42,.28,i*.12))},
    lose(){[440,349,262,175].forEach((f,i)=>T('sawtooth',f,f*.9,.4,.22,i*.18))}
  };
  return {init, sfx};
})();
