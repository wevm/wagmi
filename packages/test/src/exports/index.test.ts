import { expect, test } from 'vitest'

import * as react from './index.js'

test('exports', () => {
  expect(Object.keys(react)).toMatchInlineSnapshot(`
    [
      "Provider",
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
      "signedTransactionRegex",
      "transactionHashRegex",
      "wait",
    ]
  `)
})
