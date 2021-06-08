import { BaseComponent } from '../base-components';

export class WinnerItem extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('tr', ['winners__item']);
    this.rootElement.appendChild(this.element);
  }

  render(): HTMLElement {
    this.element.innerHTML = `
      <td>1</td>
      <td><img src="../car.svg" style="width: 50px;" alt=""></td>
      <td>Aston Martin 7</td>
      <td>2</td>
      <td>2.83</td>
    `;

    return this.element;
  }
}
