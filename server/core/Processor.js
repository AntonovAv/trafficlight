const LightManager = require('../light/LightManager')
const BuildsManager = require('../teamcity/TeamcityManager')
const BUILD_TYPE_STATUS = require('../models/BuildTypeStatus').STATUS_TYPE
const TEAMCITY_STATUS = require('../constants').TEAM_CITY_STATUS
// const State = require('../state')
// const REFRESH_BUILDS_MS = require('../constants').REFRESH_BUILDS_MS
const REFRESH_STATUS_MS = require('../constants').REFRESH_STATUS_MS
const R = require('ramda')
const State = require('../State')
const BuildState = require('../models/BuildsState')

class Processor {
  constructor() {
    this._lightManager = new LightManager()

    this._prevBuildStatuses = null
  }

  run() {
    // TODO need to replace by timer and wait while previous task was performed
    this.updateStatusesInterval = setInterval(this.updateBuildStatuses.bind(this), REFRESH_STATUS_MS)
  }

  updateBuildStatuses() {
    BuildsManager.getBuildStatuses()
      .then((statuses) => {
        if (R.any((buildTypeStatus) => buildTypeStatus.status === BUILD_TYPE_STATUS.FAILURE, statuses)) {
          this._lightManager.lightOnBuildFailure()
        } else if (
          R.any((buildTypeStatus) => buildTypeStatus.status === BUILD_TYPE_STATUS.FAILURE_AND_RUNNING, statuses)
        ) {
          this._lightManager.lightOnBuildFailureButRunning()
        } else {
          this._lightManager.lightOnBuildsSuccess()
        }

        if (!R.equals(this._prevBuildStatuses, statuses)) {
          this._prevBuildStatuses = statuses
          State.get().buildsState = new BuildState(statuses)
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
