const EventEmitter = require('events')
const fs = require('fs')
const lame = require('lame')
const Speaker = require('speaker')
const Throttle = require('throttle')

class Player extends EventEmitter {

  constructor() {
    super()

    this._decoder = null
    this._stream = null
    this._speaker = null
    this._lameFormat = {}
  }

  play(filePath) {
    const BIT_RATE = 160000
    this._stream = fs.createReadStream(filePath).pipe(new Throttle(BIT_RATE / 8))

    let that = this
    this._stream
      .pipe(new lame.Decoder())
      .on('format', function(format) {
        format.samplesPerFrame = 128
        that._lameFormat = format
        that._decoder = this
        that._speak(this, format)
      })
  }

  _speak(decoder, format) {
    this._speaker = new Speaker(format)
    decoder.pipe(this._speaker)
  }

  pause() {
    if (this._stream) {
      this._stream.pause()
    }
    /*  if (this._speaker) {
     //this._speaker.close(true)
     }*/
    if (this._decoder) {
      this._decoder.unpipe()
    }
  }

  resume() {
    if (this._stream) {
      this._stream.resume()
    }
    if (this._decoder) {
      this._speak(this._decoder, this._lameFormat)
    }
  }

  stop() {
    if (this._speaker) {
      this._speaker.close(true)
    }

    if (this._stream) {
      this._stream.removeAllListeners('close')
      this._stream.destroy()
      this._stream.removeAllListeners('error')
      this._stream = null
    }

    if (this._decoder) {
      this._decoder.removeAllListeners('close')
      this._decoder.removeAllListeners('error')
      this._decoder.unpipe()
      this._decoder = null
    }
    this._lameFormat = {}
  }
}

module.exports = Player
