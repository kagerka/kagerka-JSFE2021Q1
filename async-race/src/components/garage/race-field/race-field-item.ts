import { deleteCar } from '../../../rest-api/garage/delete-car';
import { getCar } from '../../../rest-api/garage/get-car';
import { BaseComponent } from '../../baseСomponent';
import { variables } from '../../data';
import { Car } from './car';
import { generateCarItems } from './generateCarItems';
import { startDriving, stopDriving } from './race-functions';

export class RaceFieldItem extends BaseComponent {
  private readonly btnWrapper: HTMLElement;

  private readonly raceButtons: HTMLElement;

  private readonly selectButton: HTMLElement;

  private readonly removeButton: HTMLElement;

  private readonly raceABButtons: HTMLElement;

  private readonly aButton: HTMLElement;

  private readonly bButton: HTMLElement;

  private readonly carName: HTMLElement;

  private readonly flagImg: HTMLElement;

  public static currentCarId: number;

  constructor(private rootElement: HTMLElement) {
    super('div', ['garage__race-item']);
    this.rootElement.appendChild(this.element);

    this.btnWrapper = document.createElement('div');
    this.btnWrapper.setAttribute('class', 'garage__race-item_btn-wrapper');
    this.element.appendChild(this.btnWrapper);

    this.raceButtons = document.createElement('div');
    this.raceButtons.setAttribute('class', 'garage__race-item_buttons');
    this.btnWrapper.appendChild(this.raceButtons);

    this.selectButton = document.createElement('button');
    this.selectButton.setAttribute('class', 'btn garage__race-item_select');
    this.raceButtons.appendChild(this.selectButton);

    this.removeButton = document.createElement('button');
    this.removeButton.setAttribute('class', 'btn garage__race-item_remove');
    this.raceButtons.appendChild(this.removeButton);

    this.raceABButtons = document.createElement('div');
    this.raceABButtons.setAttribute('class', 'garage__race-item_ab');
    this.btnWrapper.appendChild(this.raceABButtons);

    this.aButton = document.createElement('button');
    this.aButton.setAttribute('class', 'btn garage__race-item_a');
    this.raceABButtons.appendChild(this.aButton);

    this.bButton = document.createElement('button');
    this.bButton.setAttribute('class', 'btn garage__race-item_b disabled');
    this.raceABButtons.appendChild(this.bButton);

    this.carName = document.createElement('div');
    this.carName.setAttribute('class', 'garage__race-item_car-name');
    this.element.appendChild(this.carName);

    this.flagImg = document.createElement('img');
    this.flagImg.setAttribute('src', './flag.svg');
    this.flagImg.setAttribute('alt', 'flag');
    this.flagImg.setAttribute('class', 'img-flag');
    this.element.appendChild(this.flagImg);
  }

  init(id: number): void {
    this.raceABButtons.addEventListener('click', (e) => {
      if (e.target === this.aButton) {
        startDriving(id);
      }
      if (e.target === this.bButton) {
        stopDriving(id);
      }
    });
  }

  render(id: number, name: string, color: string): HTMLElement {
    this.selectButton.innerText = 'Select';
    this.removeButton.innerText = 'Remove';
    this.aButton.innerText = 'A';
    this.bButton.innerText = 'B';
    this.carName.innerHTML = `${name}`;
    new Car(this.element).render(`${color}`, id);
    this.selectButton.setAttribute('id', `select-car-${id}`);
    this.removeButton.setAttribute('id', `remove-car-${id}`);
    this.aButton.setAttribute('id', `a-button-${id}`);
    this.bButton.setAttribute('id', `b-button-${id}`);
    this.flagImg.setAttribute('id', `img-flag-${id}`);
    this.raceButtons.addEventListener('click', async (e) => {
      if (e.target === this.removeButton) {
        const currentCar = await getCar(id);
        if (currentCar.id === id) {
          deleteCar(id);
          generateCarItems(variables.pageNum);
        } else {
          generateCarItems(variables.pageNum);
        }
      }
      if (e.target === this.selectButton) {
        const currentCar = await getCar(id);
        const nameInputUpdate = document.getElementById('car-name-update');
        const colorInputUpdate = document.getElementById('car-color-update');
        RaceFieldItem.currentCarId = currentCar.id;
        if (nameInputUpdate && colorInputUpdate) {
          if (currentCar.id === id) {
            nameInputUpdate.removeAttribute('disabled');
            colorInputUpdate.removeAttribute('disabled');
            nameInputUpdate.focus();
          }
        }
      }
    });
    this.init(id);
    return this.element;
  }
}
