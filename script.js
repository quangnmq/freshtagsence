const menuButton = document.querySelector('.menu-toggle');
const navGroups = document.querySelectorAll('.nav-group');

if (menuButton && navGroups.length) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Mở menu' : 'Đóng menu');
    navGroups.forEach((group) => group.classList.toggle('open', !isOpen));
  });

  navGroups.forEach((group) => {
    group.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Mở menu');
        navGroups.forEach((item) => item.classList.remove('open'));
      });
    });
  });
}

const yearLabel = document.querySelector('[data-current-year]');
if (yearLabel) yearLabel.textContent = new Date().getFullYear();

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll('.banner-slide'));
  const dots = Array.from(carousel.querySelectorAll('.carousel-dots button'));
  const previous = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  let activeIndex = 0;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== activeIndex;
      slide.setAttribute('aria-hidden', String(slideIndex !== activeIndex));
    });
    dots.forEach((dot, dotIndex) => {
      dot.setAttribute('aria-current', String(dotIndex === activeIndex));
    });
  };

  previous?.addEventListener('click', () => showSlide(activeIndex - 1));
  next?.addEventListener('click', () => showSlide(activeIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
});
