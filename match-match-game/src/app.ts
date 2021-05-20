// import { Game } from './components/game/game';
// import { ImageCategoryModel } from './models/image-category-model';
import { BaseComponent } from './components/base-components';
import { AboutPage } from './pages/about';
import { GameField } from './components/game-field';

export class App extends BaseComponent {
  private readonly main: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('main', ['game-field']);
    this.main = document.createElement('main');
  }

  clear(): void {
    this.element.innerHTML = '';
  }

  render(): HTMLElement {
    this.rootElement.appendChild(this.element);
    new AboutPage(this.element).render();

    const registerButton = document.querySelector('.game__register_button');
    const registerForm = document.querySelector('.overlay');

    registerButton?.addEventListener('click', () => {
        registerForm?.classList.remove('hidden');
    });

    registerForm?.addEventListener('click', (event) => {
      if (event.target) {
        if ((event.target as Element).classList.contains('overlay') || (event.target as Element).classList.contains('cancel')) {
          registerForm.classList.add('hidden');
        }
        if ((event.target as Element).classList.contains('add-user')) {
          registerForm.classList.add('hidden');
          this.element.innerHTML = '';
          new GameField(this.element).start();
        }
      }
    });

    return this.main;
  }
}
