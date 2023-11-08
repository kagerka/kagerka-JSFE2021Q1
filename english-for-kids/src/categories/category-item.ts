import { BaseComponent } from '../baseComponent';
import { store } from '../redux';

export class CategoryItem extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['cards__card']);
    this.rootElement.appendChild(this.element);
  }

  render(categoryName: string, categoryClass: string): void {
    this.element.innerHTML = `
      <div class="cards__card_img ${categoryClass}"></div>
      <p class="${categoryClass}">${categoryName}</p>
    `;
    this.element.classList.add(categoryClass);
    if (store.getState().gameMode.value === 'play') {
      this.element.classList.add('play');
      this.element.classList.remove('train');
    } else {
      this.element.classList.remove('play');
      this.element.classList.add('train');
    }
  }
}
