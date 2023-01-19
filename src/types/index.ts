export interface ICarResponse {
  name: string,
  color: string,
  id: number
}

export interface ICarResponse {
  name: string,
  color: string,
  id: number
}

export interface IUrlObj {
  id?: string,
  status?: string,
}

export interface ICar {
  car: ICarResponse,
  render(): HTMLDivElement,
  update(): void,
}

export interface ICarWin {
  id: number,
  wins: number,
  time: number,
}

export interface ICarWinUpdate {
  wins: number,
  time: number,
}

export interface IStartQuery {
  velocity: number,
  distance: number,
}

export interface IUpdateCar {
  name: string,
  color: string,
}

export interface IPromiseGarage {
  items: ICarResponse[],
  amount: string | null;
}

export interface IPromiseWinners {
  items: ICarWin[],
  count: string | null,
}

export interface IComponentHeader {
  totalCar: HTMLParagraphElement,
  amount: number,
  render(): HTMLDivElement,
  update(amount: string): void,
}

export interface IRaceMode {
  render(): HTMLDivElement,
  pushCar(car: IControlCar): void,
  startRace(): void,
  resetRace(): void,
  renderWin(id: string, car: driveObj): void
}

export interface driveObj {
  id: number,
  distanceHtml: number,
  time: number,
  distance: number,
}

export interface IResponceDriveCar {
  status: number,
  id: number,
  time: number,
}

export interface IControlCar {
  containerCar: HTMLDivElement,
  trackAnimation: HTMLDivElement,
  startCar: HTMLButtonElement,
  resetCar: HTMLButtonElement,
  engineImg: HTMLImageElement,
  driveObj: driveObj,
  id: number,
  race: boolean,
  initAnimation: number,
  render(): HTMLDivElement,
  startEngineCar(): Promise<boolean>,
  driveCarStart(): Promise<IResponceDriveCar>,
  offButtonStopGarage(): void,
  onButtonStopGarage(): void,
  setRaceMode(value: boolean): Promise<void>,
}

export interface IState {
  display: 'garage' | 'winner',
  garagePage: number,
  amountCar: number,
  winnersPage: number,
  IsCheckAmount: boolean,
  sortWinners: 'wins' | 'time',
  orderWinners: 'ASC' | 'DESC',
}

export interface IStateAction {
  type: string,
  parametr?: number | string,
  isCheck?: boolean,
  sortWinners?: 'wins' | 'time',
}
