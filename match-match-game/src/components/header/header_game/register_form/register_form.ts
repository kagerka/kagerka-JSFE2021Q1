import './register_form.scss';
import { BaseComponent } from '../../../base-components';
import { RegisterFirstName } from './register_fname';
import { RegisterLastName } from './register_lname';
import { RegisterEmail } from './register_email';
import { RegisterAvatar } from './register_avatar';
import { RegisterErrors } from './register_errors';
import { RegisterButtons } from './register_buttons';

export class RegisterForm extends BaseComponent {
  private readonly register: HTMLElement;

  private readonly registerTitle: HTMLElement;

  private readonly registerForm: HTMLElement;

  private readonly registerFormWrapper: HTMLElement;

  private readonly registerFormItems: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['overlay', 'hidden']);
    this.register = document.createElement('div');
    this.register.setAttribute('class', 'register-form');
    this.register.setAttribute('id', 'register-form');
    this.registerTitle = document.createElement('h1');
    this.registerForm = document.createElement('form');
    this.registerForm.setAttribute('id', 'regform');
    this.registerFormWrapper = document.createElement('div');
    this.registerFormWrapper.setAttribute('class', 'register-form__wrapper');
    this.registerFormItems = document.createElement('div');
    this.registerFormItems.setAttribute('class', 'register-form__items-field');
  }

  render(): HTMLElement {
    this.rootElement.appendChild(this.element);
    this.element.appendChild(this.register);
    this.register.appendChild(this.registerTitle);
    this.register.appendChild(this.registerTitle).innerText = 'Register new Player';
    this.register.appendChild(this.registerForm);
    this.registerForm.appendChild(this.registerFormWrapper);
    this.registerFormWrapper.appendChild(this.registerFormItems);
    new RegisterFirstName(this.registerFormItems).render();
    new RegisterLastName(this.registerFormItems).render();
    new RegisterEmail(this.registerFormItems).render();
    new RegisterAvatar(this.registerFormWrapper).render();
    new RegisterErrors(this.registerForm).render();
    new RegisterButtons(this.registerForm).render();
    return this.element;
  }
}
