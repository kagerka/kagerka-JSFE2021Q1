const donateButton = document.querySelector('.donate__button');
const donateModal = document.querySelector('.overlay');
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('donate__button')) {
    donateModal.classList.remove('hidden');
  }
  if (event.target.classList.contains('donate-modal__close-button_wrapper') || event.target.classList.contains('donate-modal__button')) {
    donateModal.classList.add('hidden');
  }
  if (event.target.classList.contains('overlay')) {
    donateModal.classList.add('hidden');
  }
});