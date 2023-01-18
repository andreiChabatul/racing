import { IState, IStateAction } from '../types/index';

const initalState: IState = {
    display: 'garage',
    garagePage: 1,
    amountCar: 1,
    IsCheckAmount: true,
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
            state.IsCheckAmount = Boolean(action.isCheck);
            break;
        case 'UPDATE':
            state.IsCheckAmount = Boolean(action.isCheck);
            break;
    }

    return state;
}
