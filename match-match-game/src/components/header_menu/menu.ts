import './menu.scss';
import { BaseComponent } from '../base-components';
import { HeaderMenuItemAbout } from '../header_menu_item/menu_item_about';
import { HeaderMenuItemScore } from '../header_menu_item/menu_item_score';
import { HeaderMenuItemSettings } from '../header_menu_item/menu_item_settings';

export class HeaderMenu extends BaseComponent {
  private headerMenuItemAbout: HeaderMenuItemAbout;

  private headerMenuItemScore: HeaderMenuItemScore;

  private headerMenuItemSettings: HeaderMenuItemSettings;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['menu']);
    this.rootElement.appendChild(this.element);

    this.headerMenuItemAbout = new HeaderMenuItemAbout(this.element);
    this.headerMenuItemScore = new HeaderMenuItemScore(this.element);
    this.headerMenuItemSettings = new HeaderMenuItemSettings(this.element);
  }
}
