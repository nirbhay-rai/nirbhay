/* ============================================================
   NIRBHAY RAI — script.js v4.2
   AI Fixed | URL Gallery | Section Tags Removed
============================================================ */

/* ═══ LOADER ═══ */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('out'), 2000);
});

/* ═══ CUSTOM CURSOR ═══ */
const curOuter = document.getElementById('cur-outer');
const curInner = document.getElementById('cur-inner');
let mx=0,my=0,ox=0,oy=0;
document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  curInner.style.left=mx+'px'; curInner.style.top=my+'px';
});
(function animCur(){
  ox+=(mx-ox)*.12; oy+=(my-oy)*.12;
  curOuter.style.left=ox+'px'; curOuter.style.top=oy+'px';
  requestAnimationFrame(animCur);
})();

/* ═══ BUBBLE CANVAS ═══ */
(function(){
  const canvas=document.getElementById('bg-canvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  let W,H,bubbles=[];
  const COUNT=window.innerWidth<600?25:55;
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize(); window.addEventListener('resize',resize);
  function mkB(){
    const r=Math.random()*18+6;
    return{
      x:Math.random()*W, y:H+r+Math.random()*H,
      r:r,
      vx:(Math.random()-.5)*.4,
      vy:-(Math.random()*0.5+0.3),
      a:Math.random()*0.18+0.04,
      wobble:Math.random()*Math.PI*2,
      wobbleSpeed:Math.random()*0.03+0.01,
      wobbleAmp:Math.random()*1.5+0.5
    };
  }
  for(let i=0;i<COUNT;i++){
    const b=mkB();
    b.y=Math.random()*H; // start spread
    bubbles.push(b);
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    const isDark=document.documentElement.getAttribute('data-theme')!=='light';
    bubbles.forEach(b=>{
      b.wobble+=b.wobbleSpeed;
      b.x+=b.vx+Math.sin(b.wobble)*b.wobbleAmp*0.08;
      b.y+=b.vy;
      if(b.y+b.r<0||b.x<-b.r*2||b.x>W+b.r*2) Object.assign(b,mkB());
      // bubble circle
      const grad=ctx.createRadialGradient(b.x-b.r*.3,b.y-b.r*.3,b.r*.05,b.x,b.y,b.r);
      if(isDark){
        grad.addColorStop(0,`rgba(0,212,255,${b.a*1.8})`);
        grad.addColorStop(0.5,`rgba(0,180,220,${b.a*0.6})`);
        grad.addColorStop(1,`rgba(0,100,160,${b.a*0.1})`);
      } else {
        grad.addColorStop(0,`rgba(0,120,200,${b.a*1.6})`);
        grad.addColorStop(0.5,`rgba(30,100,180,${b.a*0.5})`);
        grad.addColorStop(1,`rgba(0,60,140,${b.a*0.08})`);
      }
      ctx.beginPath();
      ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
      ctx.fillStyle=grad;
      ctx.fill();
      // bubble shine
      ctx.beginPath();
      ctx.arc(b.x-b.r*.3,b.y-b.r*.3,b.r*.28,0,Math.PI*2);
      ctx.fillStyle=isDark?`rgba(255,255,255,${b.a*1.2})`:`rgba(255,255,255,${b.a*2.5})`;
      ctx.fill();
      // bubble ring
      ctx.beginPath();
      ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
      ctx.strokeStyle=isDark?`rgba(0,220,255,${b.a*0.6})`:`rgba(0,120,200,${b.a*0.5})`;
      ctx.lineWidth=0.7;
      ctx.stroke();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ═══ DARK / LIGHT THEME ═══ */
const themeBtn=document.getElementById('theme-toggle');
const themeIcon=document.getElementById('theme-icon');
const html=document.documentElement;
function applyTheme(t){
  html.setAttribute('data-theme',t);
  themeIcon.className=t==='dark'?'fas fa-moon':'fas fa-sun';
  try{localStorage.setItem('nr-theme',t);}catch(e){}
}
try{applyTheme(localStorage.getItem('nr-theme')||'dark');}catch(e){applyTheme('dark');}
themeBtn.addEventListener('click',()=>applyTheme(html.getAttribute('data-theme')==='dark'?'light':'dark'));

/* ═══ NAVBAR ═══ */
const navbar=document.getElementById('navbar');
const hamburger=document.getElementById('hamburger');
const mobMenu=document.getElementById('mob-menu');
window.addEventListener('scroll',()=>{
  navbar.classList.toggle('stuck',window.scrollY>50);
  const st=document.getElementById('scroll-top');
  if(st) st.classList.toggle('show',window.scrollY>400);
  highlightNav();
});
hamburger.addEventListener('click',()=>{
  const open=mobMenu.classList.toggle('open');
  const s=hamburger.querySelectorAll('span');
  s[0].style.transform=open?'rotate(45deg) translate(5px,5px)':'';
  s[1].style.opacity=open?'0':'';
  s[2].style.transform=open?'rotate(-45deg) translate(5px,-5px)':'';
});
document.querySelectorAll('.ml').forEach(l=>l.addEventListener('click',()=>{
  mobMenu.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s=>{s.style.transform='';s.style.opacity='';});
}));
function highlightNav(){
  let cur='';
  document.querySelectorAll('section[id]').forEach(s=>{if(window.scrollY>=s.offsetTop-130)cur=s.id;});
  document.querySelectorAll('.n-links a').forEach(a=>a.classList.toggle('act',a.getAttribute('href')==='#'+cur));
}
const scrollTopBtn=document.getElementById('scroll-top');
if(scrollTopBtn) scrollTopBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* ═══ TYPING ═══ */
const tp=document.getElementById('tp-text');
const words=['ATMS Site Support Executive','CCTV Surveillance Specialist','ANPR Systems Engineer','Network & LAN/WAN Engineer','Highway Infrastructure IT Pro','Server & Field Support Expert'];
let wi=0,ci=0,del=false;
function type(){
  const w=words[wi];
  tp.textContent=del?w.slice(0,ci-1):w.slice(0,ci+1);
  del?ci--:ci++;
  if(!del&&ci===w.length){del=true;setTimeout(type,1800);return;}
  if(del&&ci===0){del=false;wi=(wi+1)%words.length;}
  setTimeout(type,del?45:85);
}
if(tp) type();

/* ═══ REVEAL ═══ */
const revObs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('vis'),i*70);revObs.unobserve(e.target);}});
},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

