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