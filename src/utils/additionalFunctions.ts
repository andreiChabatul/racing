import { ACTIONS, BODY, BRAND_CAR, MAX_LIMIT_GARAGE, MODEL_CAR } from '../CONST/const';
import { store } from '../store/store';
import { ICarWin, IUrlObj } from '../types/index';
import { createWinner, getWinner } from './apiLoader';

export function generateRandomColor(): string {
    const result = [];
    const hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    for (let n = 0; n < 6; n++) {
        result.push(hexRef[Math.floor(Math.random() * 16)]);
    }
    return `#${result.join('')}`;
}

export function generateRandomName(): string {
    const indexBrand = Math.floor(Math.random() * BRAND_CAR.length);
    const indexModel = Math.floor(Math.random() * MODEL_CAR.length);
    return `${BRAND_CAR[indexBrand]} ${MODEL_CAR[indexModel]}`;
}

export function parseUrl(url: string): string {
    const parseObj: IUrlObj = {};
    const arr = url.split('?')[1].split('&');
    arr.forEach((element) => {
        const elem = element.split('=');
        elem[0] === 'id' || elem[0] === 'status' ? (parseObj[elem[0]] = elem[1]) : '';
    });
    if (parseObj.id) {
        return parseObj.id;
    } else {
        return '0';
    }
}

export async function winnerProcessing(id: string, time: number) {
    const response = await getWinner(id);
    if (response.status === 200) {
        console.log('tcnm');
    } else if (response.status === 404) {
        const option: ICarWin = {
            id: Number(id),
            wins: 1,
            time: time / 1000,
        };
        await createWinner(option);
    }
}

export function nextPageGarage() {
    const actualState = store.getState();
    const maxPage = Math.ceil(actualState.amountCar / MAX_LIMIT_GARAGE);
    let resultPage = actualState.garagePage + 1;
    resultPage > maxPage ? (resultPage = actualState.garagePage) : '';
    store.dispatch({
        type: ACTIONS.garagePage,
        parametr: resultPage,
        isCheck: true,
    });
}

export function prevPageGarage() {
    const actualState = store.getState();
    let resultPage = actualState.garagePage - 1;
    resultPage < 1 ? (resultPage = 1) : '';
    store.dispatch({
        type: ACTIONS.garagePage,
        parametr: resultPage,
        isCheck: true,
    });
}

export function buttonDisable() {
    BODY.style.setProperty('--BUTTON_OPACITY_DISABLE', '.5');
    BODY.style.setProperty('--BUTTON_EVENT_DISABLE', 'none');
}
