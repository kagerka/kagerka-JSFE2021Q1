import { BaseComponent } from '../../components/base-components';
import { SettingsSelectDifficulty } from './select_difficulty';
import { SettingsSelectType } from './select_type';
import './settings.scss';

export class SettingsPage extends BaseComponent {
  private readonly settings: HTMLElement;

  private readonly settingsTitle: HTMLElement;

  private readonly settingsMenu: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['settings']);
    this.settings = document.createElement('div');
    this.settingsTitle = document.createElement('h1');
    this.settingsMenu = document.createElement('div');
    this.settingsMenu.setAttribute('class', 'settings__menu');
  }

  render(): void {
    this.rootElement.innerHTML = '';
    this.rootElement.appendChild(this.element);
    this.element.appendChild(this.settingsTitle).innerText = 'Game settings';
    this.element.appendChild(this.settingsMenu);
    new SettingsSelectType(this.settingsMenu).render();
    new SettingsSelectDifficulty(this.settingsMenu).render();
    const countType = document.getElementById('count-type') as HTMLSelectElement;
    let countTypeLastSelected = localStorage.getItem('countType');

    if (countTypeLastSelected) {
      countType.value = countTypeLastSelected;
    }

    countType.onchange = (): void => {
      countTypeLastSelected = countType.options[countType.selectedIndex].value;
      localStorage.setItem('countType', countTypeLastSelected);
    };

    const cardType = document.getElementById('card-type') as HTMLSelectElement;
    let cardTypeLastSelected = localStorage.getItem('cardType');

    if (cardTypeLastSelected) {
      cardType.value = cardTypeLastSelected;
    }

    cardType.onchange = (): void => {
      cardTypeLastSelected = cardType.options[cardType.selectedIndex].value;
      localStorage.setItem('cardType', cardTypeLastSelected);
    };
  }
}