/* ═══ COUNTERS ═══ */
let counted=false;
function runCounters(){
  if(counted)return;
  const hero=document.getElementById('hero');
  if(hero&&hero.getBoundingClientRect().bottom<window.innerHeight+100){
    counted=true;
    document.querySelectorAll('.hs-n').forEach(el=>{
      const target=parseInt(el.dataset.t);let n=0;
      const iv=setInterval(()=>{n+=Math.ceil(target/45);if(n>=target){el.textContent=target;clearInterval(iv);}else el.textContent=n;},35);
    });
  }
}
window.addEventListener('scroll',runCounters);runCounters();

/* ═══ 3D CARD TILT ═══ */
const wrap3d=document.getElementById('card3d');
if(wrap3d){
  const card=wrap3d.querySelector('.card-3d');let raf;
  wrap3d.addEventListener('mousemove',e=>{
    const r=wrap3d.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{card.style.transform=`rotateY(${x*20}deg) rotateX(${-y*20}deg) scale(1.04)`;});
  });
  wrap3d.addEventListener('mouseleave',()=>{cancelAnimationFrame(raf);card.style.transform='';});
  window.addEventListener('deviceorientation',e=>{
    if(!e.gamma||!e.beta)return;
    card.style.transform=`rotateY(${Math.max(-15,Math.min(15,e.gamma/3))}deg) rotateX(${Math.max(-15,Math.min(15,(e.beta-30)/3))}deg)`;
  });
}

