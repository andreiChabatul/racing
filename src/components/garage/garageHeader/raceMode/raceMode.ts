import {
  driveObj,
  ICarResponse,
  IControlCar,
  IRaceMode,
} from '../../../../types/index';
import { parseUrl, shuffle, winnerProcessing } from '../../../../utils/additionalFunctions';
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

  carRace: number[];

  winId = '-1';

  IsWin = true;

  IsRace = false;

  constructor() {
    this.carControl = [];
    this.carRace = [];
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

  pushRaceCar(value: number) {
    this.carRace.push(value);
  }

  getRaceCar(): number[] {
    return this.carRace;
  }

  clearCar(): void {
    this.carControl = [];
  }

  async pushWin(response: Response): Promise<void> {
    if (this.IsWin && response.status === 200 && this.IsRace) {
      this.IsWin = false;
      this.winId = parseUrl(response.url);
      this.carControl.forEach((element) => {
        if (element.containerCar.id === this.winId) this.renderWin(this.winId, element.driveObj);
      });
    }
  }

  async startRace() {
    this.resetRace();
    this.IsRace = true;
    this.carControl.forEach((element) => {
      element.containerCar.style.opacity = '.4';
    });

    async function processArray(arr: IControlCar[], button: HTMLButtonElement) {
      shuffle(arr);
      arr.forEach((element) => {
        element.startCar.classList.add('control-button_disable');
      });

      for (const car of arr) {
        await car.setRaceMode(false);
        await car.startEngine();
      }
      button.classList.add('button-state_active');
      arr.forEach((element) => {
        element.driveCar();
      });
    }

    processArray(this.carControl, this.resetButton);
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

  async renderWin(id: string, car: driveObj) {
    this.winContainer.classList.add('win-container_active');
    const winImg = CreateElement.createImgElement('win-container__img', winIco);
    const infoCar = CreateElement.createSpanElement('win-container__info');
    this.winContainer.append(winImg, infoCar);
    const winCar: ICarResponse = await workCar(id, 'GET');
    winnerProcessing(Number(id), car.time);
    infoCar.textContent = `Win car: ${winCar.name} Time: ${car.time / 1000} sec.`;
  }
}
const raceMode = new RaceMode();
export default raceMode;
