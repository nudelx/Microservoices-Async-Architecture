const chalk = require('chalk')
const {
  EVENT_TYPES,
  MODULES,
  LOG_ERROR,
  GET_DATE,
} = require('../broker/events')
const route = {
  [EVENT_TYPES.AUDIT_START]: (str) =>
    chalk.white(' 🏁 ') +
    chalk.yellow(
      ` [${EVENT_TYPES.AUDIT_START}] [${GET_DATE()}] :: ${str ? str : ''} `
    ),

  [EVENT_TYPES.SERVICE_MESSAGE_RECEIVED]: (str) =>
    chalk.blue(' 🔹 ') +
    chalk.blue(
      ` [${EVENT_TYPES.AUDIT_INFO}]  [${GET_DATE()}] :: ${str ? str : ''} `
    ),

  [EVENT_TYPES.SERVICE_MESSAGE_FAILED]: (str) =>
    chalk.red(' ♦️ ') +
    chalk.red(
      ` [${EVENT_TYPES.AUDIT_INFO}]  [${GET_DATE()}] :: ${str ? str : ''} `
    ),

  [EVENT_TYPES.SQL_FAIL]: (str) =>
    chalk.red(' ♦️ ') +
    chalk.red(
      ` [${EVENT_TYPES.SQL_FAIL}]  [${GET_DATE()}] :: ${str ? str : ''} `
    ),
}

module.exports = route
