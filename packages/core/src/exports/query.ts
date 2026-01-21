////////////////////////////////////////////////////////////////////////////////
// Tanstack Query
////////////////////////////////////////////////////////////////////////////////

// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
  type CallData,
  type CallOptions,
  type CallQueryFnData,
  type CallQueryKey,
  type CallQueryOptions,
  callQueryKey,
  callQueryOptions,
} from '../query/call.js'

export {
  type ConnectData,
  type ConnectMutate,
  type ConnectMutateAsync,
  type ConnectMutationOptions,
  type ConnectOptions,
  type ConnectVariables,
  connectMutationOptions,
} from '../query/connect.js'

export {
  type DeployContractData,
  type DeployContractMutate,
  type DeployContractMutateAsync,
  type DeployContractMutationOptions,
  type DeployContractOptions,
  type DeployContractVariables,
  deployContractMutationOptions,
} from '../query/deployContract.js'

export {
  type DisconnectData,
  type DisconnectMutate,
  type DisconnectMutateAsync,
  type DisconnectMutationOptions,
  type DisconnectOptions,
  type DisconnectVariables,
  disconnectMutationOptions,
} from '../query/disconnect.js'

export {
  type EstimateFeesPerGasData,
  type EstimateFeesPerGasOptions,
  type EstimateFeesPerGasQueryFnData,
  type EstimateFeesPerGasQueryKey,
  type EstimateFeesPerGasQueryOptions,
  estimateFeesPerGasQueryKey,
  estimateFeesPerGasQueryOptions,
} from '../query/estimateFeesPerGas.js'

export {
  type EstimateGasData,
  type EstimateGasOptions,
  type EstimateGasQueryFnData,
  type EstimateGasQueryKey,
  type EstimateGasQueryOptions,
  estimateGasQueryKey,
  estimateGasQueryOptions,
} from '../query/estimateGas.js'

export {
  type EstimateMaxPriorityFeePerGasData,
  type EstimateMaxPriorityFeePerGasOptions,
  type EstimateMaxPriorityFeePerGasQueryFnData,
  type EstimateMaxPriorityFeePerGasQueryKey,
  type EstimateMaxPriorityFeePerGasQueryOptions,
  estimateMaxPriorityFeePerGasQueryKey,
  estimateMaxPriorityFeePerGasQueryOptions,
} from '../query/estimateMaxPriorityFeePerGas.js'

export {
  type GetBalanceData,
  type GetBalanceOptions,
  type GetBalanceQueryFnData,
  type GetBalanceQueryKey,
  type GetBalanceQueryOptions,
  getBalanceQueryKey,
  getBalanceQueryOptions,
} from '../query/getBalance.js'

export {
  type GetBlobBaseFeeData,
  type GetBlobBaseFeeOptions,
  type GetBlobBaseFeeQueryFnData,
  type GetBlobBaseFeeQueryKey,
  type GetBlobBaseFeeQueryOptions,
  getBlobBaseFeeQueryKey,
  getBlobBaseFeeQueryOptions,
} from '../query/getBlobBaseFee.js'

export {
  type GetBlockData,
  type GetBlockOptions,
  type GetBlockQueryFnData,
  type GetBlockQueryKey,
  type GetBlockQueryOptions,
  getBlockQueryKey,
  getBlockQueryOptions,
} from '../query/getBlock.js'

export {
  type GetBlockNumberData,
  type GetBlockNumberOptions,
  type GetBlockNumberQueryFnData,
  type GetBlockNumberQueryKey,
  type GetBlockNumberQueryOptions,
  getBlockNumberQueryKey,
  getBlockNumberQueryOptions,
} from '../query/getBlockNumber.js'

export {
  type GetBlockTransactionCountData,
  type GetBlockTransactionCountOptions,
  type GetBlockTransactionCountQueryFnData,
  type GetBlockTransactionCountQueryKey,
  type GetBlockTransactionCountQueryOptions,
  getBlockTransactionCountQueryKey,
  getBlockTransactionCountQueryOptions,
} from '../query/getBlockTransactionCount.js'

export {
  type GetBytecodeData,
  type GetBytecodeOptions,
  type GetBytecodeQueryFnData,
  type GetBytecodeQueryKey,
  type GetBytecodeQueryOptions,
  getBytecodeQueryKey,
  getBytecodeQueryOptions,
} from '../query/getBytecode.js'

export {
  type GetCallsStatusData,
  type GetCallsStatusOptions,
  type GetCallsStatusQueryFnData,
  type GetCallsStatusQueryKey,
  type GetCallsStatusQueryOptions,
  getCallsStatusQueryKey,
  getCallsStatusQueryOptions,
} from '../query/getCallsStatus.js'

