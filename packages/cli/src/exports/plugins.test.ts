import { expect, test } from 'vitest'

import * as Exports from './plugins.js'

test('exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "blockExplorer",
      "etherscan",
      "fetch",
      "foundry",
      "hardhat",
      "sourcify",
    ]
  `)
})
