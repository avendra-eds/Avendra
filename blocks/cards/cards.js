export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('card');
    const cardBackgroundImage = row.querySelectorAll('div')[0];
    cardBackgroundImage.classList.add('card-background-image');

    const cardHeader = row.querySelectorAll('div')[1];
    cardHeader.classList.add('card-header');

    const cardLinkIcon = row.querySelectorAll('div')[2];
    cardLinkIcon.classList.add('card-link-icon');

    const cardLink = cardBackgroundImage.querySelector('p a');
    if (cardLink && cardBackgroundImage) {
      cardLink.classList.add('card-background-link');
      cardBackgroundImage.parentNode.replaceChild(cardLink, cardBackgroundImage);
      cardLink.appendChild(cardBackgroundImage);
    }
  });
}
