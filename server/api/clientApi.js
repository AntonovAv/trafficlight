const temcityResource = require('../teamcity/resource')
const SoundManger = require('../audio/manager')

const R = require('ramda')
const sManager = new SoundManger()

module.exports = (app) => {
  app.all('/api/', function(request, response, next) {
    response.contentType('json')
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

  return app
}
