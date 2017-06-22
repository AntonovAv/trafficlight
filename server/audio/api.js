const SoundManger = require('../audio/PlayerManager')
const sManager = new SoundManger()
const audio = require('express').Router()
const State = require('../State')
const audioResource = require('./resource')

audio.get('/sounds', function(request, response) {
  audioResource
    .getAllSounds()
    .then((sounds) => {
      const wrappers = sounds.map((sound) => {
        return createSoundWrapper(sound)
      })
      response.status(200).send(wrappers).end()
    })
    .catch((err) => {
      response.write(err).status(500).end()
    })
})

function createSoundWrapper(model) {
  return {
    id: model.id,
    name: model.name,
  }
}

audio.get('/sounds/:id', function(request, response) {
  audioResource
    .getSound(request.params.id)
    .then((sound) => {
      if (sound) {
        response.status(200).send(createSoundWrapper(sound)).end()
      } else {
        response.status(404).end()
      }
    })
    .catch((err) => {
      response.write(err).status(500).end()
    })
})

audio.post('/sounds', async (request, response) => {
  const file = request.files.sound
  if (!file) {
    response.status(400).end()
    return
  }

  try {
    const name = file.name
    const founded = await audioResource.countWithSameName(name)
    if (founded !== 0) {
      response.status(400).end()
      return
    }

    await audioResource.saveSound({
      name: file.name,
      content: file.data
    })
    response.status(200).end()
  } catch (err) {
    response.write(err)
    response.status(500).end()
  }
})

audio.delete('/sounds/:id', function(request, response) {
  audioResource
    .getSound(request.params.id)
    .then((sound) => {
      if (sound) {
        const id = sound.id
        if (State.get().playerState.currentSoundId === id) {
          sManager.stop()
        }
        sound
          .remove()
          .then(() => {
            response.status(200).end()
          })
          .catch((err) => {
            response.write(err).status(500).end()
          })
      } else {
        response.status(200).end()
      }
    })
    .catch((err) => {
      response.write(err).status(500).end()
    })
})

audio.get('/play/:id', function(request, response) {
  audioResource
    .getSoundWithContent(request.params.id)
    .then((sound) => {
      if (sound) {
        sManager
          .play(sound)
          .then(() => {
            response.status(200).end()
          })
          .catch((err) => {
            response.write(err).status(500).end()
          })
      } else {
        response.status(404).end()
      }
    })
    .catch((err) => {
      response.write(err).status(500).end()
    })
})

audio.get('/stop', function(request, response) {
  sManager.stop()
  response.status(200).end()
})

audio.get('/pause', function(request, response) {
  console.log('pause')
  sManager.pause()
  response.status(200).end()
})

audio.get('/resume', function(request, response) {
  console.log('resume')
  sManager.resume()
  response.status(200).end()
})

module.exports = audio
