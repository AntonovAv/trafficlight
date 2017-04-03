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

  lightOnBuildFailure() {
    this._generator = generators.failure()
  }

  lightOnBuildsSuccess() {
    this._generator = generators.allSuccess()
  }

  lightOnBuildFailureButRunning() {
    this._generator = generators.failureAndRunning()
  }

  lightOnTeamcityError() {
    this._generator = generators.teamcityError()
  }

  lightOnTeamcityUnavailable() {
    this._generator = generators.teamcityUnavailable()
  }
}

module.exports = LightManager
