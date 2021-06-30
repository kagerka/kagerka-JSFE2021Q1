import { BaseComponent } from './baseComponent';
import { actionSetA } from './categories/action-set-a/actionSetA';
import { actionSetB } from './categories/action-set-b/actionSetB';
import { actionSetC } from './categories/action-set-c/actionSetC';
import { adjective } from './categories/adjective/adjective';
import { animalSetA } from './categories/animal-set-a/animalSetA';
import { animalSetB } from './categories/animal-set-b/animalSetB';
import { CardsItem } from './categories/cards-item';
import { categories } from './categories/categories';
import { CategoryItem } from './categories/category-item';
import { clothes } from './categories/clothes/clothes';
import { emotion } from './categories/emotion/emotion';

export class App extends BaseComponent {
  private readonly cards: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('main', ['app']);
    this.rootElement.appendChild(this.element);

    this.cards = document.createElement('div');
    this.cards.setAttribute('class', 'cards');
    this.element.appendChild(this.cards);
    this.init();
  }

  init(): void {
    document.addEventListener('click', (e) => {
      if ((e.target as HTMLElement)?.classList.contains('actionSetA')) {
        this.cards.innerHTML = '';
        actionSetA.forEach((item) => new CardsItem(this.cards).render(
          item.word, item.picture, item.audio, item.translate,
        ));
      }
      if ((e.target as HTMLElement)?.classList.contains('actionSetB')) {
        this.cards.innerHTML = '';
        actionSetB.forEach((item) => new CardsItem(this.cards).render(
          item.word, item.picture, item.audio, item.translate,
        ));
      }
      if ((e.target as HTMLElement)?.classList.contains('actionSetC')) {
        this.cards.innerHTML = '';
        actionSetC.forEach((item) => new CardsItem(this.cards).render(
          item.word, item.picture, item.audio, item.translate,
        ));
      }
      if ((e.target as HTMLElement)?.classList.contains('adjective')) {
        this.cards.innerHTML = '';
        adjective.forEach((item) => new CardsItem(this.cards).render(
          item.word, item.picture, item.audio, item.translate,
        ));
      }
      if ((e.target as HTMLElement)?.classList.contains('animalSetA')) {
        this.cards.innerHTML = '';
        animalSetA.forEach((item) => new CardsItem(this.cards).render(
          item.word, item.picture, item.audio, item.translate,
        ));
      }
      if ((e.target as HTMLElement)?.classList.contains('animalSetB')) {
        this.cards.innerHTML = '';
        animalSetB.forEach((item) => new CardsItem(this.cards).render(
          item.word, item.picture, item.audio, item.translate,
        ));
      }
      if ((e.target as HTMLElement)?.classList.contains('clothes')) {
        this.cards.innerHTML = '';
        clothes.forEach((item) => new CardsItem(this.cards).render(
          item.word, item.picture, item.audio, item.translate,
        ));
      }
      if ((e.target as HTMLElement)?.classList.contains('emotion')) {
        this.cards.innerHTML = '';
        emotion.forEach((item) => new CardsItem(this.cards).render(
          item.word, item.picture, item.audio, item.translate,
        ));
      }
      if ((e.target as HTMLElement)?.classList.contains('main-page')) {
        this.cards.innerHTML = '';
        categories.forEach((item) => new CategoryItem(this.cards).render(
          item.categoryName, item.categoryClass,
        ));
      }
    });
  }

  render(): void {
    categories.forEach((item) => new CategoryItem(this.cards).render(item.categoryName, item.categoryClass));
  }
}
