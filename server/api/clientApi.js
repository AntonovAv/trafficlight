const temcityResource = require('../teamcity/httpResource')
const SoundManger = require('../audio/PlayerManager')

const R = require('ramda')
const sManager = new SoundManger()
const State = require('../State')

module.exports = (app) => {
  app.all('/api/', function(request, response, next) {
    response.contentType('json')
    response.set('Cache-Control', 'no-cache')
    next()
  })

  app.get('/api/buildTypes', function(request, response) {
    temcityResource.getBuildTypes('http://localhost:3001')
      .then((data) => {
        const ids = R.map(({id}) => id, data)
        response.send(ids)
      })
      .catch(console.error)
  })

  app.get('/api/audio/play', function(request, response) {
    console.log('play')
    sManager.play()
    response.status(200).end()
  })

  app.get('/api/audio/stop', function(request, response) {
    console.log('stop')
    sManager.stop()
    response.status(200).end()
  })

  app.get('/api/audio/pause', function(request, response) {
    console.log('pause')
    sManager.pause()
    response.status(200).end()
  })

  app.get('/api/audio/resume', function(request, response) {
    console.log('resume')
    sManager.resume()
    response.status(200).end()
  })

  app.get('/api/state', function(request, response) {
    response.status(200)
    response.set('Content-Type', 'text/event-stream;charset=utf-8')
    response.connection.setTimeout(0) // keep alive connection

    let onLightChange = () => {
      response.write('event: lightChange\n')
      response.write(`data: ${JSON.stringify(State.get().lightState.toJSON())}\n\n`)
    }

    let onSoundChange = () => {
      response.write('event: playerChange\n')
      response.write(`data: ${JSON.stringify(State.get().playerState.toJSON())}\n\n`)
    }
    let onBuildsStatusChange = () => {
      response.write('event: buildsChange\n')
      response.write(`data: ${JSON.stringify(State.get().buildsState.toJSON())}\n\n`)
    }

    // send status on connect
    onLightChange()
    onSoundChange()
    onBuildsStatusChange()

    State.get().on(State.LIGHT_CHANGED_EVENT, onLightChange)
    State.get().on(State.PLAYER_CHANGED_EVENT, onSoundChange)
    State.get().on(State.BUILDS_CHANGED_EVENT, onBuildsStatusChange)
    request.connection.on('close', () => {
      State.get().removeListener(State.LIGHT_CHANGED_EVENT, onLightChange)
      State.get().removeListener(State.PLAYER_CHANGED_EVENT, onSoundChange)
      State.get().removeListener(State.BUILDS_CHANGED_EVENT, onBuildsStatusChange)
    })
  })

  return app
}
