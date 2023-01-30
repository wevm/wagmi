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
      "crossbell",
      "evmos",
      "evmosTestnet",
      "fantom",
      "fantomTestnet",
      "foundry",
      "goerli",
      "gnosis",
      "gnosisChiado",
      "hardhat",
      "filecoin",
      "filecoinHyperspace",
      "iotex",
      "iotexTestnet",
      "localhost",
      "mainnet",
      "metis",
      "metisGoerli",
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
