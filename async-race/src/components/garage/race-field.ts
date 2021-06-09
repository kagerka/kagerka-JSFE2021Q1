import { BaseComponent } from '../base-components';
import { RaceFieldItem } from './race-field/race-field-item';
import { WinMsg } from './race-field/win-msg';

export class Race extends BaseComponent {
  private readonly title: HTMLElement;

  private readonly subTitle: HTMLElement;

  private readonly raceField: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['garage__race']);
    this.rootElement.appendChild(this.element);

    this.title = document.createElement('h2');
    this.element.appendChild(this.title);

    this.subTitle = document.createElement('h3');
    this.element.appendChild(this.subTitle);

    this.raceField = document.createElement('div');
    this.raceField.setAttribute('class', 'garage__race-field');
    this.element.appendChild(this.raceField);
  }

  render(): HTMLElement {
    this.title.innerHTML = 'Garage (4)';
    this.subTitle.innerHTML = 'Page #1';
    new RaceFieldItem(this.raceField).render();
    new RaceFieldItem(this.raceField).render();
    new RaceFieldItem(this.raceField).render();
    new RaceFieldItem(this.raceField).render();
    new WinMsg(this.element).render();
    return this.element;
  }
}
