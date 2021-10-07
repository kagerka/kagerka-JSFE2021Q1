export class IndexedDB {
  render(): IndexedDB {
    if (!window.indexedDB) {
      throw new Error('Your browser doesn\'t support IndexedDB');
    }
    const IDB_VERSION = 1;
    const request = indexedDB.open('kagerka', IDB_VERSION);
    request.onerror = (): void => {
    };

    request.onsuccess = (): void => { };

    request.onupgradeneeded = (event): void => {
      const db = (event.target as IDBOpenDBRequest)?.result;
      const store = db.createObjectStore('Contacts', { autoIncrement: true });
      store.createIndex('email', 'email', { unique: true });
      store.createIndex('firstName', 'firstName', { unique: false });
      store.createIndex('lastName', 'lastName', { unique: false });
      store.createIndex('score', 'score', { unique: false });
      store.createIndex('avatar', 'avatar', { unique: false });
    };

    function insertContact(db: IDBDatabase, contact: {
      email: string; firstName: string; lastName: string; score: number; avatar: string }): void {
      const txn = db.transaction('Contacts', 'readwrite');
      const store = txn.objectStore('Contacts');
      const query = store.put(contact);
      query.onsuccess = (): void => {
      };
      query.onerror = (): void => {
      };
      txn.oncomplete = (): void => {
        db.close();
      };
    }

    function updateScore(db: IDBDatabase): void {
      const transaction = db.transaction('Contacts', 'readwrite');
      const objectStore = transaction.objectStore('Contacts');
      const mins = document.getElementById('min')?.innerText;
      const sec = document.getElementById('sec')?.innerText;
      const clickDiff = document.getElementById('clickDiffField')?.innerText;
      let score = 0;
      const SEC_IN_MIN = 60;
      const DIFF_COEFFICIENT = 100;
      const TIME_COEFFICIENT = 10;
      const SCORE_ZERO = 0;
      if (mins && sec && clickDiff) {
        score = +clickDiff * DIFF_COEFFICIENT - (+mins * SEC_IN_MIN + +sec) * TIME_COEFFICIENT;
        if (score < SCORE_ZERO) {
          score = SCORE_ZERO;
        }
      }
      objectStore.openCursor().onsuccess = (event): void => {
        const cursor = (<IDBRequest>event.target).result;
        const count = objectStore.count();
        let countNum = 0;
        count.onsuccess = (): void => {
          countNum = count.result;
          if (cursor) {
            if (cursor.key === countNum) {
              const updateData = cursor.value;
              updateData.score = score;
              const requestUpd = cursor.update(updateData);
              requestUpd.onsuccess = (): void => {
              };
            }
            cursor.continue();
          }
        };
      };
    }

    request.onsuccess = (event): void => {
      const db = (event.target as IDBOpenDBRequest)?.result;
      const addUserBtn = document.querySelector('.add-user');
      const addScoreBtn = document.querySelector('.congrat-btn');
      addUserBtn?.addEventListener('click', () => {
        const email = (document.querySelector('input[name="email"]') as HTMLInputElement)?.value;
        const firstName = (document.querySelector('input[name="first-name"]') as HTMLInputElement)?.value;
        const lastName = (document.querySelector('input[name="last-name"]') as HTMLInputElement)?.value;
        const avatar = (document.querySelector('.register-form__avatar_pic') as HTMLInputElement)?.style.background;
        insertContact(db, {
          email,
          firstName,
          lastName,
          avatar,
          score: 0,
        });
      });

      addScoreBtn?.addEventListener('click', () => {
        updateScore(db);
      });
    };
    return this;
  }
}
