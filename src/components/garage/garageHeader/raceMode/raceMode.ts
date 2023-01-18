import { driveObj, ICarResponse, IControlCar, IRaceMode } from '../../../../types/index';
import { buttonActive, buttonDisable, parseUrl, shuffle, winnerProcessing } from '../../../../utils/additionalFunctions';
import { workCar } from '../../../../utils/apiLoader';
import CreateElement from '../../../../utils/CreateElement';
import winIco from '../../../../assets/img/winLogo.png';
import './raceMode.css';
import { store } from '../../../../store/store';
import { ACTIONS } from '../../../../CONST/const';

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
        buttonDisable();
        this.IsRace = true;
        this.carControl.forEach((element) => {
            element.containerCar.style.opacity = '.4';
        });
        processArray(this.carControl, this.resetButton);

        async function processArray(arr: IControlCar[], button: HTMLButtonElement) {
            shuffle(arr);
            arr.forEach((element) => {
                element.startCar.classList.add('control-button_disable');
            });

            for (let car of arr) {
                await car.setRaceMode(false);
                await car.startEngine();
            }
            button.classList.add('button-state_active');
            arr.forEach((element) => {
                element.driveCar();
            });
        }
    }

    resetRace() {
        this.winContainer.classList.remove('win-container_active');
        this.resetButton.classList.remove('button-state_active');
        buttonActive();
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

export default new RaceMode();
