import { BaseComponent } from '../baseСomponent';
import { Car } from '../garage/race-field/car';

export class WinnerItem extends BaseComponent {
  private readonly rowNum: HTMLElement;

  private readonly carView: HTMLElement;

  private readonly winnerName: HTMLElement;

  private readonly numOfWins: HTMLElement;

  private readonly bestTime: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('tr', ['winners__item']);
    this.rootElement.appendChild(this.element);

    this.rowNum = document.createElement('td');
    this.element.appendChild(this.rowNum);

    this.carView = document.createElement('td');
    this.element.appendChild(this.carView);

    this.winnerName = document.createElement('td');
    this.element.appendChild(this.winnerName);

    this.numOfWins = document.createElement('td');
    this.element.appendChild(this.numOfWins);

    this.bestTime = document.createElement('td');
    this.element.appendChild(this.bestTime);
  }

  render(
    color: string, id: number, rowNum: number, winnerName: string, numOfWins: number, bestTime: number,
  ): HTMLElement {
    this.rowNum.innerHTML = `${rowNum}`;
    this.carView.appendChild(new Car(this.carView).render(color, id));
    this.winnerName.innerHTML = `${winnerName}`;
    this.numOfWins.innerHTML = `${numOfWins}`;
    this.bestTime.innerHTML = `${bestTime}`;
    return this.element;
  }
}
