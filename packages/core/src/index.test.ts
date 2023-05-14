import { expect, test } from 'vitest'

import * as exports from './index.js'

test('exports', () => {
  expect(exports).toMatchInlineSnapshot(`
    {
      "ChainNotConfiguredError": [Function],
      "ConnectorAlreadyConnectedError": [Function],
      "ConnectorNotFoundError": [Function],
      "Emitter": [Function],
      "connect": [Function],
      "connectMutationOptions": [Function],
      "createConfig": [Function],
      "createConnector": [Function],
      "createEmitter": [Function],
      "createStorage": [Function],
      "deepEqual": [Function],
      "disconnect": [Function],
      "disconnectMutationOptions": [Function],
      "getAccount": [Function],
      "getBlockNumber": [Function],
      "getBlockNumberQueryOptions": [Function],
      "noopStorage": {
        "getItem": [Function],
        "removeItem": [Function],
        "setItem": [Function],
      },
      "normalizeChainId": [Function],
      "watchAccount": [Function],
      "watchBlockNumber": [Function],
    }
  `)
})
