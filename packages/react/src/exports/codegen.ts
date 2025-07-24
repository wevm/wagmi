////////////////////////////////////////////////////////////////////////////////
// @wagmi/core/codegen
////////////////////////////////////////////////////////////////////////////////

// biome-ignore lint/performance/noBarrelFile: entrypoint module
// biome-ignore lint/performance/noReExportAll: entrypoint module
export * from '@wagmi/core/codegen'

////////////////////////////////////////////////////////////////////////////////
// Hooks
////////////////////////////////////////////////////////////////////////////////

export {
  type CreateUseReadContractParameters,
  type CreateUseReadContractReturnType,
  createUseReadContract,
} from '../hooks/codegen/createUseReadContract.js'
export {
  type CreateUseSimulateContractParameters,
  type CreateUseSimulateContractReturnType,
  createUseSimulateContract,
} from '../hooks/codegen/createUseSimulateContract.js'

export {
  type CreateUseWatchContractEventParameters,
  type CreateUseWatchContractEventReturnType,
  createUseWatchContractEvent,
} from '../hooks/codegen/createUseWatchContractEvent.js'

export {
  type CreateUseWriteContractParameters,
  type CreateUseWriteContractReturnType,
  createUseWriteContract,
} from '../hooks/codegen/createUseWriteContract.js'
