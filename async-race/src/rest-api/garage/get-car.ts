import {
  GetCars, GetGarage, ICar,
} from '../../models';
import { baseUrl, path } from '../path';

// получить все записи и количество машин
export const getCarsFn = async (page: number, limit: number): Promise<GetGarage> => {
  const response = await fetch(`${baseUrl}${path.garage}?_page=${page}&_limit=${limit}`);
  const items = await response.json();
  const carNums = Number(response.headers.get('X-Total-Count'));
  return { items, carNums };
};

// получить машинку по айди
export const getCarFn = async (id: number): Promise<ICar> => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`);
  const cars = await response.json();
  return cars;
};

// получить определенное количество машин
export const getCars = async (page: number, limit: number): Promise<GetCars> => {
  const response = await fetch(`${baseUrl}${path.garage}?_page=${page}&_limit=${limit}`);
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

// получить машину по айди
export const getCar = async (id: number): Promise<ICar> => (await fetch(`${baseUrl}${path.garage}/${id}`)).json();
