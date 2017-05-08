class PlayerState {
  constructor(playing, paused, soundId) {
    this._playing = playing
    this._paused = paused
    this._currentSoundId = soundId
    this._currentSoundName = 'soundName'
  }

  get playing() {
    return this._playing
  }

  set playing(value) {
    this._playing = value
  }

  get paused() {
    return this._paused
  }

  set paused(value) {
    this._paused = value
  }

  get currentSoundId() {
    return this._currentSoundId
  }

  set currentSoundId(value) {
    this._currentSoundId = value
  }

  get currentSoundName() {
    return this._currentSoundName
  }

  set currentSoundName(value) {
    this._currentSoundName = value
  }

  toJSON() {
    return {
      playing: this.playing,
      paused: this.paused,
      soundId: this.currentSoundId,
      soundName: this.currentSoundName,
    }
  }
}

module.exports = PlayerState
