import {
  LOAD_SOUNDS, LOAD_SOUNDS_SUCCESS, LOAD_SOUNDS_FAILURE,
} from './constants'

export const playAudio = () => {
  return {
    types: ['start', 'ok', 'err'],
    promise: (client) => {
      return client.get('api/audio/play')
    }
  }
}

export const stopAudio = () => {
  return {
    types: [null, null, null],
    promise: (client) => {
      return client.get('api/audio/stop')
    }
  }
}

export const pauseAudio = () => {
  return {
    types: ['start', 'ok', 'err'],
    promise: (client) => {
      return client.get('api/audio/pause')
    }
  }
}

export const resumeAudio = () => {
  return {
    types: ['start', 'ok', 'err'],
    promise: (client) => {
      return client.get('api/audio/resume')
    }
  }
}

export function uploadSoundAction(sound) {
  let data = new FormData()
  data.append('sound', sound)

  const config = {
    onUploadProgress: function(progressEvent) {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      console.log(percentCompleted)
    }
  }
  return {
    types: ['upload', 'ok', 'err'],
    promise: (client) => {
      return client.post(
        'api/audio/sounds',
        data,
        config
      )
    }
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
