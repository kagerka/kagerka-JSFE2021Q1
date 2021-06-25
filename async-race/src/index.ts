import { App } from './components/app';
import { Navigation } from './components/navigation';
import './styles.scss';

window.onload = (): void => {
  const appElement = document.body;
  if (!appElement) {
    throw Error('App root element not found');
  }

  new Navigation(appElement).render();
  new App(appElement).render();
};
