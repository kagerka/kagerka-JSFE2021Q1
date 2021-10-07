import { BaseComponent } from '../../../base-components';

export class ValidateForm extends BaseComponent {
  validate(): HTMLElement {
    const addUserButton = document.querySelector('.add-user');
    if (addUserButton) {
      addUserButton.setAttribute('disabled', 'disabled');
    }
    let isValid = false;
    const MIN_LENGTH = 0;

    const form = document.getElementById('register-form') as HTMLInputElement;
    form?.addEventListener('input', () => {
      if (addUserButton) {
        const fNameErrorMsg = document.getElementById('reg-form-fname-error-msg');
        const lNameErrorMsg = document.getElementById('reg-form-lname-error-msg');
        const emailErrorMsg = document.getElementById('reg-form-email-error-msg');

        if (fNameErrorMsg?.innerText.length === MIN_LENGTH
          && lNameErrorMsg?.innerText.length === MIN_LENGTH
          && emailErrorMsg?.innerText.length === MIN_LENGTH) {
          isValid = true;
        }
        if (isValid) {
          addUserButton.removeAttribute('disabled');
        }
      }
    });
    return this.element;
  }
}
