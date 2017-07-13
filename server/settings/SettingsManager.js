const settingsResource = require('./resource')
const R = require('ramda')

class SettingsManager {
  async getAllTeamcityUrls() {
    const teamcities = await settingsResource.getAllTeamcityServers()
    return R.map((tc) => tc.url, teamcities)
  }

  async getSoundVolume() {
    const params = await settingsResource.getSettings()
    return params.volume
  }
}

const instance = new SettingsManager()
module.exports = instance
