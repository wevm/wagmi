import { expect, test } from 'vitest'

import * as chains from './index.js'

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
