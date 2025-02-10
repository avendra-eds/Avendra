export default function decorate(block) {
  // Get the parent element
  const sectionParent = block.parentNode.parentElement;

  // Create a new wrapper div
  const newWrapper = document.createElement('div');
  newWrapper.classList.add('faq-content-wrapper'); // Add class to the wrapper

  // Get all child elements of the parent
  const children = Array.from(sectionParent.children);

  // Check if there are at least three children
  if (children.length >= 2) {
    // Append the first and second child divs to the new wrapper
    newWrapper.appendChild(children[0]); // faq-section-wrapper
    newWrapper.appendChild(children[1]); // accordion-wrapper

    // Insert the new wrapper before the third child if it exists, or at the end
    sectionParent.insertBefore(newWrapper, children[2] || null);
  }

  // Add a class to the parent block for additional styling
  block.classList.add('faq-container');
}
