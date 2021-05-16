import './header_game.scss';
import { BaseComponent } from '../base-components';

export class HeaderGame extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['game']);
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <div class="game__button">STOP GAME</div>
      <div class="game__user"></div>
    `;
  }
}
