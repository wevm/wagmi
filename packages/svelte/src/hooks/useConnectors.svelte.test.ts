import { mock } from '@wagmi/connectors'
import { accounts, config } from '@wagmi/test'
import { testHook } from '@wagmi/test/svelte'
import { expect, test } from 'vitest'
import { useConnectors } from './useConnectors.svelte.js'

test(
  'default',
  testHook(async () => {
    const result = $derived.by(useConnectors())

    const count = config.connectors.length
    expect(result.length).toBe(count)
    expect(result).toEqual(config.connectors)

    config._internal.connectors.setState(() => [
      ...config.connectors,
      config._internal.connectors.setup(mock({ accounts })),
    ])

    await expect.poll(() => result.length).toBe(count + 1)
  }),
)

test(
  'parameters: config',
  testHook(
    () => {
      const result = $derived.by(useConnectors(() => ({ config })))
      expect(result).toBeDefined()
    },
    { shouldMockConfig: false },
  ),
)
