const { EVENT_TYPES } = require('../broker/events')
const Messages = require('./model')
const route = {
  [EVENT_TYPES.SERVICE_MESSAGE_RECEIVED]: async ({ body, uuid }) => {
    try {
      const msg = await Messages.create({ body, uuid })
      return await msg.save()
    } catch (e) {
      throw 'SQL FAILED: ' + e
    }
  },

  [EVENT_TYPES.SERVICE_TRANSACTION_ROLLBACK]: async ({ uuid }) => {
    try {
      const res = await Messages.destroy({
        where: {
          uuid,
        },
      })
      return null
    } catch (e) {
      throw 'SQL FAILED: ' + e
    }
  },
}

module.exports = route
