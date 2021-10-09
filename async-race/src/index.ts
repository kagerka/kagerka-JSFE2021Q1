import { Main } from './components/main-content';
import { Navigation } from './components/navigation';
import './styles.scss';

window.onload = (): void => {
  const appElement = document.getElementById('app');
  if (!appElement) throw Error('App root element not found');

  new Navigation(appElement).render();
  new Main(appElement).render();
};
