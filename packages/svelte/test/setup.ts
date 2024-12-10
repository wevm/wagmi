import { beforeEach, vi } from 'vitest'

vi.mock('svelte')

beforeEach(async () => {
  // Make dates stable across runs
  Date.now = vi.fn(() => new Date(Date.UTC(2023, 1, 1)).valueOf())

  globalThis.__VERSION__ = 'x.y.z'

  vi.restoreAllMocks()
})
