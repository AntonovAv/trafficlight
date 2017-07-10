import {
  BRIGHTNESS_CHANGE,
  SOUND_CHANGE,
  SAVE_SETTINGS,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAILURE,
  LOAD_SETTINGS,
  LOAD_SETTINGS_SUCCESS,
  LOAD_SETTINGS_FAILURE,
  ADD_TEAMCITY_SERVER,
} from './constants'
import {selectParameters} from './selectors'

export function onBrightnessChangeAction(newBr) {
  return {
    type: BRIGHTNESS_CHANGE,
    data: newBr,
  }
}

export function onSoundChangeAction(newVal) {
  return {
    type: SOUND_CHANGE,
    data: newVal,
  }
}

export function saveSettingsAction() {
  return (dispatch, getState) => {
    const parameters = selectParameters(getState())
    const data = {
      brightness: parameters.brightness,
      volume: parameters.volume,
      hosts: [],
    }
    dispatch({
      types: [SAVE_SETTINGS, SAVE_SETTINGS_SUCCESS, SAVE_SETTINGS_FAILURE],
      promise: (client) => {
        return client.post(
          '/api/settings/params',
          data
        )
      }
    })
  }
}

export function loadSettings() {
  return {
    types: [LOAD_SETTINGS, LOAD_SETTINGS_SUCCESS, LOAD_SETTINGS_FAILURE],
    promise: (client) => {
      return client.get('/api/settings')
    }
  }
}

export function addTeamcityServerAction(data) {
  return {
    type: ADD_TEAMCITY_SERVER,
    data: data,
  }
}

export function deleteTeamcityServerAction(id) {
  return {

  }
}
