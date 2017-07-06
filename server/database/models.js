const mongoose = require('mongoose')

require('./models/Sound')()
require('./models/Settings')()
require('./models/TeamcityServer')()

module.exports = {
  Sound: mongoose.model('Sound'),
  Settings: mongoose.model('Settings'),
  TeamcityServer: mongoose.model('TeamcityServer'),
}
