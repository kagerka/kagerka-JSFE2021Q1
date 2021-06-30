import { BaseComponent } from '../baseComponent';

export class MenuItem extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('li', ['nav-item']);
    this.rootElement.appendChild(this.element);
  }

  init(): void {
    this.element.innerHTML = '<li><a class="nav-link main-page" href="#/">Main page</a></li>';
  }

  render(categoryName: string, categoryClass: string): void {
    this.element.classList.add(categoryClass);
    this.element.innerHTML = `
      <a class="nav-link ${categoryClass}" href="#/cards">${categoryName}</a>
    `;
  }
}