/* ═══ AI SKILL RADAR ═══ */
(function(){
  const canvas=document.getElementById('radar-canvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const cx=140,cy=140,R=105;
  const labels=['CCTV','ATMS','ANPR','Network','Server','Field'];
  const vals=[.95,.93,.90,.88,.78,.92];
  let pct=0;
  function isDark(){return html.getAttribute('data-theme')!=='light';}
  function draw(){
    ctx.clearRect(0,0,280,280);
    const n=labels.length,step=(Math.PI*2)/n,off=-Math.PI/2;
    const acc=isDark()?'#00d4ff':'#0070cc';
    const gridC=isDark()?'rgba(255,255,255,0.07)':'rgba(0,0,0,0.09)';
    const dimC=isDark()?'#4a5a78':'#7a8aaa';
    const hiC=isDark()?'#ffffff':'#0a0f1e';
    [.25,.5,.75,1].forEach(ratio=>{
      ctx.beginPath();
      for(let i=0;i<n;i++){const a=off+step*i;i===0?ctx.moveTo(cx+Math.cos(a)*R*ratio,cy+Math.sin(a)*R*ratio):ctx.lineTo(cx+Math.cos(a)*R*ratio,cy+Math.sin(a)*R*ratio);}
      ctx.closePath();ctx.strokeStyle=gridC;ctx.lineWidth=1;ctx.stroke();
    });
    for(let i=0;i<n;i++){const a=off+step*i;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);ctx.strokeStyle=gridC;ctx.lineWidth=1;ctx.stroke();}
    ctx.beginPath();
    for(let i=0;i<n;i++){const a=off+step*i,v=vals[i]*pct;i===0?ctx.moveTo(cx+Math.cos(a)*R*v,cy+Math.sin(a)*R*v):ctx.lineTo(cx+Math.cos(a)*R*v,cy+Math.sin(a)*R*v);}
    ctx.closePath();ctx.fillStyle=isDark()?'rgba(0,212,255,0.13)':'rgba(0,112,204,0.1)';ctx.fill();ctx.strokeStyle=acc;ctx.lineWidth=2;ctx.stroke();
    for(let i=0;i<n;i++){const a=off+step*i,v=vals[i]*pct;ctx.beginPath();ctx.arc(cx+Math.cos(a)*R*v,cy+Math.sin(a)*R*v,4,0,Math.PI*2);ctx.fillStyle=acc;ctx.fill();}
    ctx.textAlign='center';ctx.font='500 11px JetBrains Mono,monospace';ctx.fillStyle=dimC;
    for(let i=0;i<n;i++){const a=off+step*i;ctx.fillText(labels[i],cx+Math.cos(a)*(R+22),cy+Math.sin(a)*(R+22)+4);}
    ctx.font='700 13px Syne,sans-serif';ctx.fillStyle=hiC;ctx.fillText('NIRBHAY',cx,cy-6);
    ctx.font='400 10px JetBrains Mono,monospace';ctx.fillStyle=acc;ctx.fillText('RAI',cx,cy+10);
  }
  const obs=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
      let start=null;
      function anim(ts){if(!start)start=ts;pct=Math.min((ts-start)/1200,1);draw();if(pct<1)requestAnimationFrame(anim);}
      requestAnimationFrame(anim);obs.disconnect();
    }
  },{threshold:.3});
  obs.observe(canvas);
  new MutationObserver(()=>draw()).observe(html,{attributes:true,attributeFilter:['data-theme']});
  draw();
})();

/* ═══ SKILL BARS ═══ */
const skillObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.style.width=e.target.dataset.w+'%';skillObs.unobserve(e.target);}});
},{threshold:.2});
document.querySelectorAll('.sk-fill').forEach(el=>skillObs.observe(el));

