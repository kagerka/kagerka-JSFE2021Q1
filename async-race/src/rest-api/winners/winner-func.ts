import {
  ERR_404, ONE, WINNERS_ON_PAGE,
} from '../../components/constants';
import {
  CreateWinner, GetWinCars, GetWinners, SaveWinner, Winner,
} from '../../params';
import { getCar } from '../garage/get-car';
import { baseUrl, path } from '../path';

export const getWinner = async (id: number): Promise<SaveWinner> => (
  await fetch(`${baseUrl}${path.winners}/${id}`)).json();

export const getWinnerStatus = async (id: number): Promise<number> => (
  await fetch(`${baseUrl}${path.winners}/${id}`)).status;

export const deleteWinner = async (id: number): Promise<void> => (
  await fetch(`${baseUrl}${path.winners}/${id}`, { method: 'DELETE' })).json();

export const createWinner = async (body: SaveWinner): Promise<Response> => (await fetch(`${baseUrl}${path.winners}`, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const updateWinner = async (id: number, body: SaveWinner): Promise<void> => (
  await fetch(`${baseUrl}${path.winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();

export const saveWinner = async ({ id, time }: CreateWinner): Promise<void> => {
  const winnerStatus = await getWinnerStatus(id);
  if (winnerStatus === ERR_404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + ONE,
      time: time < winner.time ? time : winner.time,
    });
  }
};

export const getSortOrder = (sort: string, order: string): string => {
  if (sort && order) {
    return `&_sort=${sort}&_order=${order}`;
  }
  return '';
};

export const getWinners = async ({
  page, limit = WINNERS_ON_PAGE, sort, order,
}: GetWinners): Promise<GetWinCars> => {
  const response = await fetch(`${baseUrl}${path.winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
  const items = await response.json();

  return {
    items: await Promise.all(items.map(async (winner: Winner) => ({ ...winner, car: await getCar(winner.id) }))),
    count: response.headers.get('X-Total-Count'),
  };
};
