import { BRAND_CAR, MODEL_CAR } from '../CONST/const';
import { ICarWin, IUrlObj } from '../types/index';
import { createWinner, getWinner } from './apiLoader';

export function generateRandomColor(): string {
    const random = () => Math.floor(Math.random() * 256);
    return `#${random().toString(16)}${random().toString(16)}${random().toString(16)}`;
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
        console.log('tcnm')
    } else if (response.status === 404) {
        const option: ICarWin = {
            id: Number(id),
            wins: 1,
            time: time / 1000,
        }
        await createWinner(option);
    }
}

