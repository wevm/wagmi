import { setLogger } from 'react-query'
import '@testing-library/jest-dom'

// Turn off network error logging
setLogger({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  error: () => {},
  log: console.log,
  warn: console.warn,
})
