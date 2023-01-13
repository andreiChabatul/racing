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

export interface IUpdateCar {
  name: string,
  color: string,
}

export interface IPromiseGarage {
  items: ICarResponse[],
  amount: string | null,
}

export interface IComponentHeader {
  startButton: HTMLButtonElement,
  resetButton: HTMLButtonElement,
  totalCar: HTMLParagraphElement,
  amount: string,
  render(): HTMLDivElement,
  update(amount: string): void,
}


