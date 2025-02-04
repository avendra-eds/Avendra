export default function decorate(block) {
  [...block.children].forEach((row) => {
    
    row.classList.add('card');

    let cardBackgroundImage = row.querySelectorAll('div')[0];
    cardBackgroundImage.classList.add('card-background-image');

    let cardHeader = row.querySelectorAll('div')[1];
    cardHeader.classList.add('card-header');

    let cardLinkIcon = row.querySelectorAll('div')[2];
    cardLinkIcon.classList.add('card-link-icon')
    
    let iconLinkDiv = row.querySelectorAll('div')[row.querySelectorAll('div').length - 1]    
    let iconLink = iconLinkDiv.querySelector('a');
    if(iconLink) {
      let href = iconLink.getAttribute("href"); // fetching href from anchor tag
      let image = cardLinkIcon.querySelector('img')
      let link = document.createElement('a');
      link.href = href;
      link.target = "_blank";
      image.parentNode.insertBefore(link, image);
      link.appendChild(image);
      iconLink.style.display = 'none'; // removing the anchor tag from DOM
    }

    let backgroundDiv = row.querySelector('.card-background-image');
    let backgroundImage = backgroundDiv?.querySelector('img');
    if (backgroundImage) {
      let imageUrl = backgroundImage.getAttribute('src'); 
      row.style.backgroundImage = `url('${imageUrl}')`;
      row.style.backgroundSize = 'cover'; 
      row.style.backgroundPosition = 'center';
      row.style.backgroundRepeat = 'no-repeat';
      backgroundDiv.remove();
    }
  }
)}