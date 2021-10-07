import { GenerateRandomParam } from '../../../models';
import { carModels } from '../../car-models';
import { CAR_MAKE_LENGTH, HEX, HEX_COLORS } from '../../constants';

export const generateRandomCar = (): GenerateRandomParam => {
  const randomMakeNum = Math.floor(Math.random() * CAR_MAKE_LENGTH);
  const carMake = Object.keys(carModels)[randomMakeNum];
  const carModelLength = Object.values(carModels)[randomMakeNum].length;
  const randomModelNum = Math.floor(Math.random() * carModelLength);
  const carModel = Object.values(carModels)[randomMakeNum][randomModelNum];
  const randomColor = `#${Math.floor(Math.random() * HEX_COLORS).toString(HEX)}`;
  return {
    carMake, carModel, randomColor,
  };
};
