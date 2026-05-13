/* =============================================
   NIRBHAY RAI PORTFOLIO — script.js
============================================= */

/* ========== LOADER ========== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1800);
});

/* ========== PARTICLE CANVAS ========== */
(function () {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const COUNT = window.innerWidth < 600 ? 40 : 80;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    };
  }

  for (let i = 0; i < COUNT; i++) particles.push(createParticle());

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${p.alpha})`;
      ctx.fill();
    });

    // Draw lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${0.05 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ========== NAVBAR ========== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobLinks = document.querySelectorAll('.mob-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Scroll top btn
  const scrollTop = document.getElementById('scroll-top');
  scrollTop.classList.toggle('visible', window.scrollY > 400);

  // Active nav link highlight
  highlightNav();
});

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
}

/* ========== SCROLL TOP ========== */
document.getElementById('scroll-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ========== TYPING ANIMATION ========== */
const typingEl = document.getElementById('typing-text');
const typingWords = [
  'CCTV Specialist',
  'Networking Engineer',
  'ANPR Support Engineer',
  'Server & System Support',
  'Highway Traffic Management Specialist',
];
let wordIdx = 0;
let charIdx = 0;
let deleting = false;

function type() {
  const word = typingWords[wordIdx];
  if (!deleting) {
    typingEl.textContent = word.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === word.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typingEl.textContent = word.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % typingWords.length;
    }
  }
  setTimeout(type, deleting ? 50 : 90);
}
type();

/* ========== REVEAL ON SCROLL ========== */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
reveals.forEach(el => revealObserver.observe(el));

/* ========== ANIMATED COUNTERS ========== */
const counters = document.querySelectorAll('.stat-num');
let counted = false;

function startCounters() {
  if (counted) return;
  const hero = document.getElementById('hero');
  const heroBottom = hero.getBoundingClientRect().bottom;
  if (heroBottom < window.innerHeight + 100) {
    counted = true;
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      let count = 0;
      const step = Math.ceil(target / 40);
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          counter.textContent = target;
          clearInterval(interval);
        } else {
          counter.textContent = count;
        }
      }, 40);
    });
  }
}
window.addEventListener('scroll', startCounters);
startCounters();

/* ========== SKILL BAR ANIMATION ========== */
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.dataset.width;
        entry.target.style.width = target + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
skillFills.forEach(fill => skillObserver.observe(fill));

/* ========== GALLERY LIGHTBOX ========== */
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbTitle = document.getElementById('lb-title');
const lbClose = document.getElementById('lb-close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const title = item.dataset.title;
    lbImg.src = img.src;
    lbTitle.textContent = title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

/* ========== VIEW CV ========== */
// CV opens in new tab — no download needed

/* ========== EMAILJS INIT ========== */
// Replace these with your actual EmailJS credentials from https://emailjs.com
const EMAILJS_SERVICE_ID  = 'service_l5hpv3q';
const EMAILJS_TEMPLATE_ID = 'template_aa8euch';
const EMAILJS_PUBLIC_KEY  = 'AUdNqm9ubUs9cT86J';

(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
})();

/* ========== CONTACT FORM (EmailJS) ========== */
const contactForm = document.getElementById('contact-form');
const formStatus  = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !subject || !message) {
    showStatus('Please fill all fields.', 'error');
    return;
  }

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  try {
    if (typeof emailjs !== 'undefined' && EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID') {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        subject:    subject,
        message:    message,
        to_name:    'Nirbhay Rai',
      });
    } else {
      // Dev fallback – simulate network delay
      await new Promise(r => setTimeout(r, 1200));
    }

    showStatus('✓ Message sent! I will get back to you soon.', 'success');
    contactForm.reset();
  } catch (err) {
    showStatus('✗ Error sending message. Please try again.', 'error');
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  }
});

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = 'form-status ' + type;
  setTimeout(() => {
    formStatus.className = 'form-status';
    formStatus.textContent = '';
  }, 4000);
}
