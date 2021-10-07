import { BaseComponent } from './components/base-components';
import { AboutPage } from './pages/about';
import { ValidateForm } from './components/header/header_game/register_form/validate';

export class App extends BaseComponent {
  private readonly main: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('main', ['game-field']);
    this.main = document.createElement('main');
  }

  render(): HTMLElement {
    this.rootElement.appendChild(this.element);
    new AboutPage(this.element).render();

    const registerButton = document.querySelector('.game__register_button');
    const registerForm = document.querySelector('.overlay');

    registerButton?.addEventListener('click', () => {
      registerForm?.classList.remove('hidden');
    });

    new ValidateForm().validate();

    registerForm?.addEventListener('click', (event) => {
      const regOverlay = (event.target as Element).classList.contains('overlay');
      const cancelBtn = (event.target as Element).classList.contains('cancel');
      const addUserBtn = (event.target as Element).classList.contains('add-user');
      if (regOverlay) {
        registerForm.classList.add('hidden');
      } else if (cancelBtn) {
        const inputs = registerForm.querySelectorAll('input');
        const correctInput = document.querySelectorAll('.validate-field.correct');
        const incorrectInput = document.querySelectorAll('.validate-field.incorrect');
        const errorMsg = document.querySelectorAll('.reg-form-error');
        correctInput.forEach((item) => item.classList.add('hidden'));
        incorrectInput.forEach((item) => item.classList.remove('hidden'));
        if (inputs) {
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
          }
        }
        for (let i = 0; i < errorMsg.length; i++) {
          errorMsg[i].innerHTML = '';
        }
        registerForm.classList.add('hidden');
      }
      if (addUserBtn) {
        registerForm.classList.add('hidden');
        this.element.innerHTML = '';
        new AboutPage(this.element).render();
      }
    });
    return this.main;
  }
}
