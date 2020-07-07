const { EVENT_TYPES } = require('../broker/events')
const Messages = require('./model')
const route = {
  [EVENT_TYPES.SQL_SAVE]: (e) => {
    try {
      const {
        original: {
          data: { uuid, body },
        },
      } = e
      const Message = new Messages({
        uuid,
        text: body,
      })
      return Message.save()
    } catch (e) {
      throw 'MONGO FAILED: ' + e
    }
  },
}

module.exports = route
