import { BaseComponent } from './baseСomponent';
import { Garage } from './garage/garage';
import { Winners } from './winners/winners';

export class App extends BaseComponent {
  private readonly logo: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['main']);
    this.rootElement.appendChild(this.element);

    this.logo = document.createElement('img');
    this.logo.setAttribute('class', 'logo');
    this.logo.setAttribute('src', './logo.svg');
    this.element.appendChild(this.logo);
  }

  render(): void {
    new Garage(this.element).render();
    new Winners(this.element).render();
  }
}
