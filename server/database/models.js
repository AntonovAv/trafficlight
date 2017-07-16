const mongoose = require('mongoose')

require('./models/Sound')()
require('./models/Settings')()
require('./models/TeamcityServer')()
require('./models/BuildType')()

module.exports = {
  Sound: mongoose.model('Sound'),
  Settings: mongoose.model('Settings'),
  TeamcityServer: mongoose.model('TeamcityServer'),
  BuildType: mongoose.model('BuildType'),
}
