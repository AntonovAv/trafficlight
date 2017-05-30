const SoundManger = require('../audio/PlayerManager')
const sManager = new SoundManger()
const Sound = require('../database/models').Sound
const fs = require('fs')
const path = require('path')
const audio = require('express').Router()

audio.get('/sounds', function(request, response) {
  // todo audio list
})

audio.get('/sounds/:id', function(request, response) {
  // todo one audio
})

audio.post('/sounds', function(request, response) {
  // todo create sound
  console.log(request.files)
  response.status(200).end()
  /* const newSound = new Sound({
   name: '1',
   content: fs.readFileSync(path.join(__dirname, 'test.mp3'))
   })
   newSound.save((err, sound) => {
   if (err) {
   response.status(500).end()
   response.write(err)
   } else {
   response.status(200).end()
   }
   })*/
})

audio.delete('/sounds/:id', function(request, response) {
  // todo remove sound
})

audio.get('/play', function(request, response) {
  console.log('play')
  sManager.play()
  response.status(200).end()
})

audio.get('/stop', function(request, response) {
  console.log('stop')
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
