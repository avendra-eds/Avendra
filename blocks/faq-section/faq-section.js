export default function decorate(block) {
  const sectionParent = block.parentNode.parentElement;
  const newWrapper = document.createElement('div');
  newWrapper.classList.add('faq-content-wrapper');
  const children = Array.from(sectionParent.children);
  if (children.length >= 2) {
    newWrapper.appendChild(children[0]);
    newWrapper.appendChild(children[1]);
    sectionParent.insertBefore(newWrapper, children[2] || null);
  }
  block.classList.add('faq-container');
}
