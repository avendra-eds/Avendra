export default function decorate(block) {
  const label = document.querySelector('.heading-resources-wrapper');
  const articleResources = document.querySelector('.article-cards-wrapper');
  block.appendChild(label);
  block.appendChild(articleResources);
}
