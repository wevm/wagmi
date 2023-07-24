import { config, testChains } from '@wagmi/test'
import { describe, expect, test } from 'vitest'

import { getChainId, watchChainId } from './getChainId.js'

describe('getChainId', () => {
  test('default', async () => {
    expect(getChainId(config)).toEqual(testChains.mainnet.id)
    config.setState((x) => ({ ...x, chainId: testChains.mainnet2.id }))
    expect(getChainId(config)).toEqual(testChains.mainnet2.id)
  })
})

describe('watchChainId', () => {
  test('default', async () => {
    const chainIds: number[] = []
    const unwatch = watchChainId(config, {
      onChange: (chainId) => chainIds.push(chainId),
    })
    config.setState((x) => ({ ...x, chainId: testChains.mainnet2.id }))
    config.setState((x) => ({ ...x, chainId: testChains.mainnet.id }))
    config.setState((x) => ({ ...x, chainId: 456 }))

    expect(chainIds).toMatchInlineSnapshot(`
      [
        123,
        456,
      ]
    `)

    unwatch()
  })
})
