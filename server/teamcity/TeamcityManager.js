const httpResource = require('./httpResource')
const tcResource = require('./resource')
const BUILD_TYPE_STATUS = require('../models/BuildTypeStatus').STATUS_TYPE
const BuildTypeStatus = require('../models/BuildTypeStatus')
const TEAMCITY_STATUS = require('../constants').TEAM_CITY_STATUS
const R = require('ramda')
const BuildType = require('../models/BuildType')

class TeamcityManager {
  /**
   * Returns builds status in format
   *  {
   *    id, - build type id
   *    status - one of BUILD_TYPE_STATUS
   *  }
   */
  async getBuildStatuses(teamcity) {
    // TODO take build types ids from cache
    const buildTypes = await this.loadBuildTypes(teamcity.url)

    const promises = R.compose(
      R.map((buildType) => {
        return httpResource.getBuildStatus(teamcity.url, buildType.id)
          .then((builds) => {
            return new BuildTypeStatus(buildType.id, this._getBuildTypeStatus(builds))
          })
      }),
      R.filter((buildType) => {
        return !R.contains(buildType.id, teamcity.ignoredBuildTypes)
      })
    )(buildTypes)

    try {
      return Promise.all(promises)
    } catch (e) {
      if (e.code === 'ENOTFOUND' || e.code === 'ECONNREFUSED') {
        return Promise.reject(TEAMCITY_STATUS.NOT_AVAILABLE)
      }
      return Promise.reject(TEAMCITY_STATUS.INTERNAL_ERROR)
    }
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

  async updateBuildTypes(teamcity) {
    // update build types for one host
    const buildTypes = await this.loadBuildTypes(teamcity.url)
    // TODO implement
  }

  async loadBuildTypes(host) {
    const resp = await httpResource.getBuildTypes(host)
    return R.map((buildType) => {
      return BuildType.createFromTCModel(buildType)
    }, resp)
  }

  async loadTeamcityInfo(host) {
    return await httpResource.getServerInfo(host)
  }
}
const instance = new TeamcityManager()
module.exports = instance
