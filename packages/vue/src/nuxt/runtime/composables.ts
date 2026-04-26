// Nuxt auto-imports should only expose composables.
//
// Re-exporting `../../exports/index.js` pulls in plugin & core utility exports,
// which can trigger module interop issues in Nuxt when resolving auto-imports.
// biome-ignore lint/performance/noBarrelFile: entrypoint module
export { useBalance } from '../../composables/useBalance.js'
export { useBlockNumber } from '../../composables/useBlockNumber.js'
export { useChainId } from '../../composables/useChainId.js'
export { useChains } from '../../composables/useChains.js'
export { useClient } from '../../composables/useClient.js'
export { useConfig } from '../../composables/useConfig.js'
export { useConnect } from '../../composables/useConnect.js'
export {
  useConnection as useAccount,
  useConnection,
} from '../../composables/useConnection.js'
export { useConnectionEffect as useAccountEffect } from '../../composables/useConnectionEffect.js'
export { useConnections } from '../../composables/useConnections.js'
export { useConnectorClient } from '../../composables/useConnectorClient.js'
export { useConnectors } from '../../composables/useConnectors.js'
export { useDisconnect } from '../../composables/useDisconnect.js'
export { useEnsAddress } from '../../composables/useEnsAddress.js'
export { useEnsAvatar } from '../../composables/useEnsAvatar.js'
export { useEnsName } from '../../composables/useEnsName.js'
export { useEstimateGas } from '../../composables/useEstimateGas.js'
export { useReadContract } from '../../composables/useReadContract.js'
export { useReconnect } from '../../composables/useReconnect.js'
export { useSendTransaction } from '../../composables/useSendTransaction.js'
export { useSignMessage } from '../../composables/useSignMessage.js'
export { useSignTypedData } from '../../composables/useSignTypedData.js'
export { useSimulateContract } from '../../composables/useSimulateContract.js'
export { useSwitchChain } from '../../composables/useSwitchChain.js'
export {
  useSwitchConnection as useSwitchAccount,
  useSwitchConnection,
} from '../../composables/useSwitchConnection.js'
export { useTransaction } from '../../composables/useTransaction.js'
export { useTransactionReceipt } from '../../composables/useTransactionReceipt.js'
export { useWaitForTransactionReceipt } from '../../composables/useWaitForTransactionReceipt.js'
export { useWatchBlockNumber } from '../../composables/useWatchBlockNumber.js'
export { useWriteContract } from '../../composables/useWriteContract.js'
