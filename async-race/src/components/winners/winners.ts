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
    this.title.innerHTML = 'Winners (4)';
    this.subTitle.innerHTML = 'Page #1';
    this.thead.innerHTML = `
      <th>Number</th>
      <th>Car</th>
      <th>Name</th>
      <th>Wins</th>
      <th>Best time (sec)</th>
    `;
    new WinnerItem(this.tbody).render();
    return this.element;
  }
}
