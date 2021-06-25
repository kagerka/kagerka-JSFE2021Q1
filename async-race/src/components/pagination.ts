import { getCars } from '../rest-api/garage/get-car';
import { BaseComponent } from './baseСomponent';
import { CARS_ON_PAGE, FIRST_PAGE } from './constants';
import { state } from './state';
import { generateCarItems } from './garage/race-field/generateCarItems';

export class Pagination extends BaseComponent {
  public prevBtn: HTMLElement;

  public nextBtn: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['pagination-buttons']);
    this.rootElement.appendChild(this.element);
    this.prevBtn = document.createElement('button');
    this.prevBtn.setAttribute('class', 'btn pagination-buttons__prev');
    this.prevBtn.innerText = 'Prev';
    this.element.appendChild(this.prevBtn);
    this.nextBtn = document.createElement('button');
    this.nextBtn.setAttribute('class', 'btn pagination-buttons__next');
    this.nextBtn.innerText = 'Next';
    this.element.appendChild(this.nextBtn);
  }

  render(): void {
    this.element.addEventListener('click', async (e) => {
      const items = await getCars(state.pageNum, CARS_ON_PAGE);
      const totalCount = Number(items.count);
      if (e.target === this.prevBtn && state.pageNum > FIRST_PAGE) {
        state.pageNum--;
        generateCarItems(state.pageNum);
      }
      if (totalCount) {
        const isLastPage = Math.floor(totalCount / CARS_ON_PAGE);
        if (e.target === this.nextBtn
          && state.pageNum <= isLastPage
          && totalCount > state.pageNum * CARS_ON_PAGE) {
          state.pageNum++;
          generateCarItems(state.pageNum);
        }
      }
    });
  }
}
