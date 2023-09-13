import { afterEach, expect, test, vi } from 'vitest'

import { watchConsole } from '../test/utils.js'

import * as logger from './logger.js'

const mockLog = vi.fn()

afterEach(() => {
  vi.restoreAllMocks()
})

test.each(['success', 'info', 'log', 'warn', 'error'])('%s()', (level) => {
  const spy = vi.spyOn(logger, level as any)
  spy.mockImplementation(mockLog)
  const loggerFn = (logger as any)[level]
  loggerFn(level)
  expect(spy).toHaveBeenCalledWith(level)
})

test('spinner', () => {
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
