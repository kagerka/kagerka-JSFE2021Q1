import { getWinners } from '../../rest-api/winners/winner-func';
import { BaseComponent } from '../base-components';
import { WinnerItem } from './winner-item';

export class Winners extends BaseComponent {
  private readonly title: HTMLElement;

  private readonly subTitle: HTMLElement;

  private readonly table: HTMLElement;

  private readonly thead: HTMLElement;

  private readonly tbody: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['winners', 'hidden']);
    this.rootElement.appendChild(this.element);

    this.title = document.createElement('h2');
    this.element.appendChild(this.title);

    this.subTitle = document.createElement('h3');
    this.element.appendChild(this.subTitle);

    this.table = document.createElement('table');
    this.element.appendChild(this.table);

    this.thead = document.createElement('thead');
    this.table.appendChild(this.thead);

    this.tbody = document.createElement('tbody');
    this.table.appendChild(this.tbody);
  }

  render(): HTMLElement {
    this.title.innerHTML = 'Winners (1)';
    this.subTitle.innerHTML = 'Page #1';
    this.thead.innerHTML = `
      <th>Number</th>
      <th>Car</th>
      <th>Name</th>
      <th>Wins</th>
      <th>Best time (sec)</th>
    `;
    this.renderWinners();
    return this.element;
  }

  renderWinners = async (): Promise<void> => {
    const winners = await getWinners({
      page: 1, limit: 10, sort: 'time', order: 'ADS',
    });
    let rowNum = 1;
    this.tbody.innerHTML = '';
    winners.items.forEach((element) => {
      new WinnerItem(this.tbody).render(
        element.car.color, element.car.id, rowNum, element.car.name, element.wins, element.time,
      );
      rowNum++;
    });
  };
}
