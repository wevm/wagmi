import { config } from '@wagmi/test'
import { expect, test } from 'vitest'
import { testHook } from './test.svelte.js'
import { useChains } from './useChains.svelte.js'

test(
  'default',
  testHook(async () => {
    const result = $derived.by(useChains())

    expect(result.map((x) => x.id)).toMatchInlineSnapshot(`
    [
      1,
      456,
      10,
    ]
  `)
  }),
)

test(
  'parameters: config',
  testHook(
    () => {
      const result = $derived.by(useChains(() => ({ config })))
      expect(result.map((x) => x.id)).toMatchInlineSnapshot(`
    [
      1,
      456,
      10,
    ]
  `)
    },
    { shouldMockConfig: false },
  ),
)
