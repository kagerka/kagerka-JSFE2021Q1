import { BaseComponent } from '../components/base-components';
import './settings.scss';

export class SettingsPage extends BaseComponent {
  private readonly settings: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['settings']);
    this.settings = document.createElement('div');
  }

  render(): void {
    this.rootElement.innerHTML = '';
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <h1>Game settings</h1>
      <div class="settings__menu">
        <div class="settings__item">
          <h2>Game cards</h2>
          <select id="card-type" onchange="SaveSelectValue(this)">
            <option value="0">select game cards type</option>
            <option value="1">Animals</option>
            <option value="2">Flowers</option>
          </select>
        </div>
        <div class="settings__item">
          <h2>Difficulty</h2>
          <select id="count-type" onchange="SaveSelectValue(this)">
            <option value="0">select game type</option>
            <option value="1">3 x 4</option>
            <option value="2">4 x 4</option>
            <option value="3">4 x 5</option>
            <option value="4">4 x 6</option>
          </select>
        </div>
      </div>
    `;
    const countType = document.querySelector('#count-type') as HTMLSelectElement;
    let countTypeLastSelected = localStorage.getItem('countType');

    if (countTypeLastSelected) {
      countType.value = countTypeLastSelected;
    }

    countType.onchange = () => {
      countTypeLastSelected = countType.options[countType.selectedIndex].value;
      localStorage.setItem('countType', countTypeLastSelected);
    };

    const cardType = document.querySelector('#card-type') as HTMLSelectElement;
    let cardTypeLastSelected = localStorage.getItem('cardType');

    if (cardTypeLastSelected) {
      cardType.value = cardTypeLastSelected;
    }

    cardType.onchange = () => {
      cardTypeLastSelected = cardType.options[cardType.selectedIndex].value;
      localStorage.setItem('cardType', cardTypeLastSelected);
    };
  }
}
