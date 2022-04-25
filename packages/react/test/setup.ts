import '@testing-library/jest-dom'

// Make dates stable across runs
Date.now = jest.fn(() => new Date(Date.UTC(2022, 1, 1)).valueOf())

type ReactVersion = '17' | '18'
export const reactVersion: ReactVersion =
  <ReactVersion>process.env.REACT_VERSION || '17'

jest.mock('react', () => {
  const packages = {
    '18': 'react',
    '17': 'react-17',
  }

  return jest.requireActual(packages[reactVersion])
})

jest.mock('react-dom', () => {
  const packages = {
    '18': 'react-dom',
    '17': 'react-dom-17',
  }

  return jest.requireActual(packages[reactVersion])
})

jest.mock('react-dom/test-utils', () => {
  const packages = {
    '18': 'react-dom/test-utils',
    '17': 'react-dom-17/test-utils',
  }

  return jest.requireActual(packages[reactVersion])
})

jest.mock('@testing-library/react', () => {
  const packages = {
    '18': '@testing-library/react',
    '17': '@testing-library/react-hooks',
  }

  return jest.requireActual(packages[reactVersion])
})
