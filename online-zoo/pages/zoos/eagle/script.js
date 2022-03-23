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



// Read more

const body = document.querySelector('.page');
const readMore = document.querySelector('.animal-info__read-less_button');
const animalInfo = document.querySelector('.animal-info__complete-info');
let readLess = true;

readMore.addEventListener('click', () => {
  if (!readLess) {
    animalInfo.style.height = '300px';
    readMore.innerHTML = 'Read More';
    readLess = true;
    if (body.offsetWidth >= 1000) {
      animalInfo.style.height = '305px';
    } else if (body.offsetWidth < 640) {
      animalInfo.style.height = '335px';
    } else {
      animalInfo.style.height = '330px';
    }
  } else {
    animalInfo.style.height = 'auto';
    readMore.innerHTML = 'Read Less';
    readLess = false;
  }
})


// Video carousel

const videoCarouselWrap = document.querySelector('.camera__carousel_wrapper');
const arrowLeft = document.querySelector('.camera__carousel_left-arrow');
const arrowRight = document.querySelector('.camera__carousel_right-arrow');
const carouselItems = document.querySelectorAll('.camera__carousel_item');
const carouselItemsWidth = carouselItems[0].offsetWidth;
let mainVideo = document.querySelector('.camera__item');

let gap = 30;
let index = 0;
let hideItems = 1;

arrowLeft.addEventListener('click', (e) => {
  index = index - hideItems;
  if (body.offsetWidth >= 1600) {
    if (index < 0) {
      index = carouselItems.length - 4;
    }
  } else if (body.offsetWidth >= 1000 && body.offsetWidth < 1600) {
    if (index < 0) {
      index = carouselItems.length - 2;
    }
  }
  
  videoCarouselWrap.scrollTo((carouselItemsWidth + gap) * index, 0);
  console.log(index);
});

arrowRight.addEventListener('click', () => {
  index = index + hideItems;
  if (body.offsetWidth >= 1600) {
    if (index > carouselItems.length - 4) {
      index = 0;
    }
  } else if (body.offsetWidth >= 1000 && body.offsetWidth < 1600) {
    if (index > carouselItems.length - 2) {
      index = 0;
    }
  }
  videoCarouselWrap.scrollTo((carouselItemsWidth + gap) * index, 0);

});

videoCarouselWrap.addEventListener('click', (e) => {
  let temp = e.target.nextElementSibling.src;
  e.target.nextElementSibling.src = mainVideo.src;
  mainVideo.src = temp;
})