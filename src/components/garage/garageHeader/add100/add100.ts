import CreateElement from "../../../../utils/CreateElement";
import './add100.css';

export default class AddHundriedCar {

    render(): HTMLDivElement {
        const addCar = CreateElement.createDivElement('add-100 button-header', '', '100');


        return addCar;
    }
}