const EventEmitter = require('events')
const fs = require('fs')
const lame = require('lame')
const Speaker = require('speaker')

class Player extends EventEmitter {

  constructor() {
    super()

    this._decoder = null
    this._stream = null
  }

  play(filePath) {
    this._stream = fs.createReadStream(filePath)

    let that = this
    this._stream
      .pipe(new lame.Decoder())
      .on('format', function() {
        that._decoder = this
        that._speak(this)
      })
  }

  _speak(decoder) {
    decoder.pipe(new Speaker({}))
  }

  pause() {
    this._decoder.unpipe()
  }

  resume() {
    this._speak(this._decoder)
  }

  stop() {
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
  }
}

module.exports = Player
