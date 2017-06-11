const SoundManger = require('../audio/PlayerManager')
const sManager = new SoundManger()
const Sound = require('../database/models').Sound
const audio = require('express').Router()
const State = require('../State')

audio.get('/sounds', function(request, response) {
  Sound.find({})
    .select('id name')
    .exec((err, sounds) => {
      if (err) {
        response.status(500).end()
      } else {
        const wrappers = sounds.map((sound) => {
          return createSoundWrapper(sound)
        })
        response.status(200).send(wrappers).end()
      }
    })
})

function createSoundWrapper(model) {
  return {
    id: model.id,
    name: model.name,
  }
}

audio.get('/sounds/:id', function(request, response) {
  Sound
    .find({
      id: request.params.id
    })
    .select('id name')
    .exec((err, sounds) => {
      if (err) {
        response.status(500).end()
      } else {
        if (sounds.length === 0) {
          response.status(404).end()
        } else {
          response.status(200).send(createSoundWrapper(sounds[0])).end()
        }
      }
    })
})

audio.post('/sounds', function(request, response) {
  const file = request.files.sound
  if (!file) {
    response.status(401).end()
    return
  }

  const newSound = new Sound({
    name: file.name,
    content: file.data
  })
  newSound.save((err, sound) => {
    if (err) {
      response.status(500).end()
      response.write(err)
    } else {
      response.status(200).end()
    }
  })
})

audio.delete('/sounds/:id', function(request, response) {
  Sound
    .findById(request.params.id)
    .select('id')
    .exec((err, sound) => {
      if (err) {
        response.status(500).end()
      } else if (sound) {
        const id = sound.id
        if (State.get().playerState.currentSoundId === id) {
          sManager.stop()
        }
        sound.remove()
        response.status(200).end()
      } else {
        response.status(200).end()
      }
    })
})

audio.get('/play/:id', function(request, response) {
  Sound
    .findById(request.params.id)
    .exec((err, sound) => {
      if (err) {
        response.status(500).end()
      } else {
        if (sound) {
          sManager
            .play(sound)
            .then(() => {
              response.status(200).end()
            })
            .catch(() => {
              response.status(500).end()
            })
        } else {
          response.status(404).end()
        }
      }
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
