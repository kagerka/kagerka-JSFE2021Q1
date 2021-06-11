import { createCar } from '../../../rest-api/garage/create-car';
import { BaseComponent } from '../../base-components';
import { ONE } from '../../constants';
import { Pagination } from '../../pagination';
import { generateCarItems } from '../race-field/generateCarItems';
import { generateRandomParam } from './generate-random-param';

export class CreateOption extends BaseComponent {
  private readonly nameInput: HTMLInputElement;

  private readonly colorInput: HTMLInputElement;

  private readonly createBtn: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['garage__options_wrapper', 'garage__create']);
    this.rootElement.appendChild(this.element);

    this.nameInput = document.createElement('input');
    this.nameInput.setAttribute('type', 'text');
    this.nameInput.setAttribute('name', 'car-name-create');
    this.nameInput.setAttribute('id', 'car-name-create');
    this.nameInput.setAttribute('class', 'input__text');
    this.nameInput.setAttribute('placeholder', 'Enter car name here');
    this.element.appendChild(this.nameInput);

    this.colorInput = document.createElement('input');
    this.colorInput.setAttribute('type', 'color');
    this.colorInput.setAttribute('name', 'car-color-create');
    this.colorInput.setAttribute('id', 'car-color-create');
    this.colorInput.setAttribute('class', 'input__color');
    this.colorInput.setAttribute('value', '#e3e3e3');
    this.element.appendChild(this.colorInput);

    this.createBtn = document.createElement('button');
    this.createBtn.setAttribute('class', 'btn garage__create-btn');
    this.createBtn.setAttribute('id', 'create-btn');
    this.createBtn.setAttribute('type', 'button');
    this.element.appendChild(this.createBtn);
    this.init();
  }

  init(): void {
    let name = '';
    let color = '';

    this.element.addEventListener('input', (e) => {
      if (e.target === this.nameInput) {
        name = this.nameInput.value;
      }
      if (e.target === this.colorInput) {
        color = this.colorInput.value.slice(ONE, this.colorInput.value.length);
      }
    });

    this.element.addEventListener('click', async (e) => {
      // const randomMakeNum = Math.floor(Math.random() * CAR_MAKE_LENGTH);
      // const carMake = Object.keys(carModels)[randomMakeNum];
      // const carModelLength = Object.values(carModels)[randomMakeNum].length;
      // const randomModelNum = Math.floor(Math.random() * carModelLength);
      // const carModel = Object.values(carModels)[randomMakeNum][randomModelNum];
      // const randomColor = Math.floor(Math.random() * HEX_COLORS).toString(HEX);
      const generatedParams = await generateRandomParam();
      if (e.target === this.createBtn) {
        if (!name && !color) {
          name = `${generatedParams.carMake} ${generatedParams.carModel}`;
          color = `${generatedParams.randomColor}`;
        } else if (!name && color) {
          name = `${generatedParams.carMake} ${generatedParams.carModel}`;
        } else if (name && !color) {
          color = `${generatedParams.randomColor}`;
        }
        createCar(`${name}`, `${color}`);
        this.nameInput.value = '';
        this.colorInput.value = '#e3e3e3';
        name = '';
        color = '';
        generateCarItems(Pagination.pageNum);
      }
    });
  }

  render(): HTMLElement {
    this.createBtn.innerText = 'Create';
    return this.element;
  }
}
