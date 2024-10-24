import { config } from '@wagmi/test'
import { vi } from 'vitest'

type TestHookOptions = {
  shouldMockConfig?: boolean
}

export const testHook =
  (fn: () => void, options: TestHookOptions = {}) =>
  async () => {
    if (options.shouldMockConfig ?? true) {
      const svelte = await import('svelte')
      svelte.getContext = vi.fn().mockReturnValue(config)
    }

    const cleanup = $effect.root(fn)

    cleanup()
  }
