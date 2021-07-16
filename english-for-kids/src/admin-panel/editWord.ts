import { BaseComponent } from '../baseComponent';

export class EditWord extends BaseComponent {
  private readonly word: HTMLInputElement;

  private readonly translation: HTMLInputElement;

  private readonly cancelBtn: HTMLElement;

  private readonly sound: HTMLInputElement;

  private readonly image: HTMLInputElement;

  private readonly soundWrap: HTMLDivElement;

  private readonly imageWrap: HTMLDivElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['admin-category-item', 'cat-edit', 'admin-word-item']);

    this.word = document.createElement('input');
    this.word.setAttribute('class', 'new-cat-name new-word');
    this.word.setAttribute('placeholder', 'Word');
    this.element.appendChild(this.word);

    this.translation = document.createElement('input');
    this.translation.setAttribute('class', 'new-cat-name new-translation');
    this.translation.setAttribute('placeholder', 'Translation');
    this.element.appendChild(this.translation);

    this.soundWrap = document.createElement('div');
    this.soundWrap.innerHTML = 'Sound: ';
    this.element.appendChild(this.soundWrap);

    this.sound = document.createElement('input');
    this.sound.setAttribute('type', 'file');
    this.sound.setAttribute('placeholder', 'file');
    this.soundWrap.appendChild(this.sound);

    this.imageWrap = document.createElement('div');
    this.imageWrap.innerHTML = 'Image: ';
    this.element.appendChild(this.imageWrap);

    this.image = document.createElement('input');
    this.image.setAttribute('type', 'file');
    this.imageWrap.appendChild(this.image);

    this.cancelBtn = document.createElement('a');
    this.cancelBtn.setAttribute('class', 'category-btn cancel-edit-btn');
    this.cancelBtn.innerText = 'Cancel';
    this.element.appendChild(this.cancelBtn);

    this.init();
  }

  init(): void {
    this.cancelBtn.addEventListener('click', () => {
      this.element.remove();
    });
  }

  render(): void {
    this.rootElement.appendChild(this.element);
  }
}
