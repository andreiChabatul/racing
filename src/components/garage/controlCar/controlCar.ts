import CreateElement from '../../../utils/CreateElement';
import startIco from '../../../assets/img/startIco.png';
import resetIco from '../../../assets/img/resetIco.png';
import './controlCar.css';
import { driveCar, startEngine } from '../../../utils/apiLoader';

export default class ControlCar {
  containerCar: HTMLDivElement;
  trackAnimation: HTMLDivElement;
  startCar: HTMLButtonElement;
  resetCar: HTMLButtonElement;
  initAnimation: number = 0;

  constructor(containerCar: HTMLDivElement, trackAnimation: HTMLDivElement) {
    this.containerCar = containerCar;
    this.trackAnimation = trackAnimation;
    this.startCar = CreateElement.createButtonElement('car-control');
    this.resetCar = CreateElement.createButtonElement('car-control');
  }

  render(): HTMLDivElement {
    const controlCar = CreateElement.createDivElement('car-control-container');
    const startCarImg = CreateElement.createImgElement('car-control_img', startIco);
    const resetCarImg = CreateElement.createImgElement('car-control_img', resetIco);
    this.startCar.append(startCarImg);
    this.resetCar.append(resetCarImg);
    this.resetCar.disabled = true;
    this.resetCar.classList.toggle('control-button_disable');
    this.eventListner();
    controlCar.append(this.startCar, this.resetCar);
    return controlCar;
  }


  move() {



    const max = this.trackAnimation.offsetWidth - this.containerCar.offsetWidth - 5;
    console.log(this.trackAnimation.offsetWidth)
    if (this.initAnimation < max) {
      this.initAnimation += 2.56;
      this.containerCar.style.left = this.initAnimation + "px";


      requestAnimationFrame(() => this.move());
    }
  }

  eventListner() {
    this.startCar.addEventListener('click', () => this.startDriveCar())
  }


  async startDriveCar() {
    const id = Number(this.containerCar.id);
    const car = this.containerCar
    let idAnimation: number;
    let start: number;
    this.startCar.disabled = true;
    this.resetCar.disabled = false;
    this.startCar.classList.toggle('control-button_disable');
    this.resetCar.classList.toggle('control-button_disable');
    const { velocity, distance } = await startEngine(id);
    const time = Math.round(distance / velocity);
    const distanceHtml = this.trackAnimation.offsetWidth - this.containerCar.offsetWidth - 5;

    function step(timestamp: number) {
      start === undefined ? start = timestamp : '';
      const elapsed = timestamp - start;
      const count = Math.round(elapsed * (distanceHtml / time));
      car.style.transform = `translateX(${Math.min(count, distanceHtml)}px)`;
      count < distance ? idAnimation = requestAnimationFrame(step) : '';
    }

    idAnimation = window.requestAnimationFrame(step);
    const statusDrive = (await driveCar(id)).status;
    console.log(statusDrive)
    if (statusDrive === 500) {
      console.log(idAnimation)
      window.cancelAnimationFrame(idAnimation)
    }

  }






}