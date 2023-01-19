import { IState, IStateAction } from '../types/index';

const initalState: IState = {
    display: 'garage',
    garagePage: 1,
    winnersPage: 1,
    amountCar: 1,
    amountWinner: 1,
    IsCheckAmount: true,
    sortWinners: 'wins',
    orderWinners: 'ASC',
};

export function reducer(state: IState = initalState, action: IStateAction) {
    switch (action.type) {
        case 'WINNER':
            state.display = 'winner';
            break;
        case 'GARAGE':
            state.display = 'garage';
            break;
        case 'INIT':
            state = initalState;
            break;
        case 'COUNT_CAR':
            state.amountCar = Number(action.parametr);
            state.IsCheckAmount = Boolean(action.isCheck);
            break;
        case 'GARAGE_PAGE':
            state.garagePage = Number(action.parametr);
            state.IsCheckAmount = true;
            break;
        case 'WINNERS_PAGE':
            state.winnersPage = Number(action.parametr);
            state.IsCheckAmount = true;
            break;
        case 'UPDATE':
            state.IsCheckAmount = Boolean(action.isCheck);
            break;
        case 'COUNT_WINNERS':
            action.parametr ? (state.amountWinner = Number(action.parametr)) : '';
            break;
        case 'SORT_WINNERS':
            action.parametr ? (state.amountWinner = Number(action.parametr)) : '';
            action.sortWinners ? (state.sortWinners = action.sortWinners) : '';
            state.orderWinners === 'ASC' ? (state.orderWinners = 'DESC') : (state.orderWinners = 'ASC');
            state.IsCheckAmount = true;
            break;
    }

    return state;
}
