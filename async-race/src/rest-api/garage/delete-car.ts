import { baseUrl, path } from '../path';
import { deleteWinner, getWinner } from '../winners/winner-func';

export const deleteCar = async (id: number): Promise<void> => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'DELETE',
  });
  response.json();
  const winCar = await getWinner(id);
  if (winCar.id) {
    await deleteWinner(id);
  }
};