/* ═══ GALLERY — Lightbox Only ═══ */
const galGrid=document.getElementById('gal-grid');
const lightbox=document.getElementById('lightbox');
const lbImg=document.getElementById('lb-img');
const lbTitle=document.getElementById('lb-title');
const lbClose=document.getElementById('lb-close');
const lbPrev=document.getElementById('lb-prev');
const lbNext=document.getElementById('lb-next');
let lbItems=[],lbIdx=0;

function getAllItems(){return Array.from(document.querySelectorAll('.gal-item'));}
function openLB(idx){lbItems=getAllItems();lbIdx=idx;showLB();lightbox.classList.add('open');document.body.style.overflow='hidden';}
function showLB(){const item=lbItems[lbIdx];if(!item)return;lbImg.src=item.querySelector('img').src;lbTitle.textContent=item.dataset.title||'';}
function closeLB(){lightbox.classList.remove('open');document.body.style.overflow='';}

galGrid.addEventListener('click',e=>{
  const item=e.target.closest('.gal-item');
  if(item) openLB(getAllItems().indexOf(item));
});

if(lbClose) lbClose.addEventListener('click',closeLB);
if(lightbox) lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLB();});
if(lbPrev) lbPrev.addEventListener('click',()=>{lbItems=getAllItems();lbIdx=(lbIdx-1+lbItems.length)%lbItems.length;showLB();});
if(lbNext) lbNext.addEventListener('click',()=>{lbItems=getAllItems();lbIdx=(lbIdx+1)%lbItems.length;showLB();});
document.addEventListener('keydown',e=>{
  if(!lightbox||!lightbox.classList.contains('open'))return;
  if(e.key==='Escape')closeLB();
  if(e.key==='ArrowLeft'){lbItems=getAllItems();lbIdx=(lbIdx-1+lbItems.length)%lbItems.length;showLB();}
  if(e.key==='ArrowRight'){lbItems=getAllItems();lbIdx=(lbIdx+1)%lbItems.length;showLB();}
});

/* ═══ AI ASSISTANT — Nirbhay Persona (No API Key Needed) ═══ */
const aiMsgs=document.getElementById('ai-msgs');
const aiInp=document.getElementById('ai-inp');
const aiSend=document.getElementById('ai-send');

// Knowledge base — Nirbhay ke baare mein sab kuch
const NR = {
  name: 'Nirbhay Rai',
  role: 'IT Site Support Executive & ATMS Network Engineer',
  exp: '5+ years',
  location: 'Kushinagar, Uttar Pradesh, India',
  email: 'nirbhayrai722@gmail.com',
  phone: '+91 6392324588',
  linkedin: 'linkedin.com/in/nirbhay-rai-2b813220a',
  instagram: '@nirbhay_raii',
  available: true,
  companies: [
    {role:'Site Support Executive', company:'QuaLiX Information System LLP', period:'Nov 2024 – Present', current:true,
     work:'ATMS device install/config, CCTV & PTZ maintenance, ANPR support, NVR/NAS management, RF wireless setup, OFC coordination, networking & server support'},
    {role:'Resident Engineer', company:'Vaaan Infra Project', period:'Nov 2022 – Nov 2024',
     work:'Highway project IT maintenance, LAN/WAN networking, CCTV installation, field troubleshooting'},
    {role:'Computer Technician', company:'Joy Computer Hardware & Software Solutions', period:'Jan 2020 – Oct 2022',
     work:'PC assembly & building, computer repair, OS installation, CCTV setup, networking support, hardware troubleshooting'},
  ],
  skills: {
    'CCTV & Surveillance': 95,
    'ATMS Infrastructure': 93,
    'Problem Troubleshooting': 94,
    'Hardware Troubleshooting': 92,
    'ANPR Systems': 90,
    'PC Assembly & Building': 90,
    'NVR/NAS Support': 88,
    'Networking': 88,
    'LAN/WAN Setup': 86,
    'RF Wireless': 82,
    'Windows & Linux': 80,
    'Server Troubleshooting': 78,
  },
  services: ['ATMS Infrastructure','CCTV & Surveillance','ANPR Systems','Networking & LAN/WAN','Server & System Support','Field IT Support','PC Assembly & Building','Problem Troubleshooting'],
};

