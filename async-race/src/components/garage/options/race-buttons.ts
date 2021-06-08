import { BaseComponent } from "./../../base-components";

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
  }

  render(): HTMLElement {
    this.raceBtn.innerText = 'Race';
    this.resetBtn.innerText = 'Reset';
    this.generateBtn.innerText = 'Generate cars';
    return this.element;
  }
}