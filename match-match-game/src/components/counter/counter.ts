import './counter.scss';
import { BaseComponent } from '../base-components';
import { Congrat } from './congrat';
import { IndexedDB } from '../indexeddb/indexeddb';

export class Counter extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['counter']);
    this.rootElement.appendChild(this.element);
  }

  render(): HTMLElement {
    this.element.innerHTML = `
      <div id="timer">
        <span id="min">00</span>:<span id="sec">00</span><span id="clickDiffField"></span>
      </div>`;
    return this.element;
  }

  countTime(): HTMLElement {
    const minutes = document.getElementById('min');
    const seconds = document.getElementById('sec');
    let timerTime = 0;
    let interval: NodeJS.Timeout;
    const UNITS_IN_DOZEN = 10;
    const SEC_IN_MIN = 60;
    const COUNT_TIMER_INTERVAL = 1000;
    function pad(num: number): string {
      return num < UNITS_IN_DOZEN ? `0${num}` : `${num}`;
    }

    function incrementTimer(): void {
      timerTime++;

      const numOfMinutes = Math.floor(timerTime / SEC_IN_MIN);
      const numOfSeconds = timerTime % SEC_IN_MIN;

      if (minutes) { minutes.innerHTML = pad(numOfMinutes); }
      if (seconds) { seconds.innerHTML = pad(numOfSeconds); }
    }

    function startTimer(): void {
      interval = setInterval(incrementTimer, COUNT_TIMER_INTERVAL);
    }
    function stopTimer(): void {
      clearInterval(interval);
      new IndexedDB().render();
    }
    const MIN_LENGTH = 0;
    const cardField = document.querySelector('.cards-field');
    cardField?.addEventListener('transitionend', () => {
      const cardContainer = document.querySelectorAll('.card-container');
      const cardCorrect = document.querySelectorAll('.card__front.correct');
      if (
        cardContainer.length === cardCorrect.length
        && cardCorrect.length > MIN_LENGTH
      ) {
        const main = document.querySelector('main');
        const congrat = document.querySelector('.congrat');
        if (!congrat) {
          new Congrat(main as HTMLElement).render();
          stopTimer();
        }
      }
    });
    const stopButton = document.querySelector('.stop-game');
    stopButton?.addEventListener('click', stopTimer);
    startTimer();
    return this.element;
  }
}
