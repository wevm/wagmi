import { expect, test } from 'vitest'

import * as core from './index.js'

test('exports', () => {
  expect(Object.keys(core)).toMatchInlineSnapshot(`
    [
      "connect",
      "disconnect",
      "getAccount",
      "watchAccount",
      "getBalance",
      "watchBalance",
      "getBlockNumber",
      "watchBlockNumber",
      "getEnsAddress",
      "getEnsAvatar",
      "getEnsName",
      "getEnsResolver",
      "getFeeData",
      "getToken",
      "getTransaction",
      "getChainId",
      "watchChainId",
      "getConnections",
      "watchConnections",
      "prepareSendTransaction",
      "reconnect",
      "sendTransaction",
      "signMessage",
      "switchAccount",
      "switchChain",
      "waitForTransactionReceipt",
      "createConfig",
      "createConnector",
      "BaseError",
      "ProviderNotFoundError",
      "SwitchChainNotSupportedError",
      "ChainMismatchError",
      "ChainNotConfiguredError",
      "ConnectorAlreadyConnectedError",
      "ConnectorNotFoundError",
      "createStorage",
      "noopStorage",
      "deserialize",
      "normalizeChainId",
      "serialize",
    ]
  `)
})
