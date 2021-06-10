import { CarType } from '../../params';
import { getCar, getCars } from '../../rest-api/garage/get-car';
import { BaseComponent } from '../base-components';
import { CARS_ON_PAGE, ZERO } from '../constants';
import { RaceFieldItem } from './race-field/race-field-item';
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
    Race.generateCarItems();
    return this.element;
  }

  public static generateCarItems(): void {
    let pageNum = 1;

    setTimeout(async () => {
      const items = await getCars(pageNum, CARS_ON_PAGE);
      const itemsItems = items.items;
      const totalCount = items.count;
      Race.raceField.innerHTML = '';
      itemsItems.forEach((item: CarType) => new RaceFieldItem(this.raceField).render(item.id, item.name, item.color));
      Race.title.innerHTML = `Garage (${totalCount})`;
      this.subTitle.innerHTML = `Page #${pageNum}`;
    }, ZERO);
  }
}
