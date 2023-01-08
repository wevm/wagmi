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
      "fetchSigner",
      "fetchToken",
      "fetchTransaction",
      "getAccount",
      "getContract",
      "getNetwork",
      "getProvider",
      "getWebSocketProvider",
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
      "watchProvider",
      "watchReadContract",
      "watchReadContracts",
      "watchSigner",
      "watchWebSocketProvider",
      "writeContract",
    ]
  `)
})
