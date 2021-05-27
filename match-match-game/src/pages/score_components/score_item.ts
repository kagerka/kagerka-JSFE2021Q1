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
      console.log('Your browser doesn\'t support IndexedDB');
    }
    const request = indexedDB.open('kagerka', 1);
    request.onerror = (event) => {
      console.error(`Database error: ${event.target}`);
    };

    function displayData() {
      if (scorePlayers) scorePlayers.innerHTML = '';
      const db = request.result;
      const objectStore = db.transaction('Contacts').objectStore('Contacts');
      let count = 0;
      objectStore.index('score').openCursor(null, 'prev').onsuccess = (event) => {
        const cursor = (<IDBRequest>event.target).result;

        if (cursor && count < 10) {
          count++;
          const listItem = document.createElement('div');
          listItem.classList.add('score__player');
          listItem.innerHTML = `
          <div class="score__player_info">
            <div class="score__player_pic"></div>
            <div class="score__player_contacts">
              <div class="score__player_name">${cursor.value.firstName} ${cursor.value.lastName}</div>
              <div class="score__player_email">${cursor.value.email}</div>
            </div>
          </div>
          <div class="score__player_score">Score:  <span>${cursor.value.score}</span></div>
        `;
          scorePlayers?.appendChild(listItem);
          cursor.continue();
        } else {
          console.log('all data displayed');
        }
      };
    }

    request.onsuccess = () => {
      const db = request.result;
      displayData();
    };

    return this.scoreItem;
  }
}
