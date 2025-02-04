export default function decorate(block) {
  const container = block.firstElementChild;
  if (container) {
    container.classList.add('article-section-content');
    container.firstElementChild.classList.add('left');
    container.lastElementChild.classList.add('right');
  }
}
