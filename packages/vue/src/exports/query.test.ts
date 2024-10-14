import { expect, test } from 'vitest'

import * as query from './query.js'

test('exports', () => {
  expect(Object.keys(query)).toMatchInlineSnapshot(`
    [
      "callQueryKey",
      "callQueryOptions",
      "connectMutationOptions",
      "deployContractMutationOptions",
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
      "getEnsTextQueryKey",
      "getEnsTextQueryOptions",
      "getFeeHistoryQueryKey",
      "getFeeHistoryQueryOptions",
      "getGasPriceQueryKey",
      "getGasPriceQueryOptions",
      "getProofQueryKey",
      "getProofQueryOptions",
      "getStorageAtQueryKey",
      "getStorageAtQueryOptions",
      "getTokenQueryKey",
      "getTokenQueryOptions",
      "getTransactionQueryKey",
      "getTransactionQueryOptions",
      "getTransactionConfirmationsQueryKey",
      "getTransactionConfirmationsQueryOptions",
      "getTransactionCountQueryKey",
      "getTransactionCountQueryOptions",
      "getTransactionReceiptQueryKey",
      "getTransactionReceiptQueryOptions",
      "getWalletClientQueryKey",
      "getWalletClientQueryOptions",
      "infiniteReadContractsQueryKey",
      "infiniteReadContractsQueryOptions",
      "prepareTransactionRequestQueryKey",
      "prepareTransactionRequestQueryOptions",
      "readContractQueryKey",
      "readContractQueryOptions",
      "readContractsQueryKey",
      "readContractsQueryOptions",
      "reconnectMutationOptions",
      "requestPermissionsMutationOptions",
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
      "watchAssetMutationOptions",
      "writeContractMutationOptions",
      "hashFn",
      "structuralSharing",
      "useMutation",
      "useQuery",
    ]
  `)
})
