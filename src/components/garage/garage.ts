import { IComponentHeader } from "../../types/index";
import { getCars } from "../../utils/apiLoader";
import CreateElement from "../../utils/CreateElement";
import './garage.css'
import GarageFooter from "./garageFooter/garageFooter";
import GarageHeader from "./garageHeader/garageHeader";
import RacingTrack from "./racingTrack/racingTrack";

export default class Garage {
    cartsContainer: HTMLDivElement;
    headerGarage: IComponentHeader;

    constructor() {
        this.cartsContainer = CreateElement.createDivElement('cars-container');
        this.headerGarage = new GarageHeader();
    }

    render(): HTMLElement {
        const garageContainer = CreateElement.createDivElement('garage-container');
        const footerGarage = new GarageFooter().render();
        garageContainer.append(this.headerGarage.render(), this.cartsContainer, footerGarage);
        this.update();
        return garageContainer;
    }

    fill() {
        const response = getCars(1);
        response.then(data => {
            data.amount ? this.headerGarage.update(data.amount) : '';
            data.items.forEach(element => {
                this.cartsContainer.append(new RacingTrack(element).render());
            });
        });
    }

    clear() {
        this.cartsContainer.innerHTML = '';
    }

    update() {
        this.clear();
        this.fill();
    }

}