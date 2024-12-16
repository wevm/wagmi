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
  const spinner = logger.spinner('start')
  spinner.start()
  spinner.success('success')
  spinner.error('error')
  expect(console.formatted).toMatchInlineSnapshot(`
    "- start
    √ success
    × error"
  `)
})
