const { EVENT_TYPES } = require('../broker/events')
const Messages = require('./model')
const route = {
  [EVENT_TYPES.SQL_SAVE]: (e) => {
    try {
      const {
        original: { uuid, body },
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

  [EVENT_TYPES.SERVICE_TRANSACTION_ROLLBACK]: async ({ uuid }) => {
    try {
      Messages.deleteOne({ uuid }, function(err) {})
      return null
    } catch (e) {
      throw 'MONGO FAILED: ' + e
    }
  },
}

module.exports = route
