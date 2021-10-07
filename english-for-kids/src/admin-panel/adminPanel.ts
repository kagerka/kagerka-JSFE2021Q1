import { App } from '../app';
import { BaseComponent } from '../baseComponent';
import { categories } from '../categories/categories';
import { EIGHT } from '../constants';
import { Footer } from '../footer';
import { Navigation } from '../navigation/navigation';
import { AdminCategoryItem } from './adminCategoryItem';
import { AdminCreateCategory } from './adminCreateCategory';

export class AdminPanel extends BaseComponent {
  private readonly adminNav: HTMLElement;

  private readonly adminBody: HTMLElement;

  private readonly adminNavCategories: HTMLElement;

  private readonly adminNavWords: HTMLElement;

  private readonly adminNavLogout: HTMLElement;

  private readonly adminNavLinkWrap: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['admin-panel']);
    this.rootElement.appendChild(this.element);

    this.adminNav = document.createElement('div');
    this.adminNav.setAttribute('class', 'admin-nav');
    this.element.appendChild(this.adminNav);

    this.adminNavLinkWrap = document.createElement('div');
    this.adminNavLinkWrap.setAttribute('class', 'admin-nav__link-wrapper');
    this.adminNav.appendChild(this.adminNavLinkWrap);

    this.adminNavCategories = document.createElement('a');
    this.adminNavCategories.setAttribute('class', 'admin-nav__link');
    this.adminNavCategories.setAttribute('href', '#');
    this.adminNavLinkWrap.appendChild(this.adminNavCategories);

    this.adminNavWords = document.createElement('a');
    this.adminNavWords.setAttribute('class', 'admin-nav__link');
    this.adminNavWords.setAttribute('href', '#');
    this.adminNavLinkWrap.appendChild(this.adminNavWords);

    this.adminNavLogout = document.createElement('a');
    this.adminNavLogout.setAttribute('class', 'admin-nav__link');
    this.adminNavLogout.setAttribute('href', '#');
    this.adminNav.appendChild(this.adminNavLogout);

    this.adminBody = document.createElement('div');
    this.adminBody.setAttribute('class', 'admin-body');
    this.element.appendChild(this.adminBody);
    this.init();
  }

  init(): void {
    this.adminNavCategories.classList.add('active');
    this.adminNavLogout.addEventListener('click', () => {
      document.body.innerHTML = '';
      new Navigation(document.body).render();
      new App(document.body).render();
      new Footer(document.body).render();
    });
    this.adminNavCategories.addEventListener('click', () => {
      this.adminBody.innerHTML = '';
      this.adminNavCategories.classList.add('active');
      categories.forEach((item) => {
        new AdminCategoryItem(this.adminBody).render(item.categoryName, EIGHT, item.categoryClass);
      });
      new AdminCreateCategory(this.adminBody).render();
    });
    document.addEventListener('click', (e) => {
      if ((e.target as HTMLElement)?.classList.contains('category-btn-add-word')) {
        this.adminNavCategories.classList.remove('active');
      }
    });
  }

  render(): void {
    this.adminNavCategories.innerHTML = 'Categories';
    this.adminNavWords.innerHTML = 'Words';
    this.adminNavLogout.innerHTML = 'Log out';
    // new AdminCategoryItem(this.adminBody).render();
    categories.forEach((item) => {
      new AdminCategoryItem(this.adminBody).render(item.categoryName, EIGHT, item.categoryClass);
    });
    new AdminCreateCategory(this.adminBody).render();
  }
}
