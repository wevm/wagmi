import { expect, it } from 'vitest'

import * as Exports from './actions'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "connect",
      "disconnect",
      "fetchBalance",
      "fetchBlockNumber",
      "fetchEnsAddress",
      "fetchEnsAvatar",
      "fetchEnsName",
      "fetchEnsResolver",
      "fetchFeeData",
      "fetchToken",
      "fetchTransaction",
      "getAccount",
      "getContract",
      "getNetwork",
      "getPublicClient",
      "getWalletClient",
      "getWebSocketPublicClient",
      "multicall",
      "prepareSendTransaction",
      "prepareWriteContract",
      "readContract",
      "readContracts",
      "sendTransaction",
      "signMessage",
      "signTypedData",
      "switchNetwork",
      "waitForTransaction",
      "watchAccount",
      "watchBlockNumber",
      "watchContractEvent",
      "watchMulticall",
      "watchNetwork",
      "watchPendingTransactions",
      "watchPublicClient",
      "watchReadContract",
      "watchReadContracts",
      "watchWalletClient",
      "watchWebSocketPublicClient",
      "writeContract",
    ]
  `)
})
