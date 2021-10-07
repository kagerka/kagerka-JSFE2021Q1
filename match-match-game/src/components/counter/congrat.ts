import './congrat.scss';
import { BaseComponent } from '../base-components';
import { ScorePage } from '../../pages/score';

export class Congrat extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['overlay']);
    this.rootElement.appendChild(this.element);
  }

  render(): HTMLElement {
    const mins = document.getElementById('min')?.innerText;
    const sec = document.getElementById('sec')?.innerText;
    this.element.innerHTML = `
      <div class="congrat">
        <p>Congratulations! You successfully found all matches on ${mins}.${sec} minutes.</p>
        <button class="btn congrat-btn">OK</button>
      </div>`;
    this.element.addEventListener('click', () => {
      const main = document.querySelector('main');
      if (main) main.innerHTML = '';
      new ScorePage(main as HTMLElement).render();
      const stopGameButton = document.querySelector('.game__stop-game_button');
      if (stopGameButton) {
        stopGameButton.innerHTML = 'START GAME';
        stopGameButton.classList.add('start-game');
      }
    });
    return this.element;
  }
}
