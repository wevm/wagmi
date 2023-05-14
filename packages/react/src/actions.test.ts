import { expect, test } from 'vitest'

import * as actions from './actions.js'

test('exports', () => {
  expect(actions).toMatchInlineSnapshot(`
    {
      "connect": [Function],
      "connectMutationOptions": [Function],
      "disconnect": [Function],
      "disconnectMutationOptions": [Function],
      "getAccount": [Function],
      "getBlockNumber": [Function],
      "getBlockNumberQueryOptions": [Function],
      "watchAccount": [Function],
      "watchBlockNumber": [Function],
    }
  `)
})
