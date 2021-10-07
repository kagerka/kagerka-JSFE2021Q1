import { TWO_HUNDRED } from '../../components/constants';
import { Distance, Success } from '../../models';
import { baseUrl, path } from '../path';

export const startEngine = async (id: number): Promise<Distance> => (
  await fetch(`${baseUrl}${path.engine}?id=${id}&status=started`)).json();

export const stopEngine = async (id: number): Promise<void> => (
  await fetch(`${baseUrl}${path.engine}?id=${id}&status=stopped`)).json();

export const drive = async (id: number): Promise<Success> => {
  const res = await fetch(`${baseUrl}${path.engine}?id=${id}&status=drive`).catch();
  return res.status !== TWO_HUNDRED ? { success: false } : { ...(await res.json()) };
};
