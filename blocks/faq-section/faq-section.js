export default function decorate(block) {
    //Create a new wrapper div
    const newWrapper = document.createElement('div');
    newWrapper.classList.add('faq-content-wrapper'); // Add class to the wrapper

    //Select the first two divs (faq-title-wrapper and accordion-wrapper)
    [...block.children].slice(0, 2).forEach((child) => newWrapper.append(child));

    //Prepend the new wrapper to the block
    block.prepend(newWrapper);

    //Add a class to the parent block for additional styling
    block.classList.add('faq-container');
}
