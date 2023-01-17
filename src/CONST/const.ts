export const BODY = document.querySelector('.body');
const BASE = 'http://localhost:3000';
export enum ACTIONS { 
    init = "INIT",
    garage = "GARAGE", 
    winner = "WINNER",
    countCar = 'COUNT_CAR',
    garagePage = "GARAGE_PAGE", 
};
export const GARAGE_BASE = `${BASE}/garage`;
export const ENGINE_BASE = `${BASE}/engine`;
export const WINNER_BASE = `${BASE}/winners`;
export const MAX_RANDOM = 100;
export const MAX_LIMIT_WINNERS = 10;
export const MAX_LIMIT_GARAGE = 7;
export const BRAND_CAR: string[] = [
    'Audi',
    'BMW',
    'Ford',
    'Honda',
    'Hyundai',
    'Kia',
    'Lada',
    'Mazda',
    'Lexus',
    'Porsche',
    'Opel',
    'Subaru',
    'Mercedes',
];
export const MODEL_CAR: string[] = [
    'S1',
    'RS 7',
    'Q7 V12',
    'TT RS',
    'X3',
    'X5',
    'Antara',
    'Astra ',
    'Insignia ',
    'Fiesta',
    'Focus',
    'Mondeo',
];
