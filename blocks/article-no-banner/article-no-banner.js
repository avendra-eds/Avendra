export default function decorate(block) {
  const nbDoc = document.querySelector('.section');
  const nbArticleBanner = document.querySelector('.article-banner-wrapper');
  const nbArticleContentLayout = document.createElement('div');
  const nbArticleContent = document.createElement('div');
  const nbArticleResources = document.querySelector('.article-resources-wrapper');
  const nbArticleBottom = document.querySelector('.article-template-bottom-wrapper');

  nbDoc.prepend(nbArticleBanner);

  nbArticleContentLayout.classList.add('article-layout');
  nbArticleContent.classList.add('article-content');
  nbArticleContentLayout.appendChild(nbArticleContent);
  block.appendChild(nbArticleContentLayout);

  const nbArticleTagLabel = document.querySelector('.heading-text-tag-wrapper');
  const nbArticleTags = document.querySelector('.tags-wrapper');
  const nbArticleDivider = document.querySelector('.divider-wrapper');
  const nbArticleSocialLabel = document.querySelector('.heading-text-share-wrapper');
  const nbArticleSocials = document.querySelector('.article-socials-wrapper');
  block.appendChild(nbArticleBottom);
  nbArticleBottom.append(
    nbArticleTagLabel,
    nbArticleTags,
    nbArticleDivider,
    nbArticleSocialLabel,
    nbArticleSocials,
  );

  const nbArticleResourcesLabel = document.querySelector('.heading-resources-wrapper');
  const nbArticleCards = document.querySelector('.article-cards-wrapper');
  nbArticleResources.append(nbArticleResourcesLabel, nbArticleCards);

  const nbResourceContainer = (viewport) => {
    if (viewport.matches) {
      nbArticleContentLayout.appendChild(nbArticleResources);
    } else {
      block.appendChild(nbArticleResources);
    }
  };

  [...nbDoc.children].slice(2).forEach((div) => nbArticleContent.appendChild(div));

  const viewport = window.matchMedia('(min-width: 992px)');
  nbResourceContainer(viewport);
  viewport.addEventListener('change', () => nbResourceContainer(viewport));
}