export {
  type GetCapabilitiesData,
  type GetCapabilitiesOptions,
  type GetCapabilitiesQueryFnData,
  type GetCapabilitiesQueryKey,
  type GetCapabilitiesQueryOptions,
  getCapabilitiesQueryKey,
  getCapabilitiesQueryOptions,
} from '../query/getCapabilities.js'

export {
  type GetConnectorClientData,
  type GetConnectorClientOptions,
  type GetConnectorClientQueryFnData,
  type GetConnectorClientQueryKey,
  type GetConnectorClientQueryOptions,
  getConnectorClientQueryKey,
  getConnectorClientQueryOptions,
} from '../query/getConnectorClient.js'

export {
  type GetContractEventsData,
  type GetContractEventsOptions,
  type GetContractEventsQueryFnData,
  type GetContractEventsQueryKey,
  type GetContractEventsQueryOptions,
  getContractEventsQueryKey,
  getContractEventsQueryOptions,
} from '../query/getContractEvents.js'

export {
  type GetEnsAddressData,
  type GetEnsAddressOptions,
  type GetEnsAddressQueryFnData,
  type GetEnsAddressQueryKey,
  type GetEnsAddressQueryOptions,
  getEnsAddressQueryKey,
  getEnsAddressQueryOptions,
} from '../query/getEnsAddress.js'

export {
  type GetEnsAvatarData,
  type GetEnsAvatarOptions,
  type GetEnsAvatarQueryFnData,
  type GetEnsAvatarQueryKey,
  type GetEnsAvatarQueryOptions,
  getEnsAvatarQueryKey,
  getEnsAvatarQueryOptions,
} from '../query/getEnsAvatar.js'

export {
  type GetEnsNameData,
  type GetEnsNameOptions,
  type GetEnsNameQueryFnData,
  type GetEnsNameQueryKey,
  type GetEnsNameQueryOptions,
  getEnsNameQueryKey,
  getEnsNameQueryOptions,
} from '../query/getEnsName.js'

export {
  type GetEnsResolverData,
  type GetEnsResolverOptions,
  type GetEnsResolverQueryFnData,
  type GetEnsResolverQueryKey,
  type GetEnsResolverQueryOptions,
  getEnsResolverQueryKey,
  getEnsResolverQueryOptions,
} from '../query/getEnsResolver.js'

export {
  type GetEnsTextData,
  type GetEnsTextOptions,
  type GetEnsTextQueryFnData,
  type GetEnsTextQueryKey,
  type GetEnsTextQueryOptions,
  getEnsTextQueryKey,
  getEnsTextQueryOptions,
} from '../query/getEnsText.js'

export {
  type GetFeeHistoryData,
  type GetFeeHistoryOptions,
  type GetFeeHistoryQueryFnData,
  type GetFeeHistoryQueryKey,
  type GetFeeHistoryQueryOptions,
  getFeeHistoryQueryKey,
  getFeeHistoryQueryOptions,
} from '../query/getFeeHistory.js'

export {
  type GetGasPriceData,
  type GetGasPriceOptions,
  type GetGasPriceQueryFnData,
  type GetGasPriceQueryKey,
  type GetGasPriceQueryOptions,
  getGasPriceQueryKey,
  getGasPriceQueryOptions,
} from '../query/getGasPrice.js'

export {
  type GetProofData,
  type GetProofOptions,
  type GetProofQueryFnData,
  type GetProofQueryKey,
  type GetProofQueryOptions,
  getProofQueryKey,
  getProofQueryOptions,
} from '../query/getProof.js'

export {
  type GetStorageAtData,
  type GetStorageAtOptions,
  type GetStorageAtQueryFnData,
  type GetStorageAtQueryKey,
  type GetStorageAtQueryOptions,
  getStorageAtQueryKey,
  getStorageAtQueryOptions,
} from '../query/getStorageAt.js'

export {
  type GetTransactionData,
  type GetTransactionOptions,
  type GetTransactionQueryFnData,
  type GetTransactionQueryKey,
  type GetTransactionQueryOptions,
  getTransactionQueryKey,
  getTransactionQueryOptions,
} from '../query/getTransaction.js'

export {
  type GetTransactionConfirmationsData,
  type GetTransactionConfirmationsOptions,
  type GetTransactionConfirmationsQueryFnData,
  type GetTransactionConfirmationsQueryKey,
  type GetTransactionConfirmationsQueryOptions,
  getTransactionConfirmationsQueryKey,
  getTransactionConfirmationsQueryOptions,
} from '../query/getTransactionConfirmations.js'

