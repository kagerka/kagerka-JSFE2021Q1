import { BaseComponent } from '../../../base-components';

export class RegisterErrors extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['reg-form-error-msg']);
  }

  render(): void {
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <div id="reg-form-fname-error-msg" class="reg-form-error"></div>
      <div id="reg-form-lname-error-msg" class="reg-form-error"></div>
      <div id="reg-form-email-error-msg" class="reg-form-error"></div>
    `;
  }
}
