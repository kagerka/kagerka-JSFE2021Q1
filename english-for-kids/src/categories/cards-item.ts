import { BaseComponent } from '../baseComponent';

export class CardsItem extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['cards__card', 'words']);
    this.rootElement.appendChild(this.element);
    this.init();
  }

  init(): void {
    this.element.addEventListener('click', (e) => {
      const cards = document.querySelectorAll('.words');
      cards.forEach((item) => item.classList.remove('flipped'));
      if ((e.target as HTMLElement).classList.contains('rotate-btn')) {
        cards.forEach((item) => item.classList.remove('flipped'));
        this.element.classList.add('flipped');
      } else {
        cards.forEach((item) => item.classList.remove('flipped'));
      }
    });
    document.addEventListener('click', (e) => {
      const cards = document.querySelectorAll('.words');
      if (!(e.target as HTMLElement).classList.contains('rotate-btn')) {
        cards.forEach((item) => item.classList.remove('flipped'));
      }
    });
  }

  render(word: string, picture: string, audio: string, translate: string): void {
    this.element.innerHTML = `
      <div class="face front">
        <div class="cards__card_picture" style="background: url('${picture}') center / cover no-repeat"
        onclick="new Audio('${audio}').play()"></div>
        <div class="word"><span>${word}</span><img class="rotate-btn" src="./icon/rotate.svg"></div>
      </div>
      <div class="face back">
        <div class="cards__card_picture" style="background: url('${picture}') center / cover no-repeat"
        onclick="new Audio('${audio}').play()"></div>
        <div class="word"><span>${translate}</span></div>
      </div>
    `;
    this.element.classList.add(word);
  }
}
