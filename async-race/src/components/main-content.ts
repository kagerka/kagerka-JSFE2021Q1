import { BaseComponent } from './base-components';
import { Garage } from './garage/garage';
import { Winners } from './winners/winners';

export class Main extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['main']);
    this.rootElement.appendChild(this.element);
  }

  render(): HTMLElement {
    new Garage(this.element).render();
    new Winners(this.element).render();
    return this.element;
  }
}
