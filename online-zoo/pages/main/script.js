// Testimonials feedback

const feedbackButton = document.querySelector('.testimonials__button');
const feedbackModal = document.querySelector('.overlay');
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('testimonials__button')) {
    feedbackModal.classList.remove('hidden');
  }
  if (event.target.classList.contains('feedback__close-button_wrapper') || event.target.classList.contains('feedback__submit-button')) {
    feedbackModal.classList.add('hidden');
  }
  if (event.target.classList.contains('overlay')) {
    feedbackModal.classList.add('hidden');
  }
});


// burger menu

const burgerItem = document.querySelector('.burger');
const menu = document.querySelector('.header__nav');
const menuCloseItem = document.querySelector('.header__nav-close');
const menuLinks = document.querySelectorAll('.header__link');
const logoDefault = document.querySelector('.header__logo-pic');
const logoBurger = document.querySelector('.header__logo-pic_burger-menu');
const headerLinkHidden = document.querySelector('.header__item_hidden');

burgerItem.addEventListener('click', (event) => {
  menu.classList.add('header__nav_active');
  logoBurger.classList.add('header__active-burger-menu');
  logoDefault.classList.add('header__active-burger-menu');
  headerLinkHidden.classList.add('header__item_visible');
});
menuCloseItem.addEventListener('click', (event) => {
  menu.classList.remove('header__nav_active');
  logoBurger.classList.remove('header__active-burger-menu');
  logoDefault.classList.remove('header__active-burger-menu');
  headerLinkHidden.classList.remove('header__item_visible');

});
if (window.innerWidth <= 999) {
  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', () => {
      menu.classList.remove('header__nav_active');
      logoDefault.classList.remove('header__active-burger-menu');
    });
  }
}