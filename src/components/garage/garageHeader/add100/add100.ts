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
    addCar.addEventListener('click', () => {
      const randomCar: IUpdateCar[] = [];
      for (let i = 0; i < MAX_RANDOM; i += 1) {
        randomCar.push(this.createRandomCar());
      }
      this.addRandomCar(randomCar);
    });
    return addCar;
  }

  async addRandomCar(cars: IUpdateCar[]) {
    for (let i = 0; i < cars.length; i += 1) {
      await createCar(cars[i]);
    }
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
