// @ts-check
import { spawn } from 'child_process'
const path = require('path')

/**
 * @typedef { "data" | "chat" | "login" | "started" | "starting" | "logout" | "advancement" | "achievement" | "death" } EventType
 */
/**
 * @typedef {Function} EventFunc
 */
/**
 * @typedef {(funcs: Function[], data: any)=>void} FireEvent
 */
/**
 * @typedef {Object} StdoutData
 * @property {string} time
 * @property {string} thread
 * @property {string} level
 * @property {string} message
 */

/**
 *
 */
export class McWrapper {
  constructor() {
    /** @type {Map<string, EventFunc[]>} */
    this.listeners = new Map()
    /** @type {Map<string, EventFunc>} */
    this.fireEvents = new Map()
  }

  /**
   *
   */
  startServer() {
    const mcfolder = path.resolve(__dirname, '..', 'Minecraft')
    const serverjar = 'server.jar'

    const mc = spawn('java', ['-Xmx8G', '-Xms512M', '-jar', serverjar, 'nogui'], {
      cwd: mcfolder,
    })

    mc.on('close', (code, signal) => {
      console.log('CLOSING MC')
    })

    mc.on('disconnect', (listener) => {
      console.log('DISCONMECT')
    })

    mc.on('error', (err) => {
      console.log('error')
    })

    mc.on('exit', (listener, signal) => {
      console.log('exit')
    })

    mc.on('message', (msg, handle) => {
      console.log(`${msg}  :::: ${handle}`)
    })

    mc.stderr.on('data', (listener) => {
      console.log(`ERRLISTNEER : ${listener}`)
    })

    mc.stdout.on('data', (chunk) => {
      /** @type {string} */
      const content = chunk.toString().trim()
      const lines = content.split('\n').map((line) => {
        return line.trim()
      })

      const parts = /^\[(.*?)\] \[(.*?)\/(.*?)\]: (.*?)$/

      const matches = lines.map((line) => line.match(parts))

      /**
       *
       * @type {StdoutData[]}
       */
      const datas = matches.map(([, time, thread, level, message]) => {
        return {
          time,
          thread,
          level,
          message,
        }
      })

      datas.forEach((data) => this.fireEvent('data', data))
    })
  }

  /**
   *
   * @param {EventType} type
   * @param {FireEvent} fireEvent
   */
  registerFireEvent(type, fireEvent) {
    this.fireEvents.set(type, fireEvent)
  }

  /**
   *
   * @param {EventType} eventtype
   * @param {EventFunc} ev
   */
  addEventListener(eventtype, ev) {
    if (!this.listeners.has(eventtype)) {
      this.listeners.set(eventtype, [ev])
    } else {
      this.listeners.get(eventtype).push(ev)
    }
  }

  /**
   *
   * @param {EventType} type
   * @param {object} data
   */
  fireEvent(type, data) {
    if (!this.fireEvents.has(type)) {
      console.error(`${this.constructor.name}::registerFireEvent > No event ${type}`)
    }
    if (this.listeners.has(type) && this.fireEvents.has(type)) {
      const funcs = this.listeners.get(type)
      this.fireEvents.get(type)(funcs, data)
    }
  }

  toString() {
    return [...this.listeners.entries()]
      .map((type, func) => `${type} ${func.toString()}\n`)
      .join('\n')
  }
}
