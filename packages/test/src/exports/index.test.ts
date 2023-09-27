import { expect, test } from 'vitest'

import * as react from './index.js'

test('exports', () => {
  expect(Object.keys(react)).toMatchInlineSnapshot(`
    [
      "chain",
      "mainnet",
      "mainnet2",
      "optimism",
      "abi",
      "address",
      "accounts",
      "typedData",
      "walletConnectProjectId",
      "testClient",
      "mainnetTestClient",
      "mainnet2TestClient",
      "optimismTestClient",
      "config",
      "addressRegex",
      "transactionHashRegex",
      "wait",
    ]
  `)
})
