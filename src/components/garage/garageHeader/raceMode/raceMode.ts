import {
  ICarResponse,
  IControlCar,
  IRaceMode,
  IResponceDriveCar,
} from '../../../../types/index';
import { buttonSwitch, winnerProcessing } from '../../../../utils/additionalFunctions';
import { workCar } from '../../../../utils/apiLoader';
import CreateElement from '../../../../utils/CreateElement';
import winIco from '../../../../assets/img/winLogo.png';
import './raceMode.css';
import store from '../../../../store/store';
import { ACTIONS } from '../../../../CONST/const';

class RaceMode implements IRaceMode {
  startButton: HTMLButtonElement;

  controlRace: HTMLDivElement;

  winContainer: HTMLDivElement;

  resetButton: HTMLButtonElement;

  carControl: IControlCar[];

  amountCar: number;

  IsRace: boolean;

  constructor() {
    this.carControl = [];
    this.IsRace = true;
    this.amountCar = 0;
    this.winContainer = CreateElement.createDivElement('win-container');
    this.controlRace = CreateElement.createDivElement('control-race-container');
    this.startButton = CreateElement.createButtonElement('button-header button-header_start button-state', 'RACE');
    this.resetButton = CreateElement.createButtonElement('button-header button-header_reset button-state', 'RES');
  }

  render(): HTMLDivElement {
    this.controlRace.append(this.startButton, this.resetButton, this.winContainer);
    this.startButton.addEventListener('click', () => this.startRace());
    this.resetButton.addEventListener('click', () => this.resetRace());
    this.winContainer.addEventListener('click', () => {
      this.resetRace();
      store.dispatch({
        type: ACTIONS.update,
      });
    });
    return this.controlRace;
  }

  pushCar(car: IControlCar) {
    this.carControl.push(car);
  }

  clearCar(): void {
    this.carControl = [];
  }

  async startRace() {
    this.IsRace = true;
    this.amountCar = 0;
    const startEngineCar: Promise<boolean>[] = [];
    const driveCarArr: Promise<IResponceDriveCar>[] = [];
    this.carControl.forEach((car) => {
      car.setRaceMode(false);
      startEngineCar.push(car.startEngineCar());
    });
    await Promise.all(startEngineCar);
    this.resetButton.classList.add('button-state_active');
    this.carControl.forEach((car) => {
      driveCarArr.push(car.driveCarStart());
    });
    const winnerCar = await Promise.race(driveCarArr);
    this.renderWin(winnerCar);
  }

  async resetRace() {
    const stopRace: Promise<boolean>[] = [];
    this.IsRace = false;
    this.winContainer.classList.remove('win-container_active');
    this.resetButton.classList.remove('button-state_active');
    this.carControl.forEach((car) => {
      stopRace.push(car.resetCarInit());
    });
    await Promise.all(stopRace);
  }

  setAmountCar() {
    this.amountCar += 1;
  }

  checkAmountCar() {
    this.amountCar -= 1;
    if (this.amountCar === 0) {
      this.carControl.forEach((car) => {
        car.setRaceMode(true);
      });
      buttonSwitch('active');
    }
  }

  async renderWin(winner: IResponceDriveCar) {
    if (this.IsRace) {
      this.winContainer.classList.add('win-container_active');
      const winImg = CreateElement.createImgElement('win-container__img', winIco);
      const infoCar = CreateElement.createSpanElement('win-container__info');
      this.winContainer.append(winImg, infoCar);
      winnerProcessing(winner);
      const winCar: ICarResponse = await workCar(winner.id, 'GET');
      infoCar.textContent = `Win car: ${winCar.name} Time: ${winner.time / 1000} sec.`;
    }
  }
}
const raceMode = new RaceMode();
export default raceMode;
