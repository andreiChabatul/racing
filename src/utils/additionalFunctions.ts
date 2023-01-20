import {
  ACTIONS,
  BODY,
  BRAND_CAR,
  MAX_LIMIT_WINNERS_CHECK,
  MODEL_CAR,
} from '../CONST/const';
import store from '../store/store';
import {
  ICarWin,
  ICarWinUpdate,
  IResponceDriveCar,
} from '../types/index';
import {
  createWinner,
  getWinner,
  getWinners,
  updateWinner,
  workCar,
  workWinner,
} from './apiLoader';

export function generateRandomColor(): string {
  return `#${Math.random().toString(16).slice(3, 9)}`;
}

export function generateRandomName(): string {
  const indexBrand = Math.floor(Math.random() * BRAND_CAR.length);
  const indexModel = Math.floor(Math.random() * MODEL_CAR.length);
  return `${BRAND_CAR[indexBrand]} ${MODEL_CAR[indexModel]}`;
}

export async function getAllWinners(): Promise<number[]> {
  const winnersAll: number[] = [];
  const item: ICarWin[] = (await getWinners(1, MAX_LIMIT_WINNERS_CHECK, '', '')).items;
  item.forEach((element) => {
    winnersAll.push(element.id);
  });
  return winnersAll;
}

export async function winnerProcessing(winner: IResponceDriveCar) {
  const actualWinners = await getAllWinners();
  if (actualWinners.includes(winner.id)) {
    let resultTime: number = winner.time / 1000;
    const car = await getWinner(winner.id);
    if (resultTime > car.time) resultTime = car.time;
    const option: ICarWinUpdate = {
      wins: (car.wins += 1),
      time: resultTime,
    };
    updateWinner(winner.id, option);
  } else {
    const option: ICarWin = {
      id: winner.id,
      wins: 1,
      time: winner.time / 1000,
    };
    createWinner(option);
  }
}

export function pagination(parametr: 'winnersPage' | 'garagePage', action: 'next' | 'prev') {
  const actualState = store.getState();
  let resultPage = 1;
  switch (action) {
    case ('next'):
      resultPage = actualState[parametr] + 1;
      break;
    case ('prev'):
      resultPage = actualState[parametr] - 1;
      if (resultPage < 1) resultPage = 1;
      break;
    default:
      break;
  }
  store.dispatch({
    type: ACTIONS[parametr],
    parametr: resultPage,
  });
}

export function buttonSwitch(switchPar: 'active' | 'disable') {
  switch (switchPar) {
    case ('disable'):
      BODY.style.setProperty('--BUTTON_OPACITY_DISABLE', '.5');
      BODY.style.setProperty('--BUTTON_EVENT_DISABLE', 'none');
      break;
    case ('active'):
      BODY.style.setProperty('--BUTTON_OPACITY_DISABLE', '1');
      BODY.style.setProperty('--BUTTON_EVENT_DISABLE', 'auto');
      break;
    default:
      break;
  }
}

export async function deleteCarGW(id: number) {
  await workCar(id, 'DELETE');
  const actualWinners = await getAllWinners();
  if (actualWinners.includes(id)) await workWinner(id, 'DELETE');
  store.dispatch({
    type: ACTIONS.update,
    isCheck: true,
  });
}
