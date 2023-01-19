import CreateElement from '../../utils/CreateElement';
import logoIco from '../../assets/img/logoIco.png';
import garageIco from '../../assets/img/garageIcoHeader.png';
import winnerIco from '../../assets/img/winnerIco.png';
import { store } from '../../store/store';
import './header.css';
import { ACTIONS } from '../../CONST/const';

export default class Header {
    buttonGarage: HTMLDivElement;
    buttonWinner: HTMLDivElement;

    constructor() {
        this.buttonGarage = CreateElement.createDivElement('header-button_control');
        this.buttonWinner = CreateElement.createDivElement('header-button_control button-state');
    }

    render(): HTMLDivElement {
        store.subscribe(() => this.update());
        const header = CreateElement.createDivElement('header-wraper');
        const buttonContainer = CreateElement.createDivElement('header-wraper__buttons');
        const logo = CreateElement.createDivElement('header-wraper__logo');
        const logoImg = CreateElement.createImgElement('header-logo__img', logoIco);
        const garageImg = CreateElement.createImgElement('header-control__img', garageIco);
        const garageText = CreateElement.createSpanElement('header-control__text', 'garage');
        const winnerImg = CreateElement.createImgElement('header-control__img', winnerIco);
        const winnerText = CreateElement.createSpanElement('header-control__text', 'winner');
        logo.append(logoImg);
        this.buttonGarage.append(garageImg, garageText);
        this.buttonWinner.append(winnerImg, winnerText);
        buttonContainer.append(this.buttonGarage, this.buttonWinner);
        header.append(buttonContainer, logo);
        this.eventListner();
        return header;
    }

    eventListner() {
        this.buttonWinner.addEventListener('click', () => store.dispatch({ type: ACTIONS.winner }));
        this.buttonGarage.addEventListener('click', () => store.dispatch({ type: ACTIONS.garage }));
    }

    update() {
        const actualStore = store.getState();
        this.buttonWinner.classList.remove('header-button_control_active');
        this.buttonGarage.classList.remove('header-button_control_active');
        actualStore.display === 'winner'
            ? this.buttonWinner.classList.add('header-button_control_active')
            : this.buttonGarage.classList.add('header-button_control_active');
    }
}
