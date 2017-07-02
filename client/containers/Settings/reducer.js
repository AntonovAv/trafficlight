import {
  BRIGHTNESS_CHANGE
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
}

export default function reducer(state = initState, {type, data}) {
  switch (type) {
    case BRIGHTNESS_CHANGE:
      return {
        ...state,
        brightness: data
      }
    default:
      return state
  }
}
