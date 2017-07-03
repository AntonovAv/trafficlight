import {
  BRIGHTNESS_CHANGE,
  SOUND_CHANGE,
  SAVE_SETTINGS,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAILURE,
  LOAD_SETTINGS_SUCCESS,
} from './constants'

const initState = {
  brightness: {
    r: 0,
    y: 0,
    g: 0,
  },
  volume: 0,
  hosts: [],
  buildTypes: [],
  changed: false,
  saving: false,
}

export default function reducer(state = initState, {type, data}) {
  switch (type) {
    case BRIGHTNESS_CHANGE:
      return {
        ...state,
        brightness: data,
        changed: true,
      }
    case SOUND_CHANGE: {
      return {
        ...state,
        volume: data,
        changed: true,
      }
    }
    case SAVE_SETTINGS: {
      return {
        ...state,
        saving: true,
      }
    }
    case SAVE_SETTINGS_SUCCESS: {
      return {
        ...state,
        saving: false,
        changed: false,
      }
    }
    case SAVE_SETTINGS_FAILURE: {
      return {
        ...state,
        saving: false,
      }
    }
    case LOAD_SETTINGS_SUCCESS: {
      return {
        ...state,
        brightness: data.brightness,
        volume: data.volume,
      }
    }
    default:
      return state
  }
}
