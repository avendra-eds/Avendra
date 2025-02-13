export default function decorate(block) {
  [...block.children].forEach((card) => {
    card.classList.add('article-card');
    if (card.children.length >= 1) {
      card.children[0].classList.add('article-card-image');
      card.children[1].classList.add('article-card-body');
    } else {
      card.children[0].classList.add('article-card-body');
    }
  });

  const articleCardsBody = document.querySelectorAll('.article-card-body');
  articleCardsBody.forEach((articleCardBody) => {
    const tagContainer = document.createElement('div');
    tagContainer.classList.add('article-card-tags');
    articleCardBody.appendChild(tagContainer);
    const pElements = articleCardBody.querySelectorAll('p');
    pElements.forEach((p) => {
      if (p.querySelector('em > a') && p.length > 0) {
        const tags = p.getElementsByClassName('.button-container');
        tags.forEach((tag) => {
          tagContainer.append(tag);
        });
      } else if (p.querySelector('a')) {
        p.querySelectorAll('.button').forEach((button) => {
          const buttonParent = button.parentElement;
          buttonParent.classList.remove('button-container');
          button.classList.remove('button');
          buttonParent.classList.add('article-card-title');
        });
      } else if (p.querySelector('em')) {
        p.querySelector('em').classList.add('article-card-date');
      }
    });
  });
  //   if (children.length > dateIndex + 1) {
  //     const buttonsContainer = document.createElement('div');
  //     buttonsContainer.className = 'article-card-buttons';
  //     const extraButtons = children.slice(dateIndex + 1);
  //     extraButtons.forEach((btn) => {
  //       buttonsContainer.append(btn);
  //     });
  //     body.append(buttonsContainer);
  //   }
  // });
}
