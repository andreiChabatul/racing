import './global.css';
import '../src/assets/style/reset.css';
import '../src/assets/style/var.css';
import Garage from './components/garage/garage';


const body = document.querySelector('.body');


const garage = new Garage().render();


body?.append(garage);
