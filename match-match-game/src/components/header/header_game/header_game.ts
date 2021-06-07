import './header_game.scss';
import { BaseComponent } from '../../base-components';
import { RegisterForm } from './register_form/register_form';
import { HeaderGameRegistered } from './header_game_registered';

export class HeaderGame extends BaseComponent {
  private readonly regButton: HTMLElement;

  private readonly startButton: HTMLElement;

  private readonly avatar: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['game']);
    this.rootElement.appendChild(this.element);
    this.regButton = document.createElement('div');
    this.regButton.setAttribute('class', 'game__register_button');
    this.element.appendChild(this.regButton);
    this.startButton = document.createElement('div');
    this.startButton.setAttribute('class', 'game__stop-game_button start-game');
    this.avatar = document.createElement('div');
    this.avatar.setAttribute('class', 'game__user');
  }

  render(): HTMLElement {
    this.regButton.innerHTML = 'REGISTER NEW PLAYER';
    new RegisterForm(this.element).render();
    const registerForm = document.querySelector('.overlay');
    registerForm?.addEventListener('click', (event) => {
      if (event.target) {
        if ((event.target as Element).classList.contains('add-user')) {
          this.element.innerHTML = '';
          this.startButton.innerHTML = 'START GAME';
          this.element.appendChild(this.startButton);
          this.element.appendChild(this.avatar);
          new HeaderGameRegistered().registered();
          const stopGameButton = document.querySelector('.game__stop-game_button');
          if (stopGameButton && !stopGameButton?.classList.contains('start-game')) {
            stopGameButton.innerHTML = 'START GAME';
            stopGameButton.classList.add('start-game');
          }
        }
      }
    });
    return this.element;
  }
}
