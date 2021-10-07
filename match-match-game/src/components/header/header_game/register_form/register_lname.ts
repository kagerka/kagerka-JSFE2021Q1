import { BaseComponent } from '../../../base-components';

export class RegisterLastName extends BaseComponent {
  private readonly label: HTMLElement;

  private readonly input: HTMLInputElement;

  private readonly lnameCorrect: HTMLElement;

  private readonly validateYes: HTMLElement;

  private readonly lnameIncorrect: HTMLElement;

  private readonly validateNo: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['register-form__item']);
    this.rootElement.appendChild(this.element);
    this.label = document.createElement('label');
    this.label.setAttribute('for', 'last-name');
    this.element.appendChild(this.label);
    this.input = document.createElement('input');
    this.input.setAttribute('type', 'text');
    this.input.setAttribute('placeholder', 'Enter your last name here');
    this.input.setAttribute('name', 'last-name');
    this.input.setAttribute('required', 'required');
    this.element.appendChild(this.input);
    this.lnameCorrect = document.createElement('div');
    this.lnameCorrect.setAttribute('class', 'last-name validate-field correct hidden');
    this.element.appendChild(this.lnameCorrect);
    this.validateYes = document.createElement('div');
    this.validateYes.setAttribute('class', 'validate-field__yes');
    this.lnameCorrect.appendChild(this.validateYes);
    this.lnameIncorrect = document.createElement('div');
    this.lnameIncorrect.setAttribute('class', 'last-name validate-field incorrect');
    this.element.appendChild(this.lnameIncorrect);
    this.validateNo = document.createElement('div');
    this.validateNo.setAttribute('class', 'validate-field__no');
    this.lnameIncorrect.appendChild(this.validateNo);
  }

  render(): void {
    this.label.innerHTML = 'Last Name';
    this.validateYes.innerHTML = '✓';
    this.validateNo.innerHTML = '!';
    this.lnameValidate();
  }

  lnameValidate(): void {
    this.input.addEventListener('input', () => {
      const lNameErrorMsg = document.getElementById('reg-form-lname-error-msg');
      const MAX_LENGTH = 30;
      const MIN_LENGTH = 0;
      const lastNameValueAll = this.input.value.split('');
      const lastNameValueIncorrect = lastNameValueAll.filter((item) => item.match('[^a-zA-Zа-яА-Я0-9 ё]'));
      if (lastNameValueAll.length === MIN_LENGTH || lastNameValueAll.length > MAX_LENGTH
        || lastNameValueAll.filter((item) => item.match('[0-9]')).length === lastNameValueAll.length) {
        this.lnameCorrect.classList.add('hidden');
        this.lnameIncorrect.classList.remove('hidden');
        if (lNameErrorMsg) {
          lNameErrorMsg.innerHTML = 'Your last name length should be from 1 to 30 characters and should not include only numbers.';
        }
      } else if (lastNameValueAll === lastNameValueIncorrect || lastNameValueIncorrect.length === MIN_LENGTH) {
        this.lnameIncorrect.classList.add('hidden');
        this.lnameCorrect.classList.remove('hidden');
        if (lNameErrorMsg) { lNameErrorMsg.innerText = ''; }
      } else {
        this.lnameCorrect.classList.add('hidden');
        this.lnameIncorrect.classList.remove('hidden');
        if (lNameErrorMsg) {
          lNameErrorMsg.innerHTML = 'Your last name should include only letters, numbers and spaces. No special characters are allowed.';
        }
      }
    });
  }
}
