import { BaseComponent } from '../../../base-components';

export class RegisterEmail extends BaseComponent {
  private readonly label: HTMLElement;

  private readonly input: HTMLInputElement;

  private readonly emailCorrect: HTMLElement;

  private readonly validateYes: HTMLElement;

  private readonly emailIncorrect: HTMLElement;

  private readonly validateNo: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['register-form__item']);
    this.rootElement.appendChild(this.element);
    this.label = document.createElement('label');
    this.label.setAttribute('for', 'email');
    this.element.appendChild(this.label);
    this.input = document.createElement('input');
    this.input.setAttribute('type', 'email');
    this.input.setAttribute('placeholder', 'Enter your e-mail here');
    this.input.setAttribute('name', 'email');
    this.input.setAttribute('required', 'required');
    this.element.appendChild(this.input);
    this.emailCorrect = document.createElement('div');
    this.emailCorrect.setAttribute('class', 'email validate-field correct hidden');
    this.element.appendChild(this.emailCorrect);
    this.validateYes = document.createElement('div');
    this.validateYes.setAttribute('class', 'validate-field__yes');
    this.emailCorrect.appendChild(this.validateYes);
    this.emailIncorrect = document.createElement('div');
    this.emailIncorrect.setAttribute('class', 'email validate-field incorrect');
    this.element.appendChild(this.emailIncorrect);
    this.validateNo = document.createElement('div');
    this.validateNo.setAttribute('class', 'validate-field__no');
    this.emailIncorrect.appendChild(this.validateNo);
  }

  render(): void {
    this.label.innerHTML = 'E-mail';
    this.validateYes.innerHTML = '✓';
    this.validateNo.innerHTML = '!';
    this.emailValidate();
  }

  emailValidate(): void {
    const emailPattern = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/;
    const MAX_LENGTH = 30;
    this.input.addEventListener('input', () => {
      const emailErrorMsg = document.getElementById('reg-form-email-error-msg');
      const emailValue = this.input.value;
      if (emailPattern.test(emailValue) && emailValue.length <= MAX_LENGTH) {
        this.emailIncorrect.classList.add('hidden');
        this.emailCorrect.classList.remove('hidden');
        if (emailErrorMsg) { emailErrorMsg.innerText = ''; }
      } else {
        this.emailCorrect.classList.add('hidden');
        this.emailIncorrect.classList.remove('hidden');
        if (emailErrorMsg) { emailErrorMsg.innerHTML = 'Type correct e-mail address.'; }
      }
    });
  }
}
