const { EVENT_TYPES } = require('../broker/events')
const route = {
  [EVENT_TYPES.SERVICE_MESSAGE_RECEIVED]: async ({ body, uuid }) => {
    try {
      const msg = await Messages.create({ body, uuid, jopa })
      return await msg.save()
    } catch (e) {
      throw 'SQL FAILED: ' + e
    }
  },
}

module.exports = route
