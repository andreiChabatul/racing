import { MAX_LIMIT_GARAGE } from '../../../../CONST/const';
import { store } from '../../../../store/store';
import { nextPageGarage, prevPageGarage } from '../../../../utils/additionalFunctions';
import CreateElement from '../../../../utils/CreateElement';
import './paginationGarage.css';

export default class PaginationGarage {
    nextPage: HTMLDivElement;
    prevPage: HTMLDivElement;
    amountPage: HTMLSpanElement;
    amountCar: number;

    constructor(amountCar: number) {
        this.amountCar = amountCar;
        this.amountPage = CreateElement.createSpanElement('header-pagination__text');
        this.nextPage = CreateElement.createDivElement('button-header header-pagination', '', 'next page');
        this.prevPage = CreateElement.createDivElement('button-header header-pagination', '', 'prev page');
    }

    render(): HTMLDivElement {
        store.subscribe(() => this.update());
        const paginationGarage = CreateElement.createDivElement('garage-pagination');
        paginationGarage.append(this.prevPage, this.amountPage, this.nextPage);
        this.eventListener();
        return paginationGarage;
    }

    eventListener() {
        this.nextPage.addEventListener('click', nextPageGarage);
        this.prevPage.addEventListener('click', prevPageGarage);
    }

    update() {
        const actualState = store.getState();
        const maxPage = Math.ceil(actualState.amountCar / MAX_LIMIT_GARAGE);
        this.nextPage.classList.remove('button_disable');
        this.prevPage.classList.remove('button_disable');
        actualState.garagePage === 1 ? this.prevPage.classList.add('button_disable') : '';
        actualState.garagePage === maxPage ? this.nextPage.classList.add('button_disable') : '';
        this.amountPage.textContent = `${actualState.garagePage}/${maxPage}`;
    }
}
