import { expect, test } from 'vitest'

import * as react from './index.js'

test('exports', () => {
  expect(Object.keys(react)).toMatchInlineSnapshot(`
    [
      "testChains",
      "testConnector",
      "abi",
      "address",
      "accounts",
      "forkUrl",
      "forkBlockNumber",
      "typedData",
      "walletConnectProjectId",
      "config",
      "testClient",
      "wait",
    ]
  `)
})
