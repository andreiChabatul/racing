import './global.css';
import '../src/assets/style/reset.css';
import '../src/assets/style/var.css';
import RacingTrack from './components/racingTrack/racingTrack';
import { ICar, ICarResponse } from './types/index';

const car: ICarResponse = {
    name: 'Tesla',
    color: '#e6e4fa',
    id: 1,
};

const car1: ICarResponse = {
  name: 'Golf',
  color: '#3059FF',
  id: 1,
};

const body = document.querySelector('.body');

const track = new RacingTrack(car).render();
const track1 = new RacingTrack(car1).render();


body?.append(track, track1);
