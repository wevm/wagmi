import { expect, it } from 'vitest'

import * as Exports from './chains'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "arbitrum",
      "arbitrumGoerli",
      "avalanche",
      "avalancheFuji",
      "bsc",
      "bscTestnet",
      "fantom",
      "fantomTestnet",
      "foundry",
      "goerli",
      "hardhat",
      "localhost",
      "mainnet",
      "optimism",
      "optimismGoerli",
      "polygon",
      "polygonMumbai",
      "sepolia",
      "taraxa",
      "taraxaTestnet",
    ]
  `)
})
