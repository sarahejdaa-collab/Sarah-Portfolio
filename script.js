// ── Scroll fade-in animatie voor secties ──
const cards = document.querySelectorAll('.card-inner');

cards.forEach(card => card.classList.add('fade-hidden'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('fade-hidden');
      entry.target.classList.add('fade-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

cards.forEach(card => observer.observe(card));


// ── Actieve navlink markeren bij scrollen ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => navObserver.observe(section));


// ── Portfolio afbeelding lightbox ──
const portfolioImgs = document.querySelectorAll('.portfolio-item');

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.cssText = `
  display: none; position: fixed; inset: 0; z-index: 999;
  background: rgba(10,20,50,0.92); backdrop-filter: blur(8px);
  align-items: center; justify-content: center; cursor: zoom-out;
`;
lightbox.innerHTML = `<img id="lightbox-img" style="max-width:90vw; max-height:90vh;
  border-radius:16px; box-shadow:0 8px 48px rgba(0,0,0,0.6);">`;
document.body.appendChild(lightbox);

portfolioImgs.forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    document.getElementById('lightbox-img').src = src;
    lightbox.style.display = 'flex';
  });
});

lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});
// Skills slider
document.querySelectorAll('.skill-card').forEach(card => {
  const slides = card.querySelectorAll('.skill-slide');
  const dots = card.querySelectorAll('.skill-dot');
  const prev = card.querySelector('.skill-nav-btn.prev');
  const next = card.querySelector('.skill-nav-btn.next');

  if (slides.length <= 1) return;

  let current = 0;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');

    slides.forEach((slide, i) => {
      const video = slide.querySelector('video');
      if (video && i !== current) video.pause();
    });
  }

  if (prev) prev.addEventListener('click', () => goTo(current - 1));
  if (next) next.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Swipe op mobiel
  let startX = 0;
  card.addEventListener('touchstart', e => { startX = e.changedTouches[0].screenX; }, { passive: true });
  card.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });
});