import { BaseComponent } from '../../../base-components';

export class ValidateForm extends BaseComponent {
  validate(): HTMLElement {
    const fNameErrorMsg = document.getElementById('reg-form-fname-error-msg');
    const lNameErrorMsg = document.getElementById('reg-form-lname-error-msg');
    const emailErrorMsg = document.getElementById('reg-form-email-error-msg');
    const addUserButton = document.querySelector('.add-user');
    if (addUserButton) {
      addUserButton.setAttribute('disabled', 'disabled');
    }
    let isValid = false;
    let isValidFirstName = false;
    const firstName = document.querySelector('input[name="first-name"]') as HTMLInputElement;
    firstName?.addEventListener('input', () => {
      const firstNameValueAll = firstName.value.split('');
      const firstNameValueIncorrect = firstNameValueAll.filter((item) => item.match('[^a-zA-Zа-яА-Я0-9 ]'));
      if (firstNameValueAll.length === 0 || firstNameValueAll.length > 30) {
        document.querySelector('.first-name.validate-field.correct')?.classList.add('hidden');
        document.querySelector('.first-name.validate-field.incorrect')?.classList.remove('hidden');
        if (fNameErrorMsg) fNameErrorMsg.innerText = 'Your first name length should be from 1 to 30 characters.';
        isValidFirstName = false;
      } else if (firstNameValueAll === firstNameValueIncorrect || firstNameValueIncorrect.length === 0) {
        document.querySelector('.first-name.validate-field.incorrect')?.classList.add('hidden');
        document.querySelector('.first-name.validate-field.correct')?.classList.remove('hidden');
        if (fNameErrorMsg) fNameErrorMsg.innerText = '';
        isValidFirstName = true;
      } else {
        document.querySelector('.first-name.validate-field.correct')?.classList.add('hidden');
        document.querySelector('.first-name.validate-field.incorrect')?.classList.remove('hidden');
        if (fNameErrorMsg) {
          fNameErrorMsg.innerText = `
            Your first name should include only letters, numbers and spaces. No special characters are allowed.
          `;
        }
        isValidFirstName = false;
      }
    });
    let isValidLastName = false;
    const lastName = document.querySelector('input[name="last-name"]') as HTMLInputElement;
    lastName?.addEventListener('input', () => {
      const lastNameValueAll = lastName.value.split('');
      const lastNameValueIncorrect = lastNameValueAll.filter((item) => item.match('[^a-zA-Zа-яА-Я0-9 ]'));
      if (lastNameValueAll.length === 0 || lastNameValueAll.length > 30) {
        document.querySelector('.last-name.validate-field.correct')?.classList.add('hidden');
        document.querySelector('.last-name.validate-field.incorrect')?.classList.remove('hidden');
        if (lNameErrorMsg) lNameErrorMsg.innerText = 'Your last name length should be from 1 to 30 characters.';
        isValidLastName = false;
      } else if (lastNameValueAll === lastNameValueIncorrect || lastNameValueIncorrect.length === 0) {
        document.querySelector('.last-name.validate-field.incorrect')?.classList.add('hidden');
        document.querySelector('.last-name.validate-field.correct')?.classList.remove('hidden');
        if (lNameErrorMsg) lNameErrorMsg.innerText = '';
        isValidLastName = true;
      } else {
        document.querySelector('.last-name.validate-field.correct')?.classList.add('hidden');
        document.querySelector('.last-name.validate-field.incorrect')?.classList.remove('hidden');
        if (lNameErrorMsg) {
          lNameErrorMsg.innerText = `
            Your last name should include only letters, numbers and spaces. No special characters are allowed.
          `;
        }
        isValidLastName = false;
      }
    });
    let isValidEmail = false;
    const email = document.querySelector('input[name="email"]') as HTMLInputElement;
    const emailPattern = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/;
    email?.addEventListener('input', () => {
      const emailValue = email.value;
      if (emailPattern.test(emailValue) && emailValue.length <= 30) {
        document.querySelector('.email.validate-field.incorrect')?.classList.add('hidden');
        document.querySelector('.email.validate-field.correct')?.classList.remove('hidden');
        if (emailErrorMsg) emailErrorMsg.innerText = '';
        isValidEmail = true;
      } else {
        document.querySelector('.email.validate-field.correct')?.classList.add('hidden');
        document.querySelector('.email.validate-field.incorrect')?.classList.remove('hidden');
        if (emailErrorMsg) emailErrorMsg.innerText = 'Type correct e-mail address.';
        isValidEmail = false;
      }
    });
    const form = document.getElementById('register-form') as HTMLInputElement;
    form?.addEventListener('input', () => {
      if (addUserButton) {
        if (isValidFirstName && isValidLastName && isValidEmail) {
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
