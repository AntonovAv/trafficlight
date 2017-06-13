import {
  LOAD_SOUNDS, LOAD_SOUNDS_SUCCESS, LOAD_SOUNDS_FAILURE,
  PLAYER_STATE_CHANGE,
  DROP_UPLOADED_SOUND,
  UPLOAD_SOUND, UPLOAD_SOUND_SUCCESS, UPLOAD_SOUND_FAILURE,
  UPLOAD_PROGRESS_CHANGE,
  CLEAR_UPLOADED_SOUND,
  CHANGE_SOUND_NAME,
} from './constants'
import {
  selectSounds,
  selectUploadedSound,
} from './selectors'
import R from 'ramda'

export const playSoundAction = (id) => {
  return {
    types: ['start', 'ok', 'err'],
    promise: (client) => {
      return client.get(`api/audio/play/${id}`)
    }
  }
}

export const stopSoundAction = () => {
  return {
    types: [null, null, null],
    promise: (client) => {
      return client.get('api/audio/stop')
    }
  }
}

export const pauseSoundAction = () => {
  return {
    types: ['start', 'ok', 'err'],
    promise: (client) => {
      return client.get('api/audio/pause')
    }
  }
}

export const resumeSoundAction = () => {
  return {
    types: ['start', 'ok', 'err'],
    promise: (client) => {
      return client.get('api/audio/resume')
    }
  }
}

export function uploadSoundAction() {
  return (dispatch, getState) => {
    const uploadedSound = selectUploadedSound(getState())
    const sound = uploadedSound.file
    let data = new FormData()
    data.append('sound', sound)

    const config = {
      onUploadProgress: function(progressEvent) {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        dispatch({
          type: UPLOAD_PROGRESS_CHANGE,
          data: percentCompleted,
        })
      }
    }

    dispatch({
      types: [UPLOAD_SOUND, UPLOAD_SOUND_SUCCESS, UPLOAD_SOUND_FAILURE],
      promise: (client) => {
        return client.post(
          'api/audio/sounds',
          data,
          config
        )
      },
      successCb: () => {
        dispatch(loadSoundsAction())
      }
    })
  }
}

export function loadSoundsAction() {
  return {
    types: [LOAD_SOUNDS, LOAD_SOUNDS_SUCCESS, LOAD_SOUNDS_FAILURE],
    promise: (client) => {
      return client.get(
        'api/audio/sounds',
      )
    }
  }
}

export function playerStateChangeAction(data) {
  return dispatch => {
    dispatch({
      type: PLAYER_STATE_CHANGE,
      data: {
        playingId: (data.playing ? data.soundId : null)
      },
    })
  }
}

export function dropSoundAction(file) {
  return dispatch => {
    dispatch({
      type: DROP_UPLOADED_SOUND,
      data: file,
    })
    dispatch(changeSoundNameAction(file.name))
  }
}

export function clearUploadedSoundAction() {
  return {
    type: CLEAR_UPLOADED_SOUND,
  }
}

export function changeSoundNameAction(newName) {
  return (dispatch, getState) => {
    let existsName = false
    const existsSounds = selectSounds(getState())
    if (R.any(R.propEq('name', newName), existsSounds)) {
      existsName = true
    }

    dispatch({
      type: CHANGE_SOUND_NAME,
      data: {
        name: newName,
        existsName: existsName,
      }
    })
  }
}

export function removeSoundAction(id) {
  return dispatch => {
    dispatch({
      types: ['', '', ''],
      promise: (client) => {
        return client.delete(
          `api/audio/sounds/${id}`,
        )
      },
      successCb: () => {
        dispatch(loadSoundsAction())
      }
    })
  }
}
