const Settings = require('../database/models').Settings
const TeamcityServer = require('../database/models').TeamcityServer

module.exports.getSettings = function() {
  return Settings.findOne({})
}

module.exports.saveSettings = async function(data) {
  await Settings.remove({})
  return new Settings(data).save()
}

module.exports.saveTeamcityServer = async function(data) {
  const exists = data.id !== null && await module.exports.getTeamcityServer(data.id)
  if (exists) {
    return TeamcityServer.findByIdAndUpdate(data.id, data, {new: true})
  } else {
    return new TeamcityServer(data).save()
  }
}

module.exports.isTeamcityParametersExists = async function(id, name, url) {
  let res = await TeamcityServer.find({name, url}).nor({_id: id})
  return res.length !== 0
}

module.exports.getTeamcityServer = function(id) {
  return TeamcityServer.findById(id)
}

module.exports.getAllTeamcityServers = function() {
  return TeamcityServer.find({})
}

module.exports.deleteTeamcityServer = async function(id) {
  const obj = await TeamcityServer.findById(id)
  if (obj) {
    return obj.remove()
  }
  return Promise.resolve()
}
