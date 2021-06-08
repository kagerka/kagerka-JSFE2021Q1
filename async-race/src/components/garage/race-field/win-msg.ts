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

  render(): HTMLElement {
    this.winnerMessage.innerHTML = 'Lexus finished first (2.54 sec)!';
    return this.element;
  }
}
