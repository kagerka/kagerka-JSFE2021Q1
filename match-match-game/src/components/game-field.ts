import { Game } from './game/game';
import { ImageCategoryModel } from '../models/image-category-model';
import { Counter } from './counter/counter';

export class GameField {
  private readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.rootElement.appendChild(this.game.element);
  }

  async start(): Promise<void> {
    new Counter(this.rootElement).render();
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    let [, cat] = categories;
    const ZERO_TIMEOUT = 0;
    const cardType = localStorage.getItem('cardType');
    const countType = localStorage.getItem('countType');

    function cardContainerWidth(width: number): void {
      const cardContainer = document.querySelectorAll('.card-container');
      cardContainer.forEach((item) => {
        (item as HTMLElement).style.width = `${width}%`;
      });
    }

    const CARD_WIDTH_25 = 25;
    const CARD_WIDTH_20 = 20;
    const CARD_WIDTH_16 = 16;

    if (cardType === '1') {
      switch (countType) {
        case '1':
          [cat] = categories;
          setTimeout(() => {
            cardContainerWidth(CARD_WIDTH_25);
          }, ZERO_TIMEOUT);
          break;
        case '2':
          [, cat] = categories;
          setTimeout(() => {
            cardContainerWidth(CARD_WIDTH_25);
          }, ZERO_TIMEOUT);
          break;
        case '3':
          [, , cat] = categories;
          setTimeout(() => {
            cardContainerWidth(CARD_WIDTH_20);
          }, ZERO_TIMEOUT);
          break;
        case '4':
          [, , , cat] = categories;
          setTimeout(() => {
            cardContainerWidth(CARD_WIDTH_16);
          }, ZERO_TIMEOUT);
          break;
        default:
          break;
      }
    } else if (cardType === '2') {
      switch (countType) {
        case '1':
          [, , , , cat] = categories;
          setTimeout(() => {
            cardContainerWidth(CARD_WIDTH_25);
          }, ZERO_TIMEOUT);
          break;
        case '2':
          [, , , , , cat] = categories;
          setTimeout(() => {
            cardContainerWidth(CARD_WIDTH_25);
          }, ZERO_TIMEOUT);
          break;
        case '3':
          [, , , , , , cat] = categories;
          setTimeout(() => {
            cardContainerWidth(CARD_WIDTH_20);
          }, ZERO_TIMEOUT);
          break;
        case '4':
          [, , , , , , , cat] = categories;
          setTimeout(() => {
            cardContainerWidth(CARD_WIDTH_16);
          }, ZERO_TIMEOUT);
          break;
        default:
          break;
      }
    }
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.newGame(images);
  }
}
