import { config } from '@wagmi/test'
import { renderComposable } from '@wagmi/test/vue'
import { celo } from 'viem/chains'
import { expect, test } from 'vitest'

import { useChains } from './useChains.js'

test('default', async () => {
  const [chains] = renderComposable(() => useChains())

  expect(chains.value.length).toBe(3)

  config._internal.chains.setState((x) => [...x, celo])

  expect(chains.value.length).toBe(4)
})
