const axios = require('axios')
const R = require('ramda')

const BUILD_TYPES_URL = '/guestAuth/app/rest/buildTypes'

/**
 * Retrieve build type ids grouped by project ids
 *
 * @param host teamcity host
 */
module.exports.getBuildTypes = (host) => {
  return new Promise((resolve, reject) => {
    axios
      .get(host + BUILD_TYPES_URL, {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(({data}) => {
        const result = R.map((buildType) => {
          const {id, projectId} = buildType
          return {
            id,
            projectId,
          }
        }, data.buildType)
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * Retrieve buildType builds statuses
 *
 * @param host teamcity host
 * @param buildTypeId target id of build type
 * @param count needed number of builds
 */
module.exports.getBuildStatus = (host, buildTypeId, count = 2) => {
  return new Promise((resolve, reject) => {
    axios
      .get(host + BUILD_TYPES_URL + `/id:${buildTypeId}/builds?locator=count:${count},running:any`, {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(({data}) => {
        const {count, build} = data
        if (count === 0) {
          resolve([])
        } else {
          resolve(R.map((build) => {
            const {buildTypeId, status, state} = build
            return {
              id: buildTypeId,
              state,
              status
            }
          }, build))
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}
