import { CarType } from '../../../params';
import { getCars } from '../../../rest-api/garage/get-car';
import { CARS_ON_PAGE, ZERO } from '../../constants';
import { RaceFieldItem } from './race-field-item';

export const generateCarItems = (pageNum: number): void => {
  setTimeout(async () => {
    const items = await getCars(pageNum, CARS_ON_PAGE);
    const itemsItems = items.items;
    const totalCount = items.count;
    const raceField: HTMLElement | null = document.querySelector('.garage__race-field');
    const raceTitle: HTMLElement | null = document.querySelector('.garage__race-title');
    const raceSubTitle: HTMLElement | null = document.querySelector('.garage__race-subtitle');
    if (raceField) {
      raceField.innerHTML = '';
      itemsItems.forEach((item: CarType) => new RaceFieldItem(raceField).render(item.id, item.name, item.color));
    }
    if (raceTitle) {
      raceTitle.innerHTML = `Garage (${totalCount})`;
    }
    if (raceSubTitle) {
      raceSubTitle.innerHTML = `Page #${pageNum}`;
    }
  }, ZERO);
};
