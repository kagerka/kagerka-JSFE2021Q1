import { BaseComponent } from '../../../base-components';

export class RegisterEmail extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['register-form__item']);
  }

  render(): void {
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <label for="email">E-mail</label>
      <input type="email" placeholder="Enter your e-mail here" name="email" required>
      <div class="email validate-field correct hidden">
        <div class="validate-field__yes">✓</div>
      </div>
      <div class="email validate-field incorrect">
        <div class="validate-field__no ">!</div>
      </div>
    `;
  }
}
