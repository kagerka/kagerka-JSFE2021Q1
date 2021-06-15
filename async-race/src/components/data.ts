// import { CarType, GetCars } from '../params';
import { getCars } from '../rest-api/garage/get-car';

// getCars(1, 1).then({cars, carsCount} => {})
// // const { items: cars, count: carsCount } = await getCars(1, 1);
// // const { items: winners, count: winnersCount } = await getWinners({ page: 1 });

// export default {
//   carsPage: 1,
//   cars,
//   carsCount,
//   winnersPage: 1,
//   // winners,
//   // winnersCount,
//   animation: {},
//   view: 'garage',
//   sortBy: null,
//   sortOrder: null,
// };
let id: number;
let time: number;
let success: boolean;
let animation;
let cars: Array<{ id: number, time: number }>;
export const variables = {
  id: 0,
  animation: {},
  pageNum: 1,
  winners: [{success: false, id: 0, time: 0}]
};
