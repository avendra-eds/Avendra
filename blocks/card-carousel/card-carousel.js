import { fetchPlaceholders } from '../../scripts/aem.js';

function updateActiveSlide(slide) {
  const block = slide.closest('.card-carousel');
  const slideIndex = parseInt(slide.dataset.slideIndex, 10);
  block.dataset.activeSlide = slideIndex;

  const slides = block.querySelectorAll('.card-carousel-slide');

  slides.forEach((aSlide, idx) => {
    aSlide.setAttribute('aria-hidden', idx !== slideIndex);
    aSlide.querySelectorAll('a').forEach((link) => {
      if (idx !== slideIndex) {
        link.setAttribute('tabindex', '-1');
      } else {
        link.removeAttribute('tabindex');
      }
    });
  });

  // const indicators = block.querySelectorAll('.card-carousel-slide-indicator');
  // indicators.forEach((indicator, idx) => {
  //   if (idx !== slideIndex) {
  //     indicator.querySelector('button').removeAttribute('disabled');
  //   } else {
  //     indicator.querySelector('button').setAttribute('disabled', 'true');
  //   }
  // });

  const indicators = block.querySelectorAll('.card-carousel-slide-indicator button');
  indicators.forEach((button, idx) => {
    button.disabled = idx === slideIndex;
  });
}

function showSlide(block, slideIndex = 0) {
  const slides = block.querySelectorAll('.card-carousel-slide');
  let realSlideIndex = slideIndex < 0 ? slides.length - 1 : slideIndex;
  if (slideIndex >= slides.length) realSlideIndex = 0;
  const activeSlide = slides[realSlideIndex];

  activeSlide.querySelectorAll('a').forEach((link) => link.removeAttribute('tabindex'));
  block.querySelector('.card-carousel-slides').scrollTo({
    top: 0,
    left: activeSlide.offsetLeft,
    behavior: 'smooth',
  });
  updateActiveSlide(activeSlide, block);
}

function bindEvents(block) {
  const slideIndicators = block.querySelector('.card-carousel-slide-indicators');
  if (!slideIndicators) return;

  slideIndicators.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
      const slideIndicator = e.currentTarget.parentElement;
      showSlide(block, parseInt(slideIndicator.dataset.targetSlide, 10));
    });
  });
  // const indicators = block.querySelectorAll('.card-carousel-slide-indicator button');
  // indicators.forEach((button, idx) => {
  //   button.addEventListener('click', () => showSlide(block, idx));
  // });
  block.querySelector('.slide-prev').addEventListener('click', () => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) - 1);
  });
  block.querySelector('.slide-next').addEventListener('click', () => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
  });

  // const slideObserver = new IntersectionObserver((entries) => {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) updateActiveSlide(entry.target);
  //   });
  // }, { threshold: 0.5 });
  // block.querySelectorAll('.card-carousel-slide').forEach((slide) => {
  //   slideObserver.observe(slide);
  // });
}

function createSlide(row, slideIndex, carouselId) {
  const slide = document.createElement('li');
  slide.dataset.slideIndex = slideIndex;
  slide.setAttribute('id', `card-carousel-${carouselId}-slide-${slideIndex}`);
  slide.classList.add('card-carousel-slide');

  row.querySelectorAll(':scope > div:not(.button-container)').forEach((column, colIdx) => {
    column.classList.add(`card-carousel-slide-${colIdx === 0 ? 'image' : 'content'}`);
    slide.append(column);
  });

  const labeledBy = slide.querySelector('h1, h2, h3, h4, h5, h6');
  if (labeledBy) {
    slide.setAttribute('aria-labelledby', labeledBy.getAttribute('id'));
  }

  return slide;
}

let carouselId = 0;
export default async function decorate(block) {
  carouselId += 1;
  block.setAttribute('id', `card-carousel-${carouselId}`);
  const rows = block.querySelectorAll(':scope > div:not(:last-child)');
  const isSingleSlide = rows.length < 2;

  const placeholders = await fetchPlaceholders();

  block.setAttribute('role', 'region');
  block.setAttribute('aria-roledescription', placeholders.carousel || 'Carousel');

  const container = document.createElement('div');
  container.classList.add('card-carousel-slides-container');

  const slidesWrapper = document.createElement('ul');
  slidesWrapper.classList.add('card-carousel-slides');
  block.prepend(slidesWrapper);

  let slideIndicators;
  if (!isSingleSlide) {
    const slideIndicatorsNav = document.createElement('div');
    slideIndicatorsNav.setAttribute('aria-label', placeholders.carouselSlideControls || 'Carousel Slide Controls');
    slideIndicators = document.createElement('ol');
    slideIndicators.classList.add('card-carousel-slide-indicators');

    const slideNavButtons = document.createElement('div');
    slideNavButtons.classList.add('card-carousel-navigation-buttons');
    slideNavButtons.innerHTML = `
      <button type="button" class= "slide-prev" aria-label="${placeholders.previousSlide || 'Previous Slide'}"></button>
      <button type="button" class="slide-next" aria-label="${placeholders.nextSlide || 'Next Slide'}"></button>
    `;

    const carouselControlsWrapper = document.createElement('div');
    carouselControlsWrapper.classList.add('carousel-controls-wrapper');

    const viewAllButton = block.querySelector('div.button-container');
    viewAllButton.classList.add('viewAllButton');

    slideIndicatorsNav.append(slideIndicators);
    slideIndicatorsNav.append(slideNavButtons);
    carouselControlsWrapper.append(viewAllButton);
    carouselControlsWrapper.append(slideIndicatorsNav);

    block.append(carouselControlsWrapper);
  }
  (rows).forEach((row, idx) => {
    const slide = createSlide(row, idx, carouselId);
    slidesWrapper.append(slide);

    if (slideIndicators && idx) {
      const indicator = document.createElement('li');
      indicator.classList.add('card-carousel-slide-indicator');
      indicator.dataset.targetSlide = idx;
      indicator.innerHTML = `<button type="button" aria-label="${placeholders.showSlide || 'Show Slide'} ${idx + 1} ${placeholders.of || 'of'} ${rows.length}"></button>`;
      slideIndicators.append(indicator);
    }
    row.remove();
  });

  container.append(slidesWrapper);
  block.prepend(container);

  if (!isSingleSlide) {
    bindEvents(block);
    showSlide(block, 0);
  }
}
