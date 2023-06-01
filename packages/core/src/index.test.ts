import { expect, test } from 'vitest'

import * as core from './index.js'

test('exports', () => {
  expect(core).toMatchInlineSnapshot(`
    {
      "BaseError": [Function],
      "ChainNotConfiguredError": [Function],
      "ConnectorAlreadyConnectedError": [Function],
      "ConnectorNotFoundError": [Function],
      "ProviderNotFoundError": [Function],
      "connect": [Function],
      "connectMutationOptions": [Function],
      "createConfig": [Function],
      "createConnector": [Function],
      "createQueryClient": [Function],
      "createStorage": [Function],
      "deserialize": [Function],
      "disconnect": [Function],
      "disconnectMutationOptions": [Function],
      "getAccount": [Function],
      "getBalance": [Function],
      "getBalanceQueryOptions": [Function],
      "getBlockNumber": [Function],
      "getBlockNumberQueryOptions": [Function],
      "getChainId": [Function],
      "getConnections": [Function],
      "noopStorage": {
        "getItem": [Function],
        "removeItem": [Function],
        "setItem": [Function],
      },
      "normalizeChainId": [Function],
      "reconnect": [Function],
      "reconnectMutationOptions": [Function],
      "serialize": [Function],
      "switchAccount": [Function],
      "switchAccountMutationOptions": [Function],
      "watchAccount": [Function],
      "watchBalance": [Function],
      "watchBlockNumber": [Function],
      "watchChainId": [Function],
      "watchConnections": [Function],
    }
  `)
})
