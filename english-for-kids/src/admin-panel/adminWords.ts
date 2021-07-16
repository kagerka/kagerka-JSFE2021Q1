import { BaseComponent } from '../baseComponent';
import { EIGHT } from '../constants';

export class AdminWords extends BaseComponent {
  private readonly cardWord: HTMLElement;

  private readonly cardTranslation: HTMLElement;

  private readonly cardAudio: HTMLElement;

  private readonly cardImage: HTMLElement;

  private readonly cardChangeBtn: HTMLElement;

  private readonly removeCategoryBtn: HTMLImageElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['admin-word-item']);
    this.rootElement.appendChild(this.element);

    this.removeCategoryBtn = document.createElement('img');
    this.removeCategoryBtn.setAttribute('src', './icon/remove.svg');
    this.removeCategoryBtn.setAttribute('class', 'category-btn-remove');
    this.element.appendChild(this.removeCategoryBtn);

    this.cardWord = document.createElement('div');
    this.cardWord.setAttribute('class', 'edit-card-word');
    this.element.appendChild(this.cardWord);

    this.cardTranslation = document.createElement('div');
    this.cardTranslation.setAttribute('class', 'edit-card-translation');
    this.element.appendChild(this.cardTranslation);

    this.cardAudio = document.createElement('div');
    this.cardAudio.setAttribute('class', 'edit-card-audio');
    this.element.appendChild(this.cardAudio);

    this.cardImage = document.createElement('div');
    this.cardImage.setAttribute('class', 'edit-card-image');
    this.element.appendChild(this.cardImage);

    this.cardChangeBtn = document.createElement('div');
    this.cardChangeBtn.setAttribute('class', 'category-btn card-btn-change');
    this.cardChangeBtn.innerHTML = 'Change';
    this.element.appendChild(this.cardChangeBtn);

    this.init();
  }

  init(): void {
    this.removeCategoryBtn.addEventListener('click', () => {
      this.element.remove();
    });
  }

  render(word: string, picture: string, audio: string, translate: string): void {
    const url = audio.substring(EIGHT, audio.length);
    this.cardWord.innerHTML = `<b>Word:</b> ${word}`;
    this.cardTranslation.innerHTML = `<b>Translation:</b> ${translate}`;
    this.cardAudio.innerHTML = `<b>Sound file:</b> ${url}`;
    this.cardImage.innerHTML = `<b>Image:</b><br><img src="${picture}" class="edit-card-img">`;
  }
}
