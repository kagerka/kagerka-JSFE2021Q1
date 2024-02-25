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

  countTime(): unknown {
    const minutes = document.querySelector('#min');
    const seconds = document.querySelector('#sec');
    let timerTime = 0;
    let interval: NodeJS.Timeout;

    function pad(num: string | number) {
      if (num < 10) {
        return `0${num}`;
      }
      return num;
    }

    function incrementTimer() {
      timerTime++;

      const numOfMinutes = Math.floor(timerTime / 60);
      const numOfSeconds = timerTime % 60;

      if (minutes) minutes.innerHTML = pad(numOfMinutes) as string;
      if (seconds) seconds.innerHTML = pad(numOfSeconds) as string;
    }

    function startTimer() {
      interval = setInterval(incrementTimer, 1000);
    }
    function stopTimer() {
      clearInterval(interval);
      new IndexedDB().render();
    }

    const cardField = document.querySelector('.cards-field');
    cardField?.addEventListener('transitionend', () => {
      const cardContainer = document.querySelectorAll('.card-container');
      const cardCorrect = document.querySelectorAll('.card__front.correct');
      if (
        cardContainer.length === cardCorrect.length
        && cardCorrect.length > 0
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
