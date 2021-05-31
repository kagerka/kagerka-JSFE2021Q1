import './styles.scss';
import { App } from './app';
import { Header } from './components/header/header';
import { AboutPage } from './pages/about';
import { ScorePage } from './pages/score';
import { SettingsPage } from './pages/settings';
import { IndexedDB } from './components/indexeddb/indexeddb';

const appElement = document.getElementById('app');
if (!appElement) throw Error('App root element not found');

window.onload = () => {
  new Header(appElement).render();
  new App(appElement).render();
  const main = document.querySelector('main');
  if (!main) throw Error('App root element not found');
  const router = async () => {
    const routes = [
      {
        path: '#/',
        view: () => {
          new AboutPage(main).render();
        },
      },
      {
        path: '#/about',
        view: () => {
          new AboutPage(main).render();
          const stopGameButton = document.querySelector('.game__stop-game_button');
          if (stopGameButton) stopGameButton.innerHTML = 'START GAME';
          stopGameButton?.classList.add('start-game');
          stopGameButton?.classList.remove('stop-game');
          for (let i = 1; i < 100; i++) {
            clearTimeout(i);
          }
        },
      },
      {
        path: '#/score',
        view: () => {
          new ScorePage(main).render();
          const stopGameButton = document.querySelector('.game__stop-game_button');
          if (stopGameButton) stopGameButton.innerHTML = 'START GAME';
          stopGameButton?.classList.add('start-game');
          stopGameButton?.classList.remove('stop-game');
          for (let i = 1; i < 100; i++) {
            clearTimeout(i);
          }
        },
      },
      {
        path: '#/settings',
        view: () => {
          new SettingsPage(main).render();
          const stopGameButton = document.querySelector('.game__stop-game_button');
          if (stopGameButton) stopGameButton.innerHTML = 'START GAME';
          stopGameButton?.classList.add('start-game');
          stopGameButton?.classList.remove('stop-game');
          for (let i = 1; i < 100; i++) {
            clearTimeout(i);
          }
        },
      },
    ];
    const potentialMatches = routes.map((route) => ({
      route,
      isMatch: window.location.hash === route.path,
    }));
    let match = potentialMatches.find(
      (potentialMatch) => potentialMatch.isMatch,
    );
    if (!match) {
      match = {
        route: routes[0],
        isMatch: true,
      };
    }
    match.route.view();
  };
  const menuItems = document.querySelectorAll('.menu__item');
  menuItems?.forEach((item) => item.addEventListener('click', () => {
    setTimeout(() => {
      for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.remove('active');
      }
      if (!item.classList.contains('active')) {
        item.classList.add('active');
      }
      router();
    }, 0);
  }));
  window.addEventListener('popstate', router);
  new IndexedDB().render();
};
