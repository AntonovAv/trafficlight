const Player = require('./Player')
const PlayerEvents = require('./Player').Events
const State = require('../State')
const PlayerState = require('../models/PlayerState')
const streamifier = require('streamifier')

class SoundManager {

  constructor() {
    this.player = new Player()
    this.player.setVolume(90)
  }

  play(sound) {
    const play = () => {
      State.get().playerState = new PlayerState(true, false, sound.id)
      return this.player.play(streamifier.createReadStream(sound.content))
    }

    if (this.player.isPlaying()) {
      return this.player.stop().then(play)
    } else {
      return play()
    }
  }

  stop() {
    if (this.player.isPlaying()) {
      State.get().playerState = new PlayerState(false, false, null)
      return this.player.stop()
    }
  }

  pause() {
    if (this.player.isPlaying()) {
      State.get().playerState = new PlayerState(true, true, State.get().playerState.currentSoundId)
      return this.player.pause()
    }
  }

  resume() {
    if (this.player.isPlaying() && this.player.isPaused()) {
      State.get().playerState = new PlayerState(true, false, State.get().playerState.currentSoundId)
      return this.player.resume()
    }
  }
}

module.exports = SoundManager
