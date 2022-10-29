import { expect, it } from 'vitest'

import * as Exports from './chains'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "arbitrum",
      "arbitrumRinkeby",
      "arbitrumGoerli",
      "foundry",
      "goerli",
      "hardhat",
      "kovan",
      "sepolia",
      "bsc",
      "bscTestnet",
      "localhost",
      "mainnet",
      "optimism",
      "optimismKovan",
      "optimismGoerli",
      "polygon",
      "polygonMumbai",
      "rinkeby",
      "ropsten",
    ]
  `)
})
