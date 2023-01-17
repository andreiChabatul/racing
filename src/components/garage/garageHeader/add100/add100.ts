import { ACTIONS, MAX_RANDOM } from '../../../../CONST/const';
import { store } from '../../../../store/store';
import { IUpdateCar } from '../../../../types/index';
import { generateRandomColor, generateRandomName } from '../../../../utils/additionalFunctions';
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
            store.dispatch({
                type: ACTIONS.update,
                isCheck: true,
            });
        });
        return addCar;
    }

    createRandomCar(): void {
        this.newCar.name = generateRandomName();
        this.newCar.color = generateRandomColor();
    }
}
