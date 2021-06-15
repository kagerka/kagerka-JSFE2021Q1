import { getCar } from '../../../rest-api/garage/get-car';
import { updateCar } from '../../../rest-api/garage/update-car';
import { BaseComponent } from '../../base-components';
import { ONE } from '../../constants';
import { variables } from '../../data';
import { generateCarItems } from '../race-field/generateCarItems';
import { RaceFieldItem } from '../race-field/race-field-item';

export class UpdateOption extends BaseComponent {
  private readonly nameInput: HTMLInputElement;

  private readonly colorInput: HTMLInputElement;

  private readonly updateBtn: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['garage__options_wrapper', 'garage__update']);
    this.rootElement.appendChild(this.element);

    this.nameInput = document.createElement('input');
    this.nameInput.setAttribute('type', 'text');
    this.nameInput.setAttribute('name', 'car-name-update');
    this.nameInput.setAttribute('id', 'car-name-update');
    this.nameInput.setAttribute('class', 'input__text');
    this.nameInput.setAttribute('placeholder', 'Enter new car name here for update');
    this.nameInput.setAttribute('disabled', 'disabled');
    this.element.appendChild(this.nameInput);

    this.colorInput = document.createElement('input');
    this.colorInput.setAttribute('type', 'color');
    this.colorInput.setAttribute('name', 'car-color-update');
    this.colorInput.setAttribute('id', 'car-color-update');
    this.colorInput.setAttribute('class', 'input__color');
    this.colorInput.setAttribute('disabled', 'disabled');
    this.colorInput.setAttribute('value', '#e3e3e3');
    this.element.appendChild(this.colorInput);

    this.updateBtn = document.createElement('button');
    this.updateBtn.setAttribute('class', 'btn garage__update-btn disabled');
    this.updateBtn.setAttribute('id', 'update-btn');
    this.updateBtn.setAttribute('type', 'button');
    this.element.appendChild(this.updateBtn);
    this.init();
  }

  init(): void {
    this.element.addEventListener('input', (e) => {
      if (e.target === this.nameInput || e.target === this.colorInput) {
        if (this.nameInput.value || this.colorInput.value) {
          this.updateBtn.classList.remove('disabled');
        }
      }
    });

    this.updateBtn.addEventListener('click', async () => {
      const currentCar = await getCar(RaceFieldItem.currentCarId);
      const currentName = currentCar.name;
      const currentColor = currentCar.color;
      const inputColorValue = this.colorInput.value.slice(ONE, this.colorInput.value.length);
      if (this.nameInput.value === '') {
        await updateCar(RaceFieldItem.currentCarId, currentName, inputColorValue);
      } else if (this.colorInput.value === '#e3e3e3') {
        await updateCar(RaceFieldItem.currentCarId, this.nameInput.value, currentColor);
      } else {
        await updateCar(RaceFieldItem.currentCarId, this.nameInput.value, inputColorValue);
      }
      generateCarItems(variables.pageNum);
      this.nameInput.value = '';
      this.colorInput.value = '#e3e3e3';
      this.updateBtn.classList.add('disabled');
      this.nameInput.setAttribute('disabled', 'disabled');
      this.colorInput.setAttribute('disabled', 'disabled');
    });
  }

  render(): HTMLElement {
    this.updateBtn.innerText = 'Update';
    return this.element;
  }
}
