import { expect, test } from 'vitest'

import * as core from './index.js'

test('exports', () => {
  expect(core).toMatchInlineSnapshot(`
    {
      "ChainNotConfiguredError": [Function],
      "ConnectorAlreadyConnectedError": [Function],
      "Emitter": [Function],
      "ProviderNotFoundError": [Function],
      "connect": [Function],
      "connectMutationOptions": [Function],
      "createConfig": [Function],
      "createConnector": [Function],
      "createEmitter": [Function],
      "createStorage": [Function],
      "deepEqual": [Function],
      "deserialize": [Function],
      "disconnect": [Function],
      "disconnectMutationOptions": [Function],
      "getAccount": [Function],
      "getBalance": [Function],
      "getBalanceQueryOptions": [Function],
      "getBlockNumber": [Function],
      "getBlockNumberQueryOptions": [Function],
      "getChainId": [Function],
      "noopStorage": {
        "getItem": [Function],
        "removeItem": [Function],
        "setItem": [Function],
      },
      "normalizeChainId": [Function],
      "serialize": [Function],
      "watchAccount": [Function],
      "watchBalance": [Function],
      "watchBlockNumber": [Function],
      "watchChainId": [Function],
    }
  `)
})
