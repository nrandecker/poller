import { combineReducers } from 'redux'
import navbar from '../modules/navbar'
import home from '../modules/home'
import signup from '../modules/signup'
import tabmenu from '../modules/tabmenu'

export default combineReducers({
  navbar,
  home,
  signup,
  tabmenu
})