// Detect Hindi input
function isHindi(q) {
  if (/[\u0900-\u097F]/.test(q)) return true;
  return /\b(kya|kaun|kahan|kaise|kyun|batao|hai|hain|mujhe|mera|aapka|aap|yeh|karo|chahiye|aata|hota|tha|the|thi|pata|bhai|ji|nahi|nahin|hoga|sakte|sakta|agar|lekin|aur|ya|se|mein|pe|par|ko|ka|ki|ke|hoon|mere|meri)\b/i.test(q);
}

// Smart bilingual response engine
function getNirbhayReply(q) {
  const ql = q.toLowerCase();
  const hindi = isHindi(q);

  if (/^(hi|hello|hey|namaste|helo|hii|sup|yo|namaskar)\b/.test(ql))
    return hindi
      ? `Namaste! Main Nirbhay Rai hoon — IT Site Support Executive aur ATMS & Network Engineer. 5+ saal ka experience hai highway IT mein. Kuch poochna hai? 😊`
      : `Hello! I'm Nirbhay Rai — IT Site Support Executive & ATMS Network Engineer with 5+ years of highway IT experience. How can I help? 😊`;

  if (/your name|kaun ho|naam|who are you|introduce/.test(ql))
    return hindi
      ? `Main Nirbhay Rai hoon — IT professional with 5+ years experience in ATMS, CCTV, ANPR, Networking, PC Assembly, aur Troubleshooting.`
      : `I'm Nirbhay Rai — an IT professional with 5+ years in ATMS, CCTV, ANPR, Networking, PC Assembly, and Troubleshooting on India's highways.`;

  if (/current|abhi|now|present|kahan kaam|working/.test(ql))
    return hindi
      ? `Abhi Site Support Executive hoon QuaLiX Information System LLP mein (Nov 2024 – Present). ATMS, CCTV, ANPR, networking manage karta hoon highway sites pe.`
      : `Currently Site Support Executive at QuaLiX Information System LLP (Nov 2024 – Present), managing ATMS, CCTV, ANPR, and networking on live highway sites.`;

  if (/experience|kitne saal|how many year|work history|career/.test(ql))
    return hindi
      ? `5+ saal ka experience:\n1. Site Support Executive — QuaLiX (2024–Present)\n2. Resident Engineer — Vaaan Infra (2022–2024)\n3. Computer Technician — Joy Computers (2020–2022)`
      : `5+ years of experience:\n1. Site Support Executive — QuaLiX (2024–Present)\n2. Resident Engineer — Vaaan Infra (2022–2024)\n3. Computer Technician — Joy Computers (2020–2022)`;

  if (/skill|kya aata|kya jaanta|expertise|best at|strongest/.test(ql))
    return hindi
      ? `Top skills: CCTV (95%), Troubleshooting (94%), ATMS (93%), PC Assembly (90%), ANPR (90%), NVR/NAS (88%), Networking (88%), LAN/WAN (86%), RF Wireless (82%).`
      : `Top skills: CCTV (95%), Problem Troubleshooting (94%), ATMS (93%), PC Assembly (90%), ANPR (90%), NVR/NAS (88%), Networking (88%), LAN/WAN (86%).`;

  if (/pc|assemble|assembly|computer build|motherboard|bios/.test(ql))
    return hindi
      ? `PC Assembly mera strong skill hai (90%). Desktop/workstation ka full build — component selection, motherboard setup, cable management, BIOS config, aur testing — sab karta hoon.`
      : `PC Assembly is a strong skill (90%). Full desktop/workstation builds — component selection, motherboard setup, cable management, BIOS config, and performance testing.`;

  if (/troubleshoot|problem|fault|issue|repair|diagnos|debug/.test(ql))
    return hindi
      ? `Problem Troubleshooting mera specialty hai (94%). Hardware, software, network faults — sab systematically diagnose karta hoon. Field pe live sites pe fast resolution zaroori hai.`
      : `Problem Troubleshooting is my specialty (94%). Systematic diagnosis of hardware, software, and network faults — fast resolution on live field sites where downtime isn't an option.`;

  if (/cctv|camera|surveillance|nvr|nas|ptz/.test(ql))
    return hindi
      ? `CCTV mera strongest skill hai (95%). PTZ config, NVR/NAS setup, remote monitoring, live fault resolution — sab highway sites pe karta hoon.`
      : `CCTV is my strongest skill (95%). PTZ configuration, NVR/NAS setup, remote monitoring, and live fault resolution on active highway corridors.`;

  if (/atms|traffic|highway|road/.test(ql))
    return hindi
      ? `ATMS mera core domain hai. Device install, config, troubleshooting — sab kuch highway projects pe.`
      : `ATMS is my core domain — device installation, configuration, and troubleshooting on live highway projects.`;

  if (/anpr|number plate|ocr|toll|license plate/.test(ql))
    return hindi
      ? `ANPR mein camera alignment, OCR config, aur toll integration karta hoon. Field pe bina vendor ke troubleshoot karta hoon.`
      : `For ANPR: camera alignment, OCR engine config, and toll system integration — with on-site troubleshooting without vendor dependency.`;

  if (/network|lan|wan|router|switch|rf|wireless/.test(ql))
    return hindi
      ? `Networking strong area hai — LAN/WAN (86%), RF Wireless (82%). Remote sites pe fiber nahi hota, toh RF wireless deploy karta hoon.`
      : `Networking is a strong area — LAN/WAN (86%), RF Wireless (82%). For remote sites without fiber, I deploy RF wireless links.`;

  if (/location|kahan rehte|address|city|kushinagar/.test(ql))
    return hindi
      ? `Main Kushinagar, Uttar Pradesh mein hoon. Pan India kaam ke liye available hoon.`
      : `Based in Kushinagar, Uttar Pradesh, India — available for work pan-India.`;

  if (/contact|email|phone|number|reach|call|mail/.test(ql))
    return hindi
      ? `Contact karo:\n📧 nirbhayrai722@gmail.com\n📱 +91 6392324588\n🔗 linkedin.com/in/nirbhay-rai-2b813220a`
      : `Reach me at:\n📧 nirbhayrai722@gmail.com\n📱 +91 6392324588\n🔗 linkedin.com/in/nirbhay-rai-2b813220a`;

  if (/hire|job|opportunity|vacancy|available|recruit/.test(ql))
    return hindi
      ? `Haan, IT, Toll, ATMS, Highway, Networking roles ke liye available hoon India mein. Contact: nirbhayrai722@gmail.com ya +91 6392324588.`
      : `Yes! Available for IT, Toll, ATMS, Highway, and Networking roles across India. Contact: nirbhayrai722@gmail.com or +91 6392324588.`;

  if (/linkedin|instagram|social/.test(ql))
    return `LinkedIn: linkedin.com/in/nirbhay-rai-2b813220a\nInstagram: @nirbhay_raii`;

  if (/salary|ctc|package|pay/.test(ql))
    return hindi
      ? `Salary ke baare mein seedha baat karte hain — nirbhayrai722@gmail.com pe likhna.`
      : `Let's discuss salary directly — email me at nirbhayrai722@gmail.com.`;

  if (/education|degree|college|study/.test(ql))
    return hindi
      ? `Expertise 5+ saal ke practical highway IT experience se aayi hai — ATMS, CCTV, ANPR, PC Assembly, sab live projects pe seekha.`
      : `My expertise comes from 5+ years of practical field experience — ATMS, CCTV, ANPR, PC Assembly, all learned on live highway projects.`;

  if (/service|kya karta|work|domain|speciali/.test(ql))
    return hindi
      ? `Main yeh kaam karta hoon:\n• ATMS Infrastructure\n• CCTV & Surveillance\n• ANPR Systems\n• Networking & LAN/WAN\n• Server Support\n• PC Assembly & Building\n• Problem Troubleshooting\n• Field IT Support`
      : `My services:\n• ATMS Infrastructure\n• CCTV & Surveillance\n• ANPR Systems\n• Networking & LAN/WAN\n• Server Support\n• PC Assembly & Building\n• Problem Troubleshooting\n• Field IT Support`;

  if (/thank|shukriya|thanks|appreciate|dhanyawad/.test(ql))
    return hindi
      ? `Most welcome! Koi sawal ho toh poochho. Hire karna ho toh nirbhayrai722@gmail.com pe likhna. 😊`
      : `You're welcome! Ask anything else anytime. To hire Nirbhay: nirbhayrai722@gmail.com. 😊`;

  return hindi
    ? `Skills, experience, ya contact ke baare mein kuch bhi poochh sakte ho! 📧 nirbhayrai722@gmail.com | 📱 +91 6392324588`
    : `Ask me anything about Nirbhay's skills, experience, or services! 📧 nirbhayrai722@gmail.com | 📱 +91 6392324588`;
}

