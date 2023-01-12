import './global.css';
import '../src/assets/style/reset.css';
import '../src/assets/style/var.css';
import RacingTrack from './components/garage/racingTrack/racingTrack';
import { ICar, ICarResponse } from './types/index';
import Garage from './components/garage/garage';



const car1: ICarResponse = {
  name: 'Golf',
  color: '#3059FF',
  id: 1,
};

const body = document.querySelector('.body');


const garage = new Garage().get();


body?.append(garage);
