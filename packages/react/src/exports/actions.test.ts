import { expect, test } from 'vitest'

import * as actions from './actions.js'

test('exports', () => {
  expect(Object.keys(actions)).toMatchInlineSnapshot(`
    [
      "call",
      "connect",
      "disconnect",
      "estimateGas",
      "estimateFeesPerGas",
      "estimateMaxPriorityFeePerGas",
      "getAccount",
      "getBalance",
      "fetchBalance",
      "getBlock",
      "getBlockNumber",
      "fetchBlockNumber",
      "getBlockTransactionCount",
      "getBytecode",
      "getChainId",
      "getChains",
      "getClient",
      "getConnections",
      "getConnectors",
      "getConnectorClient",
      "getEnsAddress",
      "fetchEnsAddress",
      "getEnsAvatar",
      "fetchEnsAvatar",
      "getEnsName",
      "fetchEnsName",
      "getEnsResolver",
      "fetchEnsResolver",
      "getEnsText",
      "getFeeHistory",
      "getGasPrice",
      "getProof",
      "getPublicClient",
      "getStorageAt",
      "getToken",
      "fetchToken",
      "getTransaction",
      "fetchTransaction",
      "getTransactionConfirmations",
      "getTransactionCount",
      "getTransactionReceipt",
      "getWalletClient",
      "multicall",
      "prepareTransactionRequest",
      "readContract",
      "readContracts",
      "reconnect",
      "sendTransaction",
      "signMessage",
      "signTypedData",
      "simulateContract",
      "switchAccount",
      "switchChain",
      "switchNetwork",
      "verifyMessage",
      "verifyTypedData",
      "watchAccount",
      "watchBlocks",
      "watchBlockNumber",
      "watchChainId",
      "watchClient",
      "watchConnections",
      "watchConnectors",
      "watchContractEvent",
      "watchPendingTransactions",
      "watchPublicClient",
      "waitForTransactionReceipt",
      "waitForTransaction",
      "writeContract",
    ]
  `)
})
