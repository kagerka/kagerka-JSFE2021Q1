import { BaseComponent } from '../baseСomponent';
import { Pagination } from '../pagination';
import { GarageOptions } from './options';
import { Race } from './race-field';

export class Garage extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['garage']);
    this.rootElement.appendChild(this.element);
  }

  render(): void {
    new GarageOptions(this.element).render();
    new Race(this.element).render();
    new Pagination(this.element).render();
  }
}
