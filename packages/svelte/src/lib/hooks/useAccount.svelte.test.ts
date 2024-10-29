import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { expect, test } from 'vitest'
import { testHook } from './test.svelte.js'
import { useAccount } from './useAccount.svelte.js'

test(
  'default',
  testHook(async () => {
    const result = $derived.by(useAccount())

    expect(result.address).not.toBeDefined()
    expect(result.status).toEqual('disconnected')

    await connect(config, { connector: config.connectors[0]! })

    await expect.poll(() => result.address).toBeDefined()
    await expect.poll(() => result.status).toEqual('connected')

    await disconnect(config)
  }),
)

test(
  'parameters: config',
  testHook(
    () => {
      const result = $derived.by(() => useAccount(() => ({ config })))
      expect(result).toBeDefined()
    },
    { shouldMockConfig: false },
  ),
)
