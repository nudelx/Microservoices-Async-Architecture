const { MODULES, EVENT_TYPES } = require('../broker/events')
const { v4: uuidv4 } = require('uuid')
const printMessage = (body) => {
  console.log('INCOMING MESSAGE **************')
  console.log(body)
  console.log('**********************')
}

const onMessage = (SE) => (args) => {
  const { error, body, client, message } = args
  if (error) {
    SE.emit(MODULES.SERVICE, { data: { msg: 'Queue module error' } })
  }

  SE.emit(MODULES.SERVICE, {
    event: EVENT_TYPES.SERVICE_MESSAGE_RECEIVED,
    data: { msg: 'Message received', body, uuid: uuidv4() },
  })

  // printMessage(body)
  client.ack(message)
}

module.exports = {
  onMessage,
  printMessage,
}
