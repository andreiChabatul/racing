import { ICar } from '../../../types/index';
import CreateElement from '../../../utils/CreateElement';
import './changeCar.css';
import garageIco from '../../../assets/img/garageIco.png';
import { updateCar } from '../../../utils/apiLoader';
import { deleteCarGW } from '../../../utils/additionalFunctions';

export default class ChangeCar {
    itemCar: ICar;
    changeCarButton: HTMLButtonElement;
    deleteCar: HTMLButtonElement;
    inputTextCar: HTMLInputElement;
    inputColorCar: HTMLInputElement;
    containerInput: HTMLDivElement;
    close: HTMLDivElement;
    nameCar: HTMLSpanElement;

    constructor(itemCar: ICar) {
        this.itemCar = itemCar;
        this.changeCarButton = CreateElement.createButtonElement('car-control button-state');
        this.inputTextCar = CreateElement.createInputElement(
            'change-car__input_text',
            'Enter name',
            '',
            'text',
            this.itemCar.car.name
        );
        this.inputColorCar = CreateElement.createInputElement(
            'change-car__input_color',
            '',
            '',
            'color',
            this.itemCar.car.color
        );
        this.containerInput = CreateElement.createDivElement('change-car__input');
        this.close = CreateElement.createDivElement('close-change');
        this.nameCar = CreateElement.createSpanElement('car_name', this.itemCar.car.name);
        this.deleteCar = CreateElement.createButtonElement('button-car-delete', 'delete car');
    }

    render(): HTMLDivElement {
        const containerChangeCar = CreateElement.createDivElement('change-car');
        const formChangeText = CreateElement.createFormElement('change-car__form');
        const formChangeColor = CreateElement.createFormElement('change-car__form');
        const spanChangeText = CreateElement.createSpanElement('change-car__span', 'Change name car: ');
        const spanChangeColor = CreateElement.createSpanElement('change-car__span', 'Change color car: ');
        const changeCarImg = CreateElement.createImgElement('car-control_img', garageIco);
        formChangeText.append(spanChangeText, this.inputTextCar);
        formChangeColor.append(spanChangeColor, this.inputColorCar);
        this.changeCarButton.append(changeCarImg);
        this.containerInput.append(formChangeText, formChangeColor, this.deleteCar);
        containerChangeCar.append(this.changeCarButton, this.containerInput, this.close, this.nameCar);
        this.eventListner();

        return containerChangeCar;
    }

    changeColor() {
        const value = this.inputColorCar.value;
        this.itemCar.car.color = value;
        this.itemCar.update();
        this.updateServerInfoCar();
    }

    changeName() {
        const value = this.inputTextCar.value;
        this.itemCar.car.name = value;
        this.nameCar.textContent = value;
        this.updateServerInfoCar();
    }

    updateServerInfoCar() {
        updateCar(this.itemCar.car.id, {
            name: this.itemCar.car.name,
            color: this.itemCar.car.color,
        });
    }

    openAndCloseMenu() {
        this.containerInput.classList.toggle('change-car__input_active');
        this.close.classList.toggle('close-change_active');
    }

    async deleteCarServerInfoCar() {
        await deleteCarGW(this.itemCar.car.id);
        this.openAndCloseMenu();
    }

    eventListner() {
        this.inputColorCar.addEventListener('input', () => this.changeColor());
        this.inputTextCar.addEventListener('input', () => this.changeName());
        this.changeCarButton.addEventListener('click', () => this.openAndCloseMenu());
        this.close.addEventListener('click', () => this.openAndCloseMenu());
        this.deleteCar.addEventListener('click', () => this.deleteCarServerInfoCar());
    }
}
