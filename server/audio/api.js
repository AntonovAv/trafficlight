const SoundManger = require('../audio/PlayerManager')
const sManager = new SoundManger()
const audio = require('express').Router()
const State = require('../State')
const audioResource = require('./resource')

audio.get('/sounds', async function(request, response) {
  try {
    const sounds = await audioResource.getAllSounds()
    const wrappers = sounds.map((sound) => {
      return createSoundWrapper(sound)
    })
    response.status(200).send(wrappers).end()
  } catch (err) {
    response.write(err).status(500).end()
  }
})

function createSoundWrapper(model) {
  return {
    id: model.id,
    name: model.name,
  }
}

audio.get('/sounds/:id', async function(request, response) {
  try {
    const sound = await audioResource.getSound(request.params.id)
    if (sound) {
      response.status(200).send(createSoundWrapper(sound)).end()
    } else {
      response.status(404).end()
    }
  } catch (err) {
    response.write(err).status(500).end()
  }
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

audio.delete('/sounds/:id', async function(request, response) {
  try {
    const deleted = await audioResource.getSound(request.params.id)

    if (deleted) {
      const id = deleted.id
      if (State.get().playerState.currentSoundId === id) {
        await sManager.stop()
      }
      await deleted.remove()
    }
    response.status(200).end()
  } catch (err) {
    response.write(err).status(500).end()
  }
})

audio.get('/play/:id', async function(request, response) {
  try {
    const sound = await audioResource.getSoundWithContent(request.params.id)
    if (sound) {
      await sManager.play(sound)
      response.status(200).end()
    } else {
      response.status(404).end()
    }
  } catch (err) {
    response.write(err).status(500).end()
  }
})

audio.get('/stop', async function(request, response) {
  try {
    await sManager.stop()
    response.status(200).end()
  } catch (e) {
    response.write(e).status(500).end()
  }
})

audio.get('/pause', async function(request, response) {
  try {
    await sManager.pause()
    response.status(200).end()
  } catch (e) {
    response.write(e).status(500).end()
  }
})

audio.get('/resume', async function(request, response) {
  try {
    await sManager.resume()
    response.status(200).end()
  } catch (e) {
    response.write(e).status(500).end()
  }
})

module.exports = audio
