import { getCars } from '../rest-api/garage/get-car';
import { BaseComponent } from './base-components';
import { FIRST_PAGE } from './constants';
import { Race } from './garage/race-field';

let pageNum = 1;
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
    const listPrev = async (): Promise<void> => {
      if (pageNum > FIRST_PAGE) {
        pageNum--;
      }
      const CARS_ON_PAGE = 7;
      const items = await getCars(pageNum, CARS_ON_PAGE);
    };
    const listNext = async (): Promise<void> => {
      const CARS_ON_PAGE = 7;
      const items = await getCars(pageNum, CARS_ON_PAGE);
      if (pageNum < Math.floor(items.count / CARS_ON_PAGE)) {
        pageNum++;
      }
    };
    this.element.addEventListener('click', (e) => {
      if (e.target === this.prevBtn) {
        listPrev();
      }
      if (e.target === this.nextBtn) {
        listNext();
      }
    });
  }
}
