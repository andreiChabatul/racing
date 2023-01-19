import { IState, IStateAction } from '../types/index';

export const initalState: IState = {
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
  let stateUpdate = Object.assign(state);
  switch (action.type) {
    case 'WINNER':
      stateUpdate.display = 'winner';
      return stateUpdate;
    case 'GARAGE':
      stateUpdate.display = 'garage';
      return stateUpdate;
    case 'INIT':
      stateUpdate = initalState;
      return stateUpdate;
    case 'COUNT_CAR':
      stateUpdate.amountCar = Number(action.parametr);
      stateUpdate.IsCheckAmount = Boolean(action.isCheck);
      return stateUpdate;
    case 'GARAGE_PAGE':
      stateUpdate.garagePage = Number(action.parametr);
      stateUpdate.IsCheckAmount = true;
      return stateUpdate;
    case 'WINNERS_PAGE':
      stateUpdate.winnersPage = Number(action.parametr);
      stateUpdate.IsCheckAmount = true;
      return stateUpdate;
    case 'UPDATE':
      stateUpdate.IsCheckAmount = Boolean(action.isCheck);
      return stateUpdate;
    case 'COUNT_WINNERS':
      if (action.parametr) stateUpdate.amountWinner = Number(action.parametr);
      return stateUpdate;
    case 'SORT_WINNERS':
      if (action.parametr) stateUpdate.amountWinner = Number(action.parametr);
      if (action.sortWinners) stateUpdate.sortWinners = action.sortWinners;
      if (stateUpdate.orderWinners === 'ASC') { stateUpdate.orderWinners = 'DESC'; } else { stateUpdate.orderWinners = 'ASC'; }
      stateUpdate.IsCheckAmount = true;
      return stateUpdate;
    default:
      return state;
  }
}
