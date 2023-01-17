import CreateElement from "../../../utils/CreateElement";
import './garageFotter.css'

export default class GarageFooter {
    nextPage: HTMLDivElement;
    prevPage: HTMLDivElement;

    constructor() {
        this.nextPage = CreateElement.createDivElement('garage__page_select');
        this.prevPage = CreateElement.createDivElement('garage__page_select');
    }

    render(): HTMLDivElement {
        const garageFooter = CreateElement.createDivElement('garage-footer');
        const paginationGarage = CreateElement.createDivElement('garage-pagination');
        garageFooter.append(paginationGarage);
        paginationGarage.append(this.nextPage, this.prevPage);
        return garageFooter;
    }
}