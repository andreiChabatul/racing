import { IComponentHeader } from '../../../types/index';
import CreateElement from '../../../utils/CreateElement';
import AddHundriedCar from './add100/add100';
import AddCar from './addCar/addCar';
import './garageHeader.css';

export default class GarageHeader implements IComponentHeader {
    startButton: HTMLButtonElement;
    resetButton: HTMLButtonElement;
    totalCar: HTMLParagraphElement;
    amount: string;

    constructor() {
        this.amount = '0';
        this.totalCar = CreateElement.createParagraphElement('header-text', `Total car: ${this.amount}`);
        this.startButton = CreateElement.createButtonElement('button-header button-header_start', '▶');
        this.resetButton = CreateElement.createButtonElement('button-header button-header_reset', '⟳');
    }

    render(): HTMLDivElement {
        const headerGarage = CreateElement.createDivElement('header-garage');
        const addcar = new AddCar().render();
        const add100 = new AddHundriedCar().render();
        headerGarage.append(this.startButton, this.resetButton, addcar, add100, this.totalCar);
        return headerGarage;
    }

    update(amount: string): void {
        this.totalCar.textContent = `Total car: ${amount}`;
    }
}
