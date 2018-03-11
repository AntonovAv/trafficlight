const State = require('../State')
const TrafficlightInterface = require('../../hardware/TrafficlightInterface')

class FakeTrafficlight extends TrafficlightInterface {
  async setBrightness({r, y, g}) {
    console.log(`red ${r}, yellow ${y}, green ${g}`)
  }

  async setPWMFreq(val) {
    console.log(`freq ${val}`)
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

  async init({
               brightness = {},
               pwmFrequency = 0,
             }) {
    State.get().on(State.LIGHT_CHANGED_EVENT, (val) => {
      this._setLights(val).then()
    })
    await this.setPWMFrequency(pwmFrequency)
    await this.setBrightness(brightness)
  }

  async _setLights(val) {
    this._lights = val
    await this._updateTrafficlight()
  }

  async setBrightness({r, y, g}) {
    this._brightness = {
      r, y, g
    }
    await this._updateTrafficlight()
  }

  async setPWMFrequency(val) {
    await this._tr.setPWMFreq(val)
  }

  async _updateTrafficlight() {
    const {red, yellow, green} = this._lights
    const {r, y, g} = this._brightness
    await this._tr.setBrightness({
      r: red ? r : 0,
      y: yellow ? y : 0,
      g: green ? g : 0
    })
  }
}

const instance = new TrafficlightManager()
module.exports = instance
