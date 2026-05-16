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

/* ═══ PARTICLE CANVAS ═══ */
(function(){
  const canvas=document.getElementById('bg-canvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  let W,H,particles=[];
  const COUNT=window.innerWidth<600?35:75;
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize(); window.addEventListener('resize',resize);
  function mkP(){return{x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4+.3,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,a:Math.random()*.4+.1};}
  for(let i=0;i<COUNT;i++) particles.push(mkP());
  function draw(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(0,212,255,${p.a})`;ctx.fill();
    });
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<110){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(0,212,255,${.07*(1-d/110)})`;ctx.lineWidth=.5;ctx.stroke();}
      }
    }
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

/* ═══ GALLERY — URL Paste Only ═══ */
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
  if(e.target.closest('.gal-del')){if(confirm('Delete?'))e.target.closest('.gal-item').remove();return;}
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

// URL Add Image
function addImageFromURL(url,title){
  if(!url||!url.startsWith('http')){alert('Sahi URL daalo (https:// se shuru hona chahiye)');return;}
  const div=document.createElement('div');
  div.className='gal-item vis';
  div.dataset.title=title||'My Photo';
  const img=document.createElement('img');
  img.alt=div.dataset.title;
  img.loading='lazy';
  img.onerror=()=>{div.remove();alert('Image load nahi hui. URL check karo ya direct image link use karo.');};
  img.src=url;
  div.innerHTML=`
    <div class="gal-ov"><i class="fas fa-expand"></i><span>${div.dataset.title}</span></div>
    <button class="gal-del" title="Delete"><i class="fas fa-trash"></i></button>
  `;
  div.insertBefore(img,div.firstChild);
  galGrid.appendChild(div);
}

const galUrlInp=document.getElementById('gal-url-inp');
const galTitleInp=document.getElementById('gal-title-inp');
const galAddBtn=document.getElementById('gal-add-btn');

if(galAddBtn) galAddBtn.addEventListener('click',()=>{
  addImageFromURL(galUrlInp.value.trim(),galTitleInp.value.trim());
  galUrlInp.value='';galTitleInp.value='';
});
if(galUrlInp) galUrlInp.addEventListener('keydown',e=>{
  if(e.key==='Enter'){addImageFromURL(galUrlInp.value.trim(),galTitleInp.value.trim());galUrlInp.value='';galTitleInp.value='';}
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
     work:'Computer repair & assembly, OS installation, CCTV setup, networking support'},
  ],
  skills: {
    'CCTV & Surveillance': 95,
    'ATMS Infrastructure': 93,
    'Hardware Troubleshooting': 92,
    'ANPR Systems': 90,
    'NVR/NAS Support': 88,
    'Networking': 88,
    'LAN/WAN Setup': 86,
    'RF Wireless': 82,
    'Windows & Linux': 80,
    'Server Troubleshooting': 78,
  },
  services: ['ATMS Infrastructure','CCTV & Surveillance','ANPR Systems','Networking & LAN/WAN','Server & System Support','Field IT Support'],
};

