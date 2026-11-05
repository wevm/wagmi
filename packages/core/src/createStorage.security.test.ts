import { afterEach, expect, test, vi } from 'vitest'

import { getDefaultStorage } from './createStorage.js'

afterEach(() => vi.unstubAllGlobals())

test('falls back when access to localStorage is denied', () => {
  vi.stubGlobal('window', {
    get localStorage() {
      throw new DOMException(
        'Access is denied for this document',
        'SecurityError',
      )
    },
  })

  const storage = getDefaultStorage()
  expect(storage.getItem('wagmi.store')).toBeNull()
  expect(() => storage.setItem('wagmi.store', 'value')).not.toThrow()
  expect(() => storage.removeItem('wagmi.store')).not.toThrow()
})

test('uses available localStorage', () => {
  const localStorage = {
    getItem: vi.fn(() => 'value'),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  }
  vi.stubGlobal('window', { localStorage })

  const storage = getDefaultStorage()
  expect(storage.getItem('key')).toBe('value')
  storage.setItem('key', 'next')
  storage.removeItem('key')
  expect(localStorage.getItem).toHaveBeenCalledWith('key')
  expect(localStorage.setItem).toHaveBeenCalledWith('key', 'next')
  expect(localStorage.removeItem).toHaveBeenCalledWith('key')
})

test('falls back without a browser window', () => {
  vi.stubGlobal('window', undefined)
  expect(getDefaultStorage().getItem('wagmi.store')).toBeNull()
})
