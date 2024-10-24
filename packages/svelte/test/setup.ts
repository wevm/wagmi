import { beforeAll, vi } from 'vitest'

// Make dates stable across runs
Date.now = vi.fn(() => new Date(Date.UTC(2023, 1, 1)).valueOf())

beforeAll(() => {
  // vitest doesn't seem to use the defined __VERSION__ in the vite.config.ts
  globalThis.__VERSION__ = 'x.y.z'
})
