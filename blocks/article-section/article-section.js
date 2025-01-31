export default function decorate(block) {
  const container = block.firstElementChild;
  if (container) {
    container.classList.add('article-section-content');
    container.firstElementChild.classList.add('left');
    container.lastElementChild.classList.add('right');
  }

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('p');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
  block.append();
}
