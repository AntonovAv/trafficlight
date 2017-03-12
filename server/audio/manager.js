const Player = require('./player')
const path = require('path')

class SoundManager {

  constructor() {
    this.player = new Player()
    this.isPlaying = false
  }

  play() {
    if (this.isPlaying) {
      return
    }
    this.isPlaying = true
    this.player.play(path.join(__dirname, 'test.mp3'))
  }

  stop() {
    if (!this.isPlaying) {
      return
    }
    this.isPlaying = false
    this.player.stop()
  }

  pause() {
    if (this.isPlaying) {
      this.player.pause()
    }
  }

  resume() {
    if (this.isPlaying) {
      this.player.resume()
    }
  }
}

module.exports = SoundManager
