const mongoose = require('mongoose')
require('./initModels')

module.exports = {
  Sound: mongoose.model('Sound'),
  Settings: mongoose.model('Settings'),
}
