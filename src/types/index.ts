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
  amount: string | null,
}

export interface IPromiseWinners {
  items: ICarWin[],
  count: string | null,
}

export interface IComponentHeader {
  totalCar: HTMLParagraphElement,
  amount: string,
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
  distanceHtml: number,
  time: number,
  distance: number,
}

export interface IControlCar {
  containerCar: HTMLDivElement,
  trackAnimation: HTMLDivElement,
  changeCar: HTMLDivElement,
  startCar: HTMLButtonElement,
  resetCar: HTMLButtonElement,
  engineImg: HTMLImageElement,
  disableHeader: HTMLDivElement,
  driveObj: driveObj,
  id: number,
  race: boolean,
  initAnimation: number,
  render(): HTMLDivElement,
  startEngine(): Promise<void>,
  driveCar(): Promise<void>,
  offButtonStopGarage(): void,
  onButtonStopGarage(): void,
  setRaceMode(value: boolean): Promise<void>,
}
