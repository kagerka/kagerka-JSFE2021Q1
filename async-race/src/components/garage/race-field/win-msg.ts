import { BaseComponent } from '../../base-components';

export class WinMsg extends BaseComponent {
  private readonly winnerMessage: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['car', 'win-message']);
    this.rootElement.appendChild(this.element);

    this.winnerMessage = document.createElement('div');
    this.winnerMessage.setAttribute('class', 'win-message_text');
    this.element.appendChild(this.winnerMessage);
  }

  render(name: string, time: number | undefined): HTMLElement {
    if (time) time = +(time / 1000).toFixed(2);
    this.winnerMessage.innerHTML = `${name} finished first (${time} sec)!`;
    return this.element;
  }

  clear(): void {
    this.element.innerHTML = '';
  }
}
