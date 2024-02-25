import './logo.scss';
import { BaseComponent } from '../../base-components';

export class HeaderLogo extends BaseComponent {
  private readonly logo: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('a', ['logo']);
    this.element.setAttribute('href', '#/');
    this.logo = document.createElement('a');
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <div class="logo__top">MATCH</div>
      <div class="logo__bottom">MATCH</div>
  `;
  }
}
