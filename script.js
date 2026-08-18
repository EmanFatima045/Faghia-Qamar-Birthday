/* =========================================================
   Faghia birthday site — interactions  ·  파기아
========================================================= */

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --- scroll reveal --- */
const revealItems = document.querySelectorAll('.reveal');
if (reduce) {
  revealItems.forEach(el => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.14 });
  revealItems.forEach(el => io.observe(el));
}

/* --- floating hearts --- */
const heartsLayer = document.getElementById('heartsLayer');
const heartChars = ['💜', '💜', '💜', '🤍', '✨'];
function spawnHeart() {
  if (reduce || document.hidden) return;
  const h = document.createElement('span');
  h.className = 'heart';
  h.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
  h.style.left = Math.random() * 100 + 'vw';
  h.style.fontSize = (0.8 + Math.random() * 1.6) + 'rem';
  const dur = 8 + Math.random() * 7;
  h.style.animationDuration = dur + 's';
  heartsLayer.appendChild(h);
  setTimeout(() => h.remove(), dur * 1000);
}
setInterval(spawnHeart, 700);

/* --- animated balloons --- */
const balloonsLayer = document.getElementById('balloonsLayer');
const balloonColors = ['#8b5fbf', '#a874d6', '#c9a24a', '#e6a8d8', '#b98ce0', '#d8c2ef'];
function spawnBalloon() {
  if (reduce || document.hidden) return;
  const track = document.createElement('div');
  track.className = 'balloon-track';
  track.style.left = (Math.random() * 96) + 'vw';
  const dur = 11 + Math.random() * 9;
  track.style.animationDuration = dur + 's';

  const body = document.createElement('div');
  body.className = 'balloon-body';
  const scale = 0.7 + Math.random() * 0.9;
  body.style.transform = `scale(${scale})`;
  body.style.setProperty('--c', balloonColors[Math.floor(Math.random() * balloonColors.length)]);
  body.style.animationDuration = (2.4 + Math.random() * 2.2) + 's';

  track.appendChild(body);
  balloonsLayer.appendChild(track);
  setTimeout(() => track.remove(), dur * 1000);
}
// a few to start, then keep them coming
for (let i = 0; i < 4; i++) setTimeout(spawnBalloon, i * 900);
setInterval(spawnBalloon, 2200);

/* --- "Make a wish" celebration burst --- */
const btn = document.getElementById('celebrateBtn');
const confettiColors = ['#8b5fbf', '#c9a24a', '#d8c2ef', '#a874d6', '#ffffff', '#5c3a86', '#e6a8d8'];
btn?.addEventListener('click', () => {
  const count = reduce ? 14 : 100;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.style.cssText = `
      position:fixed; z-index:999; left:50%; top:72%;
      width:9px; height:9px; border-radius:2px; pointer-events:none;
      background:${confettiColors[Math.floor(Math.random() * confettiColors.length)]};
    `;
    document.body.appendChild(p);
    const angle = Math.random() * Math.PI * 2;
    const power = 120 + Math.random() * 340;
    const dx = Math.cos(angle) * power;
    const dy = Math.sin(angle) * power - 180;
    p.animate([
      { transform: 'translate(0,0) rotate(0)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy + 420}px) rotate(${Math.random()*720}deg)`, opacity: 0 }
    ], { duration: 1500 + Math.random() * 900, easing: 'cubic-bezier(.2,.6,.2,1)' })
      .onfinish = () => p.remove();
  }
  btn.textContent = '생일 축하해, 파기아! 🎉';
  setTimeout(() => { btn.textContent = 'Make another wish 🎂'; }, 2800);
});