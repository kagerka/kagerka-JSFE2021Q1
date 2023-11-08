import { BaseComponent } from '../baseComponent';
import { ZERO } from '../constants';
import { store } from '../redux';

export class MenuItem extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('li', ['nav-item']);
    this.rootElement.appendChild(this.element);
    this.activeItem();
  }

  init(): void {
    this.element.classList.add('main');
    this.element.innerHTML = '<a class="nav-link main-page" href="#">Main page</a>';
  }

  activeItem(): void {
    document.addEventListener('click', () => {
      setTimeout(() => {
        document.querySelectorAll('.nav-item').forEach((item) => {
          if (item.classList.contains('active')) {
            item.classList.remove('active');
          }
          document.querySelector(`.nav-item.${store.getState().categoryName.value}`)?.classList.add('active');
        }, ZERO);
      });
    });

    this.element.addEventListener('click', () => {
      const links = document.querySelectorAll('.nav-item');
      links.forEach((item) => {
        item.classList.remove('active');
      });
      this.element.classList.add('active');
    });
  }

  render(categoryName: string, categoryClass: string): void {
    this.element.classList.add(categoryClass);
    this.element.innerHTML = `
      <a class="nav-link ${categoryClass}" href="#">${categoryName}</a>
    `;
  }
}
