import CreateElement from "../../../utils/CreateElement";
import './garageFotter.css'

export default class GarageFooter {

    render(): HTMLDivElement {
        const garageFooter = CreateElement.createDivElement('garage-footer');

        return garageFooter;
    }
}