import { BaseComponent } from '../base-components';

export class HeaderMenuItemScore extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['menu__item']);
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <div class="menu__icon menu__icon_score"></div>
      <div class="menu__title">Best Score</div>
    `;
  }
  // render() {

  // }
}
