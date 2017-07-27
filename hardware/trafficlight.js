const pwmDriver = require('./pwmDriver')
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

class Trafficlight {
  constructor(device, address, mainFreq = 800) {
    this._driver = pwmDriver({device, address})
    this._driver.setPWMFreq(mainFreq)
  }

  async setBrightness({r, y, g}) {
    await this._setPWM(LIGHTS.red, r)
    await this._setPWM(LIGHTS.yellow, y)
    await this._setPWM(LIGHTS.green, g)
  }

  _percentsToValue(percents) {
    return MAX_PWM_VALUE * percents / 100
  }

  _setPWM(light, percents) {
    return this._driver.setPWMFreq(LIGHT_TO_CHANEL_MAP[light], 0, this._percentsToValue(percents))
  }
}

module.exports = Trafficlight
