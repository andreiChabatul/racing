import CreateElement from '../../../utils/CreateElement';
import startIco from '../../../assets/img/startIco.png';
import resetIco from '../../../assets/img/resetIco.png';
import { driveCar, startEngine, stopEngine } from '../../../utils/apiLoader';
import ehgineBroken from '../../../assets/img/engineBroken.gif';
import { driveObj, IControlCar, IResponceDriveCar } from '../../../types/index';
import './controlCar.css';
import { buttonActive, buttonDisable } from '../../../utils/additionalFunctions';
import raceMode from '../garageHeader/raceMode/raceMode';

export default class ControlCar implements IControlCar {
  containerCar: HTMLDivElement;

  trackAnimation: HTMLDivElement;

  startCar: HTMLButtonElement;

  resetCar: HTMLButtonElement;

  engineImg: HTMLImageElement;

  headlight: HTMLDivElement;

  driveObj: driveObj;

  id: number;

  race: boolean;

  initAnimation = 0;

  IsFinish: boolean;

  constructor(containerCar: HTMLDivElement, trackAnimation: HTMLDivElement) {
    this.containerCar = containerCar;
    this.trackAnimation = trackAnimation;
    this.headlight = CreateElement.createDivElement('headlight');
    this.startCar = CreateElement.createButtonElement('car-control');
    this.resetCar = CreateElement.createButtonElement('car-control');
    this.engineImg = CreateElement.createImgElement('engine-broken', ehgineBroken);
    this.id = Number(this.containerCar.id);
    this.race = true;
    this.IsFinish = true;
    this.driveObj = {
      id: this.id,
      distanceHtml: 0,
      time: 0,
      distance: 0,
    };
  }

  render(): HTMLDivElement {
    const controlCar = CreateElement.createDivElement('car-control-container');
    const startCarImg = CreateElement.createImgElement('car-control_img', startIco);
    const resetCarImg = CreateElement.createImgElement('car-control_img', resetIco);
    this.startCar.append(startCarImg);
    this.resetCar.append(resetCarImg);
    this.resetCar.classList.add('control-button_disable');
    controlCar.append(this.startCar, this.resetCar);
    this.headlight = this.containerCar.childNodes[0].childNodes[1] as HTMLDivElement;
    this.startCar.addEventListener('click', () => this.startEngineCar());
    return controlCar;
  }

  async startEngineCar(): Promise<boolean> {
    if (this.IsFinish) {
      buttonDisable();
      this.IsFinish = false;
      const { velocity, distance } = await startEngine(this.id);
      this.driveObj.distance = distance;
      this.driveObj.time = Math.round(distance / velocity);
      this.driveObj.distanceHtml = this.trackAnimation.offsetWidth - this.containerCar.offsetWidth;
      this.containerCar.style.opacity = '1';
      this.headlight.style.opacity = '1';
      if (this.race) this.driveCarStart();
    }
    return true;
  }

  async driveCarStart(): Promise<IResponceDriveCar> {
    const { distanceHtml, time, distance } = this.driveObj;
    const car = this.containerCar;
    let idAnimation: number;
    let start: number;
    let stop = true;
    car.append(this.engineImg);
    this.onButtonStopGarage();

    function step(timestamp: number) {
      if (start === undefined) start = timestamp;
      const elapsed = timestamp - start;
      const count = Math.round(elapsed * (distanceHtml / time));
      car.style.transform = `translateX(${Math.min(count, distanceHtml)}px)`;
      if (count < distance) idAnimation = window.requestAnimationFrame(step);
    }
    idAnimation = window.requestAnimationFrame(step);
    this.resetCar.addEventListener('click', async () => {
      await stopEngine(this.id);
      this.offButtonStopGarage();
      stop = false;
      car.style.transform = 'translateX(0px)';
      this.stopCar(idAnimation);
    });

    const statusDrive = await driveCar(this.id);
    if (statusDrive.status === 500 && stop) this.engineImg.classList.add('engine-broken_active');
    this.IsFinish = true;
    this.stopCar(idAnimation);
    return {
      status: statusDrive.status,
      id: this.id,
      time: time
    }
  }

  async stopCar(idAnimation: number) {
    window.cancelAnimationFrame(idAnimation);
    if (this.IsFinish) {
      if (this.race) this.startCar.classList.remove('control-button_disable');
      this.headlight.style.opacity = '0';
    }
  }

  offButtonStopGarage(): void {
    this.resetCar.classList.add('control-button_disable');
    this.engineImg.classList.remove('engine-broken_active');
  }

  onButtonStopGarage(): void {
    this.startCar.classList.add('control-button_disable');
    this.resetCar.classList.add('control-button_disable');
    if (this.race) this.resetCar.classList.remove('control-button_disable');
  }

  async setRaceMode(value: boolean): Promise<void> {
    this.race = value;
  }
}
