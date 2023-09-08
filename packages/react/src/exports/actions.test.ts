import { expect, test } from 'vitest'

import * as actions from './actions.js'

test('exports', () => {
  expect(actions).toMatchInlineSnapshot(`
    {
      "connect": [Function],
      "disconnect": [Function],
      "estimateFeesPerGas": [Function],
      "estimateGas": [Function],
      "getAccount": [Function],
      "getBalance": [Function],
      "getBlockNumber": [Function],
      "getChainId": [Function],
      "getConnections": [Function],
      "getConnectorClient": [Function],
      "getEnsAddress": [Function],
      "getEnsAvatar": [Function],
      "getEnsName": [Function],
      "getEnsResolver": [Function],
      "getPublicClient": [Function],
      "getToken": [Function],
      "getTransaction": [Function],
      "getWalletClient": [Function],
      "multicall": [Function],
      "readContract": [Function],
      "readContracts": [Function],
      "reconnect": [Function],
      "sendTransaction": [Function],
      "signMessage": [Function],
      "signTypedData": [Function],
      "simulateContract": [Function],
      "switchAccount": [Function],
      "switchChain": [Function],
      "waitForTransactionReceipt": [Function],
      "watchAccount": [Function],
      "watchBlockNumber": [Function],
      "watchChainId": [Function],
      "watchConnections": [Function],
      "watchContractEvent": [Function],
      "watchPendingTransactions": [Function],
      "writeContract": [Function],
    }
  `)
})
