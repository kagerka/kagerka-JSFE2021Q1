// Pin active

const pins = document.querySelectorAll('.map__pin');
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('map__pin')) {
    pins.forEach(key => {
      if (key.classList.contains('map__pin_active')) {
        key.classList.remove('map__pin_active');
      }
    });
    event.target.classList.add('map__pin_active');
  } else {
    pins.forEach(key => {
      if (key.classList.contains('map__pin_active')) {
        key.classList.remove('map__pin_active');
      }
    });
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

// Map move

const mapWrap = document.querySelector('.map__wrapper');
const mapPicElem = document.querySelector('.map__world-map_wrapper');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

mapPicElem.onmousedown = function(event) {

  let shiftX = event.clientX - mapPicElem.getBoundingClientRect().left;
  let shiftY = event.clientY + 80 - mapPicElem.getBoundingClientRect().top;

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    mapPicElem.style.left = pageX - shiftX + 'px';
    mapPicElem.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
    if (event.pageX >= mapWrap.offsetWidth || event.pageX <= 0) {
      document.removeEventListener('mousemove', onMouseMove);
    }
    footer.onmouseenter = function() {
      document.removeEventListener('mousemove', onMouseMove);
      mapPicElem.onmouseup = null;
    };
    header.onmouseenter = function() {
      document.removeEventListener('mousemove', onMouseMove);
      mapPicElem.onmouseup = null;
    };
  }

  document.addEventListener('mousemove', onMouseMove);

  mapPicElem.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    mapPicElem.onmouseup = null;
  };

};

mapPicElem.ondragstart = function() {
  return false;
};




// Map zoom

const zoomIn = document.querySelector('.map__map-plus');
const zoomOut = document.querySelector('.map__map-minus');
const mapPic = document.querySelector('.map__world-map');
const mapElem = document.querySelector('.map__map-elements_wrapper');
const body = document.querySelector('.page');
const startWidth = mapPicElem.offsetWidth;
const topPos = mapPicElem.offsetTop || 0;
const leftPos = mapPicElem.offsetLeft || 0;

zoomIn.addEventListener('click', () => {

  if (mapPicElem.offsetWidth <= startWidth * 2) {

    const prevWidth = mapPicElem.offsetWidth;
    const prevHeight = mapPicElem.offsetHeight;
    mapPicElem.style.width = `${mapPicElem.offsetWidth * 1.25}px`;
    mapPicElem.style.height = `${mapPicElem.offsetHeight * 1.25}px`;
    const nextWidth = mapPicElem.offsetWidth;
    const nextHeight = mapPicElem.offsetHeight;
    const topPosElem = mapElem.offsetTop;
    const leftPosElem = mapElem.offsetLeft;

    mapPicElem.style.left = `${leftPos - ((nextWidth - prevWidth) / 2)}px`;
    mapPicElem.style.top = `${topPos - ((nextHeight - prevHeight) / 2)}px`;
    if (body.offsetWidth >= 1600) {
      mapElem.style.left = `${(leftPosElem + 5)}px`;
      mapElem.style.top = `${(topPosElem + 10)}px`;
    } else if (body.offsetWidth < 1600) {
      mapElem.style.left = `${(leftPosElem + 5)}px`;
      mapElem.style.top = `${(topPosElem + 10)}px`;
    }

  }

});

zoomOut.addEventListener('click', () => {

  if (mapPicElem.offsetWidth > startWidth) {

    const prevWidth = mapPicElem.offsetWidth;
    const prevHeight = mapPicElem.offsetHeight;
    mapPicElem.style.width = `${mapPicElem.offsetWidth / 1.25}px`;
    mapPicElem.style.height = `${mapPicElem.offsetHeight / 1.25}px`;
    const nextWidth = mapPicElem.offsetWidth;
    const nextHeight = mapPicElem.offsetHeight;
    const topPosElem = mapElem.offsetTop;
    const leftPosElem = mapElem.offsetLeft;

    mapPicElem.style.left = `${leftPos - ((prevWidth - nextWidth) / 2)}px`;
    mapPicElem.style.top = `${topPos - ((prevHeight - nextHeight) / 2)}px`;
    if (body.offsetWidth >= 1600) {
      mapElem.style.left = `${(leftPosElem - 5)}px`;
      mapElem.style.top = `${(topPosElem - 10)}px`;
    } else if (body.offsetWidth < 1600) {
      mapElem.style.left = `${(leftPosElem - 5)}px`;
      mapElem.style.top = `${(topPosElem - 10)}px`;
    }

  }

});