import { connect } from '@wagmi/core'
import { config, wait } from '@wagmi/test'
import { flushSync } from 'svelte'
import { expect, test } from 'vitest'
import { testHook } from './test.svelte.js'
import { useConnections } from './useConnections.svelte.js'

test(
  'default',
  testHook(async () => {
    const result = $derived.by(useConnections())

    expect(result).toEqual([])

    await connect(config, { connector: config.connectors[0]! })

    await expect.poll(() => result.length).toEqual(1)
  }),
)

test(
  'parameters: config',
  testHook(
    () => {
      const result = $derived.by(useConnections(() => ({ config })))
      expect(result).toBeDefined()
    },
    { shouldMockConfig: false },
  ),
)
