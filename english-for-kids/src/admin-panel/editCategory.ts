import { BaseComponent } from '../baseComponent';
import { ZERO } from '../constants';
import { AdminCreateCategory } from './adminCreateCategory';
import { NewCategoryItem } from './newCategoryItem';

export class EditCategory extends BaseComponent {
  private readonly newCategoryName: HTMLInputElement;

  private readonly cancelBtn: HTMLElement;

  private readonly createBtn: HTMLElement;

  private readonly newCategoryBtnWrapper: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['admin-category-item', 'cat-edit']);

    this.newCategoryName = document.createElement('input');
    this.newCategoryName.setAttribute('class', 'new-cat-name');
    this.element.appendChild(this.newCategoryName);

    this.newCategoryBtnWrapper = document.createElement('div');
    this.newCategoryBtnWrapper.setAttribute('class', 'category-btn-wrapper');
    this.element.appendChild(this.newCategoryBtnWrapper);

    this.cancelBtn = document.createElement('a');
    this.cancelBtn.setAttribute('class', 'category-btn cancel-edit-btn');
    this.cancelBtn.innerText = 'Cancel';
    this.newCategoryBtnWrapper.appendChild(this.cancelBtn);

    this.createBtn = document.createElement('a');
    this.createBtn.setAttribute('class', 'category-btn create-edit-btn');
    this.createBtn.innerText = 'Create';
    this.newCategoryBtnWrapper.appendChild(this.createBtn);

    this.init();
  }

  init(): void {
    let input = '';

    this.cancelBtn.addEventListener('click', () => {
      this.element.remove();
    });

    this.createBtn.addEventListener('click', () => {
      input = this.newCategoryName.value;
      this.element.classList.remove('cat-edit');
      this.element.remove();
      new NewCategoryItem(this.rootElement).render(input, ZERO);
      new AdminCreateCategory(this.rootElement).render();
    });
  }

  render(): void {
    this.rootElement.appendChild(this.element);
  }
}
