import { BaseComponent } from '../base-components';

export class HeaderMenuItemSettings extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['menu__item']);
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <div class="menu__icon menu__icon_settings"></div>
      <div class="menu__title">Game Settings</div>
    `;
  }
}
