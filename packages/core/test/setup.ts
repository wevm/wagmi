import { vi } from 'vitest'

vi.mock('../src/version.ts', () => {
  return { version: 'x.y.z' }
})
