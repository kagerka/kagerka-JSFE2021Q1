import { BaseComponent } from './baseComponent';
import { store } from './redux';

export class Footer extends BaseComponent {
  constructor(private readonly rootElement: HTMLElement) {
    super('footer', ['footer']);
    this.rootElement.appendChild(this.element);
    this.init();
  }

  init(): void {
    this.element.classList.add('train');
    document.addEventListener('change', () => {
      if (store.getState().gameMode.value === 'play') {
        this.element.classList.add('play');
        this.element.classList.remove('train');
      } else {
        this.element.classList.remove('play');
        this.element.classList.add('train');
      }
    });
  }

  render(): void {
    this.element.innerHTML = `
      <div class="footer-container">
        <a class="github" href="https://github.com/kagerka" target="_blank">kagerka</a>
        <a class="rss" href="https://rs.school/js/" target="_blank">
          <span class="rss-year">'21</span>
        </a>
      </div>
    `;
  }
}
