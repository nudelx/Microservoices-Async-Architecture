const mongoose = require('mongoose')
const Schema = mongoose.Schema
const messages = new Schema({
  uuid: String,
  text: String,
})

module.exports = mongoose.model('Messages', messages)
