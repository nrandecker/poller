import { combineReducers } from 'redux';
import navbar from '../modules/navbar';
import home from '../modules/home';
import form from '../modules/form';
import poll from '../modules/poll';
import pollCard from '../modules/pollCard';
import userProfile from '../modules/userProfile';

export default combineReducers({
  navbar,
  home,
  form,
  poll,
  pollCard,
  userProfile,
});
