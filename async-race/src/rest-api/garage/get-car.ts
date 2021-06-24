import {
  GetCars, GetGarage, ICar,
} from '../../models';
import { baseUrl, path } from '../path';

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
