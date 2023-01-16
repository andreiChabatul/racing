import RaceMode from '../components/garage/garageHeader/raceMode/raceMode';
import { ENGINE_BASE, GARAGE_BASE } from '../CONST/const';
import { ICarResponse, IPromiseGarage, IStartQuery, IUpdateCar } from '../types/index';

export async function getCars(page: number, limit = 7): Promise<IPromiseGarage> {
    const response = await fetch(`${GARAGE_BASE}?_page=${page}&_limit=${limit}`);
    return {
        items: await response.json(),
        amount: response.headers.get('X-Total-Count'),
    };
}

export async function updateCar(id: number, option: IUpdateCar) {
    await fetch(`${GARAGE_BASE}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(option),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function workCar(id: string, method: string): Promise<ICarResponse> {
    return (
        await fetch(`${GARAGE_BASE}/${id}`, {
            method: method,
        })
    ).json();
}

export async function createCar(option: IUpdateCar) {
    await fetch(GARAGE_BASE, {
        method: 'POST',
        body: JSON.stringify(option),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function startEngine(id: number): Promise<IStartQuery> {
    return (
        await fetch(`${ENGINE_BASE}?id=${id}&status=started`, {
            method: 'PATCH',
        })
    ).json();
}

export async function stopEngine(id: number) {
    return await fetch(`${ENGINE_BASE}?id=${id}&status=stopped`, {
        method: 'PATCH',
    });
}

export async function driveCar(id: number): Promise<Response> {
    const timePes = Date.now();
    const response = await fetch(`${ENGINE_BASE}?id=${id}&status=drive`, {
        method: 'PATCH',
    }).catch();
    RaceMode.pushWin(response, timePes);
    return response;
}
