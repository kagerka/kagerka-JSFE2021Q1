import { getCars, getCarsFn } from '../rest-api/garage/get-car';
import { BaseComponent } from './base-components';
import { CARS_ON_PAGE, FIRST_PAGE } from './constants';
import { generateCarItems } from './garage/race-field/generateCarItems';

export class Pagination extends BaseComponent {
  public prevBtn: HTMLElement;

  public nextBtn: HTMLElement;

  public static pageNum = FIRST_PAGE;

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
      const items = await getCars(Pagination.pageNum, CARS_ON_PAGE);
      const totalCount = items.count;
      console.log(totalCount);
      
      if (e.target === this.prevBtn && Pagination.pageNum > FIRST_PAGE) {
        Pagination.pageNum--;
        generateCarItems(Pagination.pageNum);
      }
      if (e.target === this.nextBtn
        && Pagination.pageNum <= Math.floor(items.count / CARS_ON_PAGE)
        && totalCount > Pagination.pageNum * CARS_ON_PAGE) {
        Pagination.pageNum++;
        generateCarItems(Pagination.pageNum);
      }
    });
  }
}
