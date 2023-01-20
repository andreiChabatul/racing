import { MAX_LIMIT_WINNERS } from '../../../CONST/const';
import store from '../../../store/store';
import { pagination } from '../../../utils/additionalFunctions';
import { getWinners } from '../../../utils/apiLoader';
import CreateElement from '../../../utils/CreateElement';
import './paginationWinner.css';

export default class PaginationWinner {
  nextPage: HTMLDivElement;

  prevPage: HTMLDivElement;

  amountPage: HTMLSpanElement;

  constructor() {
    this.amountPage = CreateElement.createSpanElement('winner-pagination__text');
    this.nextPage = CreateElement.createDivElement('button-winner button-state', '', 'ᐅ');
    this.prevPage = CreateElement.createDivElement('button-winner button-state', '', 'ᐊ');
  }

  render(): HTMLDivElement {
    store.subscribe(() => this.update());
    const paginationWinners = CreateElement.createDivElement('winner-pagination');
    paginationWinners.append(this.prevPage, this.amountPage, this.nextPage);
    this.eventListener();
    return paginationWinners;
  }

  eventListener() {
    this.nextPage.addEventListener('click', () => pagination('winnersPage', 'next'));
    this.prevPage.addEventListener('click', () => pagination('winnersPage', 'prev'));
  }

  async update() {
    const actualState = store.getState();
    const amountWinner = (await getWinners(1, 1, '', '')).count;
    const maxPage = Math.ceil(Number(amountWinner) / MAX_LIMIT_WINNERS);
    this.nextPage.classList.remove('button_disable');
    this.prevPage.classList.remove('button_disable');
    if (actualState.winnersPage === 1) this.prevPage.classList.add('button_disable');
    if (actualState.winnersPage === maxPage || maxPage === 0) this.nextPage.classList.add('button_disable');
    this.amountPage.textContent = `${actualState.winnersPage}/${maxPage}`;
  }
}
