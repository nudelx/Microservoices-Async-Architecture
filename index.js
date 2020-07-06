// const m1 = require('./src/module1')
// const m2 = require('./src/module2')
const audit = require('./src/audit')
const service = require('./src/service')
const { MODULES, EVENT_TYPES, SE } = require('./src/events')

const { v4: uuidv4 } = require('uuid')
uuidv4()
audit(SE)
//////////////

const onMessage = function(args) {
  const { error, body, client, message } = args
  if (error) {
    SE.emit(MODULES.AUDIT, 'Queue module error')
  }

  SE.emit(MODULES.AUDIT, {
    event: EVENT_TYPES.AUDIT_INFO,
    data: 'Message received',
  })

  client.ack(message)
  console.log('Message: ', body)
}

///////////////////////////////
SE.emit(MODULES.AUDIT, {
  event: EVENT_TYPES.AUDIT_START,
  data: 'Starting the service',
})
service.init().subscribe({ destination: 'SERVICES/POC', onMessage })
