import { getWinners } from '../../rest-api/winners/winner-func';
import { BaseComponent } from '../baseСomponent';
import { FIRST_PAGE, WINNERS_ON_PAGE } from '../constants';
import { state } from '../state';
import { WinnerItem } from './winner-item';

export class Winners extends BaseComponent {
  public static title: HTMLElement;

  public static subTitle: HTMLElement;

  private readonly table: HTMLElement;

  public static thead: HTMLElement;

  private readonly thNumber: HTMLElement;

  private readonly thCar: HTMLElement;

  private readonly thName: HTMLElement;

  public static thWins: HTMLElement;

  public static thTime: HTMLElement;

  public static tbody: HTMLElement;

  public pageButtons: HTMLElement;

  public prevBtn: HTMLElement;

  public nextBtn: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    super('div', ['winners', 'hidden']);
    this.rootElement.appendChild(this.element);

    Winners.title = document.createElement('h2');
    this.element.appendChild(Winners.title);

    Winners.subTitle = document.createElement('h3');
    this.element.appendChild(Winners.subTitle);

    this.table = document.createElement('table');
    this.element.appendChild(this.table);

    Winners.thead = document.createElement('thead');
    this.table.appendChild(Winners.thead);

    this.thNumber = document.createElement('th');
    Winners.thead.appendChild(this.thNumber);

    this.thCar = document.createElement('th');
    Winners.thead.appendChild(this.thCar);

    this.thName = document.createElement('th');
    Winners.thead.appendChild(this.thName);

    Winners.thWins = document.createElement('th');
    Winners.thead.appendChild(Winners.thWins);

    Winners.thTime = document.createElement('th');
    Winners.thead.appendChild(Winners.thTime);

    Winners.tbody = document.createElement('tbody');
    this.table.appendChild(Winners.tbody);

    this.pageButtons = document.createElement('div');
    this.prevBtn = document.createElement('button');
    this.nextBtn = document.createElement('button');

    this.init();
    this.getPagination();
    Winners.sortOrder();
  }

  getPagination(): void {
    this.pageButtons.setAttribute('class', 'pagination-buttons');
    this.element.appendChild(this.pageButtons);

    this.prevBtn.setAttribute('class', 'btn pagination-buttons__prev');
    this.pageButtons.appendChild(this.prevBtn);

    this.nextBtn.setAttribute('class', 'btn pagination-buttons__next');
    this.pageButtons.appendChild(this.nextBtn);
  }

  render(): HTMLElement {
    this.thNumber.innerHTML = 'Number';
    this.thCar.innerHTML = 'Car';
    this.thName.innerHTML = 'Name';
    Winners.thWins.innerHTML = `Wins ${state.arrowWin}`;
    Winners.thTime.innerHTML = `Best time (sec) ${state.arrowTime}`;
    Winners.thWins.style.cursor = 'pointer';
    Winners.thTime.style.cursor = 'pointer';
    Winners.updateWinners();
    this.prevBtn.innerText = 'Prev';
    this.nextBtn.innerText = 'Next';
    return this.element;
  }

  public static updateWinners = async (): Promise<void> => {
    const winners = await getWinners({
      page: state.winPageNum, limit: 10, sort: state.sort, order: state.order,
    });
    Winners.title.innerHTML = `Winners (${winners.count})`;
    Winners.subTitle.innerHTML = `Page #${state.winPageNum}`;
    let rowNum = 1;
    Winners.tbody.innerHTML = '';
    winners.items.forEach((element) => {
      new WinnerItem(Winners.tbody).render(
        element.car.color, element.car.id, rowNum, element.car.name, element.wins, element.time,
      );
      rowNum++;
    });
    Winners.thWins.innerHTML = `Wins ${state.arrowWin}`;
    Winners.thTime.innerHTML = `Best time (sec) ${state.arrowTime}`;
  };

  init(): void {
    this.element.addEventListener('click', async (e) => {
      const winners = await getWinners({
        page: 1, limit: 10, sort: 'time', order: 'ADS',
      });
      if (winners.count) {
        const winCount = +(winners.count);

        if (e.target === this.prevBtn && state.winPageNum > FIRST_PAGE) {
          state.winPageNum--;
          Winners.updateWinners();
        }
        if (winCount) {
          const isLastPage = Math.floor(winCount / WINNERS_ON_PAGE);
          if (e.target === this.nextBtn
            && state.winPageNum <= isLastPage
            && winCount > state.winPageNum * WINNERS_ON_PAGE) {
            state.winPageNum++;
            Winners.updateWinners();
          }
        }
      }
    });
  }

  static sortOrder(): void {
    Winners.thead.addEventListener('click', (e) => {
      if (e.target === Winners.thWins) {
        state.sort = 'wins';
        if (state.order === 'ASC') {
          state.order = 'DESC';
          state.arrowWin = '▲';
          state.arrowTime = '';
        } else {
          state.order = 'ASC';
          state.arrowWin = '▼';
          state.arrowTime = '';
        }
      }
      if (e.target === Winners.thTime) {
        state.sort = 'time';
        if (state.order === 'ASC') {
          state.order = 'DESC';
          state.arrowTime = '▲';
          state.arrowWin = '';
        } else {
          state.order = 'ASC';
          state.arrowTime = '▼';
          state.arrowWin = '';
        }
      }

      Winners.updateWinners();
    });
  }
}
