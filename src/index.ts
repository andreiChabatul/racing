import './global.css';
import '../src/assets/style/reset.css';
import '../src/assets/style/var.css';
import { ACTIONS } from './CONST/const';
import { store } from './store/store';
import InitPage from './components/initPage/initPage';

const initPage = new InitPage();
initPage.render();
store.dispatch({ type: ACTIONS.init });
