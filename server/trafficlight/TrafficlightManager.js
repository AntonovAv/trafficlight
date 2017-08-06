const State = require('../State')

class FakeTrafficlight {
  setBrightness({r, y, g}) {
    console.log(`red ${r}, yellow ${y}, green ${g}`)
  }
}

const isProd = process.env.NODE_ENV === 'production'
const Trafficlight = isProd ? require('../../hardware/trafficlight') : FakeTrafficlight

class TrafficlightManager {
  constructor() {
    this._brightness = {
      r: 0,
      y: 0,
      g: 0,
    }
    this._lights = {}
    this._tr = new Trafficlight('/dev/i2c-0', 0x40)
  }

  init(brightness) {
    State.get().on(State.LIGHT_CHANGED_EVENT, (val) => {
      this._setLights(val)
    })
    this.setBrightness(brightness)
  }

  _setLights(val) {
    this._lights = val
    this._updateTrafficlight()
  }

  setBrightness({r, y, g}) {
    this._brightness = {
      r, y, g
    }
    this._updateTrafficlight()
  }

  _updateTrafficlight() {
    const {red, yellow, green} = this._lights
    const {r, y, g} = this._brightness
    this._tr.setBrightness({
      r: red ? r : 0,
      y: yellow ? y : 0,
      g: green ? g : 0
    })
  }
}

const instance = new TrafficlightManager()
module.exports = instance
