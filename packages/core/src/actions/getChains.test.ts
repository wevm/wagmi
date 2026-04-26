import { chain, config } from '@wagmi/test'
import { http } from 'viem'
import { expect, test } from 'vitest'

import { createConfig } from '../createConfig.js'
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

test('behavior: isolates cache per config', () => {
  const config1 = createConfig({
    chains: [chain.mainnet, chain.mainnet2],
    transports: {
      [chain.mainnet.id]: http(),
      [chain.mainnet2.id]: http(),
    },
  })
  const config2 = createConfig({
    chains: [chain.mainnet, chain.mainnet2],
    transports: {
      [chain.mainnet.id]: http(),
      [chain.mainnet2.id]: http(),
    },
  })

  const chains1 = getChains(config1)
  const chains2 = getChains(config2)

  expect(chains1).toBe(config1.chains)
  expect(chains2).toBe(config2.chains)
  expect(chains1).not.toBe(chains2)
})
