'use strict';
window.UI = (function(){
  const $=id=>document.getElementById(id);
  const CARDS=DATA.CARDS, DECKS=DATA.DECKS, CHARS=DATA.CHARS;
  function faceHtml(c){
    return '<div class="cname">'+c.n+'</div><div class="cart"><span>'+c.ic+'</span></div>'+
      (c.t==='m'
        ?'<div class="lvs">'+'✦'.repeat(c.lv)+'</div><div class="stats"><i class="atk">⚔'+c.atk+'</i><i class="def">🛡'+c.def+'</i></div>'
        :'<div class="stats"><i class="'+(c.t==='s'?'spl':'trp')+'">'+(c.t==='s'?'🌀 تعويذة':'🪤 فخ')+'</i></div><div class="stxt">'+c.tx+'</div>');
  }
  function monEl(slot,side){
    const c=CARDS[slot.cid];
    const hidden=side==='o'&&!slot.faceup;
    let cls='card a-'+c.a+' r'+Math.min(7,c.lv);
    if(hidden)cls+=' back';
    if(slot.pos==='def')cls+=' def';
    const G=GAME;
    if(G.mode==='attacker'&&G.selA===slot.uid)cls+=' sel';
    if(G.mode==='attacker'&&side==='o')cls+=' targetable';
    if(G.mode==='tribute'&&side==='p')cls+=' targetable';
    if(G.mode==='tribute'&&side==='p'&&G.tribSel.includes(slot.uid))cls+=' tribSel';
    if((G.mode==='rage'||G.mode==='skillT')&&side==='p')cls+=' targetable';
    if(G.turn==='p'&&side==='p'&&G.phase==='battle'&&!G.busy&&slot.pos==='atk'&&!slot.attacked)cls+=' ready';
    let buffs='';if(slot.atkB>0)buffs+='<span class="buff">+'+slot.atkB+'⚔</span>';
    return '<div class="'+cls+'" data-uid="'+slot.uid+'" data-side="'+side+'" data-cid="'+slot.cid+'"><div class="cframe">'+(hidden?'':faceHtml(c))+'</div>'+buffs+'</div>';
  }
  function splEl(st,side){
    const hidden=side==='o';
    const cls='card '+(hidden?'back trapGlow':'a-trap setGlow');
    return '<div class="'+cls+'" data-uid="'+st.uid+'" data-side="'+side+'" data-cid="'+(hidden?'':st.cid)+'"><div class="cframe">'+(hidden?'':faceHtml(CARDS[st.cid]))+'</div></div>';
  }
  function renderField(){
    const S=GAME.S;if(!S)return;
    const row=(el,arr,side,fn)=>{let h='';for(let i=0;i<3;i++)h+='<div class="slot">'+(arr[i]?fn(arr[i],side):'')+'</div>';el.innerHTML=h};
    row($('oMrow'),S.o.field,'o',monEl);row($('pMrow'),S.p.field,'p',monEl);
    row($('oSrow'),S.o.spells,'o',splEl);row($('pSrow'),S.p.spells,'p',splEl);
  }
  function renderHand(){
    const S=GAME.S;if(!S)return;
    $('hand').innerHTML=S.p.hand.map((cid,i)=>{const c=CARDS[cid];
      let can=GAME.turn==='p'&&!GAME.busy&&GAME.phase==='main'&&(c.t!=='m'||true);
      return '<div class="card a-'+c.a+' r'+Math.min(7,c.lv||3)+' drawn '+(can?'can':'')+' '+(GAME.mode==='discard'?'targetable':'')+'" data-hi="'+i+'" data-cid="'+cid+'"><div class="cframe">'+faceHtml(c)+'</div></div>'}).join('');
  }
  function tweenNum(el,to){const from=+el.dataset.v||0;el.dataset.v=to;const t0=performance.now();
    (function f(n){const k=Math.min(1,(n-t0)/550);el.textContent=Math.round(from+(to-from)*k);if(k<1)requestAnimationFrame(f)})(t0)}
  function renderInfo(){
    const S=GAME.S;if(!S)return;
    tweenNum($('pLP'),Math.max(0,S.p.lp));tweenNum($('oLP'),Math.max(0,S.o.lp));
    $('pFill').style.width=Math.max(0,Math.min(100,S.p.lp/4000*100))+'%';
    $('oFill').style.width=Math.max(0,Math.min(100,S.o.lp/4000*100))+'%';
    $('pDeck').textContent=S.p.deck.length;$('oDeck').textContent=S.o.deck.length;
    $('pGy').textContent=S.p.gy;$('oGy').textContent=S.o.gy;$('oHandN').textContent=S.o.hand.length;
    $('turnLbl').textContent=GAME.over?'—':(GAME.turn==='p'?'⭐ دورك — الجولة '+Math.max(1,S.p.gy===0&&S.o.gy===0?1:0+ (window.__tn=(window.__tn||0))) :'👺 دور الخصم…');
    const tr=GAME.mode==='tribute';
    $('trHint').classList.toggle('hidden',!tr);
    if(tr)$('trHint').textContent='اختر '+GAME.needN+' تضحية ('+GAME.tribSel.length+'/'+GAME.needN+')';
    $('bTrOk').classList.toggle('hidden',!tr);$('bTrOk').disabled=GAME.tribSel.length!==GAME.needN;
    $('bTrCancel').classList.toggle('hidden',!tr);
    $('bSumA').classList.toggle('hidden',GAME.pending==null);$('bSumD').classList.toggle('hidden',GAME.pending==null);$('bSumC').classList.toggle('hidden',GAME.pending==null);
    $('bSkill').classList.toggle('hidden',!GAME.skillReady());
    if(GAME.myChar)$('bSkill').textContent=GAME.myChar.skill.icon+' '+GAME.myChar.skill.name;
    $('bBattle').classList.toggle('hidden',!(GAME.turn==='p'&&GAME.phase==='main'&&!GAME.busy)||tr||GAME.pending!=null);
    $('bBattle').disabled=GAME.busy||!S.p.field.some(m=>m.pos==='atk'&&!m.attacked);
    $('bEnd').classList.toggle('hidden',!(GAME.turn==='p'&&!GAME.busy)||tr||GAME.pending!=null);
    $('bCancel').classList.toggle('hidden',GAME.mode!=='attacker');
    $('aDirect').classList.toggle('hidden',GAME.mode!=='attacker');
    $('aDirect').disabled=S.o.field.length>0;
    $('bSurr').classList.toggle('hidden',GAME.turn!=='p'||tr||GAME.pending!=null);
  }
  function renderAll(){renderField();renderHand();renderInfo()}
  function setupAvatars(mc,fc){
    $('pAva').textContent=mc.ava;$('pAva').style.setProperty('--ac',mc.col);$('pName').textContent=mc.name;
    $('oAva').textContent=fc.ava;$('oAva').style.setProperty('--ac',fc.col);$('oName').textContent=fc.name;
  }
  function hurtBar(side){const w=$(side==='p'?'pBar':'oBar').querySelector('.lpwrap');w.classList.remove('hurt');void w.offsetWidth;w.classList.add('hurt')}
  function hitAva(side){const a=$(side==='p'?'pAva':'oAva');a.classList.remove('hit');void a.offsetWidth;a.classList.add('hit')}
  function hurtFlash(){$('hurtV').style.opacity=1;setTimeout(()=>$('hurtV').style.opacity=0,420)}
  function speedLines(on){$('speedLines')&&($('speedLines').style.opacity=on?1:0)}
  function showEnd(win,rank,sc,reason,foeName){
    const et=$('endTitle');et.textContent=win?'🏆 النصر!':'💀 الهزيمة';
    et.className='end-title '+(win?'win':'lose');
    $('scrEnd').classList.toggle('win',win);
    const rl=$('rankL');rl.textContent=rank;rl.className='rankL '+rank;
    $('rankStars').textContent=rank==='A'?'✦✦✦':rank==='B'?'✦✦':'✦';
    $('endStats').innerHTML=
      '<span class="chip">💚 نقاطك: '+Math.max(0,GAME.lpP)+'</span>'+
      '<span class="chip">📚 أوراق متبقية: '+GAME.deckP+'</span>'+
      '<span class="chip">⚔ ضررك: '+GAME.pDmg+'</span>'+
      '<span class="chip">🧮 النتيجة: '+sc+'</span>';
    $('endSub').textContent=(reason||'')+' — هزمت '+foeName;
    showScreen('scrEnd',true);
  }
  function showScreen(id,keep){document.querySelectorAll('.screen').forEach(s=>{if(!keep||s.id!==id)s.classList.remove('show')});$(id).classList.add('show')}
  function showZoom(el){
    if(!el||!el.dataset.cid){$('zoom').classList.remove('show');return}
    const c=CARDS[el.dataset.cid];if(!c)return;
    const hidden=el.classList.contains('back');
    $('zoomCard').innerHTML=hidden
      ?'<div class="card back" style="--cw:min(180px,23vh)"><div class="cframe"></div></div>'
      :'<div class="card a-'+c.a+' r'+Math.min(7,c.lv||3)+'" style="--cw:min(180px,23vh)"><div class="cframe">'+faceHtml(c)+'</div></div>';
    $('zoomTxt').textContent=(c.tx||'')+(c.t==='m'?' • مستوى '+c.lv:'');
    $('zoom').classList.add('show');
  }
  return {faceHtml,renderField,renderHand,renderInfo,renderAll,setupAvatars,hurtBar,hitAva,hurtFlash,speedLines,showEnd,showScreen,showZoom};
})();
