const SoundManger = require('../audio/PlayerManager')
const sManager = new SoundManger()

module.export = (app) => {
  app.get('/api/audio/sounds', function(request, response) {
    // todo audio list
  })

  app.get('api/audio/sounds/:id', function(request, response) {
    // todo one audio
  })

  app.post('api/audio/sounds/:id', function(request, response) {
    // todo create sound
  })

  app.delete('api/audio/sounds/:id', function(request, response) {
    // todo remove sound
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
}
