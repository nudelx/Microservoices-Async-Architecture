const SQL = require('./src/SQL/SQL')
const Audit = require('./src/audit/audit')
const Service = require('./src/queues/service')
const Broker = require('./src/broker/events')
const { onMessage } = require('./src/queues/queMessageResolvers')
const destination = 'SERVICES/POC'
const { MODULES, EVENT_TYPES } = Broker

Broker.init([Audit, SQL]).emit(MODULES.SERVICE, {
  event: EVENT_TYPES.AUDIT_START,
  data: { msg: 'starting the service' },
})
const onMessageWithBroker = onMessage(Broker.SE)
Service.init(Broker).subscribe({ destination, onMessage: onMessageWithBroker })
