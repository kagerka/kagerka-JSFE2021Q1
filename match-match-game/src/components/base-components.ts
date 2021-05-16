export class BaseComponent {
  readonly element: HTMLElement;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'main',
    styles: string[] = [],
  ) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
  }
}
