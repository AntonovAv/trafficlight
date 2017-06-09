import {
  LOAD_SOUNDS,
  LOAD_SOUNDS_SUCCESS,
  LOAD_SOUNDS_FAILURE,
} from './constants'

const initState = {
  sounds: [],
  soundsLoading: false,

}

export default function reducer(state = initState, {type, data}) {
  switch (type) {
    case LOAD_SOUNDS_SUCCESS:
      return {
        ...state,
        soundsLoading: false,
        sounds: data,
      }
    case LOAD_SOUNDS:
      return {
        ...state,
        soundsLoading: true
      }
    case LOAD_SOUNDS_FAILURE:
      return {
        ...state,
        soundsLoading: false
      }
    default:
      return state
  }
}
