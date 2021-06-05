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
    new AboutStep(this.aboutSteps).render(
      '1',
      'Register new player in game',
      'first-step.png',
    );
    new AboutStep(this.aboutSteps).render(
      '2',
      'Configure your game settings',
      'second-step.png',
    );
    new AboutStep(this.aboutSteps).render(
      '3',
      'Start you new game! Remember card positions and match it before times up.',
      'third-step.png',
    );
    return this.about;
  }
}
