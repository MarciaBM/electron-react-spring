const { app, contextBridge, ipcRenderer } = require('electron')
const log = require('./logger')

const LOG_PREFIX = '[ui]'

contextBridge.exposeInMainWorld('interop', {
  log: {
    info(msg) {
      log.info(`${LOG_PREFIX} ${msg}`)
    },
    debug(msg) {
      log.debug(`${LOG_PREFIX} ${msg}`)
    },
    warn(msg) {
      log.warn(`${LOG_PREFIX} ${msg}`)
    },
    error(msg) {
      log.error(`${LOG_PREFIX} ${msg}`)
    },
    log(msg) {
      log.silly(`${LOG_PREFIX} ${msg}`)
    },
  },
  setBadgeCount(count) {
    return ipcRenderer.send('app:badgeCount', count)
  },
  showOpenDialog() {
    return ipcRenderer.invoke('dialog:openFile')
  },
  showSaveDialog() {
    return ipcRenderer.invoke('dialog:saveFile')
  },
})
