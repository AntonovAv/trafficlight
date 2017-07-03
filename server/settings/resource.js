const Settings = require('../database/models').Settings

module.exports.getSettings = function() {
  return Settings.findOne({})
}

module.exports.saveSettings = async function(data) {
  await Settings.remove({})
  return new Settings(data).save()
}
