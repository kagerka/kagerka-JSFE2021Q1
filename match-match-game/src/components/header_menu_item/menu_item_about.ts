import { BaseComponent } from '../base-components';

export class HeaderMenuItemAbout extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['menu__item']);
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <div class="menu__icon menu__icon_about"></div>
      <div class="menu__title">About Game</div>
    `;
  }
}
