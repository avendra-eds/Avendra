export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('card');
    const cardBackgroundImage = row.querySelectorAll('div')[0];
    cardBackgroundImage.classList.add('card-background-image');

    const cardHeader = row.querySelectorAll('div')[1];
    cardHeader.classList.add('card-header');

    const cardLinkIcon = row.querySelectorAll('div')[2];
    cardLinkIcon.classList.add('card-link-icon');

    const linkElement = row.querySelector('.card-link-icon a');
    if (linkElement) {
      const url = linkElement.href;
      row.addEventListener('click', (event) => {
        if (!event.target.closest('.card-link-icon')) {
          window.location.href = url;
        }
      });
    }
  });
}
