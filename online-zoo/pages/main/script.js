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



// Animal cards slider

const arrowLeft = document.querySelector('.animals-cards__left-arrow');
const arrowRight = document.querySelector('.animals-cards__right-arrow');
const animals = document.querySelector('.animals-cards__animals-wrapper');
let animalCards = document.querySelectorAll('.animals-cards__card_item');


function nodeList() {
  animalCards = document.querySelectorAll('.animals-cards__card_item');
}

arrowLeft.addEventListener('click', () => {
  animals.prepend(animalCards[animalCards.length - 1]);
  animalCards[animalCards.length - 1].classList.add('to-left');
  animals.prepend(animalCards[animalCards.length - 2]);
  animals.prepend(animalCards[animalCards.length - 3]);
  animals.prepend(animalCards[animalCards.length - 4]);
  animals.prepend(animalCards[animalCards.length - 5]);
  animals.prepend(animalCards[animalCards.length - 6]);
  nodeList();
});

arrowRight.addEventListener('click', () => {
  animals.append(animalCards[0]);
  animals.append(animalCards[1]);
  animals.append(animalCards[2]);
  animals.append(animalCards[3]);
  animals.append(animalCards[4]);
  animals.append(animalCards[5]);
  nodeList();
});


// Testimonials carousel

const body = document.querySelector('.page');
const testimonials = document.querySelector('.testimonials__list-wrapper');
const testimonialsItem = document.querySelectorAll('.testimonials__item');
const progress = document.getElementById('testimonials__scrollbar');
let testimonialsCount = testimonialsItem.length - 4;
const gap = 26;
let testimonialsWidth = testimonials.offsetWidth;
let testimonialsItemWidth = testimonialsItem[0].offsetWidth;
let testimonialsItemHeight = testimonialsItem[0].offsetHeight;
let index = 0;
let hideItems = 1;
progress.max = testimonialsCount + 1;

window.addEventListener('resize', (e) => {
  testimonialsWidth = testimonials.offsetWidth;
  testimonialsItemWidth = testimonialsItem[0].offsetWidth;
});

const testimonialsFunc = () => {
  index = index + hideItems;
  if (index > testimonialsCount) {
    index = 0;
  }
  if (body.offsetWidth >= 1000) {
    if (body.offsetWidth >= 1000 && body.offsetWidth < 1600) {
      testimonialsCount = testimonialsItem.length - 3;
      progress.max = testimonialsCount + 1;
    }
    testimonials.scrollTo((testimonialsItemWidth + gap) * index, 0);
  } else {
    testimonials.scrollTo(0, (testimonialsItemHeight + 15) * index);
  }

  progressValue();
}

let interval = setInterval(testimonialsFunc, 10000);
let timeout = null;

const delay = () => {
  clearTimeout(timeout);
  clearInterval(interval);
  interval = null;

  timeout = setTimeout(() => {
    clearInterval(interval);
    interval = setInterval(testimonialsFunc, 10000);
  }, 40000);
};

testimonials.addEventListener('click', delay);
progress.addEventListener('click', delay);

let progressValue = () => {
  progress.value = index + 1;
};

progress.addEventListener('input', () => {
  index = progress.value - 1;
  if (body.offsetWidth >= 1000) {
    testimonials.scrollTo((testimonialsItemWidth + gap) * index, 0);
  } else {
    testimonials.scrollTo(0, (testimonialsItemHeight + 15) * index);
  }
});