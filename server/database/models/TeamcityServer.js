const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TeamcityServerSchema = new Schema({
  name: {
    type: String,
    validate: function() {
      return this.name.length > 0
    }
  },
  url: {
    type: String,
    validate: function() {
      return this.url.length > 0
    }
  },
  ignoredBuildTypes: {
    type: [String],
    default: []
  },
})

module.exports = function() {
  mongoose.model('TeamcityServer', TeamcityServerSchema)
}
