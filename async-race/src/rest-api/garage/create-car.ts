import { CarItem, GetGarage } from '../../models';
import { baseUrl, path } from '../path';

export const createCarFn = async (car: CarItem): Promise<GetGarage> => {
  const response = await fetch(`${baseUrl}${path.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  return response.json();
};

export const createCar = async (name: string, color: string): Promise<void> => {
  await createCarFn({
    name,
    color,
  });
};
