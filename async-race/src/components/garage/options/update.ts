import { getCar } from '../../../rest-api/garage/get-car';
import { updateCar } from '../../../rest-api/garage/update-car';
import { BaseComponent } from '../../base-components';
import { ONE } from '../../constants';
import { Race } from '../race-field';
import { RaceFieldItem } from '../race-field/race-field-item';

export class UpdateOption extends BaseComponent {
  public static nameInput: HTMLInputElement;

  public static colorInput: HTMLInputElement;

  private readonly createBtn: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['garage__options_wrapper', 'garage__update']);
    this.rootElement.appendChild(this.element);

    UpdateOption.nameInput = document.createElement('input');
    UpdateOption.nameInput.setAttribute('type', 'text');
    UpdateOption.nameInput.setAttribute('name', 'car-name-undate');
    UpdateOption.nameInput.setAttribute('id', 'car-name-update');
    UpdateOption.nameInput.setAttribute('class', 'input__text');
    UpdateOption.nameInput.setAttribute('placeholder', 'Enter new car name here for update');
    UpdateOption.nameInput.setAttribute('disabled', 'disabled');
    this.element.appendChild(UpdateOption.nameInput);

    UpdateOption.colorInput = document.createElement('input');
    UpdateOption.colorInput.setAttribute('type', 'color');
    UpdateOption.colorInput.setAttribute('name', 'car-color-update');
    UpdateOption.colorInput.setAttribute('id', 'car-color-update');
    UpdateOption.colorInput.setAttribute('class', 'input__color');
    UpdateOption.colorInput.setAttribute('disabled', 'disabled');
    UpdateOption.colorInput.setAttribute('value', '#e3e3e3');
    this.element.appendChild(UpdateOption.colorInput);

    this.createBtn = document.createElement('button');
    this.createBtn.setAttribute('class', 'btn garage__update-btn disabled');
    this.createBtn.setAttribute('id', 'update-btn');
    this.createBtn.setAttribute('type', 'button');
    this.element.appendChild(this.createBtn);
    this.init();
  }

  init(): void {
    this.element.addEventListener('input', (e) => {
      if (e.target === UpdateOption.nameInput || e.target === UpdateOption.colorInput) {
        if (UpdateOption.nameInput.value || UpdateOption.colorInput.value) {
          this.createBtn.classList.remove('disabled');
        }
      }
    });

    this.createBtn.addEventListener('click', async () => {
      const currentCar = await getCar(RaceFieldItem.currentCarId);
      const currentName = currentCar.name;
      const currentColor = currentCar.color;
      const inputColorValue = UpdateOption.colorInput.value.slice(ONE, UpdateOption.colorInput.value.length);
      if (UpdateOption.nameInput.value === '') {
        await updateCar(RaceFieldItem.currentCarId, currentName, inputColorValue);
      } else if (UpdateOption.colorInput.value === '#000000') {
        await updateCar(RaceFieldItem.currentCarId, UpdateOption.nameInput.value, currentColor);
      } else {
        await updateCar(RaceFieldItem.currentCarId, UpdateOption.nameInput.value, inputColorValue);
      }
      Race.generateCarItems();
      UpdateOption.nameInput.value = '';
      UpdateOption.colorInput.value = '#e3e3e3';
      this.createBtn.classList.add('disabled');
      UpdateOption.nameInput.setAttribute('disabled', 'disabled');
      UpdateOption.colorInput.setAttribute('disabled', 'disabled');
    });
  }

  render(): HTMLElement {
    this.createBtn.innerText = 'Update';
    return this.element;
  }
}
