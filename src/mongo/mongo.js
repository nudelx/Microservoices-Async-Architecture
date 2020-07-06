const dbUrl =
  'mongodb+srv://user:user123@cluster0.bb7jy.mongodb.net/poc_db?retryWrites=true&w=majority'
const mongoose = require('mongoose')
const Messages = require('./model')
const route = require('./route')
const chalk = require('chalk')
const { MODULES, EVENT_TYPES } = require('../broker/events')

const connectDb = () => {
  mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection
  // db.on('error', console.error.bind(console, 'connection error:'))
  // db.once('open', function() {
  //   console.log(chalk.hex('#009432').inverse(' Mongo connected \n'))
  // })
  // mongoose.set('debug', true)
  return mongoose
}

const run = function(SE) {
  connectDb()
  SE.on(MODULES.SERVICE, async (e) => {
    const { event, data } = e
    try {
      const res = route[event] ? await route[event](data) : null
      res &&
        SE.emit(MODULES.SERVICE, {
          event: EVENT_TYPES.MONGO_SAVE,
          data: {
            msg: `Message stored in MONGO id [${res._id}]`,
            uuid: data.uuid,
          },
        })
    } catch (e) {
      SE.emit(MODULES.SERVICE, {
        event: EVENT_TYPES.MONGO_FAIL,
        data: { ...data, msg: e },
      })
    }
  })
}
module.exports = run
