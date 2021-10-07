import { BaseComponent } from '../../baseСomponent';

export class WinMsg extends BaseComponent {
  private readonly winnerMessage: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['car', 'win-message']);
    this.rootElement.appendChild(this.element);

    this.winnerMessage = document.createElement('div');
    this.winnerMessage.setAttribute('class', 'win-message_text');
    this.element.appendChild(this.winnerMessage);
  }

  render(name: string, time: number | undefined): void {
    if (time) {
      this.winnerMessage.innerHTML = `${name} finished first (${time} sec)!`;
    }
  }

  clear(): void {
    this.element.innerHTML = '';
  }
}
