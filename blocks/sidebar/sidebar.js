export default function decorate(block) {
  const sidebarLink = block.querySelectorAll('.button-container');
  sidebarLink.forEach((link) => {
    link.firstElementChild.classList.remove('button');
    link.classList.remove('button-container');
  });
}
