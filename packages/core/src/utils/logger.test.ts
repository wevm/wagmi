import { afterEach, describe, expect, it, vi } from 'vitest'

import { createClient } from '../client'

import { logWarning } from './logger'

let consoleWarnMessages: string[] = []
const consoleWarn = vi
  .spyOn(console, 'warn')
  .mockImplementation((message) => consoleWarnMessages.push(message))

describe('logger', () => {
  afterEach(() => {
    consoleWarnMessages = []
    consoleWarn.mockClear()
  })

  describe('logWarning', () => {
    it('logs warnings', () => {
      createClient({ provider: () => null as any })
      logWarning('foo')
      logWarning('bar')
      logWarning('baz')
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
      logWarning('foo')
      logWarning('bar')
      logWarning('baz')
      expect(warnMessages).toEqual(['foo', 'bar', 'baz'])
      expect(consoleWarnMessages).toEqual([])
      expect(consoleWarn).toBeCalledTimes(0)
    })
  })
})
