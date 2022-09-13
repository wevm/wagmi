import { afterEach, describe, expect, it, vi } from 'vitest'

import { createClient } from '../client'

import { logWarn } from './logger'

let consoleWarnMessages: string[] = []
const consoleWarn = vi
  .spyOn(console, 'warn')
  .mockImplementation((message) => consoleWarnMessages.push(message))

describe('logger', () => {
  afterEach(() => {
    consoleWarnMessages = []
    consoleWarn.mockClear()
  })

  describe('logWarn', () => {
    it('logs warnings', () => {
      createClient({ provider: () => null as any })
      logWarn('foo')
      logWarn('bar')
      logWarn('baz')
      expect(consoleWarnMessages).toEqual(['foo', 'bar', 'baz'])
      expect(consoleWarn).toBeCalledTimes(3)
    })

    it('custom logger', () => {
      const warnMessages: string[] = []
      createClient({
        provider: () => null as any,
        logger: {
          warn: (message) => warnMessages.push(message),
        },
      })
      logWarn('foo')
      logWarn('bar')
      logWarn('baz')
      expect(warnMessages).toEqual(['foo', 'bar', 'baz'])
      expect(consoleWarnMessages).toEqual([])
      expect(consoleWarn).toBeCalledTimes(0)
    })

    it('custom logger - nullish warn', () => {
      createClient({
        provider: () => null as any,
        logger: {
          warn: null,
        },
      })
      logWarn('foo')
      logWarn('bar')
      logWarn('baz')
      expect(consoleWarnMessages).toEqual([])
      expect(consoleWarn).toBeCalledTimes(0)
    })
  })
})
