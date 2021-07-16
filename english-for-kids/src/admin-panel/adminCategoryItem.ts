import { BaseComponent } from '../baseComponent';
import { actionSetA } from '../categories/action-set-a/actionSetA';
import { actionSetB } from '../categories/action-set-b/actionSetB';
import { actionSetC } from '../categories/action-set-c/actionSetC';
import { adjective } from '../categories/adjective/adjective';
import { animalSetA } from '../categories/animal-set-a/animalSetA';
import { animalSetB } from '../categories/animal-set-b/animalSetB';
import { fruits } from '../categories/fruits/fruits';
import { vegetables } from '../categories/vegetables/vegetables';
import { CategoryCard } from '../types';
import { AdminWords } from './adminWords';
import { NewWordCreate } from './newWordCreate';

export class AdminCategoryItem extends BaseComponent {
  private readonly categoryHeading: HTMLElement;

  private readonly categoryWordCount: HTMLElement;

  private readonly categoryBtnWrapper: HTMLElement;

  private readonly categoryBtnUpdate: HTMLElement;

  private readonly categoryBtnAddWord: HTMLElement;

  private readonly removeCategoryBtn: HTMLImageElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['admin-category-item']);
    this.rootElement.appendChild(this.element);

    this.removeCategoryBtn = document.createElement('img');
    this.removeCategoryBtn.setAttribute('src', './icon/remove.svg');
    this.removeCategoryBtn.setAttribute('class', 'category-btn-remove');
    this.element.appendChild(this.removeCategoryBtn);

    this.categoryHeading = document.createElement('h2');
    this.categoryHeading.setAttribute('class', 'category-heading');
    this.element.appendChild(this.categoryHeading);

    this.categoryWordCount = document.createElement('p');
    this.categoryWordCount.setAttribute('class', 'category-word-count');
    this.element.appendChild(this.categoryWordCount);

    this.categoryBtnWrapper = document.createElement('div');
    this.categoryBtnWrapper.setAttribute('class', 'category-btn-wrapper');
    this.element.appendChild(this.categoryBtnWrapper);

    this.categoryBtnUpdate = document.createElement('div');
    this.categoryBtnUpdate.setAttribute('class', 'category-btn category-btn-update');
    this.categoryBtnUpdate.innerHTML = 'Update';
    this.categoryBtnWrapper.appendChild(this.categoryBtnUpdate);

    this.categoryBtnAddWord = document.createElement('div');
    this.categoryBtnAddWord.setAttribute('class', 'category-btn category-btn-add-word');
    this.categoryBtnAddWord.innerHTML = 'Add word';
    this.categoryBtnWrapper.appendChild(this.categoryBtnAddWord);

    this.init();
  }

  categoryCard = (categoryName: CategoryCard[]): void => {
    categoryName.forEach((item: CategoryCard) => new AdminWords(this.rootElement).render(
      item.word, item.picture, item.audio, item.translate,
    ));
  };

  init(): void {
    this.categoryBtnUpdate.addEventListener('click', () => {
      if (this.categoryBtnUpdate.classList.contains('active')) {
        this.categoryBtnUpdate.classList.remove('active');
      } else {
        this.categoryHeading.setAttribute('contenteditable', 'true');
        this.categoryHeading.focus();
        this.categoryBtnUpdate.classList.add('active');
      }
    });

    this.element.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('category-btn-remove')) {
        this.element.remove();
      }
    });

    this.categoryBtnAddWord.addEventListener('click', () => {
      this.rootElement.innerHTML = '';

      const categoryNameCard = this.categoryBtnAddWord.dataset?.category;

      if (categoryNameCard === 'actionSetA') {
        this.categoryCard(actionSetA);
      } else if (categoryNameCard === 'actionSetB') {
        this.categoryCard(actionSetB);
      } else if (categoryNameCard === 'actionSetC') {
        this.categoryCard(actionSetC);
      } else if (categoryNameCard === 'adjective') {
        this.categoryCard(adjective);
      } else if (categoryNameCard === 'animalSetA') {
        this.categoryCard(animalSetA);
      } else if (categoryNameCard === 'animalSetB') {
        this.categoryCard(animalSetB);
      } else if (categoryNameCard === 'fruits') {
        this.categoryCard(fruits);
      } else if (categoryNameCard === 'vegetables') {
        this.categoryCard(vegetables);
      }
      new NewWordCreate(this.rootElement).render();
    });
  }

  render(categoryName: string, wordCount: number, categoryClass: string): void {
    this.categoryHeading.innerHTML = `${categoryName}`;
    this.categoryWordCount.innerHTML = `WORDS: <b>${wordCount}</b>`;
    this.categoryBtnAddWord.setAttribute('data-category', categoryClass);
    this.element.classList.add(categoryClass);
  }
}
