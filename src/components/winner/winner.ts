import { MAX_LIMIT_WINNERS } from '../../CONST/const';
import { store } from '../../store/store';
import { getWinners, workCar } from '../../utils/apiLoader';
import CreateElement from '../../utils/CreateElement';
import DescriptionWin from './descriptionWin/descriptionWin';
import './winner.css';

export default class Winner {
    winnerList: HTMLDivElement;
    buttonSortWin: HTMLButtonElement;
    buttonSortTime: HTMLButtonElement;

    constructor() {
        store.subscribe(() => this.update());
        this.winnerList = CreateElement.createDivElement('winner-container__list');
        this.buttonSortWin = CreateElement.createButtonElement('winner-container__button', 'Wins');
        this.buttonSortTime = CreateElement.createButtonElement('winner-container__button', 'Best time');
    }

    render(): HTMLDivElement {
        const winnerContainer = CreateElement.createDivElement('winner-container');
        winnerContainer.append(this.titleRender(), this.winnerList);
        return winnerContainer;
    }

    clear() {
        this.winnerList.innerHTML = '';
    }

    async update() {
        const actualState = store.getState();
        if (actualState.IsCheckAmount) {
            const winners = (await getWinners(1, MAX_LIMIT_WINNERS, 'id', 'ASC')).items;
            this.clear();
            for (let i = 0; i < winners.length; i++) {
                const car = await workCar(String(winners[i].id), 'GET');
                this.winnerList.append(new DescriptionWin(car, winners[i], i + 1).render());
            }
        }
    }

    titleRender(): HTMLDivElement {
        const titleContainerWinner = CreateElement.createDivElement('description-container');
        const numberTitle = CreateElement.createSpanElement('description-container__text', '№');
        const carTitle = CreateElement.createSpanElement('description-container__text', 'Car');
        const nameTitle = CreateElement.createSpanElement('description-container__text', 'Name');
        titleContainerWinner.append(numberTitle, carTitle, nameTitle, this.buttonSortWin, this.buttonSortTime);
        return titleContainerWinner;
    }
}
