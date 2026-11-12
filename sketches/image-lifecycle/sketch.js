// מה קורה לתמונה שלך? · מחזור החיים של דימוי
// p5.js sketch (global mode). Builds its own page layout, then runs setup()/draw().
// Works both inside the p5-gallery runner and standalone (index.html in this folder).
// The photo is processed in the browser only and is never uploaded anywhere.

(function buildPage(){
  const f=document.createElement('link');f.rel='stylesheet';
  f.href='https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700;800&display=swap';
  document.head.appendChild(f);
  const st=document.createElement('style');st.textContent="\n:root{--paper:#f2efe8;--ink:#151515;--grey:#5b5852;--line:#d9d3c7;--red:#c8102e}\n*{box-sizing:border-box}\nbody{margin:0;background:var(--paper)}\n#lifecycle{color:var(--ink);font-family:Heebo,Arial,sans-serif;text-align:right;width:min(1180px,100%);margin:0 auto}\n.wrap{padding:22px 18px 40px}\nheader{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:14px;border-bottom:2px solid var(--ink);padding-bottom:14px}\nh1{margin:0;font-size:clamp(28px,4.4vw,48px);line-height:1.05;font-weight:800;letter-spacing:-.5px}\n.sub{margin:6px 0 0;color:var(--grey);font-size:15px;max-width:620px}\n.ctrls{display:flex;flex-wrap:wrap;gap:8px}\n.btn{font:500 15px Heebo,Arial,sans-serif;min-height:44px;padding:0 16px;border:1.5px solid var(--ink);background:transparent;color:var(--ink);border-radius:999px;cursor:pointer;display:inline-flex;align-items:center;gap:8px}\n.btn.primary{background:var(--ink);color:var(--paper)}\n.btn:focus-visible{outline:3px solid var(--red);outline-offset:2px}\n.btn input{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}\n.chips{display:flex;gap:6px;overflow-x:auto;padding:14px 0 10px;scrollbar-width:none}\n.chip{flex:0 0 auto;font:500 13px Heebo,Arial;min-height:36px;padding:0 12px;border-radius:999px;border:1.5px solid var(--c);background:transparent;color:var(--ink);cursor:pointer;display:flex;align-items:center;gap:6px}\n.chip b{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:var(--f);border:1.5px solid var(--c);font-size:11px}\n.chip.on{background:var(--f)}\n#stage{width:100%;border:1.5px solid var(--ink);background:var(--paper);position:relative;touch-action:manipulation}\n#stage canvas{display:block;margin:0!important;box-shadow:none!important}\n.info{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr) minmax(0,.9fr);gap:22px;padding:16px 2px 0}\n.info h2{margin:0 0 4px;font-size:24px;display:flex;align-items:center;gap:10px}\n.dot{width:16px;height:16px;border-radius:50%;border:2px solid;flex:0 0 auto}\n.info h3{margin:0 0 4px;font-size:13px;color:var(--grey);font-weight:500}\n.info p{margin:0;font-size:16px;line-height:1.5}\n.badges{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}\n.badge{font-size:12px;border:1.5px solid;border-radius:999px;padding:2px 9px}\n#result{display:none;margin-top:26px;border-top:2px solid var(--ink);padding-top:18px}\n#result .pair{display:grid;grid-template-columns:1fr 1fr;gap:16px}\n#result figure{margin:0}\n#result img{width:100%;display:block;border:1.5px solid var(--ink);background:#fff}\n#result figcaption{font-size:14px;color:var(--grey);margin-top:6px}\n#result h2{margin:0 0 6px;font-size:28px}\n#result p{font-size:16px;margin:0 0 14px;max-width:760px;line-height:1.5}\nfooter{margin-top:28px;font-size:12px;color:var(--grey);border-top:1px solid var(--line);padding-top:10px}\n@media (max-width:760px){.info{grid-template-columns:1fr;gap:14px}header{align-items:flex-start}}\n";document.head.appendChild(st);
  const root=document.createElement('div');root.id='lifecycle';root.dir='rtl';root.lang='he';
  root.innerHTML="<div class=\"wrap\">\n<header>\n  <div>\n    <h1>מה קורה לתמונה שלך?</h1>\n    <p class=\"sub\">צלמו או העלו תמונה, וצפו בה עוברת את שבע התחנות של מחזור החיים של דימוי: מהצילום ועד שהיא הופכת לזיכרון.</p>\n  </div>\n  <div class=\"ctrls\">\n    <label class=\"btn primary\" id=\"shoot\">צילום או העלאת תמונה<input id=\"file\" type=\"file\" accept=\"image/*\" capture=\"environment\"></label>\n    <button class=\"btn\" id=\"sample\" type=\"button\">תמונה לדוגמה</button>\n    <button class=\"btn\" id=\"play\" type=\"button\">הפעלה</button>\n    <button class=\"btn\" id=\"restart\" type=\"button\">מההתחלה</button>\n  </div>\n</header>\n<nav class=\"chips\" id=\"chips\" aria-label=\"תחנות\"></nav>\n<div id=\"stage\"></div>\n<section class=\"info\" aria-live=\"polite\">\n  <div><h2 id=\"iTitle\"><span class=\"dot\" id=\"iDot\"></span><span id=\"iName\"></span></h2><p id=\"iWhat\"></p><div class=\"badges\" id=\"iBadges\"></div></div>\n  <div><h3>מה יכול להשתבש</h3><p id=\"iWrong\"></p></div>\n  <div><h3>התיאוריה</h3><p id=\"iTheory\"></p></div>\n</section>\n<section id=\"result\">\n  <h2>מה נשאר בסוף</h2>\n  <p>הזיכרון שנשמר שלם, חלק ומשכנע יותר מהמקור, ופחות קשור אליו. הסכנה היא לא שהזיכרון ייעלם, אלא שייווצר זיכרון מסודר שאיש כבר לא יכול לאמת. בטלפון אפשר ללחוץ לחיצה ארוכה על תמונה כדי לשמור אותה.</p>\n  <div class=\"pair\">\n    <figure><img id=\"rOrig\" alt=\"התמונה המקורית\"><figcaption>המקור, ברגע הצילום</figcaption></figure>\n    <figure><img id=\"rMem\" alt=\"הגרסה שנשמרה כזיכרון\"><figcaption>הזיכרון, אחרי שבע תחנות</figcaption></figure>\n  </div>\n</section>\n<footer>התמונה מעובדת בדפדפן בלבד ולא נשלחת לשום מקום · התהליך מומחש ומבוסס על המחקר, וההדמיה עצמה היא פרשנות שלנו · מחקר תקשורתי, מעבדה שיתופית 01, HIT</footer>\n</div>";
  document.body.appendChild(root);
})();