// Smart response engine
function getNirbhayReply(q) {
  const ql = q.toLowerCase();

  // Greetings
  if (/^(hi|hello|hey|namaste|helo|hii|sup|yo)\b/.test(ql))
    return `Hi! Main Nirbhay Rai hoon — IT Site Support Executive aur ATMS & Network Engineer. 5+ saal ka experience hai highway IT infrastructure mein. Kuch poochna hai? 😊`;

  // Name
  if (/your name|kaun ho|naam|who are you|introduce/.test(ql))
    return `Main Nirbhay Rai hoon — IT professional with 5+ years of field experience in ATMS, CCTV, ANPR, and Networking on highway projects across India.`;

  // Current job
  if (/current|abhi|now|present|kahan|kaha kaam|working/.test(ql))
    return `Abhi main Site Support Executive hoon QuaLiX Information System LLP mein (Nov 2024 se present). ATMS devices, CCTV, ANPR systems, aur networking manage karta hoon highway sites pe.`;

  // Experience
  if (/experience|kitne saal|how many year|work history|career/.test(ql))
    return `Mere paas 5+ saal ka experience hai:\n1. Site Support Executive — QuaLiX (2024–Present)\n2. Resident Engineer — Vaaan Infra (2022–2024)\n3. Computer Technician — Joy Computers (2020–2022)`;

  // Skills
  if (/skill|kya aata|kya jaanta|expertise|best at|strongest/.test(ql))
    return `Mere top skills: CCTV & Surveillance (95%), ATMS Infrastructure (93%), Hardware Troubleshooting (92%), ANPR Systems (90%), NVR/NAS (88%), Networking (88%), LAN/WAN (86%), RF Wireless (82%).`;

  // CCTV
  if (/cctv|camera|surveillance|nvr|nas|ptz/.test(ql))
    return `Haan, CCTV mera strongest skill hai (95%). PTZ configuration, NVR/NAS setup, remote monitoring, aur live fault resolution — sab kuch karta hoon highway sites pe.`;

  // ATMS
  if (/atms|traffic|highway|road/.test(ql))
    return `ATMS (Automatic Traffic Management System) mera core domain hai. Device installation, configuration, troubleshooting — sab kuch. QuaLiX mein abhi bhi yahi kaam kar raha hoon highway projects pe.`;

  // ANPR
  if (/anpr|number plate|ocr|toll/.test(ql))
    return `ANPR mein camera alignment, OCR engine configuration, aur toll system integration karta hoon. Field pe khud troubleshoot karta hoon bina vendor ke depend kiye.`;

  // Networking
  if (/network|lan|wan|router|switch|rf|wireless/.test(ql))
    return `Networking mera strong area hai — LAN/WAN setup (86%), RF Wireless (82%). Remote highway sites pe fiber nahi hota, toh RF wireless links deploy karta hoon.`;

  // Location
  if (/location|kahan rehte|address|city|state|uttar pradesh|up|kushinagar/.test(ql))
    return `Main Kushinagar, Uttar Pradesh mein rehta hoon. Pan India kaam ke liye available hoon.`;

  // Contact
  if (/contact|email|phone|number|reach|call|mail/.test(ql))
    return `Mujhse contact kar sakte ho:\n📧 nirbhayrai722@gmail.com\n📱 +91 6392324588\n💬 WhatsApp: wa.me/916392324588`;

  // Job/hire
  if (/hire|job|opportunity|vacancy|available|recruit/.test(ql))
    return `Haan, main abhi IT, Toll, ATMS, Highway, aur Networking roles ke liye available hoon across India. Directly contact kar sakte ho — nirbhayrai722@gmail.com ya +91 6392324588.`;

  // LinkedIn/social
  if (/linkedin|instagram|social/.test(ql))
    return `LinkedIn: linkedin.com/in/nirbhay-rai-2b813220a\nInstagram: @nirbhay_raii`;

  // Salary
  if (/salary|ctc|package|pay/.test(ql))
    return `Salary expectations ke baare mein seedha baat karte hain — nirbhayrai722@gmail.com pe email karo ya WhatsApp karo.`;

  // Education — removed from site but answer if asked
  if (/education|degree|college|qualification|study/.test(ql))
    return `Meri field-based expertise 5+ saal ke practical highway IT experience se aayi hai. ATMS, CCTV, ANPR, Networking — sab kuch live projects pe seekha hai.`;

  // Services
  if (/service|kya karta|work|domain|speciali/.test(ql))
    return `Main yeh kaam karta hoon:\n• ATMS Infrastructure\n• CCTV & Surveillance\n• ANPR Systems\n• Networking & LAN/WAN\n• Server & System Support\n• Field IT Support on highways`;

  // Thanks
  if (/thank|shukriya|thanks|appreciate/.test(ql))
    return `Most welcome! Koi bhi sawal ho toh poochho. Hire karna ho toh nirbhayrai722@gmail.com pe zaroor likhna. 😊`;

  // Default
  return `Mujhse kuch bhi pooch sakte ho mere skills, experience, ya current work ke baare mein. Ya seedha contact karo: nirbhayrai722@gmail.com | +91 6392324588`;
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
