import { BaseComponent } from '../../../base-components';

export class RegisterFirstName extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['register-form__item']);
  }

  render(): void {
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <label for="first-name">First Name</label>
      <input type="text" placeholder="Enter your name here" name="first-name" required>
      <div class="first-name validate-field correct hidden">
        <div class="validate-field__yes">✓</div>
      </div>
      <div class="first-name validate-field incorrect">
        <div class="validate-field__no ">!</div>
      </div>
    `;
  }
}
