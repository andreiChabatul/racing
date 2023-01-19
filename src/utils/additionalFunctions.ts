import {
  ACTIONS,
  BODY,
  BRAND_CAR,
  MAX_LIMIT_WINNERS,
  MODEL_CAR,
} from '../CONST/const';
import store from '../store/store';
import { ICarWin, ICarWinUpdate, IUrlObj } from '../types/index';
import {
  createWinner,
  getWinner,
  getWinners,
  updateWinner,
  workCar,
  workWinner,
} from './apiLoader';

export function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function generateRandomColor(): string {
  const result = [];
  const hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  shuffle(hexRef);
  for (let n = 0; n < 6; n += 1) {
    result.push(hexRef[n]);
  }
  return `#${result.join('')}`;
}

export function generateRandomName(): string {
  const indexBrand = Math.floor(Math.random() * BRAND_CAR.length);
  const indexModel = Math.floor(Math.random() * MODEL_CAR.length);
  return `${BRAND_CAR[indexBrand]} ${MODEL_CAR[indexModel]}`;
}

export function parseUrl(url: string): string {
  let resultId = '0';
  const parseObj: IUrlObj = {};
  const arr = url.split('?')[1].split('&');
  arr.forEach((element) => {
    const [type, parametr] = element.split('=');
    if (type === 'id' || type === 'status') parseObj[type] = parametr;
  });
  if (parseObj.id) resultId = parseObj.id;
  return resultId;
}

export async function getAllWinners() {
  const winnersAll: number[] = [];
  const actualState = store.getState();
  const maxPage = Math.ceil(actualState.amountWinner / MAX_LIMIT_WINNERS);
  for (let i = 1; i < maxPage + 1; i += 1) {
    const item = (await getWinners(i, MAX_LIMIT_WINNERS, 'id', 'ASC')).items;
    item.forEach((element) => {
      winnersAll.push(element.id);
    });
  }
  return winnersAll;
}

export async function winnerProcessing(id: number, time: number) {
  const actualWinners = await getAllWinners();
  if (actualWinners.includes(id)) {
    let resultTime: number = time / 1000;
    const car = await getWinner(String(id));
    if (resultTime > car.time) resultTime = car.time;
    const option: ICarWinUpdate = {
      wins: (car.wins += 1),
      time: resultTime,
    };
    await updateWinner(id, option);
  } else {
    const option: ICarWin = {
      id: id,
      wins: 1,
      time: time / 1000,
    };
    await createWinner(option);
  }
}

export function nextPage(parametr: 'winnersPage' | 'garagePage') {
  const actualState = store.getState();
  const resultPage = actualState[parametr] + 1;
  store.dispatch({
    type: ACTIONS[parametr],
    parametr: resultPage,
  });
}

export function prevPage(parametr: 'winnersPage' | 'garagePage') {
  const actualState = store.getState();
  let resultPage = actualState[parametr] - 1;
  if (resultPage < 1) resultPage = 1;
  store.dispatch({
    type: ACTIONS[parametr],
    parametr: resultPage,
  });
}

export function buttonDisable() {
  BODY.style.setProperty('--BUTTON_OPACITY_DISABLE', '.5');
  BODY.style.setProperty('--BUTTON_EVENT_DISABLE', 'none');
}

export function buttonActive() {
  BODY.style.setProperty('--BUTTON_OPACITY_DISABLE', '1');
  BODY.style.setProperty('--BUTTON_EVENT_DISABLE', 'auto');
}

export async function deleteCarGW(id: number) {
  await workCar(String(id), 'DELETE');
  const actualWinners = await getAllWinners();
  if (actualWinners.includes(id)) await workWinner(String(id), 'DELETE');
  store.dispatch({
    type: ACTIONS.update,
    isCheck: true,
  });
}
