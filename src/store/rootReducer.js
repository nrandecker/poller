import { combineReducers } from 'redux';
import navbar from '../modules/navbar';
import home from '../modules/home';
import form from '../modules/form';
import tabmenu from '../modules/tabmenu';

export default combineReducers({
  navbar,
  home,
  form,
  tabmenu,
});
