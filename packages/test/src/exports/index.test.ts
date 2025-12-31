import { expect, test } from 'vitest'

import * as react from './index.js'

test('exports', () => {
  expect(Object.keys(react)).toMatchInlineSnapshot(`
    [
      "chain",
      "mainnet",
      "mainnet2",
      "optimism",
      "tempoLocal",
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
      "tempoAccounts",
      "typedData",
      "walletConnectProjectId",
      "addressRegex",
      "transactionHashRegex",
      "wait",
    ]
  `)
})
