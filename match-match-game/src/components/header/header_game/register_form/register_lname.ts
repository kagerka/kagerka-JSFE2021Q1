import { BaseComponent } from '../../../base-components';

export class RegisterLastName extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['register-form__item']);
  }

  render(): void {
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <label for="last-name">Last Name</label>
      <input type="text" placeholder="Enter your last name here" name="last-name" required>
      <div class="last-name validate-field correct hidden">
        <div class="validate-field__yes">✓</div>
      </div>
      <div class="last-name validate-field incorrect">
        <div class="validate-field__no ">!</div>
      </div>
    `;
  }
}
