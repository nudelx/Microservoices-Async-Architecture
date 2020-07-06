const EventEmitter = require('events')
module.exports = {
  MODULES: {
    AUDIT: 'AUDIT',
  },
  EVENT_TYPES: {
    AUDIT_START: 'AUDIT_START',
    AUDIT_INFO: 'AUDIT_INFO',
    AUDIT_LOG: 'AUDIT_LOG',
    AUDIT_ERROR: 'AUDIT_ERROR',
    AUDIT_DONE: 'AUDIT_DONE',
  },

  SE: new EventEmitter(),
}
