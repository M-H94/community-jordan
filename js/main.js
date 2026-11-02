// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Countdown
const eventDate = new Date('2026-11-20T16:00:00+03:00').getTime();
function updateCountdown() {
  const dist = eventDate - Date.now();
  if (dist < 0) {
    ['days','hours','minutes','seconds'].forEach(id => document.getElementById(id).textContent = '00');
    return;
  }
  document.getElementById('days').textContent = String(Math.floor(dist / 86400000)).padStart(2, '0');
  document.getElementById('hours').textContent = String(Math.floor((dist % 86400000) / 3600000)).padStart(2, '0');
  document.getElementById('minutes').textContent = String(Math.floor((dist % 3600000) / 60000)).padStart(2, '0');
  document.getElementById('seconds').textContent = String(Math.floor((dist % 60000) / 1000)).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// FAQ
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
