import { BaseComponent } from '../../../base-components';

export class RegisterAvatar extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['register-form__avatar']);
  }

  render(): void {
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <label>
        <input type="file" name="avatar" style="display: none;"/>
        <div class="register-form__avatar_pic"></div>
      </label>
    `;
  }
}
