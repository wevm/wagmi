import { expect, it } from 'vitest'

import * as Exports from './chains'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "arbitrum",
      "arbitrumGoerli",
      "foundry",
      "goerli",
      "hardhat",
      "sepolia",
      "localhost",
      "mainnet",
      "optimism",
      "optimismGoerli",
      "polygon",
      "polygonMumbai",
    ]
  `)
})
