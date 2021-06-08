import { BaseComponent } from "./../base-components";
import { CreateOption } from "./options/create";
import { RaceBtnOption } from "./options/race-buttons";
import { UpdateOption } from "./options/update";

export class GarageOptions extends BaseComponent {
  private readonly form: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['garage__options']);
    this.rootElement.appendChild(this.element);
    this.form = document.createElement('form');
    this.form.setAttribute('id', 'options');
    this.element.appendChild(this.form);
  }

  render(): HTMLElement {
    new CreateOption(this.form).render();
    new UpdateOption(this.form).render();
    new RaceBtnOption(this.form).render();
    return this.element;
  }
}