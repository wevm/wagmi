import { expect, test } from 'vitest'

import * as query from './query.js'

test('exports', () => {
  expect(Object.keys(query)).toMatchInlineSnapshot(`
    [
      "callQueryKey",
      "callQueryOptions",
      "connectMutationOptions",
      "disconnectMutationOptions",
      "estimateFeesPerGasQueryKey",
      "estimateFeesPerGasQueryOptions",
      "estimateGasQueryKey",
      "estimateGasQueryOptions",
      "estimateMaxPriorityFeePerGasQueryKey",
      "estimateMaxPriorityFeePerGasQueryOptions",
      "getBalanceQueryKey",
      "getBalanceQueryOptions",
      "getBlockQueryKey",
      "getBlockQueryOptions",
      "getBlockNumberQueryKey",
      "getBlockNumberQueryOptions",
      "getBlockTransactionCountQueryKey",
      "getBlockTransactionCountQueryOptions",
      "getBytecodeQueryKey",
      "getBytecodeQueryOptions",
      "getConnectorClientQueryKey",
      "getConnectorClientQueryOptions",
      "getEnsAddressQueryKey",
      "getEnsAddressQueryOptions",
      "getEnsAvatarQueryKey",
      "getEnsAvatarQueryOptions",
      "getEnsNameQueryKey",
      "getEnsNameQueryOptions",
      "getEnsResolverQueryKey",
      "getEnsResolverQueryOptions",
      "getFeeHistoryQueryKey",
      "getFeeHistoryQueryOptions",
      "getGasPriceQueryKey",
      "getGasPriceQueryOptions",
      "getStorageAtQueryKey",
      "getStorageAtQueryOptions",
      "getProofQueryKey",
      "getProofQueryOptions",
      "getTokenQueryKey",
      "getTokenQueryOptions",
      "getTransactionQueryKey",
      "getTransactionQueryOptions",
      "getTransactionCountQueryKey",
      "getTransactionCountQueryOptions",
      "getTransactionReceiptQueryKey",
      "getTransactionReceiptQueryOptions",
      "getWalletClientQueryKey",
      "getWalletClientQueryOptions",
      "infiniteReadContractsQueryKey",
      "infiniteReadContractsQueryOptions",
      "readContractQueryKey",
      "readContractQueryOptions",
      "readContractsQueryKey",
      "readContractsQueryOptions",
      "reconnectMutationOptions",
      "sendTransactionMutationOptions",
      "signMessageMutationOptions",
      "signTypedDataMutationOptions",
      "switchAccountMutationOptions",
      "simulateContractQueryKey",
      "simulateContractQueryOptions",
      "switchChainMutationOptions",
      "verifyMessageQueryKey",
      "verifyMessageQueryOptions",
      "verifyTypedDataQueryKey",
      "verifyTypedDataQueryOptions",
      "waitForTransactionReceiptQueryKey",
      "waitForTransactionReceiptQueryOptions",
      "writeContractMutationOptions",
      "hashFn",
    ]
  `)
})
