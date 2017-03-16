const Player = require('./player')
const path = require('path')

class SoundManager {

  constructor() {
    this.player = new Player()
  }

  play() {
    const play = () => {
      this.player.play(path.join(__dirname, 'test.mp3'))
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
    }
  }

  pause() {
    this.player.pause()
  }

  resume() {
    this.player.resume()
  }
}

module.exports = SoundManager
