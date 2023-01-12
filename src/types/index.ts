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
