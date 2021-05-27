export class IndexedDB {
  render() {
    if (!window.indexedDB) {
      console.log('Your browser doesn\'t support IndexedDB');
    }

    const request = indexedDB.open('kagerka', 1);
    request.onerror = (event) => {
      console.error(`Database error: ${event.target}`);
    };

    request.onsuccess = () => {
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest)?.result;
      const store = db.createObjectStore('Contacts', { autoIncrement: true });
      const email = store.createIndex('email', 'email', { unique: true });
      const firstName = store.createIndex('firstName', 'firstName', { unique: false });
      const lastName = store.createIndex('lastName', 'lastName', { unique: false });
      const score = store.createIndex('score', 'score', { unique: false });
    };

    function insertContact(db: IDBDatabase, contact: unknown) {
      const txn = db.transaction('Contacts', 'readwrite');
      const store = txn.objectStore('Contacts');
      const query = store.put(contact);
      query.onsuccess = function (event) {
        console.log(event);
      };
      query.onerror = function (event) {
        console.log('error');
      };
      txn.oncomplete = function () {
        db.close();
      };
    }
    // (количество сравнений - количество ошибочных сравнений) * 100 - (время прошедшее с начала в секундах) * 10.
    function updateScore(db: IDBDatabase) {
      const transaction = db.transaction('Contacts', 'readwrite');
      const objectStore = transaction.objectStore('Contacts');
      const mins = document.getElementById('min')?.innerText;
      const sec = document.getElementById('sec')?.innerText;
      const clickDiff = document.getElementById('clickDiffField')?.innerText;
      let score = 0;
      if (mins && sec && clickDiff) {
        score = (+clickDiff * 100) - ((+mins * 60) + +sec) * 10;
        if (score < 0) {
          score = 0;
        }
      }
      objectStore.openCursor().onsuccess = function (event) {
        const cursor = (<IDBRequest>event.target).result;
        const count = objectStore.count();
        let countNum = 0;
        count.onsuccess = function () {
          countNum = count.result;
          if (cursor) {
            if (cursor.key === countNum) {
              const updateData = cursor.value;
              updateData.score = score;
              const requestUpd = cursor.update(updateData);
              requestUpd.onsuccess = function () {
                console.log('score updated');
              };
            }
            cursor.continue();
          }
        };
      };
    }

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest)?.result;
      const addUserBtn = document.querySelector('.add-user');
      const addScoreBtn = document.querySelector('.congrat-btn');

      addUserBtn?.addEventListener('click', () => {
        const email = (document.querySelector('input[name="email"]') as HTMLInputElement)?.value;
        const firstName = (document.querySelector('input[name="first-name"]') as HTMLInputElement)?.value;
        const lastName = (document.querySelector('input[name="last-name"]') as HTMLInputElement)?.value;
        const score = 0;
        insertContact(db, {
          email,
          firstName,
          lastName,
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
