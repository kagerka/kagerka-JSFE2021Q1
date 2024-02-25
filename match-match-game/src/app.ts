import { BaseComponent } from './components/base-components';
import { AboutPage } from './pages/about';
import { ValidateForm } from './components/header/header_game/register_form/validate';

export class App extends BaseComponent {
  private readonly main: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('main', ['game-field']);
    this.main = document.createElement('main');
  }

  clear(): void {
    this.element.innerHTML = '';
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
      if (event.target) {
        if ((event.target as Element).classList.contains('overlay')) {
          registerForm.classList.add('hidden');
        } else if ((event.target as Element).classList.contains('cancel')) {
          const inputs = registerForm.querySelectorAll('input');
          if (inputs) {
            for (let i = 0; i < inputs.length; i++) {
              inputs[i].value = '';
              document.querySelector('.first-name.validate-field.correct')?.classList.add('hidden');
              document.querySelector('.first-name.validate-field.incorrect')?.classList.remove('hidden');
              document.querySelector('.last-name.validate-field.correct')?.classList.add('hidden');
              document.querySelector('.last-name.validate-field.incorrect')?.classList.remove('hidden');
              document.querySelector('.email.validate-field.correct')?.classList.add('hidden');
              document.querySelector('.email.validate-field.incorrect')?.classList.remove('hidden');
            }
          }
          const fnameErrorField = document.getElementById('reg-form-fname-error-msg');
          const lnameErrorField = document.getElementById('reg-form-lname-error-msg');
          const emailErrorField = document.getElementById('reg-form-email-error-msg');
          if (fnameErrorField) fnameErrorField.innerHTML = '';
          if (lnameErrorField) lnameErrorField.innerHTML = '';
          if (emailErrorField) emailErrorField.innerHTML = '';
          registerForm.classList.add('hidden');
        }
        if ((event.target as Element).classList.contains('add-user')) {
          registerForm.classList.add('hidden');
          this.element.innerHTML = '';
          new AboutPage(this.element).render();
        }
      }
    });

    return this.main;
  }
}
