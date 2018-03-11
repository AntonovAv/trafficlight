const pwmDriver = require('./pwmDriver')
const TrafficlightInterface = require('./TrafficlightInterface')

const LIGHTS = {
  red: 'red',
  yellow: 'yellow',
  green: 'green'
}

const LIGHT_TO_CHANEL_MAP = {
  [LIGHTS.red]: 0,
  [LIGHTS.yellow]: 1,
  [LIGHTS.green]: 2,
}

const MAX_PWM_VALUE = 4095

class Trafficlight extends TrafficlightInterface {
  constructor(device, address) {
    super()
    this._driver = pwmDriver({device, address})
  }

  async setBrightness({r, y, g}) {
    await this._setPWM(LIGHTS.red, r)
    await this._setPWM(LIGHTS.yellow, y)
    await this._setPWM(LIGHTS.green, g)
  }

  _percentsToValue(percents) {
    return MAX_PWM_VALUE * percents / 100
  }

  async _setPWM(light, percents) {
    return this._driver.setPWM(LIGHT_TO_CHANEL_MAP[light], 0, this._percentsToValue(percents))
  }

  async setPWMFreq(freq = 0) {
    this._driver.setPWMFreq(freq)
  }
}

module.exports = Trafficlight
