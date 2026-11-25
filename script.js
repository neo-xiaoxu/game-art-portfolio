const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
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

const filterButtons = [...document.querySelectorAll('.filter')];
const galleryCards = [...document.querySelectorAll('.gallery-card')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  galleryCards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
}));

const dialog = document.querySelector('.lightbox');
const dialogImage = dialog.querySelector('img');
const dialogTitle = dialog.querySelector('h3');
const dialogDetail = dialog.querySelector('p');
let lastTrigger = null;
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
dialog.addEventListener('close', () => { dialogImage.removeAttribute('src'); lastTrigger?.focus(); });
