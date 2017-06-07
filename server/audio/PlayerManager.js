const Player = require('./Player')
const State = require('../State')
const PlayerState = require('../models/PlayerState')
const Sound = require('../database/models.js').Sound
const streamifier = require('streamifier')

class SoundManager {

  constructor() {
    this.player = new Player()
    this.player.setVolume(90)
  }

  play() {
    const play = () => {
      Sound
        .find({})
        .limit(1)
        .exec((err, [sound, rest]) => {
          if (!err) {
            this.player.play(streamifier.createReadStream(sound.content))
            State.get().playerState = new PlayerState(true, false, sound._id.toString())
          }
        })
    }

    if (this.player.isPlaying()) {
      this.player.stop().then(play)
    } else {
      play()
    }
  }

  stop() {
    if (this.player.isPlaying()) {
      this.player.stop()

      State.get().playerState = new PlayerState(false, false, null)
    }
  }

  pause() {
    if (this.player.isPlaying()) {
      this.player.pause()

      State.get().playerState = new PlayerState(true, true, 'test.mp3')
    }
  }

  resume() {
    if (this.player.isPlaying() && this.player.isPaused()) {
      this.player.resume()
      State.get().playerState = new PlayerState(true, false, 'test.mp3')
    }
  }
}

module.exports = SoundManager
