const header = document.querySelector('.header');
const progress = document.querySelector('.scroll-progress');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? window.scrollY / max * 100 : 0}%`;
  header.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '打开菜单');
}));

const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px 45px 0px' }) : null;
document.querySelectorAll('.reveal').forEach(element => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('visible');
});

const filterButtons = [...document.querySelectorAll('.filter')];
const artCards = [...document.querySelectorAll('.art-card')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  artCards.forEach(card => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
  });
}));

const dialog = document.querySelector('.lightbox');
const dialogImage = dialog.querySelector('img');
const dialogTitle = dialog.querySelector('h3');
const dialogDetail = dialog.querySelector('p');
let lastTrigger;
document.querySelectorAll('[data-image]').forEach(card => card.addEventListener('click', () => {
  lastTrigger = card;
  dialogImage.src = card.dataset.image;
  dialogImage.alt = card.querySelector('img')?.alt || card.dataset.title;
  dialogTitle.textContent = card.dataset.title;
  dialogDetail.textContent = card.dataset.detail || '';
  dialog.showModal();
}));
dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  dialogImage.removeAttribute('src');
  lastTrigger?.focus();
});
