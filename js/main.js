'use strict';
(function(){
  const $=id=>document.getElementById(id);
  GAME.view=UI;

  // شرارات خلفية
  for(let i=0;i<10;i++){const m=document.createElement('div');m.className='mote';
    m.style.cssText='left:'+(Math.random()*100)+'vw;width:'+(3+Math.random()*4)+'px;height:'+(3+Math.random()*4)+'px;animation-duration:'+(9+Math.random()*14)+'s;animation-delay:-'+(Math.random()*20)+'s';
    document.body.appendChild(m)}
  // خطوط سرعة
  const sl=document.createElement('div');sl.id='speedLines';document.body.appendChild(sl);

  // إعدادات محفوظة
  try{
    if(localStorage.getItem('dr_snd')==='0')$('tSnd').classList.remove('on');
    if(localStorage.getItem('dr_fast')==='1')$('tFast').classList.add('on');
  }catch(e){}
  $('winsC').textContent=localStorage.getItem('dr_wins')||0;
  $('tSnd').onclick=function(){this.classList.toggle('on');localStorage.setItem('dr_snd',this.classList.contains('on')?'1':'0');AUDIO.init();AUDIO.sfx.click()};
  $('tFast').onclick=function(){this.classList.toggle('on');localStorage.setItem('dr_fast',this.classList.contains('on')?'1':'0');AUDIO.init();AUDIO.sfx.click()};

  // بطاقات العنوان
  $('titleCards').innerHTML=['solD','cometD','nightL'].map(id=>{const c=DATA.CARDS[id];
    return '<div class="card a-'+c.a+' r7"><div class="cframe">'+UI.faceHtml(c)+'</div></div>'}).join('');

  // شبكة الشخصيات
  $('charGrid').innerHTML=Object.entries(DATA.CHARS).map(([id,ch])=>{
    const ms=DATA.DECKS[ch.deck].filter(c=>DATA.CARDS[c].t==='m').sort((a,b)=>DATA.CARDS[b].atk-DATA.CARDS[a].atk);
    const fan=[ms[0],ms[2],ms[4]].map(cid=>'<div class="card a-'+DATA.CARDS[cid].a+' r'+Math.min(7,DATA.CARDS[cid].lv)+'"><div class="cframe">'+UI.faceHtml(DATA.CARDS[cid])+'</div></div>').join('');
    return '<div class="charC" style="--cc:'+ch.col+'" data-ch="'+id+'">'+
      '<div class="por">'+ch.ava+'</div><h3>'+ch.name+'</h3>'+
      '<div class="sk">✨ '+ch.skill.name+': '+ch.skill.desc+'</div>'+
      '<div class="fan">'+fan+'</div></div>'}).join('');
  document.querySelectorAll('.charC').forEach(c=>c.onclick=()=>{AUDIO.init();AUDIO.sfx.click();UI.showScreen('scrDuel');GAME.newGame(c.dataset.ch)});

  // المجموعة
  $('collGrid').innerHTML=Object.values(DATA.CARDS).map(c=>
    '<div><div class="card a-'+c.a+' r'+Math.min(7,c.lv||3)+'"><div class="cframe">'+UI.faceHtml(c)+'</div></div><div class="cc">'+c.tx+'</div></div>').join('');

  // تنقل
  document.addEventListener('click',e=>{
    const back=e.target.closest('[data-back]');
    if(back){AUDIO.sfx.click();UI.showScreen(back.dataset.back);return}
    const el=e.target.closest('[data-uid],[data-hi]');
    if(el&&$('scrDuel').classList.contains('show'))handleCardEl(el);
  });
  function handleCardEl(el){
    // تمرير إلى محرك اللعبة عبر واجهة عامة
    GAME.handleCardPublic&&GAME.handleCardPublic(el);
  }
  // ربط إدخال اللاعب بالمحرك
  GAME.handleCardPublic=function(el){
    if(GAME.over||GAME.busy||GAME.turn!=='p')return;
    const hi=el.dataset.hi;
    if(hi!=null){GAME.handClickPublic&&GAME.handClickPublic(+hi);return}
    GAME.fieldClickPublic&&GAME.fieldClickPublic(+el.dataset.uid,el.dataset.side);
  };

  $('bToSelect').onclick=()=>{AUDIO.init();AUDIO.sfx.click();UI.showScreen('scrSelect')};
  $('bHelp').onclick=()=>{AUDIO.init();AUDIO.sfx.click();UI.showScreen('scrHelp')};
  $('bColl').onclick=()=>{AUDIO.init();AUDIO.sfx.click();UI.showScreen('scrColl')};
  $('bBackT').onclick=()=>{AUDIO.sfx.click();UI.showScreen('scrTitle')};
  $('bAgain').onclick=()=>{AUDIO.sfx.click();UI.showScreen('scrDuel');GAME.newGame(Object.keys(DATA.CHARS).find(k=>DATA.CHARS[k]===GAME.myChar))};
  $('bTitle2').onclick=()=>{AUDIO.sfx.click();UI.showScreen('scrTitle')};

  // أزرار المبارزة
  $('bBattle').onclick=()=>GAME.toBattle();
  $('bEnd').onclick=()=>GAME.endPlayerTurn();
  $('bSkill').onclick=()=>GAME.useSkill();
  $('bSumA').onclick=()=>{if(GAME.pending!=null)GAME.doSummon(GAME.pending,'atk')};
  $('bSumD').onclick=()=>{if(GAME.pending!=null)GAME.doSummon(GAME.pending,'def')};
  $('bSumC').onclick=()=>{GAME.setPending(null);UI.renderInfo();AUDIO.sfx.click()};
  $('bCancel').onclick=()=>{GAME.resetMode();UI.renderAll();AUDIO.sfx.click()};
  $('aDirect').onclick=()=>{if(GAME.mode==='attacker')GAME.battle('p',GAME.selA,null)};
  $('bTrOk').onclick=()=>{if(GAME.tribSel.length===GAME.needN&&GAME.pendIdxPublic!=null)GAME.doSummon(GAME.pendIdxPublic,'atk')};
  $('bTrCancel').onclick=()=>{GAME.resetMode();UI.renderAll();AUDIO.sfx.click()};
  $('bSurr').onclick=async()=>{if(GAME.over)return;
    if(await FX.ask('🏳 استسلام','هل تريد الاستسلام فعلًا؟',5000)){/* force lose */ GAME.forceLose&&GAME.forceLose()}};

  // لوحة المفاتيح
  addEventListener('keydown',e=>{
    if(e.code==='Escape'){GAME.resetMode();if($('scrDuel').classList.contains('show'))UI.renderAll()}
    if(e.code==='KeyB'&&GAME.turn==='p'&&GAME.phase==='main'&&!GAME.busy&&!GAME.over)GAME.toBattle();
    if(e.code==='KeyE')GAME.endPlayerTurn();
  });

  // تكبير البطاقات
  document.addEventListener('mouseover',e=>{
    const el=e.target.closest('[data-cid]');
    UI.showZoom(el);
  });
  document.addEventListener('mouseout',e=>{if(e.target.closest('[data-cid]'))$('zoom').classList.remove('show')});

  document.addEventListener('pointerdown',()=>AUDIO.init());
})();
