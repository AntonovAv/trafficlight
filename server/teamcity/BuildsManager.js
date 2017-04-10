const resource = require('./httpResource')
const BUILD_TYPE_STATUS = require('../models/BuildTypeStatus').STATUS_TYPE
const BuildTypeStatus = require('../models/BuildTypeStatus')
const TEAMCITY_STATUS = require('../constants').TEAM_CITY_STATUS
const R = require('ramda')

class BuildsStatusManager {
  constructor() {
    // TODO: temporary. Need to take from settings
    this._teamcityURL = 'http://localhost:3001'
  }

  /**
   * Returns builds status in format
   *  {
   *    id, - build type id
   *    status - one of BUILD_TYPE_STATUS
   *  }
   */
  getBuildStatuses() {
    // TODO take build types ids from cache
    return resource.getBuildTypes(this._teamcityURL)
      .then((buildTypes) => {
        const promises = R.map((buildType) => {
          return resource.getBuildStatus(this._teamcityURL, buildType.id)
            .then((builds) => {
              return new BuildTypeStatus(buildType.id, this._getBuildTypeStatus(builds))
            })
        }, buildTypes)
        return Promise.all(promises)
      })
      .catch((e) => {
        if (e.code === 'ENOTFOUND' || e.code === 'ECONNREFUSED') {
          return Promise.reject(TEAMCITY_STATUS.NOT_AVAILABLE)
        }
        return Promise.reject(TEAMCITY_STATUS.INTERNAL_ERROR)
      })
  }

  _getBuildTypeStatus(builds) {
    const getStatusForOneBuild = (build) => {
      if (build.isRunning) {
        return BUILD_TYPE_STATUS.RUNNING
      }
      if (!build.isFailure) {
        return BUILD_TYPE_STATUS.SUCCESS
      }
      if (build.isFailure) {
        return BUILD_TYPE_STATUS.FAILURE
      }
    }

    if (builds.length === 0) {
      return BUILD_TYPE_STATUS.NO_BUILDS
    } else if (builds.length === 1) {
      const lastBuild = builds[0]
      return getStatusForOneBuild(lastBuild)
    } else {
      const lastBuild = builds[0]
      const preLastBuild = builds[1]

      if (preLastBuild.isFailure && lastBuild.isRunning) {
        return BUILD_TYPE_STATUS.FAILURE_AND_RUNNING
      } else {
        return getStatusForOneBuild(lastBuild)
      }
    }
  }

}

module.exports = BuildsStatusManager
