import { expect, test } from 'vitest'

import * as query from './query.js'

test('exports', () => {
  expect(Object.keys(query)).toMatchInlineSnapshot(`
    [
      "connectMutationOptions",
      "disconnectMutationOptions",
      "getBalanceQueryKey",
      "getBalanceQueryOptions",
      "getBlockNumberQueryKey",
      "getBlockNumberQueryOptions",
      "reconnectMutationOptions",
      "signMessageMutationOptions",
      "switchAccountMutationOptions",
      "switchChainMutationOptions",
    ]
  `)
})
