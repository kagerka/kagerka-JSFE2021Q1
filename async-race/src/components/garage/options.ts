import { BaseComponent } from '../baseСomponent';
import { CreateOption } from './options/create';
import { RaceBtnOption } from './options/race-buttons';
import { UpdateOption } from './options/update';

export class GarageOptions extends BaseComponent {
  private readonly createForm: HTMLElement;

  private readonly updateForm: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['garage__options']);
    this.rootElement.appendChild(this.element);

    this.createForm = document.createElement('form');
    this.createForm.setAttribute('id', 'create-options');
    this.element.appendChild(this.createForm);

    this.updateForm = document.createElement('form');
    this.updateForm.setAttribute('id', 'update-options');
    this.element.appendChild(this.updateForm);
  }

  render(): HTMLElement {
    new CreateOption(this.createForm).render();
    new UpdateOption(this.updateForm).render();
    new RaceBtnOption(this.element).render();
    return this.element;
  }
}
