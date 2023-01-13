import { ICarResponse } from '../../../types/index';
import CreateElement from '../../../utils/CreateElement';
import Car from '../car/car';
import ChangeCar from '../changeCar/changeCar';
import ControlCar from '../controlCar/controlCar';
import './racingTrack.css';

export default class RacingTrack {
  car: ICarResponse;

  constructor(car: ICarResponse) {
    this.car = car;
  }

  render(): HTMLDivElement {
    const carContainer = CreateElement.createDivElement('car-track', '', '', this.car.id);
    const racingTrack = CreateElement.createDivElement('racing-track');
    const controlBlock = CreateElement.createDivElement('racing-track__control');
    const startBlock = CreateElement.createDivElement('racing-track__start');
    const centralBlock = CreateElement.createDivElement('racing-track__central');
    const finishBlock = CreateElement.createDivElement('racing-track__finish');
    const trackAnimation = CreateElement.createDivElement('racing-track__animation');
    const carRacing = new Car(this.car);
    const changeCar = new ChangeCar(carRacing).render();
    const controlCar = new ControlCar(carContainer, trackAnimation).render();
    carContainer.append(carRacing.render());

    trackAnimation.append(carContainer)
    controlBlock.append(changeCar, controlCar)
    racingTrack.append(controlBlock, startBlock, centralBlock, finishBlock, trackAnimation);
    return racingTrack;
  }
}
