const Player = require('./Player')
const path = require('path')
const State = require('../State')
const PlayerState = require('../models/PlayerState')
const Sound = require('../database/models.js').Sound

class SoundManager {

  constructor() {
    this.player = new Player()
    this.player.setVolume(90)
  }

  play() {
    const play = () => {
      this.player.play(path.join(__dirname, 'test.mp3'))

      State.get().playerState = new PlayerState(true, false, 'test.mp3')
    }

    Sound
      .find({
        name: '1'
      })
      .limit(1)
      .exec((err, data) => {
        console.log(data)
      })

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
