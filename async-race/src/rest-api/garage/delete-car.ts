import { GetGarage } from '../../models';
import { baseUrl, path } from '../path';
import { deleteWinner, getWinner } from '../winners/winner-func';

export const deleteCarFunc = async (id: number): Promise<GetGarage> => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'DELETE',
  });
  const cars = await response.json();
  return cars;
};

export const deleteCar = async (id: number): Promise<void> => {
  await deleteCarFunc(id);
  const winCar = await getWinner(id);
  if (winCar.id) {
    await deleteWinner(id);
  }
};
