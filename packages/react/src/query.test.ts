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
      "getEnsAddressQueryKey",
      "getEnsAddressQueryOptions",
      "getEnsAvatarQueryKey",
      "getEnsAvatarQueryOptions",
      "getEnsNameQueryKey",
      "getEnsNameQueryOptions",
      "getEnsResolverQueryKey",
      "getEnsResolverQueryOptions",
      "getFeeDataQueryKey",
      "getFeeDataQueryOptions",
      "getTokenQueryKey",
      "getTokenQueryOptions",
      "getTransactionQueryKey",
      "getTransactionQueryOptions",
      "prepareSendTransactionQueryKey",
      "prepareSendTransactionQueryOptions",
      "reconnectMutationOptions",
      "signMessageMutationOptions",
      "switchAccountMutationOptions",
      "switchChainMutationOptions",
      "waitForTransactionReceiptQueryKey",
      "waitForTransactionReceiptQueryOptions",
    ]
  `)
})
