import './header.scss';
import { BaseComponent } from '../base-components';
import { HeaderLogo } from './header_logo/logo';
import { HeaderMenu } from './header_menu/menu';
import { HeaderGame } from './header_game/header_game';

export class Header extends BaseComponent {
  private readonly header: HTMLElement;

  private headerLogo: HeaderLogo;

  private headerMenu: HeaderMenu;

  constructor(private readonly rootElement: HTMLElement) {
    super('header', ['header']);
    this.header = document.createElement('header');
    this.headerLogo = new HeaderLogo(this.element);
    this.headerMenu = new HeaderMenu(this.element);
  }

  render(): HTMLElement {
    this.rootElement.appendChild(this.element);
    this.element.appendChild(this.headerLogo.element);
    this.element.appendChild(this.headerMenu.element);
    new HeaderGame(this.element).render();
    return this.header;
  }
}
