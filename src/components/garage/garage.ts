import { ICarResponse } from "../../types/index";
import { getCars } from "../../utils/apiLoader";
import CreateElement from "../../utils/CreateElement";
import './garage.css'
import GarageFooter from "./garageFooter/garageFooter";
import GarageHeader from "./garageHeader/garageHeader";
import RacingTrack from "./racingTrack/racingTrack";

const car: ICarResponse = {
    name: 'Tesla',
    color: '#e6e4fa',
    id: 1,
};

export default class Garage {
    garageContainer: HTMLDivElement;

    constructor() {
        this.garageContainer = CreateElement.createDivElement('garage-container');
    }

    render(): HTMLElement[] {
        const result: HTMLElement[] = [];
        const headerGarage = new GarageHeader(12).render();
        const footerGarage = new GarageFooter().render();
        result.push(headerGarage);
        

        const tor = getCars(1);
        tor.then(data => {
            console.log( data.items.length)
            for (let i = 0; i < data.items.length; i++) {
                console.log(data.items[i])
                result.push(new RacingTrack(data.items[i]).render());
                
        
            }
            console.log(result)
        });

        result.push(footerGarage);

        return result;
    }

    fill() {
        this.render().forEach((element) => {
            this.garageContainer.append(element);
        });
    }

    get(): HTMLDivElement {
        this.fill();
        return this.garageContainer;
    }
}