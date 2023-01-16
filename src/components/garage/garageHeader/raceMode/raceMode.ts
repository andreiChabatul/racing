import { driveObj, ICarResponse, IControlCar, IRaceMode } from '../../../../types/index';
import { parseUrl, winnerProcessing } from '../../../../utils/additionalFunctions';
import { workCar } from '../../../../utils/apiLoader';
import CreateElement from '../../../../utils/CreateElement';
import winIco from '../../../../assets/img/winLogo.png';
import './raceMode.css';

export class RaceMode implements IRaceMode {
    startButton: HTMLButtonElement;
    controlRace: HTMLDivElement;
    winContainer: HTMLDivElement;
    resetButton: HTMLButtonElement;
    carControl: IControlCar[];
    winId = '-1';
    IsWin = true;
    IsRace = false;
    dataRes: number;

    constructor() {
        this.dataRes = 0;
        this.carControl = [];
        this.winContainer = CreateElement.createDivElement('win-container');
        this.controlRace = CreateElement.createDivElement('control-race-container');
        this.startButton = CreateElement.createButtonElement('button-header button-header_start', 'RACE');
        this.resetButton = CreateElement.createButtonElement('button-header button-header_reset', 'RES');
    }

    render(): HTMLDivElement {
        this.controlRace.append(this.startButton, this.resetButton, this.winContainer);
        this.startButton.addEventListener('click', () => this.startRace());
        this.resetButton.addEventListener('click', () => this.resetRace());
        this.winContainer.addEventListener('click', () => this.resetRace());
        return this.controlRace;
    }

    pushCar(car: IControlCar) {
        this.carControl.push(car);
    }

    async pushWin(response: Response, dataResCar: number): Promise<void> {
        if (this.IsWin && response.status === 200 && this.IsRace && dataResCar > this.dataRes) {
            this.IsWin = false;
            this.winId = parseUrl(response.url);
            this.carControl.forEach((element) => {
                element.containerCar.id === this.winId ? this.renderWin(this.winId, element.driveObj) : '';
            });
        }
    }

    async startRace() {
        this.dataRes = Date.now();
        this.resetRace();
        this.IsRace = true;
        this.carControl.forEach((element) => {
            element.containerCar.style.opacity = '.4';
            element.startCar.classList.add('control-button_disable');
            element.changeCar.classList.add('control-button_disable');
            element.resetCar.classList.add('control-button_disable');
        });
        processArray(this.carControl);

        async function processArray(arr: IControlCar[]) {
            for (let i = 0; i < arr.length; i++) {
                await arr[i].setRaceMode(false);
                await arr[i].startEngine();
            }
            arr.forEach((element) => {
                element.driveCar();
            });
        }
    }

    resetRace() {
        this.winContainer.classList.remove('win-container_active');
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
        winnerProcessing(id, car.time);
        infoCar.textContent = `Win car: ${winCar.name} Time: ${car.time / 1000} sec.`;
    }
}

export default new RaceMode();
