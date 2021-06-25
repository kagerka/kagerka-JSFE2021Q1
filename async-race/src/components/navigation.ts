import { BaseComponent } from './baseСomponent';
import { Winners } from './winners/winners';

export class Navigation extends BaseComponent {
  public garageBtn: HTMLElement;

  public winnersBtn: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['nav-buttons']);
    this.rootElement.appendChild(this.element);
    this.garageBtn = document.createElement('button');
    this.garageBtn.setAttribute('class', 'btn main-buttons__garage active');
    this.element.appendChild(this.garageBtn);
    this.winnersBtn = document.createElement('button');
    this.winnersBtn.setAttribute('class', 'btn main-buttons__winners');
    this.element.appendChild(this.winnersBtn);
    this.init();
  }

  init(): void {
    this.element.addEventListener('click', (e) => {
      const garage: HTMLElement | null = document.querySelector('.garage');
      const winners: HTMLElement | null = document.querySelector('.winners');
      if (garage && winners) {
        if (e.target === this.garageBtn) {
          this.garageBtn.classList.add('active');
          this.winnersBtn.classList.remove('active');
          garage.classList.remove('hidden');
          winners.classList.add('hidden');
        } else if (e.target === this.winnersBtn) {
          this.winnersBtn.classList.add('active');
          this.garageBtn.classList.remove('active');
          garage.classList.add('hidden');
          winners.classList.remove('hidden');
          Winners.updateWinners();
        }
      }
    });
  }

  render(): void {
    this.garageBtn.innerText = 'Garage';
    this.winnersBtn.innerText = 'Winners';
  }
}
