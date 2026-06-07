================================================================
  NIRBHAY RAI — PORTFOLIO WEBSITE
  Developer Guide & Edit Reference
  Version: 4.3 | Last Updated: June 2026
================================================================

FILES STRUCTURE
---------------
  index.html   → Main HTML file (all sections, content)
  style.css    → All CSS styles, colors, animations
  script.js    → JavaScript (bubble bg, AI bot, gallery, etc.)
  nirbhay.jpeg → Profile photo (must stay in same folder)
  README.txt   → This file

HOW TO RUN LOCALLY
------------------
  Just open index.html in any browser (Chrome recommended).
  No server needed — it runs as a plain HTML file.
  For EmailJS contact form to work, internet connection required.


================================================================
  SECTION-BY-SECTION EDIT GUIDE
================================================================

--- 1. HERO SECTION (Name, Title, Buttons) ---
  File: index.html
  Find: <section id="hero">

  To change name:
    <h1 class="h-name">Nirbhay<br><em>Rai<span class="ndot">.</span></em></h1>

  To change typing roles (animated text):
    File: script.js
    Find: const words=[...]
    Edit the array values. Example:
      const words=['ATMS Site Support Executive','CCTV Specialist','Your New Role Here'];

  To change tagline:
    Find: <p class="h-tagline">
    Edit the paragraph text.

  To change CV link:
    Find: <a href="NirbhayRai_CV.pdf"
    Replace NirbhayRai_CV.pdf with your PDF filename (keep in same folder).


--- 2. STATS (Numbers below hero) ---
  File: index.html
  Find: <div class="h-stats">

  Each stat looks like:
    <span class="hs-n" data-t="5">0</span>
  Change data-t="5" to your number. Example: data-t="7" for 7+


--- 3. ABOUT SECTION ---
  File: index.html
  Find: <section id="about">

  Edit the <p> paragraph tags to change about text.
  Info rows (location, email, phone):
    Find: <div class="abt-info">
    Edit <span> text inside each ai-row.


--- 4. WHAT I DO / SERVICES ---
  File: index.html
  Find: <section id="services">

  Each service card:
    <div class="svc-card reveal">
      <div class="svc-no">01</div>           ← Card number
      <div class="svc-icon"><i class="fas fa-traffic-light"></i></div>  ← Icon
      <h3>ATMS Infrastructure</h3>           ← Title
      <p>Description here...</p>             ← Description
      <div class="svc-tags"><span>Tag1</span></div>  ← Tags
    </div>

  To add a new service card:
    Copy one card block and paste after last </div> before </div></div></section>
    Change the number, icon, title, description, tags.

  Icon codes: https://fontawesome.com/icons (use "fas fa-ICONNAME")


--- 5. SKILLS (Progress Bars) ---
  File: index.html
  Find: <section id="skills">

  Each skill row:
    <div class="sk-row reveal">
      <div class="sk-top">
        <span><i class="fas fa-video"></i> CCTV & Surveillance</span>
        <span>95%</span>           ← Percentage shown
      </div>
      <div class="sk-track">
        <div class="sk-fill" data-w="95"></div>  ← data-w = bar width %
      </div>
    </div>

  IMPORTANT: Change BOTH the <span>95%</span> AND data-w="95" to same number.

  To add a new skill: copy a sk-row block and paste below last one.


--- 6. EXPERIENCE (Timeline) ---
  File: index.html
  Find: <section id="experience">

  Each job:
    <h3>Job Title Here</h3>
    <span class="exp-dur">Date Range</span>
    <p class="exp-co">Company Name</p>
    <p class="exp-desc">Job description...</p>
    <div class="exp-chips"> ← Bullet points of responsibilities
      <span><i class="fas fa-check"></i> Task here</span>

  For CURRENT job, add: <span class="exp-now">● Current</span>
  For old jobs, remove that line.


--- 7. VLOG SECTION ---
  File: index.html
  Find: <section id="vlog">

  Each vlog card:
    <img src="IMAGE_URL" alt="..."/>    ← Change image URL
    <span class="vc-cat">CATEGORY</span>  ← e.g. CCTV, ANPR, Networking
    <span class="vc-date">Date</span>
    <h3>Blog Title</h3>
    <p>Short description</p>
    <a href="#">                        ← Change # to your blog link

  FINDING FREE IMAGES (Unsplash):
    Go to: https://unsplash.com
    Search your topic → click image → click Download arrow → Copy URL
    Format for use: https://images.unsplash.com/photo-XXXXXXXX?w=700&q=80


--- 8. GALLERY ---
  File: index.html
  Find: <section id="gallery">

  Each gallery item:
    <div class="gal-item reveal" data-title="Your Title Here">
      <img src="YOUR_IMAGE_URL" alt="Alt text" loading="lazy"/>
      <div class="gal-ov"><i class="fas fa-expand"></i><span>Your Title</span></div>
    </div>

  To add a new image: copy one gal-item block, paste inside gal-grid div, 
  change src URL and data-title/span text.

  To remove an image: delete the entire <div class="gal-item ..."> block.


--- 9. CONTACT SECTION ---
  File: index.html
  Find: <section id="contact">

  Change contact details:
    Email:    <a href="mailto:YOUR@EMAIL">YOUR@EMAIL</a>
    Phone:    <a href="tel:+91XXXXXXXXXX">+91 XXXXXXXXXX</a>
    Location: <span>Your City, State</span>


