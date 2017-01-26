import { combineReducers } from 'redux'
import navbar from '../modules/navbar'
import home from '../modules/home'

export default combineReducers({
  navbar,
  home
})
