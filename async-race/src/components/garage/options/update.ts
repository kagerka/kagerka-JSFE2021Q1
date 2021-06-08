import { BaseComponent } from '../../base-components';

export class UpdateOption extends BaseComponent {
  private readonly nameInput: HTMLInputElement;

  private readonly colorInput: HTMLInputElement;

  private readonly createBtn: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['garage__options_wrapper', 'garage__update']);
    this.rootElement.appendChild(this.element);

    this.nameInput = document.createElement('input');
    this.nameInput.setAttribute('type', 'text');
    this.nameInput.setAttribute('name', 'car-name-undate');
    this.nameInput.setAttribute('id', 'car-name-update');
    this.nameInput.setAttribute('class', 'input__text');
    this.nameInput.setAttribute('placeholder', 'Enter new car name here for update');
    this.element.appendChild(this.nameInput);

    this.colorInput = document.createElement('input');
    this.colorInput.setAttribute('type', 'color');
    this.colorInput.setAttribute('name', 'car-color-update');
    this.colorInput.setAttribute('id', 'car-color-update');
    this.colorInput.setAttribute('class', 'input__color');
    this.element.appendChild(this.colorInput);

    this.createBtn = document.createElement('button');
    this.createBtn.setAttribute('class', 'btn garage__update-btn');
    this.createBtn.setAttribute('id', 'update-btn');
    this.element.appendChild(this.createBtn);
  }

  render(): HTMLElement {
    this.createBtn.innerText = 'Update';
    return this.element;
  }
}