const ST=[
 {n:'צילום',f:'#d6e6ff',c:'#305bab',b:['1'],
  w:'המצלמה בטלפון כבר מעבדת את התמונה: מחדדת, מגבירה צבע, מחליקה. עוד לפני שמישהו ראה אותה, אלגוריתם החליט איך היא תיראה.',
  x:'רק מה שנכנס לפריים קיים. עריכת AI מובנית במצלמה. בלי מטא־דאטה אין עדות.',
  t:'1 · עדות מתווכת (פרוש ופינצ׳בסקי, 2009): המסך הופך את הצופה לעד, והמדיה קובעת מה נחשב עדות.'},
 {n:'העלאה והפצה',f:'#fff3b0',c:'#af7e04',b:[],
  w:'הפלטפורמה דוחסת את הקובץ שוב ושוב ומוחקת את המטא־דאטה: מתי, איפה ובאיזה מכשיר צולם.',
  x:'צילום ישן ממוחזר כחדש. ההקשר נחתך בשיתוף. זיוף AI נראה כמו אמיתי.',
  t:'השלב שבו העדות מתנתקת מהמקור שלה: מה שנשאר הוא הפיקסלים, לא ההקשר.'},
 {n:'הגברה',f:'#fff3b0',c:'#af7e04',b:['2'],
  w:'התמונה משוכפלת אלפי פעמים: צילומי מסך, חיתוכים, כיתובים חדשים. האלגוריתם מקדם את מה שמעורר רגש.',
  x:'רגש מנצח דיוק. במחקר של MIT, שקר הגיע ל־1,500 איש פי שישה מהר יותר מאמת.',
  t:'2 · ציבורים רגשיים (פאפאכריסי, 2015): ברשת הציבור מתגבש סביב רגש, לא סביב עובדה.'},
 {n:'מסגור בכל צד',f:'#e8e1ff',c:'#6631d7',b:['3','4'],
  w:'הענף מתפצל. כל צד חותך את התמונה אחרת, צובע אותה אחרת ונותן לה כיתוב אחר. אותה תמונה, שני סיפורים.',
  x:'כל צד רואה פיד אחר. עיתונות מגויסת וצנזורה בוחרות מה ייכנס למסגרת.',
  t:'3 · קביעת סדר יום ומסגור (מקומבס ושו; אנטמן) · 4 · בועות סינון (פריזר, 2011).'},
 {n:'בדיקה והכחשה',f:'#ffdedb',c:'#bd0a0a',b:['5'],
  w:'משתמשים מבקשים מצ׳אטבוט לבדוק. כל פעם מתקבלת תשובה אחרת, ובסוף נשארת הטענה ״זה AI״.',
  x:'התיקון מגיע מאוחר. צ׳אטבוט טועה בבדיקה. ״זה AI״ הופך להגנה גם מפני תמונה אמיתית.',
  t:'5 · דיבידנד השקרן (צ׳סני וסיטרון, 2019): כשאפשר לזייף הכל, אפשר גם להכחיש את האמיתי.'},
 {n:'ארכוב או מחיקה',f:'#d2f4de',c:'#067429',b:['6'],
  w:'הפוסט המקורי נמחק, קישורים נשברים, מסנן אוטומטי מסיר חלקים. מה שנשאר מגיע באיכות נמוכה ועם חורים.',
  x:'פוסטים נמחקים וחשבונות נסגרים. מסנן אוטומטי מוחק עדויות. קישורים נרקבים.',
  t:'6 · זיכרון מדיה (נייגר, מאיירס וזנדברג, 2011): התקשורת מכריעה מה יישאר.'},
 {n:'זיכרון',f:'#1a1a1a',c:'#1a1a1a',b:['7','★'],
  w:'מערכת AI משלימה את החורים. התמונה נראית שלמה, חלקה ומשכנעת מתמיד, וקשורה פחות ממתמיד למה שצולם.',
  x:'נזכר מה שעולה בחיפוש. סיכום AI במקום המקור. והזיכרון ממסגר את האירוע הבא.',
  t:'7 · התפנית המחוברת (הוסקינס, 2011) · ★ קביעת סדר יום של זיכרון (קליגלר־וילנצ׳יק): מי ששולט במה שתועד, קובע מה ייזכר.'}
];
const PAPER='#f2efe8',INK='#151515',RED='#c8102e',GREY='#5b5852';
const UNIT=5.2, DW=0.74;
let P=0, playing=false, S=null, prevT=0, done=false, rng;

