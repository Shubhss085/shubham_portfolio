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

/* === Scroll to Top Button === */
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  scrollTop.classList.toggle('show', window.scrollY > 300);
});

scrollTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* === Skill Bars Animation === */
const skillFills = document.querySelectorAll('.skill-fill');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.style.width;
        observer.unobserve(fill);
      }
    });
  },
  { threshold: 0.3 }
);

skillFills.forEach((fill) => {
  fill.style.width = '0%';
  observer.observe(fill);
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
