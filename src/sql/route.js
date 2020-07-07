const { EVENT_TYPES } = require('../broker/events')
const Messages = require('./model')
const route = {
  [EVENT_TYPES.SERVICE_MESSAGE_RECEIVED]: async ({ body, uuid }) => {
    try {
      const msg = await Messages.create({ body, uuid, alex })
      return await msg.save()
    } catch (e) {
      throw 'SQL FAILED: ' + e
    }
  },
}

module.exports = route
