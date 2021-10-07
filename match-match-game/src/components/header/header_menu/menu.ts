import './menu.scss';
import { BaseComponent } from '../../base-components';
import { HeaderMenuItem } from './header_menu_item/menu_item';

export class HeaderMenu extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['menu']);
    this.rootElement.appendChild(this.element);

    new HeaderMenuItem(this.element).render(
      'menu__item menu__item_about',
      './#/about',
      'menu__icon menu__icon_about',
      'About Game',
    );
    new HeaderMenuItem(this.element).render(
      'menu__item menu__item_score',
      './#/score',
      'menu__icon menu__icon_score',
      'Best Score',
    );
    new HeaderMenuItem(this.element).render(
      'menu__item menu__item_settings',
      './#/settings',
      'menu__icon menu__icon_settings',
      'Game Settings',
    );
  }
}
