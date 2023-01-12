import CreateElement from "../../../utils/CreateElement";
import AddHundriedCar from "./add100/add100";
import AddCar from "./addCar/addCar";
import './garageHeader.css';

export default class GarageHeader {
    amount: number;
    startButton: HTMLButtonElement;
    resetButton: HTMLButtonElement;

    constructor(amount: number) {
        this.amount = amount;
        this.startButton = CreateElement.createButtonElement('button-header button-header_start', '▶');
        this.resetButton = CreateElement.createButtonElement('button-header button-header_reset', '⟳');
    }

    render(): HTMLDivElement {
        const headerGarage = CreateElement.createDivElement('header-garage');
        const addcar = new AddCar().render();
        const add100 = new AddHundriedCar().render();
        const totalCar = CreateElement.createParagraphElement('header-text', `Total car: ${this.amount}`);

        headerGarage.append(this.startButton, this.resetButton, addcar, add100, totalCar);
        return headerGarage;
    }
}