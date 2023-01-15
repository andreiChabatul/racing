import { IControlCar, IRaceMode } from "../../../../types/index";
import { parseUrl } from "../../../../utils/additionalFunctions";
import { driveCar } from "../../../../utils/apiLoader";
import CreateElement from "../../../../utils/CreateElement";
import './raceMode.css';

export class RaceMode implements IRaceMode {
    startButton: HTMLButtonElement;
    resetButton: HTMLButtonElement;
    carControl: IControlCar[];
    winId = '-1';
    IsWin = true;
    promiseWin: [];

    constructor() {
        this.carControl = [];
        this.promiseWin = [];
        this.startButton = CreateElement.createButtonElement('button-header button-header_start', 'RACE');
        this.resetButton = CreateElement.createButtonElement('button-header button-header_reset', 'RES');
    }

    render(): HTMLDivElement {
        const controlRace = CreateElement.createDivElement('control-race-container');
        controlRace.append(this.startButton, this.resetButton);
        this.startButton.addEventListener('click', () => this.startRace());
        this.resetButton.addEventListener('click', () => this.resetRace());
        return controlRace;
    }

    pushCar(car: IControlCar) {
        this.carControl.push(car);
    }

    async pushWin(car) {
        if (this.IsWin && car.status === 200) {
            this.IsWin = false;
            this.winId = parseUrl(car.url);
            this.carControl.forEach(element => {
                if (element.containerCar.id === this.winId) {
                    console.log(element, '3213')
                }
            });
        }



    }

    async startRace() {
        const promiseArr = [];
        this.resetRace();
        this.carControl.forEach(element => {
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
            arr.forEach(element => {
                element.driveCar();

            });

        }

    }

    resetRace() {
        this.carControl.forEach(element => {
            element.resetCar.click();
            element.setRaceMode(true);
        });
    }
}

export default new RaceMode();
