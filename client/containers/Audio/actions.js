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
