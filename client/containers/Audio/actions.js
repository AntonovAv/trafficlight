import {
  LOAD_SOUNDS, LOAD_SOUNDS_SUCCESS, LOAD_SOUNDS_FAILURE,
  PLAYER_STATE_CHANGE,
  DROP_UPLOADED_SOUND,
  UPLOAD_SOUND, UPLOAD_SOUND_SUCCESS, UPLOAD_SOUND_FAILURE,
  UPLOAD_PROGRESS_CHANGE,
} from './constants'

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

export function uploadSoundAction(sound) {
  return dispatch => {
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

    dispatch(uploadSoundAction(file))
  }
}
