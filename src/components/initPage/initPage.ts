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

  mainPage: HTMLDivElement;

  constructor() {
    this.garagePage = new Garage().render();
    this.winnersPage = new Winner().render();
    this.mainPage = CreateElement.createDivElement('main-page');
  }

  render() {
    store.subscribe(() => this.update());
    const headerPage = new Header().render();
    const footerPage = new Footer().render();
    BODY?.append(headerPage, this.mainPage, footerPage);
  }

  clear() {
    this.mainPage.innerHTML = '';
  }

  update() {
    const actualState = store.getState();
    this.clear();
    if (actualState.display === 'winner') {
      this.mainPage.append(this.winnersPage);
    } else {
      this.mainPage.append(this.garagePage);
    }
  }
}
