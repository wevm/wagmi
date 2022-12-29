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
      "evmos",
      "evmosTestnet",
      "fantom",
      "fantomTestnet",
      "foundry",
      "goerli",
      "gnosis",
      "hardhat",
      "iotex",
      "iotexTestnet",
      "localhost",
      "mainnet",
      "optimism",
      "optimismGoerli",
      "polygon",
      "polygonMumbai",
      "sepolia",
      "taraxa",
      "taraxaTestnet",
      "zkSync",
      "zkSyncTestnet",
    ]
  `)
})
