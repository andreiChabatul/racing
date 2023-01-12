import { ICar, ICarResponse } from "../../types/index";
import CreateElement from "../../utils/CreateElement";
import carIco from '../../assets/img/carFour.png'
import './car.css'

export default class Car implements ICar {
  car: ICarResponse;
  carElement: HTMLDivElement;

  constructor(car: ICarResponse) {
    this.car = car;
    this.carElement = CreateElement.createDivElement('car');
  }

  render(): HTMLDivElement {
    const carImg = CreateElement.createImgElement('car-ico', carIco);
    this.carElement.append(carImg);
    this.carElement.style.background = this.car.color;
    return this.carElement;
  }

  update(): void {
    this.carElement.style.background = this.car.color;
  }
}