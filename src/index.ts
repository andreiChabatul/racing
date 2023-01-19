import './global.css';
import './assets/style/reset.css';
import './assets/style/var.css';
import { ACTIONS } from './CONST/const';
import store from './store/store';
import InitPage from './components/initPage/initPage';

const initPage = new InitPage();
initPage.render();
store.dispatch({ type: ACTIONS.init });
