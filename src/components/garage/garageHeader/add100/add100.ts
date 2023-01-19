import { ACTIONS, MAX_RANDOM } from '../../../../CONST/const';
import store from '../../../../store/store';
import { IUpdateCar } from '../../../../types/index';
import { generateRandomColor, generateRandomName } from '../../../../utils/additionalFunctions';
import { createCar } from '../../../../utils/apiLoader';
import CreateElement from '../../../../utils/CreateElement';
import './add100.css';

export default class AddHundriedCar {
  render(): HTMLDivElement {
    const addCar = CreateElement.createDivElement('add-100 button-header button-state', '', '100');
    addCar.addEventListener('click', () => { this.addCarRandom(); });
    return addCar;
  }

  async addCarRandom() {
    const randomCar = [];
    for (let i = 0; i < MAX_RANDOM; i += 1) {
      randomCar.push(createCar(this.createRandomCar()));
    }
    await Promise.all(randomCar);
    store.dispatch({
      type: ACTIONS.update,
      isCheck: true,
    });
  }

  createRandomCar(): IUpdateCar {
    return {
      name: generateRandomName(),
      color: generateRandomColor(),
    };
  }
}
