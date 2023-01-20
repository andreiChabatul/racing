import CreateElement from '../../../utils/CreateElement';
import startIco from '../../../assets/img/startIco.png';
import resetIco from '../../../assets/img/resetIco.png';
import { driveCar, startEngine, stopEngine } from '../../../utils/apiLoader';
import ehgineBroken from '../../../assets/img/engineBroken.gif';
import { driveObj, IControlCar, IResponceDriveCar } from '../../../types/index';
import './controlCar.css';
import { buttonSwitch } from '../../../utils/additionalFunctions';
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
    this.containerCar.append(this.engineImg);
    this.startCar.append(startCarImg);
    this.resetCar.append(resetCarImg);
    this.resetCar.classList.add('control-button_disable');
    controlCar.append(this.startCar, this.resetCar);
    this.headlight = this.containerCar.childNodes[0].childNodes[1] as HTMLDivElement;
    this.startCar.addEventListener('click', () => this.startEngineCar());
    return controlCar;
  }

  async startEngineCar(): Promise<boolean> {
    buttonSwitch('disable');
    this.onButtonStopGarage();
    if (this.IsFinish) {
      this.IsFinish = false;
      this.containerCar.style.opacity = '.5';
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
    this.headlight.style.opacity = '0';
    raceMode.checkAmountCar();
    if (statusDrive.status === 500 && stop) this.engineImg.classList.add('engine-broken_active');
    this.IsFinish = true;
    this.stopCar(idAnimation);
    return new Promise((resolve) => {
      if (statusDrive.status === 200) {
        resolve({
          id: this.id,
          time,
        });
      }
    });
  }

  async stopCar(idAnimation: number) {
    window.cancelAnimationFrame(idAnimation);
    if (this.IsFinish && this.race) {
      buttonSwitch('active');
      this.startCar.classList.remove('control-button_disable');
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

  setRaceMode(value: boolean): void {
    this.startCar.classList.remove('control-button_disable');
    this.race = value;
  }
}
