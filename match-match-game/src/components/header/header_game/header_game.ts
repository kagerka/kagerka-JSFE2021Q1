import './header_game.scss';
import { BaseComponent } from '../../base-components';
import { RegisterForm } from './register_form/register_form';
import { ScorePage } from '../../../pages/score';
import { GameField } from '../../game-field';

export class HeaderGame extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['game']);
    this.rootElement.appendChild(this.element);
  }

  render(): HTMLElement {
    new HeaderGame(this.element).notRegistered();
    new RegisterForm(this.element).render();
    const registerForm = document.querySelector('.overlay');

    registerForm?.addEventListener('click', (event) => {
      if (event.target) {
        if ((event.target as Element).classList.contains('add-user')) {
          this.element.innerHTML = '';
          new HeaderGame(this.element).registered();
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

  notRegistered(): HTMLElement {
    this.element.innerHTML = `
      <div class="game__register_button">REGISTER NEW PLAYER</div>
    `;
    return this.element;
  }

  registered(): HTMLElement {
    this.element.innerHTML = `
      <div class="game__stop-game_button start-game">START GAME</div>
      <div class="game__user"></div>
    `;

    if (!window.indexedDB) {
      // console.log('Your browser doesn\'t support IndexedDB');
    }
    const request = indexedDB.open('kagerka', 1);
    request.onerror = () => {
      // console.error(`Database error: ${event.target}`);
    };

    function displayData() {
      const db = request.result;
      const objectStore = db.transaction('Contacts').objectStore('Contacts');
      objectStore.openCursor().onsuccess = (event) => {
        const cursor = (<IDBRequest>event.target).result;
        const avatarHeader: HTMLElement | null = document.querySelector('.game__user');
        if (cursor) {
          avatarHeader?.setAttribute('style', `background: ${cursor.value.avatar}`);
          cursor.continue();
        }
      };
    }

    request.onsuccess = () => {
      displayData();
    };

    const stopGameButton = document.querySelector('.game__stop-game_button');
    const main = document.querySelector('.game-field');

    stopGameButton?.addEventListener('click', () => {
      if (main) {
        if (!stopGameButton?.classList.contains('start-game')) {
          main.innerHTML = '';
          new ScorePage(main as HTMLElement).render();
          stopGameButton.innerHTML = 'START GAME';
          stopGameButton.classList.add('start-game');
          stopGameButton.classList.remove('stop-game');
          document.querySelector('.menu__item_about')?.classList.remove('active');
          document.querySelector('.menu__item_score')?.classList.remove('active');
          document.querySelector('.menu__item_settings')?.classList.remove('active');
        } else {
          main.innerHTML = '';
          new GameField(main as HTMLElement).start();
          stopGameButton.innerHTML = 'STOP GAME';
          stopGameButton.classList.remove('start-game');
          stopGameButton.classList.add('stop-game');
          document.querySelector('.menu__item_about')?.classList.remove('active');
          document.querySelector('.menu__item_score')?.classList.remove('active');
          document.querySelector('.menu__item_settings')?.classList.remove('active');
        }
      }
    });

    return this.element;
  }
}
