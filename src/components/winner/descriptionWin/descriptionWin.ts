import { ICarResponse, ICarWin } from '../../../types/index';
import CreateElement from '../../../utils/CreateElement';
import carWin from '../../../assets/img/carWin.png';
import './descriptionWin.css';
import { workCar } from '../../../utils/apiLoader';

export default class DescriptionWin {
  infoWin: ICarWin;

  numberCar: number;

  constructor(infoWin: ICarWin, numberCar: number) {
    console.log(infoWin)
    this.infoWin = infoWin;
    this.numberCar = numberCar;
  }

  render(): HTMLDivElement {
    const descriptionContainer = CreateElement.createDivElement('description-container');
    const descItem = CreateElement.createSpanElement('description-container__text', this.numberCar);
    const descCar = CreateElement.createDivElement('description-container__car');
    const descCarImg = CreateElement.createImgElement('description-container__car_img', carWin);
    const descName = CreateElement.createSpanElement('description-container__text', this.car.name);
    const descWin = CreateElement.createSpanElement('description-container__text', this.infoWin.wins);
    const descTime = CreateElement.createSpanElement('description-container__text', `${this.infoWin.time} sec.`);
    descCar.style.background = this.car.color;
    descCar.append(descCarImg);
    descriptionContainer.append(descItem, descCar, descName, descWin, descTime);
    this.getCarInfo()
    return descriptionContainer;
  }

  async getCarInfo() {
    const car: ICarResponse = await workCar(String(this.infoWin), 'GET');
    console.log(car)
  }
}
