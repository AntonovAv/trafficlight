const Sound = require('../database/models').Sound

module.exports.getAllSounds = function() {
  return Sound.find({})
    .select('id name')
}

module.exports.getSound = function(id) {
  return Sound.findById(id)
    .select('id name')
}

module.exports.getSoundWithContent = function(id) {
  return Sound.findById(id)
}

module.exports.saveSound = function({name, content}) {
  return new Sound({
    name: name,
    content: content,
  }).save()
}

module.exports.countWithSameName = function(name) {
  return Sound.count({
    name: name
  })
}
