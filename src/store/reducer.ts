import { IState, IStateAction } from "../types/index";

const initalState: IState = {
  display: "garage",
  garagePage: 1,
  amountCar: 1,
}

export function reducer(state: IState = initalState, action: IStateAction) {
  switch (action.type) {
    case 'WINNER':
      state.display = 'winner';
      break;
    case 'GARAGE':
      state.display = 'garage'
      break;
    case 'INIT':
      state = initalState;
      break;
    case 'COUNT_CAR':
      state.amountCar = Number(action.parametr);
      break;
    case 'GARAGE_PAGE':
      state.garagePage = Number(action.parametr);
      break;
  }

  return state
}