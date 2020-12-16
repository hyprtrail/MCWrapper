// @ts-check
import { McWrapper } from './McWrapper'

/** @type {Map<string, McWrapper>} */
const servers = new Map()

/**
 *
 * @param {string} name
 * @param {any} options
 * @return {McWrapper}
 */
export function getMcServer(name, options = {}) {
  if (servers.has(name)) {
    return servers.get(name)
  } else {
    servers.set(name, new McWrapper())
    return getMcServer(name)
  }
}
