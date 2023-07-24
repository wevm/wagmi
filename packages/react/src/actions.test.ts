import { expect, test } from 'vitest'

import * as actions from './actions.js'

test('exports', () => {
  expect(actions).toMatchInlineSnapshot(`
    {
      "connect": [Function],
      "disconnect": [Function],
      "getAccount": [Function],
      "getBalance": [Function],
      "getBlockNumber": [Function],
      "getChainId": [Function],
      "getConnections": [Function],
      "getEnsAddress": [Function],
      "getEnsAvatar": [Function],
      "getEnsName": [Function],
      "getEnsResolver": [Function],
      "getFeeData": [Function],
      "getToken": [Function],
      "getTransaction": [Function],
      "prepareSendTransaction": [Function],
      "readContract": [Function],
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
      "writeContract": [Function],
    }
  `)
})
