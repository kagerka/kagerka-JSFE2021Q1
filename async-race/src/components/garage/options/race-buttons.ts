import { createCar } from '../../../rest-api/garage/create-car';
import { BaseComponent } from '../../baseСomponent';
import { ONE_HUNDRED } from '../../constants';
import { state } from '../../state';
import { generateCarItems } from '../race-field/generateCarItems';
import { raceAll, resetAll } from '../race-field/race-functions';
import { generateRandomCar } from './generate-random-param';

export class RaceBtnOption extends BaseComponent {
  private readonly raceBtn: HTMLElement;

  private readonly resetBtn: HTMLElement;

  private readonly generateBtn: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['garage__options_wrapper', 'garage__race-buttons']);
    this.rootElement.appendChild(this.element);

    this.raceBtn = document.createElement('button');
    this.raceBtn.setAttribute('class', 'btn garage__race-btn');
    this.raceBtn.setAttribute('id', 'race-btn');
    this.raceBtn.innerText = 'Race';

    this.resetBtn = document.createElement('button');
    this.resetBtn.setAttribute('class', 'btn garage__reset-btn');
    this.resetBtn.setAttribute('id', 'reset-btn');
    this.resetBtn.innerText = 'Reset';

    this.generateBtn = document.createElement('button');
    this.generateBtn.setAttribute('class', 'btn garage__generate-btn');
    this.generateBtn.setAttribute('id', 'generate-btn');
    this.generateBtn.innerText = 'Generate cars';
    this.init();
  }

  render(): void {
    this.element.appendChild(this.raceBtn);
    this.element.appendChild(this.resetBtn);
    this.element.appendChild(this.generateBtn);
  }

  init(): void {
    let name = '';
    let color = '';

    this.generateBtn.addEventListener('click', () => {
      for (let i = 0; i < ONE_HUNDRED; i++) {
        const generatedParams = generateRandomCar();
        name = `${generatedParams.carMake} ${generatedParams.carModel}`;
        color = `${generatedParams.randomColor}`;
        createCar(`${name}`, `${color}`);
        generateCarItems(state.pageNum);
      }
    });

    this.raceBtn.addEventListener('click', async () => {
      await raceAll();
    });

    this.resetBtn.addEventListener('click', async () => {
      await resetAll();
    });
  }
}
