import {
  CarItem, GetGarage,
} from '../../models';
import { baseUrl, path } from '../path';

export const updateCarFn = async (id: number, body: CarItem): Promise<GetGarage> => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const cars = await response.json();
  return cars;
};

export const updateCarParamFn = async (id: number, body: CarItem): Promise<GetGarage> => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const cars = await response.json();
  return cars;
};

export const updateCar = async (id: number, name: string, color: string): Promise<void> => {
  await updateCarParamFn(id, {
    name,
    color,
  });
};
