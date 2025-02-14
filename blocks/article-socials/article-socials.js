import { fetchPlaceholders } from '/scripts/aem.js';

export default async function decorate(block) {
  
  const isUk =
    block.classList.contains('uk') ||
    block.querySelector('.article-socials')?.classList.contains('uk');

  const prefix = isUk ? 'en/uk' : 'en/us';

  const placeholders = await fetchPlaceholders(prefix);

  // iconName must match placeholder key
  const icons = block.querySelectorAll('img[data-icon-name]');
  icons.forEach((img) => {
    const iconName = img.getAttribute('data-icon-name');
    let url = placeholders[iconName];
    
    if (url) {
      console.log("url--", url, "icon---", iconName);

      // no https:// for 'mailto'
      if (!/^https?:\/\//i.test(url) && !/^mailto:/i.test(url)) {
        url = "https://" + url;
      }

      const iconSpan = img.closest('span.icon');
      if (iconSpan && !iconSpan.closest('a')) {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        iconSpan.parentNode.insertBefore(link, iconSpan);
        link.appendChild(iconSpan);
      }
    }
  });
}