export {
  type GetTransactionCountData,
  type GetTransactionCountOptions,
  type GetTransactionCountQueryFnData,
  type GetTransactionCountQueryKey,
  type GetTransactionCountQueryOptions,
  getTransactionCountQueryKey,
  getTransactionCountQueryOptions,
} from '../query/getTransactionCount.js'

export {
  type GetTransactionReceiptData,
  type GetTransactionReceiptOptions,
  type GetTransactionReceiptQueryFnData,
  type GetTransactionReceiptQueryKey,
  type GetTransactionReceiptQueryOptions,
  getTransactionReceiptQueryKey,
  getTransactionReceiptQueryOptions,
} from '../query/getTransactionReceipt.js'

export {
  type GetWalletClientData,
  type GetWalletClientOptions,
  type GetWalletClientQueryFnData,
  type GetWalletClientQueryKey,
  type GetWalletClientQueryOptions,
  getWalletClientQueryKey,
  getWalletClientQueryOptions,
} from '../query/getWalletClient.js'

export {
  type InfiniteReadContractsData,
  type InfiniteReadContractsOptions,
  type InfiniteReadContractsQueryFnData,
  type InfiniteReadContractsQueryKey,
  infiniteReadContractsQueryKey,
  infiniteReadContractsQueryOptions,
} from '../query/infiniteReadContracts.js'

export {
  type PrepareTransactionRequestData,
  type PrepareTransactionRequestOptions,
  type PrepareTransactionRequestQueryFnData,
  type PrepareTransactionRequestQueryKey,
  type PrepareTransactionRequestQueryOptions,
  prepareTransactionRequestQueryKey,
  prepareTransactionRequestQueryOptions,
} from '../query/prepareTransactionRequest.js'

export {
  type ReadContractData,
  type ReadContractOptions,
  type ReadContractQueryFnData,
  type ReadContractQueryKey,
  type ReadContractQueryOptions,
  readContractQueryKey,
  readContractQueryOptions,
} from '../query/readContract.js'

export {
  type ReadContractsData,
  type ReadContractsOptions,
  type ReadContractsQueryFnData,
  type ReadContractsQueryKey,
  type ReadContractsQueryOptions,
  readContractsQueryKey,
  readContractsQueryOptions,
} from '../query/readContracts.js'

export {
  type ReconnectData,
  type ReconnectMutate,
  type ReconnectMutateAsync,
  type ReconnectMutationOptions,
  type ReconnectOptions,
  type ReconnectVariables,
  reconnectMutationOptions,
} from '../query/reconnect.js'

export {
  type SendCallsData,
  type SendCallsMutate,
  type SendCallsMutateAsync,
  type SendCallsMutationOptions,
  type SendCallsOptions,
  type SendCallsVariables,
  sendCallsMutationOptions,
} from '../query/sendCalls.js'

export {
  type SendCallsSyncData,
  type SendCallsSyncMutate,
  type SendCallsSyncMutateAsync,
  type SendCallsSyncMutationOptions,
  type SendCallsSyncOptions,
  type SendCallsSyncVariables,
  sendCallsSyncMutationOptions,
} from '../query/sendCallsSync.js'

export {
  type SendTransactionData,
  type SendTransactionMutate,
  type SendTransactionMutateAsync,
  type SendTransactionMutationOptions,
  type SendTransactionOptions,
  type SendTransactionVariables,
  sendTransactionMutationOptions,
} from '../query/sendTransaction.js'

export {
  type SendTransactionSyncData,
  type SendTransactionSyncMutate,
  type SendTransactionSyncMutateAsync,
  type SendTransactionSyncMutationOptions,
  type SendTransactionSyncOptions,
  type SendTransactionSyncVariables,
  sendTransactionSyncMutationOptions,
} from '../query/sendTransactionSync.js'

export {
  type ShowCallsStatusData,
  type ShowCallsStatusMutate,
  type ShowCallsStatusMutateAsync,
  type ShowCallsStatusMutationOptions,
  type ShowCallsStatusOptions,
  type ShowCallsStatusVariables,
  showCallsStatusMutationOptions,
} from '../query/showCallsStatus.js'

export {
  type SignMessageData,
  type SignMessageMutate,
  type SignMessageMutateAsync,
  type SignMessageMutationOptions,
  type SignMessageOptions,
  type SignMessageVariables,
  signMessageMutationOptions,
} from '../query/signMessage.js'

