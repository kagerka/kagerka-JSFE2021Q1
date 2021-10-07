import { BaseComponent } from '../baseСomponent';
import { state } from '../state';
import { generateCarItems } from './race-field/generateCarItems';

export class Race extends BaseComponent {
  public title: HTMLElement;

  public subTitle: HTMLElement;

  public raceField: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['garage__race']);
    this.rootElement.appendChild(this.element);

    this.title = document.createElement('h2');
    this.title.setAttribute('class', 'garage__race-title');
    this.element.appendChild(this.title);

    this.subTitle = document.createElement('h3');
    this.subTitle.setAttribute('class', 'garage__race-subtitle');
    this.element.appendChild(this.subTitle);

    this.raceField = document.createElement('div');
    this.raceField.setAttribute('class', 'garage__race-field');
    this.element.appendChild(this.raceField);
  }

  render(): void {
    this.title.innerHTML = '';
    this.subTitle.innerHTML = '';
    generateCarItems(state.pageNum);
  }
}
