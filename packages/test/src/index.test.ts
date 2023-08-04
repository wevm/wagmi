import { expect, test } from 'vitest'

import * as react from './index.js'

test('exports', () => {
  expect(Object.keys(react)).toMatchInlineSnapshot(`
    [
      "chain",
      "testConnector",
      "abi",
      "address",
      "accounts",
      "typedData",
      "walletConnectProjectId",
      "config",
      "testClient",
      "wait",
      "version",
    ]
  `)
})
