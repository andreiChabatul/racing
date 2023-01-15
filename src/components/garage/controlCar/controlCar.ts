import CreateElement from '../../../utils/CreateElement';
import startIco from '../../../assets/img/startIco.png';
import resetIco from '../../../assets/img/resetIco.png';
import { driveCar, startEngine, stopEngine } from '../../../utils/apiLoader';
import ehgineBroken from '../../../assets/img/engineBroken.gif';
import { driveObj, IControlCar } from '../../../types/index';
import './controlCar.css';
import RaceMode from '../garageHeader/raceMode/raceMode';

export default class ControlCar implements IControlCar {
    containerCar: HTMLDivElement;
    trackAnimation: HTMLDivElement;
    changeCar: HTMLDivElement;
    startCar: HTMLButtonElement;
    resetCar: HTMLButtonElement;
    engineImg: HTMLImageElement;
    disableHeader: HTMLDivElement;
    driveObj: driveObj;
    id: number;
    race: boolean;
    initAnimation = 0;

    constructor(containerCar: HTMLDivElement, trackAnimation: HTMLDivElement, changeCar: HTMLDivElement) {
        this.containerCar = containerCar;
        this.trackAnimation = trackAnimation;
        this.changeCar = changeCar;
        this.startCar = CreateElement.createButtonElement('car-control');
        this.resetCar = CreateElement.createButtonElement('car-control');
        this.engineImg = CreateElement.createImgElement('engine-broken', ehgineBroken);
        this.disableHeader = CreateElement.createDivElement('header-disable');
        this.id = Number(this.containerCar.id);
        this.race = true;
        this.driveObj = {
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
        controlCar.append(this.startCar, this.resetCar, this.disableHeader);
        this.startCar.addEventListener('click', () => {
            this.disableHeader.classList.add('header-disable_active');
            this.startEngine();
        });
        return controlCar;
    }

    async startEngine(): Promise<void> {
        const { velocity, distance } = await startEngine(this.id);
        this.driveObj.distance = distance;
        this.driveObj.time = Math.round(distance / velocity);
        this.driveObj.distanceHtml = this.trackAnimation.offsetWidth - this.containerCar.offsetWidth - 5;
        this.containerCar.style.opacity = '1';
        this.race ? this.driveCar() : '';
    }

    async driveCar(): Promise<void> {
        const { distanceHtml, time, distance } = this.driveObj;
        const car = this.containerCar;
        let idAnimation: number;
        let start: number;
        let stop = true;
        car.append(this.engineImg);
        this.onButtonStopGarage();

        function step(timestamp: number) {
            start === undefined ? (start = timestamp) : '';
            const elapsed = timestamp - start;
            const count = Math.round(elapsed * (distanceHtml / time));
            car.style.transform = `translateX(${Math.min(count, distanceHtml)}px)`;
            count < distance ? (idAnimation = requestAnimationFrame(step)) : '';
        }
        idAnimation = window.requestAnimationFrame(step);
        this.resetCar.addEventListener('click', () => {
            this.disableHeader.classList.remove('header-disable_active');
            stop = false;
            car.style.transform = 'translateX(0px)';
            stopCar(idAnimation, this.id);
            this.offButtonStopGarage();
        });

        const statusDrive = await driveCar(this.id);
        statusDrive ? this.disableHeader.classList.remove('header-disable_active') : '';
        if (statusDrive.status === 500 && stop) {
            stopCar(idAnimation, this.id);
            this.engineImg.classList.add('engine-broken_active');
        }

        async function stopCar(idAnimation: number, id: number) {
            window.cancelAnimationFrame(idAnimation);
            await stopEngine(id);
        }
    }

    offButtonStopGarage(): void {
        this.engineImg.classList.remove('engine-broken_active');
        this.startCar.classList.remove('control-button_disable');
        this.resetCar.classList.add('control-button_disable');
        this.changeCar.classList.remove('control-button_disable');
    }

    onButtonStopGarage(): void {
        this.startCar.classList.add('control-button_disable');
        this.changeCar.classList.add('control-button_disable');
        this.resetCar.classList.remove('control-button_disable');
    }

    async setRaceMode(value: boolean): Promise<void> {
        this.race = value;
    }

}
