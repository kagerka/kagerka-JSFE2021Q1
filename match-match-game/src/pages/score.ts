import { BaseComponent } from '../components/base-components';
import './score.scss';

export class ScorePage extends BaseComponent {
  private readonly score: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['score']);
    this.score = document.createElement('div');
  }

  render(): HTMLElement {
    this.rootElement.innerHTML = '';
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <h1>Best players</h1>
      <div class="score__players">
        <div class="score__player">
          <div class="score__player_info">
            <div class="score__player_pic"></div>
            <div class="score__player_contacts">
              <div class="score__player_name">Nicci Troiani</div>
              <div class="score__player_email">nicci@gmail.com</div>
            </div>
          </div>
          <div class="score__player_score">Score:  <span>456</span></div>
        </div>
      </div>
    `;
    return this.score;
  }
}
