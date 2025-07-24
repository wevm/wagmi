import { expect, test } from 'vitest'

import * as react from './index.js'

test('exports', () => {
  expect(Object.keys(react)).toMatchInlineSnapshot(`
    [
      "chain",
      "mainnet",
      "mainnet2",
      "optimism",
      "mainnet2TestClient",
      "mainnetTestClient",
      "optimismTestClient",
      "testClient",
      "config",
      "abi",
      "accounts",
      "address",
      "bytecode",
      "privateKey",
      "typedData",
      "walletConnectProjectId",
      "addressRegex",
      "transactionHashRegex",
      "wait",
    ]
  `)
})