/* ---------- image utilities ---------- */
function cv(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c}
function fromImg(img,max){const k=Math.min(1,max/Math.max(img.width,img.height));const c=cv(Math.round(img.width*k),Math.round(img.height*k));c.getContext('2d').drawImage(img,0,0,c.width,c.height);return c}
function dup(s){const c=cv(s.width,s.height);c.getContext('2d').drawImage(s,0,0);return c}
function scaleSmooth(s,k){const t=cv(Math.max(2,Math.round(s.width*k)),Math.max(2,Math.round(s.height*k)));const x=t.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(s,0,0,t.width,t.height);const o=cv(s.width,s.height);const y=o.getContext('2d');y.imageSmoothingEnabled=true;y.imageSmoothingQuality='high';y.drawImage(t,0,0,o.width,o.height);return o}
function eachPx(c,fn){const x=c.getContext('2d');const d=x.getImageData(0,0,c.width,c.height);const a=d.data;for(let i=0;i<a.length;i+=4){fn(a,i)}x.putImageData(d,0,0);return c}
function grade(s,sat,con,mul,add){const c=dup(s);return eachPx(c,(a,i)=>{let r=a[i],g=a[i+1],b=a[i+2];const l=.299*r+.587*g+.114*b;r=l+(r-l)*sat;g=l+(g-l)*sat;b=l+(b-l)*sat;r=(r-128)*con+128;g=(g-128)*con+128;b=(b-128)*con+128;a[i]=r*mul[0]+add[0];a[i+1]=g*mul[1]+add[1];a[i+2]=b*mul[2]+add[2]})}
function pixelate(s,block){const k=1/block;const t=cv(Math.max(2,Math.round(s.width*k)),Math.max(2,Math.round(s.height*k)));t.getContext('2d').drawImage(s,0,0,t.width,t.height);const o=cv(s.width,s.height);const y=o.getContext('2d');y.imageSmoothingEnabled=false;y.drawImage(t,0,0,o.width,o.height);return o}
function loadURL(u){return new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=u})}
async function jpegLoss(s,times,q){let c=s;for(let k=0;k<times;k++){const sh=k%2?0.82:1;const t=cv(Math.round(c.width*sh),Math.round(c.height*sh));t.getContext('2d').drawImage(c,0,0,t.width,t.height);const im=await loadURL(t.toDataURL('image/jpeg',q));const o=cv(s.width,s.height);o.getContext('2d').drawImage(im,0,0,o.width,o.height);c=o}return c}
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function crop(s,fx,fy,fw,fh){const c=cv(s.width,s.height);c.getContext('2d').drawImage(s,s.width*fx,s.height*fy,s.width*fw,s.height*fh,0,0,c.width,c.height);return c}

