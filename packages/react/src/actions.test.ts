import { expect, test } from 'vitest'

import * as actions from './actions.js'

test('exports', () => {
  expect(actions).toMatchInlineSnapshot(`
    {
      "connect": [Function],
      "disconnect": [Function],
      "getAccount": [Function],
      "getBalance": [Function],
      "getBlockNumber": [Function],
      "getChainId": [Function],
      "getConnections": [Function],
      "reconnect": [Function],
      "signMessage": [Function],
      "switchAccount": [Function],
      "switchChain": [Function],
      "watchAccount": [Function],
      "watchBalance": [Function],
      "watchBlockNumber": [Function],
      "watchChainId": [Function],
      "watchConnections": [Function],
    }
  `)
})
