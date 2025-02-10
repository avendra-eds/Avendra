import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'article-cards-card-image';
      else div.className = 'article-cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);

  // CUSTOM code for decorating sections for Article Cards
  ul.querySelectorAll('.article-cards-card-body').forEach((body) => {
    const children = Array.from(body.children);
    if (children.length < 3) return;
    const titleP = children[1];
    titleP.classList.add('article-card-title');
    let dateIndex;
    if (children[2].querySelector('strong')) {
      children[2].classList.add('article-card-subtitle');
      dateIndex = 3;
    } else {
      dateIndex = 2;
    }
    if (children[dateIndex]) {
      children[dateIndex].classList.add('article-card-date');
    }
    if (children.length > dateIndex + 1) {
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'article-cards-card-buttons';
      const extraButtons = children.slice(dateIndex + 1);
      extraButtons.forEach((btn) => {
        buttonsContainer.append(btn);
      });
      body.append(buttonsContainer);
    }
  });
}
