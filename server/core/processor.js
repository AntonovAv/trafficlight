const LightManager = require('../light/light_manager')
const BuildsManager = require('../teamcity/builds_manager')
const BUILD_TYPE_STATUS = require('../constants').BUILD_TYPE_STATUS
const TEAMCITY_STATUS = require('../constants').TEAM_CITY_STATUS
// const State = require('../state')
// const REFRESH_BUILDS_MS = require('../constants').REFRESH_BUILDS_MS
const REFRESH_STATUS_MS = require('../constants').REFRESH_STATUS_MS
const R = require('ramda')

class Processor {
  constructor() {
    this._lightManager = new LightManager()
    this._buildsManager = new BuildsManager()
  }

  run() {
    setInterval(this.updateBuildStatuses.bind(this), REFRESH_STATUS_MS)
  }

  updateBuildStatuses() {
    this._buildsManager.getBuildStatuses()
      .then((statuses) => {
        if (R.any(R.propEq('status', BUILD_TYPE_STATUS.FAILURE), statuses)) {
          this._lightManager.lightOnBuildFailure()
        } else if (R.any(R.propEq('status', BUILD_TYPE_STATUS.FAILURE_AND_RUNNING), statuses)) {
          this._lightManager.lightOnBuildFailureButRunning()
        } else {
          this._lightManager.lightOnBuildsSuccess()
        }
      })
      .catch((teamcityError) => {
        if (teamcityError === TEAMCITY_STATUS.NOT_AVAILABLE) {
          this._lightManager.lightOnTeamcityUnavailable()
        } else {
          this._lightManager.lightOnTeamcityError()
        }
      })
  }
}

module.exports = Processor
