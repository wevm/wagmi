import { expect, test } from 'vitest'

import * as actions from './actions.js'

test('exports', () => {
  expect(Object.keys(actions)).toMatchInlineSnapshot(`
    [
      "connect",
      "disconnect",
      "estimateGas",
      "getAccount",
      "getBalance",
      "getBlockNumber",
      "getChainId",
      "getConnections",
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
      "watchAccount",
      "watchBlockNumber",
      "watchChainId",
      "watchConnections",
      "watchContractEvent",
      "watchPendingTransactions",
      "waitForTransactionReceipt",
      "writeContract",
    ]
  `)
})
