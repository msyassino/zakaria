'use strict';
window.GAME = (function(){
  const $=id=>document.getElementById(id);
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const rnd=Math.random, clamp=(v,a,b)=>v<a?a:v>b?b:v;
  const fast=()=>document.getElementById('tFast').classList.contains('on');
  const D=ms=>fast()?ms*.4:ms;
  const CARDS=DATA.CARDS, DECKS=DATA.DECKS, CHARS=DATA.CHARS;
  const other=s=>s==='p'?'o':'p';
  function shuffle(a){for(let i=a.length-1;i>0;i--){const j=~~(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

  let S=null, turn='p', phase='main', summoned=false, busy=false, over=false, turnNo=0, pDmg=0, uidC=0;
  let myChar=null, foeChar=null;
  let mode='idle', selA=null, pending=null, tribSel=[], needN=0, pendIdx=null;
  let view=null;

  const atkOf=(side,m)=>CARDS[m.cid].atk+(m.atkB||0)+(CARDS[m.cid].fx!=='aura'&&S[side].field.some(x=>x.uid!==m.uid&&CARDS[x.cid].fx==='aura')?300:0);
  const defOf=m=>CARDS[m.cid].def+(m.defB||0);
  const getEl=uid=>document.querySelector('[data-uid="'+uid+'"]');

  function newGame(cid){
    myChar=CHARS[cid];
    const others=Object.keys(CHARS).filter(k=>k!==cid);
    foeChar=CHARS[others[~~(rnd()*others.length)]];
    S={p:{lp:4000,deck:shuffle(DECKS[myChar.deck].slice()),hand:[],field:[],spells:[],gy:0,skill:false},
       o:{lp:4000,deck:shuffle(DECKS[foeChar.deck].slice()),hand:[],field:[],spells:[],gy:0,skill:false}};
    turn='p';phase='main';summoned=false;busy=true;over=false;turnNo=0;pDmg=0;uidC=0;
    mode='idle';selA=null;pending=null;tribSel=[];needN=0;pendIdx=null;
    view.setupAvatars(myChar,foeChar);
    for(let i=0;i<4;i++){S.p.hand.push(S.p.deck.pop());S.o.hand.push(S.o.deck.pop())}
    view.renderAll();
    FX.banner('⚔ المبارزة!');
    setTimeout(()=>{if(!over)startTurn('p')},1200);
  }

  function draw(side,n){const P=S[side];
    for(let i=0;i<n;i++){
      if(!P.deck.length){endGame(other(side),(side==='p'?'نفدت أوراقك':'نفدت أوراق الخصم')+'!');return}
      const c=P.deck.pop();
      if(P.hand.length>=8){P.gy++;FX.msg('🔥 اليد ممتلئة — البطاقة إلى المقبرة')}else P.hand.push(c);
    }}

  function startTurn(side){
    if(over)return;
    turn=side;phase='main';summoned=false;turnNo+=side==='p'?1:0;
    S[side].field.forEach(m=>m.attacked=false);
    FX.banner(side==='p'?'⭐ دورك!':'👺 دور الخصم',side==='o');
    draw(side,1);if(over)return;
    view.renderAll();AUDIO.sfx.draw();
    if(side==='o')aiTurn();else busy=false;
    view.renderInfo();
  }

  function checkEnd(){if(!over&&S.p.lp<=0)endGame('o','');if(!over&&S.o.lp<=0)endGame('p','')}

  function dmg(side,amt,srcEl){
    S[side].lp-=amt;if(side==='o')pDmg+=amt;
    view.hurtBar(side);view.hitAva(side);
    const av=$(side==='p'?'pAva':'oAva');const c=FX.centerOf(srcEl||av);
    FX.burst(c.x,c.y,'#ff5252',22,6);FX.floatAt(c.x-20,c.y-34,'-'+amt);
    if(amt>=600){FX.shakeArena();if(side==='p')view.hurtFlash()}
    AUDIO.sfx.dmg();view.renderInfo();
    if(S[side].lp<=0)endGame(other(side),'سقطت نقاط الحياة إلى الصفر');
  }
  function healF(side,amt){S[side].lp=Math.min(9999,S[side].lp+amt);
    const av=$(side==='p'?'pAva':'oAva');const c=FX.centerOf(av);
    FX.burst(c.x,c.y,'#7dff8f',16,4);FX.floatAt(c.x-20,c.y-34,'+'+amt,true);
    AUDIO.sfx.heal();view.renderInfo()}

  async function destroySlot(side,slot){
    const el=getEl(slot.uid);
    if(el){const p=FX.centerOf(el);FX.burst(p.x,p.y,'#ff9c3f',30,7);el.classList.add('die')}
    AUDIO.sfx.destroy();await sleep(480);
    const c=CARDS[slot.cid];
    S[side].field=S[side].field.filter(m=>m.uid!==slot.uid);
    if(c.fx==='recov'&&S[side].hand.length<8){S[side].hand.push(slot.cid);FX.msg('♻ '+c.n+' عاد إلى اليد!')}
    else{S[side].gy++;if(c.fx==='venge'){FX.msg('💢 انتقام '+c.n+'!');dmg(other(side),800)}}
  }

  async function consumeTrap(side,st){
    S[side].spells=S[side].spells.filter(s=>s.uid!==st.uid);S[side].gy++;
    view.renderAll();AUDIO.sfx.trap();
    const el=getEl(st.uid);if(el){const p=FX.centerOf(el);FX.burst(p.x,p.y,'#ff8fe0',24,6)}
  }

  async function onSummoned(side,slot){
    const c=CARDS[slot.cid];
    if(c.fx==='heal800')healF(side,800);
    const op=other(side);const tr=S[op].spells.find(s=>s.cid==='t_drain');
    if(tr&&c.atk>=1500){
      const use=op==='p'?await FX.ask('⛓ سلسلة الأرواح','الخصم استدعى '+c.n+' ('+c.atk+'⚔). هل تدمّره؟'):rnd<.85;
      if(use&&!over){await consumeTrap(op,tr);FX.msg('⛓ سلسلة الأرواح!');await destroySlot(side,slot)}
    }
  }

  function pillarCol(cid){const a=CARDS[cid].a;return a==='dark'?'rgba(180,120,255,.85)':a==='fire'?'rgba(255,150,80,.85)':'rgba(255,240,170,.9)'}

  async function doSummon(i,pos){
    busy=true;const P=S.p;const cid=P.hand[i];const c=CARDS[cid];
    for(const uid of tribSel){const s=P.field.find(m=>m.uid===uid);if(s){const el=getEl(uid);if(el)el.classList.add('die');P.field=P.field.filter(m=>m.uid!==uid);P.gy++}}
    if(tribSel.length)await sleep(300);
    P.hand.splice(i,1);
    const slot={uid:++uidC,cid,pos,faceup:pos==='atk',atkB:0,defB:0,attacked:false};
    P.field.push(slot);summoned=true;pending=null;mode='idle';tribSel=[];
    view.renderAll();
    const el=getEl(slot.uid);
    if(el){el.classList.add('popIn');FX.pillar(el,pillarCol(cid));const p=FX.centerOf(el);FX.ring(p.x,p.y)}
    tribSel.length>=2?AUDIO.sfx.bigSummon():AUDIO.sfx.summon();
    FX.msg(pos==='atk'?'⚔ استدعاء '+c.n+'!':'🛡 تثبيت '+c.n+' مقلوبًا');
    await sleep(D(500));await onSummoned('p',slot);
    view.renderAll();busy=false;checkEnd();view.renderInfo();
  }

  async function aiDoSummon(sel){
    const O=S.o;
    for(const t of sel.tribs){const el=getEl(t.uid);if(el)el.classList.add('die');O.field=O.field.filter(m=>m.uid!==t.uid);O.gy++}
    if(sel.tribs.length)await sleep(300);
    O.hand.splice(sel.m.i,1);
    const c=CARDS[sel.m.cid];
    const slot={uid:++uidC,cid:sel.m.cid,pos:sel.pos,faceup:sel.pos==='atk',atkB:0,defB:0,attacked:false};
    O.field.push(slot);view.renderAll();
    const el=getEl(slot.uid);if(el&&sel.pos==='atk'){el.classList.add('popIn');FX.pillar(el,pillarCol(slot.cid))}
    sel.tribs.length>=2?AUDIO.sfx.bigSummon():AUDIO.sfx.summon();
    FX.banner(sel.pos==='atk'?'👺 استدعى '+c.n+'!':'👺 ثبّت بطاقة مقلوبة',true);
    await sleep(D(700));await onSummoned('o',slot);view.renderAll();
  }

  async function resolveSpell(side,cid,targetUid){
    const c=CARDS[cid],E=S[other(side)];AUDIO.sfx.spell();FX.msg('🌀 '+c.n+'!');
    if(c.fx==='heal')healF(side,1000);
    if(c.fx==='greed'){draw(side,2);view.renderAll()}
    if(c.fx==='fire')dmg(other(side),800);
    if(c.fx==='wall'){S[side].field.forEach(m=>m.defB+=500);view.renderAll();
      const av=$(side==='p'?'pAva':'oAva');const p=FX.centerOf(av);FX.burst(p.x,p.y,'#7fc4ff',20,5)}
    if(c.fx==='rage'){
      let t=targetUid!=null?S[side].field.find(m=>m.uid===targetUid):null;
      if(!t)t=S[side].field.slice().sort((a,b)=>atkOf(side,b)-atkOf(side,a))[0];
      if(t){t.atkB+=700;view.renderAll();const el=getEl(t.uid);if(el){const p=FX.centerOf(el);FX.burst(p.x,p.y,'#ff9c3f',20,5)}}}
    if(c.fx==='bolt'){
      const t=E.field.filter(m=>m.faceup).sort((a,b)=>atkOf(other(side),b)-atkOf(other(side),a))[0];
      if(t){FX.msg('⚡ حكم السماء!');await destroySlot(other(side),t)}else FX.msg('⚡ لا هدف!');
    }
  }
  async function castPlayer(i,targetUid){
    busy=true;const cid=S.p.hand.splice(i,1)[0];S.p.gy++;mode='idle';view.renderAll();
    await resolveSpell('p',cid,targetUid);view.renderAll();busy=false;checkEnd();view.renderInfo();
  }
  function setTrap(side,i){
    const P=S[side];const cid=P.hand.splice(i,1)[0];
    P.spells.push({uid:++uidC,cid});view.renderAll();AUDIO.sfx.flip();
    if(side==='p'){FX.msg('🪤 ثبّتّ '+CARDS[cid].n+' مقلوبًا');
      const el=getEl(P.spells[P.spells.length-1].uid);if(el)el.classList.add('popIn')}
  }

  async function lungeAnim(aUid,tUid,aSide){
    const aEl=getEl(aUid);if(!aEl)return;
    const tEl=tUid!=null?getEl(tUid):$(aSide==='p'?'oAva':'pAva');
    const A=FX.centerOf(aEl),B=FX.centerOf(tEl);
    let dx=B.x-A.x,dy=B.y-A.y;dx*=.88;dy*=.88;
    aEl.style.setProperty('--tx',dx+'px');aEl.style.setProperty('--ty',dy+'px');
    view.speedLines(true);
    aEl.classList.add('lunge');AUDIO.sfx.whoosh();
    await sleep(230);FX.burst(B.x,B.y,'#fff1a8',16,6);await sleep(260);
    aEl.classList.remove('lunge');view.speedLines(false);
  }

  async function battle(aSide,aUid,tUid){
    busy=true;mode='idle';selA=null;view.renderInfo();
    const A=S[aSide],E=S[other(aSide)],def=other(aSide);
    const a=A.field.find(m=>m.uid===aUid);if(!a){busy=false;return}
    a.attacked=true;
    let t=tUid!=null?E.field.find(m=>m.uid===tUid):null;
    let spike=false;
    const mirror=S[def].spells.find(s=>s.cid==='t_mirror');
    if(mirror){
      const use=def==='p'?await FX.ask('🪞 الحجاب المرآتي','الخصم أعلن هجومًا! أبطل الهجوم وأنهِ مرحلة قتاله؟'):rnd<.8;
      if(use&&!over){await consumeTrap(def,mirror);FX.banner('🪞 الحجاب المرآتي!',def==='o');
        FX.msg('🪞 تلاشى الهجوم!');A.field.forEach(m=>m.attacked=true);
        view.renderAll();await sleep(D(600));busy=false;view.renderInfo();return}}
    const spikeT=S[def].spells.find(s=>s.cid==='t_spike');
    if(spikeT){
      const use=def==='p'?await FX.ask('💍 خاتم الأشواك','المهاجم '+CARDS[a.cid].n+' سيفقد 1200 هجوم. تفعيل؟'):rnd<.75;
      if(use&&!over){await consumeTrap(def,spikeT);spike=true;FX.msg('💍 الأشواك تنهش المهاجم!')}}
    if(over){busy=false;return}
    if(t&&!t.faceup){t.faceup=true;view.renderAll();AUDIO.sfx.flip();
      const fc=CARDS[t.cid];FX.msg('🔄 كُشف: '+fc.n+'!');
      if(fc.fx==='flipdraw'){draw(def,1);FX.msg('🔄 تأثير الكشف: سحب بطاقة!');view.renderAll()}
      await sleep(D(550))}
    await lungeAnim(aUid,tUid,aSide);
    const aA=Math.max(0,atkOf(aSide,a)-(spike?1200:0));let vampAmt=0;
    if(!t){dmg(def,aA);vampAmt=aA;FX.msg('💥 هجوم مباشر من '+CARDS[a.cid].n+'!')}
    else if(t.pos==='atk'){
      const dA=atkOf(def,t);
      if(aA>dA){FX.msg('⚔ '+CARDS[a.cid].n+' دمّر '+CARDS[t.cid].n+'!');await destroySlot(def,t);if(!over){dmg(def,aA-dA);vampAmt=aA-dA}}
      else if(aA===dA){FX.msg('💢 تدمير متبادل!');await destroySlot(def,t);await destroySlot(aSide,a)}
      else{FX.msg('🛡 '+CARDS[t.cid].n+' صدّ الهجوم!');await destroySlot(aSide,a);if(!over)dmg(aSide,dA-aA)}}
    else{
      const dD=defOf(t);
      if(aA>dD){FX.msg(CARDS[a.cid].fx==='pierce'?'🗡 اختراق وثقب!':'🛡 اخترق الدفاع!');
        await destroySlot(def,t);
        if(!over&&CARDS[a.cid].fx==='pierce'){const ex=aA-dD;dmg(def,ex);vampAmt=ex}}
      else if(aA<dD){FX.msg('🧱 الدفاع صامد!');dmg(aSide,dD-aA)}
      else FX.msg('⚖ تعادل!')}
    if(!over&&vampAmt>0&&CARDS[a.cid].fx==='vamp'&&A.field.includes(a)){healF(aSide,vampAmt);FX.msg('🩸 يمتص الحياة!')}
    view.renderAll();busy=false;checkEnd();view.renderInfo();
  }

  /* ═══ الذكاء الاصطناعي المحسّن ═══ */
  function aiChooseSummon(){
    const O=S.o;
    const ms=O.hand.map((cid,i)=>({cid,i,c:CARDS[cid]})).filter(x=>x.c.t==='m').sort((a,b)=>b.c.atk-a.c.atk);
    for(const m of ms){
      const need=m.c.lv>=7?2:m.c.lv>=5?1:0;
      if(need===0&&O.field.length>=3)continue;
      if(need>0&&O.field.length<need)continue;
      const tribs=O.field.slice().sort((a,b)=>atkOf('o',a)-atkOf('o',b)).slice(0,need);
      const pos=(O.lp<=1500&&m.c.def>=1500&&m.c.def>m.c.atk&&rnd<.7)?'def':'atk';
      return{m,tribs,pos}}
    return null}
  function aiTarget(m){
    const myA=atkOf('o',m),F=S.p.field;
    if(!F.length)return'direct';
    let best=null,bestScore=-1;
    for(const t of F){
      let sc=0;
      if(t.pos==='atk'){const dA=atkOf('p',t);
        if(myA>dA)sc=(myA-dA)+dA*.5;else if(myA===dA)sc=dA*.3;else sc=-(dA-myA)}
      else{const dD=defOf(t);
        if(myA>dD)sc=300+(CARDS[m.cid].fx==='pierce'?(myA-dD):0);else if(myA<dD)sc=-(dD-myA)*.6;else sc=0}
      if(sc>bestScore){bestScore=sc;best=t}}
    if(best&&bestScore>0)return best;
    return'hold'}
  async function aiTurn(){
    busy=true;const O=S.o;await sleep(D(900));if(over)return;
    for(const cid of O.hand.slice()){if(O.spells.length>=3)break;const c=CARDS[cid];
      if(c.t==='t'&&rnd<.9){O.hand.splice(O.hand.indexOf(cid),1);O.spells.push({uid:++uidC,cid});
        view.renderAll();FX.msg('👺 الخصم ثبّت بطاقة مقلوبة');AUDIO.sfx.flip();await sleep(D(550));if(over)return}}
    const sel=aiChooseSummon();
    if(sel){await aiDoSummon(sel);if(over)return;await sleep(D(500))}
    for(const cid of O.hand.slice()){
      if(over)return;const c=CARDS[cid];if(c.t!=='s'||!O.hand.includes(cid))continue;
      let use=false;
      if(c.fx==='heal'&&O.lp<=2300)use=true;
      if(c.fx==='bolt'&&S.p.field.some(m=>m.faceup&&atkOf('p',m)>=1700))use=true;
      if(c.fx==='fire')use=S.p.lp<=2400||rnd<.7;
      if(c.fx==='greed'&&O.hand.length<=6)use=true;
      if(c.fx==='rage'){const mine=O.field.slice().sort((a,b)=>atkOf('o',b)-atkOf('o',a))[0];
        const foe=S.p.field.filter(m=>m.faceup).sort((a,b)=>atkOf('p',b)-atkOf('p',a))[0];
        if(mine&&foe&&atkOf('o',mine)<atkOf('p',foe)&&atkOf('o',mine)+700>atkOf('p',foe))use=true}
      if(c.fx==='wall'&&O.field.length&&S.p.field.some(m=>m.pos==='atk'))use=true;
      if(use){O.hand.splice(O.hand.indexOf(cid),1);O.gy++;view.renderAll();
        FX.banner('🌀 الخصم يرمي '+c.n,true);
        await resolveSpell('o',cid);view.renderAll();await sleep(D(800));if(over)return}}
    const sk=foeChar.skill;
    if(!O.skill&&sk.cond(O)&&rnd<.9){
      O.skill=true;FX.banner('✨ مهارة الخصم: '+sk.name,true);AUDIO.sfx.skill();await sleep(D(700));
      if(sk.needTarget==='skillT'){const t=O.field.slice().sort((a,b)=>atkOf('o',b)-atkOf('o',a))[0];if(t)applySkill('o',t.uid)}
      else if(sk.needTarget==='discard'){O.hand.sort((a,b)=>CARDS[a].atk-CARDS[b].atk);applySkill('o',0)}
      else applySkill('o');
      view.renderAll();await sleep(D(700));if(over)return}
    for(let g=0;g<8;g++){
      if(over)return;
      const m=O.field.find(x=>x.pos==='atk'&&!x.attacked);if(!m)break;
      m.attacked=true;
      const t=aiTarget(m);if(t==='hold'){view.renderInfo();continue}
      await battle('o',m.uid,t==='direct'?null:t.uid);
      await sleep(D(400))}
    if(over)return;await sleep(D(400));startTurn('p');
  }

  function applySkill(side,uidOrIdx){
    const ch=side==='p'?myChar:foeChar;const sk=ch.skill;
    if(sk.needTarget==='skillT'){const s=S[side].field.find(m=>m.uid===uidOrIdx);if(s){s.atkB+=800;FX.msg(sk.icon+' '+sk.name+': +800 هجوم!')}}
    else if(sk.needTarget==='discard'){const P=S[side];if(P.hand.length){P.hand.splice(uidOrIdx,1)[0];P.gy++;draw(side,2);FX.msg(sk.icon+' '+sk.name+': تخلص وسحب 2!')}}
    else{dmg(other(side),600);healF(side,600);FX.msg(sk.icon+' '+sk.name+'!')}
  }

  function endGame(winner,reason){
    if(over)return;over=true;busy=true;mode='idle';view.renderInfo();
    setTimeout(()=>{
      const win=winner==='p';
      let wins=+(localStorage.getItem('dr_wins')||0);
      if(win){wins++;localStorage.setItem('dr_wins',wins);const w=$('winsC');if(w)w.textContent=wins}
      let sc=win?2000:0;sc+=Math.max(0,S.p.lp)*.25;sc+=(S.p.deck.length*30+S.p.hand.length*20);sc+=Math.min(800,pDmg*.15);sc=Math.round(sc);
      const rank=win?(sc>=2900?'A':sc>=2500?'B':'C'):'C';
      view.showEnd(win,rank,sc,reason,foeChar.name);
      win?AUDIO.sfx.win():AUDIO.sfx.lose();
      if(win)for(let i=0;i<6;i++)setTimeout(()=>FX.burst(innerWidth*(.15+rnd*.7),innerHeight*.28,'#ffd23f',28,7),i*260);
    },650);
  }

  function endPlayerTurn(){if(turn!=='p'||busy||over)return;AUDIO.sfx.click();mode='idle';selA=null;startTurn('o')}
  function toBattle(){if(turn!=='p'||phase!=='main'||busy)return;phase='battle';AUDIO.sfx.click();view.renderAll();FX.msg('⚔ اختر وحشًا متوهجًا للهجوم')}
  function skillReady(){return myChar&&!S.p.skill&&myChar.skill.cond(S.p)&&turn==='p'&&phase==='main'&&!busy&&!over}
  function useSkill(){
    if(!skillReady())return;const sk=myChar.skill;AUDIO.sfx.click();
    if(sk.needTarget==='skillT'){mode='skillT';view.renderAll();FX.msg('🎯 اختر وحشًا لمنحه القوة')}
    else if(sk.needTarget==='discard'){mode='discard';view.renderAll();FX.msg('🎯 اختر بطاقة للتخلص منها')}
    else{S.p.skill=true;applySkill('p');AUDIO.sfx.skill();view.renderAll()}
  }
  function resetMode(){mode='idle';selA=null;pending=null;tribSel=[];needN=0;pendIdx=null}

  return {
    get S(){return S}, get turn(){return turn}, get phase(){return phase}, get busy(){return busy},
    get over(){return over}, get mode(){return mode}, get selA(){return selA}, get pending(){return pending},
    get tribSel(){return tribSel}, get needN(){return needN}, get myChar(){return myChar},
    set view(v){view=v},
    atkOf,defOf,newGame,draw,handleCard,battle,doSummon,castPlayer,setTrap,endPlayerTurn,toBattle,useSkill,
    skillReady,resetMode,applySkill,checkEnd,
    setMode(m){mode=m},setSelA(v){selA=v},setPending(v){pending=v},setTribSel(v){tribSel=v},
    setNeedN(v){needN=v},setPendIdx(v){pendIdx=v},addTrib(uid){tribSel.push(uid)},
    rmTrib(uid){tribSel=tribSel.filter(u=>u!==uid)},
    get pDmg(){return pDmg},get deckP(){return S?S.p.deck.length:0},get handP(){return S?S.p.hand.length:0},
    get lpP(){return S?S.p.lp:0}
  };

  // إدخال اللاعب
  function handleCard(el){
    if(over||busy||turn!=='p')return;
    const hi=el.dataset.hi;
    if(hi!=null){handClick(+hi);return}
    const uid=+el.dataset.uid,side=el.dataset.side;
    fieldClick(uid,side);
  }
  function handClick(i){
    if(mode==='discard'){S.p.skill=true;applySkill('p',i);AUDIO.sfx.skill();resetMode();view.renderAll();return}
    if(phase!=='main'){FX.msg('🃏 العب البطاقات في مرحلتك الأساسية فقط');return}
    const cid=S.p.hand[i],c=CARDS[cid];
    if(c.t==='m'){
      if(summoned){FX.toast('⚠ استدعيت بالفعل هذا الدور');AUDIO.sfx.err();return}
      const need=c.lv>=7?2:c.lv>=5?1:0;
      if(need===0&&S.p.field.length>=3){FX.toast('⚠ مناطق الوحوش ممتلئة');AUDIO.sfx.err();return}
      if(need>0){
        if(S.p.field.length<need){FX.toast('⚠ تحتاج '+need+' وحوش للتضحية');AUDIO.sfx.err();return}
        mode='tribute';pendIdx=i;tribSel=[];needN=need;pending=null;view.renderAll();
        FX.msg('🩸 اختر '+need+' من وحوشك للتضحية');AUDIO.sfx.click();return}
      pending=i;mode='idle';view.renderInfo();AUDIO.sfx.click();return}
    if(c.t==='s'){
      if(c.fx==='rage'){if(!S.p.field.length){FX.toast('⚠ لا وحوش لديك');AUDIO.sfx.err();return}
        mode='rage';pendIdx=i;view.renderAll();FX.msg('🎯 اختر وحشًا لتعزيزه');AUDIO.sfx.click();return}
      if(c.fx==='bolt'&&!S.o.field.some(m=>m.faceup)){FX.toast('⚠ لا وحوش مكشوفة لدى الخصم');AUDIO.sfx.err();return}
      castPlayer(i);return}
    if(c.t==='t'){
      if(S.p.spells.length>=3){FX.toast('⚠ مناطق التعاويذ ممتلئة');AUDIO.sfx.err();return}
      setTrap('p',i)}
  }
  function fieldClick(uid,side){
    if(mode==='tribute'&&side==='p'){
      if(tribSel.includes(uid))rmTrib(uid);else if(tribSel.length<needN)addTrib(uid);
      view.renderAll();AUDIO.sfx.click();return}
    if(mode==='rage'&&side==='p'){const i=pendIdx;resetMode();castPlayer(i,uid);return}
    if(mode==='skillT'&&side==='p'){
      S.p.skill=true;applySkill('p',uid);AUDIO.sfx.skill();
      const el=getEl(uid);if(el){const p=FX.centerOf(el);FX.burst(p.x,p.y,'#ffd23f',24,6)}
      resetMode();view.renderAll();return}
    if(mode==='attacker'&&side==='o'){battle('p',selA,uid);return}
    if(side==='p'&&phase==='battle'){
      const slot=S.p.field.find(m=>m.uid===uid);if(!slot)return;
      if(slot.pos==='def'){FX.toast('🛡 الوحوش الدفاعية لا تهاجم');AUDIO.sfx.err();return}
      if(slot.attacked){FX.toast('⚠ هاجم بالفعل هذا الدور');AUDIO.sfx.err();return}
      selA=uid;mode='attacker';view.renderAll();AUDIO.sfx.click();FX.msg('🎯 اختر هدفًا أحمر — أو هجومًا مباشرًا')}
  }
  function rmTrib(uid){tribSel=tribSel.filter(u=>u!==uid)}
})();
