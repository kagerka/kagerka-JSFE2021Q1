export type GetGarage = {
  items: string;
  carAmount: number;
};

export interface ICar {
  id: number;
  name: string;
  color: string;
}

export type CarItem = {
  name: string;
  color: string | number;
};

export type GenerateRandomParam = {
  carMake: string;
  carModel: string;
  randomColor: string;
};

export type Distance = {
  velocity: number;
  distance: number;
};

export type Success = {
  success: boolean;
};

export type Position = {
  x: number;
  y: number;
};

export type StartDriveResult = {
  success: boolean;
  id: number;
  time: number
};

export type GetCars = {
  items: ICar[];
  count: string | null;
};

export type Anim = {
  car: HTMLElement;
  htmlDistance: number;
  time: number;
};

export type RaceAllCar = {
  id: number;
  time: number;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
  car: ICar;
};

export type GetWinners = {
  page: number;
  limit: number;
  sort: string;
  order: string;
};

export type GetWinCars = {
  items: Winner[];
  count: string | null;
};

export type CreateWinner = {
  id: number;
  time: number;
};

export type UpdateWinner = {
  id: number;
  wins: number;
  time: number;
};
