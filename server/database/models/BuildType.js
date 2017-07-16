const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BuildTypeSchema = new Schema({
  teamcity: {
    type: String,
    ref: 'TeamcityServer',
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  }
})

module.exports = function() {
  mongoose.model('BuildType', BuildTypeSchema)
}