function addMsg(text,cls){
  const d=document.createElement('div');
  d.className=`ai-msg ${cls}`;
  d.textContent=text;
  aiMsgs.appendChild(d);
  aiMsgs.scrollTop=aiMsgs.scrollHeight;
  return d;
}

function handleAI(q){
  if(!q.trim())return;
  addMsg(q,'user');
  aiInp.value='';
  const typing=addMsg('...','bot typing');
  setTimeout(()=>{
    typing.textContent=getNirbhayReply(q);
    typing.classList.remove('typing');
    aiMsgs.scrollTop=aiMsgs.scrollHeight;
  },600);
}

if(aiSend) aiSend.addEventListener('click',()=>handleAI(aiInp.value));
if(aiInp)  aiInp.addEventListener('keydown',e=>{if(e.key==='Enter')handleAI(aiInp.value);});

/* ═══ EMAILJS CONTACT FORM ═══ */
const EMAILJS_SERVICE_ID='service_l5hpv3q';
const EMAILJS_TEMPLATE_ID='template_aa8euch';
const EMAILJS_PUBLIC_KEY='AUdNqm9ubUs9cT86J';
(function(){if(typeof emailjs!=='undefined')emailjs.init(EMAILJS_PUBLIC_KEY);})();

const contactForm=document.getElementById('contact-form');
const formStatus=document.getElementById('form-status');
if(contactForm){
  contactForm.addEventListener('submit',async e=>{
    e.preventDefault();
    const name=document.getElementById('name').value.trim();
    const email=document.getElementById('email').value.trim();
    const subject=document.getElementById('subject').value.trim();
    const message=document.getElementById('message').value.trim();
    if(!name||!email||!subject||!message){showStatus('Please fill all fields.','error');return;}
    const btn=contactForm.querySelector('button[type="submit"]');
    btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Sending...';
    try{
      if(typeof emailjs!=='undefined'){
        await emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,{from_name:name,from_email:email,subject,message,to_name:'Nirbhay Rai'});
      }else{await new Promise(r=>setTimeout(r,1200));}
      showStatus('✓ Message sent! I will reply soon.','success');
      contactForm.reset();
    }catch(err){
      showStatus('✗ Failed. Please WhatsApp me directly.','error');
      console.error(err);
    }finally{
      btn.disabled=false;btn.innerHTML='<i class="fas fa-paper-plane"></i> Send Message';
    }
  });
}
function showStatus(msg,type){
  formStatus.textContent=msg;formStatus.className='form-status '+type;
  setTimeout(()=>{formStatus.className='form-status';formStatus.textContent='';},5000);
}
