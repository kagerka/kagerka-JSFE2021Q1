import { BaseComponent } from '../../../base-components';

export class HeaderMenuItemSettings extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('a', ['menu__item', 'menu__item_settings']);
    this.element.setAttribute('href', '/#/settings');
    this.element.setAttribute('data-link', '');
    // this.element.setAttribute('onclick', 'onNavigate(\'/settings\'); return false;');
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <div class="menu__icon menu__icon_settings"></div>
      <div class="menu__title">Game Settings</div>
    `;
  }
}
