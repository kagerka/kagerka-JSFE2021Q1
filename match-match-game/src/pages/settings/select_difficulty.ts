import { BaseComponent } from '../../components/base-components';
import './settings.scss';

export class SettingsSelectDifficulty extends BaseComponent {
  private readonly settings: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['settings__item']);
    this.settings = document.createElement('div');
  }

  render(): void {
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <h2>Difficulty</h2>
      <select id="count-type">
        <option value="0">select game type</option>
        <option value="1">3 x 4</option>
        <option value="2">4 x 4</option>
        <option value="3">4 x 5</option>
        <option value="4">4 x 6</option>
      </select>
    `;
  }
}
