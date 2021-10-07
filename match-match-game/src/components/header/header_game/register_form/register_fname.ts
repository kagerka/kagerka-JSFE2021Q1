import { BaseComponent } from '../../../base-components';

export class RegisterFirstName extends BaseComponent {
  private readonly label: HTMLElement;

  private readonly input: HTMLInputElement;

  private readonly fnameCorrect: HTMLElement;

  private readonly validateYes: HTMLElement;

  private readonly fnameIncorrect: HTMLElement;

  private readonly validateNo: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['register-form__item']);
    this.rootElement.appendChild(this.element);
    this.label = document.createElement('label');
    this.label.setAttribute('for', 'first-name');
    this.element.appendChild(this.label);
    this.input = document.createElement('input');
    this.input.setAttribute('type', 'text');
    this.input.setAttribute('placeholder', 'Enter your name here');
    this.input.setAttribute('name', 'first-name');
    this.input.setAttribute('required', 'required');
    this.element.appendChild(this.input);
    this.fnameCorrect = document.createElement('div');
    this.fnameCorrect.setAttribute('class', 'first-name validate-field correct hidden');
    this.element.appendChild(this.fnameCorrect);
    this.validateYes = document.createElement('div');
    this.validateYes.setAttribute('class', 'validate-field__yes');
    this.fnameCorrect.appendChild(this.validateYes);
    this.fnameIncorrect = document.createElement('div');
    this.fnameIncorrect.setAttribute('class', 'first-name validate-field incorrect');
    this.element.appendChild(this.fnameIncorrect);
    this.validateNo = document.createElement('div');
    this.validateNo.setAttribute('class', 'validate-field__no');
    this.fnameIncorrect.appendChild(this.validateNo);
  }

  render(): void {
    this.label.innerHTML = 'First Name';
    this.validateYes.innerHTML = '✓';
    this.validateNo.innerHTML = '!';
    this.fnameValidate();
  }

  fnameValidate(): void {
    this.input.addEventListener('input', () => {
      const fNameErrorMsg = document.getElementById('reg-form-fname-error-msg');
      const MAX_LENGTH = 30;
      const MIN_LENGTH = 0;
      const firstNameValueAll = this.input.value.split('');
      const firstNameValueIncorrect = firstNameValueAll.filter((item) => item.match('[^a-zA-Zа-яА-Я0-9 ё]'));
      if (firstNameValueAll.length === MIN_LENGTH || firstNameValueAll.length > MAX_LENGTH
        || firstNameValueAll.filter((item) => item.match('[0-9]')).length === firstNameValueAll.length) {
        this.fnameCorrect.classList.add('hidden');
        this.fnameIncorrect.classList.remove('hidden');
        if (fNameErrorMsg) {
          fNameErrorMsg.innerHTML = 'Your first name length should be from 1 to 30 characters and should not include only numbers.';
        }
      } else if (firstNameValueAll === firstNameValueIncorrect || firstNameValueIncorrect.length === MIN_LENGTH) {
        this.fnameIncorrect.classList.add('hidden');
        this.fnameCorrect.classList.remove('hidden');
        if (fNameErrorMsg) { fNameErrorMsg.innerText = ''; }
      } else {
        this.fnameCorrect.classList.add('hidden');
        this.fnameIncorrect.classList.remove('hidden');
        if (fNameErrorMsg) {
          fNameErrorMsg.innerHTML = `
          Your first name should include only letters, numbers and spaces. No special characters are allowed.
          `;
        }
      }
    });
  }
}
