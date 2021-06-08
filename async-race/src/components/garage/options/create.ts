import { BaseComponent } from '../../base-components';

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
    this.element.appendChild(this.colorInput);

    this.createBtn = document.createElement('button');
    this.createBtn.setAttribute('class', 'btn garage__create-btn');
    this.createBtn.setAttribute('id', 'create-btn');
    this.element.appendChild(this.createBtn);
  }

  render(): HTMLElement {
    this.createBtn.innerText = 'Create';
    return this.element;
  }
}
