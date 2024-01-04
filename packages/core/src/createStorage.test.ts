import { expect, test, vi } from 'vitest'

import { createStorage } from './createStorage.js'

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => null),
    removeItem: vi.fn(() => null),
    setItem: vi.fn(() => null),
  },
  writable: true,
})

test('inits', () => {
  const storage = createStorage({ storage: window.localStorage })
  expect(storage).toBeDefined()
})

test('getItem', () => {
  const storage = createStorage({ storage: window.localStorage })
  storage.getItem('recentConnectorId')
  expect(window.localStorage.getItem).toHaveBeenCalledTimes(1)
  expect(window.localStorage.getItem).toHaveBeenCalledWith(
    'wagmi.recentConnectorId',
  )
})

test('setItem', () => {
  const storage = createStorage({ storage: window.localStorage })
  storage.setItem('recentConnectorId', 'bar')
  expect(window.localStorage.setItem).toHaveBeenCalledTimes(1)
  expect(window.localStorage.setItem).toHaveBeenCalledWith(
    'wagmi.recentConnectorId',
    '"bar"',
  )
})

test('removeItem', () => {
  const storage = createStorage({ storage: window.localStorage })
  storage.removeItem('recentConnectorId')
  expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)
  expect(window.localStorage.removeItem).toHaveBeenCalledWith(
    'wagmi.recentConnectorId',
  )
})
