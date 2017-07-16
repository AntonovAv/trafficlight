const BuildType = require('../database/models').BuildType

module.exports.loadBuildTypes = async function(teamcity) {
  const buildTypes = await BuildType.find({teamcity: teamcity.id})
  return buildTypes
}
