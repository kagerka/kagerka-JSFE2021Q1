import { BaseComponent } from '../components/base-components';
import './about.scss';

export class AboutPage extends BaseComponent {
  private readonly about: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['about']);
    this.about = document.createElement('div');
  }

  render(): HTMLElement {
    this.rootElement.innerHTML = '';
    this.rootElement.appendChild(this.element);
    this.element.innerHTML = `
      <h1>How to play?</h1>
      <div class="about__steps">
        <div class="about__step about__first-step">
          <div class="about__text">
            <div class="about__number">1</div>
            <p>Register new player in game</p>
          </div>
          <div class="about__img"><img src="../images/about/first-step.png" alt=""></div>
        </div>
        <div class="about__step about__second-step">
          <div class="about__text">
            <div class="about__number">2</div>
            <p>Configure your game settings</p>
          </div>
          <div class="about__img"><img src="../images/about/second-step.png" alt=""></div>
        </div>
        <div class="about__step about__third-step">
          <div class="about__text">
            <div class="about__number">3</div>
            <p>Start you new game! Remember card positions and match it before times up.</p>
          </div>
          <div class="about__img"><img src="../images/about/third-step.png" alt=""></div>
        </div>
      </div>
    `;

    return this.about;
  }
}
