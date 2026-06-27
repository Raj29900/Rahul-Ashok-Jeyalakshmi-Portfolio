/* ============================================================
   PARTICLES BACKGROUND
   ============================================================ */
(function () {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, dots = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Dot() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.r = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.2;
  }

  function init() {
    dots = [];
    const count = Math.floor((W * H) / 14000);
    for (let i = 0; i < count; i++) dots.push(new Dot());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    dots.forEach(d => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > W) d.vx *= -1;
      if (d.y < 0 || d.y > H) d.vy *= -1;

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(114,161,222,${d.alpha})`;
      ctx.fill();
    });

    // draw connecting lines
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(114,161,222,${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); init(); });
  resize();
  init();
  draw();
})();

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrolled / total * 100) + '%';
});

/* ============================================================
   NAVBAR: SCROLL SHADOW + TOGGLE
   ============================================================ */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.querySelector('i').className =
    navLinks.classList.contains('open') ? 'bx bx-x' : 'bx bx-menu';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelector('i').className = 'bx bx-menu';
  });
});

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal, .reveal-right');

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // stagger siblings inside same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal, .reveal-right')];
      const i = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Math.min(i * 80, 400));
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObs.observe(el));

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}

const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObs.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) statsObs.observe(statsSection);

/* ============================================================
   TYPED HEADING EFFECT
   ============================================================ */
(function () {
  const el = document.querySelector('.typed-heading');
  if (!el) return;
  const titles = ['Industrial Engineer', 'Operations Expert', 'CAD Designer', 'Supply Chain Analyst'];
  let ti = 0, ci = 0, deleting = false;

  function type() {
    const current = titles[ti];
    const accentSpan = '<span class="accent">' + current.split(' ').slice(1).join(' ') + '</span>';
    const firstWord = current.split(' ')[0];

    if (!deleting) {
      ci++;
      const partial = current.slice(0, ci);
      const words = partial.split(' ');
      el.innerHTML = words[0] + (words.length > 1 ? ' <span class="accent">' + words.slice(1).join(' ') + '</span>' : '');
      if (ci === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      ci--;
      const partial = current.slice(0, ci);
      const words = partial.split(' ');
      el.innerHTML = words[0] + (words.length > 1 ? ' <span class="accent">' + words.slice(1).join(' ') + '</span>' : '');
      if (ci === 0) {
        deleting = false;
        ti = (ti + 1) % titles.length;
        setTimeout(type, 300);
        return;
      }
    }
    setTimeout(type, deleting ? 45 : 80);
  }

  // start after a short delay to let page load
  setTimeout(type, 800);
})();

/* ============================================================
   BACK TO TOP
   ============================================================ */
const bttBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  bttBtn.classList.toggle('visible', window.scrollY > 400);
});
bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ============================================================
   ACTIVE NAV LINK HIGHLIGHTING
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navAnchorLinks = document.querySelectorAll('.nav-links a');

const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchorLinks.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = '#72a1de';
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObs.observe(s));

/* ============================================================
   CONTACT FORM
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      formStatus.style.color = '#ff8080';
      formStatus.textContent = 'Please fill in all fields.';
      return;
    }

    formStatus.style.color = '#72e3a1';
    formStatus.textContent = 'Opening your email app…';

    const subject = encodeURIComponent(`Portfolio Contact – ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:kprrahul2018@gmail.com?subject=${subject}&body=${body}`;

    contactForm.reset();
    setTimeout(() => { formStatus.textContent = ''; }, 4000);
  });
}

/* ============================================================
   SMOOTH CARD TILT ON HOVER (subtle 3D feel)
   ============================================================ */
document.querySelectorAll('.project-card, .skill-card, .edu-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -4;
    const rotY = ((x - cx) / cx) * 4;
    card.style.transform = `translateY(-5px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});
