import type Interop from './types/Interop'

/* eslint-disable no-console */
function promptNoElectron() {
  alert('You are not in Electron.')
}

// The following will be used if front end is run in browser during development.
const fallBack: Interop = {
  log: {
    info(msg: string) {
      console.info(msg)
    },
    debug(msg: string) {
      console.debug(msg)
    },
    warn(msg: string) {
      console.warn(msg)
    },
    error(msg: string) {
      console.error(msg)
    },
    log(msg: string) {
      console.log(msg)
    },
  },
  setBadgeCount(count: number) {
    console.info(count)
    promptNoElectron()
  },
  showOpenDialog() {
    return new Promise((resolve) => {
      promptNoElectron()
      resolve(undefined)
    })
  },
  showSaveDialog() {
    return new Promise((resolve) => {
      promptNoElectron()
      resolve(undefined)
    })
  },
}

export default fallBack
