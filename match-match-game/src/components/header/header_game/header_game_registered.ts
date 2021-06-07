import { ScorePage } from '../../../pages/score';
import { BaseComponent } from '../../base-components';
import { Counter } from '../../counter/counter';
import { GameField } from '../../game-field';

export class HeaderGameRegistered extends BaseComponent {
  registered(): HTMLElement {
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
