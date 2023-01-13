import { BRAND_CAR, MAX_RANDOM, MODEL_CAR } from '../../../../CONST/const';
import { IUpdateCar } from '../../../../types/index';
import { createCar } from '../../../../utils/apiLoader';
import CreateElement from '../../../../utils/CreateElement';
import './add100.css';

export default class AddHundriedCar {
    newCar: IUpdateCar;

    constructor() {
        this.newCar = {
            name: '',
            color: '#000000',
        };
    }

    render(): HTMLDivElement {
        const addCar = CreateElement.createDivElement('add-100 button-header', '', '100');
        addCar.addEventListener('click', () => {
            for (let i = 0; i < MAX_RANDOM; i++) {
                this.createRandomCar();
                createCar(this.newCar);
            }
        })
        return addCar;
    }

    createRandomCar() {
        this.newCar.name =
            `${BRAND_CAR[Math.floor(Math.random() * BRAND_CAR.length)]} ${MODEL_CAR[Math.floor(Math.random() * MODEL_CAR.length)]}`;
        this.newCar.color = this.generateRandomColor();
    }

    generateRandomColor(): string {
        let random = () => Math.floor(Math.random() * (256));
        return `#${random().toString(16)}${random().toString(16)}${random().toString(16)}`;
    }
}


