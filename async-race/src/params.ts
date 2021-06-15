export type Params = {
  key: string;
  value: string | number;
};

export type GetGarage = {
  items: Array<Params>;
  carNums: number | string | null;
};

export type CarType = {
  id: number;
  name: string;
  color: string;
};

export type CarItem = {
  name: string;
  color: string | number;
};

export type CarItemName = {
  name: string;
};

export type CarItemColor = {
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
  items: CarType[];
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
}

export type Winner = {
  id: number;
  wins: number;
  time: number;
  car: CarType;
}

export type GetWinners = {
  page: number;
  limit: number;
  sort: string;
  order: string;
}
export type GetWinCars = {
  items: Winner[];
  count: string | null;
}

export type CreateWinner = {
  id: number;
  time: number;
};

export type SaveWinner = {
  id: number;
  wins: number;
  time: number;
};