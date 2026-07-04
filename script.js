/* === Hamburger Menu === */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

/* === Active Link on Scroll === */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  let current = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach((a) => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

/* === Typing Effect on Greeting === */
const greeting = document.querySelector('.hero-greeting');
if (greeting) {
  const text = greeting.textContent;
  greeting.textContent = '';
  greeting.style.visibility = 'visible';
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      greeting.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, 60 + Math.random() * 40);
    }
  }
  setTimeout(typeChar, 500);
}

/* === Scroll to Top Button === */
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  scrollTop.classList.toggle('show', window.scrollY > 300);
});

scrollTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* === Custom Cursor === */
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, input, textarea, .btn').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursorRing.classList.add('hover');
    cursorDot.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.classList.remove('hover');
    cursorDot.classList.remove('hover');
  });
});

/* === Mouse Glow Effect === */
const glow = document.createElement('div');
glow.classList.add('mouse-glow');
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

/* === Particle Canvas === */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null, radius: 150 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (mouse.x && mouse.y) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * force * 1.5;
        this.y -= Math.sin(angle) * force * 1.5;
      }
    }

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particleCount = Math.min(100, Math.floor(window.innerWidth / 10));
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* === Data Stream Effect === */
const streamCanvas = document.getElementById('dataStream');
const sctx = streamCanvas.getContext('2d');

function resizeStream() {
  streamCanvas.width = window.innerWidth;
  streamCanvas.height = window.innerHeight;
}
resizeStream();
window.addEventListener('resize', resizeStream);

const fontSize = 12;
const cols = Math.floor(streamCanvas.width / fontSize);
const drops = Array(cols).fill(1).map(() => Math.floor(Math.random() * -100));

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>/{}[]|&^%$#@!';

function drawStream() {
  sctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
  sctx.fillRect(0, 0, streamCanvas.width, streamCanvas.height);
  sctx.font = fontSize + 'px monospace';
  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    sctx.fillStyle = drops[i] * fontSize > streamCanvas.height * 0.5
      ? 'rgba(0, 255, 136, 0.15)'
      : 'rgba(0, 212, 255, 0.08)';
    sctx.fillText(char, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > streamCanvas.height || Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
  requestAnimationFrame(drawStream);
}
drawStream();

/* === Scroll Reveal Animations === */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

/* === Split Text Animations === */
function splitWords(el) {
  const text = el.textContent.trim();
  const words = text.split(' ');
  el.textContent = '';
  words.forEach((word, wi) => {
    const chars = word.split('');
    const wordSpan = document.createElement('span');
    wordSpan.classList.add('word');
    wordSpan.style.transitionDelay = wi * 0.08 + 's';
    chars.forEach((char, ci) => {
      const charSpan = document.createElement('span');
      charSpan.classList.add('char');
      charSpan.textContent = char;
      charSpan.style.transitionDelay = (wi * 0.08 + ci * 0.03) + 's';
      wordSpan.appendChild(charSpan);
    });
    el.appendChild(wordSpan);
    if (wi < words.length - 1) {
      el.appendChild(document.createTextNode(' '));
    }
  });
}

const splitObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const words = entry.target.querySelectorAll('.word');
        const chars = entry.target.querySelectorAll('.char');
        words.forEach((w, i) => {
          setTimeout(() => w.classList.add('visible'), i * 80);
        });
        chars.forEach((c, i) => {
          setTimeout(() => c.classList.add('visible'), i * 30);
        });
        splitObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('[data-split]').forEach((el) => {
  splitWords(el);
  splitObserver.observe(el);
});

/* === Skill Bars Animation === */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.style.width;
        skillObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.3 }
);

skillFills.forEach((fill) => {
  fill.style.width = '0%';
  skillObserver.observe(fill);
});

/* === Contact Form === */
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.querySelector('input[placeholder="Your Name"]');
  const email = form.querySelector('input[placeholder="Your Email"]');
  const subject = form.querySelector('input[placeholder="Subject"]');
  const message = form.querySelector('textarea');

  if (!name.value.trim() || !email.value.trim() || !subject.value.trim() || !message.value.trim()) {
    alert('Please fill in all fields.');
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email.value)) {
    alert('Please enter a valid email.');
    return;
  }

  const btn = form.querySelector('button');
  btn.disabled = true;
  btn.innerHTML = 'Sending...';

  setTimeout(() => {
    alert('Message sent successfully! I will get back to you soon.');
    form.reset();
    btn.disabled = false;
    btn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
  }, 1000);
});
