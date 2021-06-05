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
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    await card.flip(false);

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      this.activeCard.element
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[0]
        .classList.add('incorrect');
      card.element
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[0]
        .classList.add('incorrect');
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flip(true), card.flip(true)]);
      this.activeCard.element
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[0]
        .classList.remove('incorrect');
      card.element
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[0]
        .classList.remove('incorrect');
    } else {
      this.activeCard.element
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[0]
        .classList.add('correct');
      card.element
        .getElementsByTagName('div')[0]
        .getElementsByTagName('div')[0]
        .classList.add('correct');
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
