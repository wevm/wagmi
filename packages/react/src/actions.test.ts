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
      "watchNetwork",
      "watchProvider",
      "watchReadContract",
      "watchReadContracts",
      "watchSigner",
      "watchWebSocketProvider",
      "writeContract",
    ]
  `)
})
