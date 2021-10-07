const inputs = document.querySelectorAll('.filters input');
const outputs = document.querySelectorAll('.filters output');
const canvas = document.querySelector('canvas');
const save = document.querySelector('.btn-save');
const blur = document.querySelector('input[name=blur] + output');
const invert = document.querySelector('input[name=invert] + output');
const sepia = document.querySelector('input[name=sepia] + output');
const saturate = document.querySelector('input[name=saturate] + output');
const hue = document.querySelector('input[name=hue] + output');
const buttons = document.querySelectorAll('.btn');
const next = document.querySelector('.btn-next');
const img = document.querySelector('img');
const load = document.querySelector('.btn-load--input');
let blurValue;
let invertValue;
let sepiaValue;
let saturateValue;
let hueValue;
let lastPic;

drawImage();

// Canvas

function filterValues() {
  blurValue = blur.innerHTML;
  invertValue = invert.innerHTML;
  sepiaValue = sepia.innerHTML;
  saturateValue = saturate.innerHTML;
  hueValue = hue.innerHTML;
}

function drawImage() {
  const newImage = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  newImage.src = img.src;
  newImage.onload = function () {
    canvas.width = newImage.width;
    canvas.height = newImage.height;
    let previewWidth = document.querySelector('canvas').clientWidth;
    let previewHeight = document.querySelector('canvas').clientHeight;
    let diffW = canvas.width / previewWidth;
    let diffH = canvas.height / previewHeight;
    let diff;
    if (diffW >= diffH) {
      diff = diffW;
    } else {
      diff = diffH;
    }
    const ctx = canvas.getContext("2d");
    ctx.filter = `blur(${diff * blurValue}px) invert(${invertValue}%) sepia(${sepiaValue}%) saturate(${saturateValue}%) hue-rotate(${hueValue}deg)`;
    ctx.drawImage(img, 0, 0);
  };
}

inputs.forEach(input => input.addEventListener('change', function () {
  filterValues();
  drawImage();
}));

// Change css styles - blur, invert, sepia etc.

function handleUpdate() {
  const suffix = this.dataset.sizing;
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  for (let i = 0; i < inputs.length; i++) {
    outputs[i].innerHTML = inputs[i].value;
  }
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

// Buttons active

buttons.forEach(button => button.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn')) {
    buttons.forEach(button => {
      if (button.classList.contains('btn-active')) {
        button.classList.remove('btn-active');
      }
    });
    event.target.classList.add('btn-active');
  };
}));

// Reset button

const reset = document.querySelector('.btn-reset');
reset.addEventListener('click', (event) => {
  document.documentElement.style.removeProperty('--blur');
  document.documentElement.style.removeProperty('--invert');
  document.documentElement.style.removeProperty('--sepia');
  document.documentElement.style.removeProperty('--saturate');
  document.documentElement.style.removeProperty('--hue');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = inputs[i].defaultValue;
    outputs[i].innerHTML = inputs[i].defaultValue;
  }
  filterValues();
  drawImage();
});

// Next picture
let pic;
next.addEventListener('click', (event) => {
  let url = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';

  let date = new Date();
  let hour = date.getHours();
  let daytime;
  let images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
  let arr = img.src.split('/');
  let imgName = arr[arr.length - 1];

  if (hour >= 0 && hour <= 5) {
    daytime = 'night/';
  } else if (hour >= 6 && hour <= 11) {
    daytime = 'morning/';
  } else if (hour >= 12 && hour <= 17) {
    daytime = 'day/';
  } else {
    daytime = 'evening/';
  }

  if (images.indexOf(imgName) === -1) {
    if (lastPic) {
      if (images.indexOf(lastPic) === (images.length - 1)) {
        pic = images[0];
      } else {
        pic = images[images.indexOf(lastPic) + 1];;
      }
    } else {
      pic = images[0];
    }
  } else {
    if (images.indexOf(imgName) === (images.length - 1)) {
      pic = images[0];
    } else {
      pic = images[images.indexOf(imgName) + 1];
    }
  }

  img.onload = function () {
    // console.log(`picture is loaded: ${pic}`);
  };
  img.src = url + daytime + pic;
  drawImage();
});

// Load picture

load.addEventListener('change', function () {
  lastPic = pic;
  const file = load.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    img.src = reader.result;
    drawImage();
  }
  if (file) {
    reader.readAsDataURL(file);
  } else {
    img.src = '';
  }
  load.value = '';
  return lastPic;
});

// Save picture

save.addEventListener('click', function (e) {
  let link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
});

// Fullscreen mode

const fullscreen = document.querySelector('.fullscreen');
fullscreen.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  };
});