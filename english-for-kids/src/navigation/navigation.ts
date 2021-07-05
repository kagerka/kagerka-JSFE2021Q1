import { BaseComponent } from '../baseComponent';
import { categories } from '../categories/categories';
import { play, store, train } from '../redux';
import { MenuItem } from './menuItem';

export class Navigation extends BaseComponent {
  private readonly nav: HTMLElement;

  private readonly burgerMenu: HTMLElement;

  private readonly gameMode: HTMLElement;

  private readonly toggle: HTMLElement;

  private readonly checkbox: HTMLInputElement;

  private readonly btn: HTMLElement;

  private readonly labels: HTMLElement;

  private readonly bg: HTMLElement;

  private readonly navMenu: HTMLElement;

  private readonly closeBtn: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('header', ['header']);
    this.rootElement.appendChild(this.element);

    this.nav = document.createElement('nav');
    this.burgerMenu = document.createElement('div');
    this.burgerMenu.setAttribute('class', 'burger-menu');
    this.element.appendChild(this.nav);
    this.nav.appendChild(this.burgerMenu);

    this.navMenu = document.createElement('ul');
    this.navMenu.setAttribute('class', 'nav');
    this.nav.appendChild(this.navMenu);

    this.closeBtn = document.createElement('div');
    this.closeBtn.setAttribute('class', 'close');
    this.navMenu.appendChild(this.closeBtn);

    this.gameMode = document.createElement('div');
    this.gameMode.setAttribute('class', 'game-mode');
    this.element.appendChild(this.gameMode);

    this.toggle = document.createElement('div');
    this.toggle.setAttribute('class', 'toggle');
    this.gameMode.appendChild(this.toggle);

    this.checkbox = document.createElement('input');
    this.checkbox.setAttribute('type', 'checkbox');
    this.checkbox.setAttribute('checked', 'checked');
    this.toggle.appendChild(this.checkbox);

    this.btn = document.createElement('span');
    this.btn.setAttribute('class', 'btn');
    this.toggle.appendChild(this.btn);

    this.labels = document.createElement('span');
    this.labels.setAttribute('class', 'labels');
    this.toggle.appendChild(this.labels);

    this.bg = document.createElement('span');
    this.bg.setAttribute('class', 'bg');
    this.toggle.appendChild(this.bg);
    this.init();
    this.checkboxListener();
  }

  init(): void {
    document.addEventListener('click', (e) => {
      if ((e.target as HTMLElement)?.classList.contains('burger-menu')) {
        this.navMenu.classList.add('active');
        this.burgerMenu.classList.add('hidden');
      }
    });

    this.closeBtn.addEventListener('click', () => {
      this.navMenu.classList.remove('active');
      this.burgerMenu.classList.remove('hidden');
    });

    document.addEventListener('change', () => {
      if (store.getState().gameMode.value === 'play') {
        this.navMenu.classList.add('play');
      } else {
        this.navMenu.classList.remove('play');
      }
    });

    this.navMenu.addEventListener('click', (e) => {
      if ((e.target as HTMLElement)?.classList.contains('nav-link') || (e.target as HTMLElement) !== this.navMenu) {
        this.navMenu.classList.remove('active');
        this.burgerMenu.classList.remove('hidden');
      }
    });

    document.body.addEventListener('click', (e) => {
      if ((e.target as HTMLElement) !== this.navMenu && (e.target as HTMLElement) !== this.burgerMenu) {
        this.navMenu.classList.remove('active');
        this.burgerMenu.classList.remove('hidden');
      }
    });
  }

  checkboxListener(): void {
    this.checkbox.addEventListener('click', () => {
      const cards = document.querySelectorAll('.cards__card');
      if (this.checkbox.checked) {
        cards.forEach((item) => item.classList.add('train'));
        cards.forEach((item) => item.classList.remove('play'));
        store.dispatch(train());
      } else {
        cards.forEach((item) => item.classList.add('play'));
        cards.forEach((item) => item.classList.remove('train'));
        store.dispatch(play());
      }
    });
  }

  render(): void {
    this.burgerMenu.innerHTML = `
      <span class="burger-menu"></span>
      <span class="burger-menu"></span>
      <span class="burger-menu"></span>
    `;
    this.closeBtn.innerHTML = `
      <img src="./icon/close.svg" alt="">
    `;
    new MenuItem(this.navMenu).init();
    categories.forEach((item) => {
      new MenuItem(this.navMenu).render(item.categoryName, item.categoryClass);
    });
  }
}
