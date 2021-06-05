import { BaseComponent } from '../../components/base-components';

export class ScoreItem extends BaseComponent {
  private readonly scoreItem: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['score__player']);
    this.rootElement.appendChild(this.element);
    this.scoreItem = document.createElement('div');
  }

  render(): HTMLElement {
    const scorePlayers = document.querySelector('.score__players');
    if (!window.indexedDB) {
      throw new Error('Your browser doesn\'t support IndexedDB');
    }
    const IDB_VERSION = 1;
    const request = indexedDB.open('kagerka', IDB_VERSION);
    request.onerror = (event): void => {
      throw new Error(`Database error: ${event.target}`);
    };

    function displayData(): void {
      if (scorePlayers) { scorePlayers.innerHTML = ''; }
      const db = request.result;
      const objectStore = db.transaction('Contacts').objectStore('Contacts');
      let count = 0;
      objectStore.index('score').openCursor(null, 'prev').onsuccess = (event): void => {
        const cursor = (<IDBRequest>event.target).result;
        const TOP_COUNT = 10;
        if (cursor && count < TOP_COUNT) {
          count++;
          const listItem = document.createElement('div');
          listItem.classList.add('score__player');
          listItem.innerHTML = `
          <div class="score__player_info">
            <div class="score__player_pic" style='background: ${cursor.value.avatar}'></div>
            <div class="score__player_contacts">
              <div class="score__player_name">${cursor.value.firstName} ${cursor.value.lastName}</div>
              <div class="score__player_email">${cursor.value.email}</div>
            </div>
          </div>
          <div class="score__player_score">Score:  <span>${cursor.value.score}</span></div>
        `;
          scorePlayers?.appendChild(listItem);
          cursor.continue();
        }
      };
    }

    request.onsuccess = (): void => {
      // const db = request.result;
      displayData();
    };

    return this.scoreItem;
  }
}
