const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');

// Play when key on the keyboard pressed
document.addEventListener('keydown', (event) => {
  const pianoКey = document.querySelector(`.piano-key[data-letter="${event.code.slice(3,5)}"]`);
  const audio = document.querySelector(`audio[data-letter="${event.code.slice(3,5)}"]`);
  if (!audio) {
    return;
  }
  audio.currentTime = 0;
  audio.play();
  pianoКey.classList.add('piano-key-active');
});

document.addEventListener('keyup', (event) => {
  if (!document.querySelector(`.piano-key[data-letter="${event.code.slice(3,5)}"]`)) {
    return;
  }
  const pianoКey = document.querySelector(`.piano-key[data-letter="${event.code.slice(3,5)}"]`);
  pianoКey.classList.remove('piano-key-active');
});

// Play when left or right mouse down and move
let isMousedown = false;
piano.addEventListener("mousedown", function (event) {
  isMousedown = true;
  const note = event.target.dataset.note;
  const audio = document.querySelector(`audio[data-note="${note}"]`);
  if (!audio) {
    return;
  }
  audio.currentTime = 0;
  audio.play();
  if (event.target.classList.contains('piano-key')) {
    pianoКeys.forEach(key => {
      if (key.classList.contains('piano-key-active')) {
        key.classList.remove('piano-key-active');
      }
    });
    event.target.classList.add('piano-key-active');
  };
});

window.addEventListener("mouseup", function (event) {
  isMousedown = false;
  event.target.classList.remove('piano-key-active');
});

window.addEventListener("mousemove", function (event) {
  if (isMousedown) {
    const note = event.target.dataset.note;
    const audio = document.querySelector(`audio[data-note="${note}"]`);
    if (!audio) {
      return;
    }
    if (event.target.classList.contains('piano-key-active')) {
      return;
    }
    audio.currentTime = 0;
    audio.play();
    if (event.target.classList.contains('piano-key')) {
      pianoКeys.forEach((el) => {
        if (el.classList.contains('piano-key-active')) {
          el.classList.remove('piano-key-active');
        }
      });
      event.target.classList.add('piano-key-active');
    };
  } else {
    return;
  }
});

// Change button notes to letters
const btnContainer = document.querySelector('.btn-container');
const btnNotes = btnContainer.querySelector('.btn-notes');
const btnLetters = btnContainer.querySelector('.btn-letters');
btnLetters.addEventListener('click', () => {
  btnNotes.classList.remove('btn-active');
  btnLetters.classList.add('btn-active');
  pianoКeys.forEach(key => key.classList.add('letter'));
});
btnNotes.addEventListener('click', () => {
  btnLetters.classList.remove('btn-active');
  btnNotes.classList.add('btn-active');
  pianoКeys.forEach(key => key.classList.remove('letter'));
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