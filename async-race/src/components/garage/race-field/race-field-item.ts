import { BaseComponent } from '../../base-components';
import { Car } from './car';

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

  constructor(private readonly rootElement: HTMLElement) {
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
    this.bButton.setAttribute('class', 'btn garage__race-item_b');
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

  render(): HTMLElement {
    this.selectButton.innerText = 'Select';
    this.removeButton.innerText = 'Remove';
    this.aButton.innerText = 'A';
    this.bButton.innerText = 'B';
    this.carName.innerHTML = 'Tesla';
    new Car(this.element).render();
    return this.element;
  }
}
