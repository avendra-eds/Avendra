export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('card');
    const cardBackgroundImage = row.querySelectorAll('div')[0];
    cardBackgroundImage.classList.add('card-background-image');

    const cardHeader = row.querySelectorAll('div')[1];
    cardHeader.classList.add('card-header');

    const cardLinkIcon = row.querySelectorAll('div')[2];
    cardLinkIcon.classList.add('card-link-icon');

    const iconLinkDiv = row.querySelectorAll('div')[row.querySelectorAll('div').length - 1];
    const iconLink = iconLinkDiv.querySelector('a');
    if (iconLink) {
      const href = iconLink.getAttribute('href'); // fetching href from anchor tag
      const image = cardLinkIcon.querySelector('img');
      const link = document.createElement('a');
      link.href = href;
      link.target = '_blank';
      image.parentNode.insertBefore(link, image);
      link.appendChild(image);
      iconLink.style.display = 'none'; // removing the anchor tag from DOM
    }

    const backgroundDiv = row.querySelector('.card-background-image');
    const backgroundImage = backgroundDiv?.querySelector('img');
    if (backgroundImage) {
      const imageUrl = backgroundImage.getAttribute('src');
      row.style.backgroundImage = `url('${imageUrl}')`;
      row.style.backgroundSize = 'cover';
      row.style.backgroundPosition = 'center';
      row.style.backgroundRepeat = 'no-repeat';
      backgroundDiv.remove();
    }
  });
}
