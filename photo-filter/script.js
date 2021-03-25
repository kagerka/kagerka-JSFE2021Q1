// Change css styles - blur, invert, sepia etc.

const inputs = document.querySelectorAll('.filters input');
const outputs = document.querySelectorAll('.filters output');

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

const buttons = document.querySelectorAll('.btn');
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
});


// Next picture

const next = document.querySelector('.btn-next');
const img = document.querySelector('img');
next.addEventListener('click', () => {
  img.onload = function () {
    img.src = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg';
  }; 
});