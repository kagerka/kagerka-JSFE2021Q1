import { BaseComponent } from '../../../base-components';

export class RegisterButtons extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['register-form__buttons']);
  }

  render(): void {
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <button type="button" class="btn add-user">ADD USER</button>
      <button type="button" class="btn cancel">CANCEL</button>
    `;
  }
}