async function prepare(img){
  const src=fromImg(img,720);
  const s1=grade(scaleSmooth(src,0.7),1.35,1.12,[1,1,1],[4,2,0]);
  const s2=await jpegLoss(s1,7,0.12);
  const s4a=grade(crop(s2,0,0.08,0.68,0.84),1.25,1.18,[1.12,0.98,0.82],[10,0,-8]);
  const s4b=grade(crop(s2,0.32,0.08,0.68,0.84),0.75,1.1,[0.84,0.96,1.14],[-6,0,14]);
  const s6=pixelate(s2,Math.max(6,Math.round(s2.width/70)));
  const R=mulberry(11);const holes=[];
  for(let k=0;k<9;k++){const w=0.1+R()*0.22,h=0.08+R()*0.18;holes.push({x:R()*(1-w),y:R()*(1-h),w,h})}
  holes.sort((a,b)=>a.x-b.x);
  // s7: plausible synthetic completion
  const W=s6.width,H=s6.height;
  let avg=[0,0,0],n=0;eachPx(dup(s6),(a,i)=>{avg[0]+=a[i];avg[1]+=a[i+1];avg[2]+=a[i+2];n++});avg=avg.map(v=>v/n);
  const A=dup(s6);const ax=A.getContext('2d');ax.fillStyle=`rgb(${avg.map(Math.round).join(',')})`;holes.forEach(h=>ax.fillRect(h.x*W,h.y*H,h.w*W,h.h*H));
  const blurA=scaleSmooth(scaleSmooth(A,1/22),1/6);
  const s7=cv(W,H);const x=s7.getContext('2d');x.drawImage(blurA,0,0);
  x.save();x.beginPath();x.rect(0,0,W,H);holes.forEach(h=>x.rect(h.x*W,h.y*H,h.w*W,h.h*H));x.clip('evenodd');x.drawImage(s6,0,0);x.restore();
  const soft=scaleSmooth(s7,1/5);x.globalAlpha=0.6;x.drawImage(soft,0,0);x.globalAlpha=1;
  const s7g=grade(s7,1.18,1.06,[0.95,1.0,1.07],[4,6,10]);
  S={src,s1,s2,s4a,s4b,s6,s7:s7g,holes,seed:Math.random()*1e6|0};
  P=0;done=false;document.getElementById('result').style.display='none';
  setPlaying(true);updateInfo(0);
}

function sampleImage(){
  const c=cv(720,540),x=c.getContext('2d');
  const g=x.createLinearGradient(0,0,0,540);g.addColorStop(0,'#24324d');g.addColorStop(.55,'#c9845a');g.addColorStop(1,'#f0c48c');x.fillStyle=g;x.fillRect(0,0,720,540);
  x.fillStyle='rgba(255,236,200,.9)';x.beginPath();x.arc(520,300,46,0,7);x.fill();
  const R=mulberry(4);let px=0;
  while(px<720){const w=30+R()*70,h=90+R()*230;x.fillStyle=`rgb(${28+R()*20|0},${26+R()*18|0},${34+R()*20|0})`;x.fillRect(px,540-h-60,w,h+60);
    for(let wy=540-h-48;wy<470;wy+=16)for(let wx=px+6;wx<px+w-8;wx+=12)if(R()<.38){x.fillStyle=`rgba(255,${200+R()*40|0},120,${.5+R()*.5})`;x.fillRect(wx,wy,5,8)}
    px+=w+2}
  x.fillStyle='#14121a';x.fillRect(0,478,720,62);
  for(let k=0;k<6;k++){x.fillStyle='rgba(255,210,140,.85)';x.beginPath();x.arc(60+k*125,470,5,0,7);x.fill();x.fillStyle='#14121a';x.fillRect(58+k*125,470,4,30)}
  return c;
}

