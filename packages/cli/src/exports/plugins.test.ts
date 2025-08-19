import { expect, test } from 'vitest'

import * as Exports from './plugins.js'

test('exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "actions",
      "blockExplorer",
      "etherscan",
      "fetch",
      "foundry",
      "foundryDefaultExcludes",
      "hardhat",
      "hardhatDefaultExcludes",
      "react",
      "routescan",
      "sourcify",
    ]
  `)
})