export {
  type SignTypedDataData,
  type SignTypedDataMutate,
  type SignTypedDataMutateAsync,
  type SignTypedDataMutationOptions,
  type SignTypedDataOptions,
  type SignTypedDataVariables,
  signTypedDataMutationOptions,
} from '../query/signTypedData.js'

export {
  type SimulateContractData,
  type SimulateContractOptions,
  type SimulateContractQueryFnData,
  type SimulateContractQueryKey,
  type SimulateContractQueryOptions,
  simulateContractQueryKey,
  simulateContractQueryOptions,
} from '../query/simulateContract.js'

export {
  type SwitchChainData,
  type SwitchChainMutate,
  type SwitchChainMutateAsync,
  type SwitchChainMutationOptions,
  type SwitchChainOptions,
  type SwitchChainVariables,
  switchChainMutationOptions,
} from '../query/switchChain.js'

export {
  /** @deprecated use `SwitchConnectionData` instead */
  type SwitchConnectionData as SwitchAccountData,
  type SwitchConnectionData,
  /** @deprecated use `SwitchConnectionMutate` instead */
  type SwitchConnectionMutate as SwitchAccountMutate,
  type SwitchConnectionMutate,
  /** @deprecated use `SwitchConnectionMutateAsync` instead */
  type SwitchConnectionMutateAsync as SwitchAccountMutateAsync,
  type SwitchConnectionMutateAsync,
  /** @deprecated use `SwitchConnectionMutationOptions` instead */
  type SwitchConnectionMutationOptions as SwitchAccountMutationOptions,
  type SwitchConnectionMutationOptions,
  /** @deprecated use `SwitchConnectionOptions` instead */
  type SwitchConnectionOptions as SwitchAccountOptions,
  type SwitchConnectionOptions,
  /** @deprecated use `SwitchConnectionVariables` instead */
  type SwitchConnectionVariables as SwitchAccountVariables,
  type SwitchConnectionVariables,
  /** @deprecated use `switchConnectionMutationOptions` instead */
  switchConnectionMutationOptions as switchAccountMutationOptions,
  switchConnectionMutationOptions,
} from '../query/switchConnection.js'

export {
  hashFn,
  structuralSharing,
} from '../query/utils.js'

export {
  type VerifyMessageData,
  type VerifyMessageOptions,
  type VerifyMessageQueryFnData,
  type VerifyMessageQueryKey,
  type VerifyMessageQueryOptions,
  verifyMessageQueryKey,
  verifyMessageQueryOptions,
} from '../query/verifyMessage.js'

export {
  type VerifyTypedDataData,
  type VerifyTypedDataOptions,
  type VerifyTypedDataQueryFnData,
  type VerifyTypedDataQueryKey,
  type VerifyTypedDataQueryOptions,
  verifyTypedDataQueryKey,
  verifyTypedDataQueryOptions,
} from '../query/verifyTypedData.js'

export {
  type WaitForCallsStatusData,
  type WaitForCallsStatusOptions,
  type WaitForCallsStatusQueryFnData,
  type WaitForCallsStatusQueryKey,
  type WaitForCallsStatusQueryOptions,
  waitForCallsStatusQueryKey,
  waitForCallsStatusQueryOptions,
} from '../query/waitForCallsStatus.js'

export {
  type WaitForTransactionReceiptData,
  type WaitForTransactionReceiptOptions,
  type WaitForTransactionReceiptQueryFnData,
  type WaitForTransactionReceiptQueryKey,
  type WaitForTransactionReceiptQueryOptions,
  waitForTransactionReceiptQueryKey,
  waitForTransactionReceiptQueryOptions,
} from '../query/waitForTransactionReceipt.js'

export {
  type WatchAssetData,
  type WatchAssetMutate,
  type WatchAssetMutateAsync,
  type WatchAssetMutationOptions,
  type WatchAssetOptions,
  type WatchAssetVariables,
  watchAssetMutationOptions,
} from '../query/watchAsset.js'

export {
  type WriteContractData,
  type WriteContractMutate,
  type WriteContractMutateAsync,
  type WriteContractMutationOptions,
  type WriteContractOptions,
  type WriteContractVariables,
  writeContractMutationOptions,
} from '../query/writeContract.js'

export {
  type WriteContractSyncData,
  type WriteContractSyncMutate,
  type WriteContractSyncMutateAsync,
  type WriteContractSyncMutationOptions,
  type WriteContractSyncOptions,
  type WriteContractSyncVariables,
  writeContractSyncMutationOptions,
} from '../query/writeContractSync.js'
