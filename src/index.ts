import './global.css';
import '../src/assets/style/reset.css';
import '../src/assets/style/var.css';
import Garage from './components/garage/garage';
import { BODY } from './CONST/const';
import Footer from './components/footer/footer';
import Winner from './components/winner/winner';
const footer1 = new Footer().render();
const garage = new Garage().render();
const winner = new Winner().render()
const footer = new Footer().render();

BODY?.append(footer1, winner, footer);