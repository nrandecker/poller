import { combineReducers } from 'redux';
import navbar from '../modules/navbar';
import home from '../modules/home';
import form from '../modules/form';
import poll from '../modules/poll';
import pollCard from '../modules/pollCard';

export default combineReducers({
  navbar,
  home,
  form,
  poll,
  pollCard,
});
