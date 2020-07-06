const EventType = require('../eventType')

const run = function(myEmitter) {
  myEmitter.on(EventType.START, (data) => {
    console.log(`module ${__filename} accepted event  ${data ? data : ''}`)
  })
}

module.exports = run
