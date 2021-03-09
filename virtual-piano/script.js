// Play when key pressed
function playAudioK(event) {
  console.log(event.code.slice(3,5));
  const pianoКey = document.querySelector(`.piano-key[data-letter="${event.code.slice(3,5)}"]`);
  const audio = document.querySelector(`audio[data-letter="${event.code.slice(3,5)}"]`);
  if (!audio) {
    return;
  }
  audio.currentTime = 0;
  audio.play();
  pianoКey.classList.add('piano-key-active');
};
document.addEventListener('keydown', playAudioK);

// Play when mouse click
function playAudioM(event) {
  const note = event.target.dataset.note;
  const audio = document.querySelector(`audio[data-note="${note}"]`);
  if (!audio) {
    return;
  }
  audio.currentTime = 0;
  audio.play();
  const pianoКey = document.querySelector(`.piano-key[data-note="${note}"]`);
  pianoКey.classList.add('piano-key-active');
};

// Play when left mouse down and move
const piano = document.querySelector('.piano');
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
  const pianoКey = document.querySelector(`.piano-key[data-note="${note}"]`);
  pianoКey.classList.add('piano-key-active');
});
window.addEventListener("mouseup", function (event) {
  isMousedown = false;
});
document.addEventListener("mousemove", function (event) {
  if (isMousedown) {
    const note = event.target.dataset.note;
    const audio = document.querySelector(`audio[data-note="${note}"]`);
    if (!audio) {
      return;
    }
    audio.play();
    const pianoКey = document.querySelector(`.piano-key[data-note="${note}"]`);
    pianoКey.classList.add('piano-key-active');
  } else {
    return;
  }
});

// Remove active style on pressed keys
function removeTransition(event) {
  if (event.propertyName !== 'transform') {
    return;
  }
  this.classList.remove('piano-key-active');
}
const pianoКeys = document.querySelectorAll('.piano-key');
pianoКeys.forEach(key => key.addEventListener('transitionend', removeTransition));

// Change notes to letters
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
   }
})
