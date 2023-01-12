import CreateElement from '../../../utils/CreateElement';
import startIco from '../../../assets/img/startIco.png';
import resetIco from '../../../assets/img/resetIco.png';
import './controlCar.css';

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
    this.startCar.addEventListener('click', () => this.move())
    controlCar.append(this.startCar, this.resetCar);
    return controlCar;
  }


  move() {
    const car = {
      velocity: 64,
      distance: 500000
    };


    const max = this.trackAnimation.offsetWidth - this.containerCar.offsetWidth - 5;
    console.log(this.trackAnimation.offsetWidth)
    if (this.initAnimation < max) {
      this.initAnimation += 2.56;
      this.containerCar.style.left = this.initAnimation + "px";


      requestAnimationFrame(() => this.move());
    }
  }




}