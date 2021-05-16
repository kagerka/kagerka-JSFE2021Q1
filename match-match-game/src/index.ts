import './styles.scss';
import { App } from './app';
import { Header } from './components/header/header';

window.onload = () => {
  const appElement = document.getElementById('app');
  if (!appElement) throw Error('App root element not found');

  new Header(appElement).render();
  new App(appElement).start();

  const main = document.querySelector('main');
  if (main) {
    main.classList.add('game-field');
  }
};
