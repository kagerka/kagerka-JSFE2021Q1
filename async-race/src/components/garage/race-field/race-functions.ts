import {
  Distance, Position, StartDriveResult, Success,
} from '../../../models';
import { getCars } from '../../../rest-api/garage/get-car';
import { baseUrl, path } from '../../../rest-api/path';
import { saveWinner } from '../../../rest-api/winners/winner-func';
import {
  CARS_ON_PAGE, MILLISEC_IN_SEC, ONE_HUNDRED, PADDING_RIGHT, TIME_OUT_3000, TWO, TWO_HUNDRED, ZERO,
} from '../../constants';
import { state } from '../../state';
import { Winners } from '../../winners/winners';
import { WinMsg } from './win-msg';

function getPositionAtCenter(element: HTMLElement): Position {
  const {
    top, left, width, height,
  } = element.getBoundingClientRect();
  return {
    x: left + width / TWO,
    y: top + height / TWO,
  };
}

export function getDistanceBetweenElements(a: HTMLElement, b: HTMLElement): number {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}

export const animation = (car: HTMLElement, distance: number, animationTime: number): { id: number; } => {
  let start: number | null = null;
  const states = { id: -1 };

  function step(timestamp: number): void {
    if (!start) { start = timestamp; }
    if (start) {
      const time = timestamp - start;
      const passed = Math.round(time * (distance / animationTime));
      car.style.transform = `translateX(${Math.min(passed, distance - PADDING_RIGHT)}px)`;

      if (passed < distance) {
        states.id = window.requestAnimationFrame(step);
      }
    }
  }
  states.id = window.requestAnimationFrame(step);
  return states;
};

export const startEngine = async (id: number): Promise<Distance> => (
  await fetch(`${baseUrl}${path.engine}?id=${id}&status=started`)).json();

export const stopEngine = async (id: number): Promise<void> => (
  await fetch(`${baseUrl}${path.engine}?id=${id}&status=stopped`)).json();

export const drive = async (id: number): Promise<Success> => {
  const res = await fetch(`${baseUrl}${path.engine}?id=${id}&status=drive`).catch();
  return res.status !== TWO_HUNDRED ? { success: false } : { ...(await res.json()) };
};

export const startDriving = async (id: number): Promise<StartDriveResult | undefined> => {
  const startButton: HTMLElement | null = document.getElementById(`a-button-${id}`);
  const stopButton: HTMLElement | null = document.getElementById(`b-button-${id}`);

  if (startButton instanceof HTMLButtonElement && stopButton instanceof HTMLButtonElement) {
    startButton.classList.toggle('disabled', true);
    stopButton.classList.toggle('disabled', false);
  }
  const { velocity, distance } = await startEngine(id);
  const time = Math.round(distance / velocity);
  const car: HTMLElement | null = document.getElementById(`car-img-${id}`);
  const flag: HTMLElement | null = document.getElementById(`img-flag-${id}`);
  let anim;
  if (car && flag) {
     const htmlDistance = Math.floor(getDistanceBetweenElements(car, flag)) + ONE_HUNDRED;
    anim = animation(car, htmlDistance, time);
  }
  const { success } = await drive(id);
  if (!success && anim) { window.cancelAnimationFrame(anim.id); }
  return { success, id, time };
};

export const stopDriving = async (id: number): Promise<void> => {
  const startButton: HTMLElement | null = document.getElementById(`a-button-${id}`);
  const stopButton: HTMLElement | null = document.getElementById(`b-button-${id}`);

  if (startButton instanceof HTMLButtonElement && stopButton instanceof HTMLButtonElement) {
    startButton.classList.toggle('disabled', false);
    stopButton.classList.toggle('disabled', true);
  }
  const car = document.getElementById(`car-img-${id}`);
  await stopEngine(id);
  window.cancelAnimationFrame(id);
  if (car) { car.style.transform = 'translateX(0)'; }
};

state.firstWinner = false;
export const raceAll = async (): Promise<void> => {
  const raceBtn: HTMLElement | null = document.getElementById('race-btn');
  const resetBtn: HTMLElement | null = document.getElementById('reset-btn');
  const carsOnPage = await getCars(state.pageNum, CARS_ON_PAGE);
  carsOnPage.items.forEach(async (element): Promise<void> => {
    const { id } = element;
    const carWin = await startDriving(id);
    const success = carWin?.success;
    const timeCar: number | undefined = carWin?.time;
    if (timeCar) {
      const time = +(timeCar / MILLISEC_IN_SEC).toFixed(TWO);
      if (success && !state.firstWinner && time) {
        state.firstWinner = true;
        const garageField: HTMLElement | null = document.querySelector('.garage__race');
        if (garageField) { new WinMsg(garageField).render(element.name, time); }
        setTimeout(async () => {
          const winMsg: HTMLElement | null = document.querySelector('.win-message');
          winMsg?.parentNode?.removeChild(winMsg);
        }, TIME_OUT_3000);
        await saveWinner({ id, time });
        setTimeout(() => {
          Winners.updateWinners();
        }, ZERO);
      }
    }
  });
  if (raceBtn instanceof HTMLButtonElement) {
    raceBtn.classList.toggle('disabled', true);
  }
};

export const resetAll = async (): Promise<void> => {
  const raceBtn: HTMLElement | null = document.getElementById('race-btn');
  const resetBtn: HTMLElement | null = document.getElementById('reset-btn');
  const carsOnPage = await getCars(state.pageNum, CARS_ON_PAGE);
  carsOnPage.items.forEach((element) => {
    stopDriving(element.id);
  });
  if (raceBtn instanceof HTMLButtonElement) {
    raceBtn.classList.toggle('disabled', false);
  }
  state.firstWinner = false;
};
