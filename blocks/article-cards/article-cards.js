function decorateCardBody(articleCardBody) {
  const tagContainer = document.createElement('div');
  tagContainer.classList.add('article-card-tags');
  articleCardBody.appendChild(tagContainer);

  const pTags = articleCardBody.querySelectorAll('.button-container');
  if (pTags) {
    pTags.forEach((pTag) => {
      if (pTag.firstElementChild.nodeName === 'EM') {
        tagContainer.appendChild(pTag);
      } else {
        pTag.classList.remove('button-container');
        pTag.firstElementChild.classList.remove('button');
        pTag.classList.add('article-card-title');
      }
    });
  }

  const articleDescription = articleCardBody.querySelector('p:not([class])');
  if (articleDescription) {
    articleDescription.classList.add('article-card-description');
  }

  const articleDate = articleCardBody.querySelector('p > em');
  if (articleDate) {
    articleDate.classList.add('article-card-date');
  }
}

function decorateCardImage(imageContainer) {
  const image = imageContainer.querySelector('picture');
  const imageLink = imageContainer.querySelector('a');
  imageLink.appendChild(image);
}

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

  const articleCardsBody = block.querySelectorAll('.article-card-body');
  articleCardsBody.forEach(decorateCardBody);

  const articleCardImage = block.querySelectorAll('.article-card-image');
  if (articleCardImage) {
    articleCardImage.forEach(decorateCardImage);
  }
}
