const temcityResource = require('../teamcity/resource')
const SoundManger = require('../audio/manager')

const R = require('ramda')
const sManager = new SoundManger()

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

    const lightGen = function * () {
      while (true) {
        yield {
          red: true,
          yellow: false,
          green: false
        }
        yield {
          red: false,
          yellow: true,
          green: false
        }
        yield {
          red: false,
          yellow: false,
          green: true
        }
      }
    }

    const gen = lightGen()

    let fn = () => {
      response.write(`data: ${JSON.stringify(gen.next().value)}\n\n`)
    }

    const interval = setInterval(fn, 1000)

    request.connection.on('close', () => clearInterval(interval))
  })

  return app
}
