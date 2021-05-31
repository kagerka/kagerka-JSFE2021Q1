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

    if (localStorage.getItem('cardType') === '1' && localStorage.getItem('countType') === '1') {
      [cat] = categories;
      setTimeout(() => {
        const cardContainer = document.querySelectorAll('.card-container');
        for (let i = 0; i < cardContainer.length; i++) {
          (cardContainer[i] as HTMLElement).style.width = '25%';
        }
      }, 0);
    } else if (localStorage.getItem('cardType') === '1' && localStorage.getItem('countType') === '2') {
      [, cat] = categories;
      setTimeout(() => {
        const cardContainer = document.querySelectorAll('.card-container');
        for (let i = 0; i < cardContainer.length; i++) {
          (cardContainer[i] as HTMLElement).style.width = '25%';
        }
      }, 0);
    } else if (localStorage.getItem('cardType') === '1' && localStorage.getItem('countType') === '3') {
      [, , cat] = categories;
      setTimeout(() => {
        const cardContainer = document.querySelectorAll('.card-container');
        for (let i = 0; i < cardContainer.length; i++) {
          (cardContainer[i] as HTMLElement).style.width = '20%';
        }
      }, 0);
    } else if (localStorage.getItem('cardType') === '1' && localStorage.getItem('countType') === '4') {
      [, , , cat] = categories;
      setTimeout(() => {
        const cardContainer = document.querySelectorAll('.card-container');
        for (let i = 0; i < cardContainer.length; i++) {
          (cardContainer[i] as HTMLElement).style.width = '16%';
        }
      }, 0);
    } else if (localStorage.getItem('cardType') === '2' && localStorage.getItem('countType') === '1') {
      [, , , , cat] = categories;
      setTimeout(() => {
        const cardContainer = document.querySelectorAll('.card-container');
        for (let i = 0; i < cardContainer.length; i++) {
          (cardContainer[i] as HTMLElement).style.width = '25%';
        }
      }, 0);
    } else if (localStorage.getItem('cardType') === '2' && localStorage.getItem('countType') === '2') {
      [, , , , , cat] = categories;
      setTimeout(() => {
        const cardContainer = document.querySelectorAll('.card-container');
        for (let i = 0; i < cardContainer.length; i++) {
          (cardContainer[i] as HTMLElement).style.width = '25%';
        }
      }, 0);
    } else if (localStorage.getItem('cardType') === '2' && localStorage.getItem('countType') === '3') {
      [, , , , , , cat] = categories;
      setTimeout(() => {
        const cardContainer = document.querySelectorAll('.card-container');
        for (let i = 0; i < cardContainer.length; i++) {
          (cardContainer[i] as HTMLElement).style.width = '20%';
        }
      }, 0);
    } else if (localStorage.getItem('cardType') === '2' && localStorage.getItem('countType') === '4') {
      [, , , , , , , cat] = categories;
      setTimeout(() => {
        const cardContainer = document.querySelectorAll('.card-container');
        for (let i = 0; i < cardContainer.length; i++) {
          (cardContainer[i] as HTMLElement).style.width = '16%';
        }
      }, 0);
    }
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.newGame(images);
  }
}
