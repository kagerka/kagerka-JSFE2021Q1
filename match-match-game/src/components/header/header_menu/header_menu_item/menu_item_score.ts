import { BaseComponent } from '../../../base-components';

export class HeaderMenuItemScore extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('a', ['menu__item', 'menu__item_score']);
    this.element.setAttribute('href', './#/score');
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <div class="menu__icon menu__icon_score"></div>
      <div class="menu__title">Best Score</div>
    `;
  }
}
