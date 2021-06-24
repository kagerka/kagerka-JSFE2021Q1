import { baseUrl, path } from '../path';

export const updateCar = async (id: number, name: string, color: string): Promise<void> => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
  });
  response.json();
};
