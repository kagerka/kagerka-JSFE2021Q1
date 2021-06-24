import { createCar } from '../../../rest-api/garage/create-car';
import { BaseComponent } from '../../baseСomponent';
import { ONE_HUNDRED } from '../../constants';
import { variables } from '../../data';
import { generateCarItems } from '../race-field/generateCarItems';
import { raceAll, resetAll } from '../race-field/race-functions';
import { generateRandomParam } from './generate-random-param';

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
    this.element.appendChild(this.raceBtn);

    this.resetBtn = document.createElement('button');
    this.resetBtn.setAttribute('class', 'btn garage__reset-btn');
    this.resetBtn.setAttribute('id', 'reset-btn');
    this.element.appendChild(this.resetBtn);

    this.generateBtn = document.createElement('button');
    this.generateBtn.setAttribute('class', 'btn garage__generate-btn');
    this.generateBtn.setAttribute('id', 'generate-btn');
    this.element.appendChild(this.generateBtn);
    this.init();
  }

  render(): HTMLElement {
    this.raceBtn.innerText = 'Race';
    this.resetBtn.innerText = 'Reset';
    this.generateBtn.innerText = 'Generate cars';
    return this.element;
  }

  init(): void {
    let name = '';
    let color = '';

    this.element.addEventListener('click', async (e) => {
      if (e.target === this.generateBtn) {
        for (let i = 0; i < ONE_HUNDRED; i++) {
          const generatedParams = generateRandomParam();
          if (e.target === this.generateBtn) {
            name = `${generatedParams.carMake} ${generatedParams.carModel}`;
            color = `${generatedParams.randomColor}`;
            createCar(`${name}`, `${color}`);
            generateCarItems(variables.pageNum);
          }
        }
      }
      if (e.target === this.raceBtn) {
        await raceAll();
      }
      if (e.target === this.resetBtn) {
        await resetAll();
      }
    });
  }
}
