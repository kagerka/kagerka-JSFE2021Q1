/* eslint-disable max-len */
import { BaseComponent } from '../components/base-components';
import './about.scss';
import { AboutStep } from './about_components/about_step';

export class AboutPage extends BaseComponent {
  private readonly about: HTMLElement;

  private readonly aboutTitle: HTMLElement;

  private readonly aboutSteps: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['about']);
    this.about = document.createElement('div');
    this.aboutTitle = document.createElement('h1');
    this.aboutSteps = document.createElement('div');
    this.aboutSteps.setAttribute('class', 'about__steps');
  }

  render(): HTMLElement {
    this.rootElement.innerHTML = '';
    this.rootElement.appendChild(this.element);
    this.element.appendChild(this.aboutTitle).innerText = 'How to play?';
    this.element.appendChild(this.aboutSteps);
    const aboutContent = [
      { number: '1', text: 'Register new player in game', image: 'first-step.png' },
      { number: '2', text: 'Configure your game settings', image: 'second-step.png' },
      { number: '3', text: 'Start you new game! Remember card positions and match it before times up.', image: 'third-step.png' },
    ];
    aboutContent.forEach((item) => new AboutStep(this.aboutSteps).render(item.number, item.text, item.image));
    return this.about;
  }
}
