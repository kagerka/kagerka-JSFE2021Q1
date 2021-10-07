import { BaseComponent } from '../baseComponent';
import { EditCategory } from './editCategory';

export class AdminCreateCategory extends BaseComponent {
  private readonly categoryHeading: HTMLElement;

  private readonly categoryAddIcon: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['admin-category-item', 'admin-category-create']);
    this.rootElement.appendChild(this.element);

    this.categoryHeading = document.createElement('h2');
    this.categoryHeading.setAttribute('class', 'category-heading');
    this.element.appendChild(this.categoryHeading);

    this.categoryAddIcon = document.createElement('img');
    this.categoryAddIcon.setAttribute('class', 'category-add-icon');
    this.categoryAddIcon.setAttribute('src', './icon/add-category.png');
    this.element.appendChild(this.categoryAddIcon);

    this.init();
  }

  init(): void {
    this.categoryAddIcon.addEventListener('click', () => {
      this.element.remove();
      new EditCategory(this.rootElement).render();
      this.rootElement.appendChild(this.element);
    });

    this.element.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('category-btn-remove')) {
        this.element.remove();
      }
    });
  }

  render(): void {
    this.categoryHeading.innerHTML = 'Create new category';
  }
}
