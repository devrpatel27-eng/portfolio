document.getElementById('year').textContent = new Date().getFullYear();

const sectionToggles = document.querySelectorAll('.section-toggle');
function setSectionOpen(toggle, open) {
  toggle.setAttribute('aria-expanded', String(open));
  const panel = document.getElementById(toggle.getAttribute('aria-controls'));
  panel.classList.toggle('open', open);
}
sectionToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setSectionOpen(toggle, !isOpen);
  });
});

function openSectionById(id) {
  const toggle = document.querySelector(`.section-toggle[data-section="${id}"]`);
  if (toggle && toggle.getAttribute('aria-expanded') !== 'true') {
    setSectionOpen(toggle, true);
  }
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const id = link.getAttribute('href').slice(1);
    openSectionById(id);
  });
});

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

document.querySelectorAll(
  '.about-grid, .timeline-item, .card, .project, .skill-group, .contact-links'
).forEach((el) => el.classList.add('fade-up'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
document.querySelectorAll('.kicker').forEach((el) => observer.observe(el));

const progressBar = document.getElementById('scrollProgress');
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const magneticBtn = document.querySelector('.btn-primary');
if (magneticBtn && matchMedia('(hover: hover)').matches) {
  magneticBtn.addEventListener('mousemove', (e) => {
    const rect = magneticBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    magneticBtn.style.transform = `translate(${x * 0.25}px, ${y * 0.25 - 2}px)`;
  });
  magneticBtn.addEventListener('mouseleave', () => {
    magneticBtn.style.transform = '';
  });
}
