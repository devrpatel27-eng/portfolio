document.getElementById('year').textContent = new Date().getFullYear();

/* Mobile nav */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
navToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

/* Nav rule appears once you scroll */
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Project tabs */
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab, focus) {
  tabs.forEach((t) => {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  });
  if (focus) tab.focus();
  tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (e) => {
    const n = tabs.length;
    const next = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (next !== undefined) { e.preventDefault(); selectTab(tabs[next], true); }
  });
});
