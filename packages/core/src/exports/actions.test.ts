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
      "getClient",
      "getConnections",
      "getConnectorClient",
      "getEnsAddress",
      "getEnsAvatar",
      "getEnsName",
      "getEnsResolver",
      "getPublicClient",
      "getToken",
      "getTransaction",
      "getWalletClient",
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
      "watchClient",
      "watchConnections",
      "watchContractEvent",
      "watchPendingTransactions",
      "watchPublicClient",
      "waitForTransactionReceipt",
      "writeContract",
    ]
  `)
})
