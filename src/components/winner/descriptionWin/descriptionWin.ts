import { ICarResponse, ICarWin } from '../../../types/index';
import CreateElement from '../../../utils/CreateElement';
import carWin from '../../../assets/img/carWin.png';
import './descriptionWin.css';
import { workCar } from '../../../utils/apiLoader';

export default class DescriptionWin {
  infoWin: ICarWin;

  descCar: HTMLDivElement;

  descName: HTMLSpanElement;

  numberCar: number;

  constructor(infoWin: ICarWin, numberCar: number) {
    this.infoWin = infoWin;
    this.numberCar = numberCar;
    this.descCar = CreateElement.createDivElement('description-container__car');
    this.descName = CreateElement.createSpanElement('description-container__text');
  }

  render(): HTMLDivElement {
    const descriptionContainer = CreateElement.createDivElement('description-container');
    const descItem = CreateElement.createSpanElement('description-container__text', this.numberCar);
    const descCarImg = CreateElement.createImgElement('description-container__car_img', carWin);
    const descWin = CreateElement.createSpanElement('description-container__text', this.infoWin.wins);
    const descTime = CreateElement.createSpanElement('description-container__text', `${this.infoWin.time} sec.`);
    this.descCar.append(descCarImg);
    descriptionContainer.append(descItem, this.descCar, this.descName, descWin, descTime);
    this.getCarInfo();
    return descriptionContainer;
  }

  async getCarInfo() {
    const car: ICarResponse = await workCar(String(this.infoWin.id), 'GET');
    this.descName.textContent = car.name;
    this.descCar.style.background = car.color;
  }
}
