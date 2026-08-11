'use strict';
window.DATA = (function(){
  const CARDS = {
    wisp:{n:'ومضة النور',t:'m',a:'light',lv:1,atk:400,def:300,ic:'✨',tx:'شرارة صغيرة من الفجر.'},
    imp:{n:'عفريت الرماد',t:'m',a:'fire',lv:2,atk:700,def:500,ic:'👺',tx:'شقيّ لا يُطفأ.'},
    guard:{n:'جني الترس',t:'m',a:'light',lv:2,atk:500,def:1000,ic:'🛡️',tx:'حارس صغير بقلب كبير.'},
    knight:{n:'فارس الفجر',t:'m',a:'light',lv:3,atk:1300,def:900,ic:'⚔️',tx:'سيفه أول ما يلمع صباحًا.'},
    witch:{n:'ساحرة الغسق',t:'m',a:'dark',lv:3,atk:1200,def:1100,ic:'🔮',fx:'flipdraw',tx:'🔄 عند الكشف: اسحب بطاقة.'},
    wolf:{n:'ذئب الجمر',t:'m',a:'fire',lv:3,atk:1500,def:700,ic:'🐺',fx:'vamp',tx:'🩸 يداويك بقدر ضرر المعركة.'},
    raptor:{n:'رابتور الظل',t:'m',a:'dark',lv:3,atk:1400,def:800,ic:'🦖',tx:'يصطاد في العتمة.'},
    monk:{n:'راهب الصخر',t:'m',a:'earth',lv:4,atk:1100,def:1800,ic:'🗿',tx:'تأملٌ لا يتزحزح.'},
    seraph:{n:'سراف الفجر',t:'m',a:'light',lv:4,atk:1500,def:1200,ic:'👼',fx:'heal800',tx:'عند الاستدعاء: +800 نقطة حياة.'},
    assassin:{n:'القاتل الصامت',t:'m',a:'dark',lv:4,atk:1700,def:900,ic:'🗡️',fx:'pierce',tx:'🗡 ثاقب: يخترق الدفاع.'},
    djinn:{n:'جني اللهب',t:'m',a:'fire',lv:4,atk:1800,def:1000,ic:'🔥',tx:'نار تسكن قمقمًا.'},
    golemK:{n:'عملاق السبج',t:'m',a:'earth',lv:5,atk:2000,def:1600,ic:'🌋',tx:'يتطلب تضحية لاستدعائه.'},
    phoenix:{n:'طائر الشمس',t:'m',a:'fire',lv:5,atk:2100,def:1200,ic:'🦅',fx:'pierce',tx:'🗡 ثاقب — جناحان من لهب.'},
    wraith:{n:'شبح الليل',t:'m',a:'dark',lv:5,atk:1900,def:1500,ic:'👻',fx:'recov',tx:'♻ إذا دُمّر: يعود إلى يدك.'},
    leader:{n:'قائد الطليعة',t:'m',a:'light',lv:5,atk:1900,def:1400,ic:'🎖️',fx:'aura',tx:'⚜ وحوشك الأخرى +300 هجوم.'},
    cometD:{n:'تنين الشهاب',t:'m',a:'fire',lv:6,atk:2300,def:1600,ic:'🐉',fx:'pierce',tx:'🗡 ثاقب — ذيله مذنب.'},
    solD:{n:'تنين الفجر المشع',t:'m',a:'light',lv:7,atk:2500,def:2000,ic:'🐲',tx:'إمبراطور الضوء. يتطلب ضحيتين.'},
    nightL:{n:'سيد الليل السحيق',t:'m',a:'dark',lv:7,atk:2450,def:2100,ic:'🌑',fx:'venge',tx:'💢 إذا دُمّر: 800 ضرر للخصم.'},
    heal:{n:'ضوء الشفاء',t:'s',a:'spl',ic:'💫',fx:'heal',tx:'استعد 1000 نقطة حياة.'},
    bolt:{n:'حكم السماء',t:'s',a:'spl',ic:'⚡',fx:'bolt',tx:'دمّر أقوى وحش مكشوف لدى الخصم.'},
    rage:{n:'صرخة المعركة',t:'s',a:'spl',ic:'🧪',fx:'rage',tx:'وحش لك يحصل +700 هجوم دائمًا.'},
    greed:{n:'كأس الطمع',t:'s',a:'spl',ic:'🏆',fx:'greed',tx:'اسحب بطاقتين.'},
    fire:{n:'نيران الجحيم',t:'s',a:'spl',ic:'☄️',fx:'fire',tx:'800 ضرر مباشر للخصم.'},
    wall:{n:'المعقل',t:'s',a:'spl',ic:'🧱',fx:'wall',tx:'وحوشك كلها +500 دفاع.'},
    t_mirror:{n:'الحجاب المرآتي',t:'t',a:'trap',ic:'🪞',fx:'t_mirror',tx:'عند إعلان هجوم: أبطله وأنهِ مرحلة القتال.'},
    t_spike:{n:'خاتم الأشواك',t:'t',a:'trap',ic:'💍',fx:'t_spike',tx:'عند إعلان هجوم: المهاجم -1200 هجوم.'},
    t_drain:{n:'سلسلة الأرواح',t:'t',a:'trap',ic:'⛓️',fx:'t_drain',tx:'عند استدعاء وحش (1500+): دمّره.'}
  };
  const DECKS = {
    light:['wisp','wisp','guard','guard','knight','knight','seraph','seraph','leader','golemK','monk','solD','rage','heal','greed','bolt','wall','t_mirror','t_drain','heal'],
    dark:['imp','imp','raptor','raptor','witch','witch','witch','monk','monk','assassin','assassin','wraith','wraith','nightL','greed','bolt','rage','fire','t_spike','t_drain'],
    fire:['wisp','imp','imp','wolf','wolf','djinn','djinn','monk','knight','phoenix','cometD','fire','fire','heal','greed','rage','t_spike','t_mirror','wall','djinn']
  };
  const CHARS = {
    light:{name:'كايتو · أمير الفجر',ava:'🌅',col:'#ffd23f',deck:'light',
      skill:{name:'قلب الفجر',icon:'🌅',desc:'عندما تكون نقاطك ≤ 1500: وحش لك +800 هجوم',cond:me=>me.lp<=1500,needTarget:'skillT'}},
    dark:{name:'مارا · ساحرة الغسق',ava:'🌙',col:'#b18cff',deck:'dark',
      skill:{name:'وشاء الليل',icon:'🌙',desc:'تخلص من بطاقة من يدك لتسحب بطاقتين',cond:me=>me.hand.length>=1,needTarget:'discard'}},
    fire:{name:'ريكس · ملك الرمال',ava:'🔥',col:'#ff8c4d',deck:'fire',
      skill:{name:'عزم اللهب',icon:'🔥',desc:'عندما تكون نقاطك ≤ 1200: 600 ضرر للخصم و+600 لك',cond:me=>me.lp<=1200,needTarget:null}}
  };
  return {CARDS, DECKS, CHARS};
})();