/* ---------- p5 ---------- */
function stageH(){const w=document.getElementById('stage').clientWidth;return w<700?Math.round(w*1.35):Math.round(Math.min(w*0.6,window.innerHeight*0.78))}
function setup(){const el=document.getElementById('stage');const c=createCanvas(el.clientWidth,stageH());c.parent('stage');pixelDensity(Math.min(2,window.devicePixelRatio||1));prevT=millis();
  const s=sampleImage();const im=new Image();im.onload=()=>prepare(im);im.src=s.toDataURL('image/png')}
function windowResized(){const el=document.getElementById('stage');resizeCanvas(el.clientWidth,stageH())}

function T(s,x,y,size,col,align='center',w=500,dir='rtl'){const c=drawingContext;c.save();c.direction=dir;c.font=`${w} ${size}px Heebo, Arial, sans-serif`;c.fillStyle=col;c.textAlign=align;c.textBaseline='middle';c.fillText(s,x,y);c.restore()}
function ease(u){return u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2}

function nodePos(i,br){const W=width,TH=treeH();const xs=[.92,.785,.65,.5,.35,.215,.08];const y=TH*0.5;let yy=y;if(i===3)yy=y+(br==='b'?1:-1)*TH*0.24;return{x:W*xs[i],y:yy}}
function treeH(){return Math.max(150,Math.min(210,height*0.3))}

function draw(){
  const now=millis();const dt=(now-prevT)/1000;prevT=now;
  if(playing&&S){P+=dt/UNIT;if(P>=6+DW){P=6+DW;setPlaying(false);finish()}}
  background(PAPER);
  drawTree();
  if(S){const c=drawingContext;c.save();c.beginPath();c.rect(0,treeH()+1,width,height-treeH()-1);c.clip();drawLens();c.restore()}else T('טוען…',width/2,height*0.6,20,GREY);
}

function curState(){const i=Math.min(6,Math.floor(P));const fr=P-i;if(fr<=DW||i===6)return{i,u:Math.min(1,fr/DW),travel:0};return{i,u:1,travel:(fr-DW)/(1-DW)}}

function drawTree(){
  const TH=treeH(),ctx=drawingContext;const r=Math.max(13,Math.min(22,width*0.019));
  stroke(INK);strokeWeight(2);noFill();
  const seg=(a,b)=>line(a.x,a.y,b.x,b.y);
  seg(nodePos(0),nodePos(1));seg(nodePos(1),nodePos(2));seg(nodePos(2),nodePos(3,'a'));seg(nodePos(2),nodePos(3,'b'));seg(nodePos(3,'a'),nodePos(4));seg(nodePos(3,'b'),nodePos(4));seg(nodePos(4),nodePos(5));seg(nodePos(5),nodePos(6));
  // loop memory -> framing
  ctx.save();ctx.setLineDash([5,6]);stroke('#8a857c');strokeWeight(1.6);const m=nodePos(6),f=nodePos(3,'a');bezier(m.x,m.y-r,m.x,TH*0.06,f.x,TH*0.06,f.x,f.y-r);ctx.restore();
  T('הזיכרון ממסגר את האירוע הבא',(m.x+f.x)/2,TH*0.1,Math.max(10,r*0.6),'#8a857c','center',400);
  const cs=curState();
  const nodes=[[0],[1],[2],[3,'a'],[3,'b'],[4],[5],[6]];
  nodes.forEach(([i,br])=>{const p=nodePos(i,br),s=ST[i];const act=cs.i===i;strokeWeight(act?4:2);stroke(s.c);fill(s.f);circle(p.x,p.y,r*2*(act?1.15:1));
    const lab=i===3?(br==='a'?'4א':'4ב'):String(i+1);
    T(lab,p.x,p.y+1,r*0.75,i===6?'#fff':INK,'center',700,i===3?'rtl':'ltr');
    if((i!==3||br==='b')&&(width>=700||act))T(s.n,p.x,(i===3?p.y:p.y)+r*1.85,Math.max(10,r*0.62),act?INK:GREY,'center',act?700:500)});
  // traveling thumbnail(s)
  if(!S)return;
  const thumbFor=i=>[S.s1,S.s2,S.s2,null,S.s2,S.s6,S.s7][i];
  const tw=r*2.4,th=r*1.8;
  const put=(img,p)=>{if(!img)return;ctx.save();ctx.translate(p.x,p.y-r*2.3);ctx.fillStyle='#fff';ctx.fillRect(-tw/2-3,-th/2-3,tw+6,th+6);ctx.drawImage(img,-tw/2,-th/2,tw,th);ctx.strokeStyle=INK;ctx.lineWidth=1.5;ctx.strokeRect(-tw/2-3,-th/2-3,tw+6,th+6);ctx.restore()};
  const lerpP=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});
  const e=ease(cs.travel);
  if(cs.i===2&&cs.travel>0){put(S.s4a,lerpP(nodePos(2),nodePos(3,'a'),e));put(S.s4b,lerpP(nodePos(2),nodePos(3,'b'),e))}
  else if(cs.i===3){if(cs.travel>0){put(S.s4a,lerpP(nodePos(3,'a'),nodePos(4),e));put(S.s4b,lerpP(nodePos(3,'b'),nodePos(4),e))}else{put(S.s4a,nodePos(3,'a'));put(S.s4b,nodePos(3,'b'))}}
  else{const a=nodePos(cs.i),b=cs.i<6?nodePos(Math.min(6,cs.i+1),'a'):a;put(thumbFor(cs.i)||S.s2,cs.travel>0?lerpP(a,b,e):a)}
  stroke(INK);strokeWeight(1.5);line(0,TH,width,TH);
}

