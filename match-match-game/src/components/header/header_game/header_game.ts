import './header_game.scss';
import { BaseComponent } from '../../base-components';
import { RegisterForm } from './register_form/register_form';
import { ScorePage } from '../../../pages/score';

export class HeaderGame extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['game']);
    this.rootElement.appendChild(this.element);
  }

  render(): HTMLElement {
    let isRegistered = false;
    new HeaderGame(this.element).notRegistered();
    new RegisterForm(this.element).render();
    const registerForm = document.querySelector('.overlay');

    registerForm?.addEventListener('click', (event) => {
      if (event.target) {
        if ((event.target as Element).classList.contains('overlay') || (event.target as Element).classList.contains('cancel')) {
          isRegistered = false;
        }
        if ((event.target as Element).classList.contains('add-user')) {
          isRegistered = true;
          this.element.innerHTML = '';
          new HeaderGame(this.element).registered();
        }
      }
    });

    return this.element;
  }

  notRegistered(): HTMLElement {
    this.element.innerHTML = `
      <div class="game__register_button">REGISTER NEW PLAYER</div>
    `;
    return this.element;
  }

  registered(): HTMLElement {
    this.element.innerHTML = `
      <div class="game__stop-game_button">STOP GAME</div>
      <div class="game__user"></div>
    `;
    const stopGameButton = document.querySelector('.game__stop-game_button');
    const main = document.querySelector('.game-field');
    stopGameButton?.addEventListener('click', () => {
      if (main) {
        main.innerHTML = '';
        new ScorePage(main as HTMLElement).render();
      }
    });
    return this.element;
  }
}
