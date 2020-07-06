const chalk = require('chalk')
const { EVENT_TYPES, logError, getDate } = require('../broker/events')

const route = {
  [EVENT_TYPES.AUDIT_START]: (str) =>
    chalk.white(' 🏁 ') +
    chalk.yellow(
      ` [${EVENT_TYPES.AUDIT_START}] [${getDate()}] :: ${str ? str : ''} `
    ),

  [EVENT_TYPES.SERVICE_MESSAGE_RECEIVED]: (str) =>
    chalk.blue(' 🔹 ') +
    chalk.blue(
      ` [${EVENT_TYPES.AUDIT_INFO}]  [${getDate()}] :: ${str ? str : ''} `
    ),
  [EVENT_TYPES.SQL_SAVE]: (str) =>
    chalk.blue(' 🔹 ') +
    chalk.blue(
      ` [${EVENT_TYPES.AUDIT_INFO}]  [${getDate()}] :: ${str ? str : ''} `
    ),

  [EVENT_TYPES.QUEUE_SUBSCRIPTION]: (str) =>
    chalk.blue(' 🔹 ') +
    chalk.blue(
      ` [${EVENT_TYPES.AUDIT_INFO}]  [${getDate()}] :: ${str ? str : ''} `
    ),

  [EVENT_TYPES.SERVICE_MESSAGE_FAILED]: (str) =>
    chalk.red(' ♦️ ') +
    chalk.red(
      ` [${EVENT_TYPES.AUDIT_INFO}]  [${getDate()}] :: ${str ? str : ''} `
    ),

  [EVENT_TYPES.SQL_FAIL]: (str) =>
    chalk.red(' ♦️ ') +
    chalk.red(
      ` [${EVENT_TYPES.SQL_FAIL}]  [${getDate()}] :: ${str ? str : ''} `
    ),
}

module.exports = route
