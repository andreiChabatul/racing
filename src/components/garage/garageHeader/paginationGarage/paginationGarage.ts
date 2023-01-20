import { MAX_LIMIT_GARAGE } from '../../../../CONST/const';
import store from '../../../../store/store';
import { pagination } from '../../../../utils/additionalFunctions';
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
    this.nextPage = CreateElement.createDivElement('button-header header-pagination button-state', '', 'next page');
    this.prevPage = CreateElement.createDivElement('button-header header-pagination button-state', '', 'prev page');
  }

  render(): HTMLDivElement {
    store.subscribe(() => this.update());
    const paginationGarage = CreateElement.createDivElement('garage-pagination');
    paginationGarage.append(this.prevPage, this.amountPage, this.nextPage);
    this.eventListener();
    return paginationGarage;
  }

  eventListener() {
    this.nextPage.addEventListener('click', () => pagination('garagePage', 'next'));
    this.prevPage.addEventListener('click', () => pagination('garagePage', 'prev'));
  }

  update() {
    const actualState = store.getState();
    const maxPage = Math.ceil(actualState.amountCar / MAX_LIMIT_GARAGE);
    this.nextPage.classList.remove('button_disable');
    this.prevPage.classList.remove('button_disable');
    if (actualState.garagePage === 1) this.prevPage.classList.add('button_disable');
    if (actualState.garagePage === maxPage) this.nextPage.classList.add('button_disable');
    this.amountPage.textContent = `${actualState.garagePage}/${maxPage}`;
  }
}
