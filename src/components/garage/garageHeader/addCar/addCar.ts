import CreateElement from '../../../../utils/CreateElement';
import InputNewCar from './inputNewCar/inputNewCar';
import './addCar.css';

export default class AddCar {
  render(): HTMLDivElement {
    const addNewContainer = CreateElement.createDivElement('add-car__container');
    const addCar = CreateElement.createDivElement('add-car button-header button-state', '', '+');
    const inputContainer = new InputNewCar();
    addNewContainer.append(addCar, inputContainer.render());
    addCar.addEventListener('click', () => inputContainer.display());
    return addNewContainer;
  }
}