function fit(img,cx,cy,mw,mh){const k=Math.min(mw/img.width,mh/img.height);const w=img.width*k,h=img.height*k;return{x:cx-w/2,y:cy-h/2,w,h}}
function frame(img,R,alpha=1){const c=drawingContext;c.save();c.globalAlpha=alpha;c.drawImage(img,R.x,R.y,R.w,R.h);c.restore()}
function border(R){noFill();stroke(INK);strokeWeight(1.5);rect(R.x,R.y,R.w,R.h)}

function drawLens(){
  const TH=treeH(),ctx=drawingContext;const narrow=width<700;
  const top=TH+16,bottom=height-16,lh=bottom-top;
  const cs=curState();const i=cs.i,u=cs.travel>0?1:cs.u;
  const mw=narrow?width*0.86:width*0.5,mh=lh*(narrow?0.58:0.74);
  const cx=width/2,cy=top+lh*(narrow?0.36:0.45);
  const R=fit(S.src,cx,cy,mw,mh);
  const cap=(s,y,col=INK,sz=narrow?15:17,w=500)=>T(s,cx,y,sz,col,'center',w);
  const below=R.y+R.h+(narrow?26:30);
  if(i===0){frame(S.src,R);frame(S.s1,R,ease(u));border(R);
    cap('המצלמה כבר ״משפרת״: חידוד, צבע, החלקה',below);}
  if(i===1){frame(S.s1,R);frame(S.s2,R,ease(u));border(R);
    if(narrow){cap('המטא־דאטה נמחק: מכשיר · שעה · מיקום',below,u>.6?RED:INK)}
    else{const tags=['מכשיר','שעה','מיקום','מחבר'];const tx=R.x-18;
      tags.forEach((t,k)=>{const y=R.y+20+k*30;const gone=u>(k+1)/(tags.length+1);T(t,tx,y,16,gone?'#a8a29a':INK,'right',500);if(gone){stroke(RED);strokeWeight(2);line(tx-56,y,tx+2,y)}});
      T('מטא־דאטה',tx,R.y-8,12,GREY,'right',500);cap('דחיסה חוזרת · ההקשר נחתך',below)}
    T('דחיסה ×'+Math.max(1,Math.round(u*7)),R.x+R.w-8,R.y+18,14,'#fff','right',700,'rtl');}
  if(i===2){const Rr=mulberry(S.seed);const K=Math.floor(ease(u)*18);
    for(let k=0;k<K;k++){const ang=(Rr()<.5?Math.PI:0)+(Rr()-.5)*1.9,dist=(narrow?0.42:0.62)+Rr()*0.18;const w=R.w*0.26,h=R.h*0.26+8;
      const x=cx+Math.cos(ang)*R.w*dist,y=cy+Math.sin(ang)*R.h*dist*0.9;ctx.save();ctx.translate(x,y);ctx.rotate((Rr()-.5)*0.35);
      ctx.fillStyle='#111';ctx.fillRect(-w/2-2,-h/2-2,w+4,h+4);ctx.drawImage(S.s2,Rr()*S.s2.width*0.15,Rr()*S.s2.height*0.15,S.s2.width*0.85,S.s2.height*0.85,-w/2,-h/2+8,w,h-8);
      ctx.fillStyle='#fff';ctx.fillRect(-w/2+4,-h/2+2,w*0.4,3);ctx.restore()}
    frame(S.s2,R);border(R);
    const nshares=Math.round(Math.pow(ease(u),2.2)*48210);
    T(nshares.toLocaleString('en-US'),R.x+R.w-10,R.y+R.h-26,narrow?26:34,'#fff','right',800,'ltr');
    T('שיתופים',R.x+R.w-10,R.y+R.h-54,13,'#fff','right',500);
    cap('רגש מנצח דיוק · כל שיתוף חותך ומוסיף כיתוב',below);}
  if(i===3){const gap=narrow?10:26;const w2=(narrow?width*0.9:width*0.62-gap)/2;
    const Ra=fit(S.s4a,cx+gap/2+w2/2,cy,w2,mh*0.88),Rb=fit(S.s4b,cx-gap/2-w2/2,cy,w2,mh*0.88);
    const sh=ease(u);
    const ra={x:Ra.x-(1-sh)*w2*0.5,y:Ra.y,w:Ra.w,h:Ra.h},rb={x:Rb.x+(1-sh)*w2*0.5,y:Rb.y,w:Rb.w,h:Rb.h};
    frame(S.s4a,ra);border(ra);frame(S.s4b,rb);border(rb);
    const bar=(R2,txt,col)=>{noStroke();fill(col);rect(R2.x,R2.y+R2.h-34,R2.w,34);T(txt,R2.x+R2.w/2,R2.y+R2.h-17,narrow?13:16,'#fff','center',700)};
    if(u>.35){bar(ra,'״תיעוד של תקיפה״','#6631d7');bar(rb,'״זה מבוים״','#3b2a7a')}
    T('4א',ra.x+ra.w-8,ra.y+16,15,'#fff','right',800,'rtl');T('4ב',rb.x+rb.w-8,rb.y+16,15,'#fff','right',800,'rtl');
    cap('אותה תמונה, שני סיפורים',Math.max(ra.y+ra.h,rb.y+rb.h)+(narrow?26:30));}
  if(i===4){frame(S.s2,R);border(R);
    const sy=R.y+((u*3)%1)*R.h;ctx.save();const g=ctx.createLinearGradient(0,sy-30,0,sy);g.addColorStop(0,'rgba(200,16,46,0)');g.addColorStop(1,'rgba(200,16,46,.28)');ctx.fillStyle=g;ctx.fillRect(R.x,sy-30,R.w,30);ctx.restore();stroke(RED);strokeWeight(2);line(R.x-6,sy,R.x+R.w+6,sy);
    const V=['אותנטי · 92%','נוצר ב־AI · 71%','צילום ישן מ־2019','לא ניתן לאמת','״זה AI״'];const k=Math.min(V.length-1,Math.floor(u*V.length));
    const bw=narrow?R.w:Math.min(300,width*0.22),bh=74;const bx=narrow?R.x:R.x-bw-24,by=narrow?R.y+R.h+14:R.y+R.h*0.3;
    ctx.save();ctx.setLineDash([6,5]);stroke(INK);strokeWeight(1.5);fill('#fff');rect(bx,by,bw,bh,10);ctx.restore();
    T('צ׳אטבוט בודק · ניסיון '+(k+1),bx+bw-14,by+20,13,GREY,'right',500);T(V[k],bx+bw-14,by+50,narrow?20:24,k===V.length-1?RED:INK,'right',800);
    if(!narrow)cap('כל בקשה, תשובה אחרת · ההכחשה מנצחת',below);}
  if(i===5){frame(S.s2,R);frame(S.s6,R,Math.min(1,u*2));
    S.holes.forEach((h,k)=>{if(u>0.15+k*0.08){const x=R.x+h.x*R.w,y=R.y+h.y*R.h,w=h.w*R.w,hh=h.h*R.h;noStroke();fill(PAPER);rect(x,y,w,hh);ctx.save();ctx.setLineDash([4,4]);stroke('#a8a29a');strokeWeight(1.2);noFill();rect(x,y,w,hh);ctx.restore()}});
    border(R);
    if(u>.6){const h=S.holes[Math.floor(S.holes.length/2)];T('הפוסט הוסר',R.x+(h.x+h.w/2)*R.w,R.y+(h.y+h.h/2)*R.h,narrow?11:13,RED,'center',700)}
    cap(narrow?'קישורים נשברים · נשארו מעט פיקסלים':'קישורים נשברים · מסנן אוטומטי · מה שנשאר: מעט פיקסלים',below);}
  if(i===6){frame(S.s6,R);S.holes.forEach(h=>{noStroke();fill(PAPER);rect(R.x+h.x*R.w,R.y+h.y*R.h,h.w*R.w,h.h*R.h)});
    frame(S.s7,R,ease(Math.min(1,u*1.4)));border(R);
    const sa=Math.max(0,(u-.45)/.4);if(sa>0){ctx.save();ctx.globalAlpha=Math.min(1,sa);ctx.translate(R.x+R.w*0.2,R.y+R.h*0.78);ctx.rotate(-0.22);const rr=narrow?40:56;stroke(RED);strokeWeight(3);noFill();circle(0,0,rr*2);strokeWeight(1);circle(0,0,rr*1.72);
      T('★',0,-rr*0.42,rr*0.32,RED,'center',700,'ltr');T('זיכרון מאושר',0,rr*0.02,rr*0.27,RED,'center',800);T('תוקף: לצמיתות',0,rr*0.38,rr*0.2,RED,'center',500);ctx.restore()}
    const comp=Math.round(58+42*ease(u)),link=Math.round(100-77*ease(u));
    const my=narrow?R.y+R.h+18:below-6,mx=narrow?R.x:cx-mw*0.5,mwid=narrow?R.w:mw;
    const meter=(lab,v,y,col)=>{T(lab,mx+mwid,y,13,GREY,'right',500);T(v+'%',mx,y,18,col,'left',800,'ltr');noStroke();fill('#ddd6c9');rect(mx,y+14,mwid,6);fill(col);rect(mx+mwid*(1-v/100),y+14,mwid*v/100,6)};
    meter('שלמות הארכיון',comp,my,INK);meter('קשר למה שצולם',link,my+42,RED);}
}

