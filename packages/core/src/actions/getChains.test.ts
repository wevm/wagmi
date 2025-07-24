import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getChains } from './getChains.js'

test('default', async () => {
  expect(getChains(config)).toEqual([
    chain.mainnet,
    chain.mainnet2,
    chain.optimism,
  ])
  config._internal.chains.setState([chain.mainnet, chain.mainnet2])
  expect(getChains(config)).toEqual([chain.mainnet, chain.mainnet2])
})
