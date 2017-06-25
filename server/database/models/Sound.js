const mongoose = require('mongoose')
const Schema = mongoose.Schema

const soundSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    default: 'mp3',
  },
  content: Buffer
})

module.exports = function() {
  mongoose.model('Sound', soundSchema)
}
