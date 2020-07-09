const { MODULES, EVENT_TYPES } = require('../broker/events')
const route = require('./route')

const run = function(SE) {
  SE.on(MODULES.SERVICE, async (e) => {
    const { event, data } = e
    try {
      const res = route[event] ? await route[event](data) : null
      console.log(e)
      res &&
        SE.emit(MODULES.SERVICE, {
          event: EVENT_TYPES.SQL_SAVE,
          data: {
            msg: `Message stored in SQL id [${res.id}]`,
            uuid: data.uuid,
            original: { ...e.data },
          },
        })
    } catch (e) {
      SE.emit(MODULES.SERVICE, {
        event: EVENT_TYPES.SQL_FAIL,
        data: { ...data, msg: e },
      })
    }
  })
}

module.exports = run
