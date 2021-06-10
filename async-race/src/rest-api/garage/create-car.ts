import { CarItem, GetGarage } from '../../params';
import { baseUrl, path } from '../path';

export const createCarFn = async (car: CarItem): Promise<GetGarage> => {
  const response = await fetch(`${baseUrl}${path.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const cars = await response.json();
  return cars;
};

export const createCar = async (name: string, color: string): Promise<void> => {
  const car = await createCarFn({
    name,
    color,
  });
  console.log(car);
};
