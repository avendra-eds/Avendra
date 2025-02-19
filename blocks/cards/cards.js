export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('card');
    const cardBackgroundImage = row.querySelectorAll('div')[0];
    cardBackgroundImage.classList.add('card-background-image');

    const cardHeader = row.querySelectorAll('div')[1];
    cardHeader.classList.add('card-header');

    const cardLinkIcon = row.querySelectorAll('div')[2];
    cardLinkIcon.classList.add('card-link-icon');

    const cardLink = cardLinkIcon.querySelector('a');
    if (cardLink) {
      const url = cardLink.href;
      const newLink = document.createElement('a');
      newLink.href = url;
      newLink.classList.add('card-background-link');
      row.style.position = 'relative';
      row.insertBefore(newLink, row.firstChild);
    }
  });
}
