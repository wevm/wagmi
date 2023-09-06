import { expect, test } from 'vitest'

import * as actions from './actions.js'

test('exports', () => {
  expect(Object.keys(actions)).toMatchInlineSnapshot(`
    [
      "connect",
      "disconnect",
      "estimateGas",
      "getAccount",
      "watchAccount",
      "getBalance",
      "getBlockNumber",
      "watchBlockNumber",
      "getChainId",
      "watchChainId",
      "getConnections",
      "watchConnections",
      "getConnectorClient",
      "getEnsAddress",
      "getEnsAvatar",
      "getEnsName",
      "getEnsResolver",
      "getFeeData",
      "getToken",
      "getTransaction",
      "multicall",
      "readContract",
      "readContracts",
      "reconnect",
      "sendTransaction",
      "signMessage",
      "signTypedData",
      "simulateContract",
      "switchAccount",
      "switchChain",
      "watchPendingTransactions",
      "waitForTransactionReceipt",
      "writeContract",
    ]
  `)
})
