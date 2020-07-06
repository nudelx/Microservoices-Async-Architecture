const EventEmitter = require('events')
const { MODULES, EVENT_TYPES } = require('./eventTypes')

module.exports = {
  MODULES,
  EVENT_TYPES,
  init(modules = []) {
    this.SE = new EventEmitter()
    modules.forEach((m) => {
      m(this.SE)
    })
    return this.SE
  },

  LOG_ERROR() {
    console.error(`Unrecognised event ${JSON.stringify(e)}`)
  },
  GET_DATE() {
    const today = new Date()
    const date =
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    const time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    return date + ' ' + time
  },
}
