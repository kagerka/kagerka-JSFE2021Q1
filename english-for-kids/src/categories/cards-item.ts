import { BaseComponent } from '../baseComponent';
import { store } from '../redux';

export class CardsItem extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['cards__card', 'words']);
    this.rootElement.appendChild(this.element);
    this.init();
  }

  init(): void {
    this.element.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('rotate-btn')) {
        this.element.classList.add('flipped');
      }
    });

    this.element.addEventListener('mouseleave', () => {
      this.element.classList.remove('flipped');
    });
  }

  render(word: string, picture: string, audio: string, translate: string): void {
    const cardTrain = (): void => {
      this.element.innerHTML = `
        <div class="face front">
          <div class="cards__card_picture" data-word="${word}"
          style="background: url('${picture}') center / cover no-repeat"
          onclick="new Audio('${audio}').play()"></div>
          <div class="word"><span onclick="new Audio('${audio}').play()">${word}</span>
          <img class="rotate-btn" src="./icon/rotate.svg"></div>
        </div>
        <div class="face back">
          <div class="cards__card_picture" data-word="${word}"
          style="background: url('${picture}') center / cover no-repeat"></div>
          <div class="word"><span>${translate}</span></div>
        </div>
      `;
    };

    const cardPlay = (): void => {
      this.element.innerHTML = `
        <div class="face front play data-word="${word}"">
          <div class="cards__card_picture play" data-word="${word}"
          style="background: url('${picture}') center / cover no-repeat"></div>
        </div>
      `;
    };

    if (store.getState().gameMode.value === 'train') {
      cardTrain();
      this.element.classList.add(word);
    } else if (store.getState().gameMode.value === 'play') {
      cardPlay();
    }

    document.addEventListener('change', () => {
      if (store.getState().gameMode.value === 'train') {
        cardTrain();
        this.element.classList.add(word);
      } else if (store.getState().gameMode.value === 'play') {
        cardPlay();
      }
    });
  }
}
