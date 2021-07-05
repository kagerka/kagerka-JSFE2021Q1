import { App } from './app';
import { Footer } from './footer';
import { Navigation } from './navigation/navigation';
import { store, train } from './redux';
import './styles.scss';

window.onload = (): void => {
  const appElement = document.body;
  if (!appElement) {
    throw Error('App root element not found');
  }
  store.dispatch(train());
  new Navigation(appElement).render();
  new App(appElement).render();
  new Footer(appElement).render();
};
