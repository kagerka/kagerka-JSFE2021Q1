import './cards-field.scss';
import { BaseComponent } from '../base-components';
import { Card } from '../card/card';
import { ClickCount } from '../game/click_count';

const SHOW_TIME = 1;
const SHOW_TIME_SEC = 30000;

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['cards-field']);
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flip(true));
      new ClickCount().clickCounter();
    }, SHOW_TIME * SHOW_TIME_SEC);
  }
}
