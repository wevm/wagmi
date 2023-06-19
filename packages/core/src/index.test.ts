import { expect, test } from 'vitest'

import * as core from './index.js'

test('exports', () => {
  expect(Object.keys(core)).toMatchInlineSnapshot(`
    [
      "connect",
      "connectMutationOptions",
      "disconnect",
      "disconnectMutationOptions",
      "getAccount",
      "watchAccount",
      "getBalance",
      "watchBalance",
      "getBalanceQueryOptions",
      "getBlockNumber",
      "watchBlockNumber",
      "getBlockNumberQueryOptions",
      "getChainId",
      "watchChainId",
      "getConnections",
      "watchConnections",
      "reconnect",
      "reconnectMutationOptions",
      "switchAccount",
      "switchAccountMutationOptions",
      "switchChain",
      "switchNetwork",
      "switchChainMutationOptions",
      "createConfig",
      "createConnector",
      "BaseError",
      "ProviderNotFoundError",
      "SwitchChainNotSupportedError",
      "ChainNotConfiguredError",
      "ConnectorAlreadyConnectedError",
      "ConnectorNotFoundError",
      "createQueryClient",
      "createStorage",
      "noopStorage",
      "deserialize",
      "normalizeChainId",
      "serialize",
    ]
  `)
})
