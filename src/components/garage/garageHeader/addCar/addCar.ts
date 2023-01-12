import CreateElement from "../../../../utils/CreateElement";
import './addCar.css';

export default class AddCar {

    render(): HTMLDivElement {
        const addCar = CreateElement.createDivElement('add-car button-header', '', '+');


        return addCar;
    }
}