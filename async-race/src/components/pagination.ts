import { getCars } from '../rest-api/garage/get-car';
import { BaseComponent } from './baseСomponent';
import { CARS_ON_PAGE, FIRST_PAGE } from './constants';
import { variables } from './data';
import { generateCarItems } from './garage/race-field/generateCarItems';

export class Pagination extends BaseComponent {
  public prevBtn: HTMLElement;

  public nextBtn: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['pagination-buttons']);
    this.rootElement.appendChild(this.element);
    this.prevBtn = document.createElement('button');
    this.prevBtn.setAttribute('class', 'btn pagination-buttons__prev');
    this.element.appendChild(this.prevBtn);
    this.nextBtn = document.createElement('button');
    this.nextBtn.setAttribute('class', 'btn pagination-buttons__next');
    this.element.appendChild(this.nextBtn);
    this.init();
  }

  render(): HTMLElement {
    this.prevBtn.innerText = 'Prev';
    this.nextBtn.innerText = 'Next';
    return this.element;
  }

  init(): void {
    this.element.addEventListener('click', async (e) => {
      const items = await getCars(variables.pageNum, CARS_ON_PAGE);
      const totalCount = Number(items.count);
      if (e.target === this.prevBtn && variables.pageNum > FIRST_PAGE) {
        variables.pageNum--;
        generateCarItems(variables.pageNum);
      }
      if (totalCount && totalCount) {
        if (e.target === this.nextBtn
          && variables.pageNum <= Math.floor(totalCount / CARS_ON_PAGE)
          && totalCount > variables.pageNum * CARS_ON_PAGE) {
          variables.pageNum++;
          generateCarItems(variables.pageNum);
        }
      }
    });
  }
}
