const { EVENT_TYPES, MODULES } = require('./events')
const chalk = require('chalk')
const getDate = () => {
  const today = new Date()
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  return date + ' ' + time
}

const getFormatByType = {
  [EVENT_TYPES.AUDIT_START]: (str) =>
    chalk.white(' 🏁 ') +
    chalk.yellow(
      ` [${EVENT_TYPES.AUDIT_START}] [${getDate()}] :: ${str ? str : ''} `
    ),

  [EVENT_TYPES.AUDIT_INFO]: (str) =>
    chalk.blue(' 🔹 ') +
    chalk.blue(
      ` [${EVENT_TYPES.AUDIT_INFO}]  [${getDate()}] :: ${str ? str : ''} `
    ),
}

const logError = (e) => {
  console.error(`Unrecognised event ${e}`)
}

const log = function(myEmitter) {
  myEmitter.on(MODULES.AUDIT, (e) => {
    const { event, data } = e
    getFormatByType[event]
      ? console.log(getFormatByType[event](data))
      : logError(e)
  })
}

module.exports = log
