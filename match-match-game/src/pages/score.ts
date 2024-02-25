import { BaseComponent } from '../components/base-components';
import { ScoreItem } from './score_components/score_item';
import './score.scss';

export class ScorePage extends BaseComponent {
  private readonly score: HTMLElement;

  private readonly scoreTitle: HTMLElement;

  private readonly scoreItems: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['score']);
    this.score = document.createElement('div');
    this.scoreTitle = document.createElement('h1');
    this.scoreItems = document.createElement('div');
    this.scoreItems.setAttribute('class', 'score__players');
  }

  render(): HTMLElement {
    this.rootElement.innerHTML = '';
    this.rootElement.appendChild(this.element);
    this.element.appendChild(this.scoreTitle).innerText = 'Best players';
    this.element.appendChild(this.scoreItems);
    new ScoreItem(this.scoreItems).render();
    return this.score;
  }
}
