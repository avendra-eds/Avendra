export default function decorate(section) {
  const resourceSection = document.createElement('div');
  const resources = section.querySelector('.article-cards-wrapper');
  resourceSection.classList.add('resource-section');
  resourceSection.append(resources);
}
