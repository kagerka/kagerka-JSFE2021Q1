const donateButton = document.querySelector('.donate__button');
const donateModal = document.querySelector('.overlay');
const body = document.querySelector('.page');
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('donate__button')) {
    donateModal.classList.remove('hidden');
    body.classList.add('modal-open');
  }
  if (event.target.classList.contains('donate-modal__close-button_wrapper') || event.target.classList.contains('donate-modal__button')) {
    donateModal.classList.add('hidden');
    body.classList.remove('modal-open');
  }
  if (event.target.classList.contains('overlay')) {
    donateModal.classList.add('hidden');
    body.classList.remove('modal-open');
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


// Amount

const donateForm = document.querySelector('.donate__form');
const amountDot = document.querySelectorAll('.donate__radio-buttons_span');
const amountValue = document.querySelectorAll('.donate__dollars');

const target = document.querySelectorAll('.donate__radio-buttons_span ~ .donate__dollars');
const amountInput = document.querySelector('.donate__another-amount_input');

donateForm.addEventListener('click', (e) => {
  if (e.target.classList.contains('donate__radio-buttons_input')) {
    amountInput.value = e.target.value;
  }
});

amountInput.addEventListener('input', () => {
  if (amountInput.value.length > 4) {
    let str = amountInput.value;
    str = str.substring(0, str.length - 1);
    amountInput.value = str;
  }
  if (amountInput.value === '5000' && amountInput.value.length === 4) {
    document.getElementById('donate__5000').checked = true;
  } else {
    document.getElementById('donate__2000').checked = false;
  }
  if (amountInput.value === '2000' && amountInput.value.length === 4) {
    document.getElementById('donate__2000').checked = true;
  } else {
    document.getElementById('donate__2000').checked = false;
  }
  if (amountInput.value === '1000' && amountInput.value.length === 4) {
    document.getElementById('donate__1000').checked = true;
  } else {
    document.getElementById('donate__1000').checked = false;
  }
  if (amountInput.value === '500' && amountInput.value.length === 3) {
    document.getElementById('donate__500').checked = true;
  } else {
    document.getElementById('donate__500').checked = false;
  }
  if (amountInput.value === '250' && amountInput.value.length === 3) {
    document.getElementById('donate__250').checked = true;
  } else {
    document.getElementById('donate__250').checked = false;
  }
  if (amountInput.value === '100' && amountInput.value.length === 3) {
    document.getElementById('donate__100').checked = true;
  } else {
    document.getElementById('donate__100').checked = false;
  }
  if (amountInput.value === '50' && amountInput.value.length === 2) {
    document.getElementById('donate__50').checked = true;
  } else {
    document.getElementById('donate__50').checked = false;
  }
  if (amountInput.value === '25' && amountInput.value.length === 2) {
    document.getElementById('donate__25').checked = true;
  } else {
    document.getElementById('donate__25').checked = false;
  }

});