--- 10. AI ASSISTANT BOT ---
  File: script.js
  Find: const NR = {

  Update the knowledge base object with correct info:
    name, role, exp, location, email, phone, etc.

  The bot auto-detects Hindi vs English input and replies accordingly.
  
  To add a new topic the bot can answer:
    Find: // Default
    Add ABOVE it:
      if (/keyword1|keyword2/.test(ql))
        return hindi
          ? `Hindi answer here`
          : `English answer here`;


--- 11. SOCIAL LINKS ---
  File: index.html
  Find: <div class="h-socials">

  Links currently active:
    Email, Phone, LinkedIn, Instagram

  To enable Facebook (currently hidden):
    Find: id="social-fb" style="display:none"
    Remove: style="display:none"
    Change: href="https://facebook.com/YOUR_USERNAME"

  To enable Twitter/X (currently hidden):
    Find: id="social-x" style="display:none"
    Remove: style="display:none"
    Change: href="https://x.com/YOUR_USERNAME"


--- 12. FOOTER ---
  File: index.html
  Find: <footer>
  Edit: <p>Nirbhay Rai</p> → Change name if needed
  Copyright year: &copy; 2025 → Change to current year


================================================================
  COLORS & THEME CUSTOMIZATION
================================================================

  File: style.css
  Find: :root {

  Main accent color (cyan/blue):
    --acc: #00d4ff;           ← Change this to any color
    --acc-2: #0070ff;

  Background color (dark mode):
    --bg: #060d1a;
    --bg-2: #0a1628;

  Background (light mode):
    Find: [data-theme="light"] {
    --bg: #f0f4ff;

  To change the bubble animation color:
    File: script.js
    Find: rgba(0,212,255   ← This is the bubble color (R,G,B)
    Change to any RGB value. Example: rgba(0,255,150 for green.


================================================================
  EMAILJS SETUP (Contact Form)
================================================================

  The contact form sends emails via EmailJS (free service).
  
  Current credentials in script.js:
    EMAILJS_SERVICE_ID = 'service_l5hpv3q'
    EMAILJS_TEMPLATE_ID = 'template_aa8euch'
    EMAILJS_PUBLIC_KEY = 'AUdNqm9ubUs9cT86J'

  To update (if emails stop working):
    1. Go to https://www.emailjs.com
    2. Login → Email Services → Get Service ID
    3. Email Templates → Get Template ID
    4. Account → Public Key
    5. Replace values in script.js

  Test: Fill form on website → check nirbhayrai722@gmail.com inbox


================================================================
  PROFILE PHOTO
================================================================

  Current photo: nirbhay.jpeg
  Must stay in same folder as index.html.

  To change photo:
    1. Put new photo in same folder
    2. In index.html, find: <img src="nirbhay.jpeg"
    3. Change nirbhay.jpeg to your new filename


================================================================
  ADDING A NEW SECTION
================================================================

  Step 1: Add nav link in index.html
    Find: <ul class="n-links">
    Add: <li><a href="#newsection">New Section</a></li>
    Also add to mobile menu: <li><a href="#newsection" class="ml">New Section</a></li>

  Step 2: Add section HTML
    <section id="newsection" class="sec">
      <div class="sec-inner">
        <h2 class="sec-h center">Section <span class="acc">Title</span></h2>
        <p class="sec-sub">Subtitle here</p>
        <!-- your content here -->
      </div>
    </section>

  Step 3: Alternating background
    Odd sections use class="sec"
    Even sections use class="sec alt-sec"
    Just alternate these for proper background separation.


================================================================
  HOSTING THE WEBSITE (Free Options)
================================================================

  Option 1 — GitHub Pages (Recommended, Free):
    1. Create GitHub account at github.com
    2. New repository → name it "nirbhay-portfolio"
    3. Upload all files (index.html, style.css, script.js, nirbhay.jpeg)
    4. Settings → Pages → Source: main branch
    5. Your site: https://USERNAME.github.io/nirbhay-portfolio

  Option 2 — Netlify (Free, Easy):
    1. Go to netlify.com → Sign up free
    2. Drag & drop your folder onto Netlify dashboard
    3. Get instant live URL like: https://nirbhay-portfolio.netlify.app

  Option 3 — Vercel (Free):
    1. Go to vercel.com → Sign up free
    2. Import from GitHub or drag & drop
    3. Instant deployment


================================================================
  QUICK REFERENCE — COMMON EDITS
================================================================

  Change phone number    → index.html → search "+91 6392324588"
  Change email           → index.html → search "nirbhayrai722@gmail.com"
  Change LinkedIn        → index.html → search "linkedin.com/in/nirbhay"
  Change Instagram       → index.html → search "@nirbhay_raii"
  Change profile photo   → replace nirbhay.jpeg file
  Change CV/Resume file  → replace NirbhayRai_CV.pdf file
  Add new skill          → index.html → section id="skills"
  Add new service        → index.html → section id="services"
  Add new gallery image  → index.html → section id="gallery"
  Fix broken image       → get new URL from unsplash.com
  Change accent color    → style.css → :root → --acc value


================================================================
  BROWSER COMPATIBILITY
================================================================

  Tested & works on:
    ✓ Chrome (recommended)
    ✓ Firefox
    ✓ Edge
    ✓ Safari
    ✓ Mobile Chrome / Safari

  Best viewed at: 1280px+ width on desktop
  Mobile responsive: Yes (down to 320px)


================================================================
  CONTACT FOR DEVELOPMENT HELP
================================================================

  If aap kuch edit karna chahte ho aur kuch samajh na aaye,
  toh Claude AI se pooch sakte ho — index.html, style.css, 
  ya script.js paste karo aur change batao.

================================================================
  END OF README
================================================================
