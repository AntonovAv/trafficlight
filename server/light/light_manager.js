const generators = require('./light_generators')
const State = require('../state')
const R = require('ramda')
const LIGHT_TICK_MS = require('../constants').LIGHT_TICK_MS

class LightManager {

  constructor() {
    this._generator = generators.default()
    this._prevLightValue = {}

    // TODO run via scheduler
    setInterval(this._job.bind(this), LIGHT_TICK_MS)
  }

  _job() {
    let nextValue = this._generator.next().value
    if (!R.equals(this._prevLightValue, nextValue)) {
      this._prevLightValue = nextValue
      State.get().lightState = this._generator.next().value
    }

  }
}

module.exports = LightManager
