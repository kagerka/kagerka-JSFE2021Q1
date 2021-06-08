import { BaseComponent } from "./base-components";

export class Pagination extends BaseComponent {
  private readonly prevBtn: HTMLElement;
  private readonly nextBtn: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['pagination-buttons']);
    this.rootElement.appendChild(this.element);
    this.prevBtn = document.createElement('button');
    this.prevBtn.setAttribute('class', 'btn pagination-buttons__prev');
    this.element.appendChild(this.prevBtn);
    this.nextBtn = document.createElement('button');
    this.nextBtn.setAttribute('class', 'btn pagination-buttons__next');
    this.element.appendChild(this.nextBtn);
  }

  render(): HTMLElement {
    this.prevBtn.innerText = 'Prev';
    this.nextBtn.innerText = 'Next';
    return this.element;
  }
}