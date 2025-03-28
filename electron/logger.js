const log = require('electron-log/main')

log.server = function (data) {
  // data is from server std.out and may includes multiple lines
  const messages = data.toString().split('\n')
  messages.forEach((msg) => {
    if (msg.length > 0) {
      if (msg.startsWith('INFO')) log.info(msg.substring(6))
      else if (msg.startsWith('WARN')) log.warn(msg.substring(6))
      else if (msg.startsWith('ERROR')) log.error(msg.substring(6))
      else if (msg.startsWith('DEBUG')) log.debug(msg.substring(6))
      else log.silly(msg)
    }
  })
}

module.exports = log
