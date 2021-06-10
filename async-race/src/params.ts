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
