const route = require('./route')
const { MODULES } = require('../broker/events')

const log = function(SE) {
  SE.on(MODULES.SERVICE, (e) => {
    // console.log(e)
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
