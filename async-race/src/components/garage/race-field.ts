import { BaseComponent } from '../base-components';
import { generateCarItems } from './race-field/generateCarItems';
import { WinMsg } from './race-field/win-msg';

export class Race extends BaseComponent {
  public static title: HTMLElement;

  public static subTitle: HTMLElement;

  public static raceField: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['garage__race']);
    this.rootElement.appendChild(this.element);

    Race.title = document.createElement('h2');
    this.element.appendChild(Race.title);

    Race.subTitle = document.createElement('h3');
    this.element.appendChild(Race.subTitle);

    Race.raceField = document.createElement('div');
    Race.raceField.setAttribute('class', 'garage__race-field');
    this.element.appendChild(Race.raceField);
  }

  render(): HTMLElement {
    new WinMsg(this.element).render();
    generateCarItems();
    return this.element;
  }
}
