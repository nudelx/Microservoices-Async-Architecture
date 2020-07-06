const SQL = require('./src/SQL/SQL')
const audit = require('./src/audit/audit')
const service = require('./src/service')
const { MODULES, EVENT_TYPES, init } = require('./src/broker/events')
const { onMessage } = require('./src/queues/queMessageResolvers')
const SE = init([audit, SQL])
const destination = 'SERVICES/POC'

SE.emit(MODULES.SERVICE, {
  event: EVENT_TYPES.AUDIT_START,
  data: { msg: 'Starting the service' },
})
service.init().subscribe({ destination, onMessage })
