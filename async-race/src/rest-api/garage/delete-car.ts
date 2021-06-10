import { GetGarage } from '../../params';
import { baseUrl, path } from '../path';

export const deleteCarFunc = async (id: number): Promise<GetGarage> => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'DELETE',
  });
  const cars = await response.json();
  return cars;
};

export const deleteCar = async (id: number): Promise<void> => {
  const car = await deleteCarFunc(id);
};
