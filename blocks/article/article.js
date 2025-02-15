export default function decorate(block) {
  const doc = document.querySelector('.section');
  const articleBanner = document.querySelector('.article-banner-wrapper');
  const articleContentLayout = document.createElement('div');
  const articleContent = document.createElement('div');
  const articleResources = document.querySelector('.article-resources-wrapper');
  const articleBottom = document.querySelector('.article-template-bottom-wrapper');

  doc.prepend(articleBanner);

  articleContentLayout.classList.add('article-layout');
  articleContent.classList.add('article-content');
  articleContentLayout.appendChild(articleContent);
  block.appendChild(articleContentLayout);

  const articleTagLabel = document.querySelector('.heading-text-tag-wrapper');
  const articleTags = document.querySelector('.tags-wrapper');
  const articleDivider = document.querySelector('.divider-wrapper');
  const articleSocialLabel = document.querySelector('.heading-text-share-wrapper');
  const articleSocials = document.querySelector('.article-socials-wrapper');
  block.appendChild(articleBottom);
  articleBottom.append(
    articleTagLabel,
    articleTags,
    articleDivider,
    articleSocialLabel,
    articleSocials,
  );

  const articleResourcesLabel = document.querySelector('.heading-resources-wrapper');
  const articleCards = document.querySelector('.article-cards-wrapper');
  articleResources.append(articleResourcesLabel, articleCards);

  const resourceContainer = (viewport) => {
    if (viewport.matches) {
      articleContentLayout.appendChild(articleResources);
    } else {
      block.appendChild(articleResources);
    }
  };

  [...doc.children].slice(2).forEach((div) => articleContent.appendChild(div));

  const viewport = window.matchMedia('(min-width: 992px)');
  resourceContainer(viewport);
  viewport.addEventListener('change', () => resourceContainer(viewport));
}
