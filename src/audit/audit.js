const route = require('./route')
const { MODULES } = require('../broker/events')

const log = function(myEmitter) {
  myEmitter.on(MODULES.SERVICE, (e) => {
    const {
      event,
      data: { msg, uuid },
    } = e

    route[event]
      ? console.log(route[event](`${msg} ${uuid ? ':' + uuid : ''}`))
      : null
  })
}

module.exports = log
