const EventEmitter = require('events')
const { MODULES, EVENT_TYPES } = require('./eventTypes')
const Broker = {
  MODULES,
  EVENT_TYPES,
  init(modules = []) {
    this.SE = new EventEmitter()
    modules.forEach((m) => {
      m(this.SE)
    })
    return this.SE
  },

  logError() {
    console.error(`Unrecognised event ${JSON.stringify(e)}`)
  },
  getDate() {
    const today = new Date()
    const date =
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    const time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    return date + ' ' + time
  },
}
module.exports = Broker
