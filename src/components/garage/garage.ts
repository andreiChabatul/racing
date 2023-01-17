import { ACTIONS, MAX_LIMIT_GARAGE } from "../../CONST/const";
import { store } from "../../store/store";
import { IComponentHeader } from "../../types/index";
import { getCars } from "../../utils/apiLoader";
import CreateElement from "../../utils/CreateElement";
import './garage.css'
import GarageHeader from "./garageHeader/garageHeader";
import RacingTrack from "./racingTrack/racingTrack";

export default class Garage {
    cartsContainer: HTMLDivElement;
    headerGarage: IComponentHeader;

    constructor() {
        this.cartsContainer = CreateElement.createDivElement('cars-container');
        this.headerGarage = new GarageHeader();
    }

    render(): HTMLDivElement {
        store.subscribe(() => this.update());
        const garageContainer = CreateElement.createDivElement('garage-container');
        garageContainer.append(this.headerGarage.render(), this.cartsContainer);
        return garageContainer;
    }

    clear() {
        this.cartsContainer.innerHTML = '';
    }

   

    async update() {
        const actualState = store.getState();
        const response = await getCars(actualState.garagePage, MAX_LIMIT_GARAGE);
        
            let amount = '1';
            response.amount ? amount = response.amount : '';
            store.dispatch({
                type: ACTIONS.countCar,
                parametr: amount,
            });
           
        // response.items.forEach(element => {
        //     this.cartsContainer.append(new RacingTrack(element).render());
        // });
    }
}
