const EventEmitter = require('events')
const lame = require('lame')
const Speaker = require('speaker')
const mpg123Util = require('node-mpg123-util')

const EVENT_PLAY = 'play'
const EVENT_STOP = 'stop'
const EVENT_PAUSE = 'pause'
const EVENT_RESUME = 'resume'
const EVENT_ERROR = 'error'

class Player extends EventEmitter {

  constructor() {
    super()

    this._isPlaying = false
    this._isPaused = false

    this._decoder = null
    this._soundStream = null
    this._speaker = null
    this._lameFormat = {}
  }

  play(soundStream) {
    if (!this._isPlaying) {
      this._isPlaying = true
      this._soundStream = soundStream
      this._decoder = new lame.Decoder()

      return new Promise((resolve, reject) => {
        let that = this
        this._soundStream
          .pipe(this._decoder)
          .on('format', function(format) {
            that._lameFormat = format
            that._speak(this, format)

            resolve()
            that.emit(EVENT_PLAY)
          })
          .on('close', () => {
            this.stop()
          })
          .on('error', (e) => {
            reject(e)
            this._cleanUp()
            this.emit(EVENT_ERROR)
          })
      })
    }
  }

  _speak(decoder, format) {
    this._speaker = new Speaker(format)
    decoder
      .pipe(this._speaker)
      .on('error', (e) => {
        this.emit(EVENT_ERROR)
        this._cleanUp()
      })
      .on('close', () => {
        this.stop()
      })
  }

  pause() {
    if (this._isPlaying && !this._isPaused) {
      this._isPaused = true

      if (this._soundStream) {
        this._soundStream.pause()
      }
      if (this._decoder) {
        this._decoder.unpipe()
      }
      this.emit(EVENT_PAUSE)
    }
    return Promise.resolve()
  }

  resume() {
    if (this._isPlaying && this._isPaused) {
      this._isPaused = false

      if (this._soundStream) {
        this._soundStream.resume()
      }
      if (this._decoder) {
        this._speak(this._decoder, this._lameFormat)
      }
      this.emit(EVENT_RESUME)
    }
    return Promise.resolve()
  }

  stop() {
    if (this._isPlaying) {
      this._isPlaying = false
      this._cleanUp()
      this.emit(EVENT_STOP)
    }
    return Promise.resolve()
  }

  _cleanUp() {
    if (this._speaker) {
      this._speaker.close(false)
      this._speaker = null
    }

    if (this._decoder) {
      this._decoder.removeAllListeners('close')
      this._decoder.removeAllListeners('error')
      this._decoder.unpipe()
      this._decoder = null
    }

    if (this._soundStream) {
      this._soundStream.removeAllListeners('close')
      this._soundStream.removeAllListeners('error')
      this._soundStream = null
    }

    this._lameFormat = {}
  }

  isPaused() {
    return this._isPaused
  }

  isPlaying() {
    return this._isPlaying
  }

  setVolume(percents) {
    return new Promise((resolve, reject) => {
      if (this._isPlaying) {
        if (this._decoder) {
          mpg123Util.setVolume(this._decoder.mh, percents / 100)
          resolve()
        }
      } else {
        reject()
      }
    })
  }
}

module.exports = Player
Player.Events = {
  EVENT_PLAY,
  EVENT_STOP,
  EVENT_ERROR,
  EVENT_PAUSE,
  EVENT_RESUME,
}
