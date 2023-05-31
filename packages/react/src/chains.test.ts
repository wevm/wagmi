import { expect, test } from 'vitest'

import * as chains from './chains.js'

test('exports', () => {
  expect(Object.keys(chains)).toMatchInlineSnapshot(`
    [
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
    ]
  `)
})
