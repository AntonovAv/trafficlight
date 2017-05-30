const teamcityResource = require('../teamcity/httpResource')
const router = require('express').Router()
const R = require('ramda')
const State = require('../State')

router.get('/buildTypes', function(request, response) {
  teamcityResource.getBuildTypes('http://localhost:3001')
    .then((data) => {
      const ids = R.map(({id}) => id, data)
      response.send(ids)
    })
    .catch(console.error)
})

router.get('/state', function(request, response) {
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

module.exports = router
