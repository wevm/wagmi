import type { Config, State } from '../createConfig.js'
import type { BaseStorage } from '../createStorage.js'
import { deserialize } from './deserialize.js'

export const cookieStorage = {
  getItem(key) {
    if (typeof window === 'undefined') return null
    const value = parseCookie(document.cookie, key)
    return value ?? null
  },
  setItem(key, value) {
    if (typeof window === 'undefined') return
    document.cookie = `${key}=${value};Path=/;SameSite=Lax`
  },
  removeItem(key) {
    if (typeof window === 'undefined') return
    document.cookie = `${key}=;max-age=-1`
  },
} satisfies BaseStorage

export function cookieToInitialState(config: Config, cookie?: string | null) {
  if (!cookie) return undefined
  const key = `${config.storage?.key}.store`
  const parsed = parseCookie(cookie, key)
  if (!parsed) return undefined
  return deserialize<{ state: State }>(parsed).state
}

export function parseCookie(cookie: string, key: string) {
  const keyValue = cookie.split('; ').find((x) => x.startsWith(`${key}=`))
  if (!keyValue) return undefined
  return keyValue.substring(key.length + 1)
}
