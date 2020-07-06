const { EVENT_TYPES } = require('../broker/events')
const Messages = require('./model')
const route = {
  [EVENT_TYPES.SQL_SAVE]: (e) => {
    try {
      const { original } = e
      const Message = new Messages({
        uuid: original.data.uuid,
        text: original.data.body,
      })
      return Message.save()
    } catch (e) {
      throw 'MONGO FAILED: ' + e
    }
  },
}

module.exports = route