/* ---------- UI ---------- */
const chips=document.getElementById('chips');
ST.forEach((s,i)=>{const b=document.createElement('button');b.className='chip';b.type='button';b.style.setProperty('--c',s.c);b.style.setProperty('--f',i===6?'#e7e2d8':s.f);b.innerHTML=`<b>${i+1}</b>${s.n}`;b.onclick=()=>{P=i;done=false;updateInfo(i)};chips.appendChild(b)});
let lastInfo=-1;
function updateInfo(i){if(i===lastInfo)return;lastInfo=i;const s=ST[i];
  document.getElementById('iName').textContent=s.n;const d=document.getElementById('iDot');d.style.background=s.f;d.style.borderColor=s.c;
  document.getElementById('iWhat').textContent=s.w;document.getElementById('iWrong').textContent=s.x;document.getElementById('iTheory').textContent=s.t;
  document.getElementById('iBadges').innerHTML=s.b.map(n=>`<span class="badge" style="border-color:${s.c}">תיאוריה ${n}</span>`).join('');
  [...chips.children].forEach((c,k)=>c.classList.toggle('on',k===i))}
setInterval(()=>{if(S)updateInfo(Math.min(6,Math.floor(P)))},120);
function setPlaying(v){playing=v;document.getElementById('play').textContent=v?'השהיה':'הפעלה'}
document.getElementById('play').onclick=()=>{if(!S)return;if(P>=6+DW-0.001){P=0;document.getElementById('result').style.display='none'}setPlaying(!playing)};
document.getElementById('restart').onclick=()=>{if(!S)return;P=0;done=false;document.getElementById('result').style.display='none';setPlaying(true)};
document.getElementById('sample').onclick=()=>{const s=sampleImage();const im=new Image();im.onload=()=>prepare(im);im.src=s.toDataURL('image/png')};
document.getElementById('file').addEventListener('change',e=>{const f=e.target.files&&e.target.files[0];if(!f)return;const url=URL.createObjectURL(f);const im=new Image();im.onload=()=>{prepare(im);URL.revokeObjectURL(url)};im.src=url;e.target.value=''});
function finish(){if(done||!S)return;done=true;document.getElementById('rOrig').src=S.src.toDataURL('image/jpeg',0.9);document.getElementById('rMem').src=S.s7.toDataURL('image/jpeg',0.9);document.getElementById('result').style.display='block'}
