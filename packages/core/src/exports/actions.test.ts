import { expect, test } from 'vitest'

import * as actions from './actions.js'

test('exports', () => {
  expect(Object.keys(actions)).toMatchInlineSnapshot(`
    [
      "connect",
      "disconnect",
      "estimateFeesPerGas",
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
      "getPublicClient",
      "getWalletClient",
    ]
  `)
})
