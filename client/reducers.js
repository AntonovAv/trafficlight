import {combineReducers} from 'redux'
import home from 'containers/Home/duck'
import audio from 'containers/Audio/reducer'

export default combineReducers({
  home,
  audio,
})
