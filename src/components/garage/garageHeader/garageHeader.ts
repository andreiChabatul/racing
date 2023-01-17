import { store } from '../../../store/store';
import { IComponentHeader } from '../../../types/index';
import CreateElement from '../../../utils/CreateElement';
import AddHundriedCar from './add100/add100';
import AddCar from './addCar/addCar';
import './garageHeader.css';
import PaginationGarage from './paginationGarage/paginationGarage';
import RaceMode from './raceMode/raceMode';

export default class GarageHeader implements IComponentHeader {
    totalCar: HTMLParagraphElement;
    amount = 0;

    constructor() {
        this.totalCar = CreateElement.createParagraphElement('header-text', `Total car: ${this.amount}`);
    }

    render(): HTMLDivElement {
        store.subscribe(() => this.update());
        const headerGarage = CreateElement.createDivElement('header-garage');
        const pagination = new PaginationGarage(Number(this.amount)).render();
        const addcar = new AddCar().render();
        const add100 = new AddHundriedCar().render();
        headerGarage.append(RaceMode.render(), addcar, add100, pagination, this.totalCar);
        return headerGarage;
    }

    update(): void {
        const actualState = store.getState();
        this.totalCar.textContent = `Total car: ${actualState.amountCar}`;
    }
}
