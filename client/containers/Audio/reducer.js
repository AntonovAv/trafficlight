import {
  LOAD_SOUNDS,
  LOAD_SOUNDS_SUCCESS,
  LOAD_SOUNDS_FAILURE,
  PLAYER_STATE_CHANGE,
  DROP_UPLOADED_SOUND,
  UPLOAD_SOUND, UPLOAD_SOUND_SUCCESS, UPLOAD_SOUND_FAILURE,
  UPLOAD_PROGRESS_CHANGE, CLEAR_UPLOADED_SOUND, CHANGE_SOUND_NAME,
} from './constants'

const uploadedSoundInitState = {
  percents: 0,
  uploading: false,
  file: null,
  name: '',
  existsName: false,
}

const initState = {
  sounds: [],
  soundsLoading: false,
  playingId: null,
  uploadedSound: uploadedSoundInitState,
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
    case DROP_UPLOADED_SOUND:
      const uploaded = {
        ...uploadedSoundInitState,
        file: data,
      }
      return {
        ...state,
        uploadedSound: uploaded,
      }
    case UPLOAD_PROGRESS_CHANGE: {
      const uploaded = {
        ...state.uploadedSound,
        percents: data,
      }
      return {
        ...state,
        uploadedSound: uploaded,
      }
    }
    case UPLOAD_SOUND: {
      const uploaded = {
        ...state.uploadedSound,
        uploading: true,
      }
      return {
        ...state,
        uploadedSound: uploaded,
      }
    }
    case UPLOAD_SOUND_SUCCESS:
    case UPLOAD_SOUND_FAILURE:
    case CLEAR_UPLOADED_SOUND:
      return {
        ...state,
        uploadedSound: uploadedSoundInitState,
      }
    case CHANGE_SOUND_NAME: {
      const uploaded = {
        ...state.uploadedSound,
        name: data.name,
        existsName: data.existsName,
      }
      return {
        ...state,
        uploadedSound: uploaded,
      }
    }
    default:
      return state
  }
}
