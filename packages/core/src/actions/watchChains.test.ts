import { chain, config } from '@wagmi/test'
import type { Chain } from 'viem'
import { expect, test } from 'vitest'

import { watchChains } from './watchChains.js'

test('default', async () => {
  let chains: readonly [Chain, ...Chain[]] = config.chains
  const unwatch = watchChains(config, {
    onChange(nextChains) {
      chains = nextChains
    },
  })

  config._internal.chains.setState([chain.mainnet, chain.mainnet2])
  expect(chains.map((x) => x.id)).toMatchInlineSnapshot(`
    [
      1,
      456,
    ]
  `)

  config._internal.chains.setState([
    chain.mainnet,
    chain.mainnet2,
    chain.optimism,
  ])
  expect(chains.map((x) => x.id)).toMatchInlineSnapshot(`
    [
      1,
      456,
      10,
    ]
  `)

  unwatch()
})
