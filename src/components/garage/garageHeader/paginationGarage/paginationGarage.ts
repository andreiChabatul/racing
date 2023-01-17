import { MAX_LIMIT_GARAGE } from "../../../../CONST/const";
import { store } from "../../../../store/store";
import { nextPageGarage } from "../../../../utils/additionalFunctions";
import CreateElement from "../../../../utils/CreateElement";
import './paginationGarage.css'

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
    const actualState = store.getState();

    this.nextPage.addEventListener('click', () => nextPageGarage(actualState.garagePage));
  }

  update() {
    const actualState = store.getState();
    this.amountPage.textContent = `${actualState.garagePage}/${actualState.amountCar / MAX_LIMIT_GARAGE}`
  }
}