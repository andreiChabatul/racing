import { ACTIONS } from '../../../../../CONST/const';
import store from '../../../../../store/store';
import { IUpdateCar } from '../../../../../types/index';
import { createCar } from '../../../../../utils/apiLoader';
import CreateElement from '../../../../../utils/CreateElement';
import './inputNewCar.css';

export default class InputNewCar {
  containerInput: HTMLDivElement;

  inputTextCar: HTMLInputElement;

  inputColorCar: HTMLInputElement;

  close: HTMLDivElement;

  addCar: HTMLButtonElement;

  newCar: IUpdateCar;

  constructor() {
    this.newCar = {
      name: '',
      color: '#000000',
    };
    this.containerInput = CreateElement.createDivElement('new-car-input-container');
    this.inputTextCar = CreateElement.createInputElement('new-car__input_text', 'Enter name', '', 'text');
    this.inputColorCar = CreateElement.createInputElement('new-car__input_color', '', '', 'color', '#000000');
    this.addCar = CreateElement.createButtonElement('button-car-new', 'add new car');
    this.close = CreateElement.createDivElement('close-change');
  }

  render(): HTMLDivElement {
    const containerAddInput = CreateElement.createDivElement('new-car_input');
    const formNewText = CreateElement.createFormElement('new-car__form');
    const formNewColor = CreateElement.createFormElement('new-car__form');
    const spanNewText = CreateElement.createSpanElement('new-car__span', 'Change name car: ');
    const spanNewColor = CreateElement.createSpanElement('new-car__span', 'Change color car: ');
    formNewText.append(spanNewText, this.inputTextCar);
    formNewColor.append(spanNewColor, this.inputColorCar);
    containerAddInput.append(this.containerInput, this.close);
    this.containerInput.append(formNewText, formNewColor, this.addCar);
    this.eventListner();
    return containerAddInput;
  }

  display() {
    this.openAndCloseMenu();
  }

  async addCarServerInfoCar() {
    if (this.newCar.name === '') this.newCar.name = 'default car';
    await createCar(this.newCar);
    store.dispatch({
      type: ACTIONS.update,
      isCheck: true,
    });
    this.inputColorCar.value = '#000000';
    this.inputTextCar.value = '';
    this.newCar.color = '#000000';
    this.newCar.name = '';
    this.openAndCloseMenu();
  }

  openAndCloseMenu() {
    this.containerInput.classList.toggle('new-car-input-container_active');
    this.close.classList.toggle('close-change_active');
  }

  newColor() {
    this.newCar.color = this.inputColorCar.value;
  }

  newText() {
    this.newCar.name = this.inputTextCar.value;
  }

  eventListner() {
    this.inputColorCar.addEventListener('input', () => this.newColor());
    this.inputTextCar.addEventListener('input', () => this.newText());
    this.close.addEventListener('click', () => this.openAndCloseMenu());
    this.addCar.addEventListener('click', () => this.addCarServerInfoCar());
  }
}
