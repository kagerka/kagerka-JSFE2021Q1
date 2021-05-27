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

  countTime() {
    const minutes = document.querySelector('#min');
    const seconds = document.querySelector('#sec');
    let timerTime = 0;
    let isRunning = false;
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
      if (isRunning) return;
      isRunning = true;
      interval = setInterval(incrementTimer, 1000);
    }
    function stopTimer() {
      const cardFlip = document.querySelectorAll('.flipped');
      if (cardFlip.length === 0) {
        if (!isRunning) return;
        isRunning = false;
        clearInterval(interval);
        const main = document.querySelector('main');
        setTimeout(() => {
          new Congrat(main as HTMLElement).render();
          new IndexedDB().render();
        }, 1500);
      }
    }
    document.addEventListener('click', stopTimer);

    startTimer();
    return this.element;
  }
}
