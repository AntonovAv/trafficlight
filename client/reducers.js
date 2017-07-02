import {combineReducers} from 'redux'
import home from 'containers/Home/duck'
import audio from 'containers/Audio/reducer'
import settings from 'containers/Settings/reducer'

export default combineReducers({
  home,
  audio,
  settings,
})
