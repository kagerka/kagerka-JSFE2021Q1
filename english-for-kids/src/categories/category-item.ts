import { BaseComponent } from '../baseComponent';

export class CategoryItem extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['cards__card']);
    this.rootElement.appendChild(this.element);
  }

  render(categoryName: string, categoryClass: string): void {
    this.element.classList.add(categoryClass);
    this.element.innerHTML = `
      <div class="cards__card_img ${categoryClass}"></div>
      <p>${categoryName}</p>
    `;
  }
}
