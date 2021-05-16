import './header.scss';
import { BaseComponent } from '../base-components';
import { HeaderMenu } from '../header_menu/menu';
import { HeaderGame } from '../header_game/header_game';

export class Header extends BaseComponent {
  private readonly header: HTMLElement;

  private headerMenu: HeaderMenu;

  private headerGame: HeaderGame;

  constructor(private readonly rootElement: HTMLElement) {
    super('header', ['header']);
    this.header = document.createElement('header');
    this.headerMenu = new HeaderMenu(this.element);
    this.headerGame = new HeaderGame(this.element);
  }

  render(): HTMLElement {
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <div class="logo">
        <div class="logo__top">MATCH</div>
        <div class="logo__bottom">MATCH</div>
      </div>
    `;
    this.element.appendChild(this.headerMenu.element);
    this.element.appendChild(this.headerGame.element);
    return this.header;
  }
}
