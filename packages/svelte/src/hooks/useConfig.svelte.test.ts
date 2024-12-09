import { testHook } from '@wagmi/test/svelte'
import { expect, test } from 'vitest'
import { useConfig } from './useConfig.svelte.js'

test(
  'mounts',
  testHook(() => {
    const config = useConfig()
    expect(config).toBeDefined()
  }),
)

test(
  'behavior: throws when not inside Provider',
  testHook(
    () => {
      expect(() => useConfig()).toThrow()
    },
    { shouldMockConfig: false },
  ),
)
