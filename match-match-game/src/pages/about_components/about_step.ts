import { BaseComponent } from '../../components/base-components';
import '../about.scss';

export class AboutStep extends BaseComponent {
  private readonly aboutStep: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['about__step']);
    this.rootElement.appendChild(this.element);
    this.aboutStep = document.createElement('div');
  }

  render(stepNumber: string, stepText: string, stepPic: string): HTMLElement {
    this.element.innerHTML = `
    <div class="about__text">
      <div class="about__number">${stepNumber}</div>
      <p>${stepText}</p>
    </div>
    <div class="about__img"><img src="./images/about/${stepPic}" alt=""></div>
  `;
    return this.aboutStep;
  }
}
