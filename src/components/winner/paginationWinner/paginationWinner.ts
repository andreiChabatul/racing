import { MAX_LIMIT_WINNERS } from '../../../CONST/const';
import { store } from '../../../store/store';
import { nextPage, prevPage } from '../../../utils/additionalFunctions';
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
        this.nextPage.addEventListener('click', () => nextPage('winnersPage'));
        this.prevPage.addEventListener('click', () => prevPage('winnersPage'));
    }

    update() {
        const actualState = store.getState();
        const maxPage = Math.ceil(actualState.amountWinner / MAX_LIMIT_WINNERS);
        this.nextPage.classList.remove('button_disable');
        this.prevPage.classList.remove('button_disable');
        actualState.winnersPage === 1 ? this.prevPage.classList.add('button_disable') : '';
        actualState.winnersPage === maxPage ? this.nextPage.classList.add('button_disable') : '';
        this.amountPage.textContent = `${actualState.winnersPage}/${maxPage}`;
    }
}
