// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 1600);
});

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  backTop.classList.toggle('show', window.scrollY > 500);
});

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// ===== COUNTDOWN =====
const eventDate = new Date('2026-11-20T16:00:00+03:00').getTime();

function updateCountdown() {
  const now = Date.now();
  const dist = eventDate - now;

  if (dist < 0) {
    ['days','hours','minutes','seconds'].forEach(id => {
      document.getElementById(id).textContent = '00';
    });
    return;
  }

  document.getElementById('days').textContent = String(Math.floor(dist / 86400000)).padStart(2, '0');
  document.getElementById('hours').textContent = String(Math.floor((dist % 86400000) / 3600000)).padStart(2, '0');
  document.getElementById('minutes').textContent = String(Math.floor((dist % 3600000) / 60000)).padStart(2, '0');
  document.getElementById('seconds').textContent = String(Math.floor((dist % 60000) / 1000)).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== FAQ =====
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
  });
});

// ===== BACK TO TOP =====
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.feature-card, .detail-row, .rule-box, .prize-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
  observer.observe(el);
});
