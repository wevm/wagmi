import { expect, test } from 'vitest'

import { parseCookie } from './cookie.js'

test('parseCookie', () => {
  expect(parseCookie('foo=bar', 'foo')).toBe('bar')
  expect(parseCookie('foo=bar; bar=foo', 'foo')).toBe('bar')
  expect(parseCookie('foo=bar; bar=foo', 'bar')).toBe('foo')
  expect(parseCookie('foo=bar; bar=foo', 'asd')).toBe(undefined)
  expect(parseCookie('foo=bar=special=chars', 'foo')).toBe('bar=special=chars')
  expect(parseCookie('foo=bar=special=chars; bar=foo', 'foo')).toBe(
    'bar=special=chars',
  )
  expect(parseCookie('', 'foo')).toBe(undefined)
})
