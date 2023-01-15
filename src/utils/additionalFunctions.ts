import { BRAND_CAR, MODEL_CAR } from "../CONST/const";

export function generateRandomColor(): string {
    let random = () => Math.floor(Math.random() * (256));
    return `#${random().toString(16)}${random().toString(16)}${random().toString(16)}`;
}

export function generateRandomName(): string {
    return `${BRAND_CAR[Math.floor(Math.random() * BRAND_CAR.length)]} ${MODEL_CAR[Math.floor(Math.random() * MODEL_CAR.length)]}`
}

export function parseUrl(url: string): string {
    const parseObj = {};
    const arr = url.split('?')[1].split('&');
    arr.forEach((element) => {
        const elem = element.split('=');
        parseObj[elem[0]] = elem[1]
    });
    return parseObj.id;
}