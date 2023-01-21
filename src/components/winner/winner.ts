import { ACTIONS, MAX_LIMIT_WINNERS } from '../../CONST/const';
import store from '../../store/store';
import { getWinners } from '../../utils/apiLoader';
import CreateElement from '../../utils/CreateElement';
import DescriptionWin from './descriptionWin/descriptionWin';
import PaginationWinner from './paginationWinner/paginationWinner';
import './winner.css';

export default class Winner {
  winnerList: HTMLDivElement;

  buttonSortWin: HTMLButtonElement;

  buttonSortTime: HTMLButtonElement;

  arrayButtonWin: HTMLSpanElement;

  arrayButtonTime: HTMLSpanElement;

  amount: string;

  constructor() {
    store.subscribe(() => this.update());
    this.amount = '0';
    this.winnerList = CreateElement.createDivElement('winner-container__list');
    this.buttonSortWin = CreateElement.createButtonElement('winner-container__button button-state', 'Wins');
    this.buttonSortTime = CreateElement.createButtonElement('winner-container__button button-state', 'Best time');
    this.arrayButtonWin = CreateElement.createSpanElement('array-button');
    this.arrayButtonTime = CreateElement.createSpanElement('array-button');
  }

  render(): HTMLDivElement {
    const winnerContainer = CreateElement.createDivElement('winner-container');
    winnerContainer.append(this.titleRender(), this.winnerList);
    this.eventListner();
    return winnerContainer;
  }

  clear() {
    this.winnerList.innerHTML = '';
  }

  async update() {
    const actualState = store.getState();
    let textSpan = '↑';
    if (actualState.orderWinners === 'DESC') { textSpan = '↓'; } else { textSpan = '↑'; }
    this.arrayButtonWin.textContent = textSpan;
    this.arrayButtonTime.textContent = textSpan;
    if (actualState.IsCheckUpdate) {
      const winners = (await getWinners(
        actualState.winnersPage,
        MAX_LIMIT_WINNERS,
        actualState.sortWinners,
        actualState.orderWinners,
      )).items;
      this.clear();
      for (let i = 0; i < winners.length; i += 1) {
        this.winnerList.append(new DescriptionWin(winners[i], i + 1).render());
      }
    }
  }

  titleRender(): HTMLDivElement {
    const paginationWinner = new PaginationWinner().render();
    const titleContainerWinner = CreateElement.createDivElement('description-container');
    const numberTitle = CreateElement.createSpanElement('description-container__text', '№');
    const carTitle = CreateElement.createSpanElement('description-container__text', 'Car');
    const nameTitle = CreateElement.createSpanElement('description-container__text', 'Name');
    this.buttonSortWin.append(this.arrayButtonWin);
    this.buttonSortTime.append(this.arrayButtonTime);
    titleContainerWinner.append(
      numberTitle,
      carTitle,
      nameTitle,
      this.buttonSortWin,
      this.buttonSortTime,
      paginationWinner,
    );
    return titleContainerWinner;
  }

  eventListner() {
    this.buttonSortWin.addEventListener('click', () => {
      this.arrayButtonWin.style.opacity = '1';
      this.arrayButtonTime.style.opacity = '0';
      this.buttonSortWin.classList.add('winner-container__button_active');
      this.buttonSortTime.classList.remove('winner-container__button_active');
      store.dispatch({
        type: ACTIONS.sortWinners,
        parametr: this.amount,
        sortWinners: 'wins',
      });
    });
    this.buttonSortTime.addEventListener('click', () => {
      this.arrayButtonTime.style.opacity = '1';
      this.arrayButtonWin.style.opacity = '0';
      this.buttonSortTime.classList.add('winner-container__button_active');
      this.buttonSortWin.classList.remove('winner-container__button_active');
      store.dispatch({
        type: ACTIONS.sortWinners,
        parametr: this.amount,
        sortWinners: 'time',
      });
    });
  }
}
