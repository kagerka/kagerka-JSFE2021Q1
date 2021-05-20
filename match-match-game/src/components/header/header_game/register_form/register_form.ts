import './register_form.scss';
import { BaseComponent } from '../../../base-components';

export class RegisterForm extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['overlay', 'hidden']);
    this.rootElement.appendChild(this.element);
  }

  render(): HTMLElement {
    this.element.innerHTML = `

    <div class="register-form" id="register-form">
      <h1>Register new Player</h1>
      <form action="">
        <div class="register-form__wrapper">

          <div class="register-form__items-field">
            <div class="register-form__item">
              <label for="first-name">First Name</label>
              <input type="text" placeholder="Enter your name here" name="first-name" required>
              <div class="validate-field correct">
                <div class="validate-field__yes">✓</div>
              </div>
              <div class="validate-field incorrect hidden">
                <div class="validate-field__no ">!</div>
              </div>
            </div>

            <div class="register-form__item">
              <label for="last-name">Last Name</label>
              <input type="text" placeholder="Enter your last name here" name="last-name" required>
              <div class="validate-field correct">
                <div class="validate-field__yes">✓</div>
              </div>
              <div class="validate-field incorrect hidden">
                <div class="validate-field__no ">!</div>
              </div>
            </div>

            <div class="register-form__item">
              <label for="email">E-mail</label>
              <input type="email" placeholder="Enter your e-mail here" name="email" required>
              <div class="validate-field correct">
                <div class="validate-field__yes">✓</div>
              </div>
              <div class="validate-field incorrect hidden">
                <div class="validate-field__no ">!</div>
              </div>
            </div>
          </div>
          <div class="register-form__avatar">
            <div class="register-form__avatar_pic"></div>
          </div>
        </div>
        <div class="register-form__buttons">

          <button type="submit" class="btn add-user">ADD USER</button>
          <button type="button" class="btn cancel">CANCEL</button>

        </div>
      </form>
    </div>
    `;

    return this.element;
  }
}
