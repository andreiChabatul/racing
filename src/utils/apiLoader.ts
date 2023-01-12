import { GARAGE_BASE } from "../CONST/const";

export async function getCars(page: number, limit = 7) {
    const response = await fetch(`${GARAGE_BASE}?_page=${page}&_limit=${limit}`);
    return {
        items: await response.json(),
        amount: response.headers.get('X-Total-Count'),
    }
}