import { describe, expect, it, vi } from 'vitest'

import { warn } from './warn'

describe('warn', () => {
  describe('args', () => {
    it('message', () => {
      console.warn = vi.fn()
      const message = 'foo bar baz'
      warn(message)
      expect(console.warn).toBeCalledWith(message)
    })

    it('id', () => {
      console.warn = vi.fn()
      const message = 'the quick brown fox'
      warn(message)
      warn(message, 'repeat')
      expect(console.warn).toBeCalledWith(message)
      expect(console.warn).toBeCalledTimes(2)
    })
  })

  describe('behavior', () => {
    it('calls only once per message', () => {
      console.warn = vi.fn()
      const message = 'hello world'
      warn(message)
      warn(message)
      expect(console.warn).toBeCalledWith(message)
      expect(console.warn).toBeCalledTimes(1)
    })
  })
})
