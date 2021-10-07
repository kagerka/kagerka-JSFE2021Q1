import { BaseComponent } from '../../../base-components';

export class HeaderMenuItem extends BaseComponent {
  private readonly icon: HTMLElement;

  private readonly title: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('a', ['menu__item']);
    this.rootElement.appendChild(this.element);
    this.icon = document.createElement('div');
    this.title = document.createElement('div');
    this.title.setAttribute('class', 'menu__title');
    this.element.appendChild(this.icon);
    this.element.appendChild(this.title);
  }

  render(rootClass: string, link: string, iconClass: string, title: string): HTMLElement {
    this.element.setAttribute('class', rootClass);
    this.element.setAttribute('href', link);
    this.icon.setAttribute('class', iconClass);
    this.title.innerText = title;
    return this.element;
  }
}
