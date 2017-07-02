import {
  BRIGHTNESS_CHANGE,
  SOUND_CHANGE,
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
    default:
      return state
  }
}
