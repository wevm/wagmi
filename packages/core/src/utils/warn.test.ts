import { warn } from './warn'

describe('warn', () => {
  describe('args', () => {
    it('message', () => {
      console.warn = jest.fn()
      const message = 'foo bar baz'
      warn(message)
      expect(console.warn).toBeCalledWith(message)
    })

    it('id', () => {
      console.warn = jest.fn()
      const message = 'the quick brown fox'
      warn(message)
      warn(message, 'repeat')
      expect(console.warn).toBeCalledWith(message)
      expect(console.warn).toBeCalledTimes(2)
    })
  })

  describe('behavior', () => {
    it('calls only once per message', () => {
      console.warn = jest.fn()
      const message = 'hello world'
      warn(message)
      warn(message)
      expect(console.warn).toBeCalledWith(message)
      expect(console.warn).toBeCalledTimes(1)
    })
  })
})
