import { afterEach, describe, expect, it, vi } from 'vitest'

import { watchConsole } from '../test'

import * as logger from './logger'

const mockLog = vi.fn()

describe('logger', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe.each([
    { level: 'success' },
    { level: 'info' },
    { level: 'log' },
    { level: 'warn' },
    { level: 'error' },
  ])('${level}()', ({ level }) => {
    it(`logs message "${level}"`, () => {
      const spy = vi.spyOn(logger, level as any)
      spy.mockImplementation(mockLog)
      const loggerFn = (logger as any)[level]
      loggerFn(level)
      expect(spy).toHaveBeenCalledWith(level)
    })
  })

  it('spinner', () => {
    const console = watchConsole()
    const spinner = logger.spinner()

    spinner.start('Foo bar baz')
    spinner.succeed('Foo bar baz')
    spinner.fail('Foo bar baz')
    expect(console.formatted).toMatchInlineSnapshot(`
      "- Foo bar baz
      ✔ Foo bar baz
      ✖ Foo bar baz"
    `)
  })
})
