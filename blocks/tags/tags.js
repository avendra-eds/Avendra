export default function decorate(block) {
  const aTags = block.querySelectorAll('a');
  aTags.forEach((aTag) => {
    aTag.classList.add('button', 'secondary');
  });
}
