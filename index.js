const SQL = require('./src/SQL/SQL')
const Mongo = require('./src/mongo/mongo')
const Audit = require('./src/audit/audit')
const Service = require('./src/service/service')
const Broker = require('./src/broker/events')
const { onMessage } = require('./src/service/queMessageResolvers')
const destination = 'SERVICES/POC'
const { MODULES, EVENT_TYPES } = Broker

Broker.init([Audit, SQL, Mongo]).emit(MODULES.SERVICE, {
  event: EVENT_TYPES.AUDIT_START,
  data: { msg: 'starting the service' },
})
const onMessageWithBroker = onMessage(Broker.SE)
Service.init(Broker).subscribe({ destination, onMessage: onMessageWithBroker })
