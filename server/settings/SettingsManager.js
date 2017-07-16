const settingsResource = require('./resource')

class SettingsManager {
  async getAllTeamcities() {
    const teamcities = await settingsResource.getAllTeamcityServers()
    return teamcities
  }

  async getSoundVolume() {
    const params = await settingsResource.getSettings()
    return params.volume
  }
}

const instance = new SettingsManager()
module.exports = instance
