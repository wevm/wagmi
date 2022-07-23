import { vi } from 'vitest'

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => null),
    removeItem: vi.fn(() => null),
    setItem: vi.fn(() => null),
  },
  writable: true,
})
