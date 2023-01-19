import {
  ICarResponse,
  IControlCar,
  IRaceMode,
  IResponceDriveCar,
} from '../../../../types/index';
import { buttonActive, parseUrl, winnerProcessing } from '../../../../utils/additionalFunctions';
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

  winId = '-1';

  IsWin = true;

  IsRace = false;

  constructor() {
    this.carControl = [];
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
        isCheck: true,
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

  async pushWin(response: Response): Promise<void> {
    if (this.IsWin && response.status === 200 && this.IsRace) {
      this.IsWin = false;
      this.winId = parseUrl(response.url);
      this.carControl.forEach((element) => {
        if (element.containerCar.id === this.winId) this.renderWin(this.winId);
      });
    }
  }

  async startRace() {
    this.resetRace();
    const startEngineCar: Promise<boolean>[] = [];
    const driveCarArr: Promise<IResponceDriveCar>[] = [];
    this.IsRace = true;
    this.carControl.forEach((car) => {
      car.startCar.classList.add('control-button_disable');
      car.setRaceMode(false);
      car.containerCar.style.opacity = '.4';
      startEngineCar.push(car.startEngineCar());
      car.startEngineCar();
    });
    await Promise.all(startEngineCar);
    this.resetButton.classList.add('button-state_active');
    this.carControl.forEach((car) => {
      driveCarArr.push(car.driveCarStart())
    })
    this.checkWinners(driveCarArr)
  }

  async checkWinners(driveCarArr: Promise<IResponceDriveCar>[]) {
    console.log(driveCarArr)
    const win = await Promise.race(driveCarArr);
    if (win.status === 500) {
      driveCarArr.shift();
      this.checkWinners(driveCarArr)
    } else if (win.status === 200) {
      console.log(win);
      await Promise.all(driveCarArr);
      buttonActive();
    }
  }

  resetRace() {
    this.winContainer.classList.remove('win-container_active');
    this.resetButton.classList.remove('button-state_active');
    this.IsRace = false;
    this.IsWin = true;
    this.carControl.forEach((element) => {
      element.resetCar.click();
      element.setRaceMode(true);
    });
  }

  async renderWin(id: string) {
    this.winContainer.classList.add('win-container_active');
    const winImg = CreateElement.createImgElement('win-container__img', winIco);
    const infoCar = CreateElement.createSpanElement('win-container__info');
    this.winContainer.append(winImg, infoCar);
    const winCar: ICarResponse = await workCar(id, 'GET');
    winnerProcessing(Number(id), 5);
    infoCar.textContent = `Win car: ${winCar.name} Time: ${5 / 1000} sec.`;
  }
}
const raceMode = new RaceMode();
export default raceMode;
