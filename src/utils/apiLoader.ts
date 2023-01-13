import { ENGINE_BASE, GARAGE_BASE } from '../CONST/const';
import { IPromiseGarage, IUpdateCar } from '../types/index';

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

export async function deleteCar(id: number) {
    await fetch(`${GARAGE_BASE}/${id}`, {
        method: 'DELETE',
    });
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

export async function startEngine(id: number) {
    return await fetch(`${ENGINE_BASE}?id=${id}&status=started`,{
        method: 'PATCH',
        },
    );
    
}