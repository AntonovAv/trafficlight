import {
  LOAD_SOUNDS,
  LOAD_SOUNDS_SUCCESS,
  LOAD_SOUNDS_FAILURE,
  PLAYER_STATE_CHANGE,
} from './constants'

const initState = {
  sounds: [],
  soundsLoading: false,
  playingId: null,
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
    case PLAYER_STATE_CHANGE:
      return {
        ...state,
        ...data,
      }
    default:
      return state
  }
}
