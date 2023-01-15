export interface ICarResponse {
  name: string,
  color: string,
  id: number
}

export interface ICar {
  car: ICarResponse,
  render(): HTMLDivElement,
  update(): void,
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

export interface IComponentHeader {
  totalCar: HTMLParagraphElement,
  amount: string,
  render(): HTMLDivElement,
  update(amount: string): void,
}

export interface IRaceMode {
  startButton: HTMLButtonElement,
  resetButton: HTMLButtonElement,
  render(): HTMLDivElement,
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
