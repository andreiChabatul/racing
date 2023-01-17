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
    singleRace: HTMLDivElement;
    amount = 0;

    constructor() {
        this.totalCar = CreateElement.createParagraphElement('header-text', `Total car: ${this.amount}`);
        this.singleRace = CreateElement.createDivElement('single-race');
    }

    render(): HTMLDivElement {
        store.subscribe(() => this.update());
        const headerGarage = CreateElement.createDivElement('header-garage');
        const pagination = new PaginationGarage(Number(this.amount)).render();
        const addcar = new AddCar().render();
        const add100 = new AddHundriedCar().render();
        headerGarage.append(RaceMode.render(), addcar, add100, pagination, this.totalCar, this.singleRace);
        return headerGarage;
    }

    update(): void {
        const actualState = store.getState();
        this.singleRace.classList.remove('single-race_active');
        actualState.IsRaceSingle ? this.singleRace.classList.add('single-race_active') : '';
        this.totalCar.textContent = `Total car: ${actualState.amountCar}`;
    }
}
