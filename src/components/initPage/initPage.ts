import { BODY } from '../../CONST/const';
import store from '../../store/store';
import CreateElement from '../../utils/CreateElement';
import Footer from '../footer/footer';
import Garage from '../garage/garage';
import Header from '../header/header';
import Winner from '../winner/winner';

export default class InitPage {
  garagePage: HTMLDivElement;

  winnersPage: HTMLDivElement;

  constructor() {
    this.garagePage = new Garage().render();
    this.winnersPage = new Winner().render();
  }

  render() {
    store.subscribe(() => this.update());
    const headerPage = new Header().render();
    const footerPage = new Footer().render();
    const mainPage = CreateElement.createDivElement('main-page');
    mainPage.append(this.garagePage, this.winnersPage);
    BODY?.append(headerPage, mainPage, footerPage);
  }

  update() {
    const actualState = store.getState();
    this.winnersPage.style.display = 'none';
    this.garagePage.style.display = 'none';
    if (actualState.display === 'winner') {
      (this.winnersPage.style.display = 'block');
    } else {
      (this.garagePage.style.display = 'flex');
    }
  }
}
