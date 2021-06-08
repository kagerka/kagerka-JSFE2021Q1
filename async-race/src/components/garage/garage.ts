import { BaseComponent } from '../base-components';
import { GarageOptions } from './options';
import { Race } from './race-field';

export class Garage extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['garage']);
    this.rootElement.appendChild(this.element);
  }

  render(): HTMLElement {
    new GarageOptions(this.element).render();
    new Race(this.element).render();
    return this.element;
  }
}
