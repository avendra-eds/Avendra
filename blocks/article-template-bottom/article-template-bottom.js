export default function decorate(block) {
  const articleTagLabel = document.querySelectorAll('.heading-text-tag-wrapper');
  const articleTags = document.querySelector('.tags-wrapper');
  const articleDivider = document.querySelector('.divider-wrapper');
  const articleSocialLabel = document.querySelectorAll('.heading-text-share-wrapper');
  const articleSocials = document.querySelector('.article-socials-wrapper');
  block.appendChild(articleTagLabel);
  block.appendChild(articleTags);
  block.appendChild(articleDivider);
  block.appendChild(articleSocialLabel);
  block.appendChild(articleSocials);
}
