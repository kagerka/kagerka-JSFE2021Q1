const pins = document.querySelectorAll('.map__pin');
console.log(pins);
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