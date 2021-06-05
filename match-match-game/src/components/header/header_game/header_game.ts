import './header_game.scss';
import { BaseComponent } from '../../base-components';
import { RegisterForm } from './register_form/register_form';
import { ScorePage } from '../../../pages/score';
import { GameField } from '../../game-field';
import { Counter } from '../../counter/counter';

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
    this.element.innerHTML = '<div class="game__register_button">REGISTER NEW PLAYER</div>';
    return this.element;
  }

  registered(): HTMLElement {
    this.element.innerHTML = `<div class="game__stop-game_button start-game">START GAME</div>
                              <div class="game__user"></div>`;
    if (!window.indexedDB) { throw new Error('Your browser doesn\'t support IndexedDB'); }
    const IDB_VERSION = 1;
    const request = indexedDB.open('kagerka', IDB_VERSION);
    request.onerror = (): void => {};
    function displayData(): void {
      const db = request.result;
      const objectStore = db.transaction('Contacts').objectStore('Contacts');
      objectStore.openCursor().onsuccess = (event): void => {
        const cursor = (<IDBRequest>event.target).result;
        const avatarHeader: HTMLElement | null = document.querySelector('.game__user');
        if (cursor) {
          avatarHeader?.setAttribute('style', `background: ${cursor.value.avatar}`);
          cursor.continue();
        }
      };
    }
    request.onsuccess = (): void => {
      displayData();
    };
    const stopGameButton = document.querySelector('.game__stop-game_button');
    const main = document.querySelector('.game-field');
    let isTimerWork = false;
    stopGameButton?.addEventListener('click', () => {
      if (main) {
        if (!stopGameButton?.classList.contains('start-game')) {
          isTimerWork = false;
          main.innerHTML = '';
          new ScorePage(main as HTMLElement).render();
          stopGameButton.innerHTML = 'START GAME';
          stopGameButton.classList.add('start-game');
          stopGameButton.classList.remove('stop-game');
          document.querySelector('.menu__item_about')?.classList.remove('active');
          document.querySelector('.menu__item_score')?.classList.remove('active');
          document.querySelector('.menu__item_settings')?.classList.remove('active');
          const COUNT_TIMEOUT = 100;
          for (let i = 1; i < COUNT_TIMEOUT; i++) { clearTimeout(i); }
        } else {
          isTimerWork = true;
          main.innerHTML = '';
          new GameField(main as HTMLElement).start();
          const CARD_FLIP_TIME = 30000;
          if (isTimerWork) {
            setTimeout(() => { new Counter(this.element).countTime(); }, CARD_FLIP_TIME);
          }
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
