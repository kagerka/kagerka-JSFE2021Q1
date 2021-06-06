import { delay } from '../../shared/delay';
import { BaseComponent } from '../base-components';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';

const FLIP_DELAY = 1000;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  constructor() {
    super();
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[]): void {
    this.cardsField.clear();
    const RANDOM_COEFFICIENT = 0.5;
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - RANDOM_COEFFICIENT);
    cards.forEach((card) => {
      card.element.addEventListener('click', () => {
        this.cardHandler(card);
      });
    });
    this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card): Promise<void> {
    if (this.isAnimation) { return; }
    if (!card.isFlipped) { return; }
    this.isAnimation = true;
    await card.flip(false);

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    const cardArray = [this.activeCard, card];
    const CARD_ARRAY_NUM_0 = 0;
    const CARD_ARRAY_NUM_1 = 1;

    function cardClass(arrNum: number, action: string, className: string): void {
      if (action === 'add') {
        cardArray[arrNum].element.querySelector('.card__front')?.classList.add(`${className}`);
      } else {
        cardArray[arrNum].element.querySelector('.card__front')?.classList.remove(`${className}`);
      }
    }

    if (this.activeCard.image !== card.image) {
      cardClass(CARD_ARRAY_NUM_0, 'add', 'incorrect');
      cardClass(CARD_ARRAY_NUM_1, 'add', 'incorrect');
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flip(true), card.flip(true)]);
      cardClass(CARD_ARRAY_NUM_0, 'remove', 'incorrect');
      cardClass(CARD_ARRAY_NUM_1, 'remove', 'incorrect');
    } else {
      cardClass(CARD_ARRAY_NUM_0, 'add', 'correct');
      cardClass(CARD_ARRAY_NUM_1, 'add', 'correct');
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
