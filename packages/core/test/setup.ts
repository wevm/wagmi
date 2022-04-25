import '@testing-library/jest-dom'

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    removeItem: jest.fn(() => null),
    setItem: jest.fn(() => null),
  },
  writable: true,
})
