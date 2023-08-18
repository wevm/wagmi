import { chain, config } from '@wagmi/test'
import { describe, expect, test } from 'vitest'

import { getChainId, watchChainId } from './getChainId.js'

describe('getChainId', () => {
  test('default', async () => {
    expect(getChainId(config)).toEqual(chain.mainnet.id)
    config.setState((x) => ({ ...x, chainId: chain.mainnet2.id }))
    expect(getChainId(config)).toEqual(chain.mainnet2.id)
  })
})

describe('watchChainId', () => {
  test('default', async () => {
    const chainIds: number[] = []
    const unwatch = watchChainId(config, {
      onChange: (chainId) => chainIds.push(chainId),
    })
    config.setState((x) => ({ ...x, chainId: chain.mainnet2.id }))
    config.setState((x) => ({ ...x, chainId: chain.mainnet.id }))
    config.setState((x) => ({ ...x, chainId: 456 }))

    expect(chainIds).toMatchInlineSnapshot(`
      [
        1,
        456,
      ]
    `)

    unwatch()
  })
})
