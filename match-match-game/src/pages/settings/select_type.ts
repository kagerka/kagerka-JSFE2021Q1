import { BaseComponent } from '../../components/base-components';
import './settings.scss';

export class SettingsSelectType extends BaseComponent {
  private readonly settings: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['settings__item']);
    this.settings = document.createElement('div');
  }

  render(): void {
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <h2>Game cards</h2>
      <select id="card-type">
        <option value="0">select game cards type</option>
        <option value="1">Animals</option>
        <option value="2">Flowers</option>
      </select>
    `;
  }
}
