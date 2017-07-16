const mongoose = require('mongoose')
const Schema = mongoose.Schema

const soundSchema = new Schema({
  brightness: {
    r: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    g: {
      type: Number,
      default: 0,
    },
  },
  volume: {
    type: Number,
    default: 0,
  },
  hosts: [{
    url: String,
    ignoredIds: [{type: String}]
  }]
})

module.exports = function() {
  mongoose.model('Settings', soundSchema)
}

