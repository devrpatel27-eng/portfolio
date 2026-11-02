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

/* Hero chart: total Chase branch deposits, $B (from projects/chase-branch-deposits) */
const deposits = [
  [2010, 614], [2011, 725], [2012, 812], [2013, 897],
  [2014, 1014], [2015, 1053], [2016, 1155],
];
const svg = document.getElementById('bars');
const group = document.getElementById('barGroup');
const readout = document.getElementById('chartReadout');
const NS = 'http://www.w3.org/2000/svg';
const BASE = 200, SCALE = 180 / 1200, SLOT = 420 / deposits.length, BAR = 38;
const fmt = (v) => '$' + v.toLocaleString('en-US') + 'B';

function show(i) {
  const [yr, v] = deposits[i];
  const growth = i === 0 ? '' : `, up ${Math.round((v / deposits[0][1] - 1) * 100)}% from 2010`;
  readout.innerHTML = `<b>${fmt(v)}</b> in ${yr}${growth}`;
  group.querySelectorAll('.col').forEach((c, j) => c.classList.toggle('active', j === i));
}
function reset() {
  show(deposits.length - 1);
  group.querySelectorAll('.col').forEach((c) => c.classList.remove('active'));
}

deposits.forEach(([yr, v], i) => {
  const x = i * SLOT + (SLOT - BAR) / 2;
  const h = v * SCALE;
  const col = document.createElementNS(NS, 'g');
  col.setAttribute('class', 'col');
  col.setAttribute('tabindex', '0');
  col.setAttribute('aria-label', `${yr}: ${fmt(v)}`);

  const hit = document.createElementNS(NS, 'rect');
  Object.entries({ class: 'hit', x: i * SLOT + 2, y: 0, width: SLOT - 4, height: BASE, rx: 4 })
    .forEach(([k, val]) => hit.setAttribute(k, val));

  const bar = document.createElementNS(NS, 'rect');
  Object.entries({ class: 'bar' + (i === deposits.length - 1 ? ' latest' : ''), x, y: BASE - h, width: BAR, height: h, rx: 3 })
    .forEach(([k, val]) => bar.setAttribute(k, val));
  bar.style.animationDelay = `${i * 70}ms`;

  const label = document.createElementNS(NS, 'text');
  Object.entries({ class: 'yr', x: x + BAR / 2, y: BASE + 18 }).forEach(([k, val]) => label.setAttribute(k, val));
  label.textContent = yr;

  col.append(hit, bar, label);
  col.addEventListener('mouseenter', () => show(i));
  col.addEventListener('focus', () => show(i));
  col.addEventListener('click', () => show(i));
  group.append(col);
});
group.addEventListener('mouseleave', reset);
group.addEventListener('focusout', (e) => { if (!group.contains(e.relatedTarget)) reset(); });
svg.classList.add('animate');
