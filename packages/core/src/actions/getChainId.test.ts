import { describe, expect, test } from 'vitest'

import { config, testChains } from '../../test/index.js'
import { getChainId, watchChainId } from './getChainId.js'

describe('getChainId', () => {
  test('default', async () => {
    expect(getChainId(config)).toEqual(testChains.anvil.id)
    config.setState((x) => ({ ...x, chainId: testChains.anvilTwo.id }))
    expect(getChainId(config)).toEqual(testChains.anvilTwo.id)
  })
})

describe('watchChainId', () => {
  test('default', async () => {
    const chainIds: number[] = []
    const unwatch = watchChainId(config, {
      onChange: (chainId) => chainIds.push(chainId),
    })
    config.setState((x) => ({ ...x, chainId: testChains.anvilTwo.id }))
    config.setState((x) => ({ ...x, chainId: testChains.anvil.id }))
    config.setState((x) => ({ ...x, chainId: 69 }))

    expect(chainIds).toMatchInlineSnapshot(`
      [
        123,
        69,
      ]
    `)

    unwatch()
  })
})
