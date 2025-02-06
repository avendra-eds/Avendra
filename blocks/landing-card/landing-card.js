export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('card');
    const cardBackgroundImage = row.querySelectorAll('div')[0];
    cardBackgroundImage.classList.add('card-background-image');

    const cardHeader = row.querySelectorAll('div')[1];
    cardHeader.classList.add('card-header');

    const cardLinkIcon = row.querySelectorAll('div')[2];
    cardLinkIcon.classList.add('card-link-icon');

    const backgroundDiv = row.querySelector('.card-background-image');
    const backgroundImage = backgroundDiv?.querySelector('img');
    if (backgroundImage) {
      const imageUrl = backgroundImage.getAttribute('src');
      row.style.backgroundImage = `url('${imageUrl}')`;
      row.style.backgroundSize = 'cover';
      row.style.backgroundPosition = 'center';
      row.style.backgroundRepeat = 'no-repeat';
      backgroundDiv.remove();

      row.addEventListener('mouseover', () => {
        row.style.backgroundImage = "url('/assets/card-background.svg')";
      });

      row.addEventListener('mouseout', () => {
        row.style.backgroundImage = `url('${imageUrl}')`;
      });
    }
  });
}
